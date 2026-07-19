# Grham Tiles

A photography-led, editorial marketing site for Grham Home Decors — a
handmade Athangudi tile studio in Kerala. Built from the "Grham Tiles"
Claude Design handoff bundle.

## Tech stack

- **Next.js 16** (App Router), TypeScript, React 19
- **Tailwind CSS v4** — CSS-first config (no `tailwind.config.ts`); all
  theme customization lives in `app/globals.css` via `@theme`
- **Fonts**: self-hosted via `next/font/local` (`app/fonts.ts`), woff2
  files in `app/fonts/`
- Package manager: npm (`package-lock.json` is committed)
- Content: currently a mock data module (`lib/data.ts`) — see
  [Backend: moving to Sanity](#backend-moving-to-sanity) below

### Commands

```
npm run dev      # dev server (Turbopack)
npm run build    # production build — also runs typecheck
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint.config.mjs)
```

### Project structure

```
app/                     App Router routes (one folder per route segment)
  fonts.ts                next/font/local loaders (Playfair Display, DM Sans)
  fonts/                  self-hosted woff2 files
  globals.css             Tailwind import + @theme design tokens
  layout.tsx              root layout: fonts, <Footer/>, metadata defaults
  page.tsx                home
  about/page.tsx
  tiles/page.tsx           listing (client-side category filter)
  tiles/[slug]/page.tsx     detail template, generateStaticParams over lib/data
  services/page.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  contact/page.tsx
  thank-you/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx            404
components/               One component per file, no page-specific inlining
  Nav.tsx                  variants: float (home hero) / plain / minimal
  DetailHeader.tsx         transparent-over-photo header for tile/portfolio detail
  MobileMenu.tsx           full-screen overlay, owned/toggled by Nav & DetailHeader
  Footer.tsx               async server component, self-fetches siteSettings
  Button.tsx, Eyebrow.tsx, Tag.tsx, SwatchDots.tsx, SwatchBlock.tsx
  SpecsTable.tsx, EnquiryForm.tsx, ThankYouHeading.tsx
  TileCard.tsx, PortfolioCard.tsx, BlogCard.tsx
  ServiceBlock.tsx         exports ServiceCard (homepage teaser) + ServiceRow (services page)
  TileFilter.tsx           client component: category filter + grid
  TileEnquireButtons.tsx   sticky mobile bar + inline desktop button
  SectionHead.tsx, PageHero.tsx, LegalPage.tsx   small layout helpers
lib/
  types.ts                 content model (see below)
  data.ts                  mock content + async getX()/getXBySlug() accessors
  swatches.ts               OxideToken -> Tailwind class safelist (see note below)
public/images/             logo + mark PNGs
```

### A Tailwind v4 gotcha you'll hit in this codebase

Tailwind's build-time scanner only generates CSS for utility class names
that appear as **literal strings** in the source. Several places in this
app pick a color/class based on data (e.g. a tile's oxide swatch) — a
template literal like `` `bg-${token}` `` is invisible to the scanner and
silently produces no styles.

The fix, used throughout: a static lookup object whose *values* are
complete literal class names (`lib/swatches.ts` is the canonical
example). Follow that pattern for any new dynamic-color/class needs
instead of building class strings at runtime.

The other place this bites: conditional classes must branch on complete
strings (`cond ? "sm:order-1" : "sm:order-2"`), not interpolate into a
shared template (`` `sm:order-${cond ? 1 : 2}` ``). See `ServiceBlock.tsx`
for the pattern.

### Breakpoints

The design has exactly two content breakpoints — tablet at 768px, desktop
at 1200px — which don't line up with Tailwind's defaults. `app/globals.css`
overrides them:

- `sm:` → 768px (tablet)
- `lg:` → 1200px (desktop)
- `md:` is left at its default and **unused** throughout this project —
  don't reach for it; use `sm:`/`lg:` per the above.

## Design tokens

Defined in `app/globals.css` under `@theme inline`. Source of truth is
the Claude Design handoff's `tokens/colors.css` and `tokens/typography.css`.

### Colors

Brand core (`bg-brand-*`, `text-brand-*`, etc. — prefixed to avoid
colliding with Tailwind's built-in `red`/`teal`/`stone` scales):

| Token | Hex | Use |
|---|---|---|
| `brand-ivory` | `#F3EEE4` | page background |
| `brand-ink` | `#1C1A17` | body text |
| `brand-navy` | `#03062A` | primary buttons, nav CTA, inverse sections |
| `brand-red` | `#C1272D` | the one accent — links, eyebrows, active states |
| `brand-mustard` | `#D8A13B` | rare, decorative only |
| `brand-teal` | `#2A6B63` | rare, decorative only |
| `brand-stone` | `#E4DDCE` | card backgrounds, alternating sections |
| `brand-muted` | `#6B6459` | secondary text |

Navy and red are never used together in one component. Oxide pigment
palette (`bg-oxide-*`) — the flat-color photography placeholders used
everywhere real tile/site photography is still pending, per the brand
brief ("never stock photos"):

`oxide-cherry` `#9E3039` · `oxide-coffee` `#5C4033` · `oxide-emerald`
`#2E5E4E` · `oxide-teal` `#2A6B63` · `oxide-thara` `#3E7A70` ·
`oxide-mustard` `#D8A13B` · `oxide-daffodil` `#E5C468` · `oxide-periwinkle`
`#56618F`

### Type

- Display: Playfair Display (`font-display`) — headings, tile names set
  large (tile detail h1 goes up to 88px at desktop)
- Body: DM Sans (`font-body`) — everything else; eyebrows are DM Sans,
  12.5px, uppercase, `tracking-[0.1em]`
- Corners are square (it's a tile). Buttons/inputs use `rounded-[2px]`;
  tags use `rounded-full`. Cards and photo placeholders have no radius.

## Content model

`lib/types.ts` defines the shapes; `lib/data.ts` currently satisfies them
with hand-written mock data behind `async` accessor functions
(`getTiles()`, `getTileBySlug()`, `getServices()`, `getProjects()`,
`getPosts()`, `getAbout()`, `getSiteSettings()`, etc.).

| Type | Description |
|---|---|
| **Tile** | A product: `slug`, `name`, `category` (flooring/paving/oxide), `categoryLabel`, `size`, `material`, `swatch` (hero color), `swatches` (colorway dots), `tagline`, `description`. 8 tiles in the catalog. |
| **Service** | Export / Paving / Oxide flooring: `slug`, `title`, `summary` (homepage teaser copy), `description` (long-form, services page), `cta`, `swatch`, `photoLabel`. |
| **Project** | A portfolio entry: `slug`, `project` (title), `location`, `tiles` (string names — not all resolve to a `Tile.slug`, see note below), `swatch`, `description`. |
| **Post** | A blog article: `slug`, `title`, `date`, `swatch`, `excerpt`, `body` (paragraph array). |
| **About** | Singleton: story copy, workshop copy, `team: TeamMember[]`. |
| **SiteSettings** | Singleton: nav links, footer links, logo paths, contact info, social links, copyright. Fetched independently by `Nav` (via prop from each page) and by `Footer` (self-fetched — it lives in the root layout and needs no props). |

`Project.tiles` is an array of plain tile **names**, not slugs/references —
some portfolio entries name a tile that isn't in the current 8-tile
catalog. `getTileByName()` resolves what it can; call sites (see
`PortfolioDetailPage`) render a plain `<span>` instead of a link when a
name doesn't resolve. Keep this tolerant-resolution behavior when this
moves to Sanity — don't make `tiles` a hard reference array without
checking whether the content team is comfortable losing untracked tile
mentions.

## Backend: moving to Sanity

This site is about to be wired up to **Sanity** as the CMS backend.
`lib/data.ts` is deliberately shaped as the seam for that migration:

- Every accessor is already `async` and already returns the exact shapes
  in `lib/types.ts` — pages and components `await` these calls and
  should not need to change.
- The plan is to replace the body of each function in `lib/data.ts` with
  a GROQ query (via the Sanity client / `next-sanity`), while keeping
  the function signatures and return shapes identical.
- `lib/types.ts` should become the basis for the Sanity schema
  definitions (`tile`, `service`, `project`, `post`, `about`,
  `siteSettings` document types) — keep them in sync by hand until
  there's a generated-types pipeline in place.
- `generateStaticParams` in the three `[slug]` routes (`tiles`,
  `portfolio`, `blog`) will need to query Sanity for the slug list
  instead of reading the local array — same shape, different source.
- Not yet decided / worth raising when Sanity work starts: ISR revalidate
  window vs. on-demand revalidation via a Sanity webhook, and whether
  `SiteSettings`/`About` become Sanity singletons or stay hardcoded.
