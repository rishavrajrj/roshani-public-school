/**
 * ROSHANI PUBLIC SCHOOL — PUBLIC DATA AUTO-HYDRATOR (js/public-app.js)
 * Single Source of Truth Hydration Engine for Public Website.
 * Automatically fetches authoritative school settings from Supabase DB
 * and populates all matching [data-rps-info] DOM nodes across public pages.
 */

(function () {
  'use strict';

  const CACHE_KEY = 'rps_public_school_info_cache';
  const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minute soft cache

  let currentSchoolData = null;

  /**
   * Fetch Authoritative School Settings with session caching
   */
  async function fetchSchoolData(forceFresh = false) {
    if (!forceFresh && currentSchoolData) {
      return currentSchoolData;
    }

    // Try Session Storage Cache if not forced fresh
    if (!forceFresh) {
      try {
        const cachedStr = sessionStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cachedObj = JSON.parse(cachedStr);
          if (cachedObj.timestamp && (Date.now() - cachedObj.timestamp < CACHE_TTL_MS)) {
            currentSchoolData = cachedObj.data;
            return currentSchoolData;
          }
        }
      } catch (e) {
        console.warn('[RPS Data Engine] Cache read error:', e);
      }
    }

    // Fetch live from Supabase DB (with GitHub repository file fallback)
    try {
      if (window.RPS_Supabase && typeof window.RPS_Supabase.getSchoolInformation === 'function') {
        const liveData = await window.RPS_Supabase.getSchoolInformation();
        if (liveData) {
          currentSchoolData = liveData;
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: liveData
            }));
          } catch (e) {}
          return currentSchoolData;
        }
      }
    } catch (err) {
      console.warn('[RPS Data Engine] Database fetch failed, attempting GitHub repo JSON fallback:', err);
    }

    // Direct Repository JSON Fetch Fallback (data/school-information.json)
    try {
      const dataUrl = (window.location.pathname.includes('/admin/') ? '../' : '') + 'data/school-information.json';
      const repoRes = await fetch(dataUrl, { cache: 'no-cache' });
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        if (repoData) {
          currentSchoolData = repoData;
          return currentSchoolData;
        }
      }
    } catch (repoErr) {
      console.warn('[RPS Data Engine] GitHub repo JSON fetch failed:', repoErr);
    }

    if (!currentSchoolData && window.RPS_Supabase && window.RPS_Supabase.DEFAULT_SCHOOL_INFO) {
      currentSchoolData = window.RPS_Supabase.DEFAULT_SCHOOL_INFO;
    }

    return currentSchoolData;
  }

  /**
   * Format Phone Numbers nicely for display
   */
  function cleanPhone(phoneStr) {
    if (!phoneStr) return '';
    return phoneStr.replace(/[^\d+]/g, '');
  }

  /**
   * Hydrate all [data-rps-info] elements on the page
   */

  async function hydratePublicPage(forceFresh = false) {
    const data = await fetchSchoolData(forceFresh);
    if (!data) return;

    // Normalize database column keys (e.g. principal_photo_url -> principal_photo)
    const normalizedData = {
      ...data,
      principal_photo: data.principal_photo_url || data.principal_photo,
      school_logo: data.school_logo_url || data.school_logo
    };

    const elements = document.querySelectorAll('[data-rps-info]');
    elements.forEach(el => {
      const key = el.getAttribute('data-rps-info');
      if (!key) return;

      const val = normalizedData[key];
      if (val === undefined || val === null || val === '') return;

      switch (key) {
        case 'school_name':
          if (el.tagName === 'IMG') {
            el.alt = val;
          } else {
            el.textContent = val;
          }
          break;

        case 'school_logo':
        case 'school_logo_url':
          if (el.tagName === 'IMG') {
            el.src = val;
          }
          break;

        case 'phone':
        case 'office_phone':
        case 'admission_contact':
          if (el.tagName === 'A') {
            el.href = `tel:${cleanPhone(val)}`;
            const svgOrElement = el.querySelector('svg, img, i, span');
            if (svgOrElement) {
              Array.from(el.childNodes).forEach(n => {
                if (n.nodeType === Node.TEXT_NODE) el.removeChild(n);
              });
              if (!el.contains(svgOrElement)) el.appendChild(svgOrElement);
              el.appendChild(document.createTextNode(' ' + val));
            } else {
              el.textContent = val;
            }
          } else {
            el.textContent = val;
          }
          break;

        case 'email':
          if (el.tagName === 'A') {
            el.href = `mailto:${val}`;
            const svgOrElement = el.querySelector('svg, img, i, span');
            if (svgOrElement) {
              Array.from(el.childNodes).forEach(n => {
                if (n.nodeType === Node.TEXT_NODE) el.removeChild(n);
              });
              if (!el.contains(svgOrElement)) el.appendChild(svgOrElement);
              el.appendChild(document.createTextNode(' ' + val));
            } else {
              el.textContent = val;
            }
          } else {
            el.textContent = val;
          }
          break;

        case 'website_title':
          if (val) document.title = val;
          break;

        case 'footer_copyright':
          if (val) el.textContent = val;
          break;

        case 'academic_session':
          if (val) el.textContent = val;
          break;

        case 'admission_status':
          if (val) {
            const statusMap = {
              'closing_soon': 'Admissions Closing Soon',
              'closed': 'Admissions Closed',
              'commencing_soon': 'Admissions Commencing Soon',
              'open': 'Admissions Open'
            };
            el.textContent = statusMap[val] || 'Admissions Open';
          }
          break;

        case 'principal_photo':
        case 'principal_photo_url':
          if (el.tagName === 'IMG') {
            el.src = val;
          }
          break;

        case 'principal_message':
        case 'about':
        case 'vision':
        case 'mission':
        case 'values':
          // Preserve formatted line breaks for longer texts if desired
          if (el.dataset.formatHtml === 'true') {
            el.innerHTML = val.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
          } else {
            el.textContent = val;
          }
          break;

        default:
          el.textContent = val;
          break;
      }
    });

    // Dynamic Admission Status & Session Hydration for Banner/Badges
    const statusKey = normalizedData.admission_status || 'open';
    const statusMap = {
      'closing_soon': 'Admissions Closing Soon',
      'closed': 'Admissions Closed',
      'commencing_soon': 'Admissions Commencing Soon',
      'open': 'Admissions Open'
    };
    const statusTitle = statusMap[statusKey] || 'Admissions Open';
    const sessionYear = normalizedData.academic_session || '2026-2027';
    const sessionShort = sessionYear.replace(/(\d{4})[-–](\d{2})\d{2}/, '$1–$2');

    const announcementText = `${statusTitle} — Academic Session ${sessionShort} | Nursery to Class XII`;
    const badgeText = `${statusTitle} ${sessionShort}`;

    // Update Announcement Bars (.announcement-bar__message, [data-rps-info="announcement_bar"])
    const announcementEls = document.querySelectorAll('.announcement-bar__message, [data-rps-info="announcement_bar"]');
    announcementEls.forEach(el => {
      const pulseDot = el.querySelector('.pulse-dot');
      Array.from(el.childNodes).forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) el.removeChild(n);
      });
      if (pulseDot) {
        if (!el.contains(pulseDot)) el.appendChild(pulseDot);
        if (statusKey === 'closed') {
          pulseDot.style.background = '#ef4444';
          pulseDot.style.boxShadow = '0 0 0 0 rgba(239, 68, 68, 0.7)';
        } else if (statusKey === 'closing_soon') {
          pulseDot.style.background = '#f59e0b';
          pulseDot.style.boxShadow = '0 0 0 0 rgba(245, 158, 11, 0.7)';
        } else {
          pulseDot.style.background = '#22c55e';
          pulseDot.style.boxShadow = '0 0 0 0 rgba(34, 197, 94, 0.7)';
        }
      }
      el.appendChild(document.createTextNode(' ' + announcementText));
    });

    // Update Footer Badges & CTA Badges (.footer__badge, [data-rps-info="admission_cta_badge"])
    const badgeEls = document.querySelectorAll('.footer__badge, [data-rps-info="admission_cta_badge"]');
    badgeEls.forEach(el => {
      const badgeDot = el.querySelector('.footer__badge-dot, .pulse-dot, svg, img, i, span');
      Array.from(el.childNodes).forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) el.removeChild(n);
      });
      if (badgeDot && !el.contains(badgeDot)) el.appendChild(badgeDot);
      el.appendChild(document.createTextNode(' ' + badgeText));
    });

    // Update LD+JSON Structured Data Schema if present
    updateLdJsonSchema(normalizedData);
  }

  /**
   * Update JSON-LD Schema on Public Pages
   */
  function updateLdJsonSchema(data) {
    const ldScript = document.querySelector('script[type="application/ld+json"]');
    if (!ldScript) return;
    try {
      const schema = JSON.parse(ldScript.textContent);
      if (schema && schema['@type'] === 'School') {
        if (data.school_name) schema.name = data.school_name;
        if (data.email) schema.email = data.email;
        if (data.phone) schema.telephone = [data.phone, data.office_phone, data.admission_contact].filter(Boolean);
        if (data.address && schema.address) schema.address.streetAddress = data.address;
        ldScript.textContent = JSON.stringify(schema, null, 2);
      }
    } catch (e) {
      console.warn('[RPS Data Engine] LD+JSON update skipped:', e);
    }
  }

  // Cross-Tab & Admin Invalidation Storage Listener
  window.addEventListener('storage', (e) => {
    if (e.key === 'rps_public_data_updated') {
      sessionStorage.removeItem(CACHE_KEY);
      currentSchoolData = null;
      hydratePublicPage(true);
    }
    if (e.key === 'rps_global_zoom_level' && e.newValue) {
      applyPublicZoom(parseFloat(e.newValue));
    }
  });

  // Global Zoom Hydration Engine for Public Website
  function applyPublicZoom(val) {
    if (!val || isNaN(val)) return;
    const decimalZoom = (val / 100).toString();
    try {
      if (document.documentElement) document.documentElement.style.zoom = decimalZoom;
      if (document.body) document.body.style.zoom = decimalZoom;
    } catch (e) {}
  }

  try {
    const savedZoom = localStorage.getItem('rps_global_zoom_level');
    if (savedZoom) applyPublicZoom(parseFloat(savedZoom));
  } catch (e) {}

  // Export to Global
  window.RPS_PublicApp = {
    hydrate: hydratePublicPage,
    fetchData: fetchSchoolData,
    clearCache: function() {
      sessionStorage.removeItem(CACHE_KEY);
      currentSchoolData = null;
    }
  };

  // Run auto-hydration on page DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hydratePublicPage());
  } else {
    hydratePublicPage();
  }

})();
