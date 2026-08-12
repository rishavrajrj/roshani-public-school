/**
 * ROSHANI PUBLIC SCHOOL — DEMO BANNER COMPONENT
 * 
 * Reusable component for displaying the temporary Portfolio Demo / Client Review banner.
 * Conditionally rendered based on global window.NEXT_PUBLIC_DEMO_MODE setting.
 * 
 * When NEXT_PUBLIC_DEMO_MODE = true  -> Renders demo banner.
 * When NEXT_PUBLIC_DEMO_MODE = false -> Completely hides/removes banner.
 */

(function () {
  'use strict';

  function isDemoModeEnabled() {
    if (typeof window.NEXT_PUBLIC_DEMO_MODE !== 'undefined') {
      return String(window.NEXT_PUBLIC_DEMO_MODE).toLowerCase() === 'true';
    }
    return false;
  }

  function ensureStylesheetLoaded() {
    if (document.getElementById('rps-demo-banner-css')) return;
    
    // Determine path relative to root or admin subfolder
    var isAdminPath = window.location.pathname.indexOf('/admin/') !== -m1 && window.location.pathname.indexOf('/admin/') !== -1;
    var cssPath = isAdminPath ? '../css/demo-banner.css' : 'css/demo-banner.css';

    var link = document.createElement('link');
    link.id = 'rps-demo-banner-css';
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
  }

  function renderDemoBanner() {
    var existing = document.getElementById('rps-demo-banner');

    if (!isDemoModeEnabled()) {
      if (existing) {
        existing.remove();
      }
      return;
    }

    if (existing) return; // Already rendered

    ensureStylesheetLoaded();

    var banner = document.createElement('div');
    banner.id = 'rps-demo-banner';
    banner.className = 'rps-demo-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Portfolio Preview Banner');
    banner.innerHTML = `
      <div class="rps-demo-banner__container">
        <div class="rps-demo-banner__badge">
          <span class="rps-demo-banner__dot"></span>
          <span>PROJECT DEMO • PORTFOLIO PREVIEW</span>
        </div>
        <p class="rps-demo-banner__text">
          This website is a project preview developed by <strong>RSM Technologies</strong> and is currently under client review.
        </p>
      </div>
    `;

    if (document.body) {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  // Handle fix for typo in isAdminPath helper
  function init() {
    var isAdminPath = window.location.pathname.includes('/admin/');
    var cssPath = isAdminPath ? '../css/demo-banner.css' : 'css/demo-banner.css';

    if (isDemoModeEnabled()) {
      if (!document.getElementById('rps-demo-banner-css')) {
        var link = document.createElement('link');
        link.id = 'rps-demo-banner-css';
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
      }
      renderDemoBanner();
    } else {
      var existing = document.getElementById('rps-demo-banner');
      if (existing) existing.remove();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global component interface
  window.RPS_DemoBanner = {
    render: init,
    isDemo: isDemoModeEnabled
  };
})();
