import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readStreamPreference, writeStreamPreference, TerminalStream } from '../effects.js';

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

/**
 * A controllable stand-in for the browser globals `TerminalStream` touches.
 * `narrow` flips what `(max-width: 767px)` reports; pending rAF callbacks are
 * tracked so a test can prove that stopping actually unscheduled the frame.
 */
function makeStreamHarness() {
  const state = { narrow: false, pending: new Map(), nextRaf: 1 };

  const ctx = { fillStyle: '', font: '', fillRect() {}, fillText() {} };
  const canvas = {
    width: 0,
    height: 0,
    style: {},
    getContext: () => ctx
  };
  const documentElement = { getAttribute: () => 'dark' };
  const documentStub = {
    documentElement,
    getElementById: () => canvas,
    addEventListener() {},
    hidden: false
  };
  const windowStub = {
    innerWidth: 1280,
    innerHeight: 800,
    matchMedia(query) {
      if (query === '(max-width: 767px)') return { matches: state.narrow };
      return { matches: false };
    },
    addEventListener() {}
  };

  const g = globalThis;
  const saved = {
    document: g.document,
    window: g.window,
    getComputedStyle: g.getComputedStyle,
    performance: g.performance,
    requestAnimationFrame: g.requestAnimationFrame,
    cancelAnimationFrame: g.cancelAnimationFrame
  };
  g.document = documentStub;
  g.window = windowStub;
  g.getComputedStyle = () => ({ getPropertyValue: () => 'monospace' });
  g.performance = { now: () => 0 };
  g.requestAnimationFrame = (cb) => {
    const id = state.nextRaf++;
    state.pending.set(id, cb);
    return id;
  };
  g.cancelAnimationFrame = (id) => state.pending.delete(id);

  return {
    state,
    canvas,
    window: windowStub,
    restore() {
      for (const [k, v] of Object.entries(saved)) {
        if (v === undefined) delete g[k];
        else g[k] = v;
      }
    }
  };
}

test('resize on a now-narrow viewport stops a running stream without clearing the preference', () => {
  const h = makeStreamHarness();
  try {
    // A visitor who opted in, loading on a desktop viewport.
    const store = { data: { stream_preference: '1' }, getItem(k) { return this.data[k] ?? null; }, setItem(k, v) { this.data[k] = v; } };
    const stream = new TerminalStream('stream-canvas');

    stream.start();
    assert.equal(stream.isRunning, true, 'stream runs on a desktop viewport');
    assert.notEqual(stream.animationId, null, 'a frame is scheduled while running');

    // Shrink below 768px without reloading.
    h.state.narrow = true;
    h.window.innerWidth = 500;
    h.window.innerHeight = 900;
    stream.resize();

    assert.equal(stream.isRunning, false, 'narrowing the viewport stops the stream');
    assert.equal(stream.animationId, null, 'the pending animation frame was cancelled');
    assert.equal(h.state.pending.size, 0, 'no frame remains queued');
    // The stop is a viewport gate, not a change of the visitor's mind.
    assert.equal(readStreamPreference(store), true, 'the stored preference is untouched');
  } finally {
    h.restore();
  }
});

test('stop and the narrow-resize path are safe when the stream is already stopped', () => {
  const h = makeStreamHarness();
  try {
    h.state.narrow = true;
    const stream = new TerminalStream('stream-canvas');

    stream.stop(); // never started
    stream.stop(); // second call
    stream.resize(); // gate fires on an already-stopped stream
    assert.equal(stream.isRunning, false);
    assert.equal(stream.animationId, null);
    assert.equal(h.state.pending.size, 0);
  } finally {
    h.restore();
  }
});

test('widening back does not auto-resume a stream the viewport gate stopped', () => {
  const h = makeStreamHarness();
  try {
    const stream = new TerminalStream('stream-canvas');
    stream.start();
    h.state.narrow = true;
    stream.resize();
    assert.equal(stream.isRunning, false);

    // Widen back: the gate must not re-enable the stream on its own.
    h.state.narrow = false;
    h.window.innerWidth = 1280;
    stream.resize();
    assert.equal(stream.isRunning, false, 'resizing wider leaves the stream stopped');
    assert.equal(h.state.pending.size, 0, 'no frame was scheduled by widening');
  } finally {
    h.restore();
  }
});
