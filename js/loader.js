/* ============================================================
   ROSHANI PUBLIC SCHOOL — LUXURY PRELOADER CONTROLLER
   Tracks complete element download & resource completion
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
  let targetProgress = 10;
  let progressInterval = null;
  let quoteInterval = null;
  let isFinished = false;

  let totalResources = 0;
  let loadedResources = 0;
  let windowLoaded = false;
  let fontsLoaded = false;

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
            <span class="rps-loader__status-text" id="rps-loader-status">Downloading elements...</span>
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
        if (document.body) document.body.classList.add('rps-loading');
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
          if (document.body) document.body.insertBefore(loaderEl, document.body.firstChild);
        });
      }
    }

    startQuoteRotator();
    startProgressAnimation();

    // Track resource downloads after DOM starts parsing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        trackResourceDownloads();
      });
    } else {
      trackResourceDownloads();
    }

    // Track Google Fonts download state
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
        checkCompletion();
      }).catch(() => {
        fontsLoaded = true;
        checkCompletion();
      });
    } else {
      fontsLoaded = true;
    }

    // Window Load listener — fires when all images, frames, scripts, and stylesheets finish downloading
    if (document.readyState === 'complete') {
      windowLoaded = true;
      checkCompletion();
    } else {
      window.addEventListener('load', () => {
        windowLoaded = true;
        checkCompletion();
      });
    }

    // Safety fallback (10s max limit to prevent permanent block if external asset hangs)
    setTimeout(() => {
      if (!isFinished) {
        windowLoaded = true;
        fontsLoaded = true;
        finishLoading();
      }
    }, 10000);
  }

  function trackResourceDownloads() {
    const images = Array.from(document.querySelectorAll('img'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const scripts = Array.from(document.querySelectorAll('script[src]'));

    const allResources = [...images, ...styles, ...scripts];
    totalResources = allResources.length;

    if (totalResources === 0) {
      setTargetProgress(50, 'Loading Page...');
      return;
    }

    loadedResources = 0;

    allResources.forEach(res => {
      if (res.tagName === 'IMG' && res.complete) {
        loadedResources++;
      } else {
        res.addEventListener('load', onResourceLoaded, { once: true });
        res.addEventListener('error', onResourceLoaded, { once: true });
      }
    });

    updateCalculatedProgress();
  }

  function onResourceLoaded() {
    loadedResources++;
    updateCalculatedProgress();
    checkCompletion();
  }

  function updateCalculatedProgress() {
    if (totalResources === 0) return;
    const percent = Math.min(95, Math.round((loadedResources / totalResources) * 90));
    setTargetProgress(percent, `Downloading elements (${loadedResources}/${totalResources})...`);
  }

  function checkCompletion() {
    if (windowLoaded && fontsLoaded && (totalResources === 0 || loadedResources >= totalResources)) {
      finishLoading();
    } else if (windowLoaded && fontsLoaded) {
      setTargetProgress(95, 'Finalizing display...');
      setTimeout(finishLoading, 200);
    }
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
      windowLoaded = false;
      fontsLoaded = false;
      currentProgress = 0;
      targetProgress = 10;
      const loaderEl = document.getElementById('rps-loader');
      if (loaderEl) {
        loaderEl.classList.remove('is-loaded');
      }
      if (document.body) {
        document.body.classList.add('rps-loading');
      }
      startProgressAnimation();
      startQuoteRotator();
      trackResourceDownloads();
      setTimeout(finishLoading, 2000);
    },
    hide: function () {
      finishLoading();
    },
    simulate: function (durationMs) {
      this.show();
      setTimeout(finishLoading, durationMs || 2000);
    }
  };

  // Run initialization immediately
  initLoader();

})();
