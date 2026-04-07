/* ============================================
   Nicolás Ayala — Consultoría Digital
   Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Animated grid background ---
  const canvas = document.getElementById('grid-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, cols, rows;
    const cellSize = 60;
    let mouse = { x: -1000, y: -1000 };
    let animFrame;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / cellSize) + 1;
      rows = Math.ceil(h / cellSize) + 1;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const time = Date.now() * 0.001;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          let alpha = 0.03;
          if (dist < maxDist) {
            alpha = 0.03 + 0.12 * (1 - dist / maxDist);
          }

          // Subtle wave
          alpha += Math.sin(time + i * 0.3 + j * 0.3) * 0.01;

          ctx.fillStyle = `rgba(0, 212, 255, ${Math.max(0, alpha)})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(30, 30, 46, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = 'rgba(30, 30, 46, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animFrame = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    draw();
  }

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const scroll = window.scrollY;
    if (scroll > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scroll;
  });

  // --- Mobile menu ---
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('nav__toggle--open');
      navLinks.classList.toggle('nav__links--open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('nav__toggle--open');
        navLinks.classList.remove('nav__links--open');
      });
    });
  }

  // --- Counter animation ---
  function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(function (counter) {
      if (counter.dataset.animated) return;

      const rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight) return;

      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // --- Scroll reveal ---
  function setupReveal() {
    const elements = document.querySelectorAll(
      '.service-card, .project-card, .about__approach-item, .about__terminal'
    );
    elements.forEach(function (el) {
      el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  setupReveal();

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
