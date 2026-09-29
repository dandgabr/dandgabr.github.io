import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

// A colour is RGB444-legal when each channel byte has identical nibbles.
// Anything that is not exactly 6 hex digits (3/4-digit shorthand, 8-digit
// #RRGGBBAA, or a malformed/longer value) is rejected before the nibble check.
export function isRgb444(hex) {
  const h = hex.replace('#', '').toUpperCase();
  if (!/^[0-9A-F]{6}$/.test(h)) return false;
  const [r, g, b] = [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)];
  return [r, g, b].every((c) => c[0] === c[1]);
}

// Extract every hex colour token regardless of digit count. The upper bound of
// 8 covers #RRGGBBAA (and 3/4-digit shorthand is covered by the lower bound);
// `\b` alone would silently drop 8-digit values, because it cannot anchor
// between the 6th and 7th hex digits (both are word characters).
export function findHexColours(css) {
  return [...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0]);
}

// Read every stylesheet that exists, so the guard covers style.css today and
// keeps covering it once amiga.css is added (rather than falling back to one).
const CSS_FILES = ['amiga.css', 'style.css'];

test('every hex colour in every stylesheet is RGB444-legal', () => {
  const css = CSS_FILES.map((name) => new URL(`../${name}`, import.meta.url))
    .filter((url) => existsSync(url))
    .map((url) => readFileSync(url, 'utf8'))
    .join('\n');

  const found = findHexColours(css);
  const illegal = [...new Set(found)].filter((c) => !isRgb444(c));
  assert.deepEqual(illegal, [], `Non-RGB444 colours found: ${illegal.join(', ')}`);
});

// Regression for the matcher hole: an 8-digit #RRGGBBAA colour must be visible
// to the match expression (the old `{6}\b` pattern saw nothing at all), and
// isRgb444 must reject shorthand and alpha-bearing lengths rather than pass.
test('the matcher sees 8-digit #RRGGBBAA colours and isRgb444 rejects them', () => {
  assert.equal(isRgb444('#030a06ff'), false, '8-digit alpha colour must be rejected');
  assert.equal(isRgb444('#fff'), false, '3-digit shorthand must be rejected');
  assert.equal(isRgb444('#ffff'), false, '4-digit shorthand must be rejected');

  const found = findHexColours(':root{--x:#030a06ff}');
  assert.deepEqual(found, ['#030a06ff'], 'the matcher must surface the 8-digit token');
});
