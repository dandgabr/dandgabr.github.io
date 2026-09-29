/**
 * ============================================================================
 * HASH ROUTER
 * Maps `location.hash` to an application route. `parseHash` is a pure function
 * of its string argument, so the routing rules are unit-testable under Node
 * with no DOM; only `initRouter` touches the browser.
 * ============================================================================
 */

export const APP_IDS = ['intel', 'skills', 'projects', 'academic', 'connect', 'shell', 'prefs'];

const DEFAULT_APP = 'intel';

/**
 * Old section ids that no longer name an app. They predate the Workbench and
 * are still in the wild as shared links, so they are aliased onto the app that
 * absorbed the section's content instead of falling through to `intel`.
 * `about` is absent on purpose: it renamed to `intel`, which is already the
 * default fallback. Frozen and probed with `Object.hasOwn` so a hash such as
 * `#/constructor` cannot reach `Object.prototype`.
 */
const LEGACY_ALIASES = Object.freeze({
  credentials: 'academic',
  contact: 'connect',
  terminal: 'shell',
});

/**
 * Parse a hash string into a route. An unknown app, an empty hash or a
 * trailing slash all fall back to `intel` rather than throwing. The project
 * segment is only meaningful for the `projects` app.
 *
 * Pure: the function of its argument alone. It never reads `location`, so it
 * is unit-testable under Node with no DOM.
 *
 * @param {string} hash e.g. "#/projects/coacus"
 * @returns {{app: string, project: string|null}}
 */
export function parseHash(hash) {
  const parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
  const segment = parts[0];
  // Aliases are resolved before the APP_IDS check: a legacy id must win over
  // the `intel` fallback it would otherwise take.
  const app = Object.hasOwn(LEGACY_ALIASES, segment)
    ? LEGACY_ALIASES[segment]
    : APP_IDS.includes(segment) ? segment : DEFAULT_APP;
  const project = app === 'projects' && parts[1] ? parts[1] : null;
  return { app, project };
}

/**
 * Build the hash a route should live at.
 *
 * @param {string} app
 * @param {string} [project] only used by the `projects` app
 * @returns {string}
 */
export function toHash(app, project) {
  if (app === 'projects' && project) return `#/projects/${project}`;
  return `#/${app}`;
}

/**
 * Wire the browser's hash to a callback. Emits once on init so the initial
 * route paints without waiting for a hashchange.
 *
 * Idempotent by return value: the caller can undo the subscription, so a
 * second `initRouter` does not leave a listener behind double-firing every
 * route change.
 *
 * @param {(route: {app: string, project: string|null}) => void} onChange
 * @returns {() => void} unsubscribe; removes the listener
 */
export function initRouter(onChange) {
  const emit = () => onChange(parseHash(location.hash));
  window.addEventListener('hashchange', emit);
  emit();
  return () => window.removeEventListener('hashchange', emit);
}
