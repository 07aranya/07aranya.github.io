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
      if (a.closest('#work, .cs-card, .proj-card, .p-project-entry, [data-spread-idx="2"], [data-spread-idx="3"]')) return;
      if (a.classList.contains('cs-link') || a.classList.contains('exp-link') || a.classList.contains('proj-link')) return;
      try {
        const parts = new URL(a.href).pathname.split('/').filter(Boolean);
        if (parts.length <= 1) a.href = c.social_github;
      } catch {
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

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function observeReveals(root) {
  if (!root || typeof IntersectionObserver === 'undefined') return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  root.querySelectorAll('[data-reveal]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in');
    } else {
      obs.observe(el);
    }
  });
}

function renderHomeProjects(projects) {
  const featuredContainer = document.querySelector('#work .cs-list');
  const otherContainer = document.querySelector('#work .proj-grid');
  const moreHead = document.querySelector('#work .more-proj-head');
  if (!featuredContainer && !otherContainer) return;

  const homeProjects = projects.filter(p => p.page_visibility === 'both' || p.page_visibility === 'home' || !p.page_visibility);
  if (homeProjects.length === 0) return;

  const featured = homeProjects.filter(p => p.is_featured);
  const others = homeProjects.filter(p => !p.is_featured);

  // Render Featured Case Studies into .cs-list using index.html / home.css markup
  if (featuredContainer) {
    featuredContainer.style.display = featured.length > 0 ? '' : 'none';
    featuredContainer.innerHTML = featured.length > 0 ? featured.map((p, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const tagsHtml = (p.tech_tags || []).map(t => `<span>${escHtml(t)}</span>`).join('');

      let linksHtml = '';
      if (p.live_url) {
        linksHtml += `<a href="${escHtml(p.live_url)}" target="_blank" rel="noopener noreferrer" class="proj-link primary">live demo ↗</a>`;
      }
      if (p.github_url) {
        const cls = p.live_url ? 'secondary' : 'primary';
        const label = p.live_url ? 'source code ↗' : 'view source code ↗';
        linksHtml += `<a href="${escHtml(p.github_url)}" target="_blank" rel="noopener noreferrer" class="proj-link ${cls}">${label}</a>`;
      }
      if (!p.live_url && !p.github_url && /vr\s*horror/i.test(p.title || '')) {
        linksHtml = `
          <a href="javascript:void(0)" onclick="openMediaModal('video')" class="proj-link primary">watch gameplay clip 🎬</a>
          <a href="javascript:void(0)" onclick="openMediaModal('photo')" class="proj-link secondary">view gallery 📸</a>
        `;
      }

      let breakdownHtml = '';
      const cols = [
        ['the idea', p.the_idea],
        ['how i built it', p.how_i_built_it],
        ['the tricky part', p.the_tricky_part],
        ['what i learned', p.what_i_learned]
      ].filter(([, text]) => text && String(text).trim());

      if (cols.length > 0) {
        breakdownHtml = `<div class="cs-breakdown">${cols.map(([label, text]) => `
          <div class="cs-col">
            <h4 class="cs-label">${label}</h4>
            <p>${escHtml(text)}</p>
          </div>
        `).join('')}</div>`;
      }

      return `
        <article class="cs-card" data-reveal>
          <div class="cs-hero">
            <div class="cs-media">
              ${p.thumbnail_url ? `<img src="${escHtml(p.thumbnail_url)}" alt="${escHtml(p.title)}" loading="lazy">` : ''}
            </div>
            <div class="cs-meta">
              <div class="cs-tagline">${escHtml(p.category_badge || `${num} / CASE STUDY`)}</div>
              <h3 class="cs-title">${escHtml(p.title)}</h3>
              <p class="cs-lead">${escHtml(p.lead_description || '')}</p>
              <div class="proj-tech">${tagsHtml}</div>
              <div class="proj-links">${linksHtml}</div>
            </div>
          </div>
          ${breakdownHtml}
        </article>
      `;
    }).join('') : '';
    observeReveals(featuredContainer);
  }

  // Render Other Prototypes into .proj-grid
  if (otherContainer) {
    if (moreHead) moreHead.style.display = others.length > 0 ? '' : 'none';
    otherContainer.style.display = others.length > 0 ? '' : 'none';

    if (others.length > 0) {
      otherContainer.innerHTML = others.map((p, idx) => {
        const num = String(featured.length + idx + 1).padStart(2, '0');
        const tagsHtml = (p.tech_tags || []).map(t => `<span>${escHtml(t)}</span>`).join('');
        let linksHtml = '';
        if (p.live_url) {
          linksHtml += `<a href="${escHtml(p.live_url)}" target="_blank" rel="noopener noreferrer" class="proj-link primary">${idx === 1 ? 'project demo ↗' : 'visit site ↗'}</a>`;
        }
        if (p.github_url) {
          linksHtml += `<a href="${escHtml(p.github_url)}" target="_blank" rel="noopener noreferrer" class="proj-link ${p.live_url ? 'secondary' : 'primary'}">source code ↗</a>`;
        }

        return `
          <div class="proj-card" data-reveal style="transition-delay:${(idx * 0.1).toFixed(1)}s">
            ${p.thumbnail_url ? `
              <div class="proj-card-img">
                <img src="${escHtml(p.thumbnail_url)}" alt="${escHtml(p.title)}" loading="lazy">
              </div>` : ''}
            <div class="proj-card-body">
              <div class="proj-num">${escHtml(p.category_badge || `${num} / PROJECT`)}</div>
              <div class="proj-name">${escHtml(p.title)}</div>
              <p class="proj-desc">${escHtml(p.lead_description || '')}</p>
              <div class="proj-tech">${tagsHtml}</div>
              <div class="proj-links">${linksHtml}</div>
            </div>
          </div>
        `;
      }).join('');
      observeReveals(otherContainer);
    }
  }
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
            ${g.image_url ? `<img src="${escHtml(g.image_url)}" alt="${escHtml(g.title)}" loading="lazy">` : ''}
            <div class="cartridge-meta">
              <h5>${escHtml(g.title)}</h5>
              <span>${escHtml(g.subtitle || '')}</span>
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
      canPlayEl.innerHTML = content.guitar_can_play.split(',').map(s => `<li><span>✓</span> ${escHtml(s.trim())}</li>`).join('');
    }
  }
}

