import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Button from "@/components/Button";
import ThankYouHeading from "@/components/ThankYouHeading";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enquiry Sent",
  description: "Thanks for your enquiry — Grham Tiles replies within two working days.",
};

export default async function ThankYouPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col">
      <Nav settings={settings} variant="minimal" />

      <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
        <Image
          src={settings.logo.mark}
          alt=""
          width={40}
          height={40}
          className="mb-7 h-8 w-auto lg:mb-8 lg:h-10"
        />
        <div className="text-[13px] font-medium tracking-[0.1em] text-brand-red uppercase lg:text-sm">
          Enquiry sent
        </div>

        <Suspense
          fallback={
            <h1 className="mt-3.5 font-display text-[34px] leading-[1.15] sm:text-[48px]">
              Got it — we&rsquo;ll be in touch.
            </h1>
          }
        >
          <ThankYouHeading />
        </Suspense>

        <p className="mt-3.5 max-w-[48ch] text-base leading-relaxed text-brand-ink sm:mt-4 lg:text-[17px]">
          We reply within two working days, usually sooner, with pricing and sample options for your
          space.
        </p>
        <Button href="/tiles" variant="primary" size="lg" className="mt-7 lg:mt-8">
          Keep browsing tiles
        </Button>
      </div>
    </div>
  );
}
