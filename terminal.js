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

// Column width for the `help` command table.
const HELP_COL = 24;

// Per-line styling for the boot sequence, aligned with `cmdBoot`'s output.
const BOOT_TYPES = ['dim', 'dim', 'accent', 'highlight', 'dim', 'accent'];

// The AmigaDOS prompt. `%N` is the CLI process number and `%S` the current
// directory; 2.x+ renders the default prompt as `n.dir>`, so this shell shows
// `1.Workbench:>`. The number is the PROCESS number, constant for the life of a
// shell — it is not a per-command counter.
export const PROMPT = '1.Workbench:>';

// AmigaDOS date format: `<Weekday> <D-MMM-YY> <HH:MM:SS>`, 24-hour clock, day
// with no leading zero, three-letter month. Taken from the PROMPT example in
// the AmigaOS 3.1 reference (`Tuesday 11-Sep-90 14:36:39`), which is the
// clearest place the full form is documented.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'];

function amigaDate(now = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${WEEKDAYS[now.getDay()]} ${now.getDate()}-${MONTHS[now.getMonth()]}-`
    + `${pad(now.getFullYear() % 100)} ${pad(now.getHours())}:`
    + `${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

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
  // `Dir` lists the featured repositories as though they were files on a
  // volume. AmigaDOS `Dir` prints names only, in columns, with no size or date.
  const lines = [I18N.t('cmd.projects.output')];
  Object.keys(PROJECTS_DATA).forEach((id) => {
    lines.push(`  ${id}`);
  });
  cli.appendLog(lines.join('\n'), 'text-main');
}

function cmdCat(cli, args) {
  // `Type` prints the contents of a file. Here the "file" is a project's
  // telemetry, so an unknown id reports the AmigaDOS object-not-found wording
  // rather than a Unix `cat:` diagnostic.
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

function cmdVersion(cli) {
  cli.appendLog(I18N.t('cmd.version.output'), 'text-main');
}

function cmdAvail(cli) {
  cli.appendLog(I18N.t('cmd.avail.output'), 'text-main');
}

function cmdCredentials(cli) {
  cli.appendLog(I18N.t('cmd.credentials.output'), 'text-main');
}

function cmdContact(cli) {
  cli.appendLog(I18N.t('cmd.contact.output'), 'text-accent');
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
  cli.appendLog(amigaDate(), 'text-main');
}

function cmdEcho(cli, args) {
  cli.appendLog(args.join(' '), 'text-main');
}

/**
 * The command registry. `description` is an i18n KEY, not a translated string:
 * resolving it at import time would freeze every description in whatever
 * language was active before `setLanguage` ran. The help renderer resolves it
 * with `I18N.t()` at call time instead. `hidden` commands are omitted from the
 * short `help` listing but shown by `help --all`.
 *
 * Names follow the AmigaDOS canon: built-in commands are case-insensitive and
 * documented in upper case, and the aliases map AmigaDOS wording onto the
 * portfolio's content (`Type` reads a project, `Dir` lists them).
 */
export const COMMANDS = {
  help:        { aliases: ['?'],                  handler: cmdHelp,        description: 'cmd.help.desc',        hidden: true },
  whoami:      { aliases: ['who'],                handler: cmdWhoami,      description: 'cmd.whoami.desc' },
  about:       { aliases: ['intel'],              handler: cmdAbout,       description: 'cmd.about.desc' },
  skills:      { aliases: [],                     handler: cmdSkills,      description: 'cmd.skills.desc' },
  dir:         { aliases: ['projects'],          handler: cmdProjects,    description: 'cmd.dir.desc' },
  type:        { aliases: ['cat'],               handler: cmdCat,         description: 'cmd.type.desc' },
  credentials: { aliases: ['education', 'certs'], handler: cmdCredentials, description: 'cmd.credentials.desc' },
  contact:     { aliases: [],                     handler: cmdContact,     description: 'cmd.contact.desc' },
  clear:       { aliases: ['cls'],                handler: cmdClear,       description: 'cmd.clear.desc' },
  boot:        { aliases: [],                     handler: cmdBoot,        description: 'cmd.boot.desc' },
  date:        { aliases: [],                     handler: cmdDate,        description: 'cmd.date.desc' },
  version:     { aliases: [],                     handler: cmdVersion,     description: 'cmd.version.desc' },
  avail:       { aliases: [],                     handler: cmdAvail,       description: 'cmd.avail.desc' },
  echo:        { aliases: [],                     handler: cmdEcho,        description: 'cmd.echo.desc',        hidden: true }
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

    // Echo the line behind the AmigaDOS prompt, not a Unix one.
    this.appendLog(`${PROMPT} ${cmdStr}`, 'term-cmd-echo');

    const name = COMMANDS[mainCmd] ? mainCmd : ALIASES[mainCmd];
    if (name) {
      COMMANDS[name].handler(this, args);
      this.setStatus(renderTemplate(I18N.t('cmd.status.done'), { cmd: name }));
    } else {
      // AmigaDOS 2.x+ says `Unknown command <name>`; it does not prefix the
      // message with a shell name the way `bash:` does.
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
}
