/* ============================================================
   EB Services — Main JavaScript
   Mobile menu, smooth scroll, contact form, scroll animations
   Progressive enhancement — site works without JS
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('.main-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // --- Header Scroll Effect ---
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var scrolled = false;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50 && !scrolled) {
        header.classList.add('site-header--scrolled');
        scrolled = true;
      } else if (window.scrollY <= 50 && scrolled) {
        header.classList.remove('site-header--scrolled');
        scrolled = false;
      }
    }, { passive: true });
  }

  // --- Smooth Scroll for Anchor Links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // --- Contact Form Handling ---
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-group--error').forEach(function (group) {
        group.classList.remove('form-group--error');
      });

      // Validate
      var isValid = true;
      var errors = [];

      var name = form.querySelector('#contact-name');
      var phone = form.querySelector('#contact-phone');
      var email = form.querySelector('#contact-email');
      var service = form.querySelector('#contact-service');
      var message = form.querySelector('#contact-message');

      if (!name.value.trim()) {
        showFieldError(name, 'Please enter your name.');
        isValid = false;
      }

      if (!phone.value.trim() && !email.value.trim()) {
        showFieldError(phone, 'Please provide a phone number or email.');
        showFieldError(email, 'Please provide a phone number or email.');
        isValid = false;
      }

      if (email.value.trim() && !isValidEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address.');
        isValid = false;
      }

      if (!message.value.trim()) {
        showFieldError(message, 'Please describe your project.');
        isValid = false;
      }

      if (!isValid) {
        // Focus first error field
        var firstError = form.querySelector('.form-group--error .form-control');
        if (firstError) firstError.focus();
        return;
      }

      // Show success message
      var formContent = form.querySelector('.contact-form__fields');
      var successMsg = form.querySelector('.form-success');
      if (formContent && successMsg) {
        formContent.style.display = 'none';
        successMsg.classList.add('is-visible');
      }

      // In production, this would submit to a form service
      // For now, just log
      console.log('Form submitted:', {
        name: name.value,
        phone: phone.value,
        email: email.value,
        service: service.value,
        message: message.value
      });
    });

    // Clear error on input
    form.querySelectorAll('.form-control').forEach(function (input) {
      input.addEventListener('input', function () {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('form-group--error');
      });
    });
  }

  function showFieldError(field, message) {
    var group = field.closest('.form-group');
    if (!group) return;
    group.classList.add('form-group--error');
    var errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Scroll Animations (Intersection Observer) ---
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Gallery Filter Buttons (placeholder interaction) ---
  function initGalleryFilters() {
    var buttons = document.querySelectorAll('.gallery-filter-btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('gallery-filter-btn--active'); });
        this.classList.add('gallery-filter-btn--active');
        // In production, this would filter gallery items
        // For now, it just toggles the active state visually
      });
    });
  }

  // --- Phone Number Click Tracking (placeholder) ---
  function initPhoneTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        // In production, fire analytics event
        console.log('Phone call initiated from:', this.closest('section')
          ? this.closest('section').className
          : 'unknown');
      });
    });
  }

  // --- Active Navigation Highlighting ---
  function initActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('main-nav__link--active');
      }
    });
  }

  // --- Initialize Everything ---
  function init() {
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initGalleryFilters();
    initPhoneTracking();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
