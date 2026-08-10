# Grham Tiles

A static HTML/CSS/vanilla-JS marketing site for Grham Home Decors — a
handmade Athangudi tile studio in Kerala. No build step, no framework;
hosted on GitHub Pages via `.github/workflows/deploy-pages.yml`.

## Structure

```
*.html                    One file per page, no templating — shared chrome
                           (nav, mobile menu, footer, brand strip) is
                           duplicated per page or injected by main.js.
assets/css/styles.css     Single shared stylesheet.
assets/js/
  data.js                  Content catalog: tiles, portfolio projects, blog
                            posts. Fetches from Sanity, falls back to a
                            hardcoded catalog — see "Backend: Sanity" below.
  site.js                  Render helpers (tileCardHTML, portfolioCardHTML,
                            blogCardHTML) shared across listing/detail pages.
  main.js                  Site-wide behavior: mobile menu, Craft-section
                            parallax, scroll-reveal, back-square peek
                            animation, branded page-transition overlay,
                            brand tile-pattern strip after the footer.
  lightbox.js              Shared zoom lightbox for tile/portfolio photos.
assets/images/             Logo, mark, and the decorative tile-strip SVG.
studio/                    Sanity Studio (the CMS) — see below.
```

## Backend: Sanity

Content (tiles, portfolio projects, blog posts) is backed by a Sanity
project (ID `9coo783b`, dataset `production`). The site stays fully
static — pages fetch content client-side from Sanity's CDN API at load
time, no server or build step involved.

### How it works (`assets/js/data.js`)

- A hardcoded fallback catalog (the original 9 tiles / 6 projects / 5
  posts) is defined inline and assigned to `GRHAM_TILES` /
  `GRHAM_PROJECTS` / `GRHAM_POSTS` immediately — the site never has a
  blank first paint.
- `data.js` then fires a single GROQ query at Sanity's CDN endpoint
  (`https://9coo783b.apicdn.sanity.io/...`) requesting all three
  collections at once, with image/gallery fields dereferenced to plain
  URLs (`"image": image.asset->url`).
- `window.grhamDataReady` is a promise that resolves once either the
  fetch settles or 2.5s passes, whichever is first (`Promise.race`) —
  so a slow/unreachable network still renders the page (with fallback
  data) within a bounded time instead of hanging.
- If the fetch succeeds and a collection has ≥1 document, it **replaces**
  the corresponding fallback array. Empty/missing collections, network
  errors, and non-200 responses are caught and logged
  (`console.warn`) — the fallback stays live, nothing breaks.
- Every page's inline script that reads `GRHAM_TILES`/`GRHAM_PROJECTS`/
  `GRHAM_POSTS` is wrapped in `grhamDataReady.then(function () { ... })`
  instead of running immediately at parse time. That's the only
  structural change this integration made to each page.

### Real photos vs. placeholder swatches

Every tile/service/project/post schema has an optional `image` (+
`gallery` for tiles/projects) field alongside the existing `swatch` /
`swatches` placeholder-color fields. `site.js`'s `grhamMediaStyle(swatch,
imageUrl)` helper — and the equivalent inline logic in `tile.html`
(slider), `portfolio-detail.html` (photo stack), and `lightbox.js` —
render the real photo when present and fall back to the flat oxide-color
placeholder + "Photo coming soon" label when not. Upload a photo in the
Studio and it takes over automatically; nothing else needs to change.

### `studio/` — the Sanity Studio

Schemas: `tile`, `service`, `project`, `post`, `about`, `siteSettings`
(`studio/schemaTypes/`). `about` and `siteSettings` are pinned as
singletons in the desk structure (`studio/sanity.config.ts`) so editors
land on the one existing document rather than a "create new" list.

**`about` and `siteSettings` are defined but not yet wired into the
HTML** — `about.html`'s story/workshop copy and every page's footer
contact info are still hardcoded in each HTML file. Only the three
collections that already rendered via JS templates (tiles, projects,
posts) are live from Sanity today. Wiring About/footer content the same
way is a reasonable next step, but touches 14 files for the footer alone,
so it was left out of this first pass.

`Project.tiles` is an array of plain tile **names**, not references —
some portfolio entries mention a tile that isn't in the current catalog.
The site resolves what it can (`grhamFindBySlug` + `grhamSlugForName`)
and renders plain text otherwise. Keep this tolerant-resolution behavior;
don't make it a hard reference array without checking the content team
is fine with losing untracked mentions.

`post.body` is a plain array of paragraph strings, matching the site's
current rendering (`post.body.map(p => '<p>'+p+'</p>')`). It is
deliberately **not** Sanity's rich-text (Portable Text) type — rendering
Portable Text client-side needs a parser library, which this
no-dependencies static site doesn't otherwise pull in. Upgrading to real
rich text is a fine future step; it just needs a small HTML-rendering
helper added alongside the data-fetch layer above.

### Setup already done

- `studio/` is scaffolded by hand (package.json, sanity.config.ts,
  sanity.cli.ts, schemas) rather than via `npm create sanity@latest`,
  because that command needs an authenticated Sanity session and the
  agent sandbox this was built in has `api.sanity.io` blocked by its
  network policy. `npm install` in `studio/` works fine (registry.npmjs.org
  isn't blocked); `sanity build` was verified to succeed locally.

### What's left — do these from your own machine

1. `cd studio && npm install` (if you haven't already).
2. `npx sanity login` — authenticate with your Sanity account.
3. `npx sanity deploy` — publishes the Studio to
   `https://<your-chosen-name>.sanity.studio` so editors can use it
   without running anything locally.
4. Open the deployed Studio and enter the first batch of content —
   tiles/projects/posts, matching the shapes in `studio/schemaTypes/`.
   The fallback catalog in `data.js` is a good reference for what fields
   to fill in per document.
5. Decide on CORS: Sanity's API needs your site's actual origin (e.g.
   `https://grhamdecors.github.io`, or your custom domain if one's
   attached) added to the project's allowed origins list
   (sanity.io/manage → API → CORS origins) or the client-side fetch will
   be blocked by the browser even though the dataset is public-readable.
6. The contact/enquiry form (`contact.html`) is unrelated to this and
   still doesn't submit anywhere — it's a no-op that redirects straight
   to `thank-you.html`. Sanity write tokens can't safely live in client
   JS, so that needs its own answer (a small serverless function, or a
   third-party form service) whenever it's tackled.
