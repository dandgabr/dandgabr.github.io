// Runs before first paint. Classic script, not a module: modules are
// always deferred and would let the CRT overlay paint before we can
// suppress it, which is the flash this file exists to prevent.
(function () {
  try {
    var root = document.documentElement;

    // Locked decision: this project is dark only; the light theme is being
    // removed. Set the attribute unconditionally, before first paint, so the
    // legacy light-preference media block is inert during the pre-paint window
    // and the CRT-off token guard behaves as designed. No detection: no
    // localStorage, no matchMedia, no light/dark branch — just dark.
    root.setAttribute('data-theme', 'dark');

    // Legacy builds stored 'true'/'false'; current builds store '1'/'0'.
    // Accept both so a returning visitor who had the overlay off keeps it
    // off instead of being silently reset to on.
    var crtPref = localStorage.getItem('crt_scanline_off');
    var crtOff = crtPref === '1' || crtPref === 'true';
    root.setAttribute('data-crt', crtOff ? 'off' : 'on');

    // The background stream was removed, so its preference is orphaned. Drop it
    // once here rather than leaving dead state in returning visitors' storage.
    try { localStorage.removeItem('stream_preference'); } catch (e) {}

    var saved = localStorage.getItem('lang_preference');
    var lang = 'en';
    if (saved === 'pt-br' || saved === 'es' || saved === 'en') {
      lang = saved;
    } else {
      var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (nav.indexOf('pt') === 0) lang = 'pt-br';
      else if (nav.indexOf('es') === 0) lang = 'es';
    }
    root.setAttribute('lang', lang === 'pt-br' ? 'pt-BR' : lang);
    root.setAttribute('data-lang', lang);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0055AA');
  } catch (e) {}
})();
