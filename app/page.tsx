import Image from "next/image";
import Nav from "@/components/Nav";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SectionHead from "@/components/SectionHead";
import SwatchBlock from "@/components/SwatchBlock";
import TileCard from "@/components/TileCard";
import PortfolioCard from "@/components/PortfolioCard";
import { ServiceCard } from "@/components/ServiceBlock";
import { getSiteSettings, getTiles, getServices, getProjects } from "@/lib/data";

export default async function HomePage() {
  const [settings, tiles, services, projects] = await Promise.all([
    getSiteSettings(),
    getTiles(),
    getServices(),
    getProjects(),
  ]);

  const featuredTiles = tiles.slice(0, 4);
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <header className="relative box-border h-[640px] w-full overflow-hidden bg-oxide-cherry sm:h-[680px] lg:h-[760px]">
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/86 via-brand-navy/45 to-transparent" />
        <span className="absolute top-[88px] right-5 left-5 text-[11px] tracking-[0.1em] text-white/85 uppercase sm:top-24 sm:right-12 sm:left-12 lg:top-[110px]">
          Hero photo — tile floor underfoot, coming soon
        </span>

        <Nav settings={settings} variant="float" />

        <div className="absolute right-0 bottom-0 left-0 box-border px-5 pb-9 sm:px-12 sm:pb-14 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pb-16">
          <h1 className="max-w-[11ch] font-display text-[44px] leading-[1.07] text-white sm:max-w-[12ch] sm:text-[56px] sm:leading-[1.06] lg:max-w-[13ch] lg:text-[72px] lg:leading-[1.05]">
            {settings.tagline}
          </h1>
          <Button href="/tiles" variant="primary" size="lg" className="mt-6 sm:mt-7 lg:mt-8">
            Explore the Collection
          </Button>
        </div>
      </header>

      <main>
        <section className="px-5 pt-16 sm:px-12 sm:pt-24 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[120px]">
          <div className="sm:grid sm:grid-cols-2 sm:items-center sm:gap-10 lg:gap-16">
            <div>
              <div className="flex items-center gap-2">
                <Image src={settings.logo.mark} alt="" width={16} height={16} className="h-3.5 w-auto" />
                <Eyebrow color="red">Inspired by a 150-year craft</Eyebrow>
              </div>
              <h2 className="mt-3.5 font-display text-[28px] leading-[1.15] sm:text-[34px] lg:text-[40px]">
                The Craft
              </h2>
              <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed lg:text-lg">
                Every tile is hand-poured in Kerala, inspired by the 150-year Athangudi tradition —
                oxide pigment, local sand, and cement, cast one at a time on sheets of glass. No two
                are identical, and the shine only deepens with use.
              </p>
            </div>
            <SwatchBlock
              swatch="oxide-coffee"
              label="Process photo — hand-pouring onto glass, coming soon"
              className="mt-7 aspect-[4/3] sm:mt-0 sm:aspect-[4/5]"
            />
          </div>
        </section>

        <section className="px-5 pt-16 sm:px-12 sm:pt-24 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[120px]">
          <SectionHead eyebrow="From the workshop" title="Featured tiles" actionLabel="All tiles →" actionHref="/tiles" />
          <div className="mt-7 grid grid-cols-1 gap-11 sm:mt-10 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:grid-cols-4 lg:gap-8">
            {featuredTiles.map((tile) => (
              <TileCard key={tile.slug} tile={tile} />
            ))}
          </div>
        </section>

        <section className="mt-16 px-5 py-16 sm:mt-0 sm:px-12 sm:py-24 lg:py-[120px]">
          <div className="lg:mx-auto lg:max-w-[1200px] lg:px-16">
            <Eyebrow color="red">What we do</Eyebrow>
            <h2 className="mt-3.5 font-display text-[28px] leading-[1.15] sm:text-[34px] lg:text-[40px]">
              Three ways to work with us
            </h2>
            <div className="mt-7 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-8">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-12 sm:py-24 lg:py-[120px]">
          <div className="lg:mx-auto lg:max-w-[1200px] lg:px-16">
            <SectionHead
              eyebrow="Recent work"
              title="Floors we've laid"
              actionLabel="Full portfolio →"
              actionHref="/portfolio"
            />
            <div className="mt-7 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-8">
              {featuredProjects.map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:py-24">
          <Image
            src={settings.logo.mark}
            alt=""
            width={20}
            height={20}
            className="mb-6 h-[18px] w-auto sm:mb-7 lg:mb-8 lg:h-5"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:border-t sm:border-brand-ink/[0.16]">
            <FactRow label="Heritage" value="Inspired by 150 years of Athangudi craft" />
            <FactRow label="Process" value="Eight hand steps, no shortcuts" />
            <FactRow label="Every tile" value="Hand-poured — no two alike" />
          </div>
        </section>

        <section className="bg-brand-navy px-5 py-16 text-center sm:px-12 sm:py-24 lg:py-[120px]">
          <Image
            src={settings.logo.markWhite}
            alt=""
            width={48}
            height={48}
            className="mx-auto mb-5 h-10 w-auto sm:mb-6 lg:mb-7 lg:h-12"
          />
          <h2 className="font-display text-[28px] leading-[1.15] text-brand-ivory sm:mx-auto sm:max-w-[20ch] sm:text-[34px] lg:text-[40px]">
            Tell us about your space.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[52ch] text-base leading-relaxed text-brand-ivory/75 sm:mt-4 lg:mt-[18px] lg:text-[17px]">
            Send a room size and a tile you like — we reply within two working days with pricing and
            samples.
          </p>
          <Button href="/contact" variant="inverse" size="lg" className="mt-6 sm:mt-7 lg:mt-8">
            Start an enquiry
          </Button>
        </section>
      </main>
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-brand-ink/[0.16] pb-4 last:border-b-0 last:pb-0 sm:flex-1 sm:flex-col sm:items-start sm:border-b-0 sm:border-r sm:pt-[22px] sm:pr-6 sm:pb-0 sm:pl-6 sm:first:pl-0 sm:last:border-r-0">
      <span className="text-[13px] whitespace-nowrap text-brand-muted">{label}</span>
      <span className="text-right font-display text-lg sm:mt-2 sm:text-left sm:text-xl">{value}</span>
    </div>
  );
}
