// Public projects featured on the site. The Projects modal and Shell share this
// source so every listed project has one canonical description and repository.

const projects = [
  {
    id: 'elfvision', title: 'Elfvision', category: 'tools',
    tag: 'Linux Desktop Utility', stack: ['JavaScript', 'GNOME Shell', 'AI Provider APIs'],
    repo: 'https://github.com/dandgabr/elfvision',
    en: 'Monitors AI provider quotas, reset times and API spending from the Linux desktop, with a native GNOME Shell extension.',
    pt: 'Monitora cotas, horários de renovação e gastos com APIs de IA no Linux, com extensão nativa para o GNOME Shell.',
    es: 'Monitorea cuotas, horarios de reinicio y gastos de APIs de IA desde Linux, con una extensión nativa para GNOME Shell.',
    details: 'GNOME Shell integration is available; support for other desktop environments is planned.'
  },
  {
    id: 'coacus', title: 'Coacus', category: 'ai',
    tag: 'Skills & Agent Framework', stack: ['Python', 'AI Agents', 'Workflow Governance'],
    repo: 'https://github.com/dandgabr/Coacus',
    en: 'A portable library of skills, agents, workflows and MCP declarations rendered for multiple AI coding harnesses.',
    pt: 'Biblioteca portátil de skills, agentes, fluxos de trabalho e declarações MCP adaptadas a diferentes ferramentas de programação com IA.',
    es: 'Biblioteca portátil de skills, agentes, flujos de trabajo y declaraciones MCP adaptadas a distintas herramientas de programación con IA.',
    details: 'Includes a generated catalog, installation and validation workflows, and support for multiple coding harnesses.'
  },
  {
    id: 'estilos-visuais', title: 'Estilos Visuais', category: 'tools',
    tag: 'Interactive UI Gallery', stack: ['CSS', 'JavaScript', 'Design Systems'],
    repo: 'https://github.com/dandgabr/estilos-visuais',
    en: 'An interactive gallery for exploring and comparing interface styles by applying their design tokens to a live demo panel.',
    pt: 'Galeria interativa para explorar e comparar estilos de interface aplicando seus tokens de design a um painel demonstrativo.',
    es: 'Galería interactiva para explorar y comparar estilos de interfaz aplicando sus tokens de diseño a un panel de demostración.',
    details: 'The project includes a local run guide and uses native JavaScript modules.'
  },
  {
    id: 'treinamento-si', title: 'treinamento-si', category: 'tools',
    tag: 'Security Training', stack: ['TypeScript', 'React', 'Electron', 'Markdown'],
    repo: 'https://github.com/dandgabr/treinamento-si',
    en: 'A security management training proposal with structured learning material and a study application for desktop or browser.',
    pt: 'Proposta de treinamento para gestores de segurança da informação, com material estruturado e aplicativo de estudos para desktop ou navegador.',
    es: 'Propuesta de formación para responsables de seguridad de la información, con material estructurado y una aplicación de estudio para escritorio o navegador.',
    details: 'The repository separates the training content from the study application and documents its delivery options.'
  },
  {
    id: 'mcp-security-mitmproxy', title: 'mcp-security-mitmproxy', category: 'security',
    tag: 'MCP Traffic Inspection', stack: ['Python', 'mitmproxy', 'Model Context Protocol'],
    repo: 'https://github.com/dandgabr/mcp-security-mitmproxy',
    en: 'An MCP server that exposes mitmproxy tools to AI agents for controlled interception, inspection and replay of network traffic.',
    pt: 'Servidor MCP que disponibiliza ferramentas do mitmproxy para agentes de IA, permitindo interceptar, inspecionar e reproduzir tráfego de rede sob controle.',
    es: 'Servidor MCP que ofrece herramientas de mitmproxy a agentes de IA para interceptar, inspeccionar y reproducir tráfico de red de forma controlada.',
    details: 'The documented architecture manages mitmproxy subprocesses and supports offline analysis of saved traffic captures.'
  },
  {
    id: 'autodoc', title: 'AutoDoc', category: 'ai',
    tag: 'Codebase Documentation', stack: ['Rust', 'MCP', 'Node-API'],
    repo: 'https://github.com/dandgabr/autodoc',
    en: 'An MCP server for mapping codebases and producing architecture documentation for AI agent harnesses.',
    pt: 'Servidor MCP para mapear bases de código e produzir documentação de arquitetura para ferramentas de agentes de IA.',
    es: 'Servidor MCP para mapear bases de código y generar documentación de arquitectura para herramientas de agentes de IA.',
    details: 'The repository includes a CI workflow and documents integrations with AI coding tools.'
  },
  {
    id: 'Valida-o-de-seguran-a-em-sistemas-Linux', title: 'Linux Security Assessment', category: 'security',
    tag: 'Security Assessment', stack: ['Python', 'Linux', 'CIS', 'NIST', 'ISO'],
    repo: 'https://github.com/dandgabr/Valida-o-de-seguran-a-em-sistemas-Linux',
    en: 'A Linux security assessment and compliance tool for collecting evidence, checking controls and supporting hardening.',
    pt: 'Ferramenta de avaliação de segurança e conformidade Linux para coletar evidências, verificar controles e apoiar o hardening.',
    es: 'Herramienta de evaluación de seguridad y cumplimiento Linux para recopilar evidencias, verificar controles y apoyar el hardening.',
    details: 'The README documents compliance checks, container inspection and hardening with rollback.'
  },
  {
    id: 'mcp-cheatengine', title: 'mcp-cheatengine', category: 'security',
    tag: 'MCP Process Inspection', stack: ['Python', 'PowerShell', 'Cheat Engine', 'MCP'],
    repo: 'https://github.com/dandgabr/mcp-cheatengine',
    en: 'An MCP server connecting AI assistants to Cheat Engine for authorized process inspection and memory analysis.',
    pt: 'Servidor MCP que conecta assistentes de IA ao Cheat Engine para inspeção autorizada de processos e análise de memória.',
    es: 'Servidor MCP que conecta asistentes de IA con Cheat Engine para inspección autorizada de procesos y análisis de memoria.',
    details: 'The repository documents its protocol integration, architecture and security audit.'
  },
  {
    id: 'gdg-polylux-theme', title: 'gdg-polylux-theme', category: 'tools',
    tag: 'Typst Presentation Theme', stack: ['Typst', 'Polylux'],
    repo: 'https://github.com/dandgabr/gdg-polylux-theme',
    en: 'A reusable Typst presentation theme inspired by Google Developer Groups, with layouts, colors, typography and a sample deck.',
    pt: 'Tema reutilizável de apresentações em Typst inspirado no Google Developer Groups, com layouts, cores, tipografia e um exemplo.',
    es: 'Tema reutilizable de presentaciones en Typst inspirado en Google Developer Groups, con diseños, colores, tipografía y un ejemplo.',
    details: 'The repository includes a reusable theme file and a functional example presentation.'
  }
];

export const PROJECTS_DATA = Object.fromEntries(projects.map(({ id, title, category, tag, stack, repo, en, details }) => [id, {
  title,
  subtitle: tag,
  tag,
  status: 'OPEN_SOURCE',
  category,
  desc: en,
  details,
  stack,
  repo
}]));

const localized = Object.fromEntries(projects.map(({ id, pt, es, category }) => [id, {
  'pt-br': {
    desc: pt,
    tag: category === 'security' ? 'Projeto de Segurança' : category === 'ai' ? 'Ferramenta de IA' : 'Ferramenta de Software',
    status: 'CÓDIGO ABERTO'
  },
  es: {
    desc: es,
    tag: category === 'security' ? 'Proyecto de Seguridad' : category === 'ai' ? 'Herramienta de IA' : 'Herramienta de Software',
    status: 'CÓDIGO ABIERTO'
  }
}]));

export function getProjectData(projId, lang) {
  const base = PROJECTS_DATA[projId];
  if (!base) return null;
  const locale = lang === 'pt-br' || lang === 'es' ? lang : null;
  if (!locale) return base;
  const translated = localized[projId][locale];
  return { ...base, ...translated, subtitle: translated.tag };
}
