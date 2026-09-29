/**
 * ============================================================================
 * TERMINAL ENGINE & INTERACTIVE CORE - DANIEL GONÇALVES ARAUJO (@dandgabr)
 * Pure Native ES6+ | Zero Dependencies | High-Assurance Architecture
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { getProjectData } from './projects-data.js';
import { TerminalCLI } from './terminal.js';

(() => {
  'use strict';

  /* ==========================================================================
     MODULE 1: Terminal Stream Canvas Engine (Ultra-Performant)
     ========================================================================== */
  class TerminalStream {
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
      this.isRunning = true;
      this.lastFrameTime = 0;
      this.targetFps = 32;
      this.frameInterval = 1000 / this.targetFps;
      this.theme = document.documentElement.getAttribute('data-theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.cachedFont = `${this.fontSize}px monospace`;

      this.init();
    }

    init() {
      if (this.reducedMotion) {
        this.isRunning = false;
        this.canvas.style.display = 'none';
        return;
      }

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

      this.start();
    }

    updateFont() {
      try {
        const family = getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace';
        this.cachedFont = `${this.fontSize}px ${family}`;
      } catch (e) {
        this.cachedFont = `${this.fontSize}px monospace`;
      }
    }

    setTheme(theme) {
      this.theme = theme;
      this.updateFont();
      if (this.ctx && this.canvas) {
        this.ctx.fillStyle = theme === 'light' ? '#f8faf9' : '#030a06';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

      this.ctx.fillStyle = this.theme === 'light' ? '#f8faf9' : '#030a06';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    start() {
      if (!this.isRunning && !this.reducedMotion) {
        this.isRunning = true;
      }
      if (!this.animationId && this.isRunning) {
        this.lastFrameTime = performance.now();
        this.loop(this.lastFrameTime);
      }
    }

    pause() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    toggle() {
      if (this.isRunning) {
        this.isRunning = false;
        this.pause();
        this.canvas.style.opacity = '0';
        return false;
      } else {
        this.isRunning = true;
        this.canvas.style.opacity = this.theme === 'light' ? '0.22' : '0.38';
        this.start();
        return true;
      }
    }

    loop(currentTime) {
      if (!this.isRunning) return;

      this.animationId = requestAnimationFrame((time) => this.loop(time));

      const elapsed = currentTime - this.lastFrameTime;
      if (elapsed < this.frameInterval) return;

      this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

      // Trailing fade effect: dark obsidian/green or light pure canvas
      if (this.theme === 'light') {
        this.ctx.fillStyle = 'rgba(248, 250, 249, 0.18)';
      } else {
        this.ctx.fillStyle = 'rgba(3, 10, 6, 0.12)';
      }
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = this.cachedFont;

      const isLight = this.theme === 'light';
      const headColor = isLight ? '#c2410c' : '#ffffff';
      const trailColor = isLight ? '#ea580c' : '#00ff66';

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

  /* ==========================================================================
     MODULE 2: Hero Boot Sequence Simulator (Typing Effect)
     ========================================================================== */
  class HeroBootSequence {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      this.activeInterval = null;
      this.activeTimeout = null;
      this.init();
    }

    getLines(lang) {
      const l = lang || I18N.currentLang || 'en';
      if (l === 'pt-br') {
        return [
          { text: '> [INIT] SEC_ARCH_KERNEL_v6.12-hardened ... MEMÓRIA_VERIFICADA: 64TB_OK', type: 'dim' },
          { text: '> [AUTH] IDENTIDADE CONFIRMADA: Daniel Gonçalves Araujo [@dandgabr]', type: 'accent' },
          { text: '> [ROLE] Arquiteto de Segurança da Informação @ Dasa', type: 'highlight' },
          { text: '> [CORE] Defesa Corporativa | Segurança e Hardening em IA | AppSec & DevSecOps | Nuvem', type: 'dim' },
          { text: '> [STATE] SISTEMA PRONTO. SHELL INTERATIVO INICIALIZADO.', type: 'accent' }
        ];
      }
      if (l === 'es') {
        return [
          { text: '> [INIT] SEC_ARCH_KERNEL_v6.12-hardened ... MEMÓRIA_VERIFICADA: 64TB_OK', type: 'dim' },
          { text: '> [AUTH] IDENTIDAD CONFIRMADA: Daniel Gonçalves Araujo [@dandgabr]', type: 'accent' },
          { text: '> [ROLE] Arquitecto de Seguridad de la Información @ Dasa', type: 'highlight' },
          { text: '> [CORE] Defensa Corporativa | Seguridad y Hardening en IA | AppSec & DevSecOps | Nube', type: 'dim' },
          { text: '> [STATE] SISTEMA LISTO. SHELL INTERACTIVA INICIALIZADA.', type: 'accent' }
        ];
      }
      return [
        { text: '> [INIT] SEC_ARCH_KERNEL_v6.12-hardened ... MEMORY_CHECK: 64TB_OK', type: 'dim' },
        { text: '> [AUTH] IDENTITY CONFIRMED: Daniel Gonçalves Araujo [@dandgabr]', type: 'accent' },
        { text: '> [ROLE] Information Security Architect @ Dasa', type: 'highlight' },
        { text: '> [CORE] Enterprise Defense | AI Safety & Hardening | AppSec & DevSecOps | Cloud Security', type: 'dim' },
        { text: '> [STATE] SYSTEM READY. INTERACTIVE SHELL SPAWNED.', type: 'accent' }
      ];
    }

    updateLang(lang) {
      if (this.activeInterval) clearInterval(this.activeInterval);
      if (this.activeTimeout) clearTimeout(this.activeTimeout);
      this.init(lang);
    }

    init(lang) {
      this.lines = this.getLines(lang);
      this.container.innerHTML = '';
      this.typeLine(0);
    }

    typeLine(index) {
      if (index >= this.lines.length) return;

      const item = this.lines[index];
      const p = document.createElement('p');
      p.className = `log-line text-${item.type}`;
      this.container.appendChild(p);

      let charIndex = 0;
      const speed = 12; // fast technical typing

      this.activeInterval = setInterval(() => {
        if (charIndex < item.text.length) {
          p.textContent += item.text[charIndex];
          charIndex++;
          this.container.scrollTop = this.container.scrollHeight;
        } else {
          clearInterval(this.activeInterval);
          this.activeInterval = null;
          this.activeTimeout = setTimeout(() => this.typeLine(index + 1), 120);
        }
      }, speed);
    }
  }

  /* ==========================================================================
     MODULE 4: Projects Filter & Modal Inspector
     ========================================================================== */
  class ProjectsEngine {
    constructor() {
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.projectCards = document.querySelectorAll('.project-card');
      this.modal = document.getElementById('project-modal');
      this.modalCloseBtn = document.getElementById('modal-close-btn');
      this.modalDismissBtn = document.getElementById('modal-dismiss-btn');

      this.initFilters();
      this.initModal();
    }

    initFilters() {
      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const filter = btn.getAttribute('data-filter');
          this.applyFilter(filter);
        });
      });
    }

    applyFilter(filter) {
      this.projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.split(/\s+/).includes(filter)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    }

    initModal() {
      if (!this.modal) return;

      // Handle inspect buttons
      document.querySelectorAll('.inspect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const projId = btn.getAttribute('data-project');
          this.openModal(projId);
        });
      });

      // Close buttons
      if (this.modalCloseBtn) {
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
      }
      if (this.modalDismissBtn) {
        this.modalDismissBtn.addEventListener('click', () => this.closeModal());
      }

      // Close on backdrop click
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });

      // Close on Escape
      this.modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
        }
      });
    }

    openModal(projId) {
      const data = getProjectData(projId, I18N.currentLang);
      if (!data) return;

      document.getElementById('modal-terminal-title').textContent = `${data.title}.sys // architecture_telemetry.log`;
      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-desc').textContent = `${data.subtitle}. ${data.desc}`;
      document.getElementById('modal-project-tag').textContent = data.tag;
      document.getElementById('modal-project-status').textContent = data.status;
      document.getElementById('modal-project-details').textContent = data.details;

      const stackContainer = document.getElementById('modal-project-stack');
      stackContainer.innerHTML = '';
      data.stack.forEach(item => {
        const span = document.createElement('span');
        span.className = 'skill-pill';
        span.textContent = item;
        stackContainer.appendChild(span);
      });

      const repoLink = document.getElementById('modal-repo-link');
      repoLink.href = data.repo;

      if (typeof this.modal.showModal === 'function') {
        this.modal.showModal();
      } else {
        this.modal.setAttribute('open', '');
      }
    }

    closeModal() {
      if (typeof this.modal.close === 'function') {
        this.modal.close();
      } else {
        this.modal.removeAttribute('open');
      }
    }
  }

  /* ==========================================================================
     MODULE 5: HUD System Controls & Navigation
     ========================================================================== */
  class HUDManager {
    constructor() {
      this.langBtn = document.getElementById('toggle-lang');
      this.langVal = document.getElementById('lang-val');
      this.themeBtn = document.getElementById('toggle-theme');
      this.themeVal = document.getElementById('theme-val');
      this.crtBtn = document.getElementById('toggle-crt');
      this.rainBtn = document.getElementById('toggle-rain');
      this.menuBtn = document.getElementById('mobile-menu-btn');
      this.navLinks = document.getElementById('nav-links');

      this.initLangToggle();
      this.initThemeToggle();
      this.initCRT();
      this.initRainToggle();
      this.initMobileMenu();
      this.initActiveScrollSpy();
    }

    initLangToggle() {
      // Determine initial language
      const initialLang = I18N.detectLanguage();
      I18N.setLanguage(initialLang, false);

      if (!this.langBtn) return;
      const langCycle = ['en', 'pt-br', 'es'];

      this.langBtn.addEventListener('click', () => {
        const current = I18N.currentLang || 'en';
        const currentIndex = langCycle.indexOf(current);
        const nextLang = langCycle[(currentIndex + 1) % langCycle.length];
        I18N.setLanguage(nextLang, true);
      });
    }

    initThemeToggle() {
      if (!this.themeBtn) return;

      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const getSystemTheme = () => (mediaQuery.matches ? 'light' : 'dark');
      const savedTheme = localStorage.getItem('theme_preference');

      const applyTheme = (theme, persist = false) => {
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (theme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
          if (this.themeVal) this.themeVal.textContent = 'LIGHT';
          this.themeBtn.setAttribute('aria-pressed', 'true');
          if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          if (this.themeVal) this.themeVal.textContent = 'DARK';
          this.themeBtn.setAttribute('aria-pressed', 'false');
          if (metaTheme) metaTheme.setAttribute('content', '#061109');
        }

        if (persist) {
          localStorage.setItem('theme_preference', theme);
        }

        if (window.streamInstance && typeof window.streamInstance.setTheme === 'function') {
          window.streamInstance.setTheme(theme);
        }
      };

      // Determine initial theme: saved preference takes precedence, otherwise system theme
      const initialTheme = savedTheme || getSystemTheme();
      applyTheme(initialTheme, false);

      // Listen for system theme changes if user hasn't explicitly set a preference
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme_preference')) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      });

      // Toggle theme on button click
      this.themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme, true);
      });
    }

    initCRT() {
      if (!this.crtBtn) return;

      const applyCrt = (off) => {
        document.documentElement.setAttribute('data-crt', off ? 'off' : 'on');
        this.crtBtn.querySelector('.btn-val').textContent = off ? 'OFF' : 'ON';
        this.crtBtn.setAttribute('aria-pressed', (!off).toString());
      };

      // theme-init.js already set data-crt pre-paint from the stored preference,
      // so the attribute is the single source of truth here.
      if (document.documentElement.getAttribute('data-crt') === 'off') {
        applyCrt(true);
      }

      this.crtBtn.addEventListener('click', () => {
        const off = document.documentElement.getAttribute('data-crt') !== 'off';
        applyCrt(off);
        localStorage.setItem('crt_scanline_off', off ? '1' : '0');
      });
    }

    initRainToggle() {
      if (!this.rainBtn) return;
      this.rainBtn.addEventListener('click', () => {
        if (window.streamInstance) {
          const active = window.streamInstance.toggle();
          this.rainBtn.querySelector('.btn-val').textContent = active ? 'RUN' : 'PAUSED';
          this.rainBtn.setAttribute('aria-pressed', active.toString());
        }
      });
    }

    initMobileMenu() {
      if (!this.menuBtn || !this.navLinks) return;
      this.menuBtn.addEventListener('click', () => {
        const expanded = this.navLinks.classList.toggle('mobile-open');
        this.menuBtn.setAttribute('aria-expanded', expanded.toString());
      });

      // Close menu when clicking any nav item
      this.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          this.navLinks.classList.remove('mobile-open');
          this.menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    initActiveScrollSpy() {
      const sections = document.querySelectorAll('section[id]');
      const navItems = document.querySelectorAll('.nav-item');
      if (!sections.length || !navItems.length) return;

      const setActive = (id) => {
        if (!id) return;
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActive(entry.target.getAttribute('id'));
            }
          });
        }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

        sections.forEach(sec => observer.observe(sec));
      } else {
        window.addEventListener('scroll', () => {
          let current = '';
          const scrollPos = window.scrollY + 120;
          sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              current = sec.getAttribute('id');
            }
          });
          setActive(current);
        }, { passive: true });
      }
    }
  }

  /* ==========================================================================
     APPLICATION BOOTSTRAPPER
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 0. Detect and Apply System / User Language
    const initialLang = I18N.detectLanguage();
    I18N.setLanguage(initialLang, false);

    // 1. Terminal Background Stream Canvas
    window.streamInstance = new TerminalStream('stream-canvas');

    // 2. Hero Boot Sequence Typing
    window.bootSeqInstance = new HeroBootSequence('boot-log');

    // 3. Interactive CLI Shell
    new TerminalCLI('terminal-form', 'cli-input', 'terminal-output');

    // 4. Projects Filter & Inspector
    new ProjectsEngine();

    // 5. HUD Controls
    new HUDManager();

    // 6. Avatar Image Fallback Listener
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg) {
      avatarImg.addEventListener('error', () => {
        avatarImg.hidden = true;
        const asciiFallback = document.getElementById('ascii-avatar');
        if (asciiFallback) asciiFallback.hidden = false;
      });
    }

    console.info('%c[SYS_KERNEL] Daniel Gonçalves Araujo portfolio online. System initialized.', 'color: #00ff66; font-weight: bold; background: #050807; padding: 4px;');
  });

})();
