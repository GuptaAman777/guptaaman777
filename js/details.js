/* Comic Details Page Loader */
document.addEventListener('DOMContentLoaded', async () => {
  const esc = window.GlassUI.escapeHtml;
  const comicId = new URLSearchParams(window.location.search).get('id');

  if (!comicId) {
    document.querySelector('main .container').innerHTML =
      '<div class="glass-surface loading-state">No comic specified. <a href="index.html#comics" style="color:var(--accent)">Return home</a></div>';
    return;
  }

  try {
    const res = await fetch('data/comics.json');
    if (!res.ok) throw new Error('Failed to fetch comics');
    const data = await res.json();
    const comic = data.find((c) => String(c.id) === String(comicId));

    if (!comic) {
      document.querySelector('main .container').innerHTML =
        '<div class="glass-surface loading-state">Comic not found.</div>';
      return;
    }

    document.title = `${comic.title} — GuptaAman777`;
    document.getElementById('comic-title').textContent = comic.title;
    document.getElementById('comic-status').textContent = comic.status || 'Ongoing';

    const cover = document.getElementById('cover-image');
    cover.src = comic.coverImage || 'assets/logo.png';
    cover.alt = `${comic.title} cover`;

    document.getElementById('comic-genres').innerHTML = (comic.genres || [])
      .map((g) => `<span class="tag-badge">${esc(g)}</span>`)
      .join('');

    document.getElementById('comic-info').innerHTML = `
      <div class="fact-box"><span>Author</span><strong>${esc(comic.author || 'Unknown')}</strong></div>
      <div class="fact-box"><span>Artist</span><strong>${esc(comic.artist || 'Unknown')}</strong></div>
      <div class="fact-box"><span>Release Year</span><strong>${esc(comic.releaseYear || '—')}</strong></div>
      <div class="fact-box"><span>Chapters</span><strong>${(comic.chapters || []).length}</strong></div>
    `;

    document.getElementById('comic-description').textContent = comic.description || '';

    const chapters = [...(comic.chapters || [])].sort((a, b) => b.number - a.number);
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.max(1, Math.ceil(chapters.length / itemsPerPage));

    function renderChapters() {
      const list = document.getElementById('chapterList');
      const slice = chapters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

      if (!slice.length) {
        list.innerHTML = '<div class="loading-state">No chapters available yet.</div>';
      } else {
        list.innerHTML = slice.map((ch) => `
          <div class="glass-surface glass-card-hover details-chapter-row" data-chapter="${esc(ch.number)}">
            <div>
              <strong>Chapter ${esc(ch.number)}${ch.title ? `: ${esc(ch.title)}` : ''}</strong>
              <div style="font-size:0.82rem;color:var(--text-muted);margin-top:3px;">Released ${esc(ch.releaseDate || 'Unknown')}</div>
            </div>
            <span class="glass-btn glass-btn-sm glass-btn-primary">Read</span>
          </div>
        `).join('');

        list.querySelectorAll('.details-chapter-row').forEach((row) => {
          row.addEventListener('click', () => {
            window.location.href = `reader.html?comicId=${encodeURIComponent(comicId)}&chapter=${encodeURIComponent(row.dataset.chapter)}`;
          });
        });
      }

      document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = currentPage === totalPages;
    }

    renderChapters();

    document.getElementById('prevPage').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderChapters();
      }
    });
    document.getElementById('nextPage').addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderChapters();
      }
    });
  } catch (err) {
    console.error(err);
    document.querySelector('main .container').innerHTML =
      '<div class="glass-surface loading-state">Error loading comic details.</div>';
  }
});
