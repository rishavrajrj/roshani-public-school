/* ============================================================
   ROSHANI PUBLIC SCHOOL — NAVIGATION
   Sticky header, mobile menu, dropdowns
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Sticky Header ----
  const header = document.querySelector('.header');
  if (header) {
    const scrollThreshold = 10;
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > scrollThreshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Mobile Menu ----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav__overlay');
  const mobileClose = document.querySelector('.mobile-nav__close');

  const openMobileMenu = () => {
    menuToggle?.classList.add('is-active');
    mobileNav?.classList.add('is-open');
    mobileOverlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    menuToggle?.classList.remove('is-active');
    mobileNav?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', () => {
    if (mobileNav?.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // ---- Mobile Dropdown Toggles ----
  const mobileDropdownToggles = document.querySelectorAll('.mobile-nav__link[data-dropdown]');
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-dropdown');
      const submenu = document.getElementById(targetId);
      const chevron = toggle.querySelector('svg');

      // Close other open submenus
      document.querySelectorAll('.mobile-nav__sub.is-open').forEach(sub => {
        if (sub.id !== targetId) {
          sub.classList.remove('is-open');
          const otherToggle = document.querySelector(`[data-dropdown="${sub.id}"]`);
          otherToggle?.querySelector('svg')?.style.removeProperty('transform');
        }
      });

      submenu?.classList.toggle('is-open');
      if (submenu?.classList.contains('is-open')) {
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        if (chevron) chevron.style.transform = '';
      }
    });
  });

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .nav__dropdown-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  // ---- Scroll to Top ----
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
