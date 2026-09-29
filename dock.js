/**
 * ============================================================================
 * APPLICATION DOCK
 * Renders the Workbench launcher list and owns its keyboard model. The items
 * are real `<a href="#/app">` links, not buttons: that yields middle-click,
 * copy-link, open-in-new-tab and the screen-reader links list for free.
 * Navigation happens by the browser changing `location.hash`; `router.js`
 * observes it. There is deliberately no activation callback.
 * ============================================================================
 */

import { APP_IDS } from './router.js';
import { I18N } from './i18n.js';

/** Move the single tabbable slot onto `index`, so Tab returns to the last item used. */
function setRovingTabindex(items, index) {
  items.forEach((el, n) => el.setAttribute('tabindex', n === index ? '0' : '-1'));
}

/** The seven `<a data-app>` anchors, in dock order. */
function dockItems(listEl) {
  return [...listEl.querySelectorAll('a[data-app]')];
}

/** Build the list once. */
function buildDock(listEl) {
  APP_IDS.forEach((app) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#/${app}`;
    a.className = 'dock-item';
    a.dataset.app = app;

    // The icon is a placeholder span Task 15 fills with per-app SVG; the label
    // is built as a node (not an HTML string) so there is no markup assembly.
    const icon = document.createElement('span');
    icon.className = 'dock-icon';
    icon.dataset.icon = app;
    const label = document.createElement('span');
    label.className = 'dock-label';
    // The label carries `data-i18n` as well as the initial text: `renderDock`
    // guarantees correct text at first paint, and the existing
    // I18N.setLanguage -> apply(document) path re-translates it on a live
    // language switch without the dock needing its own change listener.
    label.setAttribute('data-i18n', `dock.${app}`);
    label.textContent = I18N.t(`dock.${app}`);
    a.appendChild(icon);
    a.appendChild(label);

    li.appendChild(a);
    listEl.appendChild(li);
  });
}

/**
 * Render the dock list. Exactly one item is tabbable: the active app, or the
 * first item if the route names an app the dock does not carry.
 *
 * Idempotent and non-destructive. The anchors are built only once; a later
 * call updates `aria-current` and the roving `tabindex` in place. Rebuilding
 * would detach the focused node on every `hashchange` and drop focus back to
 * `BODY`, so the anchors must survive a re-render.
 *
 * @param {Element} listEl the <ul id="dock-list">
 * @param {string} activeApp the active application id
 */
export function renderDock(listEl, activeApp) {
  if (listEl.children.length !== APP_IDS.length) buildDock(listEl);

  const items = dockItems(listEl);
  items.forEach((el) => {
    el.setAttribute('aria-current', el.dataset.app === activeApp ? 'page' : 'false');
  });

  const activeIndex = items.findIndex((el) => el.dataset.app === activeApp);
  setRovingTabindex(items, activeIndex < 0 ? 0 : activeIndex);
}

/**
 * Lists already wired, so a second `initDockNav()` is a no-op. Module-level
 * state: without it each call adds another anonymous `click`/`keydown`
 * listener and one arrow press advances two items. Keyed by element rather
 * than a bare boolean so a replaced list still gets its listeners.
 */
const wiredLists = new WeakSet();

/**
 * Attach the dock's keyboard model. Takes no callback: the anchors navigate by
 * changing `location.hash` on their own.
 *
 * Idempotent: repeat calls do nothing.
 */
export function initDockNav() {
  const list = document.getElementById('dock-list');
  if (!list || wiredLists.has(list)) return;
  wiredLists.add(list);

  // A click focuses the item (the browser does that), so keep the roving
  // tabindex on it; otherwise Tab would jump back to the previous app.
  list.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[data-app]');
    if (!a) return;
    const items = [...list.querySelectorAll('a[data-app]')];
    setRovingTabindex(items, items.indexOf(a));
  });

  list.addEventListener('keydown', (e) => {
    const items = [...list.querySelectorAll('a[data-app]')];
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % items.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    setRovingTabindex(items, next);
    items[next].focus();
  });
}
