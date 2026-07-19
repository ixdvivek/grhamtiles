import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import TileFilter from "@/components/TileFilter";
import { getSiteSettings, getTiles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Tiles",
  description:
    "Eight handmade Athangudi tile designs from Grham Tiles, in stock and made to order — flooring, paving, and oxide finishes.",
};

export default async function TilesPage() {
  const [settings, tiles] = await Promise.all([getSiteSettings(), getTiles()]);

  return (
    <>
      <Nav settings={settings} variant="plain" active="Tiles" />

      <main>
        <PageHero
          eyebrow="The collection"
          title="Our tiles"
          lede="Every tile hand-poured in Kerala, inspired by the 150-year Athangudi tradition. Eight designs, in stock and made to order."
        >
          <TileFilter tiles={tiles} />
        </PageHero>
      </main>
    </>
  );
}
