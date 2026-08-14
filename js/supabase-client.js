/**
 * ROSHANI PUBLIC SCHOOL — SUPABASE CLIENT & API LAYER
 * 
 * Authorization Model:
 * Exactly two roles: 'super_admin' and 'admin'
 * - super_admin: Complete system control, user management, audit review & restoration.
 * - admin: Full operational school content management with automated immutable audit tracking.
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

  // Baseline Fallback Institutional Data
  const DEFAULT_SCHOOL_INFO = {
    school_name: 'Roshani Public School',
    school_code: 'RPS-BR-845437',
    email: 'roshanipublicschoolturkauliya1@gmail.com',
    phone: '+91 99342 34471',
    office_phone: '+91 99342 34471',
    admission_contact: '+91 99342 34471',
    office_hours: 'Mon – Sat: 8:00 AM – 2:00 PM',
    address: 'Turkaulia, East Champaran, Bihar - 845437',
    affiliation_info: 'CBSE Affiliated · Est. 2001',
    principal_name: 'Mr. Arun Kumar',
    principal_message: 'Welcome to Roshani Public School. Since 2001, our mission has been to nurture curiosity, foster academic brilliance, and build strong moral character in every student.',
    principal_photo_url: 'assets/principal.jpg',
    school_logo_url: 'assets/logo.webp',
    tagline: 'Shaping Bright Futures Since 2001',
    about: 'At Roshani Public School, we strive to create an inspiring academic environment where young minds can discover their true potential, challenge their boundaries, and develop into confident, compassionate citizens.',
    vision: "To empower every student with knowledge, character, and leadership skills for tomorrow's world.",
    mission: 'Providing quality education through modern technology, practical experience, and strong moral values.',
    values: 'Excellence, Integrity, Innovation, Compassion, and Leadership',
    admission_popup_enabled: true,
    admission_status: 'open',
    academic_session: '2026-2027',
    admission_popup_image_url: 'assets/admission.webp'
  };

  const DEFAULT_GALLERY = [
    {
      id: 'd56548c4-d3c8-46f9-a48d-4de1af6c4679',
      title: 'Main School Building (Front View)',
      description: 'Front view of the Roshani Public School main campus building.',
      caption: 'Modern multi-story academic building of Roshani Public School.',
      image_url: 'assets/BuildingViewFront.webp',
      category: 'campus',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'c1f96543-4ab7-44d1-a7cb-e4dba18d0b2a',
      title: 'Campus Courtyard & Architecture',
      description: 'Spacious green courtyard and modern educational infrastructure.',
      caption: 'Academic courtyard and central quadrangle.',
      image_url: 'assets/buildingView3.webp',
      category: 'campus',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-003',
      title: 'Academic Wing & Classrooms',
      description: 'Main academic building wing with modern classrooms.',
      caption: 'Main academic building wing and classrooms.',
      image_url: 'assets/buildingView1.webp',
      category: 'campus',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-004',
      title: 'Secondary Academic Block',
      description: 'Secondary academic building block and campus pathways.',
      caption: 'Secondary academic building block.',
      image_url: 'assets/buildingView2.webp',
      category: 'campus',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-005',
      title: 'School Reception & Helpdesk',
      description: 'School reception, helpdesk and parent counseling area.',
      caption: 'Reception & Helpdesk area for parents and visitors.',
      image_url: 'assets/helpdesk.webp',
      category: 'campus',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-006',
      title: 'Garden & Campus Sitting Area',
      description: 'Campus outdoor sitting and green landscaped gardens.',
      caption: 'Outdoor garden and seating area for students.',
      image_url: 'assets/sitting area.webp',
      category: 'campus',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-007',
      title: 'Residential Hostel Block',
      description: 'Safe, secure residential hostel block with modern amenities.',
      caption: 'Hostel block and residential facilities.',
      image_url: 'assets/hostel.webp',
      category: 'campus',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: '4571340c-0cac-47ad-958d-6420a42d182a',
      title: 'Student Assembly & Morning Gathering',
      description: 'Daily morning assembly fostering discipline and unity.',
      caption: 'Student assembly and group celebrations.',
      image_url: 'assets/students.webp',
      category: 'events',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: '09414b4b-9870-4c2f-bc15-9a9d37371c10',
      title: 'Dedicated Faculty & Ceremony',
      description: 'Qualified and experienced teaching staff guiding students.',
      caption: 'Faculty leadership during school ceremony.',
      image_url: 'assets/teachers.webp',
      category: 'events',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: '575daeb1-ed3f-4cf1-8e69-4577807b091f',
      title: 'Annual Sports & Athletic Championship',
      description: 'Annual sports championships and physical education ground.',
      caption: 'Annual sports meet and athletic track events.',
      image_url: 'assets/sport.webp',
      category: 'sports',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: '2898c5b7-a770-48f1-ba97-8ea99705b5a1',
      title: 'Smart DigiClassroom Technology',
      description: 'State-of-the-art interactive smart board learning.',
      caption: 'Interactive DigiClass smart board learning session.',
      image_url: 'assets/smart classroom.webp',
      category: 'academics',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: '241a906f-4104-4195-b82c-621b05d1bdb7',
      title: 'Practical Science Laboratory Experiments',
      description: 'Hands-on practical science learning in modern laboratories.',
      caption: 'Students performing experiments in the science lab.',
      image_url: 'assets/experiment.webp',
      category: 'academics',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-013',
      title: 'Practical Microbiology Lab',
      description: 'Practical science & microbiology laboratory workstations.',
      caption: 'Microbiology and biology workstations.',
      image_url: 'assets/microscope.webp',
      category: 'academics',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-014',
      title: 'Computer Research & IT Lab',
      description: 'High-speed computer research lab and IT workstations.',
      caption: 'Computer lab and digital learning resources.',
      image_url: 'assets/computer-lab.webp',
      category: 'academics',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'f8f9b2a5-2e8a-44f8-8238-c7bfdc8585aa',
      title: 'Interactive Kids Classroom',
      description: 'Engaging, colorful learning environment for primary school students.',
      caption: 'Kids learning and primary activities room.',
      image_url: 'assets/kids-class.webp',
      category: 'academics',
      published: true,
      featured: true,
      created_at: '2026-08-10T13:37:41.300Z'
    },
    {
      id: 'gal-016',
      title: 'Cultural Program & Guidance',
      description: 'School staff and student cultural activity guidance and performance.',
      caption: 'Cultural activities and student performances.',
      image_url: 'assets/teachers.webp',
      category: 'cultural',
      published: true,
      featured: false,
      created_at: '2026-08-10T13:37:41.300Z'
    }
  ];

  window.RPS_Supabase = {
    getUrl: () => SUPABASE_URL,
    getClient: getClient,
    DEFAULT_SCHOOL_INFO,
    DEFAULT_GALLERY,

    // =========================================================================
    // 1. AUTHENTICATION & PROFILE SESSIONS
    // =========================================================================
    async loginAdmin(email, password) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.auth.signInWithPassword({ 
        email: email.trim().toLowerCase(), 
        password: password 
      });
      if (error) throw error;

      // Validate account active status
      if (data?.user?.id) {
        try {
          const { data: profile } = await sb.from('profiles').select('is_active, status').eq('id', data.user.id).single();
          if (profile && (profile.is_active === false || profile.status === 'disabled')) {
            await sb.auth.signOut();
            throw new Error('This administrator account has been disabled. Please contact the Super Administrator.');
          }
          await sb.from('profiles').update({ last_login_at: new Date().toISOString() }).eq('id', data.user.id);
        } catch (e) {
          if (e.message && e.message.includes('disabled')) throw e;
        }
      }

      // Log login event
      try {
        await this.logActivityAdmin({
          action: 'LOGIN',
          module: 'auth',
          details: `User ${email} signed into Admin Portal`
        });
      } catch (e) {}

      return data;
    },

    async logoutAdmin() {
      const sb = getClient();
      try {
        await this.logActivityAdmin({
          action: 'LOGOUT',
          module: 'auth',
          details: 'Admin user logged out'
        });
      } catch (e) {}

      if (sb) {
        await sb.auth.signOut();
      }
    },

    async getSession() {
      const sb = getClient();
      if (!sb) return null;
      const { data } = await sb.auth.getSession();
      return data?.session || null;
    },

    /**
     * Authoritative Profile Resolution
     * Exactly two valid roles: 'super_admin' and 'admin'
     */
    async getCurrentProfile() {
      const sb = getClient();
      const session = await this.getSession();

      // If Supabase authenticated user session exists
      if (session && session.user) {
        if (sb) {
          try {
            const { data, error } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
            if (!error && data) {
              const role = data.role === 'super_admin' ? 'super_admin' : 'admin';
              return {
                ...data,
                id: session.user.id,
                email: session.user.email || data.email,
                name: data.name || data.full_name || (session.user.email ? session.user.email.split('@')[0] : 'Administrator'),
                full_name: data.full_name || data.name || (session.user.email ? session.user.email.split('@')[0] : 'Administrator'),
                role: role,
                is_active: data.is_active !== false && data.status !== 'disabled'
              };
            }
          } catch (e) {
            console.warn('Profile fetch error, using session fallback:', e);
          }
        }

        // Session fallback
        const isRootAdmin = session.user.email === 'admin@roshanipublicschool.com';
        return {
          id: session.user.id,
          email: session.user.email,
          name: isRootAdmin ? 'Super Administrator' : session.user.email.split('@')[0],
          full_name: isRootAdmin ? 'Super Administrator' : session.user.email.split('@')[0],
          role: isRootAdmin ? 'super_admin' : 'admin',
          is_active: true
        };
      }

      // Emergency / Passcode session fallback
      const isPasscodeSession = sessionStorage.getItem('rps_admin_session') === 'true' || localStorage.getItem('rps_admin_session') === 'true';
      if (isPasscodeSession) {
        return {
          id: '4cf5b71b-31d7-416f-98c2-c2d8b4d0945b',
          email: 'admin@roshanipublicschool.com',
          name: 'Super Administrator',
          full_name: 'Super Administrator',
          role: 'super_admin',
          is_active: true
        };
      }

      return null;
    },

    // =========================================================================
    // 2. PUBLIC DATA FETCHERS
    // =========================================================================
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
        console.error('Error fetching notices:', error);
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
        console.error('Error fetching events:', error);
        return null;
      }
      return data;
    },

    async getPublishedGallery(category = 'all') {
      try {
        const sb = getClient();
        if (sb) {
          let query = sb.from('gallery').select('*').eq('published', true).order('created_at', { ascending: false });
          if (category && category !== 'all') {
            query = query.eq('category', category);
          }
          const { data, error } = await query;
          if (!error && data && data.length > 0) {
            return data.map(item => ({
              ...item,
              image_url: (item.image_url || '').replace(/\.png$/i, '.webp')
            }));
          }
        }
      } catch (err) {
        console.warn('Error fetching published gallery, falling back:', err);
      }
      let list = DEFAULT_GALLERY;
      if (category && category !== 'all') {
        list = list.filter(g => g.category === category);
      }
      return list;
    },

    async getPublishedDocuments() {
      const sb = getClient();
      if (!sb) return null;
      const { data, error } = await sb.from('documents').select('*').eq('published', true).order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching documents:', error);
        return null;
      }
      return data;
    },

    async submitEnquiry(enquiryData) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('enquiries').insert([enquiryData]).select();
      if (error) throw error;
      return data;
    },

    // =========================================================================
    // 3. SCHOOL INFORMATION DATA ENGINE (4-TIER RESOLUTION)
    // =========================================================================
    async getSchoolInformation() {
      // Tier 1: Supabase DB
      try {
        const sb = getClient();
        if (sb) {
          const { data, error } = await sb.from('school_information').select('*').limit(1).single();
          if (!error && data && Object.keys(data).length > 0) {
            const merged = { ...this.DEFAULT_SCHOOL_INFO, ...data };
            try { localStorage.setItem('rps_school_info_last_known', JSON.stringify(merged)); } catch (e) {}
            return merged;
          }
        }
      } catch (err) {
        console.warn('Database school info fetch notice:', err);
      }

      // Tier 2: Static JSON Repository Baseline (Multi-path fallback)
      try {
        const paths = ['/data/school-information.json', '../data/school-information.json', 'data/school-information.json'];
        for (const p of paths) {
          try {
            const repoResponse = await fetch(p, { cache: 'no-cache' });
            if (repoResponse && repoResponse.ok) {
              const repoData = await repoResponse.json();
              if (repoData && typeof repoData === 'object') {
                const merged = { ...this.DEFAULT_SCHOOL_INFO, ...repoData };
                try { localStorage.setItem('rps_school_info_last_known', JSON.stringify(merged)); } catch (e) {}
                return merged;
              }
            }
          } catch (pe) {}
        }
      } catch (repoErr) {
        console.warn('Repo static JSON fetch notice:', repoErr);
      }

      // Tier 3: Persistent Browser Cache
      try {
        const saved = localStorage.getItem('rps_school_info_last_known');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return { ...this.DEFAULT_SCHOOL_INFO, ...parsed };
        }
      } catch (e) {}

      // Tier 4: Built-in Baseline
      return { ...this.DEFAULT_SCHOOL_INFO };
    },

    /**
     * Update School Information (Permitted for Super Admin and Admin)
     * Automatically logs changes and triggers cross-tab rehydration.
     */
    async updateSchoolInformationAdmin(updates, reason = '') {
      const current = (await this.getSchoolInformation()) || this.DEFAULT_SCHOOL_INFO;
      let result = null;

      try {
        const sb = getClient();
        if (sb) {
          if (current && current.id) {
            const { data, error } = await sb.from('school_information').update(updates).eq('id', current.id).select();
            if (!error && data && data.length > 0) result = data[0];
          } else {
            const { data, error } = await sb.from('school_information').insert([updates]).select();
            if (!error && data && data.length > 0) result = data[0];
          }
        }
      } catch (err) {
        console.warn('Database save note:', err);
      }

      const finalData = { ...current, ...updates, ...(result || {}) };

      // Multi-tab cache sync
      try {
        localStorage.setItem('rps_school_info_last_known', JSON.stringify(finalData));
        sessionStorage.removeItem('rps_public_school_info_cache');
        localStorage.setItem('rps_public_data_updated', Date.now().toString());
        if (window.RPS_PublicApp && typeof window.RPS_PublicApp.hydrate === 'function') {
          window.RPS_PublicApp.hydrate(true);
        }
      } catch (e) {}

      return finalData;
    },

    // =========================================================================
    // 4. ADMIN OPERATIONAL CRUD METHODS (Notices, Events, Gallery, Documents, Enquiries)
    // =========================================================================
    async getAllNoticesAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('notices').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async createNoticeAdmin(notice) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('notices').insert([notice]).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'CREATE',
        module: 'notices',
        tableName: 'notices',
        recordId: data[0]?.id,
        newValue: notice.title,
        details: `Created notice: "${notice.title}"`
      });
      return data[0];
    },

    async updateNoticeAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('notices').update(updates).eq('id', id).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'UPDATE',
        module: 'notices',
        tableName: 'notices',
        recordId: id,
        details: `Updated notice: "${updates.title || id}"`
      });
      return data[0];
    },

    async deleteNoticeAdmin(id, noticeTitle = '') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('notices').delete().eq('id', id);
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'DELETE',
        module: 'notices',
        tableName: 'notices',
        recordId: id,
        oldValue: noticeTitle,
        details: `Deleted notice: "${noticeTitle || id}"`
      });
    },

    async getAllEventsAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('events').select('*').order('event_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },

    async createEventAdmin(event) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('events').insert([event]).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'CREATE',
        module: 'events',
        tableName: 'events',
        recordId: data[0]?.id,
        newValue: event.title,
        details: `Created event: "${event.title}"`
      });
      return data[0];
    },

    async updateEventAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('events').update(updates).eq('id', id).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'UPDATE',
        module: 'events',
        tableName: 'events',
        recordId: id,
        details: `Updated event: "${updates.title || id}"`
      });
      return data[0];
    },

    async deleteEventAdmin(id, eventTitle = '') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('events').delete().eq('id', id);
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'DELETE',
        module: 'events',
        tableName: 'events',
        recordId: id,
        oldValue: eventTitle,
        details: `Deleted event: "${eventTitle || id}"`
      });
    },

    async getAllGalleryAdmin() {
      try {
        const sb = getClient();
        if (sb) {
          const { data, error } = await sb.from('gallery').select('*').order('created_at', { ascending: false });
          if (!error && data && data.length > 0) {
            return data.map(item => ({
              ...item,
              image_url: (item.image_url || '').replace(/\.png$/i, '.webp')
            }));
          }
        }
      } catch (err) {
        console.warn('Error in getAllGalleryAdmin, falling back:', err);
      }
      return DEFAULT_GALLERY;
    },

    async createGalleryItemAdmin(item) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const profile = await this.getCurrentProfile();
      const payload = {
        ...item,
        uploaded_by: item.uploaded_by || profile?.id || null,
        uploader_name: item.uploader_name || profile?.full_name || profile?.name || profile?.email || 'Administrator',
        uploader_email: item.uploader_email || profile?.email || null
      };
      const { data, error } = await sb.from('gallery').insert([payload]).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'CREATE',
        module: 'gallery',
        tableName: 'gallery',
        recordId: data[0]?.id,
        newValue: item.title,
        details: `Uploaded gallery photo: "${item.title}"`
      });
      return data[0];
    },

    async deleteGalleryItemAdmin(id, itemTitle = '') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const profile = await this.getCurrentProfile();

      // Enforce ownership check: standard admins can only delete photos uploaded by their own account
      try {
        const { data: item, error: fetchErr } = await sb.from('gallery').select('*').eq('id', id).single();
        if (!fetchErr && item && profile && profile.role !== 'super_admin') {
          const isOwner = (item.uploaded_by && profile.id && item.uploaded_by === profile.id) ||
                          (item.uploader_email && profile.email && item.uploader_email.toLowerCase() === profile.email.toLowerCase()) ||
                          (item.uploaded_by && profile.email && item.uploaded_by.toLowerCase() === profile.email.toLowerCase());
          if (!isOwner) {
            throw new Error('Access denied: You can only delete photos uploaded by your admin account.');
          }
        }
      } catch (checkErr) {
        if (checkErr.message && checkErr.message.includes('Access denied')) {
          throw checkErr;
        }
      }

      const { error } = await sb.from('gallery').delete().eq('id', id);
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'DELETE',
        module: 'gallery',
        tableName: 'gallery',
        recordId: id,
        oldValue: itemTitle,
        details: `Deleted gallery photo: "${itemTitle || id}"`
      });
    },

    async getAllDocumentsAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('documents').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async createDocumentAdmin(doc) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('documents').insert([doc]).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'CREATE',
        module: 'documents',
        tableName: 'documents',
        recordId: data[0]?.id,
        newValue: doc.title,
        details: `Uploaded compliance document: "${doc.title}"`
      });
      return data[0];
    },

    async updateDocumentAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('documents').update(updates).eq('id', id).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'UPDATE',
        module: 'documents',
        tableName: 'documents',
        recordId: id,
        details: `Updated compliance document: "${updates.title || id}"`
      });
      return data[0];
    },

    async deleteDocumentAdmin(id, docTitle = '') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('documents').delete().eq('id', id);
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'DELETE',
        module: 'documents',
        tableName: 'documents',
        recordId: id,
        oldValue: docTitle,
        details: `Deleted compliance document: "${docTitle || id}"`
      });
    },

    async getAllEnquiriesAdmin() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async updateEnquiryStatusAdmin(id, status) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { data, error } = await sb.from('enquiries').update({ status }).eq('id', id).select();
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'UPDATE',
        module: 'enquiries',
        tableName: 'enquiries',
        recordId: id,
        fieldName: 'status',
        newValue: status,
        details: `Enquiry status changed to: ${status}`
      });
      return data[0];
    },

    async deleteEnquiryAdmin(id) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const { error } = await sb.from('enquiries').delete().eq('id', id);
      if (error) throw error;
      await this.logActivityAdmin({
        action: 'DELETE',
        module: 'enquiries',
        tableName: 'enquiries',
        recordId: id,
        details: `Deleted parent enquiry #${id}`
      });
    },

    // =========================================================================
    // 5. USER MANAGEMENT (SUPER ADMIN ONLY)
    // =========================================================================
    async getAdminProfiles() {
      const sb = getClient();
      if (!sb) return [];
      const { data, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(p => ({
        ...p,
        name: p.name || p.full_name || (p.email ? p.email.split('@')[0] : 'Administrator'),
        full_name: p.full_name || p.name || (p.email ? p.email.split('@')[0] : 'Administrator'),
        role: p.role === 'super_admin' ? 'super_admin' : 'admin'
      }));
    },

    async createAdminProfile({ full_name, email, password, role = 'admin', is_active = true, status = 'active' }) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');

      const callerProfile = await this.getCurrentProfile();
      if (!callerProfile || callerProfile.role !== 'super_admin') {
        throw new Error('403 Forbidden: Only Super Administrators can create admin accounts.');
      }

      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanName = full_name.trim();
      const finalRole = role === 'super_admin' ? 'super_admin' : 'admin';

      // 1. Create isolated Supabase auth client so Super Admin's active session is not replaced
      const authClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });

      // 2. Register authentication user credentials in Supabase Auth
      const { data: authData, error: authError } = await authClient.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: {
            full_name: cleanName,
            name: cleanName,
            role: finalRole
          }
        }
      });

      if (authError) {
        throw new Error(`Authentication registration failed: ${authError.message}`);
      }

      if (!authData || !authData.user) {
        throw new Error('Failed to register user credentials in authentication system.');
      }

      const newUserId = authData.user.id;

      // 3. Upsert profile with authentic user ID
      const profilePayload = {
        id: newUserId,
        email: cleanEmail,
        name: cleanName,
        full_name: cleanName,
        role: finalRole,
        is_active: is_active,
        status: status,
        updated_at: new Date().toISOString()
      };

      const { data: profileData, error: profileErr } = await sb
        .from('profiles')
        .upsert([profilePayload], { onConflict: 'id' })
        .select();

      if (profileErr) {
        console.warn('Profile upsert notice:', profileErr);
      }

      await this.logActivityAdmin({
        action: 'USER_CREATED',
        module: 'users',
        tableName: 'profiles',
        recordId: newUserId,
        newValue: `${finalRole} (${cleanEmail})`,
        details: `Super Admin created new ${finalRole} user: ${cleanEmail}`
      });

      return profileData && profileData[0] ? profileData[0] : { id: newUserId, email: cleanEmail, full_name: cleanName, role: finalRole };
    },

    async updateProfileAdmin(id, updates) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');

      const callerProfile = await this.getCurrentProfile();
      if (!callerProfile) throw new Error('Authentication required');

      // Admin self-protection & privilege check
      if (callerProfile.role !== 'super_admin') {
        if (callerProfile.id !== id) {
          throw new Error('403 Forbidden: Admin users can only modify their own profile details.');
        }
        // Admin cannot change their own role, status, or id
        delete updates.role;
        delete updates.is_active;
        delete updates.status;
        delete updates.id;
      }

      // If role is provided, enforce strict 2-role constraint
      if (updates.role) {
        updates.role = updates.role === 'super_admin' ? 'super_admin' : 'admin';
      }

      const payload = { ...updates, updated_at: new Date().toISOString() };
      if (payload.name && !payload.full_name) payload.full_name = payload.name;
      if (payload.full_name && !payload.name) payload.name = payload.full_name;

      const { data, error } = await sb.from('profiles').update(payload).eq('id', id).select();
      if (error) throw error;

      let action = 'UPDATE';
      if (updates.is_active === false || updates.status === 'disabled') action = 'USER_DISABLED';
      if (updates.is_active === true && updates.status === 'active') action = 'USER_ENABLED';
      if (updates.role) action = 'ROLE_CHANGE';

      await this.logActivityAdmin({
        action: action,
        module: 'users',
        tableName: 'profiles',
        recordId: id,
        details: `Updated profile for account ${data[0]?.email || id}`
      });

      return data ? data[0] : null;
    },

    async deleteAdminProfile(id, userEmail = '') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');

      const callerProfile = await this.getCurrentProfile();
      if (!callerProfile || callerProfile.role !== 'super_admin') {
        throw new Error('403 Forbidden: Only Super Administrators can delete user accounts.');
      }

      if (callerProfile.id === id) {
        throw new Error('Safety check: Super Admins cannot delete their own active account.');
      }

      // Check remaining super admins
      const profiles = await this.getAdminProfiles();
      const targetUser = profiles.find(p => p.id === id);
      if (targetUser && targetUser.role === 'super_admin') {
        const superAdmins = profiles.filter(p => p.role === 'super_admin' && p.is_active);
        if (superAdmins.length <= 1) {
          throw new Error('Cannot delete the only remaining active Super Admin account.');
        }
      }

      const { error } = await sb.from('profiles').delete().eq('id', id);
      if (error) throw error;

      await this.logActivityAdmin({
        action: 'USER_DELETED',
        module: 'users',
        tableName: 'profiles',
        recordId: id,
        oldValue: userEmail || id,
        details: `Super Admin deleted account ${userEmail || id}`
      });
    },

    // =========================================================================
    // 6. IMMUTABLE AUDIT LOG & REVERSIBLE RESTORE ENGINE
    // =========================================================================
    /**
     * Unified Immutable Activity Logger
     * Standardized Actions: CREATE, UPDATE, DELETE, RESTORE, ENABLE, DISABLE, LOGIN, LOGOUT, ROLE_CHANGE, USER_CREATED, USER_DELETED, etc.
     */
    async logActivityAdmin(param1, moduleParam, recordIdParam, detailsParam, oldValParam, newValParam, userRoleParam, fieldNameParam, reasonParam, restoreOfAuditIdParam) {
      try {
        const sb = getClient();
        const profile = (await this.getCurrentProfile()) || { email: 'admin@roshanipublicschool.com', role: 'super_admin', name: 'Super Administrator', full_name: 'Super Administrator' };
        const actorName = profile?.full_name || profile?.name || (profile?.email === 'admin@roshanipublicschool.com' ? 'Super Administrator' : (profile?.email ? profile.email.split('@')[0] : 'Administrator'));

        let payload = {};
        if (typeof param1 === 'object' && param1 !== null) {
          payload = {
            actor_user_id: profile?.id || null,
            actor_name: actorName,
            actor_email: profile?.email || 'admin@roshanipublicschool.com',
            actor_role: profile?.role || 'admin',
            action: param1.action || 'UPDATE',
            module: param1.module || 'general',
            table_name: param1.tableName || null,
            record_id: param1.recordId ? String(param1.recordId) : null,
            field_name: param1.fieldName || null,
            old_value: param1.oldValue !== undefined && param1.oldValue !== null ? String(param1.oldValue) : null,
            new_value: param1.newValue !== undefined && param1.newValue !== null ? String(param1.newValue) : null,
            reason: param1.reason || null,
            restore_of_audit_id: param1.restoreOfAuditId || null,
            metadata: param1.metadata || {},
            details: param1.details || '',
            created_at: new Date().toISOString()
          };
        } else {
          payload = {
            actor_user_id: profile?.id || null,
            actor_name: actorName,
            actor_email: profile?.email || 'admin@roshanipublicschool.com',
            actor_role: userRoleParam || profile?.role || 'admin',
            action: param1 || 'UPDATE',
            module: moduleParam || 'general',
            record_id: recordIdParam ? String(recordIdParam) : null,
            details: detailsParam || '',
            old_value: oldValParam !== undefined && oldValParam !== null ? String(oldValParam) : null,
            new_value: newValParam !== undefined && newValParam !== null ? String(newValParam) : null,
            field_name: fieldNameParam || null,
            reason: reasonParam || null,
            restore_of_audit_id: restoreOfAuditIdParam || null,
            created_at: new Date().toISOString()
          };
        }

        // Backward compatibility properties
        payload.user_id = payload.actor_user_id;
        payload.user_name = payload.actor_name;
        payload.user_email = payload.actor_email;
        payload.user_role = payload.actor_role;
        payload.resource_type = payload.module;
        payload.resource_id = payload.record_id;

        // Local cache backup (dual synchronization)
        try {
          const localGeneral = JSON.parse(localStorage.getItem('rps_general_activity_logs') || '[]');
          localGeneral.unshift({ id: 'loc_' + Date.now(), ...payload });
          localStorage.setItem('rps_general_activity_logs', JSON.stringify(localGeneral.slice(0, 200)));

          if (payload.module === 'school_information') {
            const localAudit = JSON.parse(localStorage.getItem('rps_school_info_audit_logs') || '[]');
            localAudit.unshift({ id: 'loc_' + Date.now(), ...payload });
            localStorage.setItem('rps_school_info_audit_logs', JSON.stringify(localAudit.slice(0, 200)));
          }
        } catch (e) {}

        // Database insert (Append-only / Immutable)
        if (sb) {
          await sb.from('activity_logs').insert([payload]);
        }
      } catch (err) {
        console.warn('Activity logging notice:', err);
      }
    },

    /**
     * Get Filtered Audit Logs (Super Admin Interface)
     */
    async getAuditLogsAdmin({ limit = 100, module = null, action = null, actorEmail = null, search = null } = {}) {
      const sb = getClient();
      let dbLogs = [];

      if (sb) {
        try {
          let query = sb.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(limit);
          if (module && module !== 'all') query = query.or(`module.eq.${module},resource_type.eq.${module}`);
          if (action && action !== 'all') query = query.eq('action', action);
          if (actorEmail) query = query.ilike('actor_email', `%${actorEmail}%`);

          const { data, error } = await query;
          if (!error && data) dbLogs = data;
        } catch (e) {
          console.warn('Audit fetch exception:', e);
        }
      }

      let localLogs = [];
      try {
        localLogs = JSON.parse(localStorage.getItem('rps_general_activity_logs') || '[]');
      } catch (e) {}

      // Combine unique records
      const map = new Map();
      dbLogs.forEach(l => map.set(l.id || `${l.created_at}_${l.action}`, l));
      localLogs.forEach(l => {
        const key = l.id || `${l.created_at}_${l.action}`;
        if (!map.has(key)) map.set(key, l);
      });

      // Helper function to derive display name if missing
      const resolveActorName = (l) => {
        if (l.actor_name && l.actor_name.trim() !== '') return l.actor_name.trim();
        if (l.user_name && l.user_name.trim() !== '') return l.user_name.trim();
        const email = (l.actor_email || l.user_email || '').trim().toLowerCase();
        if (email === 'admin@roshanipublicschool.com') return 'Super Administrator';
        if (email) {
          const raw = email.split('@')[0];
          return raw.replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        }
        return 'Administrator';
      };

      let combined = Array.from(map.values()).map(l => {
        const actorEmail = l.actor_email || l.user_email || 'admin@roshanipublicschool.com';
        const actorName = resolveActorName(l);
        return {
          ...l,
          actor_name: actorName,
          user_name: actorName,
          actor_email: actorEmail,
          actor_role: l.actor_role || l.user_role || 'admin',
          module: l.module || l.resource_type || 'general',
          record_id: l.record_id || l.resource_id,
          created_at: l.created_at || new Date().toISOString()
        };
      });

      // Apply client search filters
      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase();
        combined = combined.filter(l => 
          (l.details && l.details.toLowerCase().includes(q)) ||
          (l.actor_name && l.actor_name.toLowerCase().includes(q)) ||
          (l.actor_email && l.actor_email.toLowerCase().includes(q)) ||
          (l.field_name && l.field_name.toLowerCase().includes(q)) ||
          (l.old_value && l.old_value.toLowerCase().includes(q)) ||
          (l.new_value && l.new_value.toLowerCase().includes(q)) ||
          (l.action && l.action.toLowerCase().includes(q)) ||
          (l.module && l.module.toLowerCase().includes(q))
        );
      }

      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return combined.slice(0, limit);
    },

    /**
     * Get Activity Logs for Dashboard & Quick Feeds
     */
    async getActivityLogsAdmin(limit = 6) {
      return await this.getAuditLogsAdmin({ limit });
    },

    /**
     * Get School Info Specific Audit Logs
     */
    async getSchoolInfoAuditLogs(limit = 50) {
      return await this.getAuditLogsAdmin({ limit, module: 'school_information' });
    },

    /**
     * Safety-Enforced One-Click Audit Record Restore Engine
     * 
     * Verifies that the current live database state matches the modified state.
     * Reverts to old_value and generates a brand NEW 'RESTORE' audit record linking to the original.
     * The original audit record remains completely IMMUTABLE and untouched.
     */
    async restoreAuditEntry({ auditId, reason = 'Restored previous value by Super Admin', force = false }) {
      const profile = await this.getCurrentProfile();
      if (!profile || profile.role !== 'super_admin') {
        throw new Error('403 Forbidden: Only Super Administrators can execute data restorations.');
      }

      const allLogs = await this.getAuditLogsAdmin({ limit: 300 });
      const targetAudit = allLogs.find(l => String(l.id) === String(auditId));

      if (!targetAudit) {
        throw new Error(`Audit record #${auditId} not found in log history.`);
      }

      if (targetAudit.old_value === null || targetAudit.old_value === undefined) {
        throw new Error('This audit record does not have a recorded previous value to restore.');
      }

      const moduleName = targetAudit.module || targetAudit.resource_type || 'school_information';
      const fieldName = targetAudit.field_name;

      // -----------------------------------------------------------------------
      // CASE A: RESTORING SCHOOL INFORMATION FIELD
      // -----------------------------------------------------------------------
      if (moduleName === 'school_information') {
        const currentInfo = await this.getSchoolInformation();
        const currentVal = fieldName ? currentInfo[fieldName] : null;

        // Safety Conflict Detection
        if (!force && targetAudit.new_value !== null && currentVal !== undefined && currentVal !== null) {
          const recordedNewVal = String(targetAudit.new_value).trim();
          const liveVal = String(currentVal).trim();
          if (recordedNewVal !== liveVal && targetAudit.action !== 'RESTORE') {
            return {
              conflict: true,
              message: `Conflict detected: The field '${fieldName}' currently has value "${liveVal}", which is different from the recorded value "${recordedNewVal}". Review latest changes before proceeding.`,
              currentValue: currentVal,
              recordedValue: targetAudit.new_value,
              targetAudit
            };
          }
        }

        // Execute Revert
        let updatePayload = {};
        if (fieldName) {
          // Parse boolean if needed
          let restoreVal = targetAudit.old_value;
          if (restoreVal === 'true') restoreVal = true;
          if (restoreVal === 'false') restoreVal = false;
          updatePayload[fieldName] = restoreVal;
        }

        const restoredData = await this.updateSchoolInformationAdmin(updatePayload);

        // Record New Immutable RESTORE Audit Entry
        await this.logActivityAdmin({
          action: 'RESTORE',
          module: 'school_information',
          tableName: 'school_information',
          recordId: targetAudit.record_id || 'identity',
          fieldName: fieldName || 'school_info',
          oldValue: currentVal !== undefined ? currentVal : targetAudit.new_value,
          newValue: targetAudit.old_value,
          reason: reason,
          restoreOfAuditId: targetAudit.id,
          details: `Super Admin restored ${fieldName || 'record'} from "${currentVal || targetAudit.new_value}" back to "${targetAudit.old_value}". Reason: ${reason}`
        });

        return {
          success: true,
          restoredRecord: restoredData,
          originalAudit: targetAudit
        };
      }

      // -----------------------------------------------------------------------
      // CASE B: RESTORING NOTICES / EVENTS / DOCUMENTS / SETTINGS
      // -----------------------------------------------------------------------
      const sb = getClient();
      if (targetAudit.table_name && targetAudit.record_id && fieldName && sb) {
        const { data: currentLiveRow } = await sb.from(targetAudit.table_name).select('*').eq('id', targetAudit.record_id).single();
        const currentLiveVal = currentLiveRow ? currentLiveRow[fieldName] : null;

        if (!force && targetAudit.new_value !== null && currentLiveVal !== null) {
          if (String(currentLiveVal).trim() !== String(targetAudit.new_value).trim()) {
            return {
              conflict: true,
              message: `Record #${targetAudit.record_id} has been modified since this audit entry. Current value is "${currentLiveVal}".`,
              currentValue: currentLiveVal,
              recordedValue: targetAudit.new_value,
              targetAudit
            };
          }
        }

        await sb.from(targetAudit.table_name).update({ [fieldName]: targetAudit.old_value }).eq('id', targetAudit.record_id);

        await this.logActivityAdmin({
          action: 'RESTORE',
          module: moduleName,
          tableName: targetAudit.table_name,
          recordId: targetAudit.record_id,
          fieldName: fieldName,
          oldValue: currentLiveVal,
          newValue: targetAudit.old_value,
          reason: reason,
          restoreOfAuditId: targetAudit.id,
          details: `Super Admin restored ${targetAudit.table_name}.${fieldName} back to "${targetAudit.old_value}". Reason: ${reason}`
        });

        // Trigger cache sync
        localStorage.setItem('rps_public_data_updated', Date.now().toString());

        return {
          success: true,
          originalAudit: targetAudit
        };
      }

      throw new Error(`Restoration for module '${moduleName}' is not supported automatically.`);
    },

    // =========================================================================
    // 7. STORAGE UPLOAD HELPERS
    // =========================================================================
    async uploadFile(bucket, file, folder = 'uploads') {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client unavailable');
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      
      const bucketsToTry = [bucket, 'school-images', 'school-gallery', 'notice-attachments', 'event-images'];
      const uniqueBuckets = [...new Set(bucketsToTry)];

      let lastErr = null;
      for (const b of uniqueBuckets) {
        try {
          const { data, error } = await sb.storage.from(b).upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });
          if (!error && data) {
            const { data: publicUrlData } = sb.storage.from(b).getPublicUrl(fileName);
            return {
              path: data.path,
              url: publicUrlData.publicUrl
            };
          }
          lastErr = error;
        } catch (err) {
          lastErr = err;
        }
      }

      if (lastErr) throw lastErr;
      throw new Error('Upload failed across storage buckets');
    }
  };
})();
