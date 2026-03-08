/* ============================================================
   EB Services — Config Loader
   Fetches site-config.json and applies values to data-config
   elements throughout the page. Falls back gracefully.
   ============================================================ */

(function () {
  'use strict';

  // Resolve dot-notation path on an object: "business.phone" -> config.business.phone
  function resolve(obj, path) {
    return path.split('.').reduce(function (o, key) {
      return o && o[key] !== undefined ? o[key] : undefined;
    }, obj);
  }

  // Apply simple text/href replacements from config
  function applySimpleBindings(config) {
    // Text content bindings: data-config="business.phone"
    document.querySelectorAll('[data-config]').forEach(function (el) {
      var path = el.getAttribute('data-config');
      var value = resolve(config, path);
      if (value !== undefined && value !== '') {
        el.textContent = value;
      }
    });

    // HTML content bindings: data-config-html="about.ownerBio"
    document.querySelectorAll('[data-config-html]').forEach(function (el) {
      var path = el.getAttribute('data-config-html');
      var value = resolve(config, path);
      if (value !== undefined && value !== '') {
        el.innerHTML = value;
      }
    });

    // Href bindings: data-config-href="tel:{business.phoneLink}"
    document.querySelectorAll('[data-config-href]').forEach(function (el) {
      var template = el.getAttribute('data-config-href');
      var result = template.replace(/\{([^}]+)\}/g, function (match, path) {
        var value = resolve(config, path);
        return (value !== undefined && value !== '') ? value : match;
      });
      // Only update if all placeholders were resolved
      if (result.indexOf('{') === -1) {
        el.setAttribute('href', result);
      }
    });
  }

  // Rebuild the testimonials section on index.html
  function applyTestimonials(config) {
    var grid = document.querySelector('.testimonials-grid');
    if (!grid || !config.testimonials || !config.testimonials.length) return;

    var city = config.business && config.business.city ? config.business.city : '';

    grid.innerHTML = '';
    config.testimonials.forEach(function (t) {
      var testimonialCity = t.city || city;
      var card = document.createElement('div');
      card.className = 'testimonial-card fade-in is-visible';
      card.innerHTML =
        '<div class="testimonial-card__stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
        '<p class="testimonial-card__text">"' + escapeHtml(t.text) + '"</p>' +
        '<div class="testimonial-card__author">' + escapeHtml(t.author) + '</div>' +
        '<div class="testimonial-card__project">' + escapeHtml(t.project) + ' &mdash; ' + escapeHtml(testimonialCity) + '</div>';
      grid.appendChild(card);
    });
  }

  // Rebuild the gallery grid on gallery.html (only items with src)
  function applyGallery(config) {
    var grid = document.querySelector('.gallery-grid');
    if (!grid || !config.gallery) return;

    // Only rebuild if there are items with actual photos
    var withPhotos = config.gallery.filter(function (item) { return item.src; });
    if (!withPhotos.length) return;

    grid.innerHTML = '';
    config.gallery.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'gallery-card fade-in is-visible';
      card.setAttribute('data-category', item.category || 'all');

      if (item.src) {
        card.innerHTML =
          '<img src="' + escapeAttr(item.src) + '" alt="' + escapeAttr(item.alt || item.label || '') + '" class="gallery-card__img" loading="lazy">' +
          '<span class="gallery-card__label">' + escapeHtml(item.label || '') + '</span>' +
          '<div class="gallery-card__info">' +
            '<div class="gallery-card__title">' + escapeHtml(item.label || '') + '</div>' +
            (item.alt ? '<div class="gallery-card__desc">' + escapeHtml(item.alt) + '</div>' : '') +
          '</div>';
      } else {
        var icons = { bathroom: '&#128705;', kitchen: '&#127858;', handyman: '&#128295;', improvement: '&#127968;', entertainment: '&#127916;' };
        var icon = icons[item.category] || '&#128247;';
        card.innerHTML =
          '<div class="gallery-card__placeholder">' +
            '<div class="gallery-card__placeholder-icon" aria-hidden="true">' + icon + '</div>' +
            '<div class="gallery-card__placeholder-text">Photo Coming Soon</div>' +
          '</div>' +
          '<span class="gallery-card__label">' + escapeHtml(item.label || '') + '</span>' +
          '<div class="gallery-card__info">' +
            '<div class="gallery-card__title">' + escapeHtml(item.label || '') + '</div>' +
          '</div>';
      }

      grid.appendChild(card);
    });
  }

  // Rebuild the gallery preview on index.html (Recent Work section)
  function applyGalleryPreview(config) {
    var grid = document.querySelector('.gallery-preview-grid');
    if (!grid || !config.gallery) return;

    // Only rebuild if there are items with actual photos
    var withPhotos = config.gallery.filter(function (item) { return item.src; });
    if (!withPhotos.length) return;

    // Show up to 3 items
    var items = config.gallery.slice(0, 3);
    grid.innerHTML = '';
    items.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'gallery-preview-card fade-in is-visible';

      if (item.src) {
        card.innerHTML =
          '<img src="' + escapeAttr(item.src) + '" alt="' + escapeAttr(item.alt || item.label || '') + '" class="gallery-preview-card__img" loading="lazy">' +
          '<div class="gallery-preview-card__overlay">' +
            '<div class="gallery-preview-card__label">' + escapeHtml(item.label || '') + '</div>' +
          '</div>';
      } else {
        card.innerHTML =
          '<div class="gallery-preview-card__placeholder">' +
            '<div class="gallery-preview-card__placeholder-icon" aria-hidden="true">&#128247;</div>' +
            '<div class="gallery-preview-card__placeholder-text">Project Photo Coming Soon</div>' +
          '</div>' +
          '<div class="gallery-preview-card__overlay">' +
            '<div class="gallery-preview-card__label">' + escapeHtml(item.label || '') + '</div>' +
          '</div>';
      }

      grid.appendChild(card);
    });
  }

  // Update JSON-LD structured data on index.html
  function applyStructuredData(config) {
    var ldScript = document.querySelector('script[type="application/ld+json"]');
    if (!ldScript) return;

    try {
      var ld = JSON.parse(ldScript.textContent);
      var b = config.business;

      if (b.name) ld.name = b.name;
      if (b.phone) ld.telephone = b.phone;
      if (b.email) ld.email = b.email;

      if (ld.address) {
        if (b.city) ld.address.addressLocality = b.city;
        if (b.state) ld.address.addressRegion = b.state;
        if (b.zip) ld.address.postalCode = b.zip;
      }

      if (b.serviceArea) ld.areaServed = b.serviceArea;

      // Social links
      if (b.social) {
        var sameAs = [];
        if (b.social.facebook) sameAs.push(b.social.facebook);
        if (b.social.instagram) sameAs.push(b.social.instagram);
        if (b.social.nextdoor) sameAs.push(b.social.nextdoor);
        ld.sameAs = sameAs;
      }

      ldScript.textContent = JSON.stringify(ld, null, 2);
    } catch (e) {
      // Fail silently — structured data stays as-is
    }
  }

  // Utility: escape HTML to prevent XSS
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Utility: escape attribute value
  function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Main loader
  function loadConfig() {
    fetch('site-config.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Config not found');
        return response.json();
      })
      .then(function (config) {
        applySimpleBindings(config);
        applyTestimonials(config);
        applyGallery(config);
        applyGalleryPreview(config);
        applyStructuredData(config);
      })
      .catch(function () {
        // Fail silently — placeholders remain as fallback
      });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
  } else {
    loadConfig();
  }
})();
