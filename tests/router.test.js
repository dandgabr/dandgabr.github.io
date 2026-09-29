import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APP_IDS, parseHash, toHash } from '../router.js';

const APPS = ['intel','skills','projects','academic','connect','shell','prefs'];

test('an empty hash falls back to intel', () => {
  assert.deepEqual(parseHash(''), { app: 'intel', project: null });
});

test('an unknown route falls back to intel', () => {
  assert.deepEqual(parseHash('#/nonsense'), { app: 'intel', project: null });
});

test('a known app route parses', () => {
  assert.deepEqual(parseHash('#/projects'), { app: 'projects', project: null });
});

test('a project deep-link parses', () => {
  assert.deepEqual(parseHash('#/projects/coacus'), { app: 'projects', project: 'coacus' });
});

test('a trailing slash is tolerated', () => {
  assert.deepEqual(parseHash('#/projects/'), { app: 'projects', project: null });
});

test('toHash round-trips', () => {
  assert.equal(toHash('projects', 'coacus'), '#/projects/coacus');
  assert.equal(parseHash(toHash('skills')).app, 'skills');
});

test('every app id is reachable', () => {
  for (const app of APPS) assert.equal(parseHash(toHash(app)).app, app);
});

// Beyond the brief's block: the interface the later tasks depend on.
test('APP_IDS is the exact dock order', () => {
  assert.deepEqual(APP_IDS, APPS);
});

test('a project segment on a non-projects app is ignored', () => {
  assert.deepEqual(parseHash('#/skills/foo'), { app: 'skills', project: null });
});

test('an empty project segment is null, not an empty string', () => {
  assert.deepEqual(parseHash('#/projects//'), { app: 'projects', project: null });
});

test('a missing leading slash is tolerated', () => {
  assert.deepEqual(parseHash('#projects'), { app: 'projects', project: null });
});

test('non-string input does not throw', () => {
  assert.deepEqual(parseHash(undefined), { app: 'intel', project: null });
  assert.deepEqual(parseHash(null), { app: 'intel', project: null });
});

test('parseHash is pure: same argument, same result, no DOM access', () => {
  assert.equal(typeof globalThis.document, 'undefined', 'no DOM should exist here');
  assert.deepEqual(parseHash('#/academic'), parseHash('#/academic'));
});

// The argument wins over any ambient `location`: a parser that reads the global
// defensively would pass the suite above, so probe it directly.
test('the argument wins even when a location global exists', () => {
  globalThis.location = { hash: '#/projects' };
  try {
    assert.deepEqual(parseHash('#/skills'), { app: 'skills', project: null });
  } finally {
    delete globalThis.location;
  }
});

// Legacy shared links (spec §5): the old section ids must land on the app that
// absorbed the section, not fall through to the intel default.
test('a legacy #credentials link lands on academic', () => {
  assert.deepEqual(parseHash('#credentials'), { app: 'academic', project: null });
  assert.deepEqual(parseHash('#/credentials'), { app: 'academic', project: null });
});

test('a legacy #contact link lands on connect', () => {
  assert.deepEqual(parseHash('#contact'), { app: 'connect', project: null });
  assert.deepEqual(parseHash('#/contact'), { app: 'connect', project: null });
});

test('a legacy #terminal link lands on shell, not intel', () => {
  assert.deepEqual(parseHash('#terminal'), { app: 'shell', project: null });
  assert.deepEqual(parseHash('#/terminal'), { app: 'shell', project: null });
});

test('a legacy alias does not leak a project segment', () => {
  assert.deepEqual(parseHash('#/credentials/foo'), { app: 'academic', project: null });
  assert.deepEqual(parseHash('#/contact/foo'), { app: 'connect', project: null });
  assert.deepEqual(parseHash('#/terminal/foo'), { app: 'shell', project: null });
});

test('the about rename lands on intel', () => {
  assert.deepEqual(parseHash('#about'), { app: 'intel', project: null });
});

test('the alias lookup cannot reach Object.prototype', () => {
  assert.deepEqual(parseHash('#/constructor'), { app: 'intel', project: null });
  assert.deepEqual(parseHash('#/toString'), { app: 'intel', project: null });
});
