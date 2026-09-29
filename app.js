/**
 * ============================================================================
 * TERMINAL ENGINE & INTERACTIVE CORE - DANIEL GONÇALVES ARAUJO (@dandgabr)
 * Pure Native ES6+ | Zero Dependencies | High-Assurance Architecture
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { PROJECTS_DATA, getProjectData } from './projects-data.js';

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
     MODULE 3: Interactive CLI Terminal Shell
     ========================================================================== */
  class TerminalCLI {
    constructor(formId, inputId, outputId) {
      this.form = document.getElementById(formId);
      this.input = document.getElementById(inputId);
      this.output = document.getElementById(outputId);
      this.history = [];
      this.historyIndex = -1;
      this.netCmdRunning = false; // rate-limit: only one network probe at a time

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
          if (arg === '--all' || arg === '-a') {
            this.cmdHelpAll();
          } else {
            this.cmdHelp();
          }
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
          this.cmdContact();
          break;
        case 'ping':
          this.cmdPing(arg);
          break;
        case 'traceroute':
        case 'trace':
          this.cmdTraceroute(arg);
          break;
        case 'nmap':
        case 'scan':
        case 'portscan':
          this.cmdNmap(arg);
          break;
        case 'hash':
        case 'sha256':
        case 'sha512':
          this.cmdHash(mainCmd, arg);
          break;
        case 'base64':
        case 'b64':
          this.cmdBase64(arg);
          break;
        case 'rot13':
        case 'rot':
          this.cmdRot13(arg);
          break;
        case 'iptables':
        case 'firewall':
        case 'nftables':
        case 'ufw':
          this.cmdIptables(arg);
          break;
        case 'honey':
        case 'honeypot':
        case 'canary':
        case 'trap':
          this.cmdHoney();
          break;
        case 'cve':
        case 'vuln':
        case 'advisory':
          this.cmdCve(arg);
          break;
        case 'sqlmap':
        case 'exploit':
        case 'hack':
        case 'inject':
        case "'":
        case '"':
          this.cmdSqlmap(cmdStr);
          break;
        case 'john':
        case 'crack':
        case 'hydra':
          this.cmdJohn(arg);
          break;
        case 'clear':
        case 'cls':
          this.cmdClear();
          break;
        case 'sudo':
          this.appendLog('dandga is not in the sudoers file. This incident will be reported to security.', 'text-dim');
          break;
        case 'date':
          this.appendLog(`UTC: ${new Date().toUTCString()} | LOCAL: ${new Date().toLocaleString()}`, 'text-main');
          break;
        case 'echo':
          this.appendLog(arg || '', 'text-main');
          break;
        default:
          if (cmdStr.toLowerCase().includes('or 1=1') || cmdStr.includes('<script') || cmdStr.includes('../')) {
            this.cmdSqlmap(cmdStr);
          } else {
            this.appendLog(`bash: command not found: ${mainCmd}. Type 'help' to inspect available instructions.`, 'text-dim');
          }
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

    cmdHelp() {
      const lang = I18N.currentLang || 'en';
      let helpText = '';
      if (lang === 'pt-br') {
        helpText = `
COMANDOS ARQUITETURAIS DISPONÍVEIS:
  whoami        - Exibir identidade, cargo e credenciais ativas
  about         - Revisar metodologia e filosofia de arquitetura de segurança
  skills        - Listar competências técnicas nas 4 áreas de atuação
  projects      - Listar repositórios de pesquisa abertos e ferramentas
  cat <id>      - Inspecionar telemetria detalhada de um projeto específico
                  (ex: 'cat hardening-ia', 'cat mcp-cheatengine')
  credentials   - Consultar certificações, pós-graduação e trajetória docente
  contact       - Exibir canais verificados de comunicação (LinkedIn, GitHub)
  stream        - Exibir estado da animação ou alternar fluxo (stream toggle)
  date          - Exibir carimbo de data/hora atual UTC e local
  clear         - Limpar histórico e mensagens do terminal
        `.trim();
      } else if (lang === 'es') {
        helpText = `
COMANDOS ARQUITECTÓNICOS DISPONIBLES:
  whoami        - Mostrar identidad, rol y credenciales vigentes
  about         - Revisar metodología y filosofía de arquitectura de seguridad
  skills        - Listar capacidades técnicas en los 4 dominios operativos
  projects      - Listar repositorios de investigación abiertos y herramientas
  cat <id>      - Inspeccionar telemetría detallada de un proyecto específico
                  (ej: 'cat hardening-ia', 'cat mcp-cheatengine')
  credentials   - Consultar certificaciones, posgrado y trayectoria docente
  contact       - Mostrar canales verificados de transmisión (LinkedIn, GitHub)
  stream        - Mostrar estado del flujo o alternar animación (stream toggle)
  date          - Mostrar marca temporal actual UTC y local
  clear         - Limpiar pantalla y búfer de la terminal
        `.trim();
      } else {
        helpText = `
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
      }
      this.appendLog(helpText, 'text-main');
    }

    cmdWhoami() {
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
NOME:         Daniel Gonçalves Araujo (@dandgabr)
CARGO:        Arquiteto de Segurança da Informação @ Dasa
DOMÍNIOS:     Arquitetura de Segurança Corporativa | Segurança e Hardening em IA | AppSec & DevSecOps | Nuvem
CERTIFICAÇÃO: CompTIA Security+ ce
LOCALIZAÇÃO:  Londrina, PR — Brasil
FILOSOFIA:    Engenharia de segurança de alta integridade. Defesa em profundidade da nuvem à contenção de agentes autônomos.
        `.trim();
      } else if (lang === 'es') {
        text = `
NOMBRE:       Daniel Gonçalves Araujo (@dandgabr)
ROL:          Arquitecto de Seguridad de la Información @ Dasa
DOMINIOS:     Arquitectura de Seguridad Corporativa | Seguridad y Hardening en IA | AppSec & DevSecOps | Nube
CERTIFICACIÓN: CompTIA Security+ ce
UBICACIÓN:    Londrina, PR — Brasil
FILOSOFÍA:    Ingeniería de seguridad de alta integridad. Defensa en profundidad desde la nube hasta el aislamiento de agentes.
        `.trim();
      } else {
        text = `
NAME:         Daniel Gonçalves Araujo (@dandgabr)
ROLE:         Information Security Architect @ Dasa
DOMAINS:      Enterprise Security Architecture | AI Safety & Hardening | AppSec & DevSecOps | Cloud Security
ACCREDITATION: CompTIA Security+ ce
LOCATION:     Londrina, PR — Brazil
PHILOSOPHY:   Bespoke, high-assurance security engineering. Defense-in-depth from cloud infrastructure to autonomous agent sandboxes.
        `.trim();
      }
      this.appendLog(text, 'text-accent');
    }

    cmdAbout() {
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
[PERFIL OPERACIONAL E METODOLOGIA]
• Arquiteto de Segurança da Informação na Dasa (maior rede integrada de saúde da América Latina).
• Especialista em modelagem de ameaças (STRIDE), automação de DevSecOps e governança de segurança em nuvem.
• Pesquisa ativa em modelos de contenção e validação de fronteiras para ferramentas de IA em desenvolvimento.
• Mais de 4 anos como docente universitário lecionando Segurança da Informação, Algoritmos e Eletrônica.
        `.trim();
      } else if (lang === 'es') {
        text = `
[PERFIL OPERATIVO Y METODOLOGÍA]
• Arquitecto de Seguridad de la Información en Dasa (mayor red integrada de salud de América Latina).
• Especialista en modelado de amenazas (STRIDE), automatización de DevSecOps y gobernanza de seguridad en la nube.
• Investigación activa en marcos de contención y validación de límites para herramientas de IA en desarrollo.
• Más de 4 años como docente universitario impartiendo Seguridad Informática, Algoritmos y Electrónica.
        `.trim();
      } else {
        text = `
[OPERATIONAL INTEL & METHODOLOGY]
• Enterprise Security Architect at Dasa (largest integrated healthcare network in Latin America).
• Specializing in threat modeling (STRIDE), DevSecOps automated pipelines, and cloud defense governance.
• Actively researching containment frameworks and boundary validation for autonomous AI developer tooling.
• Former University Professor (4+ years) teaching Information Security, Algorithms, Electronics & Computing.
        `.trim();
      }
      this.appendLog(text, 'text-main');
    }

    cmdSkills() {
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
[01_ARQUITETURA_DE_SEGURANÇA]
• Modelagem de Ameaças (STRIDE / PASTA) • OWASP SAMM & ASVS
• Defesa em Nuvem (AWS / Azure)         • Pipelines DevSecOps CI/CD
• Conformidade PCI-DSS                  • Hardening Linux CIS Benchmarks

[02_SEGURANÇA_EM_IA_E_AGENTES]
• Model Context Protocol (MCP)          • Sandboxing e Contenção de Agentes
• Hardening de Workspaces com IA        • Competências Modulares para Agentes
• Mitigação de Prompt Injection         • Pesquisa Acadêmica em IA (UTFPR)

[03_NUVEM_E_INFRAESTRUTURA]
• Segurança em Nuvem (AWS / Azure)      • Hardening de Sistemas Linux CIS
• Segurança em Contêineres e K8s        • Infraestrutura como Código (IaC)
• Gestão de Identidades e IAM           • Auditoria e Hardening de SO

[04_LINGUAGENS_E_FERRAMENTAL]
• Python • Bash • C# • Typst • Git / GitHub Actions
        `.trim();
      } else if (lang === 'es') {
        text = `
[01_ARQUITECTURA_DE_SEGURIDAD]
• Modelado de Amenazas (STRIDE / PASTA) • OWASP SAMM & ASVS
• Defensa en la Nube (AWS / Azure)      • Canales DevSecOps CI/CD
• Cumplimiento PCI-DSS                  • Hardening Linux CIS Benchmarks

[02_SEGURIDAD_EN_IA_Y_AGENTES]
• Model Context Protocol (MCP)          • Sandboxing y Contención de Agentes
• Hardening de Espacios con IA          • Habilidades Modulares para Agentes
• Mitigación de Prompt Injection        • Investigación Académica en IA (UTFPR)

[03_NUBE_E_INFRAESTRUCTURA]
• Seguridad en la Nube (AWS / Azure)    • Hardening de Sistemas Linux CIS
• Seguridad en Contenedores y K8s       • Infraestructura como Código (IaC)
• Gestión de Identidades e IAM          • Auditoría y Hardening de SO

[04_LENGUAJES_Y_HERRAMIENTAS]
• Python • Bash • C# • Typst • Git / GitHub Actions
        `.trim();
      } else {
        text = `
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
      }
      this.appendLog(text, 'text-main');
    }

    cmdProjects() {
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
PESQUISAS EM DESTAQUE E REPOSITÓRIOS (Use 'cat <id>' para telemetria completa):
  1. hardening-ia              - Hardening e isolamento automatizado de IA em desenvolvimento
  2. skills                    - Capacidades operacionais padronizadas e travas de segurança
  3. mcp-cheatengine           - Servidor Model Context Protocol para análise de processos
  4. linux-security-validator  - Auditoria e validação de conformidade com benchmarks CIS
  5. gdg-polylux-theme         - Decks programáticos em Typst e palestras sobre Computação Quântica
        `.trim();
      } else if (lang === 'es') {
        text = `
INVESTIGACIONES Y HERRAMIENTAS (Usa 'cat <id>' para telemetría profunda):
  1. hardening-ia              - Hardening y aislamiento automatizado de IA en desarrollo
  2. skills                    - Habilidades operativas estandarizadas y límites de seguridad
  3. mcp-cheatengine           - Servidor Model Context Protocol para análisis de procesos
  4. linux-security-validator  - Auditoría y verificación de cumplimiento con benchmarks CIS
  5. gdg-polylux-theme         - Diapositivas programáticas en Typst y charlas de Computación Cuántica
        `.trim();
      } else {
        text = `
FEATURED RESEARCH & TOOLS (Use 'cat <id>' for deep telemetry):
  1. hardening-ia              - Automated AI workspace hardening & isolation
  2. skills                    - Standardized agentic capabilities & guardrails
  3. mcp-cheatengine           - Model Context Protocol server for memory analysis
  4. linux-security-validator  - CIS benchmark audit & OS baseline validator
  5. gdg-polylux-theme         - Programmatic Typst slide decks & Quantum Computing talks
        `.trim();
      }
      this.appendLog(text, 'text-main');
    }

    cmdCat(id) {
      if (!id) {
        this.appendLog("Usage: cat <project_id> (e.g., 'cat hardening-ia')", 'text-dim');
        return;
      }
      const proj = getProjectData(id, I18N.currentLang);
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
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
[CERTIFICAÇÕES E FORMAÇÃO ACADÊMICA]
• Certificação CompTIA Security+ ce
  - Credencial internacional de competência operacional em cibersegurança.

• Pós-Graduação em Inteligência Artificial
  - Universidade Tecnológica Federal do Paraná (UTFPR).

• Bacharelado em Engenharia Elétrica e Eletrônica
  - Faculdade Pitágoras. Formação sólida em circuitos, hardware e microcontroladores.

• Ex-Professor Universitário (Mais de 4 Anos)
  - Ensino Superior: Aulas de Segurança da Informação, Algoritmos e Eletrônica.
        `.trim();
      } else if (lang === 'es') {
        text = `
[CERTIFICACIONES Y FORMACIÓN ACADÉMICA]
• Certificación CompTIA Security+ ce
  - Credencial internacional de competencia operativa en ciberseguridad.

• Posgrado en Inteligencia Artificial
  - Universidade Tecnológica Federal do Paraná (UTFPR).

• Licenciatura en Ingeniería Eléctrica y Electrónica
  - Faculdade Pitágoras. Base rigurosa en circuitos, hardware y microcontroladores.

• Exprofesor Universitario (Más de 4 Años)
  - Educación Superior: Cátedras de Seguridad Informática, Algoritmos y Electrónica.
        `.trim();
      } else {
        text = `
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
      }
      this.appendLog(text, 'text-main');
    }

    cmdContact() {
      const lang = I18N.currentLang || 'en';
      let text = '';
      if (lang === 'pt-br') {
        text = `
[CANAIS DE TRANSMISSÃO]
• LinkedIn:    https://www.linkedin.com/in/dandga
• GitHub:      https://github.com/dandgabr
• Localização: Londrina, PR — Brasil (UTC-3)
• Diretriz:    Zero spam. Comunicações técnicas profissionais via LinkedIn ou GitHub.
        `.trim();
      } else if (lang === 'es') {
        text = `
[CANALES DE TRANSMISIÓN]
• LinkedIn:  https://www.linkedin.com/in/dandga
• GitHub:    https://github.com/dandgabr
• Ubicación: Londrina, PR — Brasil (UTC-3)
• Política:  Cero spam. Comunicaciones técnicas profesionales vía LinkedIn o GitHub.
        `.trim();
      } else {
        text = `
[TRANSMISSION CHANNELS]
• LinkedIn:  https://www.linkedin.com/in/dandga
• GitHub:    https://github.com/dandgabr
• Location:  Londrina, PR — Brazil (UTC-3)
• Notice:    Zero spam. Professional and technical inquiries via LinkedIn or GitHub.
        `.trim();
      }
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

    cmdHelpAll() {
      const lang = I18N.currentLang || 'en';
      let base = '';
      let classified = '';

      if (lang === 'pt-br') {
        base = `
COMANDOS ARQUITETURAIS DISPONÍVEIS:
  whoami        - Exibir identidade, cargo e credenciais ativas
  about         - Revisar metodologia e filosofia de arquitetura de segurança
  skills        - Listar competências técnicas nas 4 áreas de atuação
  projects      - Listar repositórios de pesquisa abertos e ferramentas
  cat <id>      - Inspecionar telemetria detalhada de um projeto específico
  credentials   - Consultar certificações, pós-graduação e trajetória docente
  contact       - Exibir canais verificados de comunicação (LinkedIn, GitHub)
  stream        - Exibir estado da animação ou alternar fluxo (stream toggle)
  date          - Exibir carimbo de data/hora atual UTC e local
  clear         - Limpar histórico e mensagens do terminal`.trim();
        classified = `

[CLASSIFICADO / EASTER EGGS INFOSEC] — Nível Root liberado:
  ping <host>        - Medir latência HTTPS (camada 7) para um host público
  traceroute <host>  - Simular rota de rede até um host público via HTTPS
  nmap [host]        - Simular varredura de portas e postura defensiva de borda
  hash [algo] <txt>  - Calcular hash criptográfico (SHA-256 / SHA-512) via Web Crypto
  base64 <enc|dec>   - Codificar ou decodificar strings no navegador
  rot13 <texto>      - Cifra clássica de rotação para ofuscação
  iptables [-L]      - Inspecionar regras ativas de firewall e isolamento de agentes
  honey              - Inspecionar telemetria de armadilha defensiva e canary tokens
  cve [id|list]      - Consultar boletins de vulnerabilidades em IA e infraestrutura
  sqlmap / exploit   - Testar o escudo de proteção WAF e sanitização client-side
  john [hash]        - Simular análise de entropia e resistência de senhas
  help --all         - Você já está usando. Parabéns.
  sudo               - Boa tentativa.`.trim();
      } else if (lang === 'es') {
        base = `
COMANDOS ARQUITECTÓNICOS DISPONIBLES:
  whoami        - Mostrar identidad, rol y credenciales vigentes
  about         - Revisar metodología e filosofía de arquitectura de seguridad
  skills        - Listar capacidades técnicas en los 4 dominios operativos
  projects      - Listar repositorios de investigación abiertos y herramientas
  cat <id>      - Inspeccionar telemetría detalhada de un proyecto específico
  credentials   - Consultar certificaciones, posgrado y trayectoria docente
  contact       - Mostrar canales verificados de transmisión (LinkedIn, GitHub)
  stream        - Mostrar estado del flujo o alternar animación (stream toggle)
  date          - Mostrar marca temporal actual UTC e local
  clear         - Limpiar pantalla y búfer de la terminal`.trim();
        classified = `

[CLASIFICADO / EASTER EGGS INFOSEC] — Nivel Root desbloqueado:
  ping <host>        - Medir latencia HTTPS (capa 7) a un host público
  traceroute <host>  - Simular ruta de red a un host público vía HTTPS
  nmap [host]        - Simular escaneo de puertos y postura defensiva de borde
  hash [algo] <txt>  - Calcular hash criptográfico (SHA-256 / SHA-512) vía Web Crypto
  base64 <enc|dec>   - Codificar o decodificar cadenas en el navegador
  rot13 <texto>      - Cifrado clásico de rotación para ofuscación
  iptables [-L]      - Inspeccionar reglas activas de firewall y aislamiento de agentes
  honey              - Inspeccionar telemetría de trampa defensiva y canary tokens
  cve [id|list]      - Consultar boletines de vulnerabilidades en IA e infraestructura
  sqlmap / exploit   - Probar el escudo defensivo WAF y sanitización en cliente
  john [hash]        - Simular análisis de entropía y resistencia de contraseñas
  help --all         - Ya lo estás usando. Felicitaciones.
  sudo               - Buen intento.`.trim();
      } else {
        base = `
AVAILABLE ARCHITECTURAL COMMANDS:
  whoami        - Display identity, role, and current credentials
  about         - Review security architecture methodology & philosophy
  skills        - List technical capabilities across all 4 domains
  projects      - Enumerate open research repositories & tools
  cat <id>      - Inspect architectural telemetry of a specific project
  credentials   - Review academic degrees, certifications & teaching career
  contact       - Output verified transmission coordinates (LinkedIn, GitHub)
  stream        - Display kernel stream status or toggle (stream toggle)
  date          - Display current system UTC timestamp
  clear         - Clear terminal output console buffer`.trim();
        classified = `

[CLASSIFIED / INFOSEC EASTER EGGS] — Root level unlocked:
  ping <host>        - Probe HTTPS web latency to a public host (Layer 7)
  traceroute <host>  - Simulate network path to a public host via HTTPS
  nmap [host]        - Simulate port scan & edge defensive posture
  hash [algo] <txt>  - Compute cryptographic hash (SHA-256 / SHA-512) via Web Crypto
  base64 <enc|dec>   - Encode or decode strings client-side
  rot13 <text>       - Classic Caesar cipher rotation for string obfuscation
  iptables [-L]      - Inspect active firewall rules & agent isolation boundaries
  honey              - Inspect cloud decoy telemetry & canary token tripwires
  cve [id|list]      - Query security advisories on AI & infrastructure
  sqlmap / exploit   - Test the client WAF shield & architecture resilience
  john [hash]        - Simulate password entropy analysis & resistance
  help --all         - You're already using it. Congratulations.
  sudo               - Nice try.`.trim();
      }

      this.appendLog(base, 'text-main');
      this.appendLog(classified, 'text-accent');
    }

    // ── AppSec-hardened host validator ─────────────────────────────────────────
    // Returns the sanitized hostname string, or null if the input is invalid/blocked.
    _sanitizeHost(raw) {
      if (!raw || typeof raw !== 'string') return null;

      // Strip leading/trailing whitespace and lowercase
      const host = raw.trim().toLowerCase();

      // Reject empty input
      if (!host) return null;

      // Reject if contains characters that indicate ports, paths, credentials, or params
      if (/[/:@?#\\]/.test(host)) return null;

      // Allow only valid FQDN characters (RFC 1123) or IPv4/IPv6 brackets
      // FQDN: letters, digits, hyphens, dots — must have at least one dot and a TLD
      const fqdnRe = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;
      // IPv4: four octets
      const ipv4Re = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

      const isFQDN = fqdnRe.test(host);
      const ipv4Match = host.match(ipv4Re);

      if (!isFQDN && !ipv4Match) return null;

      // Block internal/reserved TLDs
      const blockedTLDs = ['.local', '.internal', '.lan', '.corp', '.home', '.onion', '.localhost'];
      if (blockedTLDs.some(t => host.endsWith(t))) return null;

      // Block localhost hostname directly
      if (host === 'localhost') return null;

      // Block known cloud-metadata hostnames
      const blockedHostnames = ['metadata.google.internal', '169.254.169.254', 'instance-data'];
      if (blockedHostnames.includes(host)) return null;

      // Block private/reserved IPv4 ranges
      if (ipv4Match) {
        const [, a, b, c] = ipv4Match.map(Number);
        const isPrivate =
          a === 10 ||                                           // 10.0.0.0/8
          (a === 172 && b >= 16 && b <= 31) ||                 // 172.16.0.0/12
          (a === 192 && b === 168) ||                          // 192.168.0.0/16
          a === 127 ||                                          // 127.0.0.0/8 loopback
          (a === 169 && b === 254) ||                          // 169.254.0.0/16 link-local / metadata
          a === 0 ||                                            // 0.0.0.0/8 reserved
          (a === 100 && b >= 64 && b <= 127) ||               // 100.64.0.0/10 CGNAT
          a >= 224;                                            // 224.0.0.0/4 multicast + 240.0.0.0/4 reserved
        if (isPrivate) return null;
      }

      // Block IPv6 special addresses (literal notation)
      if (['::1', '::'].includes(host)) return null;
      if (host.startsWith('fe80') || host.startsWith('fd00') || host.startsWith('fc00')) return null;

      return host;
    }

    // ── Easter Egg: ping ───────────────────────────────────────────────────────
    async cmdPing(rawHost) {
      if (this.netCmdRunning) {
        this.appendLog('Network probe already running. Wait for it to complete.', 'text-dim');
        return;
      }

      const host = this._sanitizeHost(rawHost);
      if (!host) {
        this.appendLog(
          !rawHost
            ? "Usage: ping <host>  (e.g., ping dan.seg.br)"
            : `ping: ${rawHost}: invalid or blocked host (private/reserved addresses not allowed)`,
          'text-dim'
        );
        return;
      }

      const url = new URL(`https://${host}/`).href;
      const PACKETS = 4;
      const INTERVAL_MS = 1000;
      const TIMEOUT_MS = 5000;
      const rtts = [];

      this.netCmdRunning = true;
      this.appendLog(`PING ${host} (HTTPS/443) — ${PACKETS} packets, web latency probe`, 'text-accent');
      this.appendLog(`\u26a0  Note: browser RTT (HTTPS Layer 7), not ICMP — results may include TLS/TCP overhead.`, 'text-dim');

      for (let i = 1; i <= PACKETS; i++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        const t0 = performance.now();

        try {
          await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
            credentials: 'omit',
            signal: controller.signal,
          });
          const rtt = (performance.now() - t0).toFixed(1);
          rtts.push(parseFloat(rtt));
          this.appendLog(`  [${i}/${PACKETS}] seq=${i} ttl=64  time=${rtt} ms`, 'text-main');
        } catch {
          this.appendLog(`  [${i}/${PACKETS}] seq=${i}  Request timeout`, 'text-dim');
        } finally {
          clearTimeout(timer);
        }

        if (i < PACKETS) await new Promise(r => setTimeout(r, INTERVAL_MS));
      }

      // Statistics
      const received = rtts.length;
      const lost = PACKETS - received;
      const loss = ((lost / PACKETS) * 100).toFixed(0);
      const stats = received > 0
        ? `rtt min/avg/max = ${Math.min(...rtts).toFixed(1)}/${(rtts.reduce((a, b) => a + b, 0) / received).toFixed(1)}/${Math.max(...rtts).toFixed(1)} ms`
        : 'rtt: no response received';

      this.appendLog(`\n--- ${host} ping statistics ---`, 'text-accent');
      this.appendLog(`${PACKETS} packets transmitted, ${received} received, ${loss}% packet loss`, 'text-main');
      this.appendLog(stats, 'text-main');

      this.netCmdRunning = false;
      this.output.scrollTop = this.output.scrollHeight;
    }

    // ── Easter Egg: traceroute ─────────────────────────────────────────────────
    async cmdTraceroute(rawHost) {
      if (this.netCmdRunning) {
        this.appendLog('Network probe already running. Wait for it to complete.', 'text-dim');
        return;
      }

      const host = this._sanitizeHost(rawHost);
      if (!host) {
        this.appendLog(
          !rawHost
            ? "Usage: traceroute <host>  (e.g., traceroute dan.seg.br)"
            : `traceroute: ${rawHost}: invalid or blocked host (private/reserved addresses not allowed)`,
          'text-dim'
        );
        return;
      }

      const url = new URL(`https://${host}/`).href;
      const MAX_HOPS = 12;
      const TIMEOUT_MS = 5000;

      // Fictional intermediate hop labels (purely cosmetic)
      const hopLabels = [
        '_gateway.net', 'isp-edge-01.net', 'core-rtr-02.backbone.net',
        'ae0.pe1.atl.backbone.net', 'be100.cr1.nyc.backbone.net',
        'be200.cr2.mia.backbone.net', 'peer-gw.cdn-edge.net',
        'cdn-anycast-01.edge.net', 'edge-pop-sao.cdn.net',
        'cdn-cache-gru.edge.net', 'leaf-sw-01.dc-gru.net',
      ];

      // Gaussian-ish noise for simulated RTTs
      const simRTT = (base) => {
        const jitter = (Math.random() - 0.5) * base * 0.15;
        return Math.max(0.5, base + jitter).toFixed(1);
      };

      this.netCmdRunning = true;
      this.appendLog(`traceroute to ${host}, ${MAX_HOPS} hops max, HTTPS web probe`, 'text-accent');
      this.appendLog(`[simulated intermediate hops — browsers cannot route ICMP]`, 'text-dim');

      // Simulate intermediate hops with escalating latency
      const simHops = Math.min(MAX_HOPS - 1, hopLabels.length);
      for (let i = 1; i <= simHops; i++) {
        const base = 2 + i * 5 + Math.random() * 4;
        const label = hopLabels[i - 1].padEnd(28);
        const r1 = simRTT(base), r2 = simRTT(base), r3 = simRTT(base);
        await new Promise(r => setTimeout(r, 120 + Math.random() * 80));
        this.appendLog(` ${String(i).padStart(2)}  ${label} [simulated]   ${r1} ms  ${r2} ms  ${r3} ms`, 'text-main');
      }

      // Final hop: real HTTPS probe
      const hopNum = simHops + 1;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const t0 = performance.now();

      try {
        await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
          credentials: 'omit',
          signal: controller.signal,
        });
        const rtt = (performance.now() - t0).toFixed(1);
        const halfRtt = (parseFloat(rtt) / 2).toFixed(1);
        const label = host.padEnd(28);
        this.appendLog(` ${String(hopNum).padStart(2)}  ${label} [HTTPS/443]   ${rtt} ms  ${halfRtt} ms  ${rtt} ms`, 'text-accent');
        this.appendLog(`\nTrace complete. ${host} is reachable via HTTPS (web latency: ${rtt} ms).`, 'text-accent');
      } catch {
        this.appendLog(` ${String(hopNum).padStart(2)}  ${host.padEnd(28)} [HTTPS/443]   * * * Request timeout`, 'text-dim');
        this.appendLog(`\nTrace incomplete. ${host} did not respond within ${TIMEOUT_MS / 1000}s.`, 'text-dim');
      } finally {
        clearTimeout(timer);
      }

      this.netCmdRunning = false;
      this.output.scrollTop = this.output.scrollHeight;
    }

    // ── Easter Egg: nmap ───────────────────────────────────────────────────────
    cmdNmap(rawTarget) {
      const target = (rawTarget || 'dan.seg.br').trim();
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const isDan = target.toLowerCase().includes('dan.seg.br') || target === '104.21.72.194' || !rawTarget;

      const output = [
        `Starting Nmap 7.94 ( https://nmap.org ) at ${now} UTC`,
        `Nmap scan report for ${isDan ? 'dan.seg.br (104.21.72.194)' : target}`,
        `Host is up (0.0019s latency).`,
        `Not shown: 996 filtered tcp ports (no-response)`,
        `PORT     STATE  SERVICE     VERSION`,
        `80/tcp   open   http        Cloudflare edge proxy (301 redirect to HTTPS)`,
        `443/tcp  open   ssl/https   Cloudflare TLS 1.3 / Strict-Transport-Security`,
        `8443/tcp closed mcp-gateway Model Context Protocol Sandbox (mTLS required)`,
        `22/tcp   closed ssh         Bastion access via Tailscale mesh boundary only`,
        ``,
        isDan
          ? `Service detection performed. 0 exposed vulnerabilities. Zero-Trust posture confirmed.`
          : `Note: Target ${target} host simulated in local sandbox. External probing restricted.`,
        `Nmap done: 1 IP address (1 host up) scanned in 0.38 seconds`
      ].join('\n');

      this.appendLog(output, 'text-main');
    }

    // ── Easter Egg: hash (Web Crypto API SHA-256 / SHA-512) ───────────────────
    async cmdHash(cmd, rawArgs) {
      let algo = 'SHA-256';
      let text = (rawArgs || '').trim();

      if (cmd === 'sha512' || text.toLowerCase().startsWith('sha512 ')) {
        algo = 'SHA-512';
        text = text.replace(/^sha512\s+/i, '').trim();
      } else if (cmd === 'sha256' || text.toLowerCase().startsWith('sha256 ')) {
        algo = 'SHA-256';
        text = text.replace(/^sha256\s+/i, '').trim();
      } else if (text.toLowerCase().startsWith('md5')) {
        this.appendLog('[SECURITY WARNING] MD5 is cryptographically broken (collision attacks since RFC 6151). Enforcing SHA-256.', 'text-dim');
        algo = 'SHA-256';
        text = text.replace(/^md5\s*/i, '').trim();
      }

      if (!text) {
        text = 'zero-trust-architecture';
        this.appendLog(`[INFO] No input string specified. Defaulting to: "${text}"`, 'text-dim');
      }

      // Remove quotes if present
      text = text.replace(/^["'](.*)["']$/, '$1');

      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const res = [
          `[ALGORITHM]   ${algo} (NIST FIPS 180-4 / W3C Web Cryptography API)`,
          `[INPUT_BYTES] ${data.length} bytes | UTF-8`,
          `[DIGEST]      ${hashHex}`,
          `[VERDICT]     Cryptographic integrity verified client-side.`
        ].join('\n');

        this.appendLog(res, 'text-accent');
      } catch (err) {
        this.appendLog(`hash: Web Crypto API error: ${err.message}`, 'text-dim');
      }
    }

    // ── Easter Egg: base64 encode/decode ───────────────────────────────────────
    cmdBase64(args) {
      const parts = (args || '').trim().split(/\s+/);
      const sub = parts[0]?.toLowerCase();
      let text = parts.slice(1).join(' ').trim();

      if (!sub || parts.length === 1 && !['encode', 'decode', 'enc', 'dec'].includes(sub)) {
        text = args || 'Welcome to dan.seg.br // High-Integrity Security Engineering';
        try {
          const encoded = btoa(unescape(encodeURIComponent(text)));
          this.appendLog(`[TRANSFORMATION] Base64 Encode (default)\n[INPUT]          ${text}\n[OUTPUT]         ${encoded}`, 'text-main');
        } catch {
          this.appendLog(`base64: encoding error`, 'text-dim');
        }
        return;
      }

      if (sub === 'encode' || sub === 'enc') {
        if (!text) text = 'Security Architecture';
        try {
          const encoded = btoa(unescape(encodeURIComponent(text)));
          this.appendLog(`[TRANSFORMATION] Base64 Encode\n[INPUT]          ${text}\n[OUTPUT]         ${encoded}`, 'text-main');
        } catch {
          this.appendLog(`base64: encoding error`, 'text-dim');
        }
      } else if (sub === 'decode' || sub === 'dec') {
        if (!text) text = 'V2VsY29tZSB0byBkYW4uc2VnLmJy';
        try {
          const decoded = decodeURIComponent(escape(atob(text)));
          this.appendLog(`[TRANSFORMATION] Base64 Decode\n[INPUT]          ${text}\n[OUTPUT]         ${decoded}`, 'text-accent');
        } catch {
          this.appendLog(`base64: invalid base64 input string`, 'text-dim');
        }
      }
    }

    // ── Easter Egg: rot13 ──────────────────────────────────────────────────────
    cmdRot13(rawText) {
      const text = (rawText || 'Qnavry Tbaçnyirf Nenhwb').trim();
      const rotated = text.replace(/[a-zA-Z]/g, (c) => {
        const code = c.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });

      this.appendLog(`[ROT13 CIPHER]\n[INPUT]  ${text}\n[OUTPUT] ${rotated}`, 'text-main');
    }

    // ── Easter Egg: iptables / firewall ────────────────────────────────────────
    cmdIptables(arg) {
      const output = [
        `Chain INPUT (policy DROP 0 packets, 0 bytes)`,
        ` pkts bytes target     prot opt in  out  source          destination`,
        `  14k  1.8M ACCEPT     all  --  lo  *    0.0.0.0/0       0.0.0.0/0`,
        ` 8.2k  620K ACCEPT     tcp  --  *   *    0.0.0.0/0       0.0.0.0/0     tcp dpt:443 ctstate NEW,ESTABLISHED`,
        `   89  4200 DROP       all  --  *   *    0.0.0.0/0       0.0.0.0/0     ctstate INVALID`,
        `  412   24K LOG_DROP   tcp  --  *   *    0.0.0.0/0       0.0.0.0/0     tcp dpt:22 recent: CHECK seconds:60 hit_count:4`,
        `    0     0 SANDBOX_EN all  -- br0  *    10.99.0.0/16    0.0.0.0/0     /* AI Agent Isolation Boundary */`,
        ``,
        `Chain FORWARD (policy DROP 0 packets, 0 bytes)`,
        `Chain OUTPUT (policy ACCEPT 12k packets, 1.4M bytes)`,
        ``,
        `[STATUS] Default Deny active. Ingress boundary strictly monitored.`
      ].join('\n');

      this.appendLog(output, 'text-main');
    }

    // ── Easter Egg: honey / canary ─────────────────────────────────────────────
    cmdHoney() {
      const output = [
        `[!] HONEYPOT TRIPWIRE TRIGGERED // VIRTUAL CANARY ENGAGED`,
        `----------------------------------------------------------------------`,
        `[SEVERITY]     INFORMATIONAL / DEFENSIVE DECOY`,
        `[TRAP_SERVICE] Cloud Infrastructure Decoy // Autonomous Agent Boundary`,
        `[DETECTION]    Heuristic signature matched: "curious_security_researcher"`,
        `[INTERACTION]  Viewport coordinates isolated. Client session marked benign.`,
        `[PHILOSOPHY]   "The best threat containment is wasting an adversary's compute on decoys."`,
        `[STATUS]       No alarms raised. You found the honey token. Have a coffee \u2615.`
      ].join('\n');

      this.appendLog(output, 'text-accent');
    }

    // ── Easter Egg: cve ────────────────────────────────────────────────────────
    cmdCve(rawQuery) {
      const query = (rawQuery || '').toLowerCase().trim();

      if (!query || query === 'list') {
        const list = [
          `[CURATED THREAT INTELLIGENCE & ADVISORIES]`,
          `Query a specific topic via 'cve <topic>' (e.g., 'cve llm', 'cve mcp', 'cve 2024'):`,
          ``,
          `  1. OWASP-LLM01   - Prompt Injection & Autonomous Agent Tool Misuse`,
          `  2. MCP-SEC-01    - Model Context Protocol Sandbox Boundary Escape`,
          `  3. CVE-2024-3094 - XZ Utils Supply Chain Backdoor & Compromise`,
          `  4. OWASP-LLM02   - Insecure Output Handling & Indirect Payload Execution`
        ].join('\n');
        this.appendLog(list, 'text-main');
        return;
      }

      if (query.includes('mcp')) {
        this.appendLog([
          `[CVE INTELLIGENCE REPORT: MCP-SEC-01]`,
          `ID:          MCP-SEC-01 / PROTOCOL-SANDBOX-BOUNDARY`,
          `NAME:        Model Context Protocol Server Capability Escalation`,
          `CVSS 3.1:    8.8 [HIGH] (CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N)`,
          `TARGET:      Local Agent Runtime & Tool Calling Workspaces`,
          `MITIGATION:  Enforce strict JSON schema capability contracts, read-only workspaces,`,
          `             and auto-approved read-only bounds. (Ref: 'cat hardening-ia')`
        ].join('\n'), 'text-accent');
      } else if (query.includes('xz') || query.includes('3094')) {
        this.appendLog([
          `[CVE INTELLIGENCE REPORT: CVE-2024-3094]`,
          `ID:          CVE-2024-3094 / XZ-BACKDOOR`,
          `NAME:        Malicious code injection in XZ Utils / liblzma tarballs`,
          `CVSS 3.1:    10.0 [CRITICAL] (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)`,
          `TARGET:      OpenSSH sshd pre-authentication daemon hooks`,
          `LESSON:      Software Supply Chain Defense, multi-reviewer commit validation,`,
          `             and binary build provenance verification (SLSA Level 3+).`
        ].join('\n'), 'text-accent');
      } else {
        this.appendLog([
          `[CVE INTELLIGENCE REPORT: OWASP-LLM01]`,
          `ID:          OWASP-LLM01 / CVE-2024-AI-INJ`,
          `NAME:        Direct & Indirect Prompt Injection in Autonomous LLM Systems`,
          `CVSS 3.1:    8.6 [HIGH] (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N)`,
          `TARGET:      Autonomous AI Coding Assistants & MCP Tools`,
          `MITIGATION:  Implement deterministic boundary validation, prompt-data segregation,`,
          `             and container sandboxing (Ref: 'cat hardening-ia').`
        ].join('\n'), 'text-accent');
      }
    }

    // ── Easter Egg: sqlmap / exploit / WAF shield ──────────────────────────────
    cmdSqlmap(payload) {
      const output = [
        `[WAF / ZERO-TRUST CLIENT SHIELD] Inbound attack heuristic intercepted.`,
        `----------------------------------------------------------------------`,
        `[PAYLOAD]      Heuristic pattern detected: "${payload}"`,
        `[ANALYSIS]     Target architecture is an immutable, static JAMstack client.`,
        `               No SQL engine, no active server runtime, zero writable server state.`,
        `[DOM DEFENSE]  Terminal stream writes strictly via node textContent (DOM XSS immune).`,
        `[LESSON]       "Attack surface eliminated by architecture, not just firewalls."`,
        `[ACTION]       Payload neutralized. To review real security architecture, type 'skills'.`
      ].join('\n');

      this.appendLog(output, 'text-accent');
    }

    // ── Easter Egg: john / crack (Password Entropy Simulation) ──────────────────
    async cmdJohn(rawTarget) {
      if (this.netCmdRunning) {
        this.appendLog('A diagnostic process is already running. Please wait.', 'text-dim');
        return;
      }

      this.netCmdRunning = true;
      const hash = (rawTarget || '$6$randomSalt$encryptedPasswordHashString').trim();

      this.appendLog(`Loaded 1 password hash (${hash.substring(0, 20)}...)`, 'text-main');
      this.appendLog(`Cost 1 (iteration count) is 5000 for SHA-512 crypt`, 'text-dim');
      this.appendLog(`Proceeding with dictionary: rockyou.txt (simulated 14.3M candidates)...`, 'text-dim');

      await new Promise(r => setTimeout(r, 220));
      this.appendLog(`[..] 0g 0:00:00:01 0.00% (ETA: 2098-07-14) 4320Kp/s...`, 'text-main');

      await new Promise(r => setTimeout(r, 260));
      this.appendLog(`[!] CRACKING HALTED: Target entropy exceeds feasibility limit (2^128 operations required).`, 'text-accent');
      this.appendLog(`[SECURITY BASICS] High-entropy passphrases and modern hashes resist offline brute-force.`, 'text-main');
      this.appendLog(`[RECOMMENDATION] Prefer Passkeys (FIDO2/WebAuthn) or Argon2id with >= 16 characters.`, 'text-dim');

      this.netCmdRunning = false;
      this.output.scrollTop = this.output.scrollHeight;
    }

  } // end class TerminalCLI

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
