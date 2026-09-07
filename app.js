/**
 * ============================================================================
 * TERMINAL ENGINE & INTERACTIVE CORE - DANIEL GONÇALVES ARAUJO (@dandgabr)
 * Pure Native ES6+ | Zero Dependencies | High-Assurance Architecture
 * ============================================================================
 */

(() => {
  'use strict';

  /* ==========================================================================
     PROJECT DATA STORE (Architectural Telemetry)
     ========================================================================== */
  const PROJECTS_DATA = {
    'hardening-ia': {
      title: 'hardening-ia',
      subtitle: 'Automated Security Hardening for AI Developer Workspaces',
      tag: 'AI Security & Sandboxing',
      status: 'ACTIVE_RESEARCH',
      desc: 'Automated security hardening framework and validation scripts designed for AI-assisted development tools, sandboxing environments, and developer workspace security containment.',
      details: `[THREAT VECTORS ADDRESSED]
• Prompt injection escalation into host filesystem and container escapes.
• Unrestricted socket creation and lateral movement by autonomous agents.
• Credential leakage via environment variables and malicious script injection.

[IMPLEMENTATION ARCHITECTURE]
• Containerized sandboxing configurations (Docker / Podman / Bubblewrap profiles).
• Python automated audit scripts validating filesystem ACLs, process isolation, and outbound egress rules.
• Aligned with OWASP Top 10 for LLM Applications (LLM02: Sensitive Information Disclosure, LLM06: Excessive Agency).`,
      stack: ['Python', 'Linux Hardening', 'AI Safety', 'Threat Modeling', 'Sandboxing', 'OWASP LLM Top 10'],
      repo: 'https://github.com/dandgabr/hardening-ia'
    },
    'skills': {
      title: 'skills',
      subtitle: 'Standardized Agentic Capabilities & Tool Execution Guardrails',
      tag: 'Agentic AI & Workflows',
      status: 'STANDARDIZED',
      desc: 'A comprehensive, battle-tested repository of standardized skills and domain capabilities for autonomous AI coding agents, enforcing deterministic tool execution and security constraints.',
      details: `[ARCHITECTURAL BLUEPRINT]
• Standardized domain skill definitions for autonomous AI software engineering.
• Strict parameter typing, boundary guards, and deterministic input validation.
• Guardrails preventing destructive operations without verified multi-step confirmation gates.

[SECURITY PROTOCOL]
• Enforces the principle of least privilege on agentic file writes and command executions.
• Eliminates hallucinated tool parameters through strict schema verification.`,
      stack: ['Agentic AI', 'Modular Skills', 'Antigravity Ecosystem', 'LLM Tooling', 'Autonomous Workflows'],
      repo: 'https://github.com/dandgabr/skills'
    },
    'mcp-cheatengine': {
      title: 'mcp-cheatengine',
      subtitle: 'Model Context Protocol Server for Process Automation & Inspection',
      tag: 'AI Tooling & MCP Integration',
      status: 'INTEGRATION',
      desc: 'Model Context Protocol (MCP) server interface for Cheat Engine, enabling programmatic inspection, process automation, and security telemetry for AI assistants.',
      details: `[SYSTEM ARCHITECTURE]
• Bridges LLM tool-calling interfaces with Cheat Engine's native process inspection API.
• Exposes memory read/scan/freeze capabilities over the standardized Model Context Protocol.
• Allows AI models to inspect process structures, trace execution states, and automate workflows.

[CONTAINMENT & SAFETY]
• Process operations restricted to pre-authorized target process IDs.
• Audit logging of offsets and read operations to ensure system stability.`,
      stack: ['Model Context Protocol (MCP)', 'Cheat Engine', 'Process Automation', 'Security Tooling', 'Python / C#'],
      repo: 'https://github.com/dandgabr/mcp-cheatengine'
    },
    'linux-security-validator': {
      title: 'Linux Security Validator',
      subtitle: 'Automated CIS Benchmark Compliance & Baseline Audit Engine',
      tag: 'CIS Hardening & Linux',
      status: 'COMPLIANCE',
      desc: 'Automated scripts for security audit, baseline compliance, and permission checking across Linux workstations and server environments.',
      details: `[AUDIT CAPABILITIES]
• System validation against Center for Internet Security (CIS) Linux benchmarks.
• Identification of SUID/SGID binaries, anomalous capabilities, and world-writable paths.
• Hardening validation for kernel parameters (/etc/sysctl.d - ASLR, TCP SYN cookies, ptrace scope).
• Automated validation of critical authentication files (/etc/passwd, /etc/shadow, /etc/sudoers).

[OUTPUT TELEMETRY]
• Formatted terminal scorecard with severity metrics and automated remediation playbooks.`,
      stack: ['Python', 'Bash Scripting', 'CIS Benchmarks', 'Linux Hardening', 'Audit Automation', 'OS Forensics'],
      repo: 'https://github.com/dandgabr/Valida-o-de-seguran-a-em-sistemas-Linux'
    },
    'gdg-polylux-theme': {
      title: 'GDG Typst Presentation Theme & Talks',
      subtitle: 'Programmatic Typst Decks & Quantum Computing Materials',
      tag: 'Community & Technical Talks',
      status: 'COMMUNITY',
      desc: 'Modular presentation deck theme designed for Typst using Polylux, inspired by Google Developer Groups visual identity, accompanied by technical talk materials including Quantum Computing Fundamentals.',
      details: `[TECHNICAL COMPOSITION]
• Programmatic presentation templates using Typst and the Polylux engine.
• Recreates Google Developer Groups (GDG) visual identity without heavy WYSIWYG office suites.
• Version-controlled presentation decks that build deterministically in CI/CD pipelines.

[COMMUNITY ENGAGEMENT]
• Accompanied by technical talk slides, including 'Quantum Computing Fundamentals' delivered at community gatherings.`,
      stack: ['Typst', 'Polylux', 'Google Developer Groups', 'Quantum Computing', 'Technical Speaking'],
      repo: 'https://github.com/dandgabr/gdg-polylux-theme'
    }
  };

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

      this.init();
    }

    init() {
      if (this.reducedMotion) {
        this.isRunning = false;
        this.canvas.style.display = 'none';
        return;
      }

      this.resize();
      window.addEventListener('resize', () => this.debounceResize());

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause();
        } else if (this.isRunning) {
          this.start();
        }
      });

      this.start();
    }

    setTheme(theme) {
      this.theme = theme;
      if (this.ctx && this.canvas) {
        this.ctx.fillStyle = theme === 'light' ? '#f8faf9' : '#020403';
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

      this.ctx.fillStyle = this.theme === 'light' ? '#f8faf9' : '#020403';
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

      // Trailing fade effect: dark obsidian or light pure canvas
      if (this.theme === 'light') {
        this.ctx.fillStyle = 'rgba(248, 250, 249, 0.18)';
      } else {
        this.ctx.fillStyle = 'rgba(2, 4, 3, 0.12)';
      }
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = `${this.fontSize}px ${getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace'}`;

      for (let i = 0; i < this.drops.length; i++) {
        const isKernel = this.colTypes[i] === 'kernel';
        const stream = isKernel ? this.kernelStream : this.binaryStream;
        const char = stream[this.colOffsets[i] % stream.length];
        this.colOffsets[i]++;

        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;

        if (this.theme === 'light') {
          // Light Mode: High-contrast technical orange & amber on clean white
          this.ctx.fillStyle = '#c2410c';
          this.ctx.shadowBlur = 4;
          this.ctx.shadowColor = '#ea580c';
          this.ctx.fillText(char, x, y);

          if (this.drops[i] > 1) {
            const prevChar = stream[(this.colOffsets[i] - 1 + stream.length) % stream.length];
            this.ctx.fillStyle = '#ea580c';
            this.ctx.shadowBlur = 1;
            this.ctx.shadowColor = '#f97316';
            this.ctx.fillText(prevChar, x, y - this.fontSize);
          }
        } else {
          // Dark Mode: High-Assurance Phosphor Neon
          this.ctx.fillStyle = '#ffffff';
          this.ctx.shadowBlur = 6;
          this.ctx.shadowColor = '#00ff66';
          this.ctx.fillText(char, x, y);

          if (this.drops[i] > 1) {
            const prevChar = stream[(this.colOffsets[i] - 1 + stream.length) % stream.length];
            this.ctx.fillStyle = '#00ff66';
            this.ctx.shadowBlur = 2;
            this.ctx.shadowColor = '#00cc55';
            this.ctx.fillText(prevChar, x, y - this.fontSize);
          }
        }

        this.ctx.shadowBlur = 0;

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

      this.lines = [
        { text: '> [INIT] SEC_ARCH_KERNEL_v6.12-hardened ... MEMORY_CHECK: 64TB_OK', type: 'dim' },
        { text: '> [AUTH] IDENTITY CONFIRMED: Daniel Gonçalves Araujo [@dandgabr]', type: 'accent' },
        { text: '> [ROLE] Information Security Architect @ Dasa', type: 'highlight' },
        { text: '> [CORE] Enterprise Defense | AI Safety & Hardening | AppSec & DevSecOps | Cloud Security', type: 'dim' },
        { text: '> [STATE] SYSTEM READY. INTERACTIVE SHELL SPAWNED.', type: 'accent' }
      ];

      this.init();
    }

    init() {
      // Clear fallback and type lines smoothly
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

      const interval = setInterval(() => {
        if (charIndex < item.text.length) {
          p.textContent += item.text[charIndex];
          charIndex++;
          this.container.scrollTop = this.container.scrollHeight;
        } else {
          clearInterval(interval);
          setTimeout(() => this.typeLine(index + 1), 120);
        }
      }, speed);
    }
  }

  /* ==========================================================================
     MODULE 3: Interactive CLI Terminal Shell
     ========================================================================== */
  class TerminalCLI {
    constructor(formId, inputId, outputId) {
      this.form = document.getElementById(formId);
      this.input = document.getElementById(inputId);
      this.output = document.getElementById(outputId);
      this.history = [];
      this.historyIndex = -1;

      if (!this.form || !this.input || !this.output) return;

      this.init();
    }

    init() {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cmd = this.input.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      });

      // Quick command chips
      document.querySelectorAll('.cmd-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const cmd = chip.getAttribute('data-cmd');
          if (cmd) {
            this.input.value = cmd;
            this.execute(cmd);
            this.history.push(cmd);
            this.historyIndex = this.history.length;
            this.input.value = '';
          }
        });
      });

      // Command history navigation via Arrow Up/Down
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.history.length > 0 && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.input.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            this.input.value = '';
          }
        }
      });
    }

    execute(cmdStr) {
      const parts = cmdStr.split(/\s+/);
      const mainCmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase();

      // Echo command
      this.appendLog(`terminal> ${cmdStr}`, 'term-cmd-echo');

      switch (mainCmd) {
        case 'help':
          this.cmdHelp();
          break;
        case 'whoami':
          this.cmdWhoami();
          break;
        case 'about':
        case 'intel':
          this.cmdAbout();
          break;
        case 'skills':
          this.cmdSkills();
          break;
        case 'stream':
          if (arg === 'toggle') {
            this.toggleStream();
          } else {
            this.cmdStreamInfo();
          }
          break;
        case 'projects':
        case 'ls':
          this.cmdProjects();
          break;
        case 'cat':
        case 'project':
          this.cmdCat(arg);
          break;
        case 'credentials':
        case 'education':
        case 'certs':
          this.cmdCredentials();
          break;
        case 'contact':
        case 'ping':
          this.cmdContact();
          break;
        case 'clear':
        case 'cls':
          this.cmdClear();
          break;
        case 'sudo':
          this.appendLog('dandga is not in the sudoers file. This incident will be reported to the Security Architect.', 'text-dim');
          break;
        case 'date':
          this.appendLog(`UTC: ${new Date().toUTCString()} | LOCAL: ${new Date().toLocaleString()}`, 'text-main');
          break;
        case 'echo':
          this.appendLog(arg || '', 'text-main');
          break;
        default:
          this.appendLog(`bash: command not found: ${mainCmd}. Type 'help' to inspect available instructions.`, 'text-dim');
          break;
      }

      this.output.scrollTop = this.output.scrollHeight;
    }

    appendLog(content, className = '') {
      const div = document.createElement('div');
      div.className = `term-response ${className}`;
      div.textContent = content;
      this.output.appendChild(div);
    }

    appendHtmlLog(html) {
      const div = document.createElement('div');
      div.className = 'term-response';
      div.innerHTML = html;
      this.output.appendChild(div);
    }

    cmdHelp() {
      const helpText = `
AVAILABLE ARCHITECTURAL COMMANDS:
  whoami        - Display identity, role, and current credentials
  about         - Review security architecture methodology & philosophy
  skills        - List technical capabilities across all 4 domains
  projects      - Enumerate open research repositories & tools
  cat <id>      - Inspect architectural telemetry of a specific project
                  (e.g., 'cat hardening-ia', 'cat mcp-cheatengine')
  credentials   - Review academic degrees, certifications & teaching career
  contact       - Output verified transmission coordinates (LinkedIn, GitHub)
  stream        - Display kernel/binary stream status or toggle (stream toggle)
  date          - Display current system UTC timestamp
  clear         - Clear terminal output console buffer
      `.trim();
      this.appendLog(helpText, 'text-main');
    }

    cmdWhoami() {
      const text = `
NAME:         Daniel Gonçalves Araujo (@dandgabr)
ROLE:         Information Security Architect @ Dasa
DOMAINS:      Enterprise Security Architecture | AI Safety & Hardening | AppSec & DevSecOps | Cloud Security
ACCREDITATION:CompTIA Security+ ce
LOCATION:     Londrina, PR — Brazil
PHILOSOPHY:   Bespoke, high-assurance security engineering. Defense-in-depth from cloud infrastructure to autonomous agent sandboxes.
      `.trim();
      this.appendLog(text, 'text-accent');
    }

    cmdAbout() {
      const text = `
[OPERATIONAL INTEL & METHODOLOGY]
• Enterprise Security Architect at Dasa (largest integrated healthcare network in Latin America).
• Specializing in threat modeling (STRIDE), DevSecOps automated pipelines, and cloud defense governance.
• Actively researching containment frameworks and boundary validation for autonomous AI developer tooling.
• Former University Professor (4+ years) teaching Information Security, Algorithms, Electronics & Computing.
      `.trim();
      this.appendLog(text, 'text-main');
    }

    cmdSkills() {
      const text = `
[01_SECURITY_ARCHITECTURE]
• Threat Modeling (STRIDE / PASTA)  • OWASP SAMM & ASVS
• Cloud Defense (AWS / Azure)       • DevSecOps CI/CD Pipelines
• PCI-DSS Compliance                • Linux CIS Benchmark Hardening

[02_AI_SAFETY_&_AGENTS]
• Model Context Protocol (MCP)      • Agent Sandboxing & Containment
• AI Workspace Hardening            • Modular Agentic Skills
• Prompt Injection Mitigation       • Academic AI Research (UTFPR)

[03_CLOUD_&_INFRASTRUCTURE]
• Cloud Security (AWS / Azure)      • Linux CIS Benchmark Hardening
• Container & K8s Security          • Infrastructure as Code (IaC)
• IAM & Identity Governance         • OS Hardening & Auditing

[04_LANGUAGES_&_TOOLING]
• Python • Bash • C# • Typst • Git / GitHub Actions
      `.trim();
      this.appendLog(text, 'text-main');
    }

    cmdProjects() {
      const text = `
FEATURED RESEARCH & TOOLS (Use 'cat <id>' for deep telemetry):
  1. hardening-ia              - Automated AI workspace hardening & isolation
  2. skills                    - Standardized agentic capabilities & guardrails
  3. mcp-cheatengine           - Model Context Protocol server for memory analysis
  4. linux-security-validator  - CIS benchmark audit & OS baseline validator
  5. gdg-polylux-theme         - Programmatic Typst slide decks & Quantum Computing talks
      `.trim();
      this.appendLog(text, 'text-main');
    }

    cmdCat(id) {
      if (!id) {
        this.appendLog("Usage: cat <project_id> (e.g., 'cat hardening-ia')", 'text-dim');
        return;
      }
      const proj = PROJECTS_DATA[id];
      if (!proj) {
        this.appendLog(`cat: ${id}: No such telemetry node. Run 'projects' to list valid IDs.`, 'text-dim');
        return;
      }

      const text = `
================================================================================
PROJECT TELEMETRY: ${proj.title}
STATUS: ${proj.status} | DOMAIN: ${proj.tag}
================================================================================
${proj.desc}

${proj.details}

STACK: ${proj.stack.join(', ')}
REPOSITORY: ${proj.repo}
================================================================================
      `.trim();
      this.appendLog(text, 'text-accent');
    }

    cmdCredentials() {
      const text = `
[CERTIFICATIONS & ACADEMIC TRAJECTORY]
• CompTIA Security+ ce Certification
  - Globally recognized baseline cybersecurity accreditation.

• Postgraduate in Artificial Intelligence
  - Universidade Tecnológica Federal do Paraná (UTFPR).

• B.S. in Electrical and Electronic Engineering
  - Faculdade Pitágoras. Comprehensive hardware, circuit & microcontroller basis.

• Former University Professor (4+ Years)
  - Higher Education: Taught InfoSec, Algorithms, Microcontrollers & Electronics.
      `.trim();
      this.appendLog(text, 'text-main');
    }

    cmdContact() {
      const text = `
[TRANSMISSION CHANNELS]
• LinkedIn:  https://www.linkedin.com/in/dandga
• GitHub:    https://github.com/dandgabr
• Location:  Londrina, PR — Brazil (UTC-3)
• Notice:    Zero spam. Professional and technical inquiries via LinkedIn or GitHub.
      `.trim();
      this.appendLog(text, 'text-accent');
    }

    cmdStreamInfo() {
      this.appendLog("Stream Engine: 32 FPS, Linux Kernel C source + Binary stream. Type 'stream toggle' to toggle stream.", 'text-main');
    }

    toggleStream() {
      if (window.streamInstance) {
        const active = window.streamInstance.toggle();
        this.appendLog(`Terminal Stream status: ${active ? 'ACTIVE' : 'PAUSED'}`, 'text-accent');
        const rainBtn = document.getElementById('toggle-rain');
        if (rainBtn) {
          rainBtn.querySelector('.btn-val').textContent = active ? 'RUN' : 'PAUSED';
        }
      }
    }

    cmdClear() {
      this.output.innerHTML = '';
      this.appendLog('Terminal console buffer cleared.', 'text-dim');
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
      const data = PROJECTS_DATA[projId];
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
      this.themeBtn = document.getElementById('toggle-theme');
      this.themeVal = document.getElementById('theme-val');
      this.crtBtn = document.getElementById('toggle-crt');
      this.rainBtn = document.getElementById('toggle-rain');
      this.menuBtn = document.getElementById('mobile-menu-btn');
      this.navLinks = document.getElementById('nav-links');

      this.initThemeToggle();
      this.initCRT();
      this.initRainToggle();
      this.initMobileMenu();
      this.initActiveScrollSpy();
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
          if (metaTheme) metaTheme.setAttribute('content', '#050807');
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
      const isCrtOff = localStorage.getItem('crt_scanline_off') === 'true';
      if (isCrtOff) {
        document.body.classList.add('crt-off');
        this.crtBtn.querySelector('.btn-val').textContent = 'OFF';
        this.crtBtn.setAttribute('aria-pressed', 'false');
      }

      this.crtBtn.addEventListener('click', () => {
        const off = document.body.classList.toggle('crt-off');
        this.crtBtn.querySelector('.btn-val').textContent = off ? 'OFF' : 'ON';
        this.crtBtn.setAttribute('aria-pressed', (!off).toString());
        localStorage.setItem('crt_scanline_off', off.toString());
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

        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
      }, { passive: true });
    }
  }

  /* ==========================================================================
     APPLICATION BOOTSTRAPPER
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Terminal Background Stream Canvas
    window.streamInstance = new TerminalStream('stream-canvas');

    // 2. Hero Boot Sequence Typing
    new HeroBootSequence('boot-log');

    // 3. Interactive CLI Shell
    new TerminalCLI('terminal-form', 'cli-input', 'terminal-output');

    // 4. Projects Filter & Inspector
    new ProjectsEngine();

    // 5. HUD Controls
    new HUDManager();

    console.info('%c[SYS_KERNEL] Daniel Gonçalves Araujo portfolio online. System initialized.', 'color: #00ff66; font-weight: bold; background: #050807; padding: 4px;');
  });

})();
