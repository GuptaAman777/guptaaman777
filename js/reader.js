document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  const comicId = params.get('comicId');
  const chapterParam = params.get('chapter');

  if (!comicId || !chapterParam) {
    document.querySelector('.container').innerHTML = '<p>Comic ID or chapter number not specified in the URL. Please use ?comicId=1&chapter=1</p>';
    return;
  }

  const chapterTitleEl = document.getElementById('chapter-title');
  const pageContainer = document.getElementById('page-container');
  const chapterInfoEl = document.getElementById('chapterInfo');
  const prevChapterBtn = document.getElementById('prevChapter');
  const nextChapterBtn = document.getElementById('nextChapter');
  const chapterSelect = document.getElementById('chapterSelect');

  let comicData;
  let currentChapterIndex = -1;

  fetch('data/comics.json')
    .then(response => response.json())
    .then(data => {
      const foundComic = data.find(c => c.id === comicId);
      if (!foundComic) {
        document.querySelector('.container').innerHTML = '<p>Comic not found</p>';
        return;
      }

      const sortedChapters = foundComic.chapters.sort((a, b) => a.number - b.number);
      comicData = { ...foundComic, chapters: sortedChapters };

      // Update the Chapter List button link dynamically
      const chapterListBtn = document.querySelector('#chapterListLink');
      if (chapterListBtn) {
        chapterListBtn.href = `details.html?id=${comicId}`;
      }

      comicData.chapters.forEach((chapter, index) => {
        let option = document.createElement('option');
        option.value = chapter.number;
        option.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
        if (String(chapter.number) === chapterParam) {
          option.selected = true;
          currentChapterIndex = index;
        }
        chapterSelect.appendChild(option);
      });

      if (currentChapterIndex === -1) {
        document.querySelector('.container').innerHTML = '<p>Chapter not found</p>';
        return;
      }

      loadChapter();
    })
    .catch(() => {
      document.querySelector('.container').innerHTML = '<p>Error loading chapter details.</p>';
    });

  chapterSelect.addEventListener('change', function () {
    const selectedChapterNumber = this.value;
    window.location.href = `reader.html?comicId=${comicId}&chapter=${selectedChapterNumber}`;
  });

  function loadChapter() {
    const chapter = comicData.chapters[currentChapterIndex];
    chapterTitleEl.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
    chapterInfoEl.textContent = `Chapter ${currentChapterIndex + 1} of ${comicData.chapters.length}`;

    pageContainer.innerHTML = '';
    if (Array.isArray(chapter.pages) && chapter.pages.length) {
      chapter.pages.forEach((pageUrl, index) => {
        const pageWrapper = document.createElement('div');
        pageWrapper.className = 'page-wrapper';

        const pageNumberPlaceholder = document.createElement('div');
        pageNumberPlaceholder.className = 'page-number-placeholder';
        pageNumberPlaceholder.textContent = `Page ${index + 1}`;

        const img = document.createElement('img');
        img.src = pageUrl;
        img.alt = `Page ${index + 1}`;

        img.addEventListener('load', () => {
          pageNumberPlaceholder.style.display = 'none';
          img.style.display = 'block';
        });

        img.style.display = 'none';

        pageWrapper.appendChild(pageNumberPlaceholder);
        pageWrapper.appendChild(img);
        pageContainer.appendChild(pageWrapper);
      });
    } else {
      pageContainer.innerHTML = '<p>No pages available for this chapter.</p>';
    }

    prevChapterBtn.style.display = (currentChapterIndex > 0) ? 'block' : 'none';
    nextChapterBtn.style.display = (currentChapterIndex < comicData.chapters.length - 1) ? 'block' : 'none';
  }

  prevChapterBtn.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
      const prevChapter = comicData.chapters[currentChapterIndex - 1];
      window.location.href = `reader.html?comicId=${comicId}&chapter=${prevChapter.number}`;
    }
  });

  nextChapterBtn.addEventListener('click', () => {
    if (currentChapterIndex < comicData.chapters.length - 1) {
      const nextChapter = comicData.chapters[currentChapterIndex + 1];
      window.location.href = `reader.html?comicId=${comicId}&chapter=${nextChapter.number}`;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' && nextChapterBtn.style.display !== 'none') {
      nextChapterBtn.click();
    } else if (e.key === 'ArrowLeft' && prevChapterBtn.style.display !== 'none') {
      prevChapterBtn.click();
    }
  });
});
