// Project telemetry. Pure data plus its accessor, so the Shell's `cat`
// command and the Projects modal share one source of truth.
//
// Extracted from app.js. Every featured project (coacus, anvilai,
// mcp-cheatengine, mcp-security-mitmproxy) carries a base entry plus pt-br and
// es overrides so all three languages resolve.

export const PROJECTS_DATA = {
  'coacus': {
    title: 'Coacus',
    subtitle: 'Skill & Agent Framework for Governed Autonomous Engineering',
    tag: 'Skill & Agent Framework',
    status: 'OPEN_SOURCE',
    desc: 'A dependency-free skill and agent framework that packages engineering judgment as reusable, versioned artifacts, with a concurrency governor that caps and accounts for every agent a workflow spawns.',
    details: `[FRAMEWORK ARCHITECTURE]
• Skill catalog as the single source of truth for agent and skill definitions.
• Artifact lifecycle from templates through validation and generation, never edited by hand.
• A governor that enforces a hard concurrency cap instead of merely documenting one.

[GOVERNANCE & SAFETY]
• Rate-limit backoff and PAUSED state for callers that hit provider throttling.
• Handoffs between agents use compact TOON payloads rather than free-form prose.`,
    stack: ['Python', 'Agent Frameworks', 'Skill Catalog', 'Concurrency Governance', 'Developer Tooling'],
    repo: 'https://github.com/dandgabr/Coacus'
  },
  'anvilai': {
    title: 'AnvilAI',
    subtitle: 'Automated Hardening & Governance for Third-Party AI Harnesses',
    tag: 'AI Security & Sandboxing',
    status: 'ACTIVE_RESEARCH',
    desc: 'An automated hardening and governance layer for third-party AI harnesses, validating sandbox isolation, enforcing API token boundaries, and auditing permissions on tooling you do not control.',
    details: `[THREAT VECTORS ADDRESSED]
• Prompt injection escalation into host filesystem and container escapes.
• Unrestricted socket creation and lateral movement by autonomous agents.
• Credential leakage via environment variables and malicious script injection.

[IMPLEMENTATION ARCHITECTURE]
• Containerized sandboxing configurations (Docker / Podman / Bubblewrap profiles).
• Python automated audit scripts validating filesystem ACLs, process isolation, and outbound egress rules.
• Aligned with OWASP Top 10 for LLM Applications (LLM02: Sensitive Information Disclosure, LLM06: Excessive Agency).`,
    stack: ['Python', 'Linux Hardening', 'AI Safety', 'Threat Modeling', 'Sandboxing', 'OWASP LLM Top 10'],
    repo: 'https://github.com/dandgabr/AnvilAI'
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
  'mcp-security-mitmproxy': {
    title: 'mcp-security-mitmproxy',
    subtitle: 'Interception & Inspection Proxy for Model Context Protocol Traffic',
    tag: 'MCP Security Tooling',
    status: 'INTEGRATION',
    desc: 'An mitmproxy-based security layer for Model Context Protocol traffic, intercepting, decoding, and inspecting tool calls between agents and servers to surface prompt injection and tool-misuse attempts.',
    details: `[INTERCEPTION PIPELINE]
• Transparent MCP traffic interception built on the mitmproxy addon model.
• Decodes tool-call payloads so requests and responses are legible in transit.
• Rule hooks that flag anomalous or injected instructions before they reach a tool.

[SECURITY ANALYSIS]
• Replays captured sessions for offline review without re-running the agent.
• Pairs with mcp-cheatengine to cover both tool execution and its traffic.`,
    stack: ['Python', 'mitmproxy', 'Model Context Protocol (MCP)', 'Traffic Inspection', 'Security Tooling'],
    repo: 'https://github.com/dandgabr/mcp-security-mitmproxy'
  }
};

const PT_OVERRIDES = {
  'coacus': {
    subtitle: 'Framework de Skills e Agentes para Engenharia Autônoma Governada',
    tag: 'Framework de Skills e Agentes',
    status: 'CÓDIGO_ABERTO',
    desc: 'Framework de skills e agentes sem dependências que empacota julgamento de engenharia como artefatos reutilizáveis e versionados, com um governador de concorrência que limita e contabiliza cada agente disparado por um fluxo de trabalho.',
    details: `[ARQUITETURA DO FRAMEWORK]
• Catálogo de skills como fonte única de verdade para definições de agentes e habilidades.
• Ciclo de vida de artefatos de templates a validação e geração, jamais editados à mão.
• Governador que impõe um limite rígido de concorrência em vez de apenas documentá-lo.

[GOVERNANÇA E SEGURANÇA]
• Backoff de rate-limit e estado PAUSED para chamadores que sofrem throttling do provedor.
• Handoffs entre agentes usam payloads compactos em TOON em vez de texto livre.`
  },
  'anvilai': {
    subtitle: 'Hardening Automatizado e Governança para Harnesses de IA de Terceiros',
    tag: 'Segurança em IA e Sandboxing',
    status: 'PESQUISA_ATIVA',
    desc: 'Camada automatizada de hardening e governança para harnesses de IA de terceiros, validando isolamento em sandbox, impondo fronteiras de tokens de API e auditando permissões de ferramentas fora do seu controle.',
    details: `[VETORES DE AMEAÇA TRATADOS]
• Escalação por injeção de instruções direcionada ao sistema de arquivos do host e quebra de contêineres.
• Criação irrestrita de sockets de rede e movimentação lateral por agentes autônomos.
• Vazamento de credenciais via variáveis de ambiente e injeção maliciosa de scripts.

[ARQUITETURA DE IMPLEMENTAÇÃO]
• Perfis de isolamento em contêineres (Docker / Podman / perfis Bubblewrap).
• Scripts em Python para auditoria contínua de ACLs, isolamento de processos e regras de egresso.
• Alinhado ao OWASP Top 10 para Aplicações LLM (LLM02: Vazamento de Dados Sensíveis, LLM06: Delegação Excessiva).`
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
  'mcp-security-mitmproxy': {
    subtitle: 'Proxy de Interceptação e Inspeção para Tráfego Model Context Protocol',
    tag: 'Ferramental de Segurança MCP',
    status: 'INTEGRAÇÃO',
    desc: 'Camada de segurança baseada em mitmproxy para tráfego Model Context Protocol, interceptando, decodificando e inspecionando chamadas de ferramentas entre agentes e servidores para revelar injeção de instruções e uso indevido.',
    details: `[PIPELINE DE INTERCEPTAÇÃO]
• Interceptação transparente de tráfego MCP sobre o modelo de addons do mitmproxy.
• Decodificação dos payloads de chamadas de ferramentas para legibilidade em trânsito.
• Ganchos de regras que sinalizam instruções anômalas ou injetadas antes de atingirem uma ferramenta.

[ANÁLISE DE SEGURANÇA]
• Reprodução de sessões capturadas para revisão offline sem reexecutar o agente.
• Complementa o mcp-cheatengine cobrindo a execução de ferramentas e o seu tráfego.`
  }
};

const ES_OVERRIDES = {
  'coacus': {
    subtitle: 'Marco de Skills y Agentes para Ingeniería Autónoma Gobernada',
    tag: 'Marco de Skills y Agentes',
    status: 'CÓDIGO_ABIERTO',
    desc: 'Marco de skills y agentes sin dependencias que empaqueta criterio de ingeniería como artefactos reutilizables y versionados, con un gobernador de concurrencia que limita y contabiliza cada agente lanzado por un flujo de trabajo.',
    details: `[ARQUITECTURA DEL MARCO]
• Catálogo de skills como única fuente de verdad para definiciones de agentes y habilidades.
• Ciclo de vida de artefactos desde plantillas hasta validación y generación, nunca editados a mano.
• Gobernador que impone un límite estricto de concurrencia en lugar de solo documentarlo.

[GOBERNANZA Y SEGURIDAD]
• Backoff de rate-limit y estado PAUSED para llamadores con throttling del proveedor.
• Los traspasos entre agentes usan payloads compactos en TOON en vez de texto libre.`
  },
  'anvilai': {
    subtitle: 'Hardening Automatizado y Gobernanza para Harnesses de IA de Terceros',
    tag: 'Seguridad en IA y Sandboxing',
    status: 'INVESTIGACIÓN_ACTIVA',
    desc: 'Capa automatizada de hardening y gobernanza para harnesses de IA de terceros, que valida el aislamiento en sandbox, impone límites de tokens de API y audita permisos en herramientas que no controlas.',
    details: `[VECTORES DE AMENAZA MITIGADOS]
• Escalada mediante inyección de instrucciones hacia el sistema de archivos del host y escape de contenedores.
• Creación irrestricta de sockets de red y movimiento lateral por parte de agentes autónomos.
• Filtración de credenciales mediante variables de entorno e inyección maliciosa de scripts.

[ARQUITECTURA DE IMPLEMENTACIÓN]
• Perfiles de aislamiento en contenedores (Docker / Podman / perfiles Bubblewrap).
• Scripts en Python para auditoría continua de ACLs, aislamiento de procesos y reglas de tráfico saliente.
• Alineado con OWASP Top 10 para Aplicaciones LLM (LLM02: Divulgación de Información Sensible, LLM06: Agencia Excesiva).`
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
  'mcp-security-mitmproxy': {
    subtitle: 'Proxy de Interceptación e Inspección para Tráfico Model Context Protocol',
    tag: 'Herramientas de Seguridad MCP',
    status: 'INTEGRACIÓN',
    desc: 'Capa de seguridad basada en mitmproxy para tráfico Model Context Protocol, que intercepta, decodifica e inspecciona llamadas de herramientas entre agentes y servidores para revelar inyección de prompts y uso indebido.',
    details: `[CANALIZACIÓN DE INTERCEPTACIÓN]
• Interceptación transparente de tráfico MCP sobre el modelo de addons de mitmproxy.
• Decodificación de los payloads de llamadas de herramientas para su legibilidad en tránsito.
• Ganchos de reglas que señalan instrucciones anómalas o inyectadas antes de alcanzar una herramienta.

[ANÁLISIS DE SEGURIDAD]
• Reproducción de sesiones capturadas para revisión sin conexión sin reejecutar el agente.
• Complementa a mcp-cheatengine al cubrir la ejecución de herramientas y su tráfico.`
  }
};

export function getProjectData(projId, lang) {
  const base = PROJECTS_DATA[projId];
  if (!base) return null;
  const l = lang || 'en';
  if (l === 'pt-br') return { ...base, ...(PT_OVERRIDES[projId] || {}) };
  if (l === 'es') return { ...base, ...(ES_OVERRIDES[projId] || {}) };
  return base;
}
