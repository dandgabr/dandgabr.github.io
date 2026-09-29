import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMMANDS } from '../terminal.js';
import { I18N } from '../i18n.js';

const REMOVED = ['nmap', 'sqlmap', 'john', 'hash', 'base64', 'rot13', 'iptables', 'honey', 'cve', 'ping', 'traceroute'];

test('no network or easter-egg command survives', () => {
  for (const name of REMOVED) {
    assert.equal(COMMANDS[name], undefined, `${name} should be removed`);
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
