/**
 * ============================================================================
 * PROJECTS APPLICATION - featured repositories and the inspection modal
 *
 * Extracted from `app.js` (`ProjectsEngine`) so the grid, the filter tabs and
 * the `<dialog>` share one owner. `main.js` instantiates this once through
 * `initProjects()` and calls `openProject` / `closeProject` from the router's
 * `activate`, which is what makes `#/projects/<id>` open the right modal.
 *
 * Every listener is rooted at the `[data-app="projects"]` section (or at the
 * dialog itself) and guarded by a module-level `WeakSet`, so switching away and
 * back - or a repeated `initProjects()` - cannot bind twice and open the modal
 * twice. The old class bound document-wide `querySelectorAll('.inspect-btn')`
 * per construction, which double-fired on every re-instantiation; that failure
 * mode is gone by construction.
 *
 * A project id the store does not know (`#/projects/does-not-exist`) closes the
 * dialog and returns: it never throws and never renders an empty modal.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { getProjectData } from './projects-data.js';

/** Sections already wired. Keyed by element so a replaced section re-binds. */
const wiredSections = new WeakSet();
/** Dialogs already wired. Same reason. */
const wiredDialogs = new WeakSet();

/** Resolve the dialog per call, so the module never caches a detached node. */
function dialogEl() {
  return document.getElementById('project-modal');
}

/** Write text into an optional node without throwing on a missing id. */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Toggle the `is-hidden` class on the cards whose `data-category` carries the
 * filter. `all` matches every card.
 */
function applyFilter(section, filter) {
  section.querySelectorAll('.project-card').forEach((card) => {
    const categories = (card.dataset.category || '').split(/\s+/);
    const match = filter === 'all' || categories.includes(filter);
    card.classList.toggle('is-hidden', !match);
  });
}

/** Move the selected marker to `button`, then filter the grid. */
function selectFilter(section, button) {
  section.querySelectorAll('.filter-btn').forEach((b) => {
    const active = b === button;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  applyFilter(section, button.dataset.filter || 'all');
}

/** Populate the dialog from one project record. Pure DOM writes, no HTML. */
function renderModal(data) {
  setText('modal-terminal-title', `Workbench:Projects/${data.title}`);
  setText('modal-project-title', data.title);
  setText('modal-project-desc', `${data.subtitle}. ${data.desc}`);
  setText('modal-project-tag', data.tag);
  setText('modal-project-status', data.status);
  setText('modal-project-details', data.details);

  const stack = document.getElementById('modal-project-stack');
  if (stack) {
    stack.replaceChildren();
    (data.stack || []).forEach((item) => {
      const span = document.createElement('span');
      span.className = 'skill-pill bevel-inset';
      span.textContent = item;
      stack.appendChild(span);
    });
  }

  const repoLink = document.getElementById('modal-repo-link');
  if (repoLink) repoLink.href = data.repo;
}

/**
 * Close the inspection modal. Safe to call when it is already closed, when the
 * dialog is absent, and when `HTMLDialogElement.close` is unavailable.
 */
export function closeProject() {
  const modal = dialogEl();
  if (!modal) return;

  // Drop the last repo target so the closed dialog holds no stale deep link
  // after a valid project is followed by an unknown id. Safe to repeat: the
  // element starts at `href="#"` and `renderModal` rewrites it before every
  // `showModal()`, so no open path can observe the reset.
  const repoLink = document.getElementById('modal-repo-link');
  if (repoLink) repoLink.setAttribute('href', '#');

  if (typeof modal.close === 'function') {
    // `close()` is a no-op on a closed dialog in every current engine, but the
    // explicit guard keeps the intent readable and avoids an `open` attribute
    // write on browsers that only support the attribute fallback.
    if (modal.open) modal.close();
  } else {
    modal.removeAttribute('open');
  }
}

/**
 * Open the inspection modal for `id`.
 *
 * @param {string} id a `PROJECTS_DATA` key, e.g. `"coacus"`
 */
export function openProject(id) {
  const modal = dialogEl();
  if (!modal) return;

  const data = getProjectData(id, I18N.currentLang);
  if (!data) {
    // An unknown deep link must never throw and never render an empty modal.
    closeProject();
    return;
  }

  renderModal(data);

  // `showModal()` throws InvalidStateError when the dialog is already open, and
  // a repeated route emission on the same project lands here. The content above
  // is already refreshed, so showing again is unnecessary.
  if (modal.open) return;

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
}

/**
 * Wire the grid's delegated handlers and the dialog's dismissal. Idempotent.
 */
export function initProjects() {
  const section = document.querySelector('[data-app="projects"]');
  const modal = dialogEl();
  if (!section || !modal) return;

  if (!wiredSections.has(section)) {
    wiredSections.add(section);
    // One delegated listener handles both the filter tabs and the inspect
    // buttons, so cards added later need no re-binding and a re-init is a
    // no-op rather than a second handler.
    section.addEventListener('click', (event) => {
      const filterBtn = event.target.closest?.('.filter-btn');
      if (filterBtn) {
        selectFilter(section, filterBtn);
        return;
      }
      const inspectBtn = event.target.closest?.('.inspect-btn');
      if (inspectBtn) openProject(inspectBtn.dataset.project);
    });
  }

  if (!wiredDialogs.has(modal)) {
    wiredDialogs.add(modal);

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeProject);

    const dismissBtn = document.getElementById('modal-dismiss-btn');
    if (dismissBtn) dismissBtn.addEventListener('click', closeProject);

    // Backdrop click: the dialog itself is the target only when the click lands
    // outside `.modal-card`.
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProject();
    });

    // Keyboard dismissal. `<dialog>` also closes natively on Escape; the guard
    // on `modal.open` in `closeProject` makes the duplicate path harmless.
    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeProject();
    });
  }
}
