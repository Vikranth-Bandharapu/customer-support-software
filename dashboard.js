document.addEventListener('DOMContentLoaded', () => {
  // 0. Display entered user email in sidebar
  const savedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
  if (savedEmail) {
    document.querySelectorAll('.sidebar-user-email').forEach(el => {
      el.textContent = savedEmail;
      el.title = savedEmail;
    });
  }

  // 1. Mobile Sidebar Toggle & Background Scroll Lock
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  // Ensure overlay exists
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
    if (overlay) overlay.classList.add('active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-xmark';
      }
    }
  }

  function closeMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-bars';
      }
    }
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
    overlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeMobileSidebar();
    }
  });

  // Auto close mobile sidebar on screen resize above tablet breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar && sidebar.classList.contains('open')) {
      closeMobileSidebar();
    }
  });

  // 2. 5-Section Tab Navigation
  const navTabs = document.querySelectorAll('.sidebar-link[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-tab');
      if (!targetId) return;

      // Update active state in sidebar
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Update active section view
      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      // Auto close mobile sidebar and unlock background
      closeMobileSidebar();

      // Scroll top
      const dashContent = document.querySelector('.dashboard-content');
      if (dashContent) dashContent.scrollTop = 0;
    });
  });

  // 3. CTA Buttons in Dashboard Redirect to 404 (Delegated Listener)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cta, [data-cta], .action-cta, [data-action="cta"], .dashboard-content button:not([type="submit"]), .dashboard-content a.btn');
    if (!btn) return;

    // If it is a submit button inside a form, let form submission handler validate first
    if (btn.type === 'submit' && btn.closest('form')) {
      return;
    }
    if (btn.classList.contains('sidebar-link') || btn.classList.contains('sidebar-toggle')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    window.location.href = '404.html';
  });

  // 4. Any Form in Dashboard Validates First with error message, then Redirects to 404
  document.querySelectorAll('.dashboard-content form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(form) : true;
      if (!isValid) {
        if (typeof showToast === 'function') {
          showToast('Validation error: Please fill in required fields. Redirecting...', 'error');
        }
        // First it validates the data with error message, after it redirects to 404
        setTimeout(() => {
          window.location.href = '404.html';
        }, 1200);
        return;
      }

      if (typeof showToast === 'function') {
        showToast('Form validated successfully! Redirecting...', 'success');
      }
      setTimeout(() => {
        window.location.href = '404.html';
      }, 500);
    });
  });

  // 5. Search Bar: redirects to 404
  const topSearchInput = document.querySelector('.search-bar input');
  if (topSearchInput) {
    topSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    });
  }
});
