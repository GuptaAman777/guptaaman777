document.addEventListener('DOMContentLoaded', () => {
  loadTeamMembers();
  initTeamMemberModal();
});

function initTeamMemberModal() {
  let modal = document.getElementById('teamMemberModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'teamMemberModal';
    modal.className = 'team-member-modal';
    modal.style.display = 'none';
    document.body.appendChild(modal);

    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTeamMemberModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeTeamMemberModal();
      }
    });
  }
}

async function loadTeamMembers() {
  const teamGrid = document.querySelector('.team-grid');
  if (!teamGrid) return;

  try {
    const response = await fetch('team/index.json');
    if (!response.ok) throw new Error('Failed to load team data index');

    const teamIndex = await response.json();
    const teamFiles = teamIndex?.members || [];
    if (teamFiles.length === 0) {
      teamGrid.innerHTML = '<div class="no-data">No team members found</div>';
      return;
    }

    // Clear any existing team members
    teamGrid.innerHTML = '';

    // Use a Map to deduplicate members by ID (or generated ID from name)
    const membersMap = new Map();
    
    // Load all member data first
    for (const file of teamFiles) {
      try {
        const res = await fetch(`team/${file}`);
        if (!res.ok) continue;
        const memberData = await res.json();
        
        // Generate a consistent ID for each member
        const memberId = memberData.id || generateMemberId(memberData.name);
        
        // Only add the member if it doesn't already exist in our map
        // This ensures deduplication
        if (!membersMap.has(memberId)) {
          memberData.id = memberId;
          membersMap.set(memberId, memberData);
        }
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
      }
    }

    // Separate members by priority
    const priorityMembers = [];
    const otherMembers = [];
    
    // Process each member once
    membersMap.forEach((member) => {
      if (member.priority === true) {
        priorityMembers.push(member);
      } else {
        otherMembers.push(member);
      }
    });

    // Append priority members
    priorityMembers.forEach((member) => {
      teamGrid.appendChild(createTeamMemberElement(member));
    });

    // Add "Show More" button for additional members
    if (otherMembers.length > 0) {
      const showMoreContainer = document.createElement('div');
      showMoreContainer.className = 'show-more-container';
      showMoreContainer.style.gridColumn = '1 / -1';
      showMoreContainer.style.textAlign = 'center';
      showMoreContainer.style.margin = '20px 0';

      const showMoreButton = document.createElement('button');
      showMoreButton.className = 'cta-button';
      showMoreButton.textContent = `Show More (${otherMembers.length})`;
      showMoreButton.addEventListener('click', () => {
        showMoreContainer.remove();
        otherMembers.forEach((member) => {
          teamGrid.appendChild(createTeamMemberElement(member));
        });
      });
      showMoreContainer.appendChild(showMoreButton);
      teamGrid.appendChild(showMoreContainer);
    }
  } catch (error) {
    console.error('Error loading team members:', error);
    teamGrid.innerHTML = '<div class="error">Failed to load team members</div>';
  }
}

function createTeamMemberElement(member) {
  const card = document.createElement('div');
  card.className = 'team-member';
  card.setAttribute('data-member-id', member.id);
  card.setAttribute('tabindex', '0');

  card.addEventListener('click', () => openTeamMemberModal(member));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openTeamMemberModal(member);
    }
  });

  const avatar = document.createElement('div');
  avatar.className = 'member-avatar';
  if (member.avatar) {
    const img = document.createElement('img');
    img.src = member.avatar;
    img.alt = `${member.name}'s avatar`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    img.onerror = () => { avatar.innerHTML = '<i class="fas fa-user-circle"></i>'; };
    avatar.appendChild(img);
  } else {
    const icon = document.createElement('i');
    icon.className = 'fas fa-user-circle';
    avatar.appendChild(icon);
  }

  const info = document.createElement('div');
  info.className = 'member-info';
  const nameElem = document.createElement('h4');
  nameElem.textContent = member.name || 'Team Member';
  const roleElem = document.createElement('p');
  roleElem.textContent = member.role || 'Contributor';
  info.appendChild(nameElem);
  info.appendChild(roleElem);

  card.appendChild(avatar);
  card.appendChild(info);

  if (member.social && Object.keys(member.social).length > 0) {
    const social = document.createElement('div');
    social.className = 'member-social';
    for (const [platform, url] of Object.entries(member.social)) {
      if (!url) continue;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${member.name}'s ${platform}`);
      let icon;
      switch (platform.toLowerCase()) {
        case 'twitter':
        case 'x': icon = 'fa-twitter'; break;
        case 'discord': icon = 'fa-discord'; break;
        case 'instagram': icon = 'fa-instagram'; break;
        case 'github': icon = 'fa-github'; break;
        case 'facebook': icon = 'fa-facebook'; break;
        case 'youtube': icon = 'fa-youtube'; break;
        case 'twitch': icon = 'fa-twitch'; break;
        case 'linkedin': icon = 'fa-linkedin'; break;
        default: icon = 'fa-link';
      }
      link.innerHTML = `<i class="fab ${icon}"></i>`;
      link.addEventListener('click', (e) => e.stopPropagation());
      social.appendChild(link);
    }
    if (social.children.length) info.appendChild(social);
  }

  const hint = document.createElement('div');
  hint.className = 'view-profile-hint';
  hint.innerHTML = '<i class="fas fa-info-circle"></i><span>View profile</span>';
  card.appendChild(hint);

  return card;
}

