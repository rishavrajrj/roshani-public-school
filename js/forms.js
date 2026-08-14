/* ============================================================
   ROSHANI PUBLIC SCHOOL — FORM HANDLING
   Client-side validation and Supabase submission for Contact & Admissions
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

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;

  fields.forEach(field => {
    if (field.hasAttribute('required') || field.value.trim().length > 0) {
      if (!validateField(field)) {
        isValid = false;
      }
    }
  });

  if (!isValid) {
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
    Submitting...
  `;

  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  const isAdmission = form.id === 'admissionForm';
  const parentNameVal = form.querySelector('[name="parentName"], [name="parent_name"], [name="name"]')?.value.trim();
  const studentNameVal = form.querySelector('[name="studentName"], [name="student_name"]')?.value.trim();
  const classVal = form.querySelector('[name="classApplying"], [name="class_seeking"], [name="grade"], [name="class"]')?.value.trim();
  const messageVal = form.querySelector('[name="message"], [name="comments"]')?.value.trim();
  const addressVal = form.querySelector('[name="address"]')?.value.trim();

  let finalMessage = messageVal || (isAdmission ? 'Online Admission Enquiry' : 'General Enquiry');
  if (addressVal) {
    finalMessage += `\nAddress: ${addressVal}`;
  }

  const enquiryData = {
    form_type: isAdmission ? 'admission' : 'contact',
    full_name: parentNameVal || 'Parent/Visitor',
    email: form.querySelector('[name="email"]')?.value.trim() || null,
    phone: form.querySelector('[name="phone"]')?.value.trim() || '',
    student_name: studentNameVal || null,
    class_seeking: classVal || null,
    message: finalMessage,
    status: 'new'
  };

  try {
    if (window.RPS_Supabase && typeof window.RPS_Supabase.submitEnquiry === 'function') {
      await window.RPS_Supabase.submitEnquiry(enquiryData);
    }
  } catch (err) {
    console.warn('Supabase enquiry submit error (fallback mode):', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;

    const successEl = form.querySelector('.form-success');
    if (successEl) {
      successEl.classList.add('is-visible');
      form.reset();
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      setTimeout(() => {
        successEl.classList.remove('is-visible');
      }, 6000);
    }
  }
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const name = field.name;
  let errorMsg = '';

  if (field.hasAttribute('required') && !value) {
    if (name === 'name' || name === 'parent_name') {
      errorMsg = 'Please enter your full name.';
    } else if (name === 'phone') {
      errorMsg = 'Please enter your contact phone number.';
    } else if (name === 'message') {
      errorMsg = 'Please enter your message.';
    } else {
      errorMsg = 'This field is required.';
    }
  } else if (value) {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (name === 'phone') {
      const phoneRegex = /^[0-9+\-\s()]{8,15}$/;
      if (!phoneRegex.test(value)) {
        errorMsg = 'Please enter a valid phone number.';
      }
    }
  }

  const container = field.closest('.form-group') || field.parentElement;
  let errorEl = container.querySelector('.form-error');

  if (errorMsg) {
    field.classList.add('is-error');
    field.setAttribute('aria-invalid', 'true');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.style.color = '#e53e3e';
      errorEl.style.fontSize = '0.8rem';
      errorEl.style.marginTop = '4px';
      container.appendChild(errorEl);
    }
    errorEl.textContent = errorMsg;
    return false;
  } else {
    field.classList.remove('is-error');
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.remove();
    }
    return true;
  }
}
