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

  /* ==========================================================================
     INTERNATIONALIZATION DICTIONARY & CORE ENGINE (pt-br, en, es)
     ========================================================================== */
  const I18N = {
    currentLang: "en",

    detectLanguage() {
      try {
        const saved = localStorage.getItem("lang_preference");
        if (saved && ["en", "pt-br", "es"].includes(saved)) {
          return saved;
        }
        const navLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
        if (navLang.startsWith("pt")) return "pt-br";
        if (navLang.startsWith("es")) return "es";
        if (navLang.startsWith("en")) return "en";
        return "en";
      } catch (e) {
        return "en";
      }
    },

    translations: {
      "en": {
        "a11y.skip": "Skip to system interface [Enter]",
        "hud.active": "[ACTIVE]",
        "nav.root": "//ROOT",
        "nav.terminal": "//TERMINAL",
        "nav.intel": "//INTEL",
        "nav.skills": "//SKILLS",
        "nav.projects": "//PROJECTS",
        "nav.academic": "//ACADEMIC",
        "nav.connect": "//CONNECT",
        "hero.badge.role": "SECURITY ARCHITECT @ DASA",
        "hero.badge.geo": "LONDRINA, PR — BRAZIL",
        "hero.subline": "Architecting resilient enterprise defenses, developing containment frameworks for autonomous AI agents, and establishing continuous DevSecOps governance.",
        "hero.pillar1.title": "Enterprise Security",
        "hero.pillar1.sub": "Threat Modeling & DevSecOps",
        "hero.pillar2.title": "AI Safety & Hardening",
        "hero.pillar2.sub": "MCP & Agent Containment",
        "hero.pillar3.title": "Cloud & Infrastructure",
        "hero.pillar3.sub": "AWS, Azure, and CIS Hardening",
        "hero.action.terminal": "INTERACTIVE TERMINAL",
        "hero.action.projects": "INSPECT RESEARCH",
        "hero.action.github": "GITHUB PROFILE",
        "hero.hud.status": "STATUS",
        "hero.hud.online": "ONLINE",
        "hero.hud.clearance": "CLEARANCE",
        "sec.terminal.title": "INTERACTIVE COMMAND SHELL",
        "terminal.instructions.prefix": "Type",
        "terminal.instructions.suffix": "to list commands, or click any tactical command chip below:",
        "terminal.welcome": "Session initialized for peer review. Type 'help' for guidance.",
        "terminal.placeholder": "type a command...",
        "terminal.input_aria": "Terminal command line input",
        "sec.about.title": "DOSSIER // PROFESSIONAL INTEL",
        "dossier.profile_label": "[OPERATIONAL PROFILE]",
        "dossier.role_title": "Information Security Architect",
        "dossier.org_label": "ORGANIZATION:",
        "dossier.org_name": "Dasa (Largest integrated healthcare network in Latin America)",
        "dossier.p1": "Operating at the intersection of Enterprise Defense Architecture and Emerging Autonomous Tech, I engineer security frameworks that prevent exploitation before code reaches production and isolate autonomous agents operating in developer workspaces.",
        "dossier.p2": "My engineering approach is rooted in systems programming, microcontroller diagnostics, and threat containment. With 4+ years of academic background lecturing algorithms, computer security, and electronics, I combine pedagogical clarity with technical rigor in application security, threat modeling, and secure software development lifecycles.",
        "dossier.spec.discipline_label": "DISCIPLINE:",
        "dossier.spec.discipline_val": "Security Architecture & DevSecOps",
        "dossier.spec.focus_label": "RESEARCH_FOCUS:",
        "dossier.spec.focus_val": "AI Safety, MCP Sandboxing, Memory Forensics",
        "dossier.spec.accred_label": "ACCREDITATION:",
        "dossier.spec.community_label": "COMMUNITY:",
        "dossier.spec.community_val": "Google Developer Groups (GDG) Speaker",
        "triad.label": "[DEFENSE METHODOLOGY]",
        "triad.title": "The Three Pillars of Defense",
        "triad.p1.title": "Enterprise Security Architecture & AppSec",
        "triad.p1.desc": "Establishing defense-in-depth through systematic threat modeling (STRIDE, PASTA), OWASP ASVS/SAMM frameworks, and automated DevSecOps pipelines integrated into CI/CD environments.",
        "triad.p2.title": "AI Safety & Agent Containment",
        "triad.p2.desc": "Engineering practical sandboxing for developer AI tooling. Designing MCP (Model Context Protocol) validation layers and agent skill frameworks to prevent prompt injection and tool misuse.",
        "triad.p3.title": "Cloud Security & DevSecOps",
        "triad.p3.desc": "Automating security policy enforcement, infrastructure hardening (CIS Benchmarks), container integrity, and compliance controls across multi-cloud environments (AWS & Azure).",
        "sec.skills.title": "CORE EXPERTISE & TECHNICAL DOMAINS",
        "skills.q1.title": "Security Architecture & Governance",
        "skills.q1.desc": "Enterprise defense design, policy enforcement, and resilient DevSecOps integration.",
        "skills.q2.title": "AI Safety & Agentic Systems",
        "skills.q2.desc": "Hardening autonomous agents, sandbox containment, and protocol-level integration.",
        "skills.q3.title": "Cloud Security & Infrastructure",
        "skills.q3.desc": "Enterprise cloud defense, operating system hardening, compliance baselines, and infrastructure security.",
        "skills.q4.title": "Languages, Scripting & Tooling",
        "skills.q4.desc": "Languages and automation pipelines for rapid validation and reproducible reporting.",
        "sec.projects.title": "FEATURED RESEARCH & OPEN REPOSITORIES",
        "projects.tab.all": "[ ALL (5) ]",
        "projects.tab.security": "[ SECURITY (2) ]",
        "projects.tab.ai": "[ AI & AGENTS (2) ]",
        "projects.tab.tools": "[ TOOLING (1) ]",
        "projects.tab.community": "[ COMMUNITY (1) ]",
        "proj.status.prod": "PRODUCTION",
        "proj.status.integration": "INTEGRATION",
        "proj.status.compliance": "COMPLIANCE",
        "proj.status.community": "COMMUNITY",
        "proj.tag.aisafety": "AI Safety",
        "proj.tag.hardening": "Hardening",
        "proj.tag.agentic": "Agentic AI",
        "proj.tag.modular": "Modular Skills",
        "proj.tag.automation": "Process Automation",
        "proj.tag.gdg": "GDG Speaker",
        "proj.action.inspect": "INSPECT ARCHITECTURE",
        "proj.hardening_ia.desc": "Automated security hardening framework designed for AI-assisted development environments. Implements sandbox verification, API token boundary enforcement, and permission audits.",
        "proj.hardening_ia.c1": "> Zero-trust isolation for local AI coding CLI tools",
        "proj.hardening_ia.c2": "> Workspace token and credential leakage prevention",
        "proj.hardening_ia.c3": "> Automated compliance and baseline validation audits",
        "proj.skills.desc": "A battle-tested ecosystem of standardized, modular skills engineered for AI coding agents, multi-agent orchestration, and developer assistants.",
        "proj.skills.c1": "> Standardized capability contracts across 50+ domains",
        "proj.skills.c2": "> Multi-agent supervisory and governance patterns",
        "proj.skills.c3": "> Deterministic execution paths for autonomous coding",
        "proj.mcp_ce.desc": "Model Context Protocol (MCP) server interface for Cheat Engine, enabling programmatic inspection, process automation, and security telemetry for AI assistants.",
        "proj.mcp_ce.c1": "> MCP server bridging LLMs to process inspection",
        "proj.mcp_ce.c2": "> Real-time process address inspection and automation",
        "proj.mcp_ce.c3": "> Autonomous agent inspection tooling for developer workflows",
        "proj.linux_sec.desc": "Automated scripts for security auditing, CIS baseline compliance validation, file permission anomaly detection, and kernel parameter enforcement across Linux servers and developer workstations.",
        "proj.linux_sec.c1": "> System audit against CIS Linux benchmarks",
        "proj.linux_sec.c2": "> SUID/SGID executable discovery & anomaly alerts",
        "proj.linux_sec.c3": "> Automated remediation checklist generation",
        "proj.gdg_theme.desc": "Modular presentation deck theme designed for Typst using Polylux, inspired by Google Developer Groups visual identity, accompanied by technical talk materials including Quantum Computing Fundamentals.",
        "proj.gdg_theme.c1": "> Modern programmatic typesetting with Typst",
        "proj.gdg_theme.c2": "> High-contrast slides for technical architecture talks",
        "proj.gdg_theme.c3": "> Includes Quantum Computing fundamentals material",
        "sec.credentials.title": "ACADEMIC TRAJECTORY & CERTIFICATIONS",
        "cred.badge.cert": "CERTIFICATION",
        "cred.badge.postgrad": "POSTGRADUATE",
        "cred.badge.bs": "BACHELOR OF SCIENCE",
        "cred.badge.teaching": "ACADEMIA & TEACHING",
        "cred.c1.title": "CompTIA Security+ ce Certification",
        "cred.c1.detail": "Globally recognized credential validating foundational and operational cybersecurity proficiency: network architecture security, threat analysis, incident response, cryptographic controls, and risk governance.",
        "cred.c2.title": "Postgraduate Specialization in Artificial Intelligence",
        "cred.c2.detail": "Specialized research and development in machine learning paradigms, deep neural architectures, heuristic optimization, and automated decision-making models.",
        "cred.c3.title": "B.S. in Electrical and Electronic Engineering",
        "cred.c3.detail": "Comprehensive engineering foundation: circuit analysis, analog/digital signal processing, embedded systems, microcontrollers, control theory, and hardware-level computer architecture.",
        "cred.c4.institution": "Higher Education Institution",
        "cred.c4.title": "Former University Professor (4+ Years)",
        "cred.c4.detail": "Taught undergraduate courses in Information Security, Algorithms and Data Structures, Analog and Digital Electronics, and Embedded Microcontrollers. Mentored future engineers in algorithmic thinking and secure systems design.",
        "sec.contact.title": "TRANSMISSION CHANNELS // CONNECT",
        "contact.channels_label": "[SECURE COMMUNICATION CHANNELS]",
        "contact.headline": "Establish Connection with Security Architect",
        "contact.sub": "Available for technical dialogues on enterprise defense architecture, AI agent safety research, threat modeling workshops, and community speaking engagements.",
        "contact.linkedin_label": "PROFESSIONAL NETWORK",
        "contact.github_label": "SOURCE REPOSITORIES",
        "contact.geo_key": "GEOLOCATION:",
        "contact.geo_val": "Londrina, Paraná — Brazil (UTC-3)",
        "contact.policy_key": "POLICY:",
        "contact.policy_val": "Zero spam, direct professional communication via LinkedIn/GitHub only.",
        "modal.summary_title": "> ARCHITECTURAL SUMMARY & KEY CHALLENGES",
        "modal.stack_title": "> STACK & SPECIFICATIONS",
        "modal.action.github": "VISIT REPOSITORY ON GITHUB",
        "modal.action.close": "[ESC] CLOSE TERMINAL",
        "footer.spec": "ZERO-FRAMEWORKS • PURE HTML5/CSS3/ES6+",
        "footer.copy": "© 2026 Daniel Gonçalves Araujo. High-assurance security architecture."
      },
      "pt-br": {
        "a11y.skip": "Ir para a interface do sistema [Enter]",
        "hud.active": "[ATIVO]",
        "nav.root": "//RAIZ",
        "nav.terminal": "//TERMINAL",
        "nav.intel": "//DOSSIÊ",
        "nav.skills": "//DOMÍNIOS",
        "nav.projects": "//PROJETOS",
        "nav.academic": "//FORMAÇÃO",
        "nav.connect": "//CONTATO",
        "hero.badge.role": "ARQUITETO DE SEGURANÇA @ DASA",
        "hero.badge.geo": "LONDRINA, PR — BRASIL",
        "hero.subline": "Projetando defesas corporativas resilientes, estabelecendo modelos de contenção para agentes autônomos de IA e governança contínua de DevSecOps.",
        "hero.pillar1.title": "Segurança Corporativa",
        "hero.pillar1.sub": "Modelagem de Ameaças e DevSecOps",
        "hero.pillar2.title": "Segurança e Hardening em IA",
        "hero.pillar2.sub": "Contenção de Agentes e Protocolo MCP",
        "hero.pillar3.title": "Nuvem e Infraestrutura",
        "hero.pillar3.sub": "AWS, Azure e Hardening CIS",
        "hero.action.terminal": "TERMINAL INTERATIVO",
        "hero.action.projects": "INSPECIONAR PESQUISAS",
        "hero.action.github": "PERFIL NO GITHUB",
        "hero.hud.status": "ESTADO",
        "hero.hud.online": "ONLINE",
        "hero.hud.clearance": "AUTORIZAÇÃO",
        "sec.terminal.title": "SHELL DE COMANDOS INTERATIVO",
        "terminal.instructions.prefix": "Digite",
        "terminal.instructions.suffix": "para listar comandos, ou clique nos atalhos táticos abaixo:",
        "terminal.welcome": "Sessão inicializada para revisão técnica. Digite 'help' para instruções.",
        "terminal.placeholder": "digite um comando...",
        "terminal.input_aria": "Entrada de linha de comando do terminal",
        "sec.about.title": "DOSSIÊ // PERFIL PROFISSIONAL",
        "dossier.profile_label": "[PERFIL OPERACIONAL]",
        "dossier.role_title": "Arquiteto de Segurança da Informação",
        "dossier.org_label": "ORGANIZAÇÃO:",
        "dossier.org_name": "Dasa (Maior rede de saúde integrada da América Latina)",
        "dossier.p1": "Atuando na convergência entre Arquitetura de Defesa Corporativa e Tecnologias Autônomas Emergentes, projeto estruturas de segurança para mitigar vulnerabilidades antes da publicação de código e isolar agentes autônomos em ambientes de desenvolvimento.",
        "dossier.p2": "Minha base de engenharia fundamenta-se em programação de sistemas, diagnóstico de microcontroladores e contenção de ameaças. Com mais de 4 anos de experiência docente universitária lecionando algoritmos, segurança computacional e eletrônica, unifico didática clara ao rigor técnico em segurança de aplicações, modelagem de ameaças e ciclos de desenvolvimento seguro.",
        "dossier.spec.discipline_label": "DISCIPLINA:",
        "dossier.spec.discipline_val": "Arquitetura de Segurança e DevSecOps",
        "dossier.spec.focus_label": "FOCO_DE_PESQUISA:",
        "dossier.spec.focus_val": "Segurança em IA, Sandboxing MCP, Forense de Memória",
        "dossier.spec.accred_label": "CERTIFICAÇÃO:",
        "dossier.spec.community_label": "COMUNIDADE:",
        "dossier.spec.community_val": "Palestrante no Google Developer Groups (GDG)",
        "triad.label": "[METODOLOGIA DE DEFESA]",
        "triad.title": "Os Três Pilares de Defesa",
        "triad.p1.title": "Arquitetura de Segurança Corporativa e AppSec",
        "triad.p1.desc": "Estabelecendo defesa em profundidade através de modelagem sistemática de ameaças (STRIDE, PASTA), modelos OWASP ASVS/SAMM e pipelines de DevSecOps automatizados integrados ao CI/CD.",
        "triad.p2.title": "Segurança e Contenção de Agentes de IA",
        "triad.p2.desc": "Desenvolvimento de técnicas de isolamento seguro para ferramentas de IA em ambientes de desenvolvimento. Arquitetura de camadas de validação MCP (Model Context Protocol) para prevenção de injeção de instruções e uso indevido de ferramentas.",
        "triad.p3.title": "Segurança em Nuvem e DevSecOps",
        "triad.p3.desc": "Automação de políticas de segurança, hardening de sistemas operacionais (Benchmarks CIS), integridade de contêineres e governança de conformidade em ambientes multinuvem (AWS e Azure).",
        "sec.skills.title": "COMPETÊNCIAS PRINCIPAIS E DOMÍNIOS TÉCNICOS",
        "skills.q1.title": "Arquitetura de Segurança e Governança",
        "skills.q1.desc": "Projetos de defesa corporativa, aplicação de diretrizes e integração resiliente de DevSecOps.",
        "skills.q2.title": "Segurança em IA e Sistemas Autônomos",
        "skills.q2.desc": "Hardening de agentes autônomos, contenção em sandbox e integração em nível de protocolo.",
        "skills.q3.title": "Segurança em Nuvem e Infraestrutura",
        "skills.q3.desc": "Defesa de nuvem corporativa, hardening de sistemas operacionais, baselines de conformidade e segurança estrutural.",
        "skills.q4.title": "Linguagens, Automação e Ferramental",
        "skills.q4.desc": "Linguagens e pipelines automatizados para validação ágil e documentação técnica reproduzível.",
        "sec.projects.title": "PESQUISAS EM DESTAQUE E REPOSITÓRIOS ABERTOS",
        "projects.tab.all": "[ TODOS (5) ]",
        "projects.tab.security": "[ SEGURANÇA (2) ]",
        "projects.tab.ai": "[ IA E AGENTES (2) ]",
        "projects.tab.tools": "[ FERRAMENTAL (1) ]",
        "projects.tab.community": "[ COMUNIDADE (1) ]",
        "proj.status.prod": "PRODUÇÃO",
        "proj.status.integration": "INTEGRAÇÃO",
        "proj.status.compliance": "CONFORMIDADE",
        "proj.status.community": "COMUNIDADE",
        "proj.tag.aisafety": "Segurança em IA",
        "proj.tag.hardening": "Hardening",
        "proj.tag.agentic": "IA Agêntica",
        "proj.tag.modular": "Habilidades Modulares",
        "proj.tag.automation": "Automação de Processos",
        "proj.tag.gdg": "Palestrante GDG",
        "proj.action.inspect": "INSPECIONAR ARQUITETURA",
        "proj.hardening_ia.desc": "Framework de hardening automatizado de segurança desenvolvido para ambientes de assistência por IA. Implementa validação de isolamento, controle de fronteiras de tokens de API e auditoria de privilégios.",
        "proj.hardening_ia.c1": "> Isolamento zero-trust para ferramentas CLI de codificação por IA",
        "proj.hardening_ia.c2": "> Prevenção contra vazamento de credenciais e tokens em workspaces",
        "proj.hardening_ia.c3": "> Auditorias automatizadas de conformidade e baselines de sistema",
        "proj.skills.desc": "Repositório de competências padronizadas e modulares desenvolvido para agentes autônomos de codificação, orquestração multiagente e assistentes de desenvolvimento.",
        "proj.skills.c1": "> Contratos operacionais padronizados cobrindo mais de 50 áreas",
        "proj.skills.c2": "> Padrões de supervisão e governança multiagente",
        "proj.skills.c3": "> Execução determinística de fluxos de engenharia de software",
        "proj.mcp_ce.desc": "Interface de servidor Model Context Protocol (MCP) para o Cheat Engine, viabilizando inspeção programática, automação de processos e telemetria de segurança para assistentes de IA.",
        "proj.mcp_ce.c1": "> Servidor MCP integrando chamadas de LLM à inspeção de processos",
        "proj.mcp_ce.c2": "> Leitura de estruturas de memória e automação em tempo de execução",
        "proj.mcp_ce.c3": "> Ferramenta de inspeção para rotinas técnicas de desenvolvimento",
        "proj.linux_sec.desc": "Scripts automatizados para auditoria de segurança, verificação de conformidade com baselines CIS, detecção de anomalias em permissões e aplicação de parâmetros de kernel em Linux.",
        "proj.linux_sec.c1": "> Auditoria automatizada de conformidade com benchmarks CIS Linux",
        "proj.linux_sec.c2": "> Detecção de binários SUID/SGID e alertas de discrepâncias",
        "proj.linux_sec.c3": "> Geração automática de roteiros de remediação e conformidade",
        "proj.gdg_theme.desc": "Tema modular para apresentações técnicas construído em Typst com Polylux, inspirado na identidade visual do Google Developer Groups, acompanhado de palestras técnicas.",
        "proj.gdg_theme.c1": "> Diagramação técnica programática de alto padrão com Typst",
        "proj.gdg_theme.c2": "> Slides de alto contraste para conferências de arquitetura",
        "proj.gdg_theme.c3": "> Inclui materiais didáticos sobre fundamentos de Computação Quântica",
        "sec.credentials.title": "FORMAÇÃO ACADÊMICA E CERTIFICAÇÕES",
        "cred.badge.cert": "CERTIFICAÇÃO",
        "cred.badge.postgrad": "PÓS-GRADUAÇÃO",
        "cred.badge.bs": "GRADUAÇÃO",
        "cred.badge.teaching": "DOCÊNCIA E PESQUISA",
        "cred.c1.title": "Certificação CompTIA Security+ ce",
        "cred.c1.detail": "Certificação internacional que comprova domínio em segurança de arquitetura de redes, análise de ameaças, resposta a incidentes, controles criptográficos e gestão de riscos operacionais.",
        "cred.c2.title": "Pós-Graduação em Inteligência Artificial",
        "cred.c2.detail": "Universidade Tecnológica Federal do Paraná (UTFPR). Pesquisa e desenvolvimento em paradigmas de aprendizado de máquina, redes neurais profundas, otimização heurística e tomada de decisão.",
        "cred.c3.title": "Bacharelado em Engenharia Elétrica e Eletrônica",
        "cred.c3.detail": "Faculdade Pitágoras. Base sólida de engenharia: análise de circuitos, processamento de sinais, sistemas embarcados, microcontroladores, controle de processos e arquitetura de hardware.",
        "cred.c4.institution": "Instituição de Ensino Superior",
        "cred.c4.title": "Ex-Professor Universitário (4+ Anos)",
        "cred.c4.detail": "Docência nas disciplinas de Segurança da Informação, Algoritmos e Estruturas de Dados, Eletrônica Analógica e Digital e Microcontroladores Embarcados. Orientação de formandos em engenharia de sistemas seguros.",
        "sec.contact.title": "CANAIS DE TRANSMISSÃO // CONTATO",
        "contact.channels_label": "[CANAIS SEGUROS DE COMUNICAÇÃO]",
        "contact.headline": "Conectar-se com o Arquiteto de Segurança",
        "contact.sub": "Disponível para diálogos técnicos sobre arquitetura de segurança corporativa, pesquisas em contenção de IA, oficinas de modelagem de ameaças e palestras na comunidade.",
        "contact.linkedin_label": "REDE PROFISSIONAL",
        "contact.github_label": "REPOSITÓRIOS DE CÓDIGO",
        "contact.geo_key": "LOCALIZAÇÃO:",
        "contact.geo_val": "Londrina, Paraná — Brasil (UTC-3)",
        "contact.policy_key": "DIRETRIZ:",
        "contact.policy_val": "Livre de spam; comunicações estritamente técnicas via LinkedIn e GitHub.",
        "modal.summary_title": "> RESUMO ARQUITETURAL E DESAFIOS PRINCIPAIS",
        "modal.stack_title": "> TECNOLOGIAS E ESPECIFICAÇÕES",
        "modal.action.github": "ACESSAR REPOSITÓRIO NO GITHUB",
        "modal.action.close": "[ESC] FECHAR TERMINAL",
        "footer.spec": "ZERO-FRAMEWORKS • HTML5/CSS3/ES6+ NATIVO",
        "footer.copy": "© 2026 Daniel Gonçalves Araujo. Arquitetura de segurança de alta integridade."
      },
      "es": {
        "a11y.skip": "Ir a la interfaz del sistema [Enter]",
        "hud.active": "[ACTIVO]",
        "nav.root": "//RAÍZ",
        "nav.terminal": "//TERMINAL",
        "nav.intel": "//DOSIER",
        "nav.skills": "//DOMINIOS",
        "nav.projects": "//PROYECTOS",
        "nav.academic": "//FORMACIÓN",
        "nav.connect": "//CONTACTO",
        "hero.badge.role": "ARQUITECTO DE SEGURIDAD @ DASA",
        "hero.badge.geo": "LONDRINA, PR — BRASIL",
        "hero.subline": "Diseñando defensas corporativas resilientes, forjando marcos de contención para agentes autónomos de IA y gobernanza continua de DevSecOps.",
        "hero.pillar1.title": "Seguridad Corporativa",
        "hero.pillar1.sub": "Modelado de Amenazas y DevSecOps",
        "hero.pillar2.title": "Seguridad y Hardening en IA",
        "hero.pillar2.sub": "Contención de Agentes y Protocolo MCP",
        "hero.pillar3.title": "Nube e Infraestructura",
        "hero.pillar3.sub": "AWS, Azure y Hardening CIS",
        "hero.action.terminal": "TERMINAL INTERACTIVA",
        "hero.action.projects": "INSPECCIONAR PROYECTOS",
        "hero.action.github": "PERFIL EN GITHUB",
        "hero.hud.status": "ESTADO",
        "hero.hud.online": "EN LÍNEA",
        "hero.hud.clearance": "AUTORIZACIÓN",
        "sec.terminal.title": "SHELL DE COMANDOS INTERACTIVA",
        "terminal.instructions.prefix": "Escribe",
        "terminal.instructions.suffix": "para listar comandos, o presiona cualquier botón táctico abajo:",
        "terminal.welcome": "Sesión inicializada para revisión técnica. Escribe 'help' para instrucciones.",
        "terminal.placeholder": "escribe un comando...",
        "terminal.input_aria": "Línea de comandos de la terminal",
        "sec.about.title": "DOSIER // PERFIL PROFESIONAL",
        "dossier.profile_label": "[PERFIL OPERATIVO]",
        "dossier.role_title": "Arquitecto de Seguridad de la Información",
        "dossier.org_label": "ORGANIZACIÓN:",
        "dossier.org_name": "Dasa (Mayor red de salud integrada de América Latina)",
        "dossier.p1": "En la intersección entre la Arquitectura de Defensa Corporativa y las Tecnologías Autónomas Emergentes, diseño esquemas de seguridad que mitigan vulnerabilidades antes de la puesta en producción y aíslan agentes autónomos en entornos de desarrollo.",
        "dossier.p2": "Mi enfoque se fundamenta en la programación de sistemas, diagnóstico de microcontroladores y contención de amenazas. Con más de 4 años de docencia universitaria impartiendo algoritmos, seguridad informática y electrónica, uno la pedagogía clara con el rigor técnico en seguridad de aplicaciones, modelado de amenazas y ciclo de vida de desarrollo seguro.",
        "dossier.spec.discipline_label": "DISCIPLINA:",
        "dossier.spec.discipline_val": "Arquitectura de Seguridad y DevSecOps",
        "dossier.spec.focus_label": "ENFOQUE_DE_INVESTIGACIÓN:",
        "dossier.spec.focus_val": "Seguridad en IA, Sandboxing MCP, Análisis Forense de Memoria",
        "dossier.spec.accred_label": "CERTIFICACIÓN:",
        "dossier.spec.community_label": "COMUNIDAD:",
        "dossier.spec.community_val": "Ponente en Google Developer Groups (GDG)",
        "triad.label": "[METODOLOGÍA DE DEFENSA]",
        "triad.title": "Los Tres Pilares de Defensa",
        "triad.p1.title": "Arquitectura de Seguridad Corporativa y AppSec",
        "triad.p1.desc": "Implementación de defensa en profundidad mediante modelado sistemático de amenazas (STRIDE, PASTA), marcos OWASP ASVS/SAMM y canalizaciones de DevSecOps automatizadas integradas en CI/CD.",
        "triad.p2.title": "Seguridad y Contención de Agentes de IA",
        "triad.p2.desc": "Desarrollo de mecanismos prácticos de aislamiento para herramientas de IA en entornos de ingeniería. Diseño de capas de validación MCP (Model Context Protocol) para mitigar la inyección de prompts y el uso indebido de herramientas.",
        "triad.p3.title": "Seguridad en la Nube y DevSecOps",
        "triad.p3.desc": "Automatización de políticas de seguridad, hardening de sistemas operativos (benchmarks de CIS), integridad de contenedores y controles de cumplimiento en entornos multinube (AWS y Azure).",
        "sec.skills.title": "EXPERIENCIA PRINCIPAL Y DOMINIOS TÉCNICOS",
        "skills.q1.title": "Arquitectura de Seguridad y Gobernanza",
        "skills.q1.desc": "Diseño de defensa corporativa, aplicación de directrices e integración robusta de DevSecOps.",
        "skills.q2.title": "Seguridad en IA y Sistemas Autónomos",
        "skills.q2.desc": "Hardening de agentes autónomos, contención en sandbox e integración a nivel de protocolo.",
        "skills.q3.title": "Seguridad en la Nube e Infraestructura",
        "skills.q3.desc": "Defensa de nube empresarial, hardening de sistemas operativos, líneas base de cumplimiento y seguridad estructural.",
        "skills.q4.title": "Lenguajes, Automatización y Herramientas",
        "skills.q4.desc": "Lenguajes y flujos automatizados para validación técnica ágil y documentación reproducible.",
        "sec.projects.title": "INVESTIGACIONES DESTACADAS Y REPOSITORIOS ABIERTOS",
        "projects.tab.all": "[ TODOS (5) ]",
        "projects.tab.security": "[ SEGURIDAD (2) ]",
        "projects.tab.ai": "[ IA Y AGENTES (2) ]",
        "projects.tab.tools": "[ HERRAMIENTAS (1) ]",
        "projects.tab.community": "[ COMUNIDAD (1) ]",
        "proj.status.prod": "PRODUCCIÓN",
        "proj.status.integration": "INTEGRACIÓN",
        "proj.status.compliance": "CUMPLIMIENTO",
        "proj.status.community": "COMUNIDAD",
        "proj.tag.aisafety": "Seguridad en IA",
        "proj.tag.hardening": "Hardening",
        "proj.tag.agentic": "IA Agéntica",
        "proj.tag.modular": "Habilidades Modulares",
        "proj.tag.automation": "Automatización de Procesos",
        "proj.tag.gdg": "Ponente GDG",
        "proj.action.inspect": "INSPECCIONAR ARQUITECTURA",
        "proj.hardening_ia.desc": "Marco de hardening automatizado de seguridad diseñado para entornos de desarrollo asistidos por IA. Implementa verificación de sandbox, límites para tokens de API y auditorías de permisos.",
        "proj.hardening_ia.c1": "> Aislamiento zero-trust para herramientas CLI de programación con IA",
        "proj.hardening_ia.c2": "> Prevención contra filtración de credenciales y tokens en espacios de trabajo",
        "proj.hardening_ia.c3": "> Auditorías automatizadas de cumplimiento y líneas base de sistemas",
        "proj.skills.desc": "Ecosistema de habilidades estandarizadas y modulares concebido para agentes autónomos de programación, orquestación multiagente y asistentes de desarrollo.",
        "proj.skills.c1": "> Contratos de capacidades estandarizados en más de 50 áreas",
        "proj.skills.c2": "> Patrones de supervisión y gobernanza multiagente",
        "proj.skills.c3": "> Ejecución determinista para flujos de ingeniería de software",
        "proj.mcp_ce.desc": "Interfaz de servidor Model Context Protocol (MCP) para Cheat Engine, que permite inspección programática, automatización de procesos y telemetría de seguridad para modelos de IA.",
        "proj.mcp_ce.c1": "> Servidor MCP que conecta llamadas de LLM con inspección de procesos",
        "proj.mcp_ce.c2": "> Lectura de estructuras de memoria y automatización en tiempo de ejecución",
        "proj.mcp_ce.c3": "> Herramientas de inspección para flujos de desarrollo técnico",
        "proj.linux_sec.desc": "Scripts automatizados para auditoría de seguridad, verificación de cumplimiento CIS, detección de anomalías en permisos y aplicación de parámetros del kernel en servidores Linux.",
        "proj.linux_sec.c1": "> Auditoría de sistemas basada en los benchmarks CIS Linux",
        "proj.linux_sec.c2": "> Detección de binarios SUID/SGID y alertas de discrepancias",
        "proj.linux_sec.c3": "> Generación automatizada de listas de verificación para remediación",
        "proj.gdg_theme.desc": "Tema modular para presentaciones técnicas diseñado en Typst mediante Polylux, inspirado en Google Developer Groups, acompañado de charlas técnicas de divulgación.",
        "proj.gdg_theme.c1": "> Tipografía técnica moderna y programática con Typst",
        "proj.gdg_theme.c2": "> Diapositivas de alto contraste para conferencias de arquitectura",
        "proj.gdg_theme.c3": "> Contiene materiales introductorios a la Computación Cuántica",
        "sec.credentials.title": "TRAYECTORIA ACADÉMICA Y CERTIFICACIONES",
        "cred.badge.cert": "CERTIFICACIÓN",
        "cred.badge.postgrad": "POSGRADO",
        "cred.badge.bs": "LICENCIATURA",
        "cred.badge.teaching": "DOCENCIA E INVESTIGACIÓN",
        "cred.c1.title": "Certificación CompTIA Security+ ce",
        "cred.c1.detail": "Acreditación internacional que certifica competencias operativas en ciberseguridad: seguridad en redes, análisis de amenazas, respuesta ante incidentes, criptografía y gobernanza de riesgos.",
        "cred.c2.title": "Posgrado en Inteligencia Artificial",
        "cred.c2.detail": "Universidade Tecnológica Federal do Paraná (UTFPR). Investigación y desarrollo en paradigmas de aprendizaje automático, redes neuronales profundas y modelos de optimización.",
        "cred.c3.title": "Licenciatura en Ingeniería Eléctrica y Electrónica",
        "cred.c3.detail": "Faculdade Pitágoras. Base rigurosa de ingeniería: circuitos, procesamiento de señales analógicas y digitales, sistemas embebidos, microcontroladores y arquitectura de computadoras.",
        "cred.c4.institution": "Institución de Educación Superior",
        "cred.c4.title": "Exprofesor Universitario (Más de 4 Años)",
        "cred.c4.detail": "Cátedras de Seguridad de la Información, Algoritmos y Estructuras de Datos, Electrónica Analógica y Digital y Microcontroladores. Tutoría de futuros ingenieros en sistemas seguros.",
        "sec.contact.title": "CANALES DE TRANSMISIÓN // CONTACTO",
        "contact.channels_label": "[CANALES SEGUROS DE COMUNICACIÓN]",
        "contact.headline": "Establecer Contacto con el Arquitecto de Seguridad",
        "contact.sub": "Disponible para intercambios técnicos sobre arquitectura de defensa empresarial, contención de agentes de IA, talleres de modelado de amenazas y ponencias comunitarias.",
        "contact.linkedin_label": "RED PROFESIONAL",
        "contact.github_label": "REPOSITORIOS DE CÓDIGO",
        "contact.geo_key": "UBICACIÓN:",
        "contact.geo_val": "Londrina, Paraná — Brasil (UTC-3)",
        "contact.policy_key": "POLÍTICA:",
        "contact.policy_val": "Cero correo no deseado; comunicación técnica directa mediante LinkedIn y GitHub.",
        "modal.summary_title": "> RESUMEN ARQUITECTÓNICO Y RETOS PRINCIPALES",
        "modal.stack_title": "> STACK Y ESPECIFICACIONES",
        "modal.action.github": "VISITAR REPOSITORIO EN GITHUB",
        "modal.action.close": "[ESC] CERRAR TERMINAL",
        "footer.spec": "ZERO-FRAMEWORKS • HTML5/CSS3/ES6+ NATIVO",
        "footer.copy": "© 2026 Daniel Gonçalves Araujo. Arquitectura de seguridad de alta integridad."
      }
    },

    setLanguage(lang, persist = false) {
      if (!["en", "pt-br", "es"].includes(lang)) {
        lang = "en";
      }
      this.currentLang = lang;

      // Update HTML attributes
      document.documentElement.setAttribute("lang", lang === "pt-br" ? "pt-BR" : lang);
      document.documentElement.setAttribute("data-lang", lang);

      // Update HUD button indicator
      const langVal = document.getElementById("lang-val");
      if (langVal) {
        langVal.textContent = lang === "pt-br" ? "PT" : lang.toUpperCase();
      }

      // Update static DOM elements
      const dict = this.translations[lang] || this.translations["en"];

      // Update document title for accessibility and SEO
      if (lang === "pt-br") {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Arquiteto de Segurança da Informação";
      } else if (lang === "es") {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Arquitecto de Seguridad de la Información";
      } else {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Information Security Architect";
      }

      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      // Update attributes (placeholders, aria-label, etc.)
      document.querySelectorAll("[data-i18n-attr]").forEach(el => {
        const spec = el.getAttribute("data-i18n-attr");
        if (spec) {
          spec.split(",").forEach(pair => {
            const [attr, key] = pair.split(":").map(s => s.trim());
            if (attr && key && dict[key]) {
              el.setAttribute(attr, dict[key]);
            }
          });
        }
      });

      if (persist) {
        try {
          localStorage.setItem("lang_preference", lang);
        } catch (e) {}
      }

      // Re-trigger boot sequence with active language if instance exists
      if (window.bootSeqInstance && typeof window.bootSeqInstance.updateLang === "function") {
        window.bootSeqInstance.updateLang(lang);
      }
    },

    getProjectData(projId, lang) {
      const l = lang || this.currentLang || 'en';
      const base = PROJECTS_DATA[projId];
      if (!base) return null;

      if (l === 'pt-br') {
        const ptMap = {
          'hardening-ia': {
            subtitle: 'Hardening Automatizado de Segurança para Ambientes de Desenvolvimento com IA',
            tag: 'Segurança em IA e Sandboxing',
            status: 'PESQUISA_ATIVA',
            desc: 'Framework de hardening e scripts de auditoria desenvolvidos para ferramentas de IA em ambientes de desenvolvimento, contenção de agentes e isolamento em sandbox.',
            details: `[VETORES DE AMEAÇA TRATADOS]
• Escalação por injeção de instruções direcionada ao sistema de arquivos do host e quebra de contêineres.
• Criação irrestrita de sockets de rede e movimentação lateral por agentes autônomos.
• Vazamento de credenciais via variáveis de ambiente e injeção maliciosa de scripts.

[ARQUITETURA DE IMPLEMENTAÇÃO]
• Perfis de isolamento em contêineres (Docker / Podman / perfis Bubblewrap).
• Scripts em Python para auditoria contínua de ACLs, isolamento de processos e regras de egresso.
• Alinhado ao OWASP Top 10 para Aplicações LLM (LLM02: Vazamento de Dados Sensíveis, LLM06: Delegação Excessiva).`
          },
          'skills': {
            subtitle: 'Capacidades Padronizadas de Engenharia e Guardrails para Execução de Ferramentas',
            tag: 'IA Agêntica e Fluxos Autônomos',
            status: 'PADRONIZADO',
            desc: 'Repositório abrangente de competências modulares e domínios técnicos padronizados para agentes autônomos de engenharia de software, aplicando limites de segurança e validação rigorosa.',
            details: `[DIRETRIZ ARQUITETURAL]
• Definições padronizadas de competências operacionais para engenharia de software com IA autônoma.
• Tipagem estrita de parâmetros, checagem de limites e validação determinística de entradas.
• Travas de proteção impedindo operações destrutivas sem confirmação deliberada em múltiplas etapas.

[PROTOCOLO DE SEGURANÇA]
• Aplicação do princípio do menor privilégio em comandos de terminal e escritas em arquivos.
• Mitigação de parâmetros alucinados através da verificação estrita de esquemas estruturados.`
          },
          'mcp-cheatengine': {
            subtitle: 'Servidor Model Context Protocol para Automação e Inspeção de Processos',
            tag: 'Ferramental de IA e Integração MCP',
            status: 'INTEGRAÇÃO',
            desc: 'Interface de servidor Model Context Protocol (MCP) para o Cheat Engine, permitindo inspeção programática, automação e telemetria de segurança em tempo de execução para assistentes de IA.',
            details: `[ARQUITETURA DO SISTEMA]
• Integração entre a chamada de ferramentas de LLMs e a API nativa de inspeção de processos do Cheat Engine.
• Disponibilização de recursos de leitura, busca e congelamento de memória sob o padrão oficial MCP.
• Capacidade para modelos de IA inspecionarem ponteiros de processos, depurarem estados de execução e automatizarem testes.

[CONTENÇÃO E SEGURANÇA OPERACIONAL]
• Operações de inspeção restritas a processos previamente autorizados.
• Registro de auditoria para leitura de offsets e estabilidade dos processos inspecionados.`
          },
          'linux-security-validator': {
            subtitle: 'Mecanismo Automatizado de Auditoria e Conformidade com Benchmarks CIS',
            tag: 'Hardening CIS e Linux',
            status: 'CONFORMIDADE',
            desc: 'Scripts automatizados para auditoria de segurança, validação de baselines CIS e checagem de permissões em servidores e estações Linux.',
            details: `[CAPACIDADES DE AUDITORIA]
• Validação de sistemas com base nas diretrizes do Center for Internet Security (CIS) para Linux.
• Localização de binários com bits SUID/SGID indevidos, privilégios anômalos e diretórios abertos à escrita global.
• Hardening de parâmetros de kernel (/etc/sysctl.d - ASLR, TCP SYN cookies, proteção de escopo ptrace).
• Auditoria de integridade em arquivos críticos de autenticação (/etc/passwd, /etc/shadow, /etc/sudoers).

[TELEMETRIA DE SAÍDA]
• Relatório estruturado no terminal com pontuação de severidade e roteiros automáticos de remediação.`
          },
          'gdg-polylux-theme': {
            subtitle: 'Apresentações Técnicas Programáticas em Typst e Palestras sobre Computação Quântica',
            tag: 'Comunidade e Palestras Técnicas',
            status: 'COMUNIDADE',
            desc: 'Tema modular para apresentações técnicas construído com Typst e o motor Polylux, inspirado na identidade visual do Google Developer Groups, acompanhado de conteúdos sobre Computação Quântica.',
            details: `[COMPOSIÇÃO TÉCNICA]
• Modelos de apresentação reproduzíveis e versionáveis utilizando Typst e Polylux.
• Reprodução fiel da identidade visual do Google Developer Groups (GDG) sem suítes de escritório pesadas.
• Decks rastreáveis via controle de versão Git que compilam de forma determinística em pipelines de CI/CD.

[ATUAÇÃO NA COMUNIDADE]
• Apresentações técnicas didáticas ministradas em conferências, incluindo fundamentos de Computação Quântica.`
          }
        };
        const override = ptMap[projId] || {};
        return { ...base, ...override };
      }

      if (l === 'es') {
        const esMap = {
          'hardening-ia': {
            subtitle: 'Hardening Automatizado de Seguridad para Entornos de Desarrollo Asistidos por IA',
            tag: 'Seguridad en IA y Sandboxing',
            status: 'INVESTIGACIÓN_ACTIVA',
            desc: 'Marco de hardening automatizado y scripts de auditoría concebidos para herramientas de desarrollo con IA, contención en sandbox y aislamiento de espacios de trabajo.',
            details: `[VECTORES DE AMENAZA MITIGADOS]
• Escalada mediante inyección de instrucciones hacia el sistema de archivos del host y escape de contenedores.
• Creación irrestricta de sockets de red y movimiento lateral por parte de agentes autónomos.
• Filtración de credenciales mediante variables de entorno e inyección maliciosa de scripts.

[ARQUITECTURA DE IMPLEMENTACIÓN]
• Perfiles de aislamiento en contenedores (Docker / Podman / perfiles Bubblewrap).
• Scripts en Python para auditoría continua de ACLs, aislamiento de procesos y reglas de tráfico saliente.
• Alineado con OWASP Top 10 para Aplicaciones LLM (LLM02: Divulgación de Información Sensible, LLM06: Agencia Excesiva).`
          },
          'skills': {
            subtitle: 'Capacidades Estandarizadas de Ingeniería y Límites Seguros para Ejecución de Herramientas',
            tag: 'IA Agéntica y Flujos Autónomos',
            status: 'ESTANDARIZADO',
            desc: 'Ecosistema de habilidades estandarizadas y modulares para agentes autónomos de ingeniería de software, garantizando restricciones de seguridad y ejecución determinista.',
            details: `[DIRECTRIZ ARQUITECTÓNICA]
• Definición estandarizada de habilidades de dominio para ingeniería de software con IA autónoma.
• Tipado estricto de parámetros, límites claros y validación determinista de entradas.
• Barreras de protección que impiden operaciones destructivas sin confirmación deliberada en múltiples pasos.

[PROTOCOLO DE SEGURIDAD]
• Aplica el principio de mínimo privilegio en escrituras de archivos y ejecuciones en terminal.
• Elimina parámetros alucinados mediante la verificación rigurosa de esquemas estructurados.`
          },
          'mcp-cheatengine': {
            subtitle: 'Servidor Model Context Protocol para Automatización e Inspección de Procesos',
            tag: 'Herramientas de IA e Integración MCP',
            status: 'INTEGRACIÓN',
            desc: 'Interfaz de servidor Model Context Protocol (MCP) para Cheat Engine, que permite inspección programática, automatización de procesos y telemetría de seguridad para asistentes de IA.',
            details: `[ARQUITECTURA DEL SISTEMA]
• Integra llamadas de herramientas de LLM con la API nativa de Cheat Engine para inspección de procesos.
• Expone lectura, escaneo y congelamiento de memoria bajo el estándar abierto Model Context Protocol.
• Permite a modelos de IA examinar estructuras en memoria, depurar estados de ejecución y automatizar pruebas.

[CONTENCIÓN Y SEGURIDAD]
• Operaciones restringidas estrictamente a identificadores de proceso autorizados previamente.
• Registro de auditoría de desplazamientos de memoria para garantizar la estabilidad del sistema.`
          },
          'linux-security-validator': {
            subtitle: 'Motor Automatizado de Auditoría y Verificación de Cumplimiento CIS',
            tag: 'Hardening CIS y Linux',
            status: 'CUMPLIMIENTO',
            desc: 'Scripts automatizados para auditoría de seguridad, verificación de cumplimiento CIS y comprobación de permisos en servidores y estaciones de trabajo Linux.',
            details: `[CAPACIDADES DE AUDITORÍA]
• Validación del sistema contra los estándares de seguridad de Center for Internet Security (CIS) para Linux.
• Detección de binarios SUID/SGID irregulares, privilegios anómalos y rutas con permisos globales de escritura.
• Comprobación de directrices de kernel (/etc/sysctl.d - ASLR, cookies TCP SYN, alcance ptrace).
• Validación de integridad en archivos críticos de autenticación (/etc/passwd, /etc/shadow, /etc/sudoers).

[TELEMETRÍA DE RESULTADOS]
• Reporte estructurado en terminal con métricas de severidad y manuales de remediación automatizada.`
          },
          'gdg-polylux-theme': {
            subtitle: 'Presentaciones Técnicas Programáticas en Typst y Charlas sobre Computación Cuántica',
            tag: 'Comunidad y Charlas Técnicas',
            status: 'COMUNIDAD',
            desc: 'Tema modular para presentaciones técnicas diseñado en Typst mediante Polylux, inspirado en Google Developer Groups, acompañado de charlas sobre Computación Cuántica.',
            details: `[COMPOSICIÓN TÉCNICA]
• Plantillas de diapositivas reproducibles y programáticas mediante Typst y Polylux.
• Adopción de la identidad visual de Google Developer Groups (GDG) sin programas ofimáticos pesados.
• Diapositivas controladas por versiones que compilan de manera determinista en canalizaciones de CI/CD.

[PARTICIPACIÓN EN LA COMUNIDAD]
• Acompañado de diapositivas didácticas, incluyendo fundamentos de Computación Cuántica en encuentros técnicos.`
          }
        };
        const override = esMap[projId] || {};
        return { ...base, ...override };
      }

      return base;
    }
  };

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
      const proj = I18N.getProjectData(id);
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
      const data = I18N.getProjectData(projId);
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
        avatarImg.style.display = 'none';
        const asciiFallback = document.getElementById('ascii-avatar');
        if (asciiFallback) asciiFallback.style.display = 'block';
      });
    }

    console.info('%c[SYS_KERNEL] Daniel Gonçalves Araujo portfolio online. System initialized.', 'color: #00ff66; font-weight: bold; background: #050807; padding: 4px;');
  });

})();
