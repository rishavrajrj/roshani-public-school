/* ============================================================
   ROSHANI PUBLIC SCHOOL — GALLERY MODULE
   Dynamic Supabase Gallery Fetching, Category Filtering & Lightbox
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryHeroSlider();

  const bentoGrid = document.getElementById('gallery-bento-grid');

  // Attempt dynamic load from Supabase
  if (bentoGrid && window.RPS_Supabase && typeof window.RPS_Supabase.getPublishedGallery === 'function') {
    window.RPS_Supabase.getPublishedGallery('all').then(images => {
      if (images && images.length > 0) {
        renderDynamicGallery(bentoGrid, images);
      }
      initGalleryFiltersAndLightbox();
    }).catch(err => {
      console.warn('Supabase gallery fetch fallback:', err);
      initGalleryFiltersAndLightbox();
    });
  } else {
    initGalleryFiltersAndLightbox();
  }
});

/* ============================================================
   GALLERY HERO AUTOMATED SLIDESHOW
   ============================================================ */
function initGalleryHeroSlider() {
  const slider = document.getElementById('gallery-hero');
  if (!slider) return;

  const slides = slider.querySelectorAll('.gh-slide');
  const dotsContainer = document.getElementById('gh-dots');
  const prevBtn = document.getElementById('gh-prev');
  const nextBtn = document.getElementById('gh-next');

  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4500;

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `gh-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.onclick = () => {
        goToSlide(idx);
        restartAutoplay();
      };
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.gh-dot') : [];

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      const isActive = idx === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', !isActive);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      prevSlide();
      restartAutoplay();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      nextSlide();
      restartAutoplay();
    };
  }

  // Hover & Focus Pause
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (Math.abs(touchEndX - touchStartX) > 40) {
      if (touchEndX - touchStartX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      restartAutoplay();
    }
  }, { passive: true });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      restartAutoplay();
    }
  });

  // Start Autoplay
  startAutoplay();
}

function renderDynamicGallery(container, images) {
  container.innerHTML = '';
  images.forEach((img, idx) => {
    const isHero = idx === 0;
    const item = document.createElement('div');
    item.className = `bento-item-ref gallery-item fade-in is-visible ${isHero ? 'bento-wide bento-tall' : ''}`;
    item.setAttribute('data-category', img.category || 'campus');
    
    item.innerHTML = `
      <img src="${img.image_url}" alt="${escapeHtml(img.title || 'Roshani Public School Gallery')}" loading="lazy">
      <div class="bento-overlay">
        <div class="bento-overlay__inner">
          <span class="bento-pill">${capitalize(img.category || 'Campus')}</span>
          <span class="bento-caption">${escapeHtml(img.title)}</span>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function initGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll('#gallery-filter-btns .facility-cat-btn, .gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      const filter = btn.getAttribute('data-filter') || btn.getAttribute('data-category');
      if (!filter) return;

      filterBtns.forEach(b => {
        b.classList.remove('is-active', 'active', 'btn--primary');
        if (b.classList.contains('btn')) b.classList.add('btn--outline');
      });
      btn.classList.add('is-active', 'active');
      if (btn.classList.contains('btn')) {
        btn.classList.remove('btn--outline');
        btn.classList.add('btn--primary');
      }

      document.querySelectorAll('.gallery-item').forEach(item => {
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
    };
  });

  // Lightbox Modal Setup
  const lightboxModal = document.getElementById('lightbox-modal') || document.querySelector('.lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img') || lightboxModal?.querySelector('img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close') || lightboxModal?.querySelector('.lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev') || lightboxModal?.querySelector('.lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next') || lightboxModal?.querySelector('.lightbox-next-btn');

  let currentIndex = 0;
  let visibleItems = [];

  const getVisibleItems = () => {
    return Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
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

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.onclick = () => {
      const items = getVisibleItems();
      const idx = items.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    };
  });

  if (lightboxClose) lightboxClose.onclick = closeLightbox;
  if (lightboxPrev) lightboxPrev.onclick = () => openLightbox(currentIndex - 1);
  if (lightboxNext) lightboxNext.onclick = () => openLightbox(currentIndex + 1);

  if (lightboxModal) {
    lightboxModal.onclick = (e) => {
      if (e.target === lightboxModal) closeLightbox();
    };
  }

  document.onkeydown = (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  };
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
