/**
 * Content model for Grham Tiles.
 *
 * These shapes are the contract between the UI and the content source.
 * They're hand-authored here against mock data in `lib/data.ts` today;
 * when this wires up to Sanity, the Sanity schema types should mirror
 * these fields 1:1 and `lib/data.ts` becomes a thin GROQ-fetching layer
 * returning the same shapes — components should not need to change.
 */

/** Oxide pigment swatch tokens, matching Tailwind color tokens in globals.css. */
export type OxideToken =
  | "oxide-cherry"
  | "oxide-coffee"
  | "oxide-emerald"
  | "oxide-teal"
  | "oxide-thara"
  | "oxide-mustard"
  | "oxide-daffodil"
  | "oxide-periwinkle"
  | "ivory";

export type TileCategory = "flooring" | "paving" | "oxide";

export interface Tile {
  slug: string;
  name: string;
  category: TileCategory;
  categoryLabel: string;
  /** e.g. `8" × 8"` */
  size: string;
  /** e.g. "Cement oxide" */
  material: string;
  /** Hero / card background swatch */
  swatch: OxideToken;
  /** Colorway dots shown on cards and detail pages */
  swatches: OxideToken[];
  tagline: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short teaser copy, used on the homepage */
  summary: string;
  /** Long-form copy, used on the services page */
  description: string;
  cta: string;
  swatch: OxideToken;
  photoLabel: string;
}

export interface Project {
  slug: string;
  project: string;
  location: string;
  /** Tile names referenced in this project (not all resolve to a Tile slug) */
  tiles: string[];
  swatch: OxideToken;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  swatch: OxideToken;
  excerpt: string;
  body: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  swatch: OxideToken;
}

export interface About {
  eyebrow: string;
  heading: string;
  intro: string;
  workshopEyebrow: string;
  workshopHeading: string;
  workshopIntro: string;
  team: TeamMember[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: {
    horizontal: string;
    horizontalWhite: string;
    verticalWhite: string;
    mark: string;
    markWhite: string;
  };
  primaryNav: NavLink[];
  footerExplore: NavLink[];
  footerStudio: NavLink[];
  contact: {
    phone: string;
    email: string;
    workshop: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
  copyright: string;
}
