/**
 * ============================================================================
 * PREFS - the preferences application
 * The single owner of the language, CRT scanline, background-stream and
 * replay-tour controls. It replaces the transitional HUD controls that used to
 * live in the deleted SYS-CTRL side panel and the class that drove them.
 *
 * The listener is delegated and rooted on the `[data-app="prefs"]` section, not
 * on `document`, so it cannot observe a click anywhere else on the page and
 * cannot collide with the terminal, the modal or the dock.
 *
 * Every read goes through the real state:
 *   - CRT lives on `document.documentElement[data-crt]`, set pre-paint by
 *     `theme-init.js` from the persisted preference.
 *   - stream lives in `effects.js` (`readStreamPreference`), the single read
 *     path, so what the button shows is what the page does.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { readStreamPreference, writeStreamPreference } from './effects.js';

/** localStorage key for the CRT preference; `'1'` and legacy `'true'` mean OFF. */
const CRT_KEY = 'crt_scanline_off';

/**
 * Wire the Prefs controls. Idempotent by the caller (called once on
 * `DOMContentLoaded`); a missing section is a no-op so the module can load
 * before the markup without throwing.
 */
export function initPrefs() {
  // `.app[data-app=...]`, not the bare attribute: the dock carries a
  // `data-app="prefs"` anchor too, and a bare selector would race DOM order.
  const root = document.querySelector('.app[data-app="prefs"]');
  if (!root) return;

  const crtBtn = root.querySelector('[data-toggle="crt"]');
  const streamBtn = root.querySelector('[data-toggle="stream"]');

  // The toggle buttons are state labels, so they carry no `data-i18n` (which
  // would pin them to a single key); they are re-labelled here whenever the
  // state or the language changes.
  const renderLabels = () => {
    const on = I18N.t('prefs.on');
    const off = I18N.t('prefs.off');
    if (crtBtn) crtBtn.textContent = crtBtn.getAttribute('aria-pressed') === 'true' ? on : off;
    if (streamBtn) streamBtn.textContent = streamBtn.getAttribute('aria-pressed') === 'true' ? on : off;
  };

  // Paint the REAL state, not a default: the attribute is the source of truth
  // for CRT, `readStreamPreference` for the stream.
  const renderState = () => {
    const crtOn = document.documentElement.getAttribute('data-crt') !== 'off';
    if (crtBtn) crtBtn.setAttribute('aria-pressed', String(crtOn));

    const streamOn = readStreamPreference(localStorage);
    if (streamBtn) streamBtn.setAttribute('aria-pressed', String(streamOn));

    renderLabels();
  };

  root.addEventListener('click', (e) => {
    // `button[data-lang]`, not `[data-lang]`: `I18N.setLanguage` also stamps
    // `data-lang` on `<html>`, so the bare selector would match the document
    // element for EVERY click and swallow the toggles with a no-op.
    const langBtn = e.target.closest?.('button[data-lang]');
    if (langBtn) {
      // Persist: the legacy control did, and a preference that resets on reload
      // is not a preference.
      I18N.setLanguage(langBtn.dataset.lang, true);
      renderLabels();
      return;
    }

    const toggle = e.target.closest?.('[data-toggle]');
    if (toggle) {
      const isCrt = toggle.dataset.toggle === 'crt';

      // Flip the REAL state, read from its source of truth rather than trusting
      // the button label: the DOM attribute for CRT, the persisted preference
      // for the stream. A stray click can therefore never desync the two.
      const current = isCrt
        ? document.documentElement.getAttribute('data-crt') !== 'off'
        : readStreamPreference(localStorage);
      const on = !current;
      toggle.setAttribute('aria-pressed', String(on));

      if (isCrt) {
        document.documentElement.setAttribute('data-crt', on ? 'on' : 'off');
        // `crt_scanline_off` is the OFF flag: '1' means scanlines off. Writing
        // the inverse here would silently reset a returning visitor on reload.
        localStorage.setItem(CRT_KEY, on ? '0' : '1');
      } else {
        writeStreamPreference(localStorage, on);
        window.__effects?.stream?.setEnabled(on);
      }

      renderLabels();
      return;
    }

    if (e.target.closest?.('[data-action="replay-tour"]')) {
      localStorage.removeItem('tour_done');
      // The tour lands in Task 14; until then the handle is absent and the
      // optional call must simply do nothing.
      window.__tour?.start();
    }
  });

  renderState();
}
