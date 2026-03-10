document.addEventListener('DOMContentLoaded', () => {

  // --- Cursor glow ---
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // --- Navbar scroll ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const menuOverlay = document.getElementById('menuOverlay');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    menuOverlay.classList.toggle('open');
    document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
  });

  menuOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll reveal ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.05, 0.3)}s`;
    revealObserver.observe(el);
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Parallax hero bg on scroll ---
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1.1 - scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

});
