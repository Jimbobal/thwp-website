// ========================================
// THWP Website - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Mobile menu toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // --- Scroll animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in to key elements
  const animateElements = document.querySelectorAll(
    '.about-text, .about-stats, .album-card, .member-card, .video-card, .social-link, .contact-email'
  );

  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Stagger album cards
  document.querySelectorAll('.album-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Stagger member cards
  document.querySelectorAll('.member-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Stagger social links
  document.querySelectorAll('.social-link').forEach((link, i) => {
    link.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.style.color = '#f1f1f1';
        } else {
          link.style.color = '';
        }
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
