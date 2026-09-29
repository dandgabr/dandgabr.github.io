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

/** Milliseconds between the page being clear and an automatic first run. */
const TOUR_DELAY_MS = 600;

/**
 * The page's own landmarks. Driver.js mounts a `<header>` and a `<footer>` on
 * `<body>`, so while the tour runs the document has two banners and two
 * contentinfo landmarks and axe reports `landmark-no-duplicate-banner` /
 * `landmark-no-duplicate-contentinfo`. The vendored bundle cannot be edited, so
 * the page's pair is hidden from the accessibility tree for the duration and
 * restored on destroy.
 */
const SHADOWED_LANDMARKS = ['.screen-bar', '.hud-footer'];

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

/** True while the page landmarks are hidden from the accessibility tree. */
let landmarksShadowed = false;

/**
 * Hide the page's `banner` / `contentinfo` landmarks from assistive tech while
 * the tour's own header/footer are mounted, so the document never exposes a
 * duplicate of either. Paired with `restoreLandmarks`; idempotent.
 */
function shadowLandmarks() {
  if (landmarksShadowed) return;
  landmarksShadowed = true;
  SHADOWED_LANDMARKS.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute('aria-hidden', 'true');
  });
}

/** Undo `shadowLandmarks`. Safe to call when nothing was hidden. */
function restoreLandmarks() {
  landmarksShadowed = false;
  SHADOWED_LANDMARKS.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.removeAttribute('aria-hidden');
  });
}

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
      restoreLandmarks();
      try {
        localStorage.setItem(TOUR_DONE_KEY, '1');
      } catch (e) {}
    },
    steps: buildSteps((key) => I18N.t(key)),
  });

  // Landmarks are hidden before the first popover mounts and restored by
  // `onDestroyed`, so the shadow lasts exactly as long as `driver-active`.
  shadowLandmarks();
  instance.drive();
}

/**
 * The project modal `<dialog>` when it is currently open, else null. The tour
 * cannot run underneath it: Driver.js adds `.driver-active` to `<body>`, and
 * the vendored stylesheet sets `.driver-active * { pointer-events:none }`,
 * while the popover paints outside the dialog's top layer and is therefore
 * invisible behind it. A visitor who deep-links to `#/projects/<id>` on a first
 * visit would see an invisible tour swallow every click on the dialog and then
 * write `tour_done`.
 *
 * @returns {HTMLDialogElement|null}
 */
function openModal() {
  if (typeof document === 'undefined') return null;
  const modal = document.getElementById('project-modal');
  return modal && modal.open ? modal : null;
}

/** True while an automatic first run is deferred, so it is queued at most once. */
let pending = false;

/**
 * One deferral window. When the delay elapses the modal is re-checked: if one
 * is open the run stays pending and is re-armed on that dialog's `close`
 * instead of starting underneath it. A modal reopened inside the window (the
 * deep-link race) therefore cannot be trapped by `.driver-active`.
 */
function deferStart() {
  setTimeout(() => {
    const modal = openModal();
    if (modal) {
      // One-shot: the dialog owns the retry, so at most one listener is
      // attached for this pending run and a repeated close cannot stack one.
      modal.addEventListener('close', deferStart, { once: true });
      return;
    }
    pending = false;
    start();
  }, TOUR_DELAY_MS);
}

/** Arm the automatic first run. A call while one is already pending is a no-op. */
function scheduleStart() {
  if (pending) return;
  pending = true;
  deferStart();
}

/**
 * Run the tour automatically on a first visit only, after the first paint has
 * settled. A returning visitor, or one who asked for reduced motion, is left
 * alone; the completed flag is written by `start` on destroy, so it is never
 * written by a run that never began.
 *
 * On a deep link (`#/projects/coacus`) `projects.js` has already called
 * `showModal()` by the time this runs. Every deferred start re-checks for an
 * open modal and re-arms rather than starting, so a project modal reopened
 * within the delay window keeps the tour out too.
 */
export function initTour() {
  if (isTourDone()) return;
  if (prefersReducedMotion()) return;
  scheduleStart();
}

// Prefs' "Replay tour" control calls this handle. Set here rather than in
// `main.js` so the tour module owns the whole lifecycle. Guarded because the
// module is imported by the Node test suite, where `window` does not exist.
if (typeof window !== 'undefined') {
  window.__tour = { start };
}
