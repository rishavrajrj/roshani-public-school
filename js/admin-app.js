/**
 * ROSHANI PUBLIC SCHOOL — ADMIN PORTAL CORE SCRIPT (js/admin-app.js)
 * Handles Auth Guards, Shared UI, Sidebar Navigation, Toast Notifications & Activity Logging.
 */

(function () {
  // Check Auth & Redirect if unauthenticated
  async function checkAuth(requiresSuperAdmin = false) {
    try {
      const isPasscodeSession = sessionStorage.getItem('rps_admin_session') === 'true' || localStorage.getItem('rps_admin_session') === 'true';
      let session = null;
      if (window.RPS_Supabase) {
        session = await window.RPS_Supabase.getSession();
      }
      if (!session && !isPasscodeSession) {
        const path = window.location.pathname;
        if (!path.includes('login')) {
          window.location.href = 'login.html';
        }
        return null;
      }
      const profile = await window.RPS_Supabase.getCurrentProfile();
      if (requiresSuperAdmin && profile && profile.role !== 'super_admin') {
        alert('Access Denied: Super Admin privileges required.');
        window.location.href = 'index.html';
        return null;
      }
      return { session, profile };
    } catch (err) {
      console.error('Auth guard check error:', err);
      const isPasscodeSession = sessionStorage.getItem('rps_admin_session') === 'true' || localStorage.getItem('rps_admin_session') === 'true';
      if (!isPasscodeSession && !window.location.pathname.includes('login')) {
        window.location.href = 'login.html';
      }
      return null;
    }
  }

  // Sidebar Mobile Toggle & Active Link Highlight
  function initAdminSidebar() {
    const toggleBtn = document.getElementById('admin-sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.onclick = () => sidebar.classList.toggle('is-open');
    }

    // Highlight current page dynamically
    const path = window.location.pathname;
    document.querySelectorAll('.admin-sidebar__link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const cleanHref = href.split('/').pop().replace('.html', '');
      const cleanPath = path.split('/').pop().replace('.html', '') || 'index';
      if (cleanHref === cleanPath || (cleanPath === '' && cleanHref === 'index')) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    // Handle logout click
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.onclick = async (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out of the Admin Portal?')) {
          sessionStorage.removeItem('rps_admin_session');
          localStorage.removeItem('rps_admin_session');
          if (window.RPS_Supabase) {
            await window.RPS_Supabase.logoutAdmin();
          }
          window.location.href = 'login.html';
        }
      };
    }
  }

  // Toast Notifications
  function showToast(message, type = 'success') {
    let container = document.querySelector('.admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `admin-toast admin-toast--${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '⚠️'}</span>
      <div>${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // Activity Logger
  async function logActivity(action, resourceType, resourceId = null, details = '') {
    if (window.RPS_Supabase && typeof window.RPS_Supabase.logActivityAdmin === 'function') {
      await window.RPS_Supabase.logActivityAdmin(action, resourceType, resourceId, details);
    }
  }

  // Format Helper Methods
  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Export to Global window object
  window.RPS_Admin = {
    checkAuth,
    initAdminSidebar,
    showToast,
    logActivity,
    formatDate,
    escapeHtml
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAdminSidebar();
  });
})();
