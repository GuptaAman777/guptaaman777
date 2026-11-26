/* Shared Liquid Glass UI Helpers: Theme, Palette Sync, Inline SVG Icons, Modal, Toast, Reveal */
(function () {
  const THEME_KEY = 'ga777-glass-theme';
  const PALETTE_KEY = 'ga777-accent-palette';
  const LEGACY_PALETTE_KEY = 'imagetool_showcase_theme';

  const PALETTES = {
    blue: { accent: '#38bdf8', accent2: '#6366f1', accent3: '#a855f7', soft: 'rgba(56, 189, 248, 0.16)', glow: 'rgba(56, 189, 248, 0.38)' },
    crimson: { accent: '#f43f5e', accent2: '#e53935', accent3: '#fb7185', soft: 'rgba(244, 63, 94, 0.18)', glow: 'rgba(244, 63, 94, 0.38)' },
    oled: { accent: '#e4e4e7', accent2: '#52525b', accent3: '#a1a1aa', soft: 'rgba(228, 228, 231, 0.14)', glow: 'rgba(161, 161, 170, 0.32)' },
    purple: { accent: '#c084fc', accent2: '#9d4edd', accent3: '#ec4899', soft: 'rgba(192, 132, 252, 0.18)', glow: 'rgba(157, 78, 221, 0.42)' },
    emerald: { accent: '#34d399', accent2: '#10b981', accent3: '#06b6d4', soft: 'rgba(16, 185, 129, 0.18)', glow: 'rgba(16, 185, 129, 0.38)' },
    amber: { accent: '#fbbf24', accent2: '#f59e0b', accent3: '#f97316', soft: 'rgba(245, 158, 11, 0.18)', glow: 'rgba(245, 158, 11, 0.38)' }
  };

  /* Crisp 24x24 inline SVG sprite (eliminates ~450 KB external FontAwesome CSS/woff2 download) */
  const ICON_SYMBOLS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>',
    discord: '<path fill="currentColor" stroke="none" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/>',
    bars: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    xmark: '<path d="M18 6L6 18M6 6l12 12"/>',
    microchip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    'wand-magic-sparkles': '<path d="m15 4-1 1 2 2 1-1a1.4 1.4 0 0 0-2-2zM3 20l11-11 2 2L5 22l-2-2zM5 6v3M3.5 7.5h3M18 14v3M16.5 15.5h3M10 3v2M9 4h2"/>',
    'layer-group': '<path d="m12 2 9 4.5-9 4.5-9-4.5L12 2z"/><path d="m3 12 9 4.5 9-4.5M3 17.5 12 22l9-4.5"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    sparkles: '<path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3zM5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9L5 17z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    images: '<rect x="6" y="4" width="15" height="13" rx="2"/><path d="m8 14 3.5-3.5L15 14l2.5-2.5L21 15M3 8v10a2 2 0 0 0 2 2h12"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    broom: '<path d="m19 5-7 7M10 10l4 4-6 7-5-5 7-6zM13 7l4 4"/>',
    'grip-vertical': '<circle cx="9" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    'code-branch': '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    'user-astronaut': '<circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2M5 10h2M17 10h2"/>',
    bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    'paper-plane': '<path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13"/>',
    envelope: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    coins: '<circle cx="9" cy="9" r="6"/><path d="M15.4 10.6A6 6 0 1 1 10.6 15.4"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
    paintbrush: '<path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3zM9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    comments: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'i-cursor': '<path d="M8 4h8M8 20h8M12 4v16"/>',
    'object-group': '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M11 7h4a2 2 0 0 1 2 2v4M13 17H9a2 2 0 0 1-2-2v-4"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    'cloud-arrow-up': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9M16 16l-4-4-4 4"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>',
    'arrow-up-right-from-square': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    spinner: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
    brain: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04z"/>'
  };

  function injectIconSprite() {
    if (document.getElementById('gi-sprite')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'gi-sprite';
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    let defs = '';
    for (const [name, body] of Object.entries(ICON_SYMBOLS)) {
      defs += `<symbol id="gi-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`;
    }
    svg.innerHTML = defs;
    document.body.prepend(svg);
  }

  function icon(name, cls = '') {
    const className = cls ? `gi ${cls}` : 'gi';
    return `<svg class="${className}" aria-hidden="true"><use href="#gi-${escapeHtml(name)}"/></svg>`;
  }

  function hydrateIconPlaceholders() {
    document.querySelectorAll('[data-gi]').forEach((el) => {
      const name = el.dataset.gi;
      if (!name) return;
      const cls = el.dataset.giClass || '';
      el.outerHTML = icon(name, cls);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.innerHTML = theme === 'light' ? icon('moon') : icon('sun');
      btn.title = theme === 'light' ? 'Switch to Dark Glass' : 'Switch to Frost Light Glass';
    }
  }

  function applyPalette(key) {
    const chosen = PALETTES[key] ? key : 'blue';
    const pal = PALETTES[chosen];
    const root = document.documentElement.style;
    root.setProperty('--accent', pal.accent);
    root.setProperty('--accent-2', pal.accent2);
    root.setProperty('--accent-3', pal.accent3);
    root.setProperty('--accent-soft', pal.soft);
    root.setProperty('--accent-glow', pal.glow);
    document.documentElement.setAttribute('data-palette', chosen);

    document.querySelectorAll('.palette-swatch').forEach((s) => {
      s.classList.toggle('active', s.dataset.palette === chosen);
    });

    try {
      localStorage.setItem(PALETTE_KEY, chosen);
      localStorage.setItem(LEGACY_PALETTE_KEY, chosen);
    } catch (_) {}
  }

  function getSavedPalette() {
    try {
      const p = localStorage.getItem(PALETTE_KEY) || localStorage.getItem(LEGACY_PALETTE_KEY);
      return p && PALETTES[p] ? p : 'blue';
    } catch (_) {
      return 'blue';
    }
  }

  function initTheme() {
    let saved = 'dark';
    try {
      saved = localStorage.getItem(THEME_KEY) || 'dark';
    } catch (_) {}
    applyTheme(saved);
    applyPalette(getSavedPalette());

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (_) {}
        applyTheme(next);
      });
    }
  }

  function initNavAndYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });
      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function initSpecularTracking() {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
      return;
    }
    let rafPending = false;
    let lastEvent = null;
    document.addEventListener('pointermove', (e) => {
      lastEvent = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        if (!lastEvent) return;
        const target = lastEvent.target.closest('.glass-surface');
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = ((lastEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((lastEvent.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--mx', `${x.toFixed(1)}%`);
        target.style.setProperty('--my', `${y.toFixed(1)}%`);
      });
    }, { passive: true });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const isLowPower =
      window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)').matches ||
      Boolean(navigator.connection && navigator.connection.saveData);
    if (isLowPower || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function openModal({ eyebrow = '', title = '', bodyHtml = '' }) {
    const backdrop = document.getElementById('glassModalBackdrop');
    if (!backdrop) return;
    document.getElementById('glassModalEyebrow').textContent = eyebrow;
    document.getElementById('glassModalTitle').textContent = title;
    document.getElementById('glassModalBody').innerHTML = bodyHtml;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const backdrop = document.getElementById('glassModalBackdrop');
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModalListeners() {
    const backdrop = document.getElementById('glassModalBackdrop');
    const closeBtn = document.getElementById('glassModalClose');
    if (!backdrop) return;
    closeBtn?.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
    });
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('glassToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
  }

  window.GlassUI = {
    escapeHtml,
    icon,
    applyPalette,
    getSavedPalette,
    openModal,
    closeModal,
    showToast
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectIconSprite();
    hydrateIconPlaceholders();
    initTheme();
    initNavAndYear();
    initSpecularTracking();
    initReveal();
    initModalListeners();
  });
})();
