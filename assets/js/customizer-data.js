/* Tile customizer — hardcoded preset data (MVP, no CMS).
   Deliberately shaped the way this would look as Sanity documents later
   (slug/name/description fields, a `regions` array with id/label/
   defaultPigment, sizeInches) so moving it into the Studio later is a
   schema + GROQ query away, not a rewrite. Nothing here is fetched or
   asynchronous — see CLAUDE.md if that changes. */
(function (global) {
  var TILE_UNITS = 80; // SVG viewBox units per mould; 10 units == 1 inch at the 8x8" MVP size
  var INCHES_PER_UNIT = 8 / TILE_UNITS;

  /* ---------- Pigments ---------- */
  var PIGMENTS = [
    { _type: 'pigment', slug: 'coffee', name: 'Coffee', hex: '#6F4E37' },
    { _type: 'pigment', slug: 'emerald', name: 'Emerald', hex: '#0F5C4A' },
    { _type: 'pigment', slug: 'cherry', name: 'Cherry', hex: '#A61C2E' },
    { _type: 'pigment', slug: 'mustard', name: 'Mustard', hex: '#D8A13B' },
    { _type: 'pigment', slug: 'teal', name: 'Teal', hex: '#2A6B63' },
    { _type: 'pigment', slug: 'maroon', name: 'Maroon', hex: '#7A1F2B' },
    { _type: 'pigment', slug: 'cement-grey', name: 'Cement grey', hex: '#8C8C86' },
    { _type: 'pigment', slug: 'white', name: 'White', hex: '#F3EEE4' }
  ];

  /* ---------- SVG builders ----------
     Small generator helpers rather than hand-authored path data, so the
     geometry stays correct and easy to retune. Every fillable shape gets
     a data-region attribute (for click handling) and fill="var(--region-X)"
     (so the customizer just sets a CSS custom property per region — no
     DOM walking needed to recolor). */

  function chessSvg() {
    var cells = 8, cell = TILE_UNITS / cells;
    var a = [], b = [];
    for (var row = 0; row < cells; row++) {
      for (var col = 0; col < cells; col++) {
        var rect = '<rect x="' + (col * cell) + '" y="' + (row * cell) + '" width="' + cell + '" height="' + cell + '"/>';
        ((row + col) % 2 === 0 ? a : b).push(rect);
      }
    }
    return '' +
      '<svg viewBox="0 0 ' + TILE_UNITS + ' ' + TILE_UNITS + '" xmlns="http://www.w3.org/2000/svg">' +
        '<g data-region="a" fill="var(--region-a)">' + a.join('') + '</g>' +
        '<g data-region="b" fill="var(--region-b)">' + b.join('') + '</g>' +
      '</svg>';
  }

  /* Reflects one corner-anchored shape (drawn for the top-left corner,
     anchored at the origin) into all four corners via translate+scale,
     so the geometry only has to be worked out once. */
  function cornerCopies(elementMarkup, regionId) {
    var t = TILE_UNITS;
    var transforms = [
      '',                                   // top-left
      'translate(' + t + ',0) scale(-1,1)', // top-right
      'translate(0,' + t + ') scale(1,-1)', // bottom-left
      'translate(' + t + ',' + t + ') scale(-1,-1)' // bottom-right
    ];
    return transforms.map(function (transform) {
      return '<g data-region="' + regionId + '" fill="var(--region-' + regionId + ')"' +
        (transform ? ' transform="' + transform + '"' : '') + '>' + elementMarkup + '</g>';
    }).join('');
  }

  function frenchClassicSvg() {
    var t = TILE_UNITS, c = t / 2, margin = 8;

    // Picture-frame border: outer square minus an inset square, evenodd.
    var borderD = 'M0,0 H' + t + ' V' + t + ' H0 Z M' + margin + ',' + margin +
      ' H' + (t - margin) + ' V' + (t - margin) + ' H' + margin + ' Z';

    // Corner scrollwork: a quarter-ring band anchored at the corner.
    var r1 = 15, r2 = 23;
    var scrollD = 'M' + r1 + ',0 A' + r1 + ',' + r1 + ' 0 0 1 0,' + r1 +
      ' L0,' + r2 + ' A' + r2 + ',' + r2 + ' 0 0 0 ' + r2 + ',0 Z';

    // Corner accent dot, just inside the scrollwork.
    var accentD = '<circle cx="' + (r1 - 4) + '" cy="' + (r1 - 4) + '" r="2.6"/>';

    // Medallion: a quatrefoil made of four overlapping circles around center.
    var dOff = 9, rad = 13;
    var lobeCenters = [45, 135, 225, 315].map(function (deg) {
      var rd = deg * Math.PI / 180;
      return [c + dOff * Math.cos(rd), c + dOff * Math.sin(rd)];
    });
    var medallion = lobeCenters.map(function (p) {
      return '<circle cx="' + p[0].toFixed(2) + '" cy="' + p[1].toFixed(2) + '" r="' + rad + '"/>';
    }).join('');

    return '' +
      '<svg viewBox="0 0 ' + t + ' ' + t + '" xmlns="http://www.w3.org/2000/svg">' +
        '<rect data-region="field" fill="var(--region-field)" x="0" y="0" width="' + t + '" height="' + t + '"/>' +
        '<path data-region="border" fill="var(--region-border)" fill-rule="evenodd" d="' + borderD + '"/>' +
        cornerCopies('<path d="' + scrollD + '"/>', 'scrollwork') +
        cornerCopies(accentD, 'accent') +
        '<g data-region="medallion" fill="var(--region-medallion)">' + medallion + '</g>' +
      '</svg>';
  }

  function damaskSvg() {
    var t = TILE_UNITS, c = t / 2, margin = 10;
    var borderD = 'M0,0 H' + t + ' V' + t + ' H0 Z M' + margin + ',' + margin +
      ' H' + (t - margin) + ' V' + (t - margin) + ' H' + margin + ' Z';

    // Eight petals: overlapping ellipses rotated around the center.
    var petals = [];
    for (var i = 0; i < 8; i++) {
      var angle = i * 45;
      petals.push('<ellipse cx="' + c + '" cy="' + (c - 15) + '" rx="7" ry="16" transform="rotate(' + angle + ' ' + c + ' ' + c + ')"/>');
    }

    return '' +
      '<svg viewBox="0 0 ' + t + ' ' + t + '" xmlns="http://www.w3.org/2000/svg">' +
        '<rect data-region="field" fill="var(--region-field)" x="0" y="0" width="' + t + '" height="' + t + '"/>' +
        '<path data-region="border" fill="var(--region-border)" fill-rule="evenodd" d="' + borderD + '"/>' +
        '<g data-region="petals" fill="var(--region-petals)">' + petals.join('') + '</g>' +
        '<circle data-region="center" fill="var(--region-center)" cx="' + c + '" cy="' + c + '" r="7"/>' +
      '</svg>';
  }

  /* ---------- Moulds ---------- */
  var MOULDS = [
    {
      _type: 'mould',
      slug: 'chess',
      name: 'Chess',
      description: 'A simple two-tone checkerboard — the easiest pattern to test the fill mechanic on.',
      sizeInches: { width: 8, height: 8 },
      regions: [
        { id: 'a', label: 'Light squares', defaultPigment: 'white' },
        { id: 'b', label: 'Dark squares', defaultPigment: 'coffee' }
      ],
      svg: chessSvg()
    },
    {
      _type: 'mould',
      slug: 'french-classic',
      name: 'French Classic',
      description: 'A medallion-and-scroll pattern in the Chettinad tradition, framed by a picture-frame border.',
      sizeInches: { width: 8, height: 8 },
      regions: [
        { id: 'field', label: 'Field', defaultPigment: 'teal' },
        { id: 'border', label: 'Border', defaultPigment: 'mustard' },
        { id: 'scrollwork', label: 'Corner scrollwork', defaultPigment: 'white' },
        { id: 'accent', label: 'Corner accent', defaultPigment: 'cherry' },
        { id: 'medallion', label: 'Medallion', defaultPigment: 'cherry' }
      ],
      svg: frenchClassicSvg()
    },
    {
      _type: 'mould',
      slug: 'damask',
      name: 'Damask',
      description: 'A floral medallion, eight petals turning around a plain center.',
      sizeInches: { width: 8, height: 8 },
      regions: [
        { id: 'field', label: 'Field', defaultPigment: 'white' },
        { id: 'border', label: 'Border', defaultPigment: 'emerald' },
        { id: 'petals', label: 'Petals', defaultPigment: 'emerald' },
        { id: 'center', label: 'Center', defaultPigment: 'mustard' }
      ],
      svg: damaskSvg()
    }
  ];

  global.CUSTOMIZER_PIGMENTS = PIGMENTS;
  global.CUSTOMIZER_MOULDS = MOULDS;
  global.CUSTOMIZER_TILE_UNITS = TILE_UNITS;
  global.CUSTOMIZER_INCHES_PER_UNIT = INCHES_PER_UNIT;
})(window);
