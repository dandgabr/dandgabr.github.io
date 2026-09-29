import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APP_IDS } from '../router.js';

/**
 * Minimal DOM shim: enough for `renderDock`/`initDockNav` and no more. The
 * repository has no jsdom, and the point under test is node identity and
 * listener count, both of which a tiny shim models exactly. It is installed
 * per test and removed after, so the router suite's no-DOM purity test (run in
 * its own process) is unaffected.
 */
function makeDOM() {
  const doc = { activeElement: null, byId: {} };

  function makeEl(tag) {
    const el = {
      tagName: String(tag).toUpperCase(),
      children: [],
      dataset: {},
      attrs: {},
      listeners: [],
      className: '',
      textContent: '',
      parentNode: null,
      appendChild(child) {
        child.parentNode = el;
        el.children.push(child);
        return child;
      },
      setAttribute(name, value) {
        el.attrs[name] = String(value);
      },
      getAttribute(name) {
        return name in el.attrs ? el.attrs[name] : null;
      },
      focus() {
        doc.activeElement = el;
      },
      addEventListener(type, fn) {
        el.listeners.push({ type, fn });
      },
      fire(type, event) {
        for (const l of el.listeners) {
          if (l.type === type) l.fn({ type, preventDefault() {}, ...event });
        }
      },
      descendants() {
        return el.children.flatMap((c) => [c, ...c.descendants()]);
      },
      querySelectorAll(selector) {
        const all = el.descendants();
        if (selector === 'a[data-app]') {
          return all.filter((n) => n.tagName === 'A' && n.dataset.app);
        }
        return [];
      },
    };
    return el;
  }

  doc.createElement = (tag) => makeEl(tag);
  doc.getElementById = (id) => doc.byId[id] || null;
  doc._makeEl = makeEl;
  return doc;
}

function withDOM(fn) {
  const previous = globalThis.document;
  globalThis.document = makeDOM();
  try {
    return fn(globalThis.document);
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
}

const dockItems = (list) => list.querySelectorAll('a[data-app]');

test('renderDock builds one anchor per app, in dock order', async () => {
  const { renderDock } = await import('../dock.js');
  withDOM((doc) => {
    const list = doc.createElement('ul');
    doc.byId['dock-list'] = list;
    renderDock(list, 'projects');

    const items = dockItems(list);
    assert.equal(list.children.length, APP_IDS.length);
    assert.deepEqual(items.map((a) => a.dataset.app), APP_IDS);
    assert.deepEqual(items.map((a) => a.href), APP_IDS.map((app) => `#/${app}`));
    // Anchors, never buttons.
    assert.ok(items.every((a) => a.tagName === 'A'));
  });
});

test('renderDock marks exactly one current item and one tabbable slot', async () => {
  const { renderDock } = await import('../dock.js');
  withDOM((doc) => {
    const list = doc.createElement('ul');
    renderDock(list, 'shell');
    const items = dockItems(list);

    const current = items.filter((a) => a.getAttribute('aria-current') === 'page');
    assert.equal(current.length, 1);
    assert.equal(current[0].dataset.app, 'shell');

    const tabbable = items.filter((a) => a.getAttribute('tabindex') === '0');
    assert.equal(tabbable.length, 1);
    assert.equal(tabbable[0].dataset.app, 'shell');
  });
});

test('renderDock is non-destructive: anchor nodes survive a re-render', async () => {
  const { renderDock } = await import('../dock.js');
  withDOM((doc) => {
    const list = doc.createElement('ul');
    renderDock(list, 'intel');
    const before = dockItems(list);

    // A keyboard user has focused one item, then the route changes.
    const focused = before[2];
    focused.focus();
    assert.equal(doc.activeElement, focused);

    renderDock(list, 'connect');
    const after = dockItems(list);

    // Same node objects, not equal-looking replacements.
    assert.equal(after.length, before.length);
    for (let i = 0; i < before.length; i++) {
      assert.equal(after[i], before[i], `item ${i} must be the same node`);
    }
    assert.equal(doc.activeElement, focused, 'focus must survive the re-render');

    // aria-current moved, and the roving slot followed it.
    assert.equal(after[4].getAttribute('aria-current'), 'page'); // connect
    assert.equal(after[2].getAttribute('aria-current'), 'false');
    assert.equal(after[4].getAttribute('tabindex'), '0');
    assert.equal(after[2].getAttribute('tabindex'), '-1');
  });
});

test('renderDock does not duplicate items on repeated calls', async () => {
  const { renderDock } = await import('../dock.js');
  withDOM((doc) => {
    const list = doc.createElement('ul');
    renderDock(list, 'intel');
    renderDock(list, 'skills');
    renderDock(list, 'prefs');
    assert.equal(list.children.length, APP_IDS.length);
    assert.equal(dockItems(list).length, APP_IDS.length);
  });
});

test('initDockNav wires listeners once, so one ArrowRight moves one item', async () => {
  const { initDockNav } = await import('../dock.js');
  const { renderDock } = await import('../dock.js');
  withDOM((doc) => {
    const list = doc.createElement('ul');
    doc.byId['dock-list'] = list;
    renderDock(list, 'intel');
    const items = dockItems(list);
    items[0].focus();

    initDockNav();
    initDockNav(); // must be a no-op, not a second pair of listeners
    assert.equal(list.listeners.length, 2, 'exactly one click and one keydown listener');

    list.fire('keydown', { key: 'ArrowRight' });
    // A double-wired list would advance twice (intel -> projects).
    assert.equal(doc.activeElement.dataset.app, 'skills');
  });
});
