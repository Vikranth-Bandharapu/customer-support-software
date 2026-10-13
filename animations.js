// Safely handle animations without breaking the page layout
document.addEventListener('DOMContentLoaded', () => {
  // We rely primarily on AOS for scroll animations to prevent conflicts.
  // We'll only use GSAP for the 3D tilt effect which AOS can't do.

  if (typeof gsap !== 'undefined') {
    // 3D Tilt Effect on specific cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }
});
