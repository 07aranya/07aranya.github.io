/**
 * Supabase Client & API Helper for Aranya's Portfolio
 * Project URL: https://saagqbadytuvugsaejei.supabase.co
 */

const SUPABASE_URL = 'https://saagqbadytuvugsaejei.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWdxYmFkeXR1dnVnc2FlamVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMTAxMDUsImV4cCI6MjEwOTc4NjEwNX0.BicKQwaJq_snmpkWdHnKX4MS5e0wTNQobY5OlUUrjH4';

// Initialize Supabase Client
let sbClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
  sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

window.sb = sbClient;

// ── AUTHENTICATION ──────────────────────────────────────────
async function sbLogin(email, password) {
  if (!sbClient) throw new Error('Supabase client not initialized');
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function sbLogout() {
  if (!sbClient) return;
  const { error } = await sbClient.auth.signOut();
  if (error) throw error;
}

async function sbGetUser() {
  if (!sbClient) return null;
  const { data: { session } } = await sbClient.auth.getSession();
  return session?.user || null;
}

// ── SITE CONTENT (Texts & Copy) ─────────────────────────────
async function sbGetSiteContent() {
  if (!sbClient) return {};
  try {
    const { data, error } = await sbClient
      .from('site_content')
      .select('key, value');
    if (error) {
      console.warn('Supabase fetch site_content notice:', error.message);
      return {};
    }
    const map = {};
    if (data) data.forEach(row => { map[row.key] = row.value; });
    return map;
  } catch (err) {
    console.warn('sbGetSiteContent fallback to local:', err);
    return {};
  }
}

async function sbSetSiteContent(key, value) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('site_content')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
  return data;
}

// ── PROJECTS ────────────────────────────────────────────────
async function sbGetProjects() {
  if (!sbClient) return [];
  try {
    const { data, error } = await sbClient
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .order('id', { ascending: true });
    if (error) {
      console.warn('Supabase fetch projects notice:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('sbGetProjects fallback to local:', err);
    return [];
  }
}

async function sbSaveProject(project) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('projects')
    .upsert(project)
    .select();
  if (error) throw error;
  return data;
}

async function sbDeleteProject(id) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { error } = await sbClient
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── INTERESTS ───────────────────────────────────────────────
async function sbGetInterests() {
  if (!sbClient) return [];
  try {
    const { data, error } = await sbClient
      .from('interests_tags')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

async function sbSaveInterest(interest) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('interests_tags')
    .upsert(interest)
    .select();
  if (error) throw error;
  return data;
}

async function sbDeleteInterest(id) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { error } = await sbClient
    .from('interests_tags')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── PERSONAL ITEMS (Games, Music, Guitar, Wins) ─────────────
async function sbGetPersonalItems(itemType = null) {
  if (!sbClient) return [];
  try {
    let q = sbClient.from('personal_items').select('*');
    if (itemType) q = q.eq('item_type', itemType);
    const { data, error } = await q.order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

async function sbSavePersonalItem(item) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('personal_items')
    .upsert(item)
    .select();
  if (error) throw error;
  return data;
}

async function sbDeletePersonalItem(id) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { error } = await sbClient
    .from('personal_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── TIMELINE ────────────────────────────────────────────────
async function sbGetTimeline() {
  if (!sbClient) return [];
  try {
    const { data, error } = await sbClient
      .from('timeline')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

async function sbSaveTimeline(item) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('timeline')
    .upsert(item)
    .select();
  if (error) throw error;
  return data;
}

async function sbDeleteTimeline(id) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { error } = await sbClient
    .from('timeline')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── GALLERY PHOTOS ──────────────────────────────────────────
async function sbGetGalleryPhotos() {
  if (!sbClient) return [];
  try {
    const { data, error } = await sbClient
      .from('gallery_photos')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

async function sbSaveGalleryPhoto(photo) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { data, error } = await sbClient
    .from('gallery_photos')
    .upsert(photo)
    .select();
  if (error) throw error;
  return data;
}

async function sbDeleteGalleryPhoto(id) {
  if (!sbClient) throw new Error('Supabase not connected');
  const { error } = await sbClient
    .from('gallery_photos')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── STORAGE UPLOAD ──────────────────────────────────────────
async function sbUploadImage(file) {
  if (!sbClient) throw new Error('Supabase not connected');
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await sbClient
    .storage
    .from('portfolio-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data } = sbClient
    .storage
    .from('portfolio-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ── ONE-CLICK SEED / SYNC ALL DEFAULT DATA ──────────────────
async function sbSyncAllDefaultData() {
  if (!sbClient) throw new Error('Supabase client not initialized');
  const defaults = window.SITE_DEFAULT_DATA;
  if (!defaults) throw new Error('Default data dictionary not loaded');

  // 1. Sync site_content (Upsert all key-values)
  const contentEntries = Object.entries(defaults.site_content).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString()
  }));
  const { error: cErr } = await sbClient.from('site_content').upsert(contentEntries, { onConflict: 'key' });
  if (cErr) console.warn('Error syncing site_content:', cErr.message);

  // 2. Sync projects
  if (defaults.projects && defaults.projects.length > 0) {
    for (const proj of defaults.projects) {
      const { data: existing } = await sbClient.from('projects').select('id').eq('title', proj.title);
      if (!existing || existing.length === 0) {
        await sbClient.from('projects').insert(proj);
      }
    }
  }

  // 3. Sync interests
  if (defaults.interests && defaults.interests.length > 0) {
    for (const intItem of defaults.interests) {
      const { data: existing } = await sbClient.from('interests_tags').select('id').eq('name', intItem.name);
      if (!existing || existing.length === 0) {
        await sbClient.from('interests_tags').insert(intItem);
      }
    }
  }

  // 4. Sync personal items (games, songs, wins)
  const allPersonal = [
    ...(defaults.games || []),
    ...(defaults.songs || []),
    ...(defaults.personal_wins || [])
  ];
  for (const item of allPersonal) {
    const { data: existing } = await sbClient
      .from('personal_items')
      .select('id')
      .eq('title', item.title)
      .eq('item_type', item.item_type);
    if (!existing || existing.length === 0) {
      await sbClient.from('personal_items').insert(item);
    }
  }

  return true;
}

// Attach all helpers to window
window.sbHelpers = {
  login: sbLogin,
  logout: sbLogout,
  getUser: sbGetUser,
  getSiteContent: sbGetSiteContent,
  setSiteContent: sbSetSiteContent,
  getProjects: sbGetProjects,
  saveProject: sbSaveProject,
  deleteProject: sbDeleteProject,
  getInterests: sbGetInterests,
  saveInterest: sbSaveInterest,
  deleteInterest: sbDeleteInterest,
  getPersonalItems: sbGetPersonalItems,
  savePersonalItem: sbSavePersonalItem,
  deletePersonalItem: sbDeletePersonalItem,
  getTimeline: sbGetTimeline,
  saveTimeline: sbSaveTimeline,
  deleteTimeline: sbDeleteTimeline,
  getGalleryPhotos: sbGetGalleryPhotos,
  saveGalleryPhoto: sbSaveGalleryPhoto,
  deleteGalleryPhoto: sbDeleteGalleryPhoto,
  uploadImage: sbUploadImage,
  syncAllDefaultData: sbSyncAllDefaultData
};
