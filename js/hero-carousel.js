/**
 * ROSHANI PUBLIC SCHOOL — HERO CAROUSEL MODULE
 * Handles auto-play, fade/slide transitions, prev/next controls,
 * pagination dots, keyboard navigation, touch swipe, and pause on hover.
 */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.hero-carousel__slide');
  const dotsContainer = carousel.querySelector('.hero-carousel__dots');
  const prevBtn = carousel.querySelector('.hero-carousel__btn--prev');
  const nextBtn = carousel.querySelector('.hero-carousel__btn--next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5000; // Standard 5.0 seconds slideshow timing

  // Create pagination dots dynamically if container exists
  if (dotsContainer && slides.length > 1) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `hero-carousel__dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.hero-carousel__dot') : [];

  const titleEl = document.getElementById('hero-carousel-title');
  let typeTimer = null;

  const slideTitles = [
    { main: "Shaping Bright Futures", sub: "Since 2001" },
    { main: "Excellence in Education", sub: "Since 2001" },
    { main: "Empowering Young Minds", sub: "Since 2001" },
    { main: "Dedicated Educator Faculty", sub: "Since 2001" },
    { main: "Next-Gen Digital Learning", sub: "Since 2001" },
    { main: "Fostering Innovation & Discovery", sub: "Since 2001" },
    { main: "Building Character & Leadership", sub: "Since 2001" },
    { main: "Nurturing Holistic Growth", sub: "Since 2001" }
  ];

  function updateTypewriterTitle(index) {
    if (!titleEl) return;

    if (typeTimer) {
      clearTimeout(typeTimer);
      typeTimer = null;
    }

    const data = slideTitles[index] || slideTitles[0];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      titleEl.innerHTML = `${data.main}<br><span class="hero-carousel__subtitle">${data.sub}</span>`;
      return;
    }

    const fullText = data.main;
    let charIdx = 0;

    titleEl.innerHTML = `<span class="typewriter-text"></span><span class="typewriter-cursor" aria-hidden="true"></span><br><span class="hero-carousel__subtitle" style="opacity: 0;">${data.sub}</span>`;

    const textSpan = titleEl.querySelector('.typewriter-text');
    const subSpan = titleEl.querySelector('.hero-carousel__subtitle');

    function typeChar() {
      if (charIdx < fullText.length) {
        textSpan.textContent += fullText.charAt(charIdx);
        charIdx++;
        typeTimer = setTimeout(typeChar, 35);
      } else {
        if (subSpan) subSpan.style.opacity = '1';
        typeTimer = setTimeout(() => {
          const cursor = titleEl.querySelector('.typewriter-cursor');
          if (cursor) cursor.remove();
        }, 1500);
      }
    }

    typeChar();
  }

  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('is-active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('is-active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });

    currentIndex = index;
    updateTypewriterTitle(index);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Event Listeners for Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  // Pause on hover / focus
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Initial setup
  goToSlide(0);
  startAutoplay();
});
