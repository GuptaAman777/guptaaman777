async function loadComics() {
  const comicsCarousel = document.getElementById('comicsCarousel');
  if (!comicsCarousel) return;
  
  try {
    const response = await fetch('data/comics.json');
    if (!response.ok) {
      throw new Error('Failed to load comics data');
    }
    
    const comics = await response.json();
    
    comicsCarousel.innerHTML = '';
    
    comics.forEach(comic => {
      const comicCard = document.createElement('div');
      comicCard.className = 'comic-card';
      
      const coverImage = comic.coverImage || 'assets/default-cover.jpg';
      const status = comic.status || 'Unknown';
      const author = comic.author || 'Unknown';
      
      comicCard.innerHTML = `
        <div class="status">${status}</div>
        <img src="${coverImage}" alt="${comic.title} Cover" onerror="this.src='assets/default-cover.jpg';" />
        <h3>${comic.title}</h3>
        <p>${author}</p>
      `;
      
      comicCard.addEventListener('click', () => {
        window.location.href = `details.html?id=${comic.id}`;
      });
      
      comicsCarousel.appendChild(comicCard);
    });
    
    if (comics.length === 0) {
      comicsCarousel.innerHTML = '<div class="no-data">No comics available at the moment.</div>';
    }
    
  } catch (error) {
    const errorMsg = 'Error loading comics:';
    console.error(handleError(errorMsg, error));
    handleFetchError(comicsCarousel, 'Failed to load comics. Please try again later.');
  }
}

async function loadChapters() {
  const chapterList = document.getElementById('chapterList');
  if (!chapterList) return;
  
  try {
    const response = await fetch('data/chapters.json');
    if (!response.ok) {
      throw new Error('Failed to load chapters data');
    }
    
    const chapters = await response.json();
    
    chapters.sort((a, b) => {
      const dateA = new Date(a.releaseDate || 0);
      const dateB = new Date(b.releaseDate || 0);
      
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      
      return dateB - dateA;
    });
    
    chapterList.innerHTML = '';
    
    chapters.forEach(chapter => {
      const chapterCard = document.createElement('div');
      chapterCard.className = 'chapter-card';
      
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
        console.error(handleError('Error formatting chapter date', e));
      }
      
      const coverImage = chapter.coverImage || 'assets/default-cover.jpg';
      
      chapterCard.innerHTML = `
        <div class="chapter-info">
          <h3>${chapter.comicTitle}</h3>
          <p class="chapter-title">${chapter.title || ''}</p>
          <p class="chapter-number">Chapter ${chapter.chapterNumber}</p>
          <p class="chapter-date">Released: ${formattedDate}</p>
          <button class="read-button">Read Now</button>
        </div>
        <div class="chapter-logo">
          <img src="${coverImage}" alt="${chapter.comicTitle} Logo" onerror="this.src='assets/default-cover.jpg';" />
        </div>
      `;
      
      const readButton = chapterCard.querySelector('.read-button');
      if (readButton) {
        readButton.addEventListener('click', (e) => {
          e.stopPropagation();
          
          if (chapter.id) {
            window.location.href = `reader.html?comicId=${chapter.comicId}&chapter=${chapter.chapterNumber}`;
          } else {
            alert(`You are about to read ${chapter.comicTitle} - Chapter ${chapter.chapterNumber}: ${chapter.title || ''}`);
          }
        });
      }
      
      chapterCard.addEventListener('click', () => {
        const readButton = chapterCard.querySelector('.read-button');
        if (readButton) readButton.click();
      });
      
      chapterList.appendChild(chapterCard);
    });
    
    if (chapters.length === 0 || !chapters.filter(c => c).length) {
      chapterList.innerHTML = '<div class="no-data">No chapters available at the moment.</div>';
    }
    
  } catch (error) {
    const errorMsg = 'Error loading chapters:';
    console.error(handleError(errorMsg, error));
    handleFetchError(chapterList, 'Failed to load chapters. Please try again later.');
  }
}

function handleFetchError(element, message) {
  if (element) {
    element.innerHTML = `<div class="error">${message}</div>`;
  }
}