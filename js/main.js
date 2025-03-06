document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function() {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    
    document.querySelectorAll('#navMenu a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
  
  // Initialize page-specific elements
  if (document.getElementById('comicsCarousel')) {
    loadComics();
  }
  
  if (document.getElementById('chapterList')) {
    loadChapters();
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    initContactForm(contactForm);
  }
  
  setupCarouselNavigation();
  
  // Check for comic detail page
  const urlParams = new URLSearchParams(window.location.search);
  const comicId = urlParams.get('id');
  
  if (comicId && (document.getElementById('detailsContent') || document.getElementById('chaptersContent'))) {
    fetchComicData(comicId);
    setupMetaTags(comicId);
  }
});

function initContactForm(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
      alert('Please fill out all fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    const sanitizedName = name.replace(/<\/?[^>]+(>|$)/g, "");
    const sanitizedEmail = email.replace(/<\/?[^>]+(>|$)/g, "");
    
    alert(`Thank you ${sanitizedName}! Your message has been sent. We'll get back to you at ${sanitizedEmail} soon.`);
    
    contactForm.reset();
  });
}

// Custom error handler that logs full error details to console
function handleError(errorMessage, error) {
  console.error('========== ERROR DETAILS START ==========');
  console.error('Message:', errorMessage);
  console.error('Error object:', error);
  console.error('Stack trace:', error?.stack);
  console.error('========== ERROR DETAILS END ==========');
  return errorMessage;
}