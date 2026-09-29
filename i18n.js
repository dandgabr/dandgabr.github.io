/**
 * ============================================================================
 * INTERNATIONALIZATION DICTIONARY & CORE ENGINE (pt-br, en, es)
 * Pure data + lookup helpers. No DOM wiring beyond apply(); no side effects on
 * other modules. Extracted from app.js so both the page and the tests can import
 * it under Node (ESM).
 * ============================================================================
 */

export const I18N = {
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

      // Update document title for accessibility and SEO
      if (lang === "pt-br") {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Arquiteto de Segurança da Informação";
      } else if (lang === "es") {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Arquitecto de Seguridad de la Información";
      } else {
        document.title = "Daniel Gonçalves Araujo (@dandgabr) | Information Security Architect";
      }

      // Apply the active dictionary to the static DOM
      this.apply(document);

      if (persist) {
        try {
          localStorage.setItem("lang_preference", lang);
        } catch (e) {}
      }
    },

    apply(root) {
      const dict = this.translations[this.currentLang] || this.translations["en"];

      root.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      // Update attributes (placeholders, aria-label, etc.)
      root.querySelectorAll("[data-i18n-attr]").forEach(el => {
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
    },

    t(key) {
      const dict = this.translations[this.currentLang] || this.translations.en;
      return dict[key] ?? this.translations.en[key] ?? key;
    }
};
