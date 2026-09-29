/**
 * ============================================================================
 * BOOTSTRAP - the page's single entry point
 * Wires the modules together in one place. `app.js` keeps the HUD controls
 * (deleted in a later Phase 3 task, so this task must keep them working rather
 * than drop them); the Projects modal engine now lives in `projects.js`. This
 * file owns the `DOMContentLoaded` handler that used to live in `app.js`.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { initRouter } from './router.js';
import { renderDock, initDockNav } from './dock.js';
import { showApp } from './windows.js';
import { TerminalCLI } from './terminal.js';
import { TerminalStream, readStreamPreference, writeStreamPreference, flipStreamPreference } from './effects.js';
import { HUDManager } from './app.js';
import { initProjects, openProject, closeProject } from './projects.js';

/** The dock list is stable markup, so resolve it once, not per route. */
const listEl = document.getElementById('dock-list');

/**
 * Router callback: open the route's window and move the dock's active marker.
 * `initRouter` emits synchronously on init, so this also paints the first
 * route without waiting for a `hashchange`.
 *
 * The PROJECTS app is the one route with a sub-target: `#/projects/<id>` opens
 * the inspection modal for that repository (a deep link a visitor can share),
 * while `#/projects` and every other app close it. An unknown id resolves to no
 * data and `openProject` closes instead of rendering an empty modal.
 *
 * @param {{app: string, project: string|null}} route
 */
function activate(route) {
  showApp(route.app);
  renderDock(listEl, route.app);
  if (route.app === 'projects' && route.project) openProject(route.project);
  else closeProject();
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

  // 4. Projects grid, filter tabs and inspection modal.
  initProjects();

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
