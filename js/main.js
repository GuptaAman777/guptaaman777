/* Main Page Interactions: Smooth Anchor Scroll & FormSubmit Contact Form */
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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        window.GlassUI.showToast('Please fill out all fields.');
        return;
      }

      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const res = await fetch('https://formsubmit.co/ajax/gamangupta777@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `[GuptaAman777] Message from ${name}`,
            _template: 'table'
          })
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === 'false' || data.success === false) {
          throw new Error(data.message || 'Failed to send message');
        }

        contactForm.reset();
        window.GlassUI.showToast('Message sent! Check your inbox if activating FormSubmit for the first time.');
      } catch (err) {
        console.error('FormSubmit error:', err);
        window.GlassUI.showToast('Could not send right now—please email gamangupta777@gmail.com directly.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }
});
