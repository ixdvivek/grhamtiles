import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Order, payment, lead time, and shipping terms for Grham Tiles.",
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <LegalPage
      settings={settings}
      title="Terms & conditions"
      updated="Last updated July 2026"
      sections={[
        {
          heading: "1. Orders and payment",
          body: "Orders are confirmed on receipt of a 50% advance. Balance is due before dispatch or on-site laying begins.",
        },
        {
          heading: "2. Handmade variation",
          body: "Every tile is hand-poured; shade and finish vary naturally between batches. This is expected, not a defect.",
        },
        {
          heading: "3. Lead times",
          body: "Made-to-order tiles typically take 3–6 weeks depending on quantity and design. We'll confirm a date at order.",
        },
        {
          heading: "4. Shipping and export",
          body: "Export orders are crated and insured; the buyer is responsible for import duties in the destination country.",
        },
        {
          heading: "5. Cancellations",
          body: "Custom and made-to-order tiles cannot be cancelled once production has started.",
        },
        {
          heading: "6. Contact",
          body: "Questions about an order: hello@grhamtiles.com.",
        },
      ]}
    />
  );
}
