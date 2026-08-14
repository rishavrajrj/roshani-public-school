/**
 * ROSHANI PUBLIC SCHOOL — ADMIN PORTAL CORE SCRIPT (js/admin-app.js)
 * Handles Auth Guards, Two-Role Sidebar Navigation, Badges, Toast Notifications & Activity Logging.
 * 
 * Strict Two-Role System:
 * - super_admin : Access to everything including Users (/admin/users.html) and Audit Log (/admin/audit-log.html).
 * - admin       : Operational access to school data. Restricted from Users and Audit Log.
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
        alert('Access Denied: Super Administrator authorization required for this section.');
        window.location.href = 'index.html';
        return null;
      }

      // Update sidebar display with verified profile
      if (profile) {
        updateSidebarUserProfile(profile);
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

  // Update user profile representation in the sidebar
  function updateSidebarUserProfile(profile) {
    const isSuperAdmin = profile.role === 'super_admin';
    const roleTitle = isSuperAdmin ? 'Super Administrator' : 'Administrator';

    const nameElements = document.querySelectorAll('#user-display-name, #sidebar-user-name, .admin-sidebar__user-name');
    nameElements.forEach(el => { el.textContent = profile.full_name || profile.name || 'Administrator'; });

    const roleElements = document.querySelectorAll('#user-display-role, #sidebar-user-role-badge, .admin-sidebar__user-role');
    roleElements.forEach(el => {
      el.textContent = roleTitle;
      if (isSuperAdmin) {
        el.style.color = '#F59E0B'; // Gold accent for Super Admin
        el.style.fontWeight = '700';
      }
    });

    const avatarElements = document.querySelectorAll('#user-avatar-initial, #sidebar-user-avatar, .admin-sidebar__user-avatar');
    const initial = (profile.full_name || profile.name || (isSuperAdmin ? 'S' : 'A')).charAt(0).toUpperCase();
    avatarElements.forEach(el => { el.textContent = initial; });

    // Conditional visibility of Super Admin modules
    const userLinks = document.querySelectorAll('a[href*="users.html"]');
    const auditLinks = document.querySelectorAll('a[href*="audit-log.html"]');

    if (!isSuperAdmin) {
      userLinks.forEach(link => { link.style.display = 'none'; });
      auditLinks.forEach(link => { link.style.display = 'none'; });
    } else {
      userLinks.forEach(link => { link.style.display = 'flex'; });
      auditLinks.forEach(link => { link.style.display = 'flex'; });
    }
  }

  // Sidebar Mobile Toggle & Active Link Highlight
  function initAdminSidebar() {
    const toggleBtn = document.getElementById('admin-sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    let overlay = document.querySelector('.admin-sidebar-overlay');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'admin-sidebar-overlay';
      document.body.appendChild(overlay);
    }

    const toggleSidebar = (state) => {
      if (!sidebar) return;
      const isOpen = state !== undefined ? state : !sidebar.classList.contains('is-open');
      if (isOpen) {
        sidebar.classList.add('is-open');
        overlay.classList.add('is-active');
      } else {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-active');
      }
    };

    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        toggleSidebar();
      };
    }

    overlay.onclick = () => toggleSidebar(false);

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
        if (confirm('Are you sure you want to sign out of the Roshani Public School Admin Portal?')) {
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
      <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌'}</span>
      <div style="font-size:0.9rem; font-weight:500;">${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
  }

  // Activity Logger Wrapper
  async function logActivity(action, module = 'general', recordId = null, details = '') {
    if (window.RPS_Supabase && typeof window.RPS_Supabase.logActivityAdmin === 'function') {
      await window.RPS_Supabase.logActivityAdmin({
        action,
        module,
        recordId,
        details
      });
    }
  }

  // Format Helper Methods
  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Clean up and reset legacy zoom preferences
  try {
    localStorage.removeItem('rps_global_zoom_level');
    localStorage.removeItem('rps_admin_zoom');
    if (document.body) document.body.style.zoom = '';
    if (document.documentElement) document.documentElement.style.zoom = '';
  } catch (e) {}

  // Export to Global window object
  window.RPS_Admin = {
    checkAuth,
    initAdminSidebar,
    updateSidebarUserProfile,
    showToast,
    logActivity,
    formatDate,
    escapeHtml
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAdminSidebar();
  });
})();

