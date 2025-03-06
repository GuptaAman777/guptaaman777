async function fetchComicData(comicId) {
  try {
    const response = await fetch('/comics.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch comics data');
    }
    
    const comics = await response.json();
    const comic = comics.find(c => c.id === comicId);
    
    if (!comic) {
      showError('Comic not found');
      return;
    }
    
    renderComicDetails(comic);
    renderChapters(comic);
    updateMetaTags(comic);
    
  } catch (error) {
    const errorMsg = 'Error fetching comic data:';
    console.error(handleError(errorMsg, error));
    showError('Failed to load comic data. Please try again later.');
  }
}

function renderComicDetails(comic) {
  const detailsContent = document.getElementById('detailsContent');
  if (!detailsContent) return;
  
  const genresList = Array.isArray(comic.genres) ? comic.genres.join(', ') : '';
  const coverImg = comic.cover || 'assets/default-cover.jpg';
  const status = comic.status || 'Unknown';
  const author = comic.author || 'Unknown';
  const artist = comic.artist || 'Unknown';
  const releaseYear = comic.releaseYear || 'Unknown';
  const description = comic.description || 'No description available.';
  
  const html = `
    <div class="comic-details">
      <div class="comic-cover">
        <img src="${coverImg}" alt="${comic.title} Cover" onerror="this.src='assets/default-cover.jpg';" />
        <div class="status">${status}</div>
      </div>
      <div class="comic-info">
        <h1>${comic.title}</h1>
        <div class="comic-metadata">
          <p><strong>Author:</strong> ${author}</p>
          <p><strong>Artist:</strong> ${artist}</p>
          <p><strong>Release Year:</strong> ${releaseYear}</p>
          <p><strong>Status:</strong> ${status}</p>
          ${genresList ? `<p><strong>Genres:</strong> ${genresList}</p>` : ''}
        </div>
        <div class="comic-description">
          <h3>Synopsis</h3>
          <p>${description}</p>
        </div>
        <div class="share-links">
          <h3>Share</h3>
          <div class="social-share">
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${comic.title} on Alvenhiem!`)}" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><i class="fab fa-facebook"></i></a>
            <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer" aria-label="Share on Discord"><i class="fab fa-discord"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  detailsContent.innerHTML = html;
}

function renderChapters(comic) {
  const chaptersContent = document.getElementById('chaptersContent');
  if (!chaptersContent) return;
  
  if (!comic.chapters || comic.chapters.length === 0) {
    chaptersContent.innerHTML = '<p class="no-chapters">No chapters available yet.</p>';
    return;
  }
  
  const sortedChapters = [...comic.chapters].sort((a, b) => {
    return parseFloat(b.number) - parseFloat(a.number);
  });
  
  let html = `
    <h2>Chapters</h2>
    <div class="chapters-list">
  `;
  
  sortedChapters.forEach(chapter => {
    let formattedDate = 'Unknown Date';
    try {
      const releaseDate = new Date(chapter.releaseDate);
      if (!isNaN(releaseDate.getTime())) {
        formattedDate = releaseDate.toLocaleDateString('en-US', {
          year: 'numeric', 
          month: 'short', 
          day: 'numeric'
        });
      }
    } catch (e) {
      console.error(handleError('Error formatting date', e));
    }
    
    html += `
      <div class="chapter-item">
        <a href="${chapter.path || '#'}" class="chapter-link">
          <div class="chapter-number">Chapter ${chapter.number}</div>
          <div class="chapter-title">${chapter.title || ''}</div>
          <div class="chapter-date">${formattedDate}</div>
          <div class="read-icon"><i class="fas fa-book-open"></i></div>
        </a>
      </div>
    `;
  });
  
  html += `</div>`;
  
  if (comic.status === "Ongoing") {
    html += `
      <div class="subscription-box">
        <h3>Stay Updated</h3>
        <p>Get notified when new chapters are released!</p>
        <form id="subscribeForm" class="subscribe-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    `;
  }
  
  chaptersContent.innerHTML = html;
  
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const sanitizedEmail = email.replace(/<\/?[^>]+(>|$)/g, "");
      alert(`Thank you for subscribing with ${sanitizedEmail}! You'll receive updates for "${comic.title}".`);
      this.reset();
    });
  }
}

function showError(message) {
  const detailsContent = document.getElementById('detailsContent');
  const chaptersContent = document.getElementById('chaptersContent');
  
  if (detailsContent) {
    detailsContent.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
        <a href="index.html#comics" class="btn-primary">Back to Comics</a>
      </div>
    `;
  }
  
  if (chaptersContent) {
    chaptersContent.innerHTML = '';
  }
}