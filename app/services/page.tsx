import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import { ServiceRow } from "@/components/ServiceBlock";
import { getServices, getSiteSettings } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Export, paving, and oxide flooring — three ways to work with Grham Tiles, all built on the same 150-year Athangudi craft.",
};

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <>
      <Nav settings={settings} variant="plain" active="Services" />

      <main>
        <PageHero
          eyebrow="What we do"
          title="Three ways to work with us"
          lede="Direct sale, paving, and pigmented flooring — all built on the same 150-year craft."
          className="[&_h1]:max-w-[16ch]"
        />

        {services.map((service, i) => (
          <ServiceRow key={service.slug} service={service} reverse={i % 2 === 1} />
        ))}

        <section className="mt-20 bg-brand-navy px-5 py-16 text-center sm:mt-24 sm:px-12 sm:py-24 lg:mt-[100px] lg:py-[120px]">
          <Image
            src={settings.logo.markWhite}
            alt=""
            width={48}
            height={48}
            className="mx-auto mb-5 h-10 w-auto sm:mb-6 lg:mb-7 lg:h-12"
          />
          <h2 className="mx-auto max-w-[20ch] font-display text-[28px] leading-[1.15] text-brand-ivory sm:text-[34px] lg:text-[40px]">
            Not sure which fits your space?
          </h2>
          <p className="mx-auto mt-3.5 max-w-[52ch] text-base leading-relaxed text-brand-ivory/75 sm:mt-4 lg:mt-[18px] lg:text-[17px]">
            Tell us the room and the look you&rsquo;re after — we&rsquo;ll point you to the right
            service.
          </p>
          <Button href="/contact" variant="inverse" size="lg" className="mt-6 sm:mt-7 lg:mt-8">
            Start an enquiry
          </Button>
        </section>
      </main>
    </>
  );
}
