import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSteps } from '../tour.js';

const t = (k) => `t:${k}`;

test('the tour has between 4 and 8 steps', () => {
  const steps = buildSteps(t);
  assert.ok(steps.length >= 4 && steps.length <= 8, `got ${steps.length}`);
});

test('every step targets an element and carries translated copy', () => {
  for (const s of buildSteps(t)) {
    assert.ok(s.element, 'a step has no element selector');
    assert.ok(s.popover?.title?.startsWith('t:'), 'title is not translated');
    assert.ok(s.popover?.description?.startsWith('t:'), 'description is not translated');
  }
});

test('every step element selector exists in index.html', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const s of buildSteps(t)) {
    const sel = s.element;
    // Class selectors start with '.', id selectors with '#'. Extract the token
    // and look for it as a class or id occurrence in the markup.
    const token = sel.replace(/^[.#]/, '');
    const attr = sel.startsWith('.') ? `class="${token}` : `id="${token}"`;
    assert.ok(html.includes(attr), `no target for ${s.element}`);
  }
});
