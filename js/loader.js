/* ============================================================
   ROSHANI PUBLIC SCHOOL — LUXURY PRELOADER CONTROLLER
   Dynamic progress calculator & loading transition manager
   ============================================================ */

(function () {
  'use strict';

  // Quotes / Mottos for Ticker
  const SCHOOl_MOTTO_QUOTES = [
    "Shaping Bright Futures • CBSE Affil. 330943",
    "Excellence in Education • Turkauliya",
    "Nurturing Wisdom, Integrity & Character",
    "Modern Labs, Library & Sports Facilities",
    "Empowering Students from Nursery to Class XII",
    "Welcome to Roshani Public School"
  ];

  let currentProgress = 0;
  let targetProgress = 15;
  let progressInterval = null;
  let quoteInterval = null;
  let isFinished = false;

  // HTML Template for fallback auto-injection
  const LOADER_HTML_TEMPLATE = `
    <div id="rps-loader" role="dialog" aria-modal="true" aria-label="Loading Roshani Public School">
      <div class="rps-loader__card">
        <div class="rps-loader__visual">
          <svg class="rps-loader__rings" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rpsRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#B91C5C" />
                <stop offset="100%" stop-color="#D97706" />
              </linearGradient>
              <linearGradient id="rpsRingGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#D97706" />
                <stop offset="100%" stop-color="#1A365D" />
              </linearGradient>
            </defs>
            <!-- Outer spinning ring -->
            <circle class="rps-loader__ring-outer" cx="60" cy="60" r="54" fill="none" 
                    stroke="url(#rpsRingGrad1)" stroke-width="3" stroke-dasharray="240 80" stroke-linecap="round" />
            <!-- Inner spinning ring -->
            <circle class="rps-loader__ring-inner" cx="60" cy="60" r="44" fill="none" 
                    stroke="url(#rpsRingGrad2)" stroke-width="2.5" stroke-dasharray="140 60" stroke-linecap="round" />
          </svg>
          <div class="rps-loader__logo-box">
            <img src="assets/logo.png" alt="Roshani Public School Emblem" class="rps-loader__logo" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <span style="display:none; font-family:'Playfair Display', serif; font-weight:800; color:#B91C5C; font-size:1.5rem;">RPS</span>
          </div>
        </div>
        
        <h2 class="rps-loader__title">Roshani Public School</h2>
        <div class="rps-loader__subtitle">Turkauliya, East Champaran</div>
        
        <div class="rps-loader__quote-wrap">
          <div class="rps-loader__quote" id="rps-loader-quote">Shaping Bright Futures • CBSE Affil. 330943</div>
        </div>
        
        <div class="rps-loader__progress-box">
          <div class="rps-loader__meta">
            <span class="rps-loader__status-text" id="rps-loader-status">Initializing...</span>
            <span class="rps-loader__percent" id="rps-loader-percent">0%</span>
          </div>
          <div class="rps-loader__bar-track">
            <div class="rps-loader__bar-fill" id="rps-loader-bar"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  function initLoader() {
    // Add loading lock class to body immediately
    if (document.body) {
      document.body.classList.add('rps-loading');
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('rps-loading');
      });
    }

    // Ensure Loader HTML element exists
    let loaderEl = document.getElementById('rps-loader');
    if (!loaderEl) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = LOADER_HTML_TEMPLATE.trim();
      loaderEl = wrapper.firstElementChild;
      if (document.body) {
        document.body.insertBefore(loaderEl, document.body.firstChild);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          document.body.insertBefore(loaderEl, document.body.firstChild);
        });
      }
    }

    startQuoteRotator();
    startProgressAnimation();

    // DOMContentLoaded event listener
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTargetProgress(75, 'Loading Assets...');
      });
    } else {
      setTargetProgress(75, 'Loading Assets...');
    }

    // Window Load event listener
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    // Safety fallback timeout (Max 2.2 seconds to ensure fast UX)
    setTimeout(() => {
      if (!isFinished) {
        finishLoading();
      }
    }, 2200);
  }

  function startQuoteRotator() {
    let quoteIndex = 0;
    const quoteEl = document.getElementById('rps-loader-quote');
    if (!quoteEl) return;

    quoteInterval = setInterval(() => {
      if (isFinished) {
        clearInterval(quoteInterval);
        return;
      }
      quoteEl.classList.add('is-changing');
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % SCHOOl_MOTTO_QUOTES.length;
        quoteEl.textContent = SCHOOl_MOTTO_QUOTES[quoteIndex];
        quoteEl.classList.remove('is-changing');
      }, 350);
    }, 1800);
  }

  function setTargetProgress(val, statusText) {
    if (val > targetProgress) {
      targetProgress = val;
    }
    const statusEl = document.getElementById('rps-loader-status');
    if (statusEl && statusText) {
      statusEl.textContent = statusText;
    }
  }

  function startProgressAnimation() {
    const percentEl = document.getElementById('rps-loader-percent');
    const barEl = document.getElementById('rps-loader-bar');
    const statusEl = document.getElementById('rps-loader-status');

    // Smoothly step currentProgress towards targetProgress
    progressInterval = setInterval(() => {
      if (currentProgress < targetProgress) {
        // Dynamic step based on distance
        const diff = targetProgress - currentProgress;
        const step = Math.max(1, Math.ceil(diff * 0.15));
        currentProgress = Math.min(100, currentProgress + step);

        if (percentEl) percentEl.textContent = `${currentProgress}%`;
        if (barEl) barEl.style.width = `${currentProgress}%`;

        if (currentProgress >= 100 && targetProgress >= 100) {
          clearInterval(progressInterval);
          if (statusEl) statusEl.textContent = 'Welcome!';
          completeExitAnimation();
        }
      }
    }, 25);
  }

  function finishLoading() {
    if (isFinished) return;
    setTargetProgress(100, 'Ready');
  }

  function completeExitAnimation() {
    if (isFinished) return;
    isFinished = true;
    clearInterval(quoteInterval);

    const loaderEl = document.getElementById('rps-loader');
    if (loaderEl) {
      // Add loaded class for CSS transition
      loaderEl.classList.add('is-loaded');
    }

    setTimeout(() => {
      if (document.body) {
        document.body.classList.remove('rps-loading');
      }
    }, 600);
  }

  // Public API
  window.RPS_Loader = {
    show: function () {
      isFinished = false;
      currentProgress = 0;
      targetProgress = 15;
      const loaderEl = document.getElementById('rps-loader');
      if (loaderEl) {
        loaderEl.classList.remove('is-loaded');
      }
      if (document.body) {
        document.body.classList.add('rps-loading');
      }
      startProgressAnimation();
      startQuoteRotator();
      setTimeout(finishLoading, 1500);
    },
    hide: function () {
      finishLoading();
    },
    simulate: function (durationMs) {
      this.show();
      setTimeout(finishLoading, durationMs || 1500);
    }
  };

  // Run initialization immediately
  initLoader();

})();
