/**
 * ROSHANI PUBLIC SCHOOL — SUPABASE CLIENT & API LAYER
 * Handles public data fetching, form submissions, and authenticated admin operations.
 */

(function () {
  const SUPABASE_URL = 'https://kgbdnafhlkchkawsucbl.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnYmRuYWZobGtjaGthd3N1Y2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNjQzOTksImV4cCI6MjEwMTk0MDM5OX0.tBa7bhLUTGfYHH4ld1S-D-yaeCuofuCBBplqs8pLL1Q';

  let client = null;

  function getClient() {
    if (!client) {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } else {
        console.warn('Supabase SDK not loaded yet. Retrying initialization...');
      }
    }
    return client;
  }

  window.RPS_Supabase = {
    getUrl: () => SUPABASE_URL,
    getClient: getClient,

    // --- AUTHENTICATION ---
    async loginAdmin(email, password) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },

    async logoutAdmin() {
      const sb = getClient();
      if (!sb) return;
      await sb.auth.signOut();
    },

    async getSession() {
      const sb = getClient();
      if (!sb) return null;
      const { data } = await sb.auth.getSession();
      return data?.session || null;
    },

    // --- PUBLIC FETCH METHODS ---
    async getPublishedNotices() {
      const sb = getClient();
      if (!sb) return null;
      const { data, error } = await sb
        .from('notices')
        .select('*')
        .eq('published', true)
        .order('pinned', { ascending: false })
        .order('published_at', { ascending: false });
      if (error) {
        console.error('Error fetching notices from Supabase:', error);
        return null;
      }
      return data;
    },

    async getPublishedEvents() {
      const sb = getClient();
      if (!sb) return null;
      const { data, error } = await sb
        .from('events')
        .select('*')
        .eq('published', true)
        .order('event_date', { ascending: true });
      if (error) {
        console.error('Error fetching events from Supabase:', error);
        return null;
      }
      return data;
    },

    async getPublishedGallery(category = 'all') {
      const sb = getClient();
      if (!sb) return null;
      let query = sb.from('gallery').select('*').eq('published', true).order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching gallery from Supabase:', error);
        return null;
      }
      return data;
    },

    // --- FORM SUBMISSION (ENQUIRIES) ---
    async submitEnquiry(enquiryData) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('enquiries').insert([enquiryData]).select();
      if (error) throw error;
      return data;
    },

    // --- ADMIN CRUD METHODS ---
    async getAllNoticesAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('notices').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async createNoticeAdmin(notice) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('notices').insert([notice]).select();
      if (error) throw error;
      return data[0];
    },

    async updateNoticeAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('notices').update(updates).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },

    async deleteNoticeAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('notices').delete().eq('id', id);
      if (error) throw error;
    },

    async getAllEventsAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('events').select('*').order('event_date', { ascending: true });
      if (error) throw error;
      return data;
    },

    async createEventAdmin(event) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('events').insert([event]).select();
      if (error) throw error;
      return data[0];
    },

    async updateEventAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('events').update(updates).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },

    async deleteEventAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('events').delete().eq('id', id);
      if (error) throw error;
    },

    async getAllGalleryAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async createGalleryItemAdmin(item) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      try {
        const { data, error } = await sb.from('gallery').insert([item]).select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        // Fallback if schema cache hasn't updated caption/storage_path
        const safeItem = {
          title: item.title,
          image_url: item.image_url,
          category: item.category || 'campus',
          published: item.published !== false,
          created_at: item.created_at || new Date().toISOString()
        };
        const { data: fbData, error: fbError } = await sb.from('gallery').insert([safeItem]).select();
        if (fbError) throw fbError;
        return fbData[0];
      }
    },

    async deleteGalleryItemAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('gallery').delete().eq('id', id);
      if (error) throw error;
    },

    async getAllEnquiriesAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    // --- DOCUMENTS (MANDATORY DISCLOSURE) ---
    async getPublishedDocuments() {
      const sb = getClient();
      if (!sb) return null;
      const { data, error } = await sb.from('documents').select('*').eq('published', true).order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching documents from Supabase:', error);
        return null;
      }
      return data;
    },

    async getAllDocumentsAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('documents').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async createDocumentAdmin(doc) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('documents').insert([doc]).select();
      if (error) throw error;
      return data[0];
    },

    async updateDocumentAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('documents').update(updates).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },

    async deleteDocumentAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('documents').delete().eq('id', id);
      if (error) throw error;
    },

    // --- SCHOOL INFORMATION ---
    async getSchoolInformation() {
      const sb = getClient();
      if (!sb) return null;
      const { data, error } = await sb.from('school_information').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching school information:', error);
        return null;
      }
      return data;
    },

    async updateSchoolInformationAdmin(updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const current = await this.getSchoolInformation();
      if (current && current.id) {
        const { data, error } = await sb.from('school_information').update(updates).eq('id', current.id).select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await sb.from('school_information').insert([updates]).select();
        if (error) throw error;
        return data[0];
      }
    },

    // --- ENQUIRIES ---
    async updateEnquiryStatusAdmin(id, status) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('enquiries').update({ status }).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },

    async deleteEnquiryAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('enquiries').delete().eq('id', id);
      if (error) throw error;
    },

    // --- PROFILES & USER MANAGEMENT ---
    async getCurrentProfile() {
      const sb = getClient();
      if (!sb) return null;
      const session = await this.getSession();
      if (!session || !session.user) return null;
      const { data, error } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
      if (error) {
        return {
          id: session.user.id,
          email: session.user.email,
          name: session.user.email.split('@')[0],
          role: 'super_admin',
          is_active: true
        };
      }
      return data;
    },

    async getAdminProfiles() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async createAdminProfile(profile) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('profiles').insert([profile]).select();
      if (error) throw error;
      return data[0];
    },

    async updateProfileAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('profiles').update(updates).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },

    // --- ACTIVITY LOGS ---
    async getActivityLogsAdmin(limit = 20) {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(limit);
      if (error) {
        console.warn('Activity logs fetch error:', error);
        return [];
      }
      return data;
    },

    async logActivityAdmin(action, resourceType, resourceId = null, details = '') {
      try {
        const sb = getClient();
        if (!sb) return;
        const profile = await this.getCurrentProfile();
        await sb.from('activity_logs').insert([{
          user_id: profile?.id || null,
          user_email: profile?.email || 'admin@roshanipublicschool.com',
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details
        }]);
      } catch (e) {
        console.warn('Failed to log activity:', e);
      }
    },

    // --- STORAGE UPLOAD HELPERS ---
    async uploadFile(bucket, file, folder = 'uploads') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await sb.storage.from(bucket).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      if (error) throw error;
      const { data: publicUrlData } = sb.storage.from(bucket).getPublicUrl(fileName);
      return {
        path: data.path,
        url: publicUrlData.publicUrl
      };
    }
  };
})();
