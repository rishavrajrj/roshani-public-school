/* ============================================================
   ROSHANI PUBLIC SCHOOL — LUXURY PRELOADER CONTROLLER
   Tracks complete element download & resource completion
   Guarantees progress bar starts cleanly at 0% and finishes at 100%
   Handles actual page resource readiness & smooth transition
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
  let targetProgress = 0;
  let progressInterval = null;
  let quoteInterval = null;
  let isFinished = false;
  let isExiting = false;

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
            <span class="rps-loader__status-text" id="rps-loader-status">Loading...</span>
            <span class="rps-loader__percent" id="rps-loader-percent">0%</span>
          </div>
          <div class="rps-loader__bar-track">
            <div class="rps-loader__bar-fill" id="rps-loader-bar"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  function ensureLoaderElement() {
    let loaderEl = document.getElementById('rps-loader');
    if (!loaderEl) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = LOADER_HTML_TEMPLATE.trim();
      loaderEl = wrapper.firstElementChild;
      if (document.body) {
        document.body.insertBefore(loaderEl, document.body.firstChild);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body && !document.getElementById('rps-loader')) {
            document.body.insertBefore(loaderEl, document.body.firstChild);
          }
        });
      }
    }
    return loaderEl;
  }

  function resetProgressBarToZero() {
    const percentEl = document.getElementById('rps-loader-percent');
    const barEl = document.getElementById('rps-loader-bar');
    const statusEl = document.getElementById('rps-loader-status');

    if (percentEl) percentEl.textContent = '0%';
    if (statusEl) statusEl.textContent = 'Loading...';
    if (barEl) {
      barEl.style.transition = 'none';
      barEl.style.width = '0%';
      void barEl.offsetWidth; // Force reflow
      barEl.style.transition = 'width 0.18s linear';
    }
  }

  function loadLazyIframes() {
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    lazyIframes.forEach(iframe => {
      if (iframe.dataset.src && (!iframe.src || iframe.src === 'about:blank')) {
        iframe.src = iframe.dataset.src;
      }
    });
  }

  function initLoader() {
    isFinished = false;
    isExiting = false;
    currentProgress = 0;
    targetProgress = 0;

    // Lock body scrolling immediately to prevent layout shift or scrolling during load
    if (document.body) {
      document.body.classList.add('rps-loading');
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.body) document.body.classList.add('rps-loading');
      });
    }

    ensureLoaderElement();
    resetProgressBarToZero();

    startQuoteRotator();
    startProgressAnimation();
    setupLinkClickListener();

    // Track resource downloads after DOM starts parsing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        trackResourceDownloads();
        loadLazyIframes();
      });
    } else {
      trackResourceDownloads();
      loadLazyIframes();
    }

    // Track Google Fonts load state
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

    // Track Window Load event (all critical images, scripts, stylesheets loaded)
    if (document.readyState === 'complete') {
      windowLoaded = true;
      checkCompletion();
    } else {
      window.addEventListener('load', () => {
        windowLoaded = true;
        checkCompletion();
      });
    }

    // Safety fallback: ensure loading completes after 3s maximum even if an external asset hangs
    setTimeout(() => {
      if (!isFinished) {
        windowLoaded = true;
        fontsLoaded = true;
        finishLoading();
      }
    }, 3000);
  }

  function trackResourceDownloads() {
    // Collect critical images (e.g. hero images, logo, content images above the fold)
    const images = Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('loading') || img.getAttribute('loading') !== 'lazy');
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    totalResources = images.length + styles.length;

    if (totalResources === 0) {
      setTargetProgress(90, 'Loading...');
      checkCompletion();
      return;
    }

    loadedResources = 0;

    images.forEach(img => {
      if (img.complete && img.naturalWidth !== 0) {
        loadedResources++;
      } else {
        img.addEventListener('load', onResourceLoaded, { once: true });
        img.addEventListener('error', onResourceLoaded, { once: true });
      }
    });

    styles.forEach(style => {
      if (style.sheet) {
        loadedResources++;
      } else {
        style.addEventListener('load', onResourceLoaded, { once: true });
        style.addEventListener('error', onResourceLoaded, { once: true });
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
    const ratio = loadedResources / totalResources;
    const calculated = Math.min(95, Math.round(ratio * 92));
    setTargetProgress(calculated, 'Loading...');
  }

  function checkCompletion() {
    const resourcesDone = (totalResources === 0 || loadedResources >= totalResources);
    if (windowLoaded && fontsLoaded && resourcesDone) {
      finishLoading();
    } else if (resourcesDone && totalResources > 0 && windowLoaded) {
      finishLoading();
    } else if (windowLoaded && fontsLoaded) {
      finishLoading();
    }
  }

  function startQuoteRotator() {
    let quoteIndex = 0;
    const quoteEl = document.getElementById('rps-loader-quote');
    if (!quoteEl) return;

    if (quoteInterval) clearInterval(quoteInterval);

    quoteInterval = setInterval(() => {
      if (isFinished) {
        clearInterval(quoteInterval);
        return;
      }
      quoteEl.classList.add('is-changing');
      setTimeout(() => {
        const nextQuote = SCHOOl_MOTTO_QUOTES[(quoteIndex + 1) % SCHOOl_MOTTO_QUOTES.length];
        quoteIndex = (quoteIndex + 1) % SCHOOl_MOTTO_QUOTES.length;
        if (quoteEl) quoteEl.textContent = nextQuote;
        if (quoteEl) quoteEl.classList.remove('is-changing');
      }, 350);
    }, 1800);
  }

  function setTargetProgress(val, statusText) {
    if (val > targetProgress) {
      targetProgress = val;
    }
    const statusEl = document.getElementById('rps-loader-status');
    if (statusEl && statusText && !isExiting) {
      statusEl.textContent = statusText;
    }
  }

  function startProgressAnimation() {
    if (progressInterval) clearInterval(progressInterval);

    progressInterval = setInterval(() => {
      const percentEl = document.getElementById('rps-loader-percent');
      const barEl = document.getElementById('rps-loader-bar');
      const statusEl = document.getElementById('rps-loader-status');

      if (currentProgress < targetProgress) {
        let diff = targetProgress - currentProgress;
        let step = Math.max(1, Math.ceil(diff * 0.2));

        if (targetProgress >= 100) {
          step = Math.max(4, Math.ceil(diff * 0.3));
        }

        currentProgress = Math.min(100, currentProgress + step);

        if (percentEl) percentEl.textContent = `${currentProgress}%`;
        if (barEl) barEl.style.width = `${currentProgress}%`;
      }

      // Check if progress bar has reached 100% (the end of the progress bar)
      if (currentProgress >= 100 && targetProgress >= 100) {
        if (!isExiting) {
          isExiting = true;
          if (percentEl) percentEl.textContent = '100%';
          if (barEl) barEl.style.width = '100%';
          if (statusEl) statusEl.textContent = 'Welcome!';

          // Wait 250ms at 100% so user clearly sees full 100% progress
          setTimeout(() => {
            completeExitAnimation();
          }, 250);
        }
      }
    }, 16);
  }

  function finishLoading() {
    if (isFinished) return;
    setTargetProgress(100, 'Loading...');
  }

  function completeExitAnimation() {
    if (isFinished) return;
    isFinished = true;
    if (progressInterval) clearInterval(progressInterval);
    if (quoteInterval) clearInterval(quoteInterval);
    loadLazyIframes();

    const loaderEl = document.getElementById('rps-loader');
    if (loaderEl) {
      loaderEl.classList.add('is-loaded');
    }

    setTimeout(() => {
      if (document.body) {
        document.body.classList.remove('rps-loading');
      }
    }, 500);
  }

  function showTransitionTo(targetUrl) {
    const loaderEl = ensureLoaderElement();
    if (!loaderEl) {
      window.location.href = targetUrl;
      return;
    }

    isFinished = false;
    isExiting = false;
    currentProgress = 0;
    targetProgress = 0;

    resetProgressBarToZero();

    loaderEl.classList.remove('is-loaded');
    if (document.body) {
      document.body.classList.add('rps-loading');
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 50);
  }

  function checkIsSamePage(link) {
    if (!link) return false;

    // 1. Compare full absolute URLs without hash
    const currentHrefNoHash = window.location.href.split('#')[0];
    const linkHrefNoHash = link.href ? link.href.split('#')[0] : '';

    if (currentHrefNoHash && linkHrefNoHash && currentHrefNoHash === linkHrefNoHash) {
      return true;
    }

    // 2. Compare normalized file names if same origin
    if (link.origin === window.location.origin) {
      function normalizePath(p) {
        if (!p) return 'index.html';
        p = p.replace(/\/+$/, '');
        const parts = p.split('/');
        const lastPart = parts[parts.length - 1];
        if (!lastPart || lastPart === '' || lastPart === 'index.html') {
          return 'index.html';
        }
        return lastPart.toLowerCase();
      }

      const currentFile = normalizePath(window.location.pathname);
      const targetFile = normalizePath(link.pathname);

      if (currentFile === targetFile && link.search === window.location.search) {
        return true;
      }
    }

    return false;
  }

  function setupLinkClickListener() {
    document.addEventListener('click', (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore javascript:, mailto:, tel:
      if (href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Ignore external tabs, downloads, dropdown triggers
      if (link.getAttribute('target') === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-dropdown')) return;

      // Ignore direct file downloads
      if (/\.(pdf|png|jpg|jpeg|gif|svg|doc|docx|xls|xlsx|zip|rar)$/i.test(link.pathname)) return;

      // Ignore external domains
      if (link.origin !== window.location.origin) return;

      // IF CLICKING A LINK ON THE SAME PAGE:
      if (checkIsSamePage(link)) {
        e.preventDefault();

        if (link.hash && link.hash !== '#') {
          const targetEl = document.querySelector(link.hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            try { history.pushState(null, '', link.hash); } catch (err) {}
            return;
          }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      e.preventDefault();
      showTransitionTo(link.href);
    });

    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        isFinished = true;
        const loaderEl = document.getElementById('rps-loader');
        if (loaderEl) loaderEl.classList.add('is-loaded');
        if (document.body) document.body.classList.remove('rps-loading');
        loadLazyIframes();
      }
    });
  }

  // Public API
  window.RPS_Loader = {
    show: function () {
      isFinished = false;
      isExiting = false;
      windowLoaded = false;
      fontsLoaded = false;
      currentProgress = 0;
      targetProgress = 0;
      const loaderEl = ensureLoaderElement();
      resetProgressBarToZero();
      if (loaderEl) {
        loaderEl.classList.remove('is-loaded');
      }
      if (document.body) {
        document.body.classList.add('rps-loading');
      }
      startProgressAnimation();
      startQuoteRotator();
      trackResourceDownloads();
      setTimeout(finishLoading, 800);
    },
    hide: function () {
      finishLoading();
    },
    navigateTo: function (url) {
      showTransitionTo(url);
    },
    simulate: function (durationMs) {
      this.show();
      setTimeout(finishLoading, durationMs || 800);
    }
  };

  initLoader();

})();
