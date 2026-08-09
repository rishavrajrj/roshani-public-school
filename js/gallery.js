/* ============================================================
   ROSHANI PUBLIC SCHOOL — GALLERY
   Lightbox viewer with keyboard navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Gallery Filters ----
  const filterBtns = document.querySelectorAll('#gallery-filter-btns .facility-cat-btn, .gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (!filter) return;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('is-active', 'active', 'btn--primary');
        if (b.classList.contains('btn')) b.classList.add('btn--outline');
      });
      btn.classList.add('is-active', 'active');
      if (btn.classList.contains('btn')) {
        btn.classList.remove('btn--outline');
        btn.classList.add('btn--primary');
      }

      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.classList.add('is-visible');
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ---- Lightbox Modal ----
  const lightboxModal = document.getElementById('lightbox-modal') || document.querySelector('.lightbox-modal') || document.querySelector('.lightbox');
  const lightboxImg = document.getElementById('lightbox-img') || lightboxModal?.querySelector('img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close') || lightboxModal?.querySelector('.lightbox-close-btn, .lightbox__close');
  const lightboxPrev = document.getElementById('lightbox-prev') || lightboxModal?.querySelector('.lightbox-prev-btn, .lightbox__nav--prev');
  const lightboxNext = document.getElementById('lightbox-next') || lightboxModal?.querySelector('.lightbox-next-btn, .lightbox__nav--next');
  let currentIndex = 0;
  let visibleItems = [];

  const getVisibleItems = () => {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
  };

  const openLightbox = (index) => {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    const img = item?.querySelector('img');
    if (img && lightboxImg) {
      lightboxImg.src = img.getAttribute('src') || '';
      lightboxImg.alt = img.getAttribute('alt') || '';
      if (lightboxCap) {
        lightboxCap.textContent = img.getAttribute('alt') || item.dataset.caption || '';
      }
    }
    if (lightboxModal) {
      lightboxModal.classList.add('is-open');
      lightboxModal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-open');
      lightboxModal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    openLightbox(currentIndex - 1);
  };

  const showNext = () => {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    openLightbox(currentIndex + 1);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibles = getVisibleItems();
      const visibleIndex = visibles.indexOf(item);
      openLightbox(visibleIndex >= 0 ? visibleIndex : index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  // Close on backdrop overlay click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showNext();
      else showPrev();
    }
  }, { passive: true });

  // ---- Gallery Hero Slider ----
  const heroSlider = document.getElementById('gallery-hero');
  const heroSlides = document.querySelectorAll('#gh-slides .gh-slide');
  const heroPrevBtn = document.getElementById('gh-prev');
  const heroNextBtn = document.getElementById('gh-next');
  const heroDotsContainer = document.getElementById('gh-dots');
  let currentHeroSlide = 0;
  let heroAutoplayTimer = null;
  const GALLERY_AUTOPLAY_INTERVAL = 5000; // Standard 5.0 seconds slideshow timing (identical to index hero)
  const slideCount = heroSlides.length;

  if (heroSlider && slideCount > 0) {
    // Generate indicator dots dynamically
    if (heroDotsContainer) {
      heroDotsContainer.innerHTML = '';
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.className = `gh-dot${i === 0 ? ' is-active' : ''}`;
        dot.setAttribute('aria-label', `Go to photo slide ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToHeroSlide(i);
          startHeroAutoplay();
        });
        heroDotsContainer.appendChild(dot);
      }
    }

    const heroDots = heroDotsContainer ? heroDotsContainer.querySelectorAll('.gh-dot') : [];

    function goToHeroSlide(index) {
      if (index === currentHeroSlide && heroSlides[index].classList.contains('is-active')) return;

      heroSlides[currentHeroSlide].classList.remove('is-active');
      if (heroDots[currentHeroSlide]) {
        heroDots[currentHeroSlide].classList.remove('is-active');
        heroDots[currentHeroSlide].setAttribute('aria-selected', 'false');
      }

      currentHeroSlide = (index + slideCount) % slideCount;

      heroSlides[currentHeroSlide].classList.add('is-active');
      if (heroDots[currentHeroSlide]) {
        heroDots[currentHeroSlide].classList.add('is-active');
        heroDots[currentHeroSlide].setAttribute('aria-selected', 'true');
      }
    }

    function nextHeroSlide() {
      goToHeroSlide(currentHeroSlide + 1);
    }

    function prevHeroSlide() {
      goToHeroSlide(currentHeroSlide - 1);
    }

    // Autoplay logic (Standard 5.0 seconds — identical to index hero)
    function startHeroAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stopHeroAutoplay();
      heroAutoplayTimer = setInterval(nextHeroSlide, GALLERY_AUTOPLAY_INTERVAL);
    }

    function stopHeroAutoplay() {
      if (heroAutoplayTimer) {
        clearInterval(heroAutoplayTimer);
        heroAutoplayTimer = null;
      }
    }

    if (heroNextBtn) heroNextBtn.addEventListener('click', () => {
      nextHeroSlide();
      startHeroAutoplay();
    });

    if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => {
      prevHeroSlide();
      startHeroAutoplay();
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopHeroAutoplay);
    heroSlider.addEventListener('mouseleave', startHeroAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox?.classList.contains('is-open')) return;

      const rect = heroSlider.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        prevHeroSlide();
        startHeroAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextHeroSlide();
        startHeroAutoplay();
      }
    });

    // Touch swipe support
    let heroTouchStartX = 0;
    let heroTouchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.changedTouches[0].screenX;
      stopHeroAutoplay();
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      heroTouchEndX = e.changedTouches[0].screenX;
      const swipeDiff = heroTouchStartX - heroTouchEndX;
      if (Math.abs(swipeDiff) > 40) {
        if (swipeDiff > 0) nextHeroSlide();
        else prevHeroSlide();
      }
      startHeroAutoplay();
    }, { passive: true });

    // Start initial autoplay
    startHeroAutoplay();
  }
});
