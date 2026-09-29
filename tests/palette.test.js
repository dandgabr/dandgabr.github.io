import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

// A colour is RGB444-legal when each channel byte has identical nibbles.
function isRgb444(hex) {
  const h = hex.replace('#', '').toUpperCase();
  if (!/^[0-9A-F]{6}$/.test(h)) return false;
  const [r, g, b] = [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)];
  return [r, g, b].every((c) => c[0] === c[1]);
}

// Read every stylesheet that exists, so the guard covers style.css today and
// keeps covering it once amiga.css is added (rather than falling back to one).
const CSS_FILES = ['amiga.css', 'style.css'];

test('every hex colour in every stylesheet is RGB444-legal', () => {
  const css = CSS_FILES.map((name) => new URL(`../${name}`, import.meta.url))
    .filter((url) => existsSync(url))
    .map((url) => readFileSync(url, 'utf8'))
    .join('\n');

  const found = [...css.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0]);
  const illegal = [...new Set(found)].filter((c) => !isRgb444(c));
  assert.deepEqual(illegal, [], `Non-RGB444 colours found: ${illegal.join(', ')}`);
});
