import localFont from "next/font/local";

/**
 * Self-hosted brand fonts (Latin subset — covers all current site copy).
 * Both are variable fonts, so one file each covers the full weight range.
 */
export const playfair = localFont({
  src: "./fonts/playfairdisplay-v40-regular.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  style: "normal",
  display: "swap",
});

export const dmSans = localFont({
  src: "./fonts/dmsans-v17-regular.woff2",
  variable: "--font-dmsans",
  weight: "100 1000",
  style: "normal",
  display: "swap",
});
