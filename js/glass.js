/* Shared Liquid Glass UI Helpers: Theme, Refraction Pointer, Modal, Toast, Reveal */
(function () {
  const THEME_KEY = 'ga777-glass-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.innerHTML = theme === 'light'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
      btn.title = theme === 'light' ? 'Switch to Dark Glass' : 'Switch to Frost Light Glass';
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
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
        navMenu.classList.toggle('open');
      });
      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
      });
    }
  }

  function initSpecularTracking() {
    document.addEventListener('pointermove', (e) => {
      const target = e.target.closest('.glass-surface');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--mx', `${x.toFixed(1)}%`);
      target.style.setProperty('--my', `${y.toFixed(1)}%`);
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
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
    openModal,
    closeModal,
    showToast
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavAndYear();
    initSpecularTracking();
    initReveal();
    initModalListeners();
  });
})();
