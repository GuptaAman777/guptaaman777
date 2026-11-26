/* Personal Page Interactions: Smooth Scroll & Copy Buttons */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy || '';
      const label = btn.dataset.label || 'Value';
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        window.GlassUI.showToast(`Copied ${label}: ${value}`);
      } catch {
        window.GlassUI.showToast(`${label}: ${value}`);
      }
    });
  });
});
