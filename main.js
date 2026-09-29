/**
 * ============================================================================
 * BOOTSTRAP - the page's single entry point
 * Wires the modules together in one place. The Projects modal engine lives in
 * `projects.js`, the preferences application in `prefs.js`, and this file owns
 * the `DOMContentLoaded` handler that used to live in `app.js`.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { initRouter } from './router.js';
import { renderDock, initDockNav } from './dock.js';
import { showApp } from './windows.js';
import { TerminalCLI } from './terminal.js';
import { initPrefs } from './prefs.js';
import { initProjects, openProject, closeProject } from './projects.js';
import { initTour } from './tour.js';

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

  // 2. Interactive CLI shell. Mounted even while its window is hidden: the
  //    form, chips and output live in the DOM regardless of `hidden`.
  new TerminalCLI('terminal-form', 'cli-input', 'terminal-output');

  // 3. Projects grid, filter tabs and inspection modal.
  initProjects();

  // 4. Prefs controls: language, CRT scanlines and replay tour. The listener is
  //    delegated from the PREFS window itself, so this is the only wiring the
  //    page needs for the whole preference surface.
  initPrefs();

  // 5. First-visit guided tour. Runs once for a new visitor, after a short
  //    delay so it does not fight the first paint; Prefs' "Replay tour" control
  //    restarts it through the `window.__tour` handle the module sets.
  initTour();

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
