import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getProjectData, PROJECTS_DATA } from '../projects-data.js';

test('getProjectData returns null for an unknown id instead of throwing', () => {
  assert.equal(getProjectData('does-not-exist', 'en'), null);
});

test('every featured project resolves in all three languages', () => {
  for (const id of ['coacus', 'anvilai', 'mcp-cheatengine', 'mcp-security-mitmproxy']) {
    for (const lang of ['en', 'pt-br', 'es']) {
      const p = getProjectData(id, lang);
      assert.ok(p, `${id} missing in ${lang}`);
      assert.ok(p.title && p.desc && p.stack?.length, `${id}/${lang} incomplete`);
    }
  }
});

test('no project points at the dead hardening-ia repository', () => {
  const dead = Object.values(PROJECTS_DATA).filter((p) => p.repo?.includes('hardening-ia'));
  assert.deepEqual(dead.map((p) => p.title), []);
});
