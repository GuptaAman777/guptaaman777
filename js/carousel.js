function setupCarouselNavigation() {
  const comicsCarousel = document.getElementById('comicsCarousel');
  if (comicsCarousel) {
    window.addEventListener('load', () => checkCarouselOverflow(comicsCarousel));
    setTimeout(() => checkCarouselOverflow(comicsCarousel), 1000);
  }
}

function checkCarouselOverflow(carousel) {
  if (carousel.scrollWidth > carousel.clientWidth) {
    addCarouselControls(carousel);
  }
}

function addCarouselControls(carousel) {
  if (carousel.parentElement.querySelector('.carousel-buttons')) return;
  
  const scrollAmount = Math.min(300, carousel.clientWidth * 0.8);
  
  const scrollButtons = document.createElement('div');
  scrollButtons.className = 'carousel-buttons';
  
  const leftBtn = document.createElement('button');
  leftBtn.className = 'scroll-btn left';
  leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  leftBtn.setAttribute('aria-label', 'Scroll left');
  leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  const rightBtn = document.createElement('button');
  rightBtn.className = 'scroll-btn right';
  rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  rightBtn.setAttribute('aria-label', 'Scroll right');
  rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  scrollButtons.appendChild(leftBtn);
  scrollButtons.appendChild(rightBtn);
  
  carousel.parentElement.appendChild(scrollButtons);
  
  updateScrollButtonsVisibility(carousel, leftBtn, rightBtn);
  
  carousel.addEventListener('scroll', () => {
    updateScrollButtonsVisibility(carousel, leftBtn, rightBtn);
  });

  // Enable touch swipe functionality
  enableSwipe(carousel);
}

function updateScrollButtonsVisibility(carousel, leftBtn, rightBtn) {
  leftBtn.classList.toggle('disabled', carousel.scrollLeft <= 0);
  
  const atEnd = Math.abs(carousel.scrollLeft + carousel.clientWidth - carousel.scrollWidth) < 1;
  rightBtn.classList.toggle('disabled', atEnd);
}

function enableSwipe(carousel) {
  let startX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = startX - endX;

    const scrollAmount = Math.min(300, carousel.clientWidth * 0.8);

    if (deltaX > 50) carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    if (deltaX < -50) carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}