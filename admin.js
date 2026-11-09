/**
 * Admin Dashboard Controller
 * Full CRUD for all site pages, projects, interests, media, and personal items.
 */

document.addEventListener('DOMContentLoaded', initAdmin);

async function initAdmin() {
  const user = await window.sbHelpers.getUser();
  if (user) {
    showDashboard(user);
  } else {
    showAuthOverlay();
  }

  setupEventListeners();
}

// ── AUTH HANDLING ───────────────────────────────────────────
function showAuthOverlay() {
  document.getElementById('authOverlay').style.display = 'flex';
  document.getElementById('dashboardApp').style.display = 'none';
}

function showDashboard(user) {
  document.getElementById('authOverlay').style.display = 'none';
  document.getElementById('dashboardApp').style.display = 'block';

  // Load all initial data from Supabase
  loadAllData();
}

function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');
    const spinner = document.getElementById('loginSpinner');
    const errBox = document.getElementById('authError');

    errBox.style.display = 'none';
    btn.disabled = true;
    spinner.style.display = 'inline-block';

    try {
      await window.sbHelpers.login(email, pass);
      const user = await window.sbHelpers.getUser();
      showDashboard(user);
      showToast('Logged in successfully!');
    } catch (err) {
      errBox.textContent = err.message || 'Login failed. Please check your credentials.';
      errBox.style.display = 'block';
    } finally {
      btn.disabled = false;
      spinner.style.display = 'none';
    }
  });

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      await window.sbHelpers.logout();
      showAuthOverlay();
      showToast('Logged out');
    } catch (err) {
      console.error('Logout error:', err);
    }
  });

  // Sync All Default Data in 1 Click!
  document.getElementById('syncDefaultsBtn').addEventListener('click', async () => {
    const btn = document.getElementById('syncDefaultsBtn');
    if (!confirm('Sync all existing projects, games, songs, interests, and copy into your database?')) return;
    
    btn.disabled = true;
    btn.textContent = 'Syncing...';
    try {
      await window.sbHelpers.syncAllDefaultData();
      showToast('✨ All existing site data successfully synced to Supabase!');
      loadAllData();
    } catch (err) {
      showToast('Sync error: ' + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = '✨ Sync Site Data';
    }
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Save Buttons
  document.getElementById('saveHomeBtn')?.addEventListener('click', saveHomeContent);
  document.getElementById('savePersonalTextBtn')?.addEventListener('click', savePersonalContent);
  document.getElementById('saveProfBtn')?.addEventListener('click', saveProfessionalContent);
  document.getElementById('saveFooterBtn')?.addEventListener('click', saveFooterContent);

  // Project Modal Actions
  document.getElementById('addProjectBtn')?.addEventListener('click', openAddProjectModal);
  document.getElementById('projectForm')?.addEventListener('submit', handleSaveProject);
  document.getElementById('projThumbFile')?.addEventListener('change', handleThumbFileUpload);

  // Interests Form
  document.getElementById('addInterestForm')?.addEventListener('submit', handleAddInterest);

  // Personal Items Actions
  document.getElementById('addGameBtn')?.addEventListener('click', handleAddGame);
  document.getElementById('addSongBtn')?.addEventListener('click', handleAddSong);
  document.getElementById('addWinBtn')?.addEventListener('click', handleAddWin);

  // Media Dropzone
  setupDropzone();
  setupLocalMediaListeners();
}

function loadAllData() {
  loadSiteContent();
  loadProjects();
  loadInterests();
  loadPersonalItems();
  loadMediaGallery();
  renderLocalMediaGallery();
}

// ── 1. SITE CONTENT (HOME, PERSONAL, PROF, FOOTER) ──────────
async function loadSiteContent() {
  const c = await window.sbHelpers.getSiteContent();
  const d = window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.site_content : {};

  // Helper to fallback to default data if empty
  const getVal = (key) => c[key] !== undefined ? c[key] : (d[key] || '');

  // Home Page
  setVal('txtHeroGreeting', getVal('hero_greeting'));
  setVal('txtHeroName', getVal('hero_name'));
  setVal('txtHeroSub', getVal('hero_subtitle'));
  setVal('txtSwapWords', getVal('hero_swap_words'));
  setVal('txtScrub', getVal('welcome_scrub_text'));

  setVal('txtWbCubePb', getVal('workbench_speedcube_pb'));
  setVal('txtWbLocation', getVal('workbench_status_location'));
  setVal('txtWbBalance', getVal('workbench_status_balance'));

  setVal('txtAboutKicker1', getVal('about_card1_kicker'));
  setVal('txtAboutHeadline1', getVal('about_card1_heading'));
  setVal('txtAboutBio1', getVal('about_card1_bio'));
  setVal('txtAboutLocation1', getVal('about_card1_location'));

  setVal('txtAboutKicker2', getVal('about_card2_kicker'));
  setVal('txtAboutHeading2', getVal('about_card2_heading'));
  setVal('txtAboutLangs2', getVal('about_card2_languages'));
  setVal('txtAboutTools2', getVal('about_card2_tools'));
  setVal('txtAboutHard2', getVal('about_card2_hardware'));

  setVal('txtAboutHeading3', getVal('about_card3_heading'));
  setVal('txtAboutP1Title', getVal('about_card3_p1_title'));
  setVal('txtAboutP1Desc', getVal('about_card3_p1_desc'));
  setVal('txtAboutP2Title', getVal('about_card3_p2_title'));
  setVal('txtAboutP2Desc', getVal('about_card3_p2_desc'));
  setVal('txtAboutP3Title', getVal('about_card3_p3_title'));
  setVal('txtAboutP3Desc', getVal('about_card3_p3_desc'));

  setVal('txtAboutHeading4', getVal('about_card4_heading'));
  setVal('txtAboutLabBuild', getVal('about_card4_building'));
  setVal('txtAboutLabLearn', getVal('about_card4_learning'));
  setVal('txtAboutLabOff', getVal('about_card4_offscreen'));
  setVal('txtAboutLabNote', getVal('about_card4_note'));

  // Personal Page
  setVal('txtPersEyebrow', getVal('personal_hero_eyebrow'));
  setVal('txtPersH1', getVal('personal_hero_h1'));
  setVal('txtPersSub', getVal('personal_hero_sub'));
  setVal('txtPersPills', getVal('personal_hero_pills'));
  setVal('txtPersTicker', getVal('personal_ticker'));

  setVal('txtGuitarModel', getVal('guitar_model'));
  setVal('txtGuitarSpecs', getVal('guitar_specs'));
  setVal('txtGuitarBio', getVal('guitar_bio'));
  setVal('txtGuitarCanPlay', getVal('guitar_can_play'));
  setVal('txtGuitarWannaLearn', getVal('guitar_wanna_learn'));

  setVal('txtStackEyebrow', getVal('personal_stack_eyebrow'));
  setVal('txtStackTitle', getVal('personal_stack_title'));
  setVal('txtStackDesc', getVal('personal_stack_desc'));
  setVal('txtStackBtn', getVal('personal_stack_btn'));
  setVal('txtSpotifyProfile', getVal('personal_spotify_profile'));

  // Professional Page
  setVal('txtProfBadge', getVal('prof_hero_badge'));
  setVal('txtProfH1', getVal('prof_hero_h1'));
  setVal('txtProfSub', getVal('prof_hero_sub'));
  setVal('txtProfBio', getVal('prof_bio_text'));
  setVal('txtProfResume', getVal('prof_resume_url'));
  setVal('txtProfSkills', getVal('prof_skill_chips'));

  setVal('txtStory1Title', getVal('prof_story1_title'));
  setVal('txtStory1Desc', getVal('prof_story1_desc'));
  setVal('txtStory2Title', getVal('prof_story2_title'));
  setVal('txtStory2Desc', getVal('prof_story2_desc'));
  setVal('txtStory3Title', getVal('prof_story3_title'));
  setVal('txtStory3Desc', getVal('prof_story3_desc'));
  setVal('txtStory4Title', getVal('prof_story4_title'));
  setVal('txtStory4Desc', getVal('prof_story4_desc'));

  // Footer & Socials
  setVal('txtFooterBrand', getVal('footer_brand'));
  setVal('txtFooterSub', getVal('footer_subtitle'));
  setVal('txtFooterCopy', getVal('footer_copyright'));
  setVal('txtSocGithub', getVal('social_github'));
  setVal('txtSocLinkedin', getVal('social_linkedin'));
  setVal('txtSocEmail', getVal('social_email'));
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getValInput(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

async function saveHomeContent() {
  const btn = document.getElementById('saveHomeBtn');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const pairs = {
      'hero_greeting': getValInput('txtHeroGreeting'),
      'hero_name': getValInput('txtHeroName'),
      'hero_subtitle': getValInput('txtHeroSub'),
      'hero_swap_words': getValInput('txtSwapWords'),
      'welcome_scrub_text': getValInput('txtScrub'),

      'workbench_speedcube_pb': getValInput('txtWbCubePb'),
      'workbench_status_location': getValInput('txtWbLocation'),
      'workbench_status_balance': getValInput('txtWbBalance'),

      'about_card1_kicker': getValInput('txtAboutKicker1'),
      'about_card1_heading': getValInput('txtAboutHeadline1'),
      'about_card1_bio': getValInput('txtAboutBio1'),
      'about_card1_location': getValInput('txtAboutLocation1'),

      'about_card2_kicker': getValInput('txtAboutKicker2'),
      'about_card2_heading': getValInput('txtAboutHeading2'),
      'about_card2_languages': getValInput('txtAboutLangs2'),
      'about_card2_tools': getValInput('txtAboutTools2'),
      'about_card2_hardware': getValInput('txtAboutHard2'),

      'about_card3_heading': getValInput('txtAboutHeading3'),
      'about_card3_p1_title': getValInput('txtAboutP1Title'),
      'about_card3_p1_desc': getValInput('txtAboutP1Desc'),
      'about_card3_p2_title': getValInput('txtAboutP2Title'),
      'about_card3_p2_desc': getValInput('txtAboutP2Desc'),
      'about_card3_p3_title': getValInput('txtAboutP3Title'),
      'about_card3_p3_desc': getValInput('txtAboutP3Desc'),

      'about_card4_heading': getValInput('txtAboutHeading4'),
      'about_card4_building': getValInput('txtAboutLabBuild'),
      'about_card4_learning': getValInput('txtAboutLabLearn'),
      'about_card4_offscreen': getValInput('txtAboutLabOff'),
      'about_card4_note': getValInput('txtAboutLabNote')
    };

    for (const [k, v] of Object.entries(pairs)) {
      await window.sbHelpers.setSiteContent(k, v);
    }

    showToast('Home content saved successfully!');
  } catch (err) {
    showToast('Save error: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Home Content';
  }
}

async function savePersonalContent() {
  const btn = document.getElementById('savePersonalTextBtn');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const pairs = {
      'personal_hero_eyebrow': getValInput('txtPersEyebrow'),
      'personal_hero_h1': getValInput('txtPersH1'),
      'personal_hero_sub': getValInput('txtPersSub'),
      'personal_hero_pills': getValInput('txtPersPills'),
      'personal_ticker': getValInput('txtPersTicker'),

      'guitar_model': getValInput('txtGuitarModel'),
      'guitar_specs': getValInput('txtGuitarSpecs'),
      'guitar_bio': getValInput('txtGuitarBio'),
      'guitar_can_play': getValInput('txtGuitarCanPlay'),
      'guitar_wanna_learn': getValInput('txtGuitarWannaLearn'),

      'personal_stack_eyebrow': getValInput('txtStackEyebrow'),
      'personal_stack_title': getValInput('txtStackTitle'),
      'personal_stack_desc': getValInput('txtStackDesc'),
      'personal_stack_btn': getValInput('txtStackBtn'),
      'personal_spotify_profile': getValInput('txtSpotifyProfile')
    };

    for (const [k, v] of Object.entries(pairs)) {
      await window.sbHelpers.setSiteContent(k, v);
    }

    showToast('Personal page texts saved!');
  } catch (err) {
    showToast('Save error: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Personal Texts';
  }
}

async function saveProfessionalContent() {
  const btn = document.getElementById('saveProfBtn');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const pairs = {
      'prof_hero_badge': getValInput('txtProfBadge'),
      'prof_hero_h1': getValInput('txtProfH1'),
      'prof_hero_sub': getValInput('txtProfSub'),
      'prof_bio_text': getValInput('txtProfBio'),
      'prof_resume_url': getValInput('txtProfResume'),
      'prof_skill_chips': getValInput('txtProfSkills'),

      'prof_story1_title': getValInput('txtStory1Title'),
      'prof_story1_desc': getValInput('txtStory1Desc'),
      'prof_story2_title': getValInput('txtStory2Title'),
      'prof_story2_desc': getValInput('txtStory2Desc'),
      'prof_story3_title': getValInput('txtStory3Title'),
      'prof_story3_desc': getValInput('txtStory3Desc'),
      'prof_story4_title': getValInput('txtStory4Title'),
      'prof_story4_desc': getValInput('txtStory4Desc')
    };

    for (const [k, v] of Object.entries(pairs)) {
      await window.sbHelpers.setSiteContent(k, v);
    }

    showToast('Professional page saved!');
  } catch (err) {
    showToast('Save error: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Professional';
  }
}

async function saveFooterContent() {
  const btn = document.getElementById('saveFooterBtn');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const pairs = {
      'footer_brand': getValInput('txtFooterBrand'),
      'footer_subtitle': getValInput('txtFooterSub'),
      'footer_copyright': getValInput('txtFooterCopy'),
      'social_github': getValInput('txtSocGithub'),
      'social_linkedin': getValInput('txtSocLinkedin'),
      'social_email': getValInput('txtSocEmail')
    };

    for (const [k, v] of Object.entries(pairs)) {
      await window.sbHelpers.setSiteContent(k, v);
    }

    showToast('Footer & Socials saved!');
  } catch (err) {
    showToast('Save error: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Footer & Socials';
  }
}

// ── 2. PROJECTS ─────────────────────────────────────────────
let allProjects = [];

async function loadProjects() {
  allProjects = await window.sbHelpers.getProjects();
  const list = document.getElementById('projectsList');
  if (!list) return;

  // Fallback to default if empty
  const projs = (allProjects && allProjects.length > 0) 
    ? allProjects 
    : (window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.projects : []);

  if (projs.length === 0) {
    list.innerHTML = `<p style="color:var(--fg2);grid-column:1/-1;">No projects found. Click '+ Add New Project' or '✨ Sync Site Data'.</p>`;
    return;
  }

  list.innerHTML = projs.map(p => `
    <div class="proj-admin-card">
      <div>
        <div class="proj-card-top">
          ${p.thumbnail_url ? `<img src="${p.thumbnail_url}" alt="${p.title}" class="proj-card-thumb">` : `<div class="proj-card-thumb" style="display:flex;align-items:center;justify-content:center;color:var(--fg2)">📁</div>`}
          <div class="proj-card-info">
            <span class="proj-badge-pill">${p.category_badge || 'PROJECT'}</span>
            <h4>${p.title}</h4>
            <div style="font-size:0.75rem;color:var(--fg2)">
              ${p.is_featured ? '⭐ Featured Case Study' : 'Prototype'} · ${p.page_visibility || 'both'}
            </div>
          </div>
        </div>
        <p class="proj-card-desc">${p.lead_description || ''}</p>
      </div>

      <div class="proj-admin-actions">
        <button class="btn btn-sm btn-ghost" onclick="openEditProjectModal(${p.id || `'${p.title}'`})">Edit</button>
        <button class="btn btn-sm btn-danger-ghost" onclick="deleteProject(${p.id || `'${p.title}'`})">Delete</button>
      </div>
    </div>
  `).join('');
}

function openAddProjectModal() {
  document.getElementById('projectForm').reset();
  document.getElementById('projId').value = '';
  document.getElementById('projModalTitle').textContent = 'Add New Project';
  document.getElementById('projectModal').style.display = 'flex';
}

function openEditProjectModal(id) {
  const p = allProjects.find(x => x.id === id || x.title === id) 
    || (window.SITE_DEFAULT_DATA && window.SITE_DEFAULT_DATA.projects.find(x => x.title === id));
  if (!p) return;

  document.getElementById('projId').value = p.id || '';
  document.getElementById('projTitle').value = p.title || '';
  document.getElementById('projBadge').value = p.category_badge || '';
  document.getElementById('projLead').value = p.lead_description || '';
  document.getElementById('projTags').value = (p.tech_tags || []).join(', ');
  document.getElementById('projVisibility').value = p.page_visibility || 'both';
  document.getElementById('projLive').value = p.live_url || '';
  document.getElementById('projGithub').value = p.github_url || '';
  document.getElementById('projThumb').value = p.thumbnail_url || '';
  document.getElementById('csIdea').value = p.the_idea || '';
  document.getElementById('csBuilt').value = p.how_i_built_it || '';
  document.getElementById('csTricky').value = p.the_tricky_part || '';
  document.getElementById('csLearned').value = p.what_i_learned || '';
  document.getElementById('projFeatured').checked = !!p.is_featured;

  document.getElementById('projModalTitle').textContent = 'Edit Project';
  document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

async function handleSaveProject(e) {
  e.preventDefault();
  const btn = document.getElementById('saveProjBtn');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  const idVal = document.getElementById('projId').value;
  const tags = document.getElementById('projTags').value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const projectData = {
    title: document.getElementById('projTitle').value.trim(),
    category_badge: document.getElementById('projBadge').value.trim(),
    lead_description: document.getElementById('projLead').value.trim(),
    tech_tags: tags,
    page_visibility: document.getElementById('projVisibility').value,
    live_url: document.getElementById('projLive').value.trim(),
    github_url: document.getElementById('projGithub').value.trim(),
    thumbnail_url: document.getElementById('projThumb').value.trim(),
    the_idea: document.getElementById('csIdea').value.trim(),
    how_i_built_it: document.getElementById('csBuilt').value.trim(),
    the_tricky_part: document.getElementById('csTricky').value.trim(),
    what_i_learned: document.getElementById('csLearned').value.trim(),
    is_featured: document.getElementById('projFeatured').checked
  };

  if (idVal) projectData.id = parseInt(idVal, 10);

  try {
    await window.sbHelpers.saveProject(projectData);
    closeProjectModal();
    loadProjects();
    showToast('Project saved successfully!');
  } catch (err) {
    showToast('Error saving project: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Project';
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    if (typeof id === 'number') {
      await window.sbHelpers.deleteProject(id);
    }
    loadProjects();
    showToast('Project deleted');
  } catch (err) {
    showToast('Error deleting: ' + err.message, true);
  }
}

async function handleThumbFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  showToast('Uploading image to Supabase...');
  try {
    const url = await window.sbHelpers.uploadImage(file);
    document.getElementById('projThumb').value = url;
    showToast('Thumbnail uploaded!');
  } catch (err) {
    showToast('Upload failed: ' + err.message, true);
  }
}

// ── 3. INTERESTS ────────────────────────────────────────────
async function loadInterests() {
  const interests = await window.sbHelpers.getInterests();
  const list = document.getElementById('interestsList');
  if (!list) return;

  const items = (interests && interests.length > 0)
    ? interests
    : (window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.interests : []);

  if (items.length === 0) {
    list.innerHTML = `<p style="color:var(--fg2);font-size:0.88rem;">No interests found.</p>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="interest-item-row">
      <div class="item-left">
        <span class="item-emoji">${item.emoji || '✨'}</span>
        <div>
          <div class="item-title">${item.name}</div>
          <div class="item-sub">${item.tagline || ''}</div>
        </div>
      </div>
      <button class="btn btn-sm btn-danger-ghost" onclick="deleteInterest(${item.id || `'${item.name}'`})">✕</button>
    </div>
  `).join('');
}

async function handleAddInterest(e) {
  e.preventDefault();
  const name = document.getElementById('intName').value.trim();
  const tagline = document.getElementById('intTagline').value.trim();
  const emoji = document.getElementById('intEmoji').value.trim() || '✨';

  try {
    await window.sbHelpers.saveInterest({ name, tagline, emoji });
    document.getElementById('addInterestForm').reset();
    loadInterests();
    showToast('Interest added!');
  } catch (err) {
    showToast('Error adding interest: ' + err.message, true);
  }
}

async function deleteInterest(id) {
  try {
    if (typeof id === 'number') {
      await window.sbHelpers.deleteInterest(id);
    }
    loadInterests();
    showToast('Interest removed');
  } catch (err) {
    showToast('Error deleting: ' + err.message, true);
  }
}

// ── 4. PERSONAL ITEMS (GAMES, SONGS, WINS) ──────────────────
async function loadPersonalItems() {
  // Games
  const games = await window.sbHelpers.getPersonalItems('game');
  const gamesList = document.getElementById('gamesList');
  const gItems = (games && games.length > 0)
    ? games
    : (window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.games : []);

  if (gamesList) {
    gamesList.innerHTML = gItems.map(g => `
      <div class="personal-item-row">
        <div class="item-left">
          <span class="item-emoji">🎮</span>
          <div>
            <div class="item-title">${g.title}</div>
            <div class="item-sub">${g.subtitle || ''} · ${'★'.repeat(g.rating || 5)}</div>
          </div>
        </div>
        <button class="btn btn-sm btn-danger-ghost" onclick="deletePersonalItem(${g.id || `'${g.title}'`})">✕</button>
      </div>
    `).join('');
  }

  // Songs
  const songs = await window.sbHelpers.getPersonalItems('song');
  const songsList = document.getElementById('songsList');
  const sItems = (songs && songs.length > 0)
    ? songs
    : (window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.songs : []);

  if (songsList) {
    songsList.innerHTML = sItems.map(s => `
      <div class="personal-item-row">
        <div class="item-left">
          <span class="item-emoji">🎵</span>
          <div>
            <div class="item-title">${s.title}</div>
            <div class="item-sub">${s.subtitle || s.spotify_url || ''}</div>
          </div>
        </div>
        <button class="btn btn-sm btn-danger-ghost" onclick="deletePersonalItem(${s.id || `'${s.title}'`})">✕</button>
      </div>
    `).join('');
  }

  // Personal Wins
  const wins = await window.sbHelpers.getPersonalItems('personal_win');
  const winsList = document.getElementById('winsList');
  const wItems = (wins && wins.length > 0)
    ? wins
    : (window.SITE_DEFAULT_DATA ? window.SITE_DEFAULT_DATA.personal_wins : []);

  if (winsList) {
    winsList.innerHTML = wItems.map(w => `
      <div class="personal-item-row">
        <div class="item-left">
          <span class="item-emoji">🏆</span>
          <div>
            <div class="item-title">${w.title} (${w.year || ''})</div>
            <div class="item-sub">${w.subtitle || ''}</div>
          </div>
        </div>
        <button class="btn btn-sm btn-danger-ghost" onclick="deletePersonalItem(${w.id || `'${w.title}'`})">✕</button>
      </div>
    `).join('');
  }
}

async function handleAddGame() {
  const title = prompt('Enter Game Title (e.g. Elden Ring):');
  if (!title) return;
  const genre = prompt('Enter Genre (e.g. Open World / RPG):') || '';
  const ratingStr = prompt('Rating (1 to 5 stars):') || '5';
  const imageUrl = prompt('Cover Image URL (upload in Media tab, or paste path/URL):') || '';

  try {
    await window.sbHelpers.savePersonalItem({
      item_type: 'game',
      title,
      subtitle: genre,
      rating: parseInt(ratingStr, 10) || 5,
      image_url: imageUrl
    });
    loadPersonalItems();
    showToast('Game added!');
  } catch (err) {
    showToast('Error: ' + err.message, true);
  }
}

async function handleAddSong() {
  const title = prompt('Enter Song Title & Artist:');
  if (!title) return;
  const spotify_url = prompt('Spotify Track URL (optional):') || '';

  try {
    await window.sbHelpers.savePersonalItem({
      item_type: 'song',
      title,
      subtitle: spotify_url,
      spotify_url
    });
    loadPersonalItems();
    showToast('Track added!');
  } catch (err) {
    showToast('Error: ' + err.message, true);
  }
}

async function handleAddWin() {
  const title = prompt('Achievement / Win Title:');
  if (!title) return;
  const year = prompt('Year (e.g. 2026):') || '';
  const desc = prompt('Short description:') || '';

  try {
    await window.sbHelpers.savePersonalItem({
      item_type: 'personal_win',
      title,
      subtitle: desc,
      year
    });
    loadPersonalItems();
    showToast('Personal win added!');
  } catch (err) {
    showToast('Error: ' + err.message, true);
  }
}

async function deletePersonalItem(id) {
  try {
    if (typeof id === 'number') {
      await window.sbHelpers.deletePersonalItem(id);
    }
    loadPersonalItems();
    showToast('Item removed');
  } catch (err) {
    showToast('Error: ' + err.message, true);
  }
}

// ── 5. MEDIA DROPZONE ───────────────────────────────────────
function setupDropzone() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('mediaFileInput');
  const progress = document.getElementById('uploadProgress');

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      uploadFile(fileInput.files[0]);
    }
  });

  async function uploadFile(file) {
    progress.style.display = 'flex';
    try {
      const publicUrl = await window.sbHelpers.uploadImage(file);
      await window.sbHelpers.saveGalleryPhoto({ image_url: publicUrl, caption: file.name });
      showToast('Uploaded image successfully!');
      loadMediaGallery();
    } catch (err) {
      showToast('Upload error: ' + err.message, true);
    } finally {
      progress.style.display = 'none';
      fileInput.value = '';
    }
  }
}

async function loadMediaGallery() {
  const photos = await window.sbHelpers.getGalleryPhotos();
  const gallery = document.getElementById('mediaGallery');
  if (!gallery) return;

  if (photos.length === 0) {
    gallery.innerHTML = `<p style="color:var(--fg2);grid-column:1/-1;">No uploaded photos yet. Drop photos above!</p>`;
    return;
  }

  gallery.innerHTML = photos.map(p => `
    <div class="media-thumb-card">
      <img src="${p.image_url}" alt="${p.caption || 'Photo'}" loading="lazy">
      <div class="media-actions-bar">
        <button type="button" class="media-copy-btn" title="Copy Image URL" onclick="copyImageUrl('${p.image_url}')">📋 Copy</button>
        <button type="button" class="media-del-btn" title="Delete" onclick="deleteMedia(${p.id})">✕</button>
      </div>
    </div>
  `).join('');
}

function copyImageUrl(url) {
  navigator.clipboard.writeText(url);
  showToast('Copied image URL to clipboard!');
}

async function deleteMedia(id) {
  try {
    await window.sbHelpers.deleteGalleryPhoto(id);
    loadMediaGallery();
    showToast('Photo removed from gallery');
  } catch (err) {
    showToast('Error deleting: ' + err.message, true);
  }
}

// ── 6. LOCAL MEDIA BROWSER (/images/) ───────────────────────
let currentLocalCategory = 'all';
let currentLocalSearch = '';

function setupLocalMediaListeners() {
  const filterContainer = document.getElementById('localMediaFilters');
  if (filterContainer) {
    filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        filterContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLocalCategory = btn.getAttribute('data-cat') || 'all';
        renderLocalMediaGallery();
      });
    });
  }

  const searchInput = document.getElementById('localMediaSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentLocalSearch = e.target.value.toLowerCase().trim();
      renderLocalMediaGallery();
    });
  }
}

function renderLocalMediaGallery() {
  const container = document.getElementById('localMediaGallery');
  if (!container) return;

  const allImages = (window.SITE_DEFAULT_DATA && window.SITE_DEFAULT_DATA.local_images) || [];
  if (allImages.length === 0) {
    container.innerHTML = `<p style="color:var(--fg2);grid-column:1/-1;">No local images found in default dataset.</p>`;
    return;
  }

  const filtered = allImages.filter(img => {
    const matchCat = (currentLocalCategory === 'all') || (img.category === currentLocalCategory);
    const matchSearch = !currentLocalSearch || img.name.toLowerCase().includes(currentLocalSearch) || img.path.toLowerCase().includes(currentLocalSearch);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:var(--fg2);grid-column:1/-1;">No images matching filter.</p>`;
    return;
  }

  container.innerHTML = filtered.map(img => `
    <div class="local-media-card" title="${img.path}">
      <img src="${img.path}" alt="${img.name}" class="local-media-thumb" loading="lazy">
      <div class="local-media-info">
        <span class="local-media-name">${img.name}</span>
        <button type="button" class="local-media-copy" onclick="copyImageUrl('${img.path}')">📋 Copy Path</button>
      </div>
    </div>
  `).join('');
}

// ── TOAST NOTIFICATIONS ─────────────────────────────────────
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.borderLeftColor = isError ? 'var(--coral)' : 'var(--lime)';
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// Expose modal/delete functions globally
window.openAddProjectModal = openAddProjectModal;
window.openEditProjectModal = openEditProjectModal;
window.closeProjectModal = closeProjectModal;
window.deleteProject = deleteProject;
window.deleteInterest = deleteInterest;
window.deletePersonalItem = deletePersonalItem;
window.deleteMedia = deleteMedia;
window.copyImageUrl = copyImageUrl;
