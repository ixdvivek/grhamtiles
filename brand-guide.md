# Grham Tiles — Brand Guide

A portable design-language reference, distilled from the live site's
source of truth (`assets/css/tokens/*.css`). Use this to brief any
design tool or designer on collateral outside the website itself —
social posts, brochures, packaging, signage — without needing to read
CSS.

## Colors

### Brand core

| Token | Hex | Use |
|---|---|---|
| Ivory | `#F3EEE4` | Primary background — warm off-white, never pure white |
| Ink | `#1C1A17` | Body text |
| Navy | `#03062A` | Primary buttons, CTAs, dark/inverse sections, footer |
| Red | `#C1272D` | The one accent color — eyebrows, links, active states, highlights. Used sparingly and deliberately |
| Mustard | `#D8A13B` | Rare, decorative only |
| Teal | `#2A6B63` | Rare, decorative only |
| Stone | `#E4DDCE` | Card backgrounds, alternating sections |

**Navy and red are never used together as co-equal colors in one composition** — navy is structural (backgrounds, buttons), red is the single accent that draws the eye. Don't let a layout have two competing "loud" colors.

### Oxide pigment palette

The tile product line's actual pigment names — use these for anything referencing specific tiles, swatches, or a "collection" feel:

`Cherry` `#9E3039` · `Coffee` `#5C4033` · `Emerald` `#2E5E4E` · `Teal` `#2A6B63` · `Thara` `#3E7A70` · `Mustard` `#D8A13B` · `Daffodil` `#E5C468` · `Periwinkle` `#56618F`

## Typography

- **Display** — Playfair Display. Headlines only. Set large and confident; weight 400–900 available. Line-height tight (1.07).
- **Body** — DM Sans. Everything else — body copy, UI, labels.
- **Eyebrows** (small overline labels above headings) — DM Sans, uppercase, 12.5px, letter-spacing 0.1em, medium weight, usually in red.

Scale (reference, adapt per medium):
| Role | Size |
|---|---|
| Hero headline | 44–72px, fluid |
| Section headline | 28–40px, fluid |
| Card title | 24–30px, fluid |
| Body | 17px |
| Small / caption | 14px |
| Eyebrow | 12.5px |

## Shape & geometry

**Corners are square.** The product is a physical tile — nothing in the brand's surfaces should look soft or rounded. Buttons get a near-imperceptible 2px radius (functionally square); pill shapes are reserved only for small tag/filter chips. Photos, cards, and swatches have zero radius.

**Shadows are almost entirely absent.** Flat color and clean edges do the work instead of elevation. The only place a soft shadow appears is a sticky bar or an overlay dialog, and even then it's subtle.

**Generous whitespace.** Section padding scales from 64px (mobile) to 120px (desktop) — the brand reads as unhurried, not dense.

## Logo & mark

- **Wordmark**: "Grham Tiles" in the display face, with tracked-out "TILES" beneath it.
- **Mark**: an 8-petal flower motif (`assets/images/mark.png`, white variant `mark-white.png`) — the brand's standalone icon, used for favicons, loading states, and as a subtle background watermark (5% opacity) on ivory sections.
- On dark backgrounds, always swap to the white logo/mark variants — never place the ink-colored version on navy or red.

## Recurring motif: the tile strip

A repeating decorative border of four alternating tile designs (flower, cornered-flower, mandala, star — see `assets/images/tile-strip.svg`) built from the oxide palette. Used as a frieze/divider — e.g. after a footer, or as a section break. This is the brand's signature "wallpaper" pattern; reach for it whenever a design needs a decorative band that says "handmade tile" without using an actual photo.

## Photography

**No stock photography, ever.** Until real product/site photos exist for a given tile or project, the brand's honest placeholder is a flat oxide-color block with a small "Photo coming soon" label — not a generic interior-design stock photo. This is a deliberate brand position (see `CLAUDE.md`), not a temporary shortcut — carry it into other collateral: an empty photo slot should read as "authentic and in-progress," never as filled-in-with-something-fake.

## Voice

Dry, factual, quietly proud. Claims are grounded in the actual process (eight-step hand-pour, water-curing, 150-year Athangudi tradition) rather than adjectives. Prefers a specific true detail over a generic superlative — "every tile spends eight days hardening in water" does more work than "premium quality tiles." Light wordplay is fine when it's earned by a real fact (e.g. "Setting soon" — tiles *set*, cement *sets*), not decoration for its own sake.
