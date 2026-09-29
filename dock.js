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

/**
 * Render the dock list. Exactly one item is tabbable: the active app, or the
 * first item if the route names an app the dock does not carry.
 *
 * @param {Element} listEl the <ul id="dock-list">
 * @param {string} activeApp the active application id
 */
export function renderDock(listEl, activeApp) {
  listEl.innerHTML = '';
  APP_IDS.forEach((app) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#/${app}`;
    a.className = 'dock-item';
    a.dataset.app = app;
    a.setAttribute('aria-current', app === activeApp ? 'page' : 'false');
    a.innerHTML = `<span class="dock-icon" data-icon="${app}"></span><span class="dock-label"></span>`;
    // The label carries `data-i18n` as well as the initial text: `renderDock`
    // guarantees correct text at first paint, and the existing
    // I18N.setLanguage -> apply(document) path re-translates it on a live
    // language switch without the dock needing its own change listener.
    const label = a.querySelector('.dock-label');
    label.setAttribute('data-i18n', `dock.${app}`);
    label.textContent = I18N.t(`dock.${app}`);
    li.appendChild(a);
    listEl.appendChild(li);
  });

  const items = [...listEl.querySelectorAll('a[data-app]')];
  const activeIndex = items.findIndex((el) => el.dataset.app === activeApp);
  setRovingTabindex(items, activeIndex < 0 ? 0 : activeIndex);
}

/**
 * Attach the dock's keyboard model. Takes no callback: the anchors navigate by
 * changing `location.hash` on their own.
 */
export function initDockNav() {
  const list = document.getElementById('dock-list');
  if (!list) return;

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
