// Toast Notification Utility
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. LOGIN FORM HANDLER (Login with 2 roles: Admin and Agent)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Auto-fill email if registered previously
    const savedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (savedEmail) {
      const emailInput = document.getElementById('email');
      if (emailInput && !emailInput.value) {
        emailInput.value = savedEmail;
      }
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isValid = window.validationUtils ? window.validationUtils.validateForm(loginForm) : true;
      if (!isValid) {
        showToast('Please fix the errors in the login form.', 'error');
        return;
      }

      const roleSelect = document.getElementById('role');
      const role = roleSelect ? roleSelect.value : '';

      if (!role) {
        if (window.validationUtils && roleSelect) {
          window.validationUtils.showFieldError(roleSelect, 'Please select a role to log in.');
        }
        showToast('Please select a role (Admin or Agent).', 'error');
        return;
      }

      const emailInput = document.getElementById('email');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email) {
        localStorage.setItem('userEmail', email);
        sessionStorage.setItem('userEmail', email);
      }

      const roleLabel = role === 'admin' ? 'Administrator' : 'Support Agent';
      showToast(`Login successful as ${roleLabel}! Redirecting to workspace...`, 'success');
      
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'agent-dashboard.html';
        }
      }, 500);
    });
  }

  // 2. SIGNUP FORM HANDLER
  // Validates first with error messages, then redirects to login.html
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(signupForm) : true;
      if (!isValid) {
        showToast('Please fix the errors in the signup form.', 'error');
        return;
      }

      const signupEmail = document.getElementById('email');
      if (signupEmail && signupEmail.value.trim()) {
        localStorage.setItem('userEmail', signupEmail.value.trim());
        sessionStorage.setItem('userEmail', signupEmail.value.trim());
      }

      showToast('Validation successful! Redirecting to confirmation...', 'success');
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  }

  // 3. CONTACT FORM HANDLER
  // First validates data with error messages. After that ONLY, redirects to 404.html
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(contactForm) : true;
      if (!isValid) {
        showToast('Please fill in all required fields correctly before submitting.', 'error');
        // Do NOT redirect when validation fails - keep user on page to see error messages!
        return;
      }

      showToast('Message validated successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  }

  // 4. UNIVERSAL FORM HANDLER FOR ANY OTHER FORM ON THE WEBSITE
  // First validates data with error messages. After that ONLY, redirects to 404.html
  document.querySelectorAll('form').forEach(form => {
    if (form.id === 'loginForm' || form.id === 'signupForm' || form.id === 'contactForm' || form.closest('.dashboard-content')) {
      return; // Already specifically handled above or handled by dashboard.js
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(form) : true;
      if (!isValid) {
        showToast('Please fill in all required fields correctly.', 'error');
        // Do NOT redirect when validation fails!
        return;
      }

      showToast('Form validated successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  });
});
