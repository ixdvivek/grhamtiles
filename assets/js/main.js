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
