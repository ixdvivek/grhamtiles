import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import SectionHead from "@/components/SectionHead";
import SwatchBlock from "@/components/SwatchBlock";
import PortfolioCard from "@/components/PortfolioCard";
import Image from "next/image";
import { getAbout, getProjects, getSiteSettings } from "@/lib/data";
import { swatchBgClass } from "@/lib/swatches";

export const metadata: Metadata = {
  title: "About",
  description:
    "Grham Home Decors: two years young, built on a 150-year Athangudi tile tradition from Chettinad, Tamil Nadu.",
};

export default async function AboutPage() {
  const [settings, about, projects] = await Promise.all([
    getSiteSettings(),
    getAbout(),
    getProjects(),
  ]);

  return (
    <>
      <Nav settings={settings} variant="plain" active="About" />

      <main>
        <section className="px-5 pt-10 sm:px-12 sm:pt-16 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[100px]">
          <div className="sm:grid sm:grid-cols-2 sm:items-center sm:gap-12 lg:gap-20">
            <div>
              <Eyebrow color="red">{about.eyebrow}</Eyebrow>
              <h1 className="mt-3.5 font-display text-[42px] leading-[1.06] sm:text-[48px] lg:text-[64px]">
                {about.heading}
              </h1>
              <p className="mt-4.5 max-w-[44ch] text-base leading-relaxed sm:text-[17px] lg:text-lg">
                {about.intro}
              </p>
            </div>
            <SwatchBlock
              swatch="oxide-thara"
              label="Interior photo — finished floor in a home, coming soon"
              className="mt-8 aspect-[4/5] sm:mt-0"
            />
          </div>
        </section>

        <section id="workshop" className="px-5 pt-16 sm:px-12 sm:pt-[88px] lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[120px]">
          <Eyebrow color="red">{about.workshopEyebrow}</Eyebrow>
          <h2 className="mt-3.5 font-display text-[34px] leading-[1.15] sm:text-[40px] lg:text-[48px]">
            {about.workshopHeading}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed">{about.workshopIntro}</p>
        </section>

        <div className="mt-7 px-5 sm:mt-8 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:px-16">
          <div className={`aspect-[16/9] ${swatchBgClass["oxide-coffee"]} lg:aspect-[21/8]`} />
          <div className="pt-2.5 text-[11px] tracking-[0.08em] text-brand-muted uppercase">
            Mixing pigment, sand and cement by eye
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:gap-5">
            <WorkshopPhoto swatch="oxide-mustard" caption="Moulds, before pouring" />
            <WorkshopPhoto swatch="oxide-emerald" caption="Tapping the frame level" />
            <WorkshopPhoto
              swatch="oxide-periwinkle"
              caption="Athangudi, Sivaganga district"
              className="hidden sm:block"
            />
          </div>
        </div>

        <section className="px-5 pt-16 sm:px-12 sm:pt-[88px] lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[120px]">
          <Eyebrow color="red">Who makes them</Eyebrow>
          <h2 className="mt-3.5 font-display text-[34px] leading-[1.15] sm:text-[40px] lg:text-[48px]">
            The team
          </h2>
          <div className="mt-8 flex flex-col gap-8 sm:mt-9 sm:grid sm:grid-cols-2 sm:gap-8 lg:mt-11 lg:grid-cols-4">
            {about.team.map((person) => (
              <div key={person.name} className="flex items-center gap-4.5 lg:flex-col lg:items-start lg:gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl text-white sm:h-[72px] sm:w-[72px] sm:text-[22px] lg:h-[88px] lg:w-[88px] lg:text-[26px] ${swatchBgClass[person.swatch]}`}
                >
                  {person.initials}
                </div>
                <div>
                  <div className="font-display text-[22px] leading-[1.2] sm:text-2xl">{person.name}</div>
                  <div className="mt-1 text-[13px] text-brand-muted">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:mt-16 sm:px-12 sm:py-[88px] lg:mt-[120px] lg:py-[120px]">
          <div className="lg:mx-auto lg:max-w-[1200px] lg:px-16">
            <SectionHead eyebrow="Recent work" title="Floors we've laid" />
            <div className="mt-7 grid grid-cols-1 gap-8 sm:mt-9 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {projects.slice(0, 3).map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
            <Button href="/portfolio" variant="ghost" size="sm" className="mt-2">
              Full portfolio →
            </Button>
          </div>
        </section>

        <section className="px-5 py-16 text-center sm:py-[88px] lg:py-[120px]">
          <Image
            src={settings.logo.mark}
            alt=""
            width={22}
            height={22}
            className="mx-auto mb-5 h-[18px] w-auto sm:mb-[22px] sm:h-5 lg:mb-6.5 lg:h-[22px]"
          />
          <h2 className="mx-auto max-w-[20ch] font-display text-[26px] leading-[1.15] sm:text-[32px] lg:text-[40px]">
            Come see the tiles, or tell us about your space.
          </h2>
          <Button href="/tiles" variant="primary" size="lg" className="mt-6 sm:mt-[26px] lg:mt-[30px]">
            See the tiles
          </Button>
        </section>
      </main>
    </>
  );
}

function WorkshopPhoto({
  swatch,
  caption,
  className = "",
}: {
  swatch: keyof typeof swatchBgClass;
  caption: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={`aspect-[3/4] ${swatchBgClass[swatch]}`} />
      <div className="mt-2 text-[10.5px] tracking-[0.08em] text-brand-muted uppercase">{caption}</div>
    </div>
  );
}
