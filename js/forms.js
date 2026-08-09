/* ============================================================
   ROSHANI PUBLIC SCHOOL — FORM HANDLING
   Client-side validation and submission for Contact & Admissions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // ---- Admission Enquiry Form ----
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', handleFormSubmit);
  }

  // ---- Real-time field validation ----
  document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-error')) {
        validateField(input);
      }
    });
  });
});

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;

  fields.forEach(field => {
    // Only validate if required OR if optional field has a value entered
    if (field.hasAttribute('required') || field.value.trim().length > 0) {
      if (!validateField(field)) {
        isValid = false;
      }
    }
  });

  if (!isValid) {
    // Focus first error field
    const firstError = form.querySelector('.is-error');
    firstError?.focus();
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin-icon" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Sending Message...
  `;

  // Add spin animation dynamically if not present
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  // Simulate server submission (1.2 seconds)
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;

    // Show success message
    const successEl = form.querySelector('.form-success');
    if (successEl) {
      successEl.classList.add('is-visible');
      form.reset();

      // Scroll smoothly to success message if needed
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Hide after 6 seconds
      setTimeout(() => {
        successEl.classList.remove('is-visible');
      }, 6000);
    }
  }, 1200);
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const name = field.name;
  let errorMsg = '';

  // Required check
  if (field.hasAttribute('required') && !value) {
    if (name === 'name') {
      errorMsg = 'Please enter your full name.';
    } else if (name === 'phone') {
      errorMsg = 'Please enter your phone number.';
    } else if (name === 'message') {
      errorMsg = 'Please enter your message.';
    } else {
      errorMsg = 'This field is required.';
    }
  }
  // Name length check
  else if (name === 'name' && value.length < 2) {
    errorMsg = 'Name must be at least 2 characters long.';
  }
  // Email validation (if provided)
  else if ((type === 'email' || name === 'email') && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMsg = 'Please enter a valid email address.';
    }
  }
  // Phone validation
  else if ((type === 'tel' || name === 'phone') && value) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
    if (!phoneRegex.test(value)) {
      errorMsg = 'Please enter a valid 10-digit phone number.';
    }
  }

  // Find error message element
  let errorEl = field.parentElement.querySelector('.form-error');

  if (errorMsg) {
    field.classList.add('is-error');
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.add('is-visible');
    }
    return false;
  } else {
    field.classList.remove('is-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
    return true;
  }
}
