import { test } from 'node:test';
import assert from 'node:assert/strict';
import { I18N } from '../i18n.js';

test('all three locales define exactly the same keys', () => {
  const langs = ['en', 'pt-br', 'es'];
  const keys = langs.map((l) => Object.keys(I18N.translations[l]).sort());
  assert.deepEqual(keys[1], keys[0], 'pt-br key set differs from en');
  assert.deepEqual(keys[2], keys[0], 'es key set differs from en');
});

test('t() returns the key itself when a translation is missing', () => {
  I18N.currentLang = 'en';
  assert.equal(I18N.t('definitely.not.a.key'), 'definitely.not.a.key');
});

test('t() returns the active locale value', () => {
  I18N.currentLang = 'pt-br';
  const pt = I18N.translations['pt-br']['nav.projects'];
  assert.equal(I18N.t('nav.projects'), pt);
});
