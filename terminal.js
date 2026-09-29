/**
 * ============================================================================
 * INTERACTIVE SHELL - COMMAND REGISTRY & TERMINAL
 * Extracted from app.js. Zero dependencies.
 *
 * The former infosec easter eggs (the host-probing, hashing, encoding and
 * decoy commands) are gone, and their SSRF host validator went with them:
 * they issued a cross-origin `fetch()` to a user-supplied host, which the
 * tightened `connect-src 'self'` CSP forbids outright.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { PROJECTS_DATA, getProjectData } from './projects-data.js';
import { flipStreamPreference } from './effects.js';

// Column width for the `help` command table.
const HELP_COL = 24;

// Per-line styling for the boot sequence, aligned with `cmdBoot`'s output.
const BOOT_TYPES = ['dim', 'dim', 'accent', 'highlight', 'dim', 'accent'];

// Minimal `{placeholder}` interpolation. Only used for values that are not
// translatable (project telemetry, dates); prose stays in the i18n dictionary.
function renderTemplate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

function cmdHelp(cli, args) {
  const all = args.includes('--all') || args.includes('-a');
  const lines = [I18N.t(all ? 'cmd.help.output_all' : 'cmd.help.output')];

  for (const [name, cmd] of Object.entries(COMMANDS)) {
    if (!all && cmd.hidden) continue;
    lines.push(`  ${name.padEnd(HELP_COL)}- ${I18N.t(cmd.description)}`);
    if (all && cmd.aliases.length) {
      lines.push(`  ${''.padEnd(HELP_COL)}  ${I18N.t('cmd.help.aliases')}: ${cmd.aliases.join(', ')}`);
    }
  }

  cli.appendLog(lines.join('\n'), 'text-main');
}

function cmdWhoami(cli) {
  cli.appendLog(I18N.t('cmd.whoami.output'), 'text-accent');
}

function cmdAbout(cli) {
  cli.appendLog(I18N.t('cmd.about.output'), 'text-main');
}

function cmdSkills(cli) {
  cli.appendLog(I18N.t('cmd.skills.output'), 'text-main');
}

function cmdProjects(cli) {
  const lines = [I18N.t('cmd.projects.output')];
  Object.keys(PROJECTS_DATA).forEach((id, index) => {
    const proj = getProjectData(id, I18N.currentLang);
    lines.push(`  ${index + 1}. ${id.padEnd(HELP_COL)}- ${proj.subtitle}`);
  });
  cli.appendLog(lines.join('\n'), 'text-main');
}

function cmdCat(cli, args) {
  const id = args[0];
  if (!id) {
    cli.appendLog(I18N.t('cmd.cat.usage'), 'text-dim');
    return;
  }

  const proj = getProjectData(id, I18N.currentLang);
  if (!proj) {
    cli.appendLog(renderTemplate(I18N.t('cmd.cat.invalid'), { id }), 'text-dim');
    return;
  }

  cli.appendLog(renderTemplate(I18N.t('cmd.cat.output'), {
    title: proj.title,
    status: proj.status,
    tag: proj.tag,
    desc: proj.desc,
    details: proj.details,
    stack: proj.stack.join(', '),
    repo: proj.repo
  }), 'text-accent');
}

function cmdCredentials(cli) {
  cli.appendLog(I18N.t('cmd.credentials.output'), 'text-main');
}

function cmdContact(cli) {
  cli.appendLog(I18N.t('cmd.contact.output'), 'text-accent');
}

function cmdStream(cli, args) {
  if (args[0] === 'toggle') {
    cli.toggleStream();
  } else {
    cli.appendLog(I18N.t('cmd.stream.output'), 'text-main');
  }
}

function cmdClear(cli) {
  cli.output.innerHTML = '';
  cli.appendLog(I18N.t('cmd.clear.output'), 'text-dim');
}

function cmdBoot(cli) {
  I18N.t('cmd.boot.output').split('\n').forEach((line, index) => {
    cli.appendLog(line, `text-${BOOT_TYPES[index] || 'main'}`);
    cli.output.scrollTop = cli.output.scrollHeight;
  });
}

function cmdDate(cli) {
  cli.appendLog(renderTemplate(I18N.t('cmd.date.output'), {
    utc: new Date().toUTCString(),
    local: new Date().toLocaleString()
  }), 'text-main');
}

function cmdEcho(cli, args) {
  cli.appendLog(args.join(' '), 'text-main');
}

function cmdSudo(cli) {
  cli.appendLog(I18N.t('cmd.sudo.output'), 'text-dim');
}

/**
 * The command registry. `description` is an i18n KEY, not a translated string:
 * resolving it at import time would freeze every description in whatever
 * language was active before `setLanguage` ran. The help renderer resolves it
 * with `I18N.t()` at call time instead. `hidden` commands are omitted from the
 * short `help` listing but shown by `help --all`.
 */
