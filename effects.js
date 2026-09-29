/**
 * ============================================================================
 * EFFECTS - TERMINAL STREAM CANVAS ENGINE & EFFECT PREFERENCES
 * Extracted from app.js. Zero dependencies.
 *
 * The background stream is opt-in: it starts only when the stored preference
 * says so (and never on a narrow viewport). `readStreamPreference` and
 * `writeStreamPreference` are the single read and single write path for that
 * preference; every caller - the bootstrap, the HUD control, the shell command
 * and (later) Prefs - goes through them.
 * ============================================================================
 */

const STREAM_KEY = 'stream_preference';

/** The stream's opaque ground. Dark-only surface, so a single constant. */
const STREAM_BG = '#030a06';

/** A running stream's canvas opacity over the page. */
const STREAM_OPACITY = '0.38';

/**
 * Read the persisted stream preference. A missing or malformed value is OFF:
 * only an explicit '1' turns the stream on.
 * @param {Storage} store - injectable for tests; production passes localStorage.
 */
export function readStreamPreference(store = localStorage) {
  return store.getItem(STREAM_KEY) === '1';
}

/**
 * Persist the stream preference as '1' (on) or '0' (off).
 * @param {Storage} store - injectable for tests; production passes localStorage.
 * @param {boolean} on
 */
export function writeStreamPreference(store = localStorage, on = false) {
  store.setItem(STREAM_KEY, on ? '1' : '0');
}

/**
 * Flip the persisted preference and apply it to the live stream. This is the
 * ONE toggle path: the HUD control and the `stream` shell command both call
 * it, so neither touches `window.__effects.stream` or localStorage on its own.
 * Returns the EFFECTIVE state (the narrow-viewport gate can keep it off even
 * when the stored preference is '1'), so callers never label a stopped stream
 * as running.
 * @param {Storage} store - injectable for tests; production passes localStorage.
 * @returns {boolean} whether the stream is actually running.
 */
export function flipStreamPreference(store = localStorage) {
  const on = !readStreamPreference(store);
  writeStreamPreference(store, on);
  window.__effects?.stream?.setEnabled(on);
  return Boolean(window.__effects?.stream?.isRunning);
}

/**
 * Whether the viewport is narrow enough that the stream must not run at all.
 * The stream is a battery cost on handhelds and is a hard no there.
 */
function isNarrowViewport() {
  return typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 767px)').matches;
}

export class TerminalStream {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    // Authentic Linux Kernel source code (init/main.c start_kernel + Linus release announcement)
    this.kernelStream = [
      "asmlinkage __visible void __init __no_sanitize_address start_kernel(void) {",
      "char *command_line; char *after_dashes; set_task_stack_end_magic(&init_task);",
      "smp_setup_processor_id(); cgroup_init_early(); local_irq_disable();",
      "early_boot_irqs_disabled = true; boot_cpu_init(); page_address_init();",
      "pr_notice(\"%s\", linux_banner); early_security_init(); setup_arch(&command_line);",
      "setup_command_line(command_line); setup_nr_cpu_ids(); setup_per_cpu_areas();",
      "smp_prepare_boot_cpu(); build_all_zonelists(NULL); page_alloc_init();",
      "pr_notice(\"Kernel command line: %s\\n\", boot_command_line); jump_label_init();",
      "trap_init(); mm_init(); sched_init(); time_init(); workqueue_init_early();",
      "rcu_init(); trace_init(); context_tracking_init(); security_init();",
      "vfs_caches_init(); signals_init(); proc_root_init(); cpuset_init();",
      "taskstats_init_early(); check_bugs(); rest_init(); }",
      "/* Linus Torvalds: Hello everybody out there using minix - I'm doing a (free) operating system */",
      "static int __ref kernel_init(void *unused) { kernel_init_freeable(); async_synchronize_full();",
      "system_state = SYSTEM_RUNNING; run_init_process(ramdisk_execute_command); }"
    ].join('  ');

