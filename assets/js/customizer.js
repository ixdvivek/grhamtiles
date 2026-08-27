/* Tile customizer — interactive logic. Grows stage by stage; each stage's
   code lives in its own clearly-marked section below and reads/writes a
   shared `customizerState` object so later stages can pick up where
   earlier ones left off, without the earlier stages depending on the
   later ones existing. */
(function (global) {
  var customizerState = {
    activeMouldSlug: null,
    // mouldSlug -> { regionId: pigmentSlug }
    assignments: {},
    // Stage 2: per-cell rotation (degrees), row-major [TL, TR, BL, BR].
    // Pre-set to a pinwheel rather than all-zero, so the rotation
    // feature is visibly doing something the moment the page loads.
    stage2Rotations: [0, 90, 270, 180]
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

  /* ============================================================
     Stage 2 — Repeat Unit / Rotation Composer
     Reads the live, colored SVG straight out of Stage 1's editor host
     (#customizerSvgHost) — no duplicated tile data — and re-renders
     whenever Stage 1 reports a mould or color change, so this stays in
     sync without Stage 1 needing to know Stage 2 exists.
     ============================================================ */
  (function stage2() {
    var GRID = 2; // fixed 2x2 for this MVP; the rest of the code doesn't
                  // assume 2 anywhere but the constant, so a size picker
                  // later just changes this and the grid markup.
    var CELL_PX = 260; // on-screen render size per tile copy

    var gridHost, canvas, ctx;
    var rotations = customizerState.stage2Rotations;

    function cycleRotation(index) {
      rotations[index] = (rotations[index] + 90) % 360;
      renderRotationControls();
      renderTexture();
    }

    function renderRotationControls() {
      gridHost.innerHTML = rotations.map(function (deg, i) {
        return '' +
          '<button type="button" class="rotate-cell" data-index="' + i + '" aria-label="Rotate this copy">' +
            '<span class="rotate-cell-icon" style="transform:rotate(' + deg + 'deg)">↻</span>' +
            '<span class="rotate-cell-deg">' + deg + '°</span>' +
          '</button>';
      }).join('');
      gridHost.querySelectorAll('.rotate-cell').forEach(function (btn) {
        btn.addEventListener('click', function () {
          cycleRotation(parseInt(btn.getAttribute('data-index'), 10));
        });
      });
    }

    /* Serializes the live Stage 1 SVG (including the inline
       custom-property colors JS set on it) to a data URL so it can be
       drawn onto <canvas> via an Image — canvas has no direct way to
       paint a live DOM SVG element, so this round-trip through a data
       URL is the standard way to rasterize one. */
    function activeTileImage() {
      var svgEl = document.querySelector('#customizerSvgHost svg');
      if (!svgEl) return Promise.reject(new Error('No active tile to compose'));
      var markup = new XMLSerializer().serializeToString(svgEl);
      var dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = reject;
        img.src = dataUrl;
      });
    }

    function renderTexture() {
      activeTileImage().then(function (img) {
        var size = GRID * CELL_PX;
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        for (var row = 0; row < GRID; row++) {
          for (var col = 0; col < GRID; col++) {
            var index = row * GRID + col;
            var cx = col * CELL_PX + CELL_PX / 2;
            var cy = row * CELL_PX + CELL_PX / 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotations[index] * Math.PI / 180);
            ctx.drawImage(img, -CELL_PX / 2, -CELL_PX / 2, CELL_PX, CELL_PX);
            ctx.restore();
          }
        }
        global.dispatchEvent(new CustomEvent('grham:customizer:texture-changed', { detail: { canvas: canvas } }));
      }).catch(function (err) {
        console.warn('Grham customizer: could not render repeat texture —', err.message);
      });
    }

    function init() {
      gridHost = document.getElementById('customizerRotationGrid');
      canvas = document.getElementById('customizerTextureCanvas');
      if (!gridHost || !canvas) return; // Stage 2 markup isn't on this page

      ctx = canvas.getContext('2d');
      renderRotationControls();
      renderTexture();

      // Stage 1 changed the mould or a color — recompose the texture.
      global.addEventListener('grham:customizer:mould-changed', renderTexture);
      global.addEventListener('grham:customizer:colors-changed', renderTexture);
    }

    document.addEventListener('DOMContentLoaded', init);
  })();

  /* ============================================================
     Stage 3 — Dimension Input + Perspective Placement
     ============================================================ */
  (function stage3() {
    var REPEAT_UNIT_INCHES = 16; // Stage 2's 2x2 grid of 8" tiles
    var REPEAT_UNIT_FT = REPEAT_UNIT_INCHES / 12;
    var CELL_PX = 60; // on-screen px per repeat unit in the tiled floor texture
    var GRID_SIZE = 16; // mesh-warp subdivisions; higher = smoother curves, slower

    var lengthInput, widthInput, infoHost, statusHost, photoInput;
    var stageHost, imgEl, canvas, ctx;
    var corners = null; // [{x,y}] x4 in the image's natural pixel space, TL/TR/BR/BL
    var handles = [];
    var floorTextureCanvas = document.createElement('canvas');
    var renderQueued = false;

    function queueRender() {
      if (renderQueued) return;
      renderQueued = true;
      requestAnimationFrame(function () { renderQueued = false; renderWarp(); });
    }

    /* A simple synthetic "empty room" photo so Stage 3 never starts on
       a blank canvas — an actual photo upload replaces it, at which
       point the corner handles reset to a centered guess since we have
       no idea where the floor is in an arbitrary photo. */
    function buildPlaceholderPhoto() {
      var w = 900, h = 600;
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      var pctx = c.getContext('2d');

      pctx.fillStyle = '#DCD3C4';
      pctx.fillRect(0, 0, w, h);

      var floor = [{ x: 230, y: 265 }, { x: 670, y: 265 }, { x: 860, y: 580 }, { x: 40, y: 580 }];
      var grad = pctx.createLinearGradient(0, 260, 0, 580);
      grad.addColorStop(0, '#CFC6B4');
      grad.addColorStop(1, '#B6A98F');
      pctx.fillStyle = grad;
      pctx.beginPath();
      pctx.moveTo(floor[0].x, floor[0].y);
      floor.slice(1).forEach(function (p) { pctx.lineTo(p.x, p.y); });
      pctx.closePath();
      pctx.fill();

      pctx.strokeStyle = 'rgba(28,26,23,.35)';
      pctx.lineWidth = 3;
      pctx.beginPath();
      pctx.moveTo(floor[0].x, floor[0].y);
      pctx.lineTo(floor[1].x, floor[1].y);
      pctx.stroke();

      return { dataUrl: c.toDataURL('image/png'), corners: floor, width: w, height: h };
    }

    function defaultCornersFor(width, height) {
      // A centered inset rectangle — a reasonable starting guess for an
      // arbitrary uploaded photo, since we can't detect the floor.
      var mx = width * 0.18, my = height * 0.22;
      return [
        { x: mx, y: my }, { x: width - mx, y: my },
        { x: width - mx, y: height - my }, { x: mx, y: height - my }
      ];
    }

    function renderHandles() {
      corners.forEach(function (corner, i) {
        var leftPct = (corner.x / imgEl.naturalWidth) * 100;
        var topPct = (corner.y / imgEl.naturalHeight) * 100;
        handles[i].style.left = leftPct + '%';
        handles[i].style.top = topPct + '%';
      });
    }

    function buildFloorTexture() {
      var lengthFt = parseFloat(lengthInput.value);
      var widthFt = parseFloat(widthInput.value);
      if (!(lengthFt > 0)) lengthFt = 12;
      if (!(widthFt > 0)) widthFt = 10;

      var repsX = Math.max(1, Math.ceil(lengthFt / REPEAT_UNIT_FT));
      var repsY = Math.max(1, Math.ceil(widthFt / REPEAT_UNIT_FT));

      var sourceTexture = document.getElementById('customizerTextureCanvas');
      if (!sourceTexture) return null;

      floorTextureCanvas.width = repsX * CELL_PX;
      floorTextureCanvas.height = repsY * CELL_PX;
      var fctx = floorTextureCanvas.getContext('2d');

      var cell = document.createElement('canvas');
      cell.width = CELL_PX; cell.height = CELL_PX;
      cell.getContext('2d').drawImage(sourceTexture, 0, 0, CELL_PX, CELL_PX);

      var pattern = fctx.createPattern(cell, 'repeat');
      fctx.fillStyle = pattern;
      fctx.fillRect(0, 0, floorTextureCanvas.width, floorTextureCanvas.height);

      infoHost.textContent = lengthFt + ' ft × ' + widthFt + ' ft ≈ ' + repsX + ' × ' + repsY +
        ' repeat units (' + REPEAT_UNIT_INCHES + '″ each)';

      return floorTextureCanvas;
    }

    function renderWarp() {
      if (!corners) return;
      var texture = buildFloorTexture();
      if (!texture) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grhamGeometry.warpTextureToQuad(ctx, texture, corners, GRID_SIZE);
      renderHandles();
    }

    function loadImage(src, knownCorners) {
      imgEl.onload = function () {
        canvas.width = imgEl.naturalWidth;
        canvas.height = imgEl.naturalHeight;
        corners = knownCorners || defaultCornersFor(imgEl.naturalWidth, imgEl.naturalHeight);
        queueRender();
      };
      imgEl.src = src;
    }

    function bindHandleDrag(index) {
      var handle = handles[index];
      var dragging = false;

      handle.addEventListener('pointerdown', function (e) {
        dragging = true;
        handle.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      handle.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var rect = imgEl.getBoundingClientRect();
        var nx = (e.clientX - rect.left) / rect.width * imgEl.naturalWidth;
        var ny = (e.clientY - rect.top) / rect.height * imgEl.naturalHeight;
        nx = Math.max(0, Math.min(imgEl.naturalWidth, nx));
        ny = Math.max(0, Math.min(imgEl.naturalHeight, ny));
        corners[index] = { x: nx, y: ny };
        queueRender();
      });
      var endDrag = function () { dragging = false; };
      handle.addEventListener('pointerup', endDrag);
      handle.addEventListener('pointercancel', endDrag);
    }

    function init() {
      stageHost = document.getElementById('photoStage');
      if (!stageHost) return; // Stage 3 markup isn't on this page

      lengthInput = document.getElementById('floorLength');
      widthInput = document.getElementById('floorWidth');
      infoHost = document.getElementById('dimensionInfo');
      statusHost = document.getElementById('stage3Status');
      photoInput = document.getElementById('photoUpload');
      imgEl = document.getElementById('floorPhotoImg');
      canvas = document.getElementById('warpOverlayCanvas');
      ctx = canvas.getContext('2d');
      handles = Array.prototype.slice.call(stageHost.querySelectorAll('.corner-handle'));

      handles.forEach(function (_, i) { bindHandleDrag(i); });

      lengthInput.addEventListener('input', queueRender);
      widthInput.addEventListener('input', queueRender);

      photoInput.addEventListener('change', function () {
        var file = photoInput.files && photoInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          statusHost.textContent = 'Drag the four corners onto your floor area.';
          loadImage(reader.result, null);
        };
        reader.readAsDataURL(file);
      });

      // Stage 2's texture changed (rotation, or Stage 1's mould/color
      // changed upstream of it) — recompose the warp with the new tile.
      global.addEventListener('grham:customizer:texture-changed', queueRender);

      var placeholder = buildPlaceholderPhoto();
      statusHost.textContent = 'Drag the four corners to fit your own floor, or upload a photo.';
      loadImage(placeholder.dataUrl, placeholder.corners);

      window.addEventListener('resize', function () { queueRender(); });
    }

    document.addEventListener('DOMContentLoaded', init);
  })();

  /* Exposed so later stages (and earlier stages' own code, above) can
     read the current design without re-deriving it. */
  global.grhamCustomizer = {
    state: customizerState,
    mouldBySlug: mouldBySlug,
    pigmentBySlug: pigmentBySlug
  };
})(window);
