/**
 * ROSHANI PUBLIC SCHOOL — ADMISSION ANNOUNCEMENT POPUP COMPONENT
 * Displays a landing announcement modal using assets/admission-2026-27.png.
 * Features: LocalStorage campaign tracking, accessibility dialog, focus trap, scroll lock, ESC & backdrop dismissal.
 */

class AdmissionPopup {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'roshni_admission_popup_2026_2027_v3';
    this.imageSrc = options.imageSrc || 'assets/admission-2026-27.png';
    this.isOpen = false;
    this.previousActiveElement = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.close = this.close.bind(this);
  }

  init() {
    // Only display when user lands on the home page
    if (!this.isHomePage()) {
      return;
    }

    // Check if user has already dismissed or seen the popup
    if (this.isDismissed()) {
      return;
    }

    // Build and inject popup HTML into DOM
    this.render();

    // Trigger popup display after a short delay for smooth page entrance
    setTimeout(() => {
      this.open();
    }, 350);
  }

  isHomePage() {
    const path = window.location.pathname.toLowerCase();
    const cleanPath = path.replace(/\/$/, '');
    const page = cleanPath.split('/').pop();
    return page === '' || page === 'index.html';
  }

  isDismissed() {
    try {
      return localStorage.getItem(this.storageKey) === 'dismissed';
    } catch (e) {
      return false;
    }
  }

  markAsDismissed() {
    try {
      localStorage.setItem(this.storageKey, 'dismissed');
    } catch (e) {
      console.warn('LocalStorage unavailable for admission popup:', e);
    }
  }

  render() {
    if (document.getElementById('admission-popup')) return;

    const popupHtml = `
      <div id="admission-popup" class="admission-popup" role="dialog" aria-modal="true" aria-label="Admission Announcement for Academic Session 2026-2027">
        <div class="admission-popup__overlay" id="admission-popup-overlay"></div>
        <div class="admission-popup__modal" id="admission-popup-modal" tabindex="-1">
          <button type="button" class="admission-popup__close-btn" id="admission-popup-close" aria-label="Close admission announcement">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="admission-popup__image-wrapper">
            <img src="${this.imageSrc}" alt="Roshani Public School Admission Announcement 2026-2027" class="admission-popup__img" />
          </div>
          <div class="admission-popup__cta">
            <a href="admissions.html#enquiry" class="btn btn--primary admission-popup__apply-btn" id="admission-popup-apply-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              Apply for Admission
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHtml);

    this.popupEl = document.getElementById('admission-popup');
    this.overlayEl = document.getElementById('admission-popup-overlay');
    this.modalEl = document.getElementById('admission-popup-modal');
    this.closeBtnEl = document.getElementById('admission-popup-close');
    this.applyBtnEl = document.getElementById('admission-popup-apply-btn');

    // Event Listeners
    this.closeBtnEl.addEventListener('click', () => this.close());
    this.overlayEl.addEventListener('click', () => this.close());
    if (this.applyBtnEl) {
      this.applyBtnEl.addEventListener('click', () => {
        this.close();
      });
    }
  }

  open() {
    if (!this.popupEl || this.isOpen) return;

    this.isOpen = true;
    this.previousActiveElement = document.activeElement;
    this.markAsDismissed();

    // Lock body scrolling
    document.body.style.overflow = 'hidden';

    // Show popup with CSS transitions
    this.popupEl.classList.add('is-open');

    // Focus management
    setTimeout(() => {
      if (this.applyBtnEl) {
        this.applyBtnEl.focus();
      } else if (this.closeBtnEl) {
        this.closeBtnEl.focus();
      }
    }, 50);

    // Listen for ESC and Tab key trapping
    document.addEventListener('keydown', this.onKeyDown);
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.markAsDismissed();

    // Remove event listener
    document.removeEventListener('keydown', this.onKeyDown);

    // Fade out popup
    if (this.popupEl) {
      this.popupEl.classList.remove('is-open');
    }

    // Restore body scrolling after animation finishes
    setTimeout(() => {
      document.body.style.overflow = '';
      if (this.popupEl) {
        this.popupEl.remove();
        this.popupEl = null;
      }
      // Restore focus
      if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
        this.previousActiveElement.focus();
      }
    }, 300);
  }

  onKeyDown(e) {
    if (!this.isOpen) return;

    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.close();
      return;
    }

    // Tab Focus Trap
    if (e.key === 'Tab') {
      const focusables = this.popupEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }
}

// Auto-initialize component on DOM load for public website
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.admissionPopup = new AdmissionPopup();
    window.admissionPopup.init();
  });
} else {
  window.admissionPopup = new AdmissionPopup();
  window.admissionPopup.init();
}

