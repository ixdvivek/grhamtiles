/* Decorative brand tile-pattern strip, appended after the footer (or after
   .center-page on the utility pages that have no footer) on every page. */
(function () {
  var anchor = document.querySelector('.site-footer') || document.querySelector('.center-page');
  if (!anchor) return;
  var strip = document.createElement('div');
  strip.className = 'brand-strip';
  strip.setAttribute('aria-hidden', 'true');
  var pattern = document.createElement('div');
  pattern.className = 'brand-strip-pattern';
  strip.appendChild(pattern);
  anchor.insertAdjacentElement('afterend', strip);
})();

(function () {
  var menu = document.getElementById('mobileMenu');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');
  if (!menu || !openBtn || !closeBtn) return;

  function openMenu() {
    menu.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
})();

/* Subtle parallax on the Craft section's background motif, if present. */
(function () {
  var motif = document.querySelector('.craft-motif');
  if (!motif) return;

  var ticking = false;

  function update() {
    var rect = motif.parentElement.getBoundingClientRect();
    var offset = (window.innerHeight - rect.top) * 0.06;
    motif.style.transform = 'translate(-50%, calc(-50% + ' + offset + 'px))';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

/* Scroll-triggered reveal: fades up each top-level content block in <main>
   (or each child of the lone <article> on the blog detail page) as it
   enters the viewport. Skips fixed/sticky chrome like the mobile enquire bar. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var mainEl = document.querySelector('main');
  if (!mainEl) return;

  var article = mainEl.querySelector(':scope > article');
  var pool = article ? article.children : mainEl.children;
  var SKIP = ['tile-sticky-bar'];

  var targets = Array.prototype.filter.call(pool, function (el) {
    return el.nodeType === 1 && !SKIP.some(function (c) { return el.classList.contains(c); });
  });
  if (!targets.length) return;

  targets.forEach(function (el) { el.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) { io.observe(el); });
})();

/* Branded load/navigation transition: a fixed navy overlay with the flower
   mark. html.grham-loading (set inline, right after <body>, before this
   script runs) hides body via CSS to prevent a flash of unstyled content;
   we cover the page with the overlay first, then remove that class and fade
   the overlay away. Internal link clicks reverse the fade before navigating. */
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');
  var mark = document.createElement('img');
  mark.className = 'page-transition-mark';
  mark.src = 'assets/images/mark-white.png';
  mark.alt = '';
  overlay.appendChild(mark);
  document.body.appendChild(overlay);

  // Show the overlay fully opaque with no transition, in the same tick
  // that the hidden body becomes visible again underneath it.
  overlay.style.transition = 'none';
  overlay.classList.add('is-visible');
  void overlay.offsetHeight;
  overlay.style.transition = '';
  document.documentElement.classList.remove('grham-loading');

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      overlay.classList.remove('is-visible');
    });
  });

  // Safety net: never let a stray error leave the page permanently hidden.
  setTimeout(function () { document.documentElement.classList.remove('grham-loading'); }, 1200);

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(href)) return;

    var url;
    try { url = new URL(href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;

    e.preventDefault();
    overlay.classList.add('is-visible');
    setTimeout(function () { window.location.href = link.href; }, 320);
  });
})();
