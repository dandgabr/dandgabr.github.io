/**
 * ============================================================================
 * GUIDED TOUR - first-visit walkthrough of the Workbench
 * A six-stop introduction to the shell: desktop -> dock -> window -> Prefs ->
 * language -> Shell. It runs once for a new visitor and is replayable from
 * Prefs (`window.__tour.start()`, wired at the bottom of this file).
 *
 * Vendored dependency:
 *   Driver.js v1.8.0 (MIT, zero runtime dependencies)
 *   https://unpkg.com/driver.js@1.8.0/dist/driver.js.mjs
 *     sha256 90f5e04305a2d0df16a5f6000bf7eb5d366cb6aeed1bf9a5c3bf5cc2bb80ad32
 *     size   25362 bytes
 *   https://unpkg.com/driver.js@1.8.0/dist/driver.css
 *     sha256 d095d440021fcf133ad46d37f18a2745fb76440f14f5208d17e203c039f765c9
 *     size   3042 bytes
 * The files are served from `vendor/driver/`, never from a CDN, so
 * `script-src 'self'` / `style-src 'self'` hold and the page works offline.
 * Driver.js injects no <style> element and never calls `setAttribute('style',`
 * `…)`; it materialises `style` attributes at runtime only by CSSOM property
 * assignment (13 of them during an active tour), which CSP permits while
 * `setAttribute('style', …)` is blocked under `style-src 'self'`.
 *
 * Security note: Driver.js renders popover copy with `innerHTML`. Only our own
 * translated strings (from `I18N`) are ever passed to it; no user input
 * reaches a step title or description.
 * ============================================================================
 */

import { driver } from './vendor/driver/driver.js.mjs';
import { I18N } from './i18n.js';
import { showApp } from './windows.js';

/** The media query a visitor can set to opt out of animation-heavy guidance. */
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** localStorage key written once the tour has been completed or dismissed. */
const TOUR_DONE_KEY = 'tour_done';

/** True when the visitor asked the system for reduced motion. */
function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia(REDUCED_MOTION).matches;
}

/** Read the completed flag without throwing in private-mode browsers. */
function isTourDone() {
  try {
    return localStorage.getItem(TOUR_DONE_KEY) === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Move to an application before its step is highlighted. The route is updated
 * first so the URL and the dock stay truthful; `showApp` then un-hides the
 * window synchronously, so Driver.js measures a laid-out element on the next
 * frame rather than a `display:none` box of zero size.
 *
 * @param {string} app an application id from `APP_IDS`
 */
function openApp(app) {
  location.hash = `#/${app}`;
  showApp(app);
}

/**
 * The tour stops, in order. Every `element` is a simple `.class` or `#id`
 * selector that exists in `index.html`; the Prefs and Shell windows are hidden
 * on the default route, so their steps carry an `onHighlightStarted` hook that
 * opens the window first.
 *
 * @param {(key: string) => string} t translation lookup
 * @returns {Array<{element: string, popover: {title: string, description: string}, onHighlightStarted?: Function}>}
 */
export function buildSteps(t) {
  return [
    {
      element: '.screen-bar',
      popover: { title: t('tour.welcome.title'), description: t('tour.welcome.desc') },
    },
    {
      element: '#dock-list',
      popover: { title: t('tour.dock.title'), description: t('tour.dock.desc') },
    },
    {
      element: '#app-window',
      popover: { title: t('tour.window.title'), description: t('tour.window.desc') },
    },
    {
      element: '.prefs-panel',
      popover: { title: t('tour.prefs.title'), description: t('tour.prefs.desc') },
      onHighlightStarted: () => openApp('prefs'),
    },
    {
      element: '#dock-list',
      popover: { title: t('tour.language.title'), description: t('tour.language.desc') },
    },
    {
      element: '#terminal',
      popover: { title: t('tour.shell.title'), description: t('tour.shell.desc') },
      onHighlightStarted: () => openApp('shell'),
    },
  ];
}

/** The live Driver.js instance, or null. Kept so a replay can replace it. */
let instance = null;

/**
 * Start the tour. Safe to call repeatedly: the Prefs "Replay tour" control
 * clears the completed flag and calls this, and it must replace, not stack,
 * any instance already on screen.
 */
export function start() {
  instance?.destroy();

  instance = driver({
    allowClose: true,
    showProgress: true,
    // Respect the motion preference for a manual replay too, not only for the
    // automatic first run that `initTour` guards.
    animate: !prefersReducedMotion(),
    nextBtnText: I18N.t('tour.next'),
    prevBtnText: I18N.t('tour.prev'),
    doneBtnText: I18N.t('tour.done'),
    onDestroyed: () => {
      try {
        localStorage.setItem(TOUR_DONE_KEY, '1');
      } catch (e) {}
    },
    steps: buildSteps((key) => I18N.t(key)),
  });

  instance.drive();
}

/**
 * Run the tour automatically on a first visit only, after the first paint has
 * settled. A returning visitor, or one who asked for reduced motion, is left
 * alone.
 */
export function initTour() {
  if (isTourDone()) return;
  if (prefersReducedMotion()) return;
  setTimeout(start, 600);
}

// Prefs' "Replay tour" control calls this handle. Set here rather than in
// `main.js` so the tour module owns the whole lifecycle. Guarded because the
// module is imported by the Node test suite, where `window` does not exist.
if (typeof window !== 'undefined') {
  window.__tour = { start };
}
