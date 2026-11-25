/* Main Page Interactions: Smooth Anchor Scroll & Contact Form */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        window.GlassUI.showToast('Please fill out all fields.');
        return;
      }

      const subject = encodeURIComponent(`[GuptaAman777] Message from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
      window.location.href = `mailto:gamangupta777@gmail.com?subject=${subject}&body=${body}`;
      window.GlassUI.showToast(`Opening email draft for ${name}...`);
      contactForm.reset();
    });
  }
});
