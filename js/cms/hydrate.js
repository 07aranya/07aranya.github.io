/**
 * Progressive Hydration for Aranya's Portfolio
 * Enhances static HTML with live Supabase data smoothly.
 * If database is not populated yet or offline, static HTML stays perfectly intact!
 */

(async function () {
  if (!window.sbHelpers) return;

  const pathname = window.location.pathname.toLowerCase();
  const isPersonal = pathname.includes('personal');
  const isProfessional = pathname.includes('professional');
  const isIndex = !isPersonal && !isProfessional;

  try {
    // 1. HYDRATE GLOBAL SITE CONTENT (TEXTS & COPY)
    const content = await window.sbHelpers.getSiteContent();
    if (content && Object.keys(content).length > 0) {
      hydrateSiteContent(content, { isIndex, isPersonal, isProfessional });
    }

    // 2. PAGE SPECIFIC HYDRATION
    if (isIndex) {
      await hydrateIndex();
    } else if (isPersonal) {
      await hydratePersonal(content);
    } else if (isProfessional) {
      await hydrateProfessional(content);
    }
  } catch (err) {
    console.warn('Hydration skipped or partially applied:', err);
  }
})();

// ── 1. GLOBAL TEXT HYDRATOR ─────────────────────────────────
function hydrateSiteContent(c, page) {
  // ── HOME PAGE FIELDS ──
  if (page.isIndex) {
    if (c.hero_greeting) {
      const mt = document.querySelector('.h1 .r1 .inner .mt');
      if (mt) mt.textContent = c.hero_greeting;
    }
    if (c.hero_name) {
      const nh = document.getElementById('nameHover');
      if (nh) nh.textContent = c.hero_name;
    }
    if (c.hero_subtitle) {
      const subEl = document.querySelector('.h-sub span');
      if (subEl) subEl.textContent = c.hero_subtitle;
    }
    if (c.hero_swap_words) {
      const split = c.hero_swap_words.split(',').map(s => s.trim()).filter(Boolean);
      if (split.length > 0) window.swW = split;
    }
    if (c.welcome_scrub_text) {
      const scrubEl = document.getElementById('scrubT');
      if (scrubEl) {
        const words = c.welcome_scrub_text.split(' ');
        scrubEl.innerHTML = words.map((w, i) => {
          const accent = (i < 4) ? ' c-accent' : '';
          return `<span class="sw2${accent}">${w} </span>`;
        }).join('');
      }
    }

    // The Interactive Workbench
    if (c.workbench_speedcube_pb) {
      const pb = document.querySelector('.reflex-pb strong');
      if (pb) pb.textContent = c.workbench_speedcube_pb;
    }
    if (c.workbench_status_location) {
      const p1 = document.querySelector('.wb-status-bar .wb-stat-pill:nth-child(1)');
      if (p1) p1.innerHTML = `<span class="status-dot"></span> ${c.workbench_status_location}`;
    }
    if (c.workbench_status_balance) {
      const p2 = document.querySelector('.wb-status-bar .wb-stat-pill:nth-child(2)');
      if (p2) p2.innerHTML = `<span class="status-dot"></span> ${c.workbench_status_balance}`;
    }

    // About Bento Card 1 (The Builder - fallback)
    if (c.about_card1_kicker) {
      const k = document.querySelector('.about-intro .about-kicker');
      if (k) k.textContent = c.about_card1_kicker;
    }
    if (c.about_card1_heading) {
      const h3 = document.querySelector('.wb-headline, .about-intro h3');
      if (h3) h3.innerHTML = c.about_card1_heading;
    }
    if (c.about_card1_bio) {
      const p = document.querySelector('.wb-lead-p, .about-intro p');
      if (p) p.textContent = c.about_card1_bio;
    }
    if (c.about_card1_location) {
      const loc = document.querySelector('.about-intro .about-location');
      if (loc) loc.innerHTML = `<span class="status-dot"></span> ${c.about_card1_location}`;
    }

    // About Bento Card 2 (My Toolbelt)
    if (c.about_card2_kicker) {
      const k = document.querySelector('.about-tools .about-kicker');
      if (k) k.textContent = c.about_card2_kicker;
    }
    if (c.about_card2_heading) {
      const h = document.querySelector('.about-tools h3');
      if (h) h.textContent = c.about_card2_heading;
    }
    if (c.about_card2_languages) {
      const row = document.querySelector('.about-tools .tool-row:nth-of-type(1) .tool-tags');
      if (row) row.innerHTML = c.about_card2_languages.split(',').map(s => `<span class="tool-tag">${s.trim()}</span>`).join('');
    }
    if (c.about_card2_tools) {
      const row = document.querySelector('.about-tools .tool-row:nth-of-type(2) .tool-tags');
      if (row) row.innerHTML = c.about_card2_tools.split(',').map(s => `<span class="tool-tag">${s.trim()}</span>`).join('');
    }
    if (c.about_card2_hardware) {
      const row = document.querySelector('.about-tools .tool-row:nth-of-type(3) .tool-tags');
      if (row) row.innerHTML = c.about_card2_hardware.split(',').map(s => `<span class="tool-tag">${s.trim()}</span>`).join('');
    }

    // About Bento Card 3 (How I Think)
    if (c.about_card3_kicker) {
      const k = document.querySelector('.about-mind .about-kicker');
      if (k) k.textContent = c.about_card3_kicker;
    }
    if (c.about_card3_heading) {
      const h = document.querySelector('.about-mind h3');
      if (h) h.textContent = c.about_card3_heading;
    }

    // About Bento Card 4 (In The Lab)
    if (c.about_card4_kicker) {
      const k = document.querySelector('.about-lab .about-kicker');
      if (k) k.textContent = c.about_card4_kicker;
    }
    if (c.about_card4_heading) {
      const h = document.querySelector('.about-lab h3');
      if (h) h.textContent = c.about_card4_heading;
    }
  }

  // ── PERSONAL PAGE FIELDS ──
  if (page.isPersonal) {
    if (c.personal_hero_eyebrow) {
      const el = document.querySelector('.p-eyebrow, .hero-eyebrow, .rpg-hero-badge');
      if (el) el.textContent = c.personal_hero_eyebrow;
    }
    if (c.personal_hero_sub) {
      const el = document.querySelector('.p-sub, .hero-sub, .ph-sub');
      if (el) el.textContent = c.personal_hero_sub;
    }
    if (c.personal_stack_desc) {
      const el = document.querySelector('.ps-desc, .photo-stack-desc, .photo-cabinet-desc');
      if (el) el.textContent = c.personal_stack_desc;
    }
    if (c.guitar_model) {
      const el = document.querySelector('.guitar-model, .guitar-model-name');
      if (el) el.textContent = c.guitar_model;
    }
    if (c.guitar_specs) {
      const el = document.querySelector('.guitar-specs, .guitar-specs-tag');
      if (el) el.textContent = c.guitar_specs;
    }
    if (c.guitar_bio) {
      const el = document.querySelector('.guitar-bio, .guitar-bio-text');
      if (el) el.textContent = c.guitar_bio;
    }
  }

  // ── PROFESSIONAL PAGE FIELDS ──
  if (page.isProfessional) {
    if (c.prof_hero_badge) {
      const el = document.querySelector('.badge-pill, .hero-badge, .journal-badge-tag');
      if (el) el.textContent = c.prof_hero_badge;
    }
    if (c.prof_hero_h1) {
      const el = document.querySelector('.p-title-main');
      if (el) el.innerHTML = c.prof_hero_h1;
    }
    if (c.prof_hero_sub) {
      const el = document.querySelector('.prof-sub, .hero-sub, .frontispiece-box p');
      if (el) el.textContent = `"${c.prof_hero_sub.replace(/^"|"$/g, '')}"`;
    }
    if (c.prof_bio_text) {
      const el = document.querySelector('.prof-bio-text, .left-page > p.p-lead-text:last-of-type');
      if (el) el.innerHTML = c.prof_bio_text;
    }
    if (c.prof_resume_url) {
      const el = document.querySelector('.p-action-row a.p-btn-dark');
      if (el) {
        el.href = c.prof_resume_url;
        if (!c.prof_resume_url.endsWith('.pdf')) {
          el.removeAttribute('download');
          el.target = '_blank';
          el.rel = 'noopener';
        }
      }
    }
  }

  // ── FOOTER & SOCIALS (ALL PAGES) ──
  if (c.footer_copyright) {
    const el = document.querySelector('.f-cr, footer .f-copy');
    if (el) el.textContent = c.footer_copyright;
  }
  if (c.social_github) {
    document.querySelectorAll('a[href*="github.com/"]').forEach(a => {
      if (!a.getAttribute('href').includes('repo') && !a.classList.contains('cs-link') && !a.classList.contains('exp-link')) {
        a.href = c.social_github;
      }
    });
  }
  if (c.social_linkedin) {
    document.querySelectorAll('a[href*="linkedin.com/"]').forEach(a => {
      a.href = c.social_linkedin;
    });
  }
}

