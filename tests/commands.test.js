import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMMANDS } from '../terminal.js';
import { I18N } from '../i18n.js';

// Canonical names AND aliases of every command the security refactor removed.
// Dispatch resolves both: `terminal.js` falls back from `COMMANDS[mainCmd]` to
// the `ALIASES` map, which is built from each surviving command's `aliases`
// array. So an egg can return by either route, and the guard must deny both.
// Verified against the base revision's command switch, not trusted from memory:
//   git show 48dfcc3:app.js   (the `switch (mainCmd)` inside TerminalCLI)
const REMOVED = [
  // Canonical names (the removed registry keys).
  'nmap', 'sqlmap', 'john', 'hash', 'base64', 'rot13',
  'iptables', 'honey', 'cve', 'ping', 'traceroute',
  // Aliases that dispatched the same handlers in the base revision.
  'scan', 'portscan',            // nmap
  'trace',                       // traceroute
  'sha256', 'sha512',            // hash
  'b64',                         // base64
  'rot',                         // rot13
  'firewall', 'nftables', 'ufw', // iptables
  'honeypot', 'canary', 'trap',  // honey
  'vuln', 'advisory',            // cve
  'exploit', 'hack', 'inject',   // sqlmap
  'crack', 'hydra',              // john
  // Quote-character triggers that also invoked `cmdSqlmap` in the base revision
  // (`case "'": case '"':`). Not names, but still dispatchable tokens.
  "'", '"',
];

test('no network or easter-egg command survives', () => {
  // The flat denylist is checked against the union of canonical names and
  // every declared alias, so an egg cannot return by hiding in an alias.
  // This subsumes the old `COMMANDS[name] === undefined` key check.
  const live = new Set([
    ...Object.keys(COMMANDS),
    ...Object.values(COMMANDS).flatMap((c) => c.aliases || []),
  ]);
  for (const name of REMOVED) {
    assert.ok(!live.has(name), `${name} should be removed`);
  }
});

test('boot is present in the registry', () => {
  assert.equal(typeof COMMANDS.boot?.handler, 'function', 'boot must exist and be dispatchable');
});

test('every command has a non-empty description', () => {
  for (const [name, cmd] of Object.entries(COMMANDS)) {
    assert.ok(cmd.description?.length > 0, `${name} has no description`);
  }
});

test('aliases do not collide with command names', () => {
  const names = new Set(Object.keys(COMMANDS));
  for (const [, cmd] of Object.entries(COMMANDS)) {
    for (const a of cmd.aliases || []) {
      assert.ok(!names.has(a), `alias ${a} shadows a command`);
    }
  }
});

// `ALIASES` is a plain object built by iterating `COMMANDS`, so a string claimed
// by two commands is silently won by whichever was enumerated last. Nothing else
// catches it; assert every alias is claimed exactly once.
test('no alias string is claimed by two commands', () => {
  const owner = new Map();
  for (const [name, cmd] of Object.entries(COMMANDS)) {
    for (const a of cmd.aliases || []) {
      assert.ok(
        !owner.has(a),
        `alias ${a} is claimed by both ${owner.get(a)} and ${name}`,
      );
      owner.set(a, name);
    }
  }
});

// R4: descriptions are i18n keys resolved at call time, so that they follow a
// language change instead of freezing at import time. Every key must resolve to
// real prose in every locale, never to the key itself.
test('every description resolves through I18N.t() in all three locales', () => {
  const previous = I18N.currentLang;
  try {
    for (const lang of ['en', 'pt-br', 'es']) {
      I18N.currentLang = lang;
      for (const [name, cmd] of Object.entries(COMMANDS)) {
        const resolved = I18N.t(cmd.description);
        assert.notEqual(resolved, cmd.description, `${name} description is an unresolved key in ${lang}`);
        assert.ok(resolved.trim().length > 0, `${name} description is empty in ${lang}`);
      }
    }
  } finally {
    I18N.currentLang = previous;
  }
});
