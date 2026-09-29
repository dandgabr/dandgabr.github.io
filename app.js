/**
 * ============================================================================
 * TERMINAL ENGINE & INTERACTIVE CORE - DANIEL GONÇALVES ARAUJO (@dandgabr)
 * Pure Native ES6+ | Zero Dependencies | High-Assurance Architecture
 *
 * Transitional module during Phase 3: it still owns the Projects modal engine
 * and the HUD controls, both of which later tasks (T11 projects.js, T13
 * prefs.js) replace. The bootstrap that used to live at the bottom of this file
 * now lives in `main.js`, which imports the two classes below. Neither is
 * deleted in this task so the branch keeps working at every phase boundary.
 * ============================================================================
 */

import { I18N } from './i18n.js';
import { getProjectData } from './projects-data.js';

/* ==========================================================================
   MODULE 4: Projects Filter & Modal Inspector
   ========================================================================== */
export class ProjectsEngine {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.modal = document.getElementById('project-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalDismissBtn = document.getElementById('modal-dismiss-btn');

    this.initFilters();
    this.initModal();
  }

  initFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');
        this.applyFilter(filter);
      });
    });
  }

  applyFilter(filter) {
    this.projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.split(/\s+/).includes(filter)) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  initModal() {
    if (!this.modal) return;

    // Handle inspect buttons
    document.querySelectorAll('.inspect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project');
        this.openModal(projId);
      });
    });

    // Close buttons
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modalDismissBtn) {
      this.modalDismissBtn.addEventListener('click', () => this.closeModal());
    }

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close on Escape
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  openModal(projId) {
    const data = getProjectData(projId, I18N.currentLang);
    if (!data) return;

    document.getElementById('modal-terminal-title').textContent = `${data.title}.sys // architecture_telemetry.log`;
    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-desc').textContent = `${data.subtitle}. ${data.desc}`;
    document.getElementById('modal-project-tag').textContent = data.tag;
    document.getElementById('modal-project-status').textContent = data.status;
    document.getElementById('modal-project-details').textContent = data.details;

    const stackContainer = document.getElementById('modal-project-stack');
    stackContainer.innerHTML = '';
    data.stack.forEach(item => {
      const span = document.createElement('span');
      span.className = 'skill-pill';
      span.textContent = item;
      stackContainer.appendChild(span);
    });

    const repoLink = document.getElementById('modal-repo-link');
    repoLink.href = data.repo;

    if (typeof this.modal.showModal === 'function') {
      this.modal.showModal();
    } else {
      this.modal.setAttribute('open', '');
    }
  }

  closeModal() {
    if (typeof this.modal.close === 'function') {
      this.modal.close();
    } else {
      this.modal.removeAttribute('open');
    }
  }
}

/* ==========================================================================
   MODULE 5: HUD System Controls & Navigation
   ========================================================================== */
export class HUDManager {
  constructor() {
    this.langBtn = document.getElementById('toggle-lang');
    this.langVal = document.getElementById('lang-val');
    this.themeBtn = document.getElementById('toggle-theme');
    this.themeVal = document.getElementById('theme-val');
    this.crtBtn = document.getElementById('toggle-crt');
    this.rainBtn = document.getElementById('toggle-rain');
    this.menuBtn = document.getElementById('mobile-menu-btn');
    this.navLinks = document.getElementById('nav-links');

    this.initLangToggle();
    this.initThemeToggle();
    this.initCRT();
    this.initStreamToggle();
    this.initMobileMenu();
    this.initActiveScrollSpy();
  }

  initLangToggle() {
    // Determine initial language
    const initialLang = I18N.detectLanguage();
    I18N.setLanguage(initialLang, false);

    if (!this.langBtn) return;
    const langCycle = ['en', 'pt-br', 'es'];

    this.langBtn.addEventListener('click', () => {
      const current = I18N.currentLang || 'en';
      const currentIndex = langCycle.indexOf(current);
      const nextLang = langCycle[(currentIndex + 1) % langCycle.length];
      I18N.setLanguage(nextLang, true);
    });
  }

  initThemeToggle() {
    if (!this.themeBtn) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const getSystemTheme = () => (mediaQuery.matches ? 'light' : 'dark');
    const savedTheme = localStorage.getItem('theme_preference');

    const applyTheme = (theme, persist = false) => {
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (this.themeVal) this.themeVal.textContent = 'LIGHT';
        this.themeBtn.setAttribute('aria-pressed', 'true');
        if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (this.themeVal) this.themeVal.textContent = 'DARK';
        this.themeBtn.setAttribute('aria-pressed', 'false');
        if (metaTheme) metaTheme.setAttribute('content', '#061109');
      }

      if (persist) {
        localStorage.setItem('theme_preference', theme);
      }

      if (window.__effects && typeof window.__effects.stream.setTheme === 'function') {
        window.__effects.stream.setTheme(theme);
      }
    };

    // Determine initial theme: saved preference takes precedence, otherwise system theme
    const initialTheme = savedTheme || getSystemTheme();
    applyTheme(initialTheme, false);

    // Listen for system theme changes if user hasn't explicitly set a preference
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme_preference')) {
        applyTheme(e.matches ? 'light' : 'dark', false);
      }
    });

    // Toggle theme on button click
    this.themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme, true);
    });
  }

  initCRT() {
    if (!this.crtBtn) return;

    const applyCrt = (off) => {
      document.documentElement.setAttribute('data-crt', off ? 'off' : 'on');
      this.crtBtn.querySelector('.btn-val').textContent = off ? 'OFF' : 'ON';
      this.crtBtn.setAttribute('aria-pressed', (!off).toString());
    };

    // theme-init.js already set data-crt pre-paint from the stored preference,
    // so the attribute is the single source of truth here.
    if (document.documentElement.getAttribute('data-crt') === 'off') {
      applyCrt(true);
    }

    this.crtBtn.addEventListener('click', () => {
      const off = document.documentElement.getAttribute('data-crt') !== 'off';
      applyCrt(off);
      localStorage.setItem('crt_scanline_off', off ? '1' : '0');
    });
  }

  initStreamToggle() {
    if (!this.rainBtn) return;

    // Reflect the live state without ever writing the preference here: the
    // single write path lives in effects.js. The button is a view of it.
    const applyState = (on) => {
      this.rainBtn.querySelector('.btn-val').textContent = on ? 'RUN' : 'PAUSED';
      this.rainBtn.setAttribute('aria-pressed', on.toString());
    };
    applyState(Boolean(window.__effects && window.__effects.stream && window.__effects.stream.isRunning));

    this.rainBtn.addEventListener('click', () => {
      const on = flipStreamPreference(localStorage);
      applyState(on);
    });
  }

  initMobileMenu() {
    if (!this.menuBtn || !this.navLinks) return;
    this.menuBtn.addEventListener('click', () => {
      const expanded = this.navLinks.classList.toggle('mobile-open');
      this.menuBtn.setAttribute('aria-expanded', expanded.toString());
    });

    // Close menu when clicking any nav item
    this.navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.navLinks.classList.remove('mobile-open');
        this.menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initActiveScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    if (!sections.length || !navItems.length) return;

    const setActive = (id) => {
      if (!id) return;
      navItems.forEach(item => {
        if (item.getAttribute('href') === `#${id}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('id'));
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

      sections.forEach(sec => observer.observe(sec));
    } else {
      window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = sec.getAttribute('id');
          }
        });
        setActive(current);
      }, { passive: true });
    }
  }
}
