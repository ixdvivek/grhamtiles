/* Tile customizer — interactive logic. Grows stage by stage; each stage's
   code lives in its own clearly-marked section below and reads/writes a
   shared `customizerState` object so later stages can pick up where
   earlier ones left off, without the earlier stages depending on the
   later ones existing. */
(function (global) {
  var customizerState = {
    activeMouldSlug: null,
    // mouldSlug -> { regionId: pigmentSlug }
    assignments: {}
  };

  function pigmentBySlug(slug) {
    for (var i = 0; i < CUSTOMIZER_PIGMENTS.length; i++) {
      if (CUSTOMIZER_PIGMENTS[i].slug === slug) return CUSTOMIZER_PIGMENTS[i];
    }
    return null;
  }

  function mouldBySlug(slug) {
    for (var i = 0; i < CUSTOMIZER_MOULDS.length; i++) {
      if (CUSTOMIZER_MOULDS[i].slug === slug) return CUSTOMIZER_MOULDS[i];
    }
    return null;
  }

  function defaultAssignments(mould) {
    var map = {};
    mould.regions.forEach(function (r) { map[r.id] = r.defaultPigment; });
    return map;
  }

  function ensureAssignments(mould) {
    if (!customizerState.assignments[mould.slug]) {
      customizerState.assignments[mould.slug] = defaultAssignments(mould);
    }
    return customizerState.assignments[mould.slug];
  }

  /* ============================================================
     Stage 1 — Mould + Color Customizer
     ============================================================ */
  (function stage1() {
    var svgHost, paletteHost, regionListHost, mouldTabsHost, statusHost, resetBtn;
    var selectedRegionId = null;

    function applyColors(mould) {
      var svgEl = svgHost.querySelector('svg');
      if (!svgEl) return;
      var assignments = ensureAssignments(mould);
      mould.regions.forEach(function (r) {
        var pigment = pigmentBySlug(assignments[r.id]) || pigmentBySlug(r.defaultPigment);
        svgEl.style.setProperty('--region-' + r.id, pigment.hex);
      });
    }

    function highlightSelectedRegion() {
      var svgEl = svgHost.querySelector('svg');
      if (!svgEl) return;
      svgEl.querySelectorAll('[data-region]').forEach(function (el) {
        el.classList.toggle('is-selected', el.getAttribute('data-region') === selectedRegionId);
      });
    }

    function updateStatus(mould) {
      var region = null;
      mould.regions.forEach(function (r) { if (r.id === selectedRegionId) region = r; });
      statusHost.textContent = region
        ? 'Editing ' + region.label.toLowerCase() + ' — pick a color below.'
        : 'Click a region on the tile to start coloring it.';
    }

    function renderRegionList(mould) {
      var assignments = ensureAssignments(mould);
      regionListHost.innerHTML = mould.regions.map(function (r) {
        var pigment = pigmentBySlug(assignments[r.id]);
        var active = r.id === selectedRegionId ? ' is-active' : '';
        return '' +
          '<button type="button" class="region-row' + active + '" data-region-id="' + r.id + '">' +
            '<span class="region-swatch" style="background:' + pigment.hex + '"></span>' +
            '<span class="region-label">' + r.label + '</span>' +
            '<span class="region-pigment-name">' + pigment.name + '</span>' +
          '</button>';
      }).join('');
      regionListHost.querySelectorAll('.region-row').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectRegion(mould, btn.getAttribute('data-region-id'));
        });
      });
    }

    function selectRegion(mould, regionId) {
      selectedRegionId = regionId;
      highlightSelectedRegion();
      updateStatus(mould);
      renderRegionList(mould);
    }

    function bindSvgClicks(mould) {
      var svgEl = svgHost.querySelector('svg');
      svgEl.addEventListener('click', function (e) {
        var target = e.target.closest('[data-region]');
        if (!target) return;
        selectRegion(mould, target.getAttribute('data-region'));
      });
    }

    function renderMouldTabs() {
      mouldTabsHost.innerHTML = CUSTOMIZER_MOULDS.map(function (m) {
        var active = m.slug === customizerState.activeMouldSlug ? ' is-active' : '';
        return '<button type="button" class="mould-tab' + active + '" data-mould-slug="' + m.slug + '">' + m.name + '</button>';
      }).join('');
      mouldTabsHost.querySelectorAll('.mould-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          renderMould(btn.getAttribute('data-mould-slug'));
        });
      });
    }

    function renderMould(slug) {
      var mould = mouldBySlug(slug);
      customizerState.activeMouldSlug = slug;
      svgHost.innerHTML = mould.svg;
      applyColors(mould);
      bindSvgClicks(mould);
      renderMouldTabs();
      selectRegion(mould, mould.regions[0].id);
      global.dispatchEvent(new CustomEvent('grham:customizer:mould-changed', { detail: { mould: mould } }));
    }

    function renderPalette() {
      paletteHost.innerHTML = CUSTOMIZER_PIGMENTS.map(function (p) {
        return '' +
          '<button type="button" class="pigment-swatch" data-pigment-slug="' + p.slug + '" style="background:' + p.hex + '" title="' + p.name + '">' +
            '<span class="visually-hidden">' + p.name + '</span>' +
          '</button>';
      }).join('');
      paletteHost.querySelectorAll('.pigment-swatch').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!selectedRegionId) return;
          var mould = mouldBySlug(customizerState.activeMouldSlug);
          var assignments = ensureAssignments(mould);
          assignments[selectedRegionId] = btn.getAttribute('data-pigment-slug');
          applyColors(mould);
          renderRegionList(mould);
          global.dispatchEvent(new CustomEvent('grham:customizer:colors-changed', { detail: { mould: mould } }));
        });
      });
    }

    function resetActiveMould() {
      var mould = mouldBySlug(customizerState.activeMouldSlug);
      customizerState.assignments[mould.slug] = defaultAssignments(mould);
      applyColors(mould);
      selectRegion(mould, mould.regions[0].id);
      global.dispatchEvent(new CustomEvent('grham:customizer:colors-changed', { detail: { mould: mould } }));
    }

    function init() {
      svgHost = document.getElementById('customizerSvgHost');
      if (!svgHost) return; // Stage 1 markup isn't on this page

      paletteHost = document.getElementById('customizerPalette');
      regionListHost = document.getElementById('customizerRegionList');
      mouldTabsHost = document.getElementById('customizerMouldTabs');
      statusHost = document.getElementById('customizerStatus');
      resetBtn = document.getElementById('customizerReset');

      renderPalette();
      resetBtn.addEventListener('click', resetActiveMould);
      renderMould(CUSTOMIZER_MOULDS[0].slug); // Chess, pre-loaded with its defaults
    }

    document.addEventListener('DOMContentLoaded', init);
  })();

  /* Exposed so later stages (and stage 1 itself, above) can read the
     current design without re-deriving it. */
  global.grhamCustomizer = {
    state: customizerState,
    mouldBySlug: mouldBySlug,
    pigmentBySlug: pigmentBySlug
  };
})(window);
