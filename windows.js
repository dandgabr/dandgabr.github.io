/**
 * ============================================================================
 * WINDOW MANAGER
 * One application occupies the screen at a time. `showApp` toggles the `hidden`
 * attribute on the `<section class="app" data-app>` windows, moves focus to the
 * newly opened window's heading and announces the switch through the single
 * visually-hidden `#app-status` live region.
 *
 * The `hidden` attribute (not a class) is the whole visibility model: a window
 * that is not active is absent from layout and from the accessibility tree.
 * `role="application"` is deliberately never used.
 * ============================================================================
 */

/** The id of the currently open application, or null before the first paint. */
let active = null;

/**
 * Open one application window and close the rest.
 *
 * Idempotent for the already-active app: re-opening it is a no-op so a repeat
 * route emission does not steal focus or re-announce. The dock anchors carry
 * `data-app` too, so the toggle loop filters on the `app` class rather than
 * assuming every `[data-app]` is a window.
 *
 * @param {string} app the application id to open (e.g. "intel")
 */
export function showApp(app) {
  if (app === active) return;

  document.querySelectorAll('[data-app]').forEach((section) => {
    if (section.classList.contains('app')) section.hidden = section.dataset.app !== app;
  });

  const heading = document.querySelector(`.app[data-app="${app}"] .window-heading`);
  if (heading) heading.focus({ preventScroll: true });

  const status = document.getElementById('app-status');
  if (status) status.textContent = `${app} window opened`;

  active = app;
}

/**
 * The id of the currently open application.
 * @returns {string|null}
 */
export function getActiveApp() {
  return active;
}
