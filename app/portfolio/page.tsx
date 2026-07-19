import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import PortfolioCard from "@/components/PortfolioCard";
import { getProjects, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Floors we've laid — homes, courtyards, and cafés across Kerala and Tamil Nadu, tiled by Grham Tiles' own layers.",
};

export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);

  return (
    <>
      <Nav settings={settings} variant="plain" active="Portfolio" />

      <main>
        <PageHero
          eyebrow="Our work"
          title="Floors we've laid"
          lede="Homes, courtyards and cafés across Kerala and Tamil Nadu, tiled by our own layers."
        />

        <div className="mt-7 grid grid-cols-1 gap-8 px-5 pb-16 sm:mt-10 sm:grid-cols-2 sm:gap-7 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:grid-cols-3 lg:gap-8 lg:px-16 lg:pb-24">
          {projects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
