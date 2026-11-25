/* Load Comics & Latest Chapter Releases into Liquid Glass Cards */
(function () {
  async function loadComics() {
    const grid = document.getElementById('comicsCarousel');
    if (!grid) return;
    const esc = window.GlassUI.escapeHtml;

    try {
      const res = await fetch('data/comics.json');
      if (!res.ok) throw new Error('Failed to load comics');
      const comics = await res.json();

      if (!Array.isArray(comics) || comics.length === 0) {
        grid.innerHTML = '<div class="glass-surface loading-state">No comics available yet.</div>';
        return;
      }

      grid.innerHTML = comics.map((comic) => `
        <article class="glass-surface glass-card-hover comic-card" data-id="${esc(comic.id)}">
          <div class="comic-cover-wrap">
            <img src="${esc(comic.coverImage || 'assets/logo.png')}" alt="${esc(comic.title)} Cover" onerror="this.src='assets/logo.png';" />
            <span class="comic-status-badge">${esc(comic.status || 'Ongoing')}</span>
          </div>
          <div class="comic-body">
            <h3>${esc(comic.title)}</h3>
            <p>${esc(comic.author || 'Unknown Author')}</p>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('.comic-card').forEach((card) => {
        card.addEventListener('click', () => {
          window.location.href = `details.html?id=${encodeURIComponent(card.dataset.id)}`;
        });
      });
    } catch (err) {
      console.error(err);
      grid.innerHTML = '<div class="glass-surface loading-state">Unable to load comics right now.</div>';
    }
  }

  async function loadChapters() {
    const list = document.getElementById('chapterList');
    if (!list) return;
    const esc = window.GlassUI.escapeHtml;

    try {
      const res = await fetch('data/chapters.json');
      if (!res.ok) throw new Error('Failed to load chapters');
      const chapters = await res.json();

      if (!Array.isArray(chapters) || chapters.length === 0) {
        list.innerHTML = '<div class="glass-surface loading-state">No chapters available yet.</div>';
        return;
      }

      chapters.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));

      list.innerHTML = chapters.map((ch) => {
        const d = new Date(ch.releaseDate);
        const dateLabel = isNaN(d.getTime())
          ? 'Unknown Date'
          : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        return `
          <article class="glass-surface glass-card-hover chapter-card" data-comic="${esc(ch.comicId)}" data-chapter="${esc(ch.chapterNumber)}">
            <div class="chapter-meta">
              <h4>${esc(ch.comicTitle)}</h4>
              <div class="ch-num">Chapter ${esc(ch.chapterNumber)}</div>
              <div class="ch-date">Released ${esc(dateLabel)}</div>
            </div>
            <img class="chapter-thumb" src="${esc(ch.coverImage || 'assets/logo.png')}" alt="${esc(ch.comicTitle)}" onerror="this.src='assets/logo.png';" />
          </article>
        `;
      }).join('');

      list.querySelectorAll('.chapter-card').forEach((card) => {
        card.addEventListener('click', () => {
          const comicId = encodeURIComponent(card.dataset.comic);
          const chNum = encodeURIComponent(card.dataset.chapter);
          window.location.href = `reader.html?comicId=${comicId}&chapter=${chNum}`;
        });
      });
    } catch (err) {
      console.error(err);
      list.innerHTML = '<div class="glass-surface loading-state">Unable to load chapters right now.</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadComics();
    loadChapters();
  });
})();