export const COMMANDS = {
  help:        { aliases: ['?'],                  handler: cmdHelp,        description: 'cmd.help.desc',        hidden: true },
  whoami:      { aliases: ['who'],                handler: cmdWhoami,      description: 'cmd.whoami.desc' },
  about:       { aliases: ['intel'],              handler: cmdAbout,       description: 'cmd.about.desc' },
  skills:      { aliases: [],                     handler: cmdSkills,      description: 'cmd.skills.desc' },
  projects:    { aliases: ['ls'],                 handler: cmdProjects,    description: 'cmd.projects.desc' },
  cat:         { aliases: ['project'],            handler: cmdCat,         description: 'cmd.cat.desc' },
  credentials: { aliases: ['education', 'certs'], handler: cmdCredentials, description: 'cmd.credentials.desc' },
  contact:     { aliases: [],                     handler: cmdContact,     description: 'cmd.contact.desc' },
  stream:      { aliases: [],                     handler: cmdStream,      description: 'cmd.stream.desc' },
  clear:       { aliases: ['cls'],                handler: cmdClear,       description: 'cmd.clear.desc' },
  boot:        { aliases: [],                     handler: cmdBoot,        description: 'cmd.boot.desc' },
  date:        { aliases: [],                     handler: cmdDate,        description: 'cmd.date.desc' },
  echo:        { aliases: [],                     handler: cmdEcho,        description: 'cmd.echo.desc',        hidden: true },
  sudo:        { aliases: [],                     handler: cmdSudo,        description: 'cmd.sudo.desc',        hidden: true }
};

// Alias -> canonical name. Derived from COMMANDS so there is one source.
const ALIASES = {};
for (const [name, cmd] of Object.entries(COMMANDS)) {
  for (const alias of cmd.aliases) {
    ALIASES[alias] = name;
  }
}

export class TerminalCLI {
  constructor(formId, inputId, outputId) {
    this.form = document.getElementById(formId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    // The single-line live region. Optional: the CLI still runs when the status
    // element is absent (e.g. a bare harness that mounts only the form), so the
    // writer below is guarded rather than assumed.
    this.status = document.getElementById('terminal-status');
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
    const args = parts.slice(1).map(part => part.toLowerCase());

    this.appendLog(`terminal> ${cmdStr}`, 'term-cmd-echo');

    const name = COMMANDS[mainCmd] ? mainCmd : ALIASES[mainCmd];
    if (name) {
      COMMANDS[name].handler(this, args);
      this.setStatus(renderTemplate(I18N.t('cmd.status.done'), { cmd: name }));
    } else {
      const notFound = renderTemplate(I18N.t('cmd.error.notfound'), { cmd: mainCmd });
      this.appendLog(notFound, 'text-dim');
      this.setStatus(notFound);
    }

    this.output.scrollTop = this.output.scrollHeight;
  }

  /**
   * Write the one-line summary into the shell's live region. The output log
   * itself is `aria-live="off"` (it overrides `role="log"`'s implicit polite
   * value), so this is the only announcement a screen reader gets for a
   * command — deliberately short, never a copy of the command's output.
   * @param {string} text single-line summary
   */
  setStatus(text) {
    if (this.status) this.status.textContent = text;
  }

  appendLog(content, className = '') {
    const div = document.createElement('div');
    div.className = `term-response ${className}`;
    div.textContent = content;
    this.output.appendChild(div);
  }

  toggleStream() {
    // Delegates to effects.js, the single read/write path for the stream
    // preference: this command must not touch window.__effects or localStorage
    // itself, or it becomes a second writer.
    const active = flipStreamPreference(localStorage);
    this.appendLog(I18N.t(active ? 'cmd.stream.output_on' : 'cmd.stream.output_off'), 'text-accent');
    // Keep the PREFS toggle truthful: the command is a second route into the
    // same preference, so the button must reflect the new state rather than
    // wait for a reload. `aria-pressed` and the label are re-derived together.
    const streamBtn = document.querySelector('[data-toggle="stream"]');
    if (streamBtn) {
      streamBtn.setAttribute('aria-pressed', active.toString());
      streamBtn.textContent = I18N.t(active ? 'prefs.on' : 'prefs.off');
    }
  }
}
