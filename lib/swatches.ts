import type { OxideToken } from "./types";

/**
 * Tailwind's build-time scanner only picks up utility classes that appear
 * as literal strings somewhere in the source — `bg-${token}` template
 * literals are invisible to it. This map is the safelist: every value
 * here is a literal Tailwind class, so it survives the production build
 * even though the *lookup* is dynamic.
 */
export const swatchBgClass: Record<OxideToken, string> = {
  "oxide-cherry": "bg-oxide-cherry",
  "oxide-coffee": "bg-oxide-coffee",
  "oxide-emerald": "bg-oxide-emerald",
  "oxide-teal": "bg-oxide-teal",
  "oxide-thara": "bg-oxide-thara",
  "oxide-mustard": "bg-oxide-mustard",
  "oxide-daffodil": "bg-oxide-daffodil",
  "oxide-periwinkle": "bg-oxide-periwinkle",
  ivory: "bg-brand-ivory",
};

/** Swatches light enough to need a hairline border when rendered as a small dot. */
export function isLightSwatch(token: OxideToken): boolean {
  return token === "ivory" || token === "oxide-daffodil";
}
