/* Load Team Members from team/index.json into Liquid Glass Cards & Modal */
(function () {
  async function loadTeamMembers() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    const esc = window.GlassUI.escapeHtml;

    try {
      const idxRes = await fetch('team/index.json');
      if (!idxRes.ok) throw new Error('Failed to load team index');
      const { members = [] } = await idxRes.json();

      const loaded = await Promise.all(
        members.map(async (file) => {
          try {
            const res = await fetch(`team/${file}`);
            return res.ok ? await res.json() : null;
          } catch {
            return null;
          }
        })
      );

      const list = loaded.filter(Boolean);
      if (!list.length) {
        grid.innerHTML = '<div class="glass-surface loading-state">No team members found.</div>';
        return;
      }

      grid.innerHTML = list.map((m, i) => `
        <article class="glass-surface glass-card-hover team-card" data-idx="${i}">
          <img class="team-avatar" src="${esc(m.avatar || 'assets/logo.png')}" alt="${esc(m.name)}" onerror="this.src='assets/logo.png';" />
          <h3 style="font-size:1.08rem;font-weight:700;">${esc(m.name)}</h3>
          <div class="team-role">${esc(m.role || 'Member')}</div>
          <p class="team-about">${esc(m.about || '')}</p>
        </article>
      `).join('');

      grid.querySelectorAll('.team-card').forEach((card) => {
        card.addEventListener('click', () => {
          const member = list[Number(card.dataset.idx)];
          if (!member) return;
          const socialLinks = Object.entries(member.social || {})
            .filter(([, url]) => Boolean(url))
            .map(([platform, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="glass-btn glass-btn-sm">${esc(platform)}</a>`)
            .join('');

          const skills = (member.skills || [])
            .map((s) => `<span class="tag-badge">${esc(s)}</span>`)
            .join('');

          window.GlassUI.openModal({
            eyebrow: member.role || 'Team Member',
            title: member.name,
            bodyHtml: `
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
                <img src="${esc(member.avatar || 'assets/logo.png')}" alt="${esc(member.name)}" class="team-avatar" onerror="this.src='assets/logo.png';" />
                <div>
                  ${member.joinDate ? `<div class="tag-badge">Joined ${esc(member.joinDate)}</div>` : ''}
                  ${member.contributions ? `<p style="color:var(--text-secondary);font-size:0.9rem;margin-top:6px;">${esc(member.contributions)}</p>` : ''}
                </div>
              </div>
              ${member.about ? `<p style="color:var(--text-secondary);margin-bottom:14px;">${esc(member.about)}</p>` : ''}
              ${skills ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">${skills}</div>` : ''}
              ${socialLinks ? `<div class="hero-cta-row">${socialLinks}</div>` : ''}
            `
          });
        });
      });
    } catch (err) {
      console.error(err);
      grid.innerHTML = '<div class="glass-surface loading-state">Unable to load team data.</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', loadTeamMembers);
})();