function openTeamMemberModal(member) {
  const modal = document.getElementById('teamMemberModal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <div class="modal-avatar">
          ${member.avatar 
            ? `<img src="${member.avatar}" alt="${member.name}'s avatar">` 
            : `<i class="fas fa-user-circle"></i>`}
        </div>
        <div class="modal-title">
          <h3>${member.name || 'Team Member'}</h3>
          <h4>${member.role || 'Contributor'}</h4>
          ${member.joinDate ? `<p class="join-date">Member since ${formatDate(member.joinDate)}</p>` : ''}
        </div>
      </div>
      <div class="modal-body">
        ${member.about ? `
          <div class="about-section">
            <h4>About Me</h4>
            <div class="about-content">${formatAboutMeContent(member.about)}</div>
          </div>
        ` : ''}
        ${member.skills && member.skills.length ? `
          <div class="skills-section">
            <h4>Skills</h4>
            <div class="skills-tags">
              ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
        ${member.favorite_comics && member.favorite_comics.length ? `
          <div class="favorites-section">
            <h4>Favorite Comics</h4>
            <div class="favorites-list">
              ${member.favorite_comics.map(comic => `<span class="favorite-item">${comic}</span>`).join('')}
            </div>
          </div>
        ` : ''}
        ${member.projects && member.projects.length ? `
          <div class="projects-section">
            <h4>Projects</h4>
            <ul class="projects-list">
              ${member.projects.map(project => `
                <li class="project-item">
                  <h5>${project.name}</h5>
                  ${project.description ? `<p>${project.description}</p>` : ''}
                  ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project <i class="fas fa-external-link-alt"></i></a>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        ${member.contributions ? `
          <div class="contributions-section">
            <h4>Contributions</h4>
            <div class="contributions-content">${formatAboutMeContent(member.contributions)}</div>
          </div>
        ` : ''}
      </div>
      ${(member.social && Object.keys(member.social).length)
        ? `<div class="modal-footer">
             <div class="modal-social-links">
               ${Object.entries(member.social).map(([platform, url]) => {
                 if (!url) return '';
                 let icon;
                 switch(platform.toLowerCase()) {
                   case 'twitter':
                   case 'x': icon = 'fa-twitter'; break;
                   case 'discord': icon = 'fa-discord'; break;
                   case 'instagram': icon = 'fa-instagram'; break;
                   case 'github': icon = 'fa-github'; break;
                   case 'facebook': icon = 'fa-facebook'; break;
                   case 'youtube': icon = 'fa-youtube'; break;
                   case 'twitch': icon = 'fa-twitch'; break;
                   case 'linkedin': icon = 'fa-linkedin'; break;
                   default: icon = 'fa-link';
                 }
                 return `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${member.name}'s ${platform}">
                           <i class="fab ${icon}"></i> ${platform}
                         </a>`;
               }).join('')}
             </div>
           </div>`
        : ''}
    </div>
  `;

  const closeBtn = modal.querySelector('.close-modal');
  if (closeBtn) closeBtn.addEventListener('click', closeTeamMemberModal);

  modal.style.display = 'flex';
  setTimeout(() => {
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }
  }, 10);

  document.body.style.overflow = 'hidden';
  setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 100);
}

function closeTeamMemberModal() {
  const modal = document.getElementById('teamMemberModal');
  if (!modal) return;

  const content = modal.querySelector('.modal-content');
  if (content) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
  }
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function formatAboutMeContent(text) {
  if (!text) return '';
  if (text.trim().startsWith('<') && text.trim().endsWith('>')) return text;
  return text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function generateMemberId(name) {
  return name ? `member-${name.toLowerCase().replace(/\s+/g, '-')}` : `member-${Math.floor(Math.random() * 10000)}`;
}

function refreshTeamMembers() {
  loadTeamMembers();
}

window.openTeamMemberModal = openTeamMemberModal;
window.closeTeamMemberModal = closeTeamMemberModal;
window.refreshTeamMembers = refreshTeamMembers;