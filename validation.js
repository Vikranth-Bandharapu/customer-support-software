// Universal Form Validation Utility
(function () {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getErrorMessage(input) {
    const val = input.value ? input.value.trim() : '';
    const type = input.type ? input.type.toLowerCase() : '';
    const id = input.id ? input.id.toLowerCase() : '';
    const name = input.name ? input.name.toLowerCase() : '';

    // Label or field name
    let label = '';
    const group = input.closest('.form-group');
    if (group) {
      const labelElem = group.querySelector('.form-label');
      if (labelElem) label = labelElem.textContent.trim().replace(/\s*\(.*?\)/, '');
    }
    if (!label) {
      label = input.placeholder ? input.placeholder.replace(/\.\.\./, '').trim() : 'This field';
    }

    // Required check
    if (input.hasAttribute('required') && !val) {
      if (input.tagName === 'SELECT') {
        return `Please select an option for ${label}.`;
      }
      return `${label} is required.`;
    }

    if (!val) return ''; // If not required and blank, consider valid

    // Email format check
    if (type === 'email' || id.includes('email') || name.includes('email')) {
      if (!EMAIL_REGEX.test(val)) {
        return 'Please enter a valid email address (e.g. name@company.com).';
      }
    }

    // Phone format check
    if (type === 'tel' || id.includes('phone') || name.includes('phone')) {
      const digitsOnly = val.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return 'Please enter a valid phone number (at least 7 digits).';
      }
    }

    // Password length check
    if (type === 'password' && (id === 'password' || name === 'password')) {
      const form = input.closest('form');
      const isSignup = form && form.id === 'signupForm';
      if (isSignup && val.length < 8) {
        return 'Password must be at least 8 characters long.';
      }
      if (val.length < 4) {
        return 'Password must be at least 4 characters long.';
      }
    }

    // Confirm password match check
    if (id === 'confirmpassword' || id === 'confirm-password') {
      const form = input.closest('form');
      const pwd = form ? form.querySelector('#password, input[name="password"]') : null;
      if (pwd && val !== pwd.value) {
        return 'Passwords do not match.';
      }
    }

    // Role check
    if (id === 'role' || name === 'role') {
      if (!val) {
        return 'Please select a role to continue.';
      }
    }

    return '';
  }

  function showFieldError(input, message) {
    input.classList.add('error');
    let parent = input.parentElement;
    let errorElem = parent.querySelector('.error-message');
    if (!errorElem) {
      errorElem = document.createElement('p');
      errorElem.className = 'error-message';
      input.after(errorElem);
    }
    errorElem.textContent = message;
    errorElem.style.display = 'block';
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    const parent = input.parentElement;
    const errorElem = parent ? parent.querySelector('.error-message') : null;
    if (errorElem) {
      errorElem.textContent = '';
      errorElem.style.display = 'none';
    }
  }

  function validateInput(input) {
    const errorMsg = getErrorMessage(input);
    if (errorMsg) {
      showFieldError(input, errorMsg);
      return false;
    } else {
      clearFieldError(input);
      return true;
    }
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    let firstInvalid = null;

    inputs.forEach((input) => {
      if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') return;

      const fieldValid = validateInput(input);
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  }

  // Live input error clearing on user interaction
  document.addEventListener('input', (e) => {
    if (e.target && e.target.matches('input, textarea')) {
      clearFieldError(e.target);
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target && e.target.matches('select, input[type="checkbox"], input[type="radio"]')) {
      clearFieldError(e.target);
    }
  });

  window.validationUtils = {
    validateForm,
    validateInput,
    showFieldError,
    clearFieldError
  };
})();
