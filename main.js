/**
 * ============================================================================
 * BOOTSTRAP - the page's single entry point
 * Wires the modules together in one place. `app.js` keeps the Projects modal
 * engine and the HUD controls (both are deleted in later Phase 3 tasks, so this
 * task must keep them working rather than drop them); this file owns the
 * `DOMContentLoaded` handler that used to live in `app.js`.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { initRouter } from './router.js';
import { renderDock, initDockNav } from './dock.js';
import { showApp } from './windows.js';
import { TerminalCLI } from './terminal.js';
import { TerminalStream, readStreamPreference, writeStreamPreference, flipStreamPreference } from './effects.js';
import { ProjectsEngine, HUDManager } from './app.js';

/** The dock list is stable markup, so resolve it once, not per route. */
const listEl = document.getElementById('dock-list');

/**
 * Router callback: open the route's window and move the dock's active marker.
 * `initRouter` emits synchronously on init, so this also paints the first
 * route without waiting for a `hashchange`.
 *
 * @param {{app: string, project: string|null}} route
 */
function activate(route) {
  showApp(route.app);
  renderDock(listEl, route.app);
}

document.addEventListener('DOMContentLoaded', () => {
  // 0. Detect and apply the system / saved language before the dock renders.
  I18N.setLanguage(I18N.detectLanguage());
  I18N.apply(document);

  // 1. Dock keyboard model, then the router. The router's first emit renders
  //    the dock list and opens the initial window (INTEL for "" and unknown).
  initDockNav();
  initRouter(activate);

  // 2. Terminal background stream canvas - opt-in, persisted, desktop only.
  //    This is the single reader of the preference; every toggle writes it
  //    through effects.js. `window.__effects` is the cross-module handle and is
  //    set BEFORE HUDManager is constructed, so the STREAM control reads it.
  const stream = new TerminalStream('stream-canvas');
  window.__effects = { stream, readStreamPreference, writeStreamPreference, flipStreamPreference };
  if (readStreamPreference() && !window.matchMedia('(max-width: 767px)').matches) {
    stream.start();
  }

  // 3. Interactive CLI shell. Mounted even while its window is hidden: the
  //    form, chips and output live in the DOM regardless of `hidden`.
  new TerminalCLI('terminal-form', 'cli-input', 'terminal-output');

  // 4. Projects filter & inspector (transitional; Phase 3 moves it to projects.js).
  new ProjectsEngine();

  // 5. HUD controls (transitional; Phase 3 moves them to Prefs). The stream
  //    writer is injected rather than re-imported inside app.js: effects.js
  //    stays the single write path and app.js keeps no dependency on it.
  new HUDManager(flipStreamPreference);

  // 6. Avatar image fallback, moved here from app.js.
  const avatarImg = document.getElementById('avatar-img');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarImg.hidden = true;
      const asciiFallback = document.getElementById('ascii-avatar');
      if (asciiFallback) asciiFallback.hidden = false;
    });
  }

  console.info('%c[SYS_KERNEL] Daniel Gonçalves Araujo portfolio online. System initialized.', 'color: #00ff66; font-weight: bold; background: #050807; padding: 4px;');
});
