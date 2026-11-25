/* ImageTool Spotlight & All GitHub Projects Showcase */
(function () {
  const IMAGETOOL_MODULES = {
    converter: {
      title: '1. Image & PSD Converter',
      summary: 'High-speed batch conversion across PNG, JPEG, WEBP, BMP, GIF, TIFF, PDF, and multi-layered Adobe Photoshop (.psd) files with zero cloud dependency.',
      bullets: [
        'Extract individual PSD layers into organized per-file folders alongside the composite.',
        'Multi-page PDF rasterization (page 1 or all pages) at 72, 150, 300, or 600 DPI.',
        'Lanczos / Bicubic batch rescaling by percentage or target bounding box (1080p, 1440p, 4K).',
        'EXIF auto-orientation, ICC profile preservation, and inline AI upscaling.'
      ]
    },
    upscaler: {
      title: '2. Neural AI Upscaler (Vulkan NCNN)',
      summary: 'Hardware-accelerated super-resolution running locally on AMD, NVIDIA, and Intel GPUs via Vulkan with automatic multi-GPU balancing and CPU fallback.',
      bullets: [
        'Four engines: Real-ESRGAN, Real-CUGAN (SE/Pro/NoSE), Waifu2x (CUnet/Upconv), and SRMD.',
        'Scale factors from 1x enhancement up to 8x super-resolution with configurable noise reduction.',
        'VRAM OOM protection via seamless tile-size scheduling (-t 64/100/200/400) for 4K/8K assets.',
        '8-pass Test-Time Augmentation (TTA) ensemble inference for razor-sharp edges.'
      ]
    },
    denoiser: {
      title: '3. Multi-Engine Denoiser',
      summary: 'Isolated deep-learning denoising pipeline to clean scan grain, JPEG compression artifacts, and high-ISO noise without altering native resolution.',
      bullets: [
        'Waifu2x CUnet & Upconv Photo models tailored for illustrations or natural photography.',
        'Real-CUGAN SE smooth anime denoising & SRMD 12-level parametric noise control.',
        'Retains original format or exports directly to lossless PNG / WebP.'
      ]
    },
    stitcher: {
      title: '4. High-Capacity Image Stitcher',
      summary: 'Purpose-built vertical, horizontal, and grid canvas stitcher designed for long webtoon/manhwa strips and multi-panel layouts.',
      bullets: [
        'Vertical, horizontal, and matrix/grid stitching with positive or negative seam overlap.',
        'Auto-dimension matching (Match Smallest, Largest, First, or native size) & alignment.',
        'Automatic safe canvas chunking when exceeding WebP (16,383px) or JPEG (65,535px) limits.'
      ]
    },
    diagnostics: {
      title: '5. Diagnostics, Comparator & Themes',
      summary: 'Interactive before/after inspection, hardware diagnostics, and a customizable multi-threaded PyQt6 studio shell.',
      bullets: [
        'Draggable split-screen Before/After comparator with zoom, pan, and checkerboard alpha.',
        'Live GPU & Vulkan ICD detection with hybrid graphics routing guidance.',
        'Color-coded real-time log streaming with HTML export and instant task cancellation.',
        'Six built-in themes (Blue, Crimson, OLED Black, Cyberpunk Purple, Emerald, Amber).'
      ]
    }
  };

  const PALETTES = {
    blue: { accent: '#38bdf8', accent2: '#6366f1', accent3: '#a855f7', soft: 'rgba(56, 189, 248, 0.16)', glow: 'rgba(56, 189, 248, 0.38)' },
    crimson: { accent: '#f43f5e', accent2: '#e53935', accent3: '#fb7185', soft: 'rgba(244, 63, 94, 0.18)', glow: 'rgba(244, 63, 94, 0.38)' },
    oled: { accent: '#e4e4e7', accent2: '#52525b', accent3: '#a1a1aa', soft: 'rgba(228, 228, 231, 0.14)', glow: 'rgba(161, 161, 170, 0.32)' },
    purple: { accent: '#c084fc', accent2: '#9d4edd', accent3: '#ec4899', soft: 'rgba(192, 132, 252, 0.18)', glow: 'rgba(157, 78, 221, 0.42)' },
    emerald: { accent: '#34d399', accent2: '#10b981', accent3: '#06b6d4', soft: 'rgba(16, 185, 129, 0.18)', glow: 'rgba(16, 185, 129, 0.38)' },
    amber: { accent: '#fbbf24', accent2: '#f59e0b', accent3: '#f97316', soft: 'rgba(245, 158, 11, 0.18)', glow: 'rgba(245, 158, 11, 0.38)' }
  };

  const PROJECTS = [
    {
      repo: 'psd-converter',
      title: 'ImageTool (PSD & Image Converter Suite)',
      category: 'desktop',
      featured: true,
      icon: 'fa-wand-magic-sparkles',
      version: 'v6.0 Latest',
      language: 'Python · PyQt6',
      langColor: '#3572A5',
      starsFallback: 5,
      summary: 'Flagship offline desktop suite for PSD layer extraction, multi-page PDF rasterization, Vulkan NCNN AI super-resolution (Real-ESRGAN, Real-CUGAN, Waifu2x, SRMD), denoising, and safe canvas stitching.',
      tags: ['PyQt6', 'NCNN Vulkan', 'Real-ESRGAN', 'PSD/PDF', 'Multi-GPU'],
      highlights: [
        '4 neural AI engines with VRAM tile-size scheduling & 8-pass TTA',
        'Extracts individual PSD layers & multi-page PDFs up to 600 DPI',
        'Before/After split-screen comparator & 6 live UI themes',
        'Standalone PyInstaller Windows executable with zero cloud dependency'
      ],
      repoUrl: 'https://github.com/GuptaAman777/psd-converter',
      releaseUrl: 'https://github.com/GuptaAman777/psd-converter/releases'
    },
    {
      repo: 'Rename-Tool',
      title: 'File Renaming Tool',
      category: 'utility',
      featured: false,
      icon: 'fa-i-cursor',
      version: 'v2.4 Latest',
      language: 'Python · PyQt6',
      langColor: '#3572A5',
      starsFallback: 0,
      summary: 'Modern dark-mode batch file renamer with regex smart-number sorting, zero-padded digit formatting, custom prefixes/suffixes, folder scanning, and one-click Undo.',
      tags: ['Batch Rename', 'Regex', 'Undo History', 'Windows EXE'],
      highlights: [
        'Automatically detects and sorts files by embedded numbers',
        'Configurable zero-padding (e.g., 001, 002) with prefix & suffix',
        'Instant Undo reverts an entire batch rename safely'
      ],
      repoUrl: 'https://github.com/GuptaAman777/Rename-Tool',
      releaseUrl: 'https://github.com/GuptaAman777/Rename-Tool/releases'
    },
    {
      repo: 'stitched',
      title: 'Image Stitcher',
      category: 'desktop',
      featured: false,
      icon: 'fa-object-group',
      version: 'v1.0',
      language: 'Python · PyQt6',
      langColor: '#3572A5',
      starsFallback: 0,
      summary: 'Multi-threaded PyQt6 desktop utility for batch stitching subdirectories of chapter/comic images into clean output formats with configurable quality.',
      tags: ['PyQt6', 'Pillow', 'QThread', 'Batch Stitching'],
      highlights: [
        'Processes nested chapter folders automatically in background QThreads',
        'Supports JPG, PNG, WEBP, BMP, PDF, and TIFF inputs',
        'Evolved into the high-capacity Stitcher module inside ImageTool'
      ],
      repoUrl: 'https://github.com/GuptaAman777/stitched',
      releaseUrl: 'https://github.com/GuptaAman777/stitched/releases'
    },
    {
      repo: 'guptaaman777',
      title: 'GuptaAman777 Liquid Glass Portfolio',
      category: 'web',
      featured: false,
      icon: 'fa-droplet',
      version: 'Live',
      language: 'HTML · CSS · JS',
      langColor: '#f1e05a',
      starsFallback: 0,
      summary: 'Personal portfolio site built with an Apple-inspired Liquid Glass material system, interactive ImageTool module explorer, Dark/Frost glass toggle, and live GitHub repository hydration.',
      tags: ['Liquid Glass', 'GitHub Pages', 'GitHub API', 'Zero Build'],
      highlights: [
        'Pointer-tracked specular refraction and dynamic ambient mesh backdrop',
        'Live GitHub repository metadata hydration with static fallback',
        'Interactive ImageTool module & 6-palette theme previewer'
      ],
      repoUrl: 'https://github.com/GuptaAman777/guptaaman777',
      releaseUrl: 'https://guptaaman777.me/guptaaman777/'
    },
    {
      repo: 'guptaaman777-imagehosting',
      title: 'Static Media Hosting Repo',
      category: 'web',
      featured: false,
      icon: 'fa-cloud-arrow-up',
      version: 'Active',
      language: 'HTML · Static CDN',
      langColor: '#e34c26',
      starsFallback: 0,
      summary: 'Dedicated static asset repository on GitHub for hosting images, banners, and media assets.',
      tags: ['Media Assets', 'GitHub Raw', 'Static CDN'],
      highlights: [
        'Organized static image directories served via GitHub Raw',
        'Lightweight zero-server asset storage'
      ],
      repoUrl: 'https://github.com/GuptaAman777/guptaaman777-imagehosting',
      releaseUrl: ''
    },
    {
      repo: 'kato-assist',
      title: 'Kato Assist',
      category: 'utility',
      featured: false,
      icon: 'fa-robot',
      version: 'Upcoming',
      language: 'In Progress',
      langColor: '#a855f7',
      starsFallback: 0,
      summary: 'Upcoming assistant project currently initialized on GitHub and reserved for upcoming automation & workflow tooling.',
      tags: ['Upcoming', 'Automation'],
      highlights: [
        'Repository initialized under @GuptaAman777',
        'Stay tuned for initial commits and releases'
      ],
      repoUrl: 'https://github.com/GuptaAman777/kato-assist',
      releaseUrl: ''
    }
  ];

  function renderSpotlightModule(key) {
    const container = document.getElementById('moduleDetailCard');
    if (!container || !IMAGETOOL_MODULES[key]) return;
    const mod = IMAGETOOL_MODULES[key];
    const esc = window.GlassUI.escapeHtml;

    container.innerHTML = `
      <h3>${esc(mod.title)}</h3>
      <p>${esc(mod.summary)}</p>
      <ul class="feature-checklist">
        ${mod.bullets.map((b) => `<li><i class="fas fa-circle-check"></i><span>${esc(b)}</span></li>`).join('')}
      </ul>
    `;
  }

  function initSpotlight() {
    renderSpotlightModule('converter');

    document.querySelectorAll('#imageToolTabs .module-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#imageToolTabs .module-tab').forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        renderSpotlightModule(tab.dataset.module);
      });
    });

    document.querySelectorAll('.palette-swatch').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const pal = PALETTES[swatch.dataset.palette];
        if (!pal) return;
        document.querySelectorAll('.palette-swatch').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
        const root = document.documentElement.style;
        root.setProperty('--accent', pal.accent);
        root.setProperty('--accent-2', pal.accent2);
        root.setProperty('--accent-3', pal.accent3);
        root.setProperty('--accent-soft', pal.soft);
        root.setProperty('--accent-glow', pal.glow);
      });
    });
  }

  let liveRepoMap = {};

  function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    const esc = window.GlassUI.escapeHtml;

    const list = filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

    grid.innerHTML = list.map((proj) => {
      const live = liveRepoMap[proj.repo.toLowerCase()];
      const stars = live ? live.stargazers_count : proj.starsFallback;
      const showFeatured = filter === 'all' && proj.featured;

      return `
        <article class="glass-surface glass-card-hover project-card ${showFeatured ? 'featured' : ''}" data-repo="${esc(proj.repo)}">
          <div>
            <div class="project-card-top">
              <div class="project-icon"><i class="fas ${esc(proj.icon)}"></i></div>
              <div class="project-meta-badges">
                <span class="tag-badge accent">${esc(proj.version)}</span>
                ${stars > 0 ? `<span class="tag-badge"><i class="fas fa-star" style="color:var(--warning)"></i> ${stars}</span>` : ''}
              </div>
            </div>

            <h3 class="project-title">${esc(proj.title)}</h3>
            <p class="project-desc">${esc(proj.summary)}</p>

            <div class="project-highlights">
              ${proj.tags.map((t) => `<span class="tag-badge">${esc(t)}</span>`).join('')}
            </div>
          </div>

          <div class="project-card-foot">
            <span class="project-lang">
              <span class="lang-dot" style="background:${esc(proj.langColor)}"></span>
              ${esc(proj.language)}
            </span>
            <div class="project-actions">
              <button class="glass-btn glass-btn-sm inspect-project-btn" data-repo="${esc(proj.repo)}">
                Details
              </button>
              <a href="${esc(proj.repoUrl)}" target="_blank" rel="noopener noreferrer" class="glass-btn glass-btn-sm" aria-label="Open ${esc(proj.title)} on GitHub">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.inspect-project-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const proj = PROJECTS.find((p) => p.repo === btn.dataset.repo);
        if (proj) openProjectModal(proj);
      });
    });
  }

  function openProjectModal(proj) {
    const esc = window.GlassUI.escapeHtml;
    const live = liveRepoMap[proj.repo.toLowerCase()];
    const updatedText = live?.updated_at
      ? `Updated ${new Date(live.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
      : proj.version;

    const bodyHtml = `
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        <span class="tag-badge accent">${esc(proj.language)}</span>
        <span class="tag-badge">${esc(updatedText)}</span>
        ${proj.tags.map((t) => `<span class="tag-badge">${esc(t)}</span>`).join('')}
      </div>
      <p style="color:var(--text-secondary);margin-bottom:18px;">${esc(proj.summary)}</p>
      <h4 style="font-size:0.95rem;margin-bottom:10px;">Key Highlights</h4>
      <ul class="feature-checklist" style="margin-bottom:22px;">
        ${proj.highlights.map((h) => `<li><i class="fas fa-circle-check"></i><span>${esc(h)}</span></li>`).join('')}
      </ul>
      <div class="hero-cta-row">
        <a href="${esc(proj.repoUrl)}" target="_blank" rel="noopener noreferrer" class="glass-btn glass-btn-primary glass-btn-sm">
          <i class="fab fa-github"></i> View Repository
        </a>
        ${proj.releaseUrl ? `
          <a href="${esc(proj.releaseUrl)}" target="_blank" rel="noopener noreferrer" class="glass-btn glass-btn-sm">
            <i class="fas fa-arrow-up-right-from-square"></i> ${proj.category === 'web' ? 'Open Live' : 'Releases'}
          </a>
        ` : ''}
      </div>
    `;

    window.GlassUI.openModal({
      eyebrow: 'Project Architecture',
      title: proj.title,
      bodyHtml
    });
  }

  async function hydrateFromGitHub() {
    try {
      const res = await fetch('https://api.github.com/users/GuptaAman777/repos?per_page=100');
      if (!res.ok) return;
      const repos = await res.json();
      if (!Array.isArray(repos)) return;

      let publicCount = 0;
      repos.forEach((r) => {
        if (!r.private) publicCount++;
        liveRepoMap[String(r.name).toLowerCase()] = r;
      });

      const statRepos = document.getElementById('statRepos');
      if (statRepos && publicCount > 0) {
        statRepos.textContent = String(publicCount);
      }

      const activeFilter = document.querySelector('#projectFilters .filter-pill.active')?.dataset.filter || 'all';
      renderProjects(activeFilter);
    } catch {
      // Fallback metadata already rendered
    }
  }

  function initProjectFilters() {
    document.querySelectorAll('#projectFilters .filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#projectFilters .filter-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        renderProjects(pill.dataset.filter);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSpotlight();
    initProjectFilters();
    renderProjects('all');
    hydrateFromGitHub();
  });
})();
