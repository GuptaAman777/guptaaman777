/* Comic Chapter Reader */
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const comicId = params.get('comicId');
  const chapterParam = params.get('chapter');

  if (!comicId || !chapterParam) {
    document.querySelector('main .container').innerHTML =
      '<div class="glass-surface loading-state">Missing comic or chapter parameter.</div>';
    return;
  }

  const chapterTitleEl = document.getElementById('chapter-title');
  const pageContainer = document.getElementById('page-container');
  const chapterInfoEl = document.getElementById('chapterInfo');
  const prevBtn = document.getElementById('prevChapter');
  const nextBtn = document.getElementById('nextChapter');
  const selectEl = document.getElementById('chapterSelect');
  const listLink = document.getElementById('chapterListLink');

  try {
    const res = await fetch('data/comics.json');
    if (!res.ok) throw new Error('Failed to load comics');
    const data = await res.json();
    const comic = data.find((c) => String(c.id) === String(comicId));

    if (!comic) {
      document.querySelector('main .container').innerHTML =
        '<div class="glass-surface loading-state">Comic not found.</div>';
      return;
    }

    if (listLink) listLink.href = `details.html?id=${encodeURIComponent(comicId)}`;

    const chapters = [...(comic.chapters || [])].sort((a, b) => a.number - b.number);
    let currentIndex = -1;

    chapters.forEach((ch, idx) => {
      const opt = document.createElement('option');
      opt.value = ch.number;
      opt.textContent = `Chapter ${ch.number}${ch.title ? `: ${ch.title}` : ''}`;
      if (String(ch.number) === String(chapterParam)) {
        opt.selected = true;
        currentIndex = idx;
      }
      selectEl.appendChild(opt);
    });

    if (currentIndex === -1) {
      document.querySelector('main .container').innerHTML =
        '<div class="glass-surface loading-state">Chapter not found.</div>';
      return;
    }

    const chapter = chapters[currentIndex];
    document.title = `${comic.title} Ch. ${chapter.number} — GuptaAman777`;
    chapterTitleEl.textContent = `${comic.title} — Chapter ${chapter.number}${chapter.title ? `: ${chapter.title}` : ''}`;
    chapterInfoEl.textContent = `Chapter ${currentIndex + 1} of ${chapters.length}`;

    pageContainer.innerHTML = '';
    if (Array.isArray(chapter.pages) && chapter.pages.length) {
      chapter.pages.forEach((url, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'page-wrapper';

        const placeholder = document.createElement('div');
        placeholder.className = 'page-number-placeholder';
        placeholder.textContent = `Loading Page ${i + 1}...`;

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Page ${i + 1}`;
        img.loading = i < 3 ? 'eager' : 'lazy';
        img.style.display = 'none';
        img.addEventListener('load', () => {
          placeholder.style.display = 'none';
          img.style.display = 'block';
        });

        wrapper.appendChild(placeholder);
        wrapper.appendChild(img);
        pageContainer.appendChild(wrapper);
      });
    } else {
      pageContainer.innerHTML = '<div class="glass-surface loading-state">No pages available for this chapter.</div>';
    }

    selectEl.addEventListener('change', () => {
      window.location.href = `reader.html?comicId=${encodeURIComponent(comicId)}&chapter=${encodeURIComponent(selectEl.value)}`;
    });

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= chapters.length - 1;

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        window.location.href = `reader.html?comicId=${encodeURIComponent(comicId)}&chapter=${encodeURIComponent(chapters[currentIndex - 1].number)}`;
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < chapters.length - 1) {
        window.location.href = `reader.html?comicId=${encodeURIComponent(comicId)}&chapter=${encodeURIComponent(chapters[currentIndex + 1].number)}`;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) prevBtn.click();
      if (e.key === 'ArrowRight' && currentIndex < chapters.length - 1) nextBtn.click();
    });
  } catch (err) {
    console.error(err);
    document.querySelector('main .container').innerHTML =
      '<div class="glass-surface loading-state">Error loading chapter.</div>';
  }
});
