import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import DetailHeader from "@/components/DetailHeader";
import SwatchBlock from "@/components/SwatchBlock";
import SwatchDots from "@/components/SwatchDots";
import Eyebrow from "@/components/Eyebrow";
import SpecsTable from "@/components/SpecsTable";
import TileCard from "@/components/TileCard";
import TileEnquireButtons from "@/components/TileEnquireButtons";
import { getSiteSettings, getTileBySlug, getTiles } from "@/lib/data";
import { swatchBgClass } from "@/lib/swatches";

export async function generateStaticParams() {
  const tiles = await getTiles();
  return tiles.map((tile) => ({ slug: tile.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tile = await getTileBySlug(slug);
  if (!tile) return {};
  return { title: tile.name, description: tile.tagline };
}

export default async function TileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, tile, allTiles] = await Promise.all([
    getSiteSettings(),
    getTileBySlug(slug),
    getTiles(),
  ]);

  if (!tile) notFound();

  const gallery = [...tile.swatches, ...tile.swatches].slice(0, 4);
  const related = allTiles.filter((t) => t.slug !== tile.slug).slice(0, 4);
  const specs = {
    Size: `${tile.size} (${tile.size.startsWith('10"') ? "254 × 254 mm" : "200 × 200 mm"})`,
    Thickness: "18–20 mm",
    Finish: "Hand-polished",
    "Water absorption": "< 10%",
  };

  return (
    <>
      <DetailHeader settings={settings} backHref="/tiles" backLabel="Tiles" transparent />

      <main>
        <div className="sm:box-border sm:px-10 sm:pt-0 lg:mx-auto lg:max-w-[1400px] lg:px-16">
          <div className="sm:grid sm:grid-cols-[1fr_320px] sm:items-start sm:gap-10 lg:grid-cols-[1fr_480px] lg:gap-16">
            <div>
              <SwatchBlock swatch={tile.swatch} label="Tile photo — full view, coming soon" className="aspect-[4/5]" />
              <div className="mt-3 flex gap-2 overflow-x-auto sm:grid sm:grid-cols-2 sm:gap-2.5 sm:overflow-visible lg:grid-cols-4 lg:gap-3.5">
                {gallery.map((swatch, i) => (
                  <div
                    key={i}
                    className={`aspect-[4/5] w-[76px] shrink-0 sm:w-auto ${swatchBgClass[swatch]}`}
                  />
                ))}
              </div>
            </div>

            <div className="sm:sticky sm:top-6 sm:pt-2 lg:top-8">
              <div className="px-5 pt-2 sm:px-0 sm:pt-0">
                <div className="flex items-center gap-2">
                  <Image src={settings.logo.mark} alt="" width={16} height={16} className="h-[13px] w-auto" />
                  <Eyebrow color="red">
                    {tile.material} · {tile.size}
                  </Eyebrow>
                </div>
                <h1 className="mt-3 font-display text-[56px] leading-none sm:text-[52px] lg:text-[88px] lg:leading-[0.98]">
                  {tile.name}
                </h1>
                <p className="mt-3.5 max-w-[36ch] text-base leading-relaxed sm:max-w-none sm:text-[15px] lg:max-w-[42ch] lg:text-[17px]">
                  {tile.description}
                </p>

                <div className="mt-6">
                  <div className="mb-2.5 text-xs tracking-[0.1em] text-brand-muted uppercase">
                    Available colorways
                  </div>
                  <SwatchDots colors={tile.swatches} size={16} />
                </div>

                <div className="mt-8">
                  <SpecsTable specs={specs} />
                </div>

                <div className="mt-8">
                  <div className="mb-3 text-xs tracking-[0.1em] text-brand-muted uppercase">
                    What it&rsquo;s made of
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Oxide pigment", "Local river sand", "Portland cement"].map((ing) => (
                      <div key={ing} className="flex items-baseline gap-2.5">
                        <span className="h-[5px] w-[5px] shrink-0 bg-brand-red" />
                        <span className="text-[15px] leading-relaxed">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <TileEnquireButtons tileName={tile.name} tileSpec={`${tile.size} · ${tile.material}`} />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 px-5 sm:mt-16 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:px-16">
          <h2 className="font-display text-[28px] leading-[1.15] sm:text-[34px] lg:text-[40px]">
            More from the collection
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-8 pb-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {related.map((t) => (
              <TileCard key={t.slug} tile={t} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
