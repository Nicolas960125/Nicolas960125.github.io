/* ============================================
   Nicolás Ayala — Consultoría Digital
   ============================================ */

(function () {
  'use strict';

  // --- Navigation scroll ---
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // --- Mobile menu ---
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

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

  // --- Workflow animation ---
  var workflow = document.getElementById('workflow');
  var steps = workflow ? workflow.querySelectorAll('.workflow__step') : [];
  var connectors = workflow ? workflow.querySelectorAll('.workflow__connector') : [];
  var progressBar = document.getElementById('workflow-progress');
  var workflowAnimated = false;

  function animateWorkflow() {
    if (workflowAnimated || !workflow) return;

    var rect = workflow.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.75) return;

    workflowAnimated = true;

    // Step 1: Diagnóstico
    setTimeout(function () {
      steps[0].classList.add('active');
      if (progressBar) progressBar.style.width = '15%';
    }, 600);

    // Connector 1 fills
    setTimeout(function () {
      steps[0].classList.add('completed');
      steps[0].classList.remove('active');
      if (connectors[0]) connectors[0].classList.add('filled');
      if (progressBar) progressBar.style.width = '33%';
    }, 2800);

    // Step 2: Propuesta
    setTimeout(function () {
      steps[1].classList.add('active');
      if (progressBar) progressBar.style.width = '50%';
    }, 4000);

    // Connector 2 fills
    setTimeout(function () {
      steps[1].classList.add('completed');
      steps[1].classList.remove('active');
      if (connectors[1]) connectors[1].classList.add('filled');
      if (progressBar) progressBar.style.width = '66%';
    }, 6200);

    // Step 3: Resultados
    setTimeout(function () {
      steps[2].classList.add('active');
      if (progressBar) progressBar.style.width = '85%';
    }, 7400);

    // Complete
    setTimeout(function () {
      steps[2].classList.add('completed');
      steps[2].classList.remove('active');
      if (progressBar) progressBar.style.width = '100%';
    }, 9600);
  }

  window.addEventListener('scroll', animateWorkflow);
  animateWorkflow();

  // --- Counter animation ---
  function animateCounters() {
    var counters = document.querySelectorAll('[data-target]');
    counters.forEach(function (counter) {
      if (counter.dataset.animated) return;

      var rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.9) return;

      counter.dataset.animated = 'true';
      var target = parseInt(counter.dataset.target);
      var duration = 2800;
      var start = performance.now();

      function update(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // --- Scroll reveal ---
  var revealElements = document.querySelectorAll(
    '.service-card, .client-card, .client-card--featured, .stat-card, .about__content, .about__photo-card'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
