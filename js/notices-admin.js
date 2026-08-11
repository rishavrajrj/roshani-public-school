const NOTICE_STORAGE_KEY = 'rps_notices_db_v3';

const DEFAULT_NOTICES = [
  {
    id: 'n-1',
    title: 'Admissions Open for Academic Session 2026–27',
    slug: 'admissions-open-2026-27',
    description: 'Applications are invited for Nursery to Class XII. Collect prospectus from school office or apply online through the website portal.',
    content: 'Applications are invited for admissions to classes Nursery through Class XII for the Academic Session 2026–27.\n\nProspectus and application forms are available at the school reception during office hours (8:00 AM to 2:00 PM, Monday to Saturday).\n\nParents can also submit an online enquiry through the school website. For any queries, please contact the school office at +91 9472405097.',
    category: 'admissions',
    published: true,
    pinned: true,
    publishedAt: '2026-08-08',
    updatedAt: null,
    expiresAt: null,
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-08-08'
  },
  {
    id: 'n-2',
    title: 'Parent Teacher Meeting (PTM) — August 2026',
    slug: 'ptm-august-2026',
    description: 'PTM for Class Nursery to XII is scheduled for Saturday, August 15, 2026. Timings: 9:00 AM to 1:00 PM. Progress cards will be distributed.',
    content: 'Parent Teacher Meeting for all classes (Nursery to XII) is scheduled for Saturday, August 15, 2026.\n\nTimings: 9:00 AM to 1:00 PM\n\nProgress reports and assessment cards will be distributed during the meeting. Parents are requested to attend without fail and discuss their ward\'s academic progress with respective class teachers.\n\nPlease carry your parent ID card for entry.',
    category: 'events',
    published: true,
    pinned: true,
    publishedAt: '2026-08-05',
    updatedAt: null,
    expiresAt: '2026-08-16',
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-08-05'
  },
  {
    id: 'n-3',
    title: 'Periodic Assessment Test II — Schedule Published',
    slug: 'pat-ii-schedule-2026',
    description: 'Detailed examination routine and syllabus for Classes I to XII are published. Tests commence from August 18, 2026.',
    content: 'The schedule for Periodic Assessment Test II (PAT-II) has been published for all classes from I to XII.\n\nExaminations will commence from August 18, 2026 and conclude by August 28, 2026.\n\nDetailed date-sheet and syllabus have been shared with class teachers. Parents are requested to ensure regular attendance of their wards during the examination period.\n\nStudents must carry their school ID cards during exams.',
    category: 'examination',
    published: true,
    pinned: false,
    publishedAt: '2026-08-01',
    updatedAt: null,
    expiresAt: '2026-08-29',
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-08-01'
  },
  {
    id: 'n-4',
    title: '79th Independence Day Celebration',
    slug: 'independence-day-2026',
    description: 'Students participating in flag hoisting, march-past, and patriotic cultural programs must attend final rehearsals on August 13.',
    content: 'Roshani Public School will celebrate the 79th Independence Day on August 15, 2026.\n\nSchedule:\n• Flag Hoisting Ceremony: 8:00 AM\n• March Past by School Cadets\n• Patriotic Song Performances\n• Cultural Dance Programs\n• Speech Competition Winners Felicitation\n\nAll students participating must attend the final rehearsal on August 13, 2026 at 9:00 AM.\n\nSchool uniform is mandatory. Parents are welcome to attend the celebration.',
    category: 'events',
    published: true,
    pinned: false,
    publishedAt: '2026-07-28',
    updatedAt: null,
    expiresAt: '2026-08-16',
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-07-28'
  },
  {
    id: 'n-5',
    title: 'CBSE Board Exam Extra Mentorship Classes',
    slug: 'board-exam-mentorship-2026',
    description: 'Special weekend doubt-clearance classes organized for Class X and XII board aspirants starting Saturday, August 10.',
    content: 'Special weekend mentorship and doubt-clearance sessions have been organized for Class X and Class XII board examination aspirants.\n\nStarting: Saturday, August 10, 2026\nTimings: 9:00 AM to 12:30 PM\nVenue: Senior Wing Classrooms\n\nSubjects covered: Mathematics, Science (Physics, Chemistry, Biology), English, Social Science, Accountancy, Business Studies.\n\nAll board-appearing students are strongly encouraged to attend. No additional fees will be charged for these sessions.',
    category: 'academic',
    published: true,
    pinned: false,
    publishedAt: '2026-07-22',
    updatedAt: null,
    expiresAt: null,
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-07-22'
  },
  {
    id: 'n-6',
    title: 'Annual Science & Art Exhibition 2026',
    slug: 'science-art-exhibition-2026',
    description: 'Student project submissions for the Annual Science & Art Exhibition are open. Top 3 projects win trophies and certificates.',
    content: 'The Annual Science & Art Exhibition 2026 is scheduled for the last week of August.\n\nProject submission guidelines:\n• Science projects: Working models, innovative experiments, research papers\n• Art projects: Paintings, sculptures, digital art, craft\n• Team size: Individual or groups of up to 3 students\n• Submission deadline: August 20, 2026\n\nTop 3 projects in each category will be awarded trophies, certificates, and prizes.\n\nInterested students must register with their class teacher by August 12.',
    category: 'academic',
    published: true,
    pinned: false,
    publishedAt: '2026-07-15',
    updatedAt: null,
    expiresAt: null,
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-07-15'
  },
  {
    id: 'n-7',
    title: 'Summer Vacation Homework Submission Reminder',
    slug: 'summer-vacation-homework-2026',
    description: 'All students must submit their summer vacation homework by July 10, 2026. Late submissions will not be accepted.',
    content: 'This is a reminder that all students from Class I to XII must submit their completed summer vacation homework assignments to their respective class teachers by July 10, 2026.\n\nLate submissions will not be accepted and may affect the internal assessment grades.\n\nPlease ensure all projects, worksheets, and reading assignments are completed as per the guidelines shared before the vacation.',
    category: 'academic',
    published: true,
    pinned: false,
    publishedAt: '2026-07-05',
    updatedAt: null,
    expiresAt: '2026-07-11',
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-07-05'
  },
  {
    id: 'n-8',
    title: 'Updated School Fee Structure & Online Payment',
    slug: 'fee-structure-update-2026',
    description: 'Parents can now pay quarterly school fees online via UPI, Credit/Debit cards, or Net Banking through our portal.',
    content: 'We are pleased to announce the launch of our online fee payment facility.\n\nParents can now pay quarterly school fees conveniently through:\n• UPI (Google Pay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n\nThe updated fee structure for Academic Session 2026–27 is available at the school reception and on the Admissions page of our website.\n\nFor any payment-related queries, please contact the accounts section at +91 9472405097.',
    category: 'admissions',
    published: true,
    pinned: false,
    publishedAt: '2026-06-25',
    updatedAt: null,
    expiresAt: null,
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-06-25'
  },
  {
    id: 'n-9',
    title: 'Roshani P.S. Premier League — Sports Day 2026',
    slug: 'sports-day-2026',
    description: 'Annual Inter-House sports tournament registrations start June 20. Events: Cricket, Football, Track, and Badminton.',
    content: 'The annual Roshani Public School Premier League (Inter-House Sports Tournament) registrations are now open!\n\nRegistration opens: June 20, 2026\nTournament dates: To be announced\n\nEvents:\n• Cricket (Under-14, Under-17)\n• Football (Under-14, Under-17)\n• Track & Field Events (100m, 200m, 400m, Relay)\n• Badminton (Singles, Doubles)\n\nStudents can register with their respective House Captains or the Physical Education department.\n\nFour houses compete: Tagore, Gandhi, Nehru, and Subhash.',
    category: 'events',
    published: true,
    pinned: false,
    publishedAt: '2026-06-15',
    updatedAt: null,
    expiresAt: null,
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-06-15'
  },
  {
    id: 'n-10',
    title: 'Eid-ul-Adha Holiday Announcement',
    slug: 'eid-ul-adha-holiday-2026',
    description: 'School will remain closed on June 7, 2026 (Saturday) on account of Eid-ul-Adha. Regular classes resume on Monday.',
    content: 'This is to inform all students, parents, and staff that Roshani Public School will remain closed on Saturday, June 7, 2026, on account of Eid-ul-Adha.\n\nRegular classes will resume on Monday, June 9, 2026.\n\nWishing everyone a blessed Eid!\n\n— School Administration',
    category: 'holiday',
    published: true,
    pinned: false,
    publishedAt: '2026-06-04',
    updatedAt: null,
    expiresAt: '2026-06-10',
    attachmentUrl: null,
    attachmentName: null,
    attachmentType: null,
    createdAt: '2026-06-04'
  }
];

