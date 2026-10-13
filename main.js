document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle with Backdrop Overlay
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  // Ensure navigation overlay exists
  let navOverlay = document.querySelector('.main-nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'main-nav-overlay';
    document.body.appendChild(navOverlay);
  }

  function closeMobileNav() {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark', 'fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      const isOpen = navMenu.classList.contains('active');
      
      if (isOpen) {
        if (icon) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        }
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
      } else {
        closeMobileNav();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileNav);
    }

    // Close when tapping nav link
    navMenu.querySelectorAll('.nav-link, .auth-buttons a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });

    // Auto close on window resize above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileNav();
    });
  }

  // Sticky Header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Init AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }
  
  // Accordion for FAQ
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
