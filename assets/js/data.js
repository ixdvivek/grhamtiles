/* Shared content catalog used by tiles.html, tile.html, portfolio.html,
   portfolio-detail.html, blog.html and blog-article.html.

   Backed by Sanity (studio/), fetched read-only from its CDN API below.
   The arrays defined inline here are the fallback catalog: they render
   immediately so the site never has a blank first paint, and they're
   what stays live if the fetch fails, times out, or the dataset is still
   empty. Real content entered in the Studio transparently replaces them
   once it loads — nothing else on any page needs to change to benefit,
   since every page already just reads GRHAM_TILES / GRHAM_PROJECTS /
   GRHAM_POSTS after awaiting grhamDataReady. */
(function (global) {
  var SANITY_PROJECT_ID = '6rmlud2u';
  var SANITY_DATASET = 'production';
  var SANITY_API_VERSION = '2024-01-01';
  var SANITY_FETCH_TIMEOUT_MS = 2500;

  var TILES = [
    {
      slug: 'kolam',
      name: 'Kolam',
      category: 'flooring',
      categoryLabel: 'Courtyard classic',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-cherry',
      swatches: ['--oxide-cherry', '--oxide-mustard', '--ivory'],
      tagline: 'A courtyard classic in cherry and ivory, handmade in Athangudi.',
      description: 'The pattern most visitors to Chettinad remember — a radiating star that reads as a woven kolam when laid across a floor. Cherry and mustard oxides on an ivory ground; the sheen deepens with every year of footfall.'
    },
    {
      slug: 'emerald-star',
      name: 'Emerald Star',
      category: 'flooring',
      categoryLabel: 'Geometric',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-emerald',
      swatches: ['--oxide-emerald', '--oxide-daffodil', '--ivory'],
      tagline: 'An eight-point star in emerald and daffodil, handmade in Athangudi.',
      description: 'An eight-point star drawn from mansion floors in Chettinad. Emerald centres, daffodil points — bold up close, calm across a room.'
    },
    {
      slug: 'thara',
      name: 'Thara',
      category: 'oxide',
      categoryLabel: 'Geometric',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-thara',
      swatches: ['--oxide-thara', '--oxide-coffee', '--ivory'],
      tagline: 'Interlocking waves in thara green and coffee, handmade in Athangudi.',
      description: 'Interlocking waves named for the pigment they carry. Thara green and coffee brown, hand-poured in mirror pairs so the pattern runs unbroken.'
    },
    {
      slug: 'periwinkle-border',
      name: 'Periwinkle Border',
      category: 'paving',
      categoryLabel: 'Border tile',
      spec: '8" × 4" · Cement oxide',
      swatch: '--oxide-periwinkle',
      swatches: ['--oxide-periwinkle', '--ivory'],
      tagline: 'A quiet running border in periwinkle, handmade in Athangudi.',
      description: 'A half-width running border that frames a field of plain or patterned tiles. Periwinkle on ivory; also poured to order in any two oxides.'
    },
    {
      slug: 'daffodil-dot',
      name: 'Daffodil Dot',
      category: 'flooring',
      categoryLabel: 'Courtyard classic',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-mustard',
      swatches: ['--oxide-daffodil', '--oxide-cherry', '--ivory'],
      tagline: 'A sunny dot-and-diamond in daffodil and cherry, handmade in Athangudi.',
      description: 'Dot-and-diamond in daffodil yellow with cherry accents — traditionally laid in verandahs where morning light lands.'
    },
    {
      slug: 'coffee-field',
      name: 'Coffee Field',
      category: 'paving',
      categoryLabel: 'Plain field',
      spec: '10" × 10" · Cement oxide',
      swatch: '--oxide-coffee',
      swatches: ['--oxide-coffee', '--ivory'],
      tagline: 'A plain field tile in deep coffee, handmade in Athangudi.',
      description: 'A single-oxide field tile. Hand-poured plains carry subtle tonal movement no machine tile has — and they take the famous Athangudi sheen fastest.'
    },
    {
      slug: 'cherry-diamond',
      name: 'Cherry Diamond',
      category: 'oxide',
      categoryLabel: 'Geometric',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-cherry',
      swatches: ['--oxide-cherry', '--ivory'],
      tagline: 'A bold diamond lattice in cherry red, handmade in Athangudi.',
      description: 'A diamond lattice sized for a strong repeat across larger rooms. Cherry oxide on an ivory ground — one of our most-requested colorways for verandahs.'
    },
    {
      slug: 'ivory-trellis',
      name: 'Ivory Trellis',
      category: 'flooring',
      categoryLabel: 'Plain field',
      spec: '8" × 8" · Cement oxide',
      swatch: '--oxide-thara',
      swatches: ['--ivory', '--oxide-thara'],
      tagline: 'A pale trellis in ivory and thara green, handmade in Athangudi.',
      description: 'A quieter pattern for rooms that want texture without contrast — a fine trellis line in thara green, set into an ivory field.'
    },
    {
      slug: 'agni',
      name: 'Agni',
      category: 'flooring',
      categoryLabel: 'Statement pattern',
      spec: '10" × 10" · Cement oxide',
      thickness: '19 mm',
      swatch: '--oxide-cherry',
      swatches: ['--oxide-cherry', '--ink', '--oxide-mustard'],
      tagline: 'A fiery statement pattern in cherry and mustard on black, handmade in Athangudi.',
      description: 'Fiery terracotta-red and burnt-orange tones dominate this design, sharply outlined in black. Named for agni (fire), it brings warmth and drama underfoot — a striking choice for entryways and courtyards.'
    }
  ];

  var PROJECTS = [
    {
      slug: 'courtyard-restoration-fort-kochi',
      project: 'Courtyard restoration',
      location: 'Fort Kochi',
      tiles: ['Kolam', 'Periwinkle Border'],
      swatch: '--oxide-emerald',
      description: 'A 90-year-old Dutch-era courtyard, re-laid with a Kolam field and a Periwinkle Border edge — the original layout, redrawn in oxide.'
    },
    {
      slug: 'weekend-home-verandah-wayanad',
      project: 'Weekend home verandah',
      location: 'Wayanad',
      tiles: ['Daffodil Dot'],
      swatch: '--oxide-mustard',
      description: 'A hillside weekend home’s open verandah, laid entirely in Daffodil Dot so morning light catches the pattern from breakfast onward.'
    },
    {
      slug: 'heritage-cafe-floor-alleppey',
      project: 'Heritage café floor',
      location: 'Alleppey',
      tiles: ['Emerald Star', 'Coffee Field'],
      swatch: '--oxide-periwinkle',
      description: 'A backwater-facing café in a converted warehouse, mixing an Emerald Star dining floor with a plain Coffee Field counter run.'
    },
    {
      slug: 'garden-bungalow-munnar',
      project: 'Garden bungalow',
      location: 'Munnar',
      tiles: ['Thara'],
      swatch: '--oxide-thara',
      description: 'A tea-estate bungalow’s sunroom, floored end to end in Thara so the interlocking pattern reads as one continuous wave underfoot.'
    },
    {
      slug: 'city-apartment-foyer-kochi',
      project: 'City apartment foyer',
      location: 'Kochi',
      tiles: ['Cherry Diamond'],
      swatch: '--oxide-cherry',
      description: 'A compact apartment entryway where a bold Cherry Diamond field does the work a full room of tile usually does.'
    },
    {
      slug: 'boutique-hotel-lobby-thekkady',
      project: 'Boutique hotel lobby',
      location: 'Thekkady',
      tiles: ['Ivory Trellis', 'Kolam'],
      swatch: '--oxide-coffee',
      description: 'A forest-edge hotel lobby pairing a quiet Ivory Trellis field with a Kolam medallion at the reception desk.'
    }
  ];

  var POSTS = [
    {
      slug: 'why-our-tiles-get-shinier-with-age',
      title: 'Why our tiles get shinier with age',
      date: 'July 2, 2026',
      swatch: '--oxide-cherry',
      excerpt: 'The self-healing sheen isn’t a coating — it’s the cement itself, and it only shows up with use.',
      body: [
        'Every Grham tile leaves the workshop matte. It’s only after months of foot traffic that the surface starts to change — a slow, even sheen that spreads outward from the places people actually walk.',
        'That sheen isn’t a coating or a polish. It’s the cement itself, compacting under repeated pressure until the surface reflects light the way glass does. No sealant can fake it, and no sealant can stop it either — it happens because of use, not despite it.',
        'This is also why we tell clients not to over-protect a new floor. A tile treated too gently just stays matte longer. The floor is meant to be walked on.',
        'Eighteen months in, most homes we’ve laid show the beginning of this shine at doorways and along the main path through a room — a quiet record of how the space actually gets used.'
      ]
    },
    {
      slug: 'inside-an-eight-step-morning-at-the-workshop',
      title: 'Inside an eight-step morning at the workshop',
      date: 'June 14, 2026',
      swatch: '--oxide-mustard',
      excerpt: 'From blending pigment to the finished stack: what actually happens between 7am and noon.',
      body: [
        'Work starts before the workshop gets hot. By seven, the day’s oxide is already being measured out — pigment, local sand, and cement, blended to whatever colour recipe the morning’s orders call for.',
        'From there it’s eight steps, always in the same order: blending, mixing, moulding onto sheets of glass, compressing a dry backing layer by hand, hardening, eight days of hydrolysis in water, shade-drying, and a final check by eye and hand.',
        'None of it is timed to a clock. A mould gets tapped level until it’s level, not until a timer says so. That’s the part that doesn’t scale, and the part we’re not interested in scaling away.'
      ]
    },
    {
      slug: 'reading-a-floor-plan-in-kolam-patterns',
      title: 'Reading a floor plan in Kolam patterns',
      date: 'May 28, 2026',
      swatch: '--oxide-emerald',
      excerpt: 'How a single repeating motif was laid out across courtyards for a century and a half.',
      body: [
        'A kolam is normally chalk on a doorstep, redrawn every morning and gone by evening. Cast in oxide tile, the same motif stays put — which changes how it gets designed.',
        'Chettinad courtyards used the repeat to mark territory without walls: a denser pattern near the threshold, a plainer field further in, a border tile to close the edge. Our Kolam tile keeps that logic, which is why it’s almost always specified with a border rather than laid alone.',
        'If you’re planning a courtyard from scratch, start with the border first. The field pattern is the easy decision; the edge is what makes the room read as finished.'
      ]
    },
    {
      slug: 'choosing-tile-size-for-a-verandah',
      title: 'Choosing tile size for a verandah',
      date: 'May 9, 2026',
      swatch: '--oxide-coffee',
      excerpt: 'A practical look at 8-inch versus 10-inch formats, and where each one earns its keep.',
      body: [
        'Most of our patterned tiles are cast at 8" × 8" — small enough that a repeat reads clearly within a normal room width. Plain field tiles like Coffee Field are also offered at 10" × 10", which changes the maths on a verandah more than people expect.',
        'Fewer, larger tiles mean fewer joints, which means less visual noise on a floor you’re trying to keep calm. On a patterned tile the opposite is true — you want enough repeats across the width to read as a field, not a scatter.',
        'Our rule of thumb: patterned tile, go 8". Plain field on a run longer than about twelve feet, ask about 10".'
      ]
    },
    {
      slug: 'what-water-absorption-numbers-actually-mean',
      title: 'What water absorption numbers actually mean',
      date: 'April 22, 2026',
      swatch: '--oxide-periwinkle',
      excerpt: 'Reading a specs table before you commit a floor to it — the numbers that matter and why.',
      body: [
        'Every tile we send out is tested for water absorption, and every specs table on this site quotes a number under 10%. It’s worth knowing what that figure is actually protecting against.',
        'Lower absorption means the tile takes on less moisture from a wet mop or a monsoon-season courtyard, which matters most for outdoor paving and ground-floor rooms. It has nothing to do with stain resistance, which is a separate, sealing-dependent question.',
        'For most interior floors, anything under 10% is comfortably safe. For open courtyards and exposed paving, ask us for the specific batch figure — hand-poured tile varies slightly between runs, and we’d rather tell you the real number than a rounded one.'
      ]
    }
  ];

  global.GRHAM_TILES = TILES;
  global.GRHAM_PROJECTS = PROJECTS;
  global.GRHAM_POSTS = POSTS;

  global.grhamFindBySlug = function (list, slug) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) return list[i];
    }
    return null;
  };

  global.grhamSlugForName = function (name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  function formatPostDate(value) {
    // Sanity's `date` field comes back as "YYYY-MM-DD"; the fallback
    // catalog above already uses the site's display format ("July 2,
    // 2026") directly, so only reformat values that look like ISO dates.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value;
    var parsed = new Date(value + 'T00:00:00');
    if (isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  var GROQ_QUERY =
    '{' +
      '"tiles": *[_type == "tile"] | order(name asc){' +
        '"slug": slug.current, name, category, categoryLabel, spec, thickness, tagline, description, swatch, swatches, ' +
        '"image": image.asset->url, "gallery": gallery[].asset->url' +
      '},' +
      '"projects": *[_type == "project"] | order(project asc){' +
        '"slug": slug.current, project, location, tiles, description, swatch, ' +
        '"image": image.asset->url, "gallery": gallery[].asset->url' +
      '},' +
      '"posts": *[_type == "post"] | order(date desc){' +
        '"slug": slug.current, title, date, excerpt, body, swatch, "image": image.asset->url' +
      '}' +
    '}';

  var queryUrl =
    'https://' + SANITY_PROJECT_ID + '.apicdn.sanity.io/v' + SANITY_API_VERSION +
    '/data/query/' + SANITY_DATASET + '?query=' + encodeURIComponent(GROQ_QUERY);

  function fetchFromSanity() {
    return fetch(queryUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Sanity responded ' + res.status);
        return res.json();
      })
      .then(function (json) {
        var result = json && json.result;
        if (!result) return;
        if (Array.isArray(result.tiles) && result.tiles.length) {
          global.GRHAM_TILES = result.tiles;
        }
        if (Array.isArray(result.projects) && result.projects.length) {
          global.GRHAM_PROJECTS = result.projects;
        }
        if (Array.isArray(result.posts) && result.posts.length) {
          global.GRHAM_POSTS = result.posts.map(function (post) {
            return Object.assign({}, post, { date: formatPostDate(post.date) });
          });
        }
      })
      .catch(function (err) {
        // Sanity unreachable, CORS-blocked, or the dataset is still
        // empty — the fallback catalog above is already live, so the
        // site keeps working exactly as it did before this integration.
        console.warn('Grham: using built-in fallback catalog —', err.message);
      });
  }

  var timeoutGuard = new Promise(function (resolve) {
    setTimeout(resolve, SANITY_FETCH_TIMEOUT_MS);
  });

  // Whichever finishes first wins: a slow/unreachable network still lets
  // the page render (with the fallback data already in place) within
  // SANITY_FETCH_TIMEOUT_MS rather than blocking indefinitely. The real
  // fetch keeps running in the background and still applies its result
  // if it resolves after the guard fires.
  global.grhamDataReady = Promise.race([fetchFromSanity(), timeoutGuard]);
})(window);