// ── 4. PROFESSIONAL PAGE HYDRATOR ───────────────────────────
function syncJournalActionLink(row, selector, url, label, className) {
  if (!row) return;
  let link = row.querySelector(selector);
  if (url) {
    if (!link) {
      link = document.createElement('a');
      link.className = className;
      link.target = '_blank';
      link.rel = 'noopener';
      row.prepend(link);
    }
    link.href = url;
    if (label && !link.textContent.trim()) link.textContent = label;
    link.style.display = '';
  } else if (link) {
    link.style.display = 'none';
  }
}

async function hydrateProfessional() {
  const projects = await window.sbHelpers.getProjects();
  if (!projects || projects.length === 0) return;

  const profProjects = projects.filter(p => p.page_visibility === 'both' || p.page_visibility === 'professional' || !p.page_visibility);
  if (profProjects.length === 0) return;

  const matched = new Set();

  // Match Spread 2 Left Page (Vernacular Chatbot)
  const spread2Left = document.querySelector('.spread-chapter[data-spread-idx="2"] .left-page');
  const chatbotProj = profProjects.find(p => /vernacular|chatbot/i.test(p.title || '') || /VernacularChatbot/i.test(p.github_url || ''));
  if (spread2Left && chatbotProj) {
    matched.add(chatbotProj);
    const desc = spread2Left.querySelector('p.p-lead-text');
    if (desc && chatbotProj.lead_description) desc.textContent = chatbotProj.lead_description;
    if (Array.isArray(chatbotProj.tech_tags) && chatbotProj.tech_tags.length > 0) {
      const chipList = spread2Left.querySelector('.p-chip-list');
      if (chipList) chipList.innerHTML = chatbotProj.tech_tags.map(t => `<span class="p-chip">${escHtml(t)}</span>`).join('');
    }
    const row = spread2Left.querySelector('.p-action-row');
    syncJournalActionLink(row, 'a.p-btn-dark', chatbotProj.live_url, 'Live Demonstration ↗', 'p-btn-dark');
    syncJournalActionLink(row, 'a.p-btn-outline', chatbotProj.github_url, 'Source Code ↗', 'p-btn-outline');
  }

  // Match Spread 2 Right Page (VR Horror Experience)
  const spread2Right = document.querySelector('.spread-chapter[data-spread-idx="2"] .right-page');
  const vrProj = profProjects.find(p => /vr\s*horror/i.test(p.title || ''));
  if (spread2Right && vrProj) {
    matched.add(vrProj);
    const desc = spread2Right.querySelector('p.p-lead-text');
    if (desc && vrProj.lead_description) desc.textContent = vrProj.lead_description;
    const row = spread2Right.querySelector('.p-action-row');
    if (row) {
      if (vrProj.live_url) syncJournalActionLink(row, 'a[data-cms-live]', vrProj.live_url, 'Live Demo ↗', 'p-btn-outline');
      if (vrProj.github_url) syncJournalActionLink(row, 'a[data-cms-gh]', vrProj.github_url, 'Source Code ↗', 'p-btn-outline');
    }
  }

  // Match Spread 3 secondary invention entries
  const slotMatchers = [
    { match: p => /fruit\s*ninja/i.test(p.title || '') || /python-fruit-ninja/i.test(p.github_url || ''), entryText: /fruit\s*ninja/i },
    { match: p => /asep|haptic/i.test(p.title || '') || /haptic-helmet-nav/i.test(p.github_url || ''), entryText: /asep|haptic/i },
    { match: p => /cbse/i.test(p.title || '') || /CBSE-Website/i.test(p.github_url || ''), entryText: /cbse/i },
    { match: p => /gyro|aem/i.test(p.title || '') || /gyro-ball-controller/i.test(p.github_url || ''), entryText: /gyro|aem/i }
  ];

  const entries = Array.from(document.querySelectorAll('.spread-chapter[data-spread-idx="3"] .p-project-entry'));
  slotMatchers.forEach(({ match, entryText }) => {
    const proj = profProjects.find(match);
    const entry = entries.find(el => entryText.test(el.textContent || ''));
    if (!proj || !entry) return;
    matched.add(proj);

    const titleEl = entry.querySelector('.p-project-title');
    if (titleEl && proj.title) titleEl.textContent = proj.title;

    const bodyEl = entry.querySelector('.p-project-body');
    if (bodyEl && proj.lead_description) bodyEl.textContent = proj.lead_description;

    const ghLink = entry.querySelector('a[href*="github.com"]');
    if (ghLink) {
      if (proj.github_url) {
        ghLink.href = proj.github_url;
        ghLink.style.display = '';
      } else {
        ghLink.style.display = 'none';
      }
    }

    const liveLink = entry.querySelector('a:not([href*="github.com"])');
    if (liveLink) {
      if (proj.live_url) {
        liveLink.href = proj.live_url;
        liveLink.style.display = '';
      } else {
        liveLink.style.display = 'none';
      }
    }
  });

  // Append any extra CMS projects added beyond the 6 built-in journal entries
  const extras = profProjects.filter(p => !matched.has(p));
  const spread3Right = document.querySelector('.spread-chapter[data-spread-idx="3"] .right-page');
  if (spread3Right) {
    spread3Right.querySelectorAll('.p-project-entry[data-cms-extra="true"]').forEach(el => el.remove());
    const foot = spread3Right.querySelector('.page-running-foot');
    extras.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'p-project-entry';
      card.setAttribute('data-cms-extra', 'true');
      card.style.marginTop = '1rem';
      card.innerHTML = `
        <div class="p-project-top">
          <span class="p-project-id">${escHtml(p.category_badge || `APPENDIX ${String(idx + 1).padStart(2, '0')}`)}</span>
          ${p.github_url ? `<a href="${escHtml(p.github_url)}" target="_blank" rel="noopener" class="p-btn-outline" style="padding:2px 8px;font-size:0.68rem">GitHub ↗</a>` : ''}
        </div>
        <h4 class="p-project-title">${escHtml(p.title)}</h4>
        <p class="p-project-body">${escHtml(p.lead_description || '')}</p>
        ${p.live_url ? `<a href="${escHtml(p.live_url)}" target="_blank" rel="noopener" class="p-btn-outline" style="font-size:0.72rem;padding:3px 8px">Live Demo ↗</a>` : ''}
      `;
      if (foot) spread3Right.insertBefore(card, foot);
      else spread3Right.appendChild(card);
    });
  }
}
