import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Eyebrow from "@/components/Eyebrow";
import EnquiryForm from "@/components/EnquiryForm";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Grham Tiles about your space. Send a room size and a tile you like — we reply within two working days.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Nav settings={settings} variant="plain" active="Contact" />

      <main>
        <section className="px-5 pt-10 sm:px-12 sm:pt-16 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[88px]">
          <Eyebrow color="red">Get in touch</Eyebrow>
          <h1 className="mt-3.5 max-w-[16ch] font-display text-[clamp(44px,6.5vw,72px)] leading-[1.05]">
            Tell us about your space.
          </h1>
          <p className="mt-3.5 text-base leading-relaxed">
            Send a room size and a tile you like — we reply within two working days.
          </p>
        </section>

        <div className="mt-7 px-5 sm:mt-8 sm:grid sm:grid-cols-[1fr_340px] sm:items-start sm:gap-14 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:grid-cols-[1fr_380px] lg:gap-20 lg:px-16">
          <Suspense fallback={null}>
            <EnquiryForm />
          </Suspense>

          <div className="mt-10 sm:mt-0">
            <div className="flex flex-col gap-3.5 text-[15px] lg:text-base">
              <div>
                <span className="text-brand-muted">Phone</span> · {settings.contact.phone}
              </div>
              <div>
                <span className="text-brand-muted">Email</span> · {settings.contact.email}
              </div>
              <div>
                <span className="text-brand-muted">Workshop</span> · {settings.contact.workshop}
              </div>
            </div>
            <div className="relative mt-6 aspect-[4/3] bg-brand-stone">
              <span className="absolute right-4 bottom-3.5 left-4 text-[11px] tracking-[0.1em] text-brand-muted uppercase">
                Map — workshop location, coming soon
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 sm:h-20 lg:h-24" />
      </main>
    </>
  );
}
