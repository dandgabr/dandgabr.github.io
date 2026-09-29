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
 * Parse a hash string into a route. An unknown app, an empty hash or a
 * trailing slash all fall back to `intel` rather than throwing. The project
 * segment is only meaningful for the `projects` app.
 *
 * @param {string} hash e.g. "#/projects/coacus"
 * @returns {{app: string, project: string|null}}
 */
export function parseHash(hash) {
  const parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
  const app = APP_IDS.includes(parts[0]) ? parts[0] : DEFAULT_APP;
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
 * @param {(route: {app: string, project: string|null}) => void} onChange
 */
export function initRouter(onChange) {
  const emit = () => onChange(parseHash(location.hash));
  window.addEventListener('hashchange', emit);
  emit();
}