    // True binary streams (representing 'Linux', 'Security', 'Dasa', ELF headers, and x86_64 opcodes)
    this.binaryStream = [
      "0100110001101001011011100111010101111000", // Linux
      "0101001101100101011000110111010101110010011010010111010001111001", // Security
      "01111111010001010100110001000110", // \x7fELF
      "00000010000000010000000100000000",
      "010010000011000101100000", // xor %rax, %rax
      "010010000011000101111111", // xor %rdi, %rdi
      "0000111100000101", // syscall
      "010000110111001001111001011100000111010001101111", // Crypto
      "010010110110010101110010011011100110010101101100", // Kernel
      "01010011011000010110111001100100011000100110111101111000", // Sandbox
      "01110011011110010111001101100011011000010110110001101100" // syscall
    ].join('');

    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.colTypes = [];
    this.colOffsets = [];
    this.animationId = null;
    // Off by default: nothing runs until start() is called explicitly.
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.targetFps = 32;
    this.frameInterval = 1000 / this.targetFps;
    // Locked decision: the Workbench surface is dark only. `theme-init.js`
    // pins `data-theme="dark"` pre-paint and no caller changes it, so the
    // legacy light branch (which read `data-theme` / `prefers-color-scheme`)
    // was unreachable and has been removed rather than kept as dead code.

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.cachedFont = `${this.fontSize}px monospace`;

    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.isRunning = false;
      this.canvas.style.opacity = '0';
      this.canvas.style.display = 'none';
      return;
    }

    // Start hidden; start() paints it back in. A stopped stream must not sit
    // as a solid 38%-opacity rectangle over the page.
    this.canvas.style.opacity = '0';

    this.updateFont();
    this.resize();
    window.addEventListener('resize', () => this.debounceResize(), { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.isRunning) {
        this.start();
      }
    });
  }

  updateFont() {
    try {
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace';
      this.cachedFont = `${this.fontSize}px ${family}`;
    } catch (e) {
      this.cachedFont = `${this.fontSize}px monospace`;
    }
  }

  debounceResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.resize(), 150);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = [];
    this.colTypes = [];
    this.colOffsets = [];

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * -this.canvas.height / this.fontSize);
      // Alternate columns: half stream authentic Linux Kernel C code, half stream true binary
      this.colTypes[i] = (i % 2 === 0) ? 'kernel' : 'binary';
      this.colOffsets[i] = Math.floor(Math.random() * (this.colTypes[i] === 'kernel' ? this.kernelStream.length : this.binaryStream.length));
    }

    this.ctx.fillStyle = STREAM_BG;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // A viewport can narrow AFTER the stream is already running (rotate a
    // tablet, drag a desktop window down). `start()` carries the hard gate, but
    // `start()` is not re-entered on resize, so without this the stream would
    // keep animating at 32 FPS on a narrow viewport until a reload. Stop it.
    //
    // This is deliberately stop-only: widening back does NOT auto-resume. The
    // requirement forbids running on a narrow viewport and nothing more, and
    // resuming would have to re-derive intent (it must never opt in a visitor
    // who never chose the stream). The stored preference is not touched here,
    // so the visitor's choice survives and a later `start()` or HUD toggle
    // still works. `stop()` is idempotent, so calling it on an already-stopped
    // stream (including the `init()` resize) is a safe no-op.
    if (isNarrowViewport()) this.stop();
  }

  start() {
    if (!this.canvas || this.reducedMotion) return;
    // Hard gate: never run the stream on a narrow viewport, whatever the caller.
    if (isNarrowViewport()) return;

    this.isRunning = true;
    this.canvas.style.opacity = STREAM_OPACITY;
    if (!this.animationId) {
      this.lastFrameTime = performance.now();
      this.loop(this.lastFrameTime);
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunning = false;
    if (this.canvas) {
      this.canvas.style.opacity = '0';
    }
  }

  setEnabled(on) {
    if (on) {
      this.start();
    } else {
      this.stop();
    }
  }

  pause() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    this.animationId = requestAnimationFrame((time) => this.loop(time));

    const elapsed = currentTime - this.lastFrameTime;
    if (elapsed < this.frameInterval) return;

    this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

    // Trailing fade effect. The surface is dark only, so the fade is the
    // obsidian wash with no light-canvas branch.
    this.ctx.fillStyle = 'rgba(3, 10, 6, 0.12)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = this.cachedFont;

    const headColor = '#ffffff';
    const trailColor = '#00ff66';

    for (let i = 0; i < this.drops.length; i++) {
      const isKernel = this.colTypes[i] === 'kernel';
      const stream = isKernel ? this.kernelStream : this.binaryStream;
      const char = stream[this.colOffsets[i] % stream.length];
      this.colOffsets[i]++;

      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      // Leading character (high intensity)
      this.ctx.fillStyle = headColor;
      this.ctx.fillText(char, x, y);

      // Previous character in trail
      if (this.drops[i] > 1) {
        const prevChar = stream[(this.colOffsets[i] - 1 + stream.length) % stream.length];
        this.ctx.fillStyle = trailColor;
        this.ctx.fillText(prevChar, x, y - this.fontSize);
      }

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
        this.colOffsets[i] = Math.floor(Math.random() * stream.length);
      }

      this.drops[i]++;
    }
  }
}
