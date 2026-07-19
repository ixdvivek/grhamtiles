import type { Metadata } from "next";
import { playfair, dmSans } from "./fonts";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Grham Tiles — Handmade Athangudi tiles from Chettinad",
    template: "%s — Grham Tiles",
  },
  description:
    "Grham Tiles makes handmade Athangudi tiles by hand-pouring oxide pigment, local sand, and cement — a 150-year-old Chettinad craft, for modern homes.",
  icons: {
    icon: "/images/mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-brand-ivory text-brand-ink antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