class NoticeManager {
  constructor() {
    // Initialize with default notices so data is always available
    this.notices = JSON.parse(JSON.stringify(DEFAULT_NOTICES));
    this.page = 1;
    this.perPage = 8;
    // NOTE: Do NOT call loadNotices() or any render function here.
    // The global `noticeMgr` variable is not yet assigned (TDZ),
    // and render functions reference it, causing a silent crash.
  }

  async init() {
    // Load from localStorage if present
    try {
      const stored = localStorage.getItem(NOTICE_STORAGE_KEY);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0].type !== 'undefined') {
            this.notices = parsed.map(n => this.migrateNotice(n));
            this.saveNotices(this.notices);
          } else {
            this.notices = parsed;
          }
        }
      }
    } catch (e) {
      console.warn("LocalStorage notices read error:", e);
    }

    // Render immediately with default/cached data
    this._triggerRender();

    // Then fetch live data from Supabase and re-render
    try {
      if (window.RPS_Supabase && typeof window.RPS_Supabase.getPublishedNotices === 'function') {
        const sbNotices = await window.RPS_Supabase.getPublishedNotices();
        if (Array.isArray(sbNotices) && sbNotices.length > 0) {
          this.notices = sbNotices.map(n => ({
            id: n.id,
            title: n.title,
            slug: n.slug || this.generateSlug(n.title),
            description: n.description || '',
            content: n.content || n.description || '',
            category: n.category || 'general',
            published: n.published !== false,
            pinned: !!n.pinned,
            publishedAt: n.published_at ? String(n.published_at).split(/[T ]/)[0] : new Date().toISOString().split('T')[0],
            updatedAt: n.updated_at,
            expiresAt: n.expires_at ? String(n.expires_at).split(/[T ]/)[0] : null,
            attachmentUrl: n.attachment_url || null,
            attachmentName: n.attachment_name || null,
            attachmentType: n.attachment_type || null,
            createdAt: n.created_at ? String(n.created_at).split(/[T ]/)[0] : new Date().toISOString().split('T')[0]
          }));
          this._triggerRender();
        }
      }
    } catch (e) {
      console.warn("Supabase notices fetch fallback:", e);
    }
  }

  _triggerRender() {
    try {
      if (typeof renderPublicNotices === 'function') renderPublicNotices();
    } catch (e) { console.warn('renderPublicNotices error:', e); }
    try {
      if (typeof renderNoticesPageRedesign === 'function') renderNoticesPageRedesign();
    } catch (e) { console.warn('renderNoticesPageRedesign error:', e); }
  }

  migrateNotice(n) {
    let oldCat = n.type ? n.type.toLowerCase() : 'general';
    let newCat = 'general';
    if (oldCat.includes('admission')) newCat = 'admissions';
    else if (oldCat.includes('event')) newCat = 'events';
    else if (oldCat.includes('academic')) newCat = 'academic';

    return {
      id: n.id || 'n-' + Date.now(),
      title: n.title || 'Untitled',
      slug: n.slug || this.generateSlug(n.title || 'Untitled'),
      description: n.description || n.summary || '',
      content: n.content || n.description || '',
      category: newCat,
      published: n.isPublished !== false,
      pinned: !!n.isImportant,
      publishedAt: n.date || n.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: n.updatedAt || null,
      expiresAt: n.expiresAt || null,
      attachmentUrl: n.attachment || n.attachmentUrl || null,
      attachmentName: n.attachmentName || null,
      attachmentType: n.attachmentType || null,
      createdAt: n.createdAt || n.date || new Date().toISOString().split('T')[0]
    };
  }

  saveNotices(data) {
    this.notices = data;
    localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(this.notices));
  }

  generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  getPublishedNotices() {
    if (!Array.isArray(this.notices) || this.notices.length === 0) {
      this.notices = JSON.parse(JSON.stringify(DEFAULT_NOTICES));
    }
    return this.notices
      .filter(n => n && n.published !== false)
      .sort((a, b) => {
        if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
        const dateA = a.publishedAt ? new Date(String(a.publishedAt).replace(' ', 'T')).getTime() : 0;
        const dateB = b.publishedAt ? new Date(String(b.publishedAt).replace(' ', 'T')).getTime() : 0;
        return dateB - dateA;
      });
  }

  getFilteredNotices(category = 'all', searchQuery = '') {
    let list = this.getPublishedNotices();
    if (category && category !== 'all') {
      list = list.filter(n => n.category === category);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(n => 
        (n.title || '').toLowerCase().includes(q) ||
        (n.description || '').toLowerCase().includes(q) ||
        (n.content || '').toLowerCase().includes(q) ||
        (n.category || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  getPinnedNotices() {
    return this.getPublishedNotices().filter(n => n.pinned);
  }

  getRecentNotices(limit = 5) {
    const list = this.getPublishedNotices();
    return list.slice(0, limit);
  }

  isNewNotice(notice) {
    if (!notice || !notice.publishedAt) return false;
    try {
      const cleanStr = String(notice.publishedAt).replace(' ', 'T');
      const publishDate = new Date(cleanStr);
      if (isNaN(publishDate.getTime())) return false;
      const today = new Date();
      const diffTime = Math.abs(today - publishDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } catch (e) {
      return false;
    }
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const cleanStr = String(dateStr).replace(' ', 'T');
      const date = new Date(cleanStr);
      if (isNaN(date.getTime())) {
        return String(dateStr).split(' ')[0].split('T')[0];
      }
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return String(dateStr).split(' ')[0].split('T')[0];
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }

  getCategoryIcon(category) {
    const icons = {
      academic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
      examination: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
      events: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
      admissions: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`,
      holiday: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
      results: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      general: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
    };
    return icons[category] || icons.general;
  }

  getCategoryLabel(category) {
    if (!category) return 'General';
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}

const noticeMgr = new NoticeManager();
window.noticeManager = noticeMgr;

let currentCategoryFilter = 'all';
let currentSearchQuery = '';

// Now that noticeMgr and filter state are assigned, it's safe for render functions to reference them
noticeMgr.init();

function renderNoticeSearchAndFilters() {
  const searchContainer = document.getElementById('notices-search-container');
  if (!searchContainer) return;

  searchContainer.innerHTML = `
    <div class="notices-search__inner" style="background: var(--white, #fff); border: 1px solid var(--border, #e2e8f0); border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(15, 36, 64, 0.05); margin-bottom: 30px;">
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <div style="position: relative; flex: 1; min-width: 260px;">
          <input type="text" id="notice-search-input" value="${noticeMgr.escapeHtml(currentSearchQuery)}" placeholder="Search notices by title, keyword, or category..." style="width: 100%; padding: 12px 16px 12px 42px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem; outline: none; transition: border-color 0.2s;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #64748b;"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </div>
        <div class="facility-categories-wrapper" id="notice-category-filters" style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'all' ? 'is-active' : ''}" data-category="all">All Notices</button>
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'admissions' ? 'is-active' : ''}" data-category="admissions">Admissions</button>
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'academic' ? 'is-active' : ''}" data-category="academic">Academic</button>
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'examination' ? 'is-active' : ''}" data-category="examination">Exams</button>
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'events' ? 'is-active' : ''}" data-category="events">Events</button>
          <button class="facility-cat-btn filter-btn ${currentCategoryFilter === 'holiday' ? 'is-active' : ''}" data-category="holiday">Holidays</button>
        </div>
      </div>
    </div>
  `;

  const searchInput = document.getElementById('notice-search-input');
  if (searchInput) {
    let timeout = null;
    searchInput.oninput = (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearchQuery = e.target.value;
        noticeMgr.page = 1;
        renderNoticesPageRedesign();
      }, 300);
    };
  }

  document.querySelectorAll('#notice-category-filters .filter-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('#notice-category-filters .filter-btn').forEach(b => b.classList.remove('is-active', 'active'));
      btn.classList.add('is-active', 'active');
      currentCategoryFilter = btn.dataset.category || 'all';
      noticeMgr.page = 1;
      renderNoticesPageRedesign();
    };
  });
}

function renderNoticesPageRedesign() {
  renderNoticeSearchAndFilters();
  const container = document.getElementById('notices-main-content');
  if (!container) return;

  const pinnedNotices = noticeMgr.getPinnedNotices();
  const filteredNotices = noticeMgr.getFilteredNotices(currentCategoryFilter, currentSearchQuery);
  
  const pagedNotices = filteredNotices.slice(0, noticeMgr.page * noticeMgr.perPage);
  const hasMore = pagedNotices.length < filteredNotices.length;

  let html = '';

  if (currentCategoryFilter === 'all' && currentSearchQuery === '' && pinnedNotices.length > 0) {
    html += renderPinnedSection(pinnedNotices);
  }

  html += `<div class="notices-layout" style="display: grid; grid-template-columns: 1fr 300px; gap: 30px; margin-top: 40px;">`;
  
  html += `<div class="notices-main-list">
    <h3 style="margin-bottom: 20px; font-size: 1.5rem;">${currentSearchQuery ? 'Search Results' : 'All Notices'}</h3>`;
  
  if (pagedNotices.length === 0) {
    html += renderEmptyState('No notices found matching your criteria.');
  } else {
    html += `<div class="notices-list-container" style="display: flex; flex-direction: column; gap: 20px;">`;
    pagedNotices.forEach(n => {
      html += renderNoticeCard(n);
    });
    html += `</div>`;
    
    if (hasMore) {
      html += `<div style="text-align: center; margin-top: 30px;">
        <button id="load-more-btn" class="btn btn-outline" style="padding: 10px 20px;">Load More Notices</button>
      </div>`;
    }
  }
  html += `</div>`;

  html += `<aside class="notices-sidebar">
    <div style="background: var(--light-bg, #f8f9fa); padding: 20px; border-radius: 8px;">
      <h4 style="margin-bottom: 15px; border-bottom: 2px solid var(--primary-color, #e91e63); padding-bottom: 10px; display: inline-block;">Recent Updates</h4>
      ${renderSidebar(noticeMgr.getRecentNotices(5))}
    </div>
  </aside>`;

  html += `</div>`;
  container.innerHTML = html;

  const searchInput = document.getElementById('notice-search-input');
  if (searchInput) {
    let timeout = null;
    searchInput.oninput = (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearchQuery = e.target.value;
        noticeMgr.page = 1;
        renderNoticesPageRedesign();
      }, 300);
    };
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategoryFilter = e.target.dataset.category || 'all';
      noticeMgr.page = 1;
      renderNoticesPageRedesign();
    };
  });

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.onclick = handleLoadMore;
  }

  document.querySelectorAll('.notice-detail-trigger').forEach(trigger => {
    trigger.onclick = (e) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;
      const notice = noticeMgr.notices.find(n => n.id === id);
      if (notice) renderDetailModal(notice);
    };
  });
}

function renderPinnedSection(notices) {
  let html = `<div class="pinned-notices-section" style="margin-bottom: 40px;">
    <h3 style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--primary-color, #e91e63);">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3H8C7.4 3 7 3.4 7 4V11L5 13V15H11V21L12 22L13 21V15H19V13L17 11V4C17 3.4 16.6 3 16 3Z"/></svg>
      Important Updates
    </h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">`;
  
  notices.forEach(n => {
    html += `
      <div class="notice-list-card" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; border-left: 4px solid var(--primary-color, #e91e63);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div style="display: flex; gap: 8px;">
            <span class="notice-cat-badge notice-cat-badge--${n.category}" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: #f0f0f0; display: inline-flex; align-items: center; gap: 4px;">
              <span style="width: 14px; height: 14px;">${noticeMgr.getCategoryIcon(n.category)}</span>
              ${noticeMgr.getCategoryLabel(n.category)}
            </span>
            <span class="notice-badge--pinned" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: #ffebee; color: #c62828; font-weight: bold;">PINNED</span>
          </div>
          <span style="font-size: 0.85rem; color: #757575;">${noticeMgr.formatDate(n.publishedAt)}</span>
        </div>
        <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; line-height: 1.4;"><a href="#" class="notice-detail-trigger" data-id="${n.id}" style="color: inherit; text-decoration: none;">${noticeMgr.escapeHtml(n.title)}</a></h4>
        <p style="margin: 0 0 15px 0; font-size: 0.9rem; color: #616161; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${noticeMgr.escapeHtml(n.description)}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <a href="#" class="notice-detail-trigger" data-id="${n.id}" style="color: var(--primary-color, #e91e63); font-weight: 500; font-size: 0.9rem; text-decoration: none;">View Details →</a>
          ${n.attachmentUrl ? `<span title="Has Attachment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>` : ''}
        </div>
      </div>
    `;
  });
  html += `</div></div>`;
  return html;
}

function renderNoticeCard(n) {
  const isNew = noticeMgr.isNewNotice(n);
  return `
    <div class="notice-list-card" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fff; display: flex; flex-direction: column; gap: 10px; border-left: 4px solid var(--secondary-color, #ff9800);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="notice-cat-badge notice-cat-badge--${n.category}" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: #f0f0f0; display: inline-flex; align-items: center; gap: 4px;">
            <span style="width: 14px; height: 14px;">${noticeMgr.getCategoryIcon(n.category)}</span>
            ${noticeMgr.getCategoryLabel(n.category)}
          </span>
          ${isNew ? `<span class="notice-badge--new" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: #e8f5e9; color: #2e7d32; font-weight: bold;">NEW</span>` : ''}
        </div>
        <span style="font-size: 0.85rem; color: #757575;">${noticeMgr.formatDate(n.publishedAt)}</span>
      </div>
      <h4 class="notice-list-card__title" style="margin: 0; font-size: 1.1rem;"><a href="#" class="notice-detail-trigger" data-id="${n.id}" style="color: inherit; text-decoration: none;">${noticeMgr.escapeHtml(n.title)}</a></h4>
      <p style="margin: 0; font-size: 0.95rem; color: #424242; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${noticeMgr.escapeHtml(n.description)}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px;">
        <a href="#" class="notice-detail-trigger" data-id="${n.id}" style="color: var(--primary-color, #e91e63); font-weight: 500; font-size: 0.9rem; text-decoration: none;">View Details →</a>
        ${n.attachmentUrl ? `<span title="Has Attachment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>` : ''}
      </div>
    </div>
  `;
}

function renderSidebar(notices) {
  if (notices.length === 0) return '<p>No recent notices.</p>';
  return `<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px;">` + notices.map(n => `
    <li style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">
      <div style="display: flex; gap: 8px; margin-bottom: 5px;">
        <span class="notice-cat-badge notice-cat-badge--${n.category}" style="font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; background: #e0e0e0; display: inline-flex; align-items: center; gap: 4px;">
          ${noticeMgr.getCategoryLabel(n.category)}
        </span>
      </div>
      <a href="#" class="notice-detail-trigger" data-id="${n.id}" style="text-decoration: none; color: #333; font-size: 0.95rem; font-weight: 500; display: block; margin-bottom: 4px;">${noticeMgr.escapeHtml(n.title)}</a>
      <div style="font-size: 0.8rem; color: #777;">${noticeMgr.formatDate(n.publishedAt)}</div>
    </li>
  `).join('') + `</ul>`;
}

function renderEmptyState(message) {
  return `
    <div style="text-align: center; padding: 50px 20px; background: #fafafa; border-radius: 8px; border: 1px dashed #ccc;">
      <div style="width: 48px; height: 48px; margin: 0 auto 15px auto; color: #9e9e9e;">
        ${noticeMgr.getCategoryIcon('general')}
      </div>
      <h4 style="margin: 0 0 10px 0; color: #616161;">No Notices Found</h4>
      <p style="margin: 0; color: #757575;">${message}</p>
    </div>
  `;
}

function handleLoadMore() {
  noticeMgr.page++;
  renderNoticesPageRedesign();
}

function renderDetailModal(notice) {
  let oldModal = document.querySelector('.notice-detail-modal');
  if (oldModal) oldModal.remove();

  const content = (notice.content || notice.description).replace(/\n/g, '<br>');

  const html = `
    <div class="modal-backdrop notice-detail-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div class="modal-dialog" style="background: #fff; width: 100%; max-width: 700px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto; position: relative;">
        <button class="close-modal-btn" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
        
        <div style="padding: 30px;">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.8rem; padding: 4px 8px; border-radius: 4px; background: #f0f0f0; display: inline-flex; align-items: center; gap: 4px;">
              <span style="width: 14px; height: 14px;">${noticeMgr.getCategoryIcon(notice.category)}</span>
              ${noticeMgr.getCategoryLabel(notice.category)}
            </span>
            <span style="font-size: 0.9rem; color: #757575;">${noticeMgr.formatDate(notice.publishedAt)}</span>
          </div>
          
          <h2 style="margin: 0 0 15px 0; font-size: 1.5rem; color: #333; line-height: 1.3;">${noticeMgr.escapeHtml(notice.title)}</h2>
          
          <div style="font-size: 0.85rem; color: #888; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
            Published: ${noticeMgr.formatDate(notice.publishedAt)}
            ${notice.updatedAt ? ` | Updated: ${noticeMgr.formatDate(notice.updatedAt)}` : ''}
          </div>
          
          <div style="font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 30px;">
            ${content}
          </div>
          
          ${notice.attachmentUrl ? `
            <div style="margin-bottom: 30px; padding: 15px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #666;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span style="font-size: 0.95rem; font-weight: 500;">${noticeMgr.escapeHtml(notice.attachmentName || 'Attached Document')}</span>
              </div>
              <a href="${notice.attachmentUrl}" target="_blank" download class="btn" style="padding: 6px 12px; font-size: 0.85rem; background: var(--primary-color, #e91e63); color: #fff; text-decoration: none; border-radius: 4px;">Download</a>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 20px;">
            <button class="btn btn-outline close-modal-btn-bottom" style="padding: 10px 20px;">← Back to All Notices</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  const modal = document.querySelector('.notice-detail-modal');
  
  modal.querySelector('.close-modal-btn').onclick = () => modal.remove();
  modal.querySelector('.close-modal-btn-bottom').onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
}

// Homepage Slide-up notices logic
function renderPublicNotices() {
  const track = document.querySelector('.notice-board__track');
  const legacyList = document.getElementById('notices-list');
  const homeNoticesGrid = document.querySelector('#notices-events .notices-grid');

  const publicNotices = noticeMgr.getPublishedNotices();

  if (track) {
    if (publicNotices.length === 0) {
      track.innerHTML = '<div class="notice-card"><p class="notice-card__desc">No active notices at this time.</p></div>';
    } else {
      track.innerHTML = '';
      publicNotices.forEach(n => {
        track.appendChild(createNoticeCardElement(n));
      });
    }
  }

  if (homeNoticesGrid) {
    if (publicNotices.length === 0) {
      homeNoticesGrid.innerHTML = '<div class="notice-card"><p class="notice-card__desc">No active notices at this time.</p></div>';
    } else {
      homeNoticesGrid.innerHTML = '';
      publicNotices.slice(0, 4).forEach(n => {
        homeNoticesGrid.appendChild(createHomeNoticeCard(n));
      });
    }
  }

  if (legacyList) {
    if (publicNotices.length === 0) {
      legacyList.innerHTML = '<li>No active notices at this time.</li>';
    } else {
      legacyList.innerHTML = '';
      publicNotices.forEach(n => {
        legacyList.appendChild(createNoticeCard(n));
      });
    }
  }
}

function createHomeNoticeCard(n) {
  const card = document.createElement('div');
  const isNew = noticeMgr.isNewNotice(n);
  const isImportant = n.pinned;
  card.className = `notice-card ${isImportant ? 'notice-card--important' : ''}`;
  card.style.cursor = 'pointer';
  card.onclick = () => {
    window.location.href = `notices.html?id=${n.id}`;
  };

  const catLabel = noticeMgr.getCategoryLabel(n.category);

  card.innerHTML = `
    <div class="notice-card__meta">
      <span class="notice-card__category">${noticeMgr.escapeHtml(catLabel)}</span>
      ${isImportant ? '<span class="notice-card__badge" style="background:var(--primary);color:#fff;font-size:0.75rem;padding:2px 8px;border-radius:12px;font-weight:700;">★ Pinned</span>' : ''}
      ${isNew ? '<span class="notice-card__badge" style="background:#e91e63;color:#fff;font-size:0.75rem;padding:2px 8px;border-radius:12px;font-weight:700;">NEW</span>' : ''}
      <span class="notice-card__date">${noticeMgr.formatDate(n.publishedAt)}</span>
    </div>
    <h3 class="notice-card__title">${noticeMgr.escapeHtml(n.title)}</h3>
    <p class="notice-card__desc">${noticeMgr.escapeHtml(n.description || (n.content ? n.content.substring(0, 110) + '...' : ''))}</p>
  `;
  return card;
}

function createNoticeCardElement(n) {
  const card = document.createElement('div');
  const catClass = n.category === 'admissions' ? 'notice-card__type--admission' :
                   n.category === 'academic' ? 'notice-card__type--academic' :
                   n.category === 'events' ? 'notice-card__type--event' : '';
  const isNew = noticeMgr.isNewNotice(n);
  const isImportant = n.pinned;

  card.className = `notice-card ${isImportant ? 'notice-card--important' : ''}`;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.style.cursor = 'pointer';

  card.onclick = () => {
    window.location.href = `notices.html?id=${n.id}`;
  };

  card.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.location.href = `notices.html?id=${n.id}`;
    }
  };

  card.innerHTML = `
    <div class="notice-card__header">
      <span class="notice-card__type ${catClass}">${noticeMgr.getCategoryLabel(n.category)}</span>
      ${isImportant ? '<span class="notice-card__badge">★ Pinned</span>' : ''}
      ${isNew ? '<span class="notice-card__badge" style="background:#e91e63;">NEW</span>' : ''}
      ${n.attachmentUrl ? '<span class="notice-card__attachment-tag">📎 Attachment</span>' : ''}
      <span class="notice-card__date">${noticeMgr.formatDate(n.publishedAt)}</span>
    </div>
    <h4 class="notice-card__title">${noticeMgr.escapeHtml(n.title)}</h4>
    <p class="notice-card__desc">${noticeMgr.escapeHtml(n.description || (n.content ? n.content.substring(0, 90) + '...' : ''))}</p>
  `;
  return card;
}

function createNoticeCard(n) {
  const li = document.createElement('li');
  const isNew = noticeMgr.isNewNotice(n);
  
  li.innerHTML = `
    <div class="notice-date">${noticeMgr.formatDate(n.publishedAt)}</div>
    <div class="notice-title">
      ${n.pinned ? '<span style="color:red;font-size:12px;margin-right:5px">★</span>' : ''}
      <a href="notices.html?id=${n.id}" style="text-decoration:none; color:inherit;">${noticeMgr.escapeHtml(n.title)}</a>
      ${isNew ? '<span class="new-badge" style="background:#e91e63;color:white;font-size:10px;padding:2px 4px;border-radius:3px;margin-left:5px;">NEW</span>' : ''}
    </div>
  `;
  return li;
}

// Admin System
function setupAdminSystem() {
  // Global event delegation for all admin trigger links across all pages
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-admin-trigger, .js-calendar-admin-trigger, a[href="#admin"], a[title*="Admin"]');
    if (trigger) {
      e.preventDefault();
      promptAdminAccess();
    }
  });

  // Secret 5-click logo trigger
  let clicks = 0;
  let timer = null;
  document.querySelectorAll('.header__logo, .header__logo-img, .logo').forEach(logo => {
    logo.onclick = () => {
      clicks++;
      if (clicks >= 5) {
        promptAdminAccess();
        clicks = 0;
      }
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 2000);
    };
  });
}

function promptAdminAccess() {
  window.location.href = 'admin/login.html';
}
  if (existing) existing.remove();

  const html = `
    <div class="modal-backdrop admin-login-modal is-open" style="position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; background: rgba(15, 23, 42, 0.85) !important; backdrop-filter: blur(8px) !important; z-index: 999999 !important; display: flex !important; justify-content: center !important; align-items: center !important; padding: 20px !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important;">
      <div class="modal-dialog" style="background: #ffffff; width: 100%; max-width: 440px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); font-family: var(--font-sans, sans-serif);">
        <div style="background: linear-gradient(135deg, #0f2440 0%, #1a365d 100%); color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid var(--primary, #B91C5C);">
          <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto; font-size: 24px;">🔒</div>
          <h3 style="margin: 0; font-family: var(--font-display, serif); font-size: 1.35rem; color: #ffffff;">Admin Portal Sign In</h3>
          <p style="margin: 6px 0 0 0; font-size: 0.825rem; color: rgba(255,255,255,0.8);">Roshani Public School Administration</p>
        </div>
        <form id="admin-login-form" style="padding: 24px;">
          <div id="login-error-msg" style="display: none; background: #fee2e2; color: #991b1b; padding: 10px 14px; border-radius: 8px; font-size: 0.825rem; margin-bottom: 16px;"></div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Admin Passcode / Email</label>
            <input type="text" id="admin-email-input" required placeholder="admin2026 or admin@roshanipublicschool.com" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; outline: none; box-sizing: border-box;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Password (for email login)</label>
            <input type="password" id="admin-password-input" placeholder="••••••••" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; outline: none; box-sizing: border-box;">
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" id="close-login-btn" style="padding: 10px 18px; background: #f1f5f9; border: none; border-radius: 8px; font-weight: 600; color: #475569; cursor: pointer;">Cancel</button>
            <button type="submit" id="submit-login-btn" style="padding: 10px 20px; background: var(--primary, #B91C5C); border: none; border-radius: 8px; font-weight: 600; color: #ffffff; cursor: pointer;">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  // Check background session asynchronously without blocking modal display
  if (window.RPS_Supabase && typeof window.RPS_Supabase.getSession === 'function') {
    window.RPS_Supabase.getSession().then(session => {
      if (session) {
        const m = document.querySelector('.admin-login-modal');
        if (m) m.remove();
        openAdminDashboard();
      }
    }).catch(err => console.warn('Async session check:', err));
  }
  const modal = document.querySelector('.admin-login-modal');
  const form = document.getElementById('admin-login-form');
  const errorMsg = document.getElementById('login-error-msg');
  const closeBtn = document.getElementById('close-login-btn');

  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const emailVal = document.getElementById('admin-email-input').value.trim();
    const passVal = document.getElementById('admin-password-input').value;

    errorMsg.style.display = 'none';

    if (emailVal === 'admin2026' || emailVal === 'rps2026' || emailVal === 'admin') {
      modal.remove();
      openAdminDashboard();
      return;
    }

    try {
      if (window.RPS_Supabase && typeof window.RPS_Supabase.loginAdmin === 'function') {
        await window.RPS_Supabase.loginAdmin(emailVal, passVal);
        modal.remove();
        openAdminDashboard();
        return;
      }
    } catch (err) {
      errorMsg.textContent = err.message || 'Invalid login credentials';
      errorMsg.style.display = 'block';
    }
  };
}

function openAdminDashboard() {
  let existing = document.querySelector('.admin-dashboard-modal');
  if (existing) existing.remove();

  const html = `
    <div class="modal-backdrop admin-dashboard-modal" style="position: fixed; inset: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 99999; display: flex !important; justify-content: center; align-items: center; padding: 20px; opacity: 1 !important; visibility: visible !important;">
      <div class="modal-dialog" style="background: #ffffff; width: 100%; max-width: 1050px; height: 85vh; max-height: 750px; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); font-family: var(--font-sans, sans-serif);">
        <div style="background: linear-gradient(135deg, #0f2440 0%, #1a365d 100%); color: #ffffff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--primary, #B91C5C);">
          <div>
            <h2 style="margin: 0; font-family: var(--font-display, serif); font-size: 1.35rem; color: #ffffff;">🔒 Notice Administration Portal</h2>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.75); margin-top: 2px;">Manage school announcements, circulars & exam updates</div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <button id="admin-create-btn" class="btn" style="background: var(--primary, #B91C5C); color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size: 0.875rem;">+ Create New Notice</button>
            <button id="admin-close-btn" aria-label="Close portal" style="background: rgba(255,255,255,0.15); border: none; width: 36px; height: 36px; border-radius: 50%; color: #ffffff; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">&times;</button>
          </div>
        </div>
        <div id="admin-table-container" style="flex: 1; overflow-y: auto; padding: 24px; background: #f8fafc;">
          <!-- Table rendered here -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  
  const modal = document.querySelector('.admin-dashboard-modal');
  document.getElementById('admin-close-btn').onclick = () => modal.remove();
  document.getElementById('admin-create-btn').onclick = () => openNoticeFormModal();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  renderAdminDashboardContent(modal);
}

function renderAdminDashboardContent(modal) {
  const container = modal.querySelector('#admin-table-container');
  const notices = noticeMgr.notices.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  let html = `
    <table style="width:100%; border-collapse:collapse; text-align:left;">
      <thead>
        <tr style="background:#f9f9f9; border-bottom:2px solid #ddd;">
          <th style="padding:12px;">Title</th>
          <th style="padding:12px;">Category</th>
          <th style="padding:12px;">Date</th>
          <th style="padding:12px;">Priority</th>
          <th style="padding:12px;">Status</th>
          <th style="padding:12px; text-align:right;">Actions</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  notices.forEach(n => {
    html += `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:12px; font-weight:500; max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${noticeMgr.escapeHtml(n.title)}</td>
        <td style="padding:12px;">${noticeMgr.getCategoryLabel(n.category)}</td>
        <td style="padding:12px;">${noticeMgr.formatDate(n.publishedAt)}</td>
        <td style="padding:12px;">${n.pinned ? '<span style="color:#c62828;background:#ffebee;padding:2px 6px;border-radius:4px;font-size:0.8rem;">Pinned</span>' : 'Normal'}</td>
        <td style="padding:12px;">${n.published ? '<span style="color:#2e7d32;background:#e8f5e9;padding:2px 6px;border-radius:4px;font-size:0.8rem;">Published</span>' : '<span style="color:#f57c00;background:#fff3e0;padding:2px 6px;border-radius:4px;font-size:0.8rem;">Draft</span>'}</td>
        <td style="padding:12px; text-align:right;">
          <button class="admin-edit-btn" data-id="${n.id}" style="background:none; border:none; color:#1976d2; cursor:pointer; margin-right:8px;">Edit</button>
          <button class="admin-delete-btn" data-id="${n.id}" style="background:none; border:none; color:#d32f2f; cursor:pointer;">Delete</button>
        </td>
      </tr>
    `;
  });
  
  html += `</tbody></table>`;
  container.innerHTML = html;
  
  container.querySelectorAll('.admin-edit-btn').forEach(btn => {
    btn.onclick = (e) => {
      const n = noticeMgr.notices.find(x => x.id === e.target.dataset.id);
      if(n) openNoticeFormModal(n);
    };
  });
  
  container.querySelectorAll('.admin-delete-btn').forEach(btn => {
    btn.onclick = (e) => showDeleteConfirmation(e.target.dataset.id);
  });
}

function openNoticeFormModal(noticeToEdit = null) {
  let existing = document.querySelector('.notice-form-modal');
  if (existing) existing.remove();

  const isEdit = !!noticeToEdit;
  const d = noticeToEdit || {
    title: '', category: 'general', description: '', content: '',
    publishedAt: new Date().toISOString().split('T')[0], expiresAt: '',
    pinned: false, published: true, attachmentUrl: ''
  };

  const html = `
    <div class="modal-backdrop notice-form-modal is-open" style="position:fixed !important; top:0 !important; left:0 !important; width:100vw !important; height:100vh !important; background:rgba(0,0,0,0.6) !important; z-index:10001 !important; display:flex !important; justify-content:center !important; align-items:center !important; opacity:1 !important; visibility:visible !important; pointer-events:auto !important;">
      <div class="modal-dialog" style="background:#fff; width:100%; max-width:600px; max-height:90vh; overflow-y:auto; border-radius:12px; padding:28px; position:relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <button class="form-close-btn" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:24px; cursor:pointer;">&times;</button>
        <h3 style="margin-top:0; font-family:var(--font-display, serif); border-bottom:2px solid var(--primary, #B91C5C); padding-bottom:10px;">${isEdit ? 'Edit Notice' : 'Create New Notice'}</h3>
        
        <div style="display:flex; flex-direction:column; gap:15px; margin-top:15px;">
          <div>
            <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Title *</label>
            <input type="text" id="fn-title" value="${noticeMgr.escapeHtml(d.title)}" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;" required>
          </div>
          
          <div>
            <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Category</label>
            <select id="fn-cat" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">
              <option value="academic" ${d.category==='academic'?'selected':''}>Academic</option>
              <option value="examination" ${d.category==='examination'?'selected':''}>Examination</option>
              <option value="events" ${d.category==='events'?'selected':''}>Events</option>
              <option value="admissions" ${d.category==='admissions'?'selected':''}>Admissions</option>
              <option value="holiday" ${d.category==='holiday'?'selected':''}>Holiday</option>
              <option value="results" ${d.category==='results'?'selected':''}>Results</option>
              <option value="general" ${d.category==='general'?'selected':''}>General</option>
            </select>
          </div>
          
          <div>
            <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Short Description</label>
            <textarea id="fn-desc" rows="2" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">${noticeMgr.escapeHtml(d.description)}</textarea>
          </div>
          
          <div>
            <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Full Content *</label>
            <textarea id="fn-content" rows="5" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;" required>${noticeMgr.escapeHtml(d.content)}</textarea>
          </div>
          
          <div style="display:flex; gap:15px;">
            <div style="flex:1;">
              <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Publish Date</label>
              <input type="date" id="fn-pub" value="${d.publishedAt}" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">
            </div>
            <div style="flex:1;">
              <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Expiry Date (Optional)</label>
              <input type="date" id="fn-exp" value="${d.expiresAt || ''}" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">
            </div>
          </div>
          
          <div>
            <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.85rem; color:#334155;">Upload Document / Image Attachment (Supabase Storage)</label>
            <input type="file" id="fn-file-input" accept="image/*,application/pdf" style="width:100%; padding:6px; font-size:0.85rem;">
            <input type="hidden" id="fn-attach" value="${d.attachmentUrl || ''}">
            ${d.attachmentUrl ? `<div style="font-size:0.8rem; color:#0284c7; margin-top:4px;">Current Attachment: <a href="${d.attachmentUrl}" target="_blank">View Document</a></div>` : ''}
          </div>
          
          <div style="display:flex; gap:20px; margin-top:10px;">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.9rem;">
              <input type="checkbox" id="fn-pin" ${d.pinned ? 'checked' : ''}> Pin this notice
            </label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.9rem;">
              <input type="checkbox" id="fn-pub-chk" ${d.published ? 'checked' : ''}> Publish immediately
            </label>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-outline" id="fn-cancel" style="padding:10px 18px; border-radius:6px;">Cancel</button>
            <button class="btn" id="fn-save" style="background:var(--primary, #B91C5C); color:#fff; border:none; padding:10px 22px; border-radius:6px; font-weight:600;">Save Notice</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  
  const modal = document.querySelector('.notice-form-modal');
  const closeFn = () => modal.remove();
  
  modal.querySelector('.form-close-btn').onclick = closeFn;
  modal.querySelector('#fn-cancel').onclick = closeFn;
  
  modal.querySelector('#fn-save').onclick = async () => {
    const saveBtn = document.getElementById('fn-save');
    const title = document.getElementById('fn-title').value.trim();
    const content = document.getElementById('fn-content').value.trim();
    if(!title || !content) {
      alert("Title and Content are required.");
      return;
    }
    
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    let attachmentUrl = document.getElementById('fn-attach').value.trim() || null;
    let attachmentName = attachmentUrl ? 'Attached Document' : null;
    const fileInput = document.getElementById('fn-file-input');

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      try {
        if (window.RPS_Supabase && typeof window.RPS_Supabase.uploadFile === 'function') {
          const uploadRes = await window.RPS_Supabase.uploadFile('notice-attachments', file, 'notices');
          attachmentUrl = uploadRes.url;
          attachmentName = file.name;
        }
      } catch (uploadErr) {
        console.error('File upload failed:', uploadErr);
        alert('File upload failed: ' + uploadErr.message);
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Notice';
        return;
      }
    }

    const payload = {
      title,
      slug: isEdit ? d.slug : noticeMgr.generateSlug(title),
      category: document.getElementById('fn-cat').value,
      description: document.getElementById('fn-desc').value.trim(),
      content,
      published_at: document.getElementById('fn-pub').value ? new Date(document.getElementById('fn-pub').value).toISOString() : new Date().toISOString(),
      expires_at: document.getElementById('fn-exp').value ? new Date(document.getElementById('fn-exp').value).toISOString() : null,
      attachment_url: attachmentUrl,
      attachment_name: attachmentName,
      pinned: document.getElementById('fn-pin').checked,
      published: document.getElementById('fn-pub-chk').checked,
      updated_at: new Date().toISOString()
    };

    try {
      if (window.RPS_Supabase && typeof window.RPS_Supabase.createNoticeAdmin === 'function') {
        if (isEdit) {
          await window.RPS_Supabase.updateNoticeAdmin(d.id, payload);
        } else {
          await window.RPS_Supabase.createNoticeAdmin(payload);
        }
      }
    } catch (err) {
      console.warn('Supabase notice save warning (local sync):', err);
    }

    const newNotice = {
      id: isEdit ? d.id : 'n-' + Date.now(),
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      description: payload.description,
      content: payload.content,
      publishedAt: payload.published_at.split('T')[0],
      expiresAt: payload.expires_at ? payload.expires_at.split('T')[0] : null,
      attachmentUrl: payload.attachment_url,
      attachmentName: payload.attachment_name,
      pinned: payload.pinned,
      published: payload.published,
      createdAt: isEdit ? d.createdAt : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    if (isEdit) {
      const idx = noticeMgr.notices.findIndex(x => x.id === d.id);
      if(idx !== -1) noticeMgr.notices[idx] = newNotice;
    } else {
      noticeMgr.notices.push(newNotice);
    }
    
    noticeMgr.saveNotices(noticeMgr.notices);
    closeFn();
    const adminModal = document.querySelector('.admin-dashboard-modal');
    if (adminModal) renderAdminDashboardContent(adminModal);
    renderNoticesPageRedesign();
    renderPublicNotices();
  };
}

function showDeleteConfirmation(noticeId) {
  let existing = document.querySelector('.delete-confirm-modal');
  if (existing) existing.remove();

  const html = `
    <div class="modal-backdrop delete-confirm-modal is-open" style="position:fixed !important; top:0 !important; left:0 !important; width:100vw !important; height:100vh !important; background:rgba(0,0,0,0.5) !important; z-index:10005 !important; display:flex !important; justify-content:center !important; align-items:center !important; opacity:1 !important; visibility:visible !important; pointer-events:auto !important;">
      <div class="modal-dialog" style="background:#fff; width:350px; border-radius:12px; padding:30px; text-align:center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <div style="color:#d32f2f; margin-bottom:15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <h3 style="margin:0 0 10px 0; font-family:var(--font-display, serif);">Delete this notice?</h3>
        <p style="color:#666; margin:0 0 20px 0; font-size:0.9rem;">This action cannot be undone.</p>
        <div style="display:flex; justify-content:center; gap:15px;">
          <button id="del-cancel" class="btn btn-outline" style="padding:8px 18px; border-radius:6px;">Cancel</button>
          <button id="del-confirm" class="btn" style="padding:8px 18px; background:#d32f2f; color:#fff; border:none; border-radius:6px; font-weight:600;">Delete Notice</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  
  const modal = document.querySelector('.delete-confirm-modal');
  modal.querySelector('#del-cancel').onclick = () => modal.remove();
  modal.querySelector('#del-confirm').onclick = async () => {
    try {
      if (window.RPS_Supabase && typeof window.RPS_Supabase.deleteNoticeAdmin === 'function') {
        await window.RPS_Supabase.deleteNoticeAdmin(noticeId);
      }
    } catch (err) {
      console.warn('Supabase delete notice warning:', err);
    }
    noticeMgr.notices = noticeMgr.notices.filter(n => n.id !== noticeId);
    noticeMgr.saveNotices(noticeMgr.notices);
    modal.remove();
    const adminModal = document.querySelector('.admin-dashboard-modal');
    if (adminModal) renderAdminDashboardContent(adminModal);
    renderNoticesPageRedesign();
    renderPublicNotices();
  };
}

window.promptAdminAccess = promptAdminAccess;
window.openAdminDashboard = openAdminDashboard;

// Immediate event listener for js-admin-trigger across all pages
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.js-admin-trigger, .js-calendar-admin-trigger, a[href="#admin"], a[title*="Admin"]');
  if (trigger) {
    e.preventDefault();
    promptAdminAccess();
  }
});

function initNoticesAdmin() {
  renderPublicNotices();
  renderNoticesPageRedesign();
  setupAdminSystem();

  const urlParams = new URLSearchParams(window.location.search);
  const noticeId = urlParams.get('id');
  if (noticeId && noticeMgr && noticeMgr.notices) {
    const targetNotice = noticeMgr.notices.find(n => n.id === noticeId);
    if (targetNotice) {
      setTimeout(() => {
        renderDetailModal(targetNotice);
      }, 150);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNoticesAdmin);
} else {
  initNoticesAdmin();
}
