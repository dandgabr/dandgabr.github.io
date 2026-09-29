import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readStreamPreference, writeStreamPreference } from '../effects.js';

test('an unset stream preference defaults to off', () => {
  const store = { getItem: () => null, setItem: () => {} };
  assert.equal(readStreamPreference(store), false);
});

test('an explicit on survives a round trip', () => {
  const store = { data: {}, getItem(k) { return this.data[k] ?? null; }, setItem(k, v) { this.data[k] = v; } };
  writeStreamPreference(store, true);
  assert.equal(readStreamPreference(store), true);
});

test('a garbage value falls back to off', () => {
  const store = { getItem: () => 'yes-please', setItem: () => {} };
  assert.equal(readStreamPreference(store), false);
});
