/*
 * Shared zoom lightbox for tile-detail slides and portfolio-detail images.
 * Slides are plain oxide swatch tokens today (e.g. "--oxide-cherry"); the
 * shape leaves room to add a video slide later — e.g. { type: 'video', src }
 * — by branching on typeof slide in renderSlide() instead of assuming a string.
 */
(function (global) {
  var lb, prevBtn, nextBtn, contentEl;
  var slides = [];
  var index = 0;

  function renderSlide() {
    contentEl.style.background = 'var(' + slides[index] + ')';
    var multi = slides.length > 1;
    prevBtn.style.display = multi ? 'flex' : 'none';
    nextBtn.style.display = multi ? 'flex' : 'none';
  }

  function show(i) {
    index = (i + slides.length) % slides.length;
    renderSlide();
  }

  function close() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function ensureLightbox() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<div class="lightbox-inner">' +
        '<button type="button" class="lightbox-close" aria-label="Close">×</button>' +
        '<button type="button" class="slider-arrow lightbox-prev" aria-label="Previous image">‹</button>' +
        '<button type="button" class="slider-arrow lightbox-next" aria-label="Next image">›</button>' +
        '<div class="lightbox-content" style="width:100%;height:100%"></div>' +
      '</div>';
    document.body.appendChild(lb);

    contentEl = lb.querySelector('.lightbox-content');
    prevBtn = lb.querySelector('.lightbox-prev');
    nextBtn = lb.querySelector('.lightbox-next');

    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  function open(slideList, startIndex) {
    ensureLightbox();
    slides = slideList;
    show(startIndex || 0);
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  global.grhamOpenLightbox = open;
})(window);
