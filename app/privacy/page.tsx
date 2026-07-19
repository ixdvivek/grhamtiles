import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Grham Tiles collects, uses, and protects your information.",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <LegalPage
      settings={settings}
      title="Privacy policy"
      updated="Last updated July 2026"
      sections={[
        {
          heading: "1. What we collect",
          body: "Name, phone or email, and anything you share in an enquiry — room size, city, tile preference.",
        },
        {
          heading: "2. How we use it",
          body: "Only to respond to your enquiry, prepare a quote, and coordinate delivery or site visits.",
        },
        {
          heading: "3. Sharing",
          body: "We don't sell or share your details with third parties, other than shipping partners for export orders.",
        },
        {
          heading: "4. Retention",
          body: "Enquiry details are kept for as long as needed to complete an order, then deleted on request.",
        },
        {
          heading: "5. Your rights",
          body: "Write to hello@grhamtiles.com to see, correct, or delete the information we hold about you.",
        },
      ]}
    />
  );
}