// ── 2. INDEX PAGE HYDRATOR ──────────────────────────────────
async function hydrateIndex() {
  // Hydrate Interests
  const interests = await window.sbHelpers.getInterests();
  if (interests && interests.length > 0) {
    const phItems = document.getElementById('phItems');
    if (phItems) {
      phItems.innerHTML = interests.map((item, idx) => `
        <div class="ph-item" data-idx="${idx}" data-em="${item.emoji || '✨'}">
          <span class="phi-t">${item.tagline || 'exploring'}</span>
          <span class="phi-n">${item.name}</span>
          <span class="phi-ar">→</span>
        </div>
      `).join('');

      const phEm = document.getElementById('phEm');
      if (phEm) {
        document.querySelectorAll('.ph-item').forEach(el => {
          el.addEventListener('mouseenter', () => {
            phEm.textContent = el.getAttribute('data-em') || '✨';
            phEm.classList.add('on');
          });
          el.addEventListener('mouseleave', () => phEm.classList.remove('on'));
        });
      }
    }
  }

  // Hydrate Projects
  const projects = await window.sbHelpers.getProjects();
  if (projects && projects.length > 0) {
    renderHomeProjects(projects);
  }
}

function renderHomeProjects(projects) {
  const container = document.querySelector('#work .proj-list');
  if (!container) return;

  const homeProjects = projects.filter(p => p.page_visibility === 'both' || p.page_visibility === 'home' || !p.page_visibility);
  if (homeProjects.length === 0) return;

  const featured = homeProjects.filter(p => p.is_featured);
  const others = homeProjects.filter(p => !p.is_featured);

  let html = '';

  // Render Featured Case Studies
  featured.forEach((p, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const tagsHtml = (p.tech_tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
    
    let linksHtml = '';
    if (p.live_url) linksHtml += `<a href="${p.live_url}" target="_blank" rel="noopener" class="cs-link cs-link-primary">live demo ↗</a>`;
    if (p.github_url) linksHtml += `<a href="${p.github_url}" target="_blank" rel="noopener" class="cs-link">source code ↗</a>`;

    let caseStudySections = '';
    if (p.the_idea) caseStudySections += `<div class="cs-block"><div class="cs-label">The idea</div><p>${p.the_idea}</p></div>`;
    if (p.how_i_built_it) caseStudySections += `<div class="cs-block"><div class="cs-label">How I built it</div><p>${p.how_i_built_it}</p></div>`;
    if (p.the_tricky_part) caseStudySections += `<div class="cs-block"><div class="cs-label">The tricky part</div><p>${p.the_tricky_part}</p></div>`;
    if (p.what_i_learned) caseStudySections += `<div class="cs-block"><div class="cs-label">What I learned</div><p>${p.what_i_learned}</p></div>`;

    html += `
      <article class="proj-case-study" data-reveal>
        <div class="cs-header">
          <div class="cs-media">
            ${p.thumbnail_url ? `<img src="${p.thumbnail_url}" alt="${p.title}" class="cs-thumb" loading="lazy">` : ''}
          </div>
          <div class="cs-intro">
            <span class="cs-tagline">${p.category_badge || `${num} / CASE STUDY`}</span>
            <h3 class="cs-title">${p.title}</h3>
            <p class="cs-lead">${p.lead_description || ''}</p>
            <div class="p-tags">${tagsHtml}</div>
            <div class="cs-links">${linksHtml}</div>
          </div>
        </div>
        ${caseStudySections ? `<div class="cs-body-grid">${caseStudySections}</div>` : ''}
      </article>
    `;
  });

  // Render Other Prototypes / Experiments
  if (others.length > 0) {
    html += `
      <div class="exp-subhead" data-reveal>
        <h3>more experiments & prototypes</h3>
        <p>other projects built across web redesigns, embedded iot hardware, and game physics.</p>
      </div>
      <div class="exp-grid">
    `;

    others.forEach((p, idx) => {
      const num = String(featured.length + idx + 1).padStart(2, '0');
      const tagsHtml = (p.tech_tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
      let linksHtml = '';
      if (p.live_url) linksHtml += `<a href="${p.live_url}" target="_blank" rel="noopener" class="exp-link">visit site ↗</a>`;
      if (p.github_url) linksHtml += `<a href="${p.github_url}" target="_blank" rel="noopener" class="exp-link">source code ↗</a>`;

      html += `
        <article class="exp-card" data-reveal>
          ${p.thumbnail_url ? `
            <div class="exp-media">
              <img src="${p.thumbnail_url}" alt="${p.title}" loading="lazy">
            </div>` : ''}
          <div class="exp-content">
            <span class="exp-num">${p.category_badge || `${num} / PROJECT`}</span>
            <h4 class="exp-title">${p.title}</h4>
            <p class="exp-desc">${p.lead_description || ''}</p>
            <div class="p-tags">${tagsHtml}</div>
            <div class="exp-actions">${linksHtml}</div>
          </div>
        </article>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
}

// ── 3. PERSONAL PAGE HYDRATOR ───────────────────────────────
async function hydratePersonal(content) {
  // Games
  const games = await window.sbHelpers.getPersonalItems('game');
  if (games && games.length > 0) {
    const grid = document.querySelector('#gamesG, .games-cartridge-grid, .games-grid, #gamesGrid');
    if (grid) {
      grid.innerHTML = games.map(g => `
        <div class="cartridge-box">
          <div class="cartridge-label">
            ${g.image_url ? `<img src="${g.image_url}" alt="${g.title}" loading="lazy">` : ''}
            <div class="cartridge-meta">
              <h5>${g.title}</h5>
              <span>${g.subtitle || ''}</span>
              <div class="cartridge-rating">${'★'.repeat(g.rating || 5)}${'☆'.repeat(5 - (g.rating || 5))}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Guitar Songs
  if (content && content.guitar_can_play) {
    const canPlayEl = document.querySelector('#gtrQuestPlay, #canPlayList, .songs-can-play');
    if (canPlayEl) {
      canPlayEl.innerHTML = content.guitar_can_play.split(',').map(s => `<li><span>✓</span> ${s.trim()}</li>`).join('');
    }
  }
}

// ── 4. PROFESSIONAL PAGE HYDRATOR ───────────────────────────
async function hydrateProfessional(content) {
  const projects = await window.sbHelpers.getProjects();
  if (projects && projects.length > 0) {
    const profProjects = projects.filter(p => p.page_visibility === 'both' || p.page_visibility === 'professional' || !p.page_visibility);
    // Can optionally hydrate professional cards
  }
}
