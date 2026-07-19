import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DetailHeader from "@/components/DetailHeader";
import SwatchBlock from "@/components/SwatchBlock";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import { getProjectBySlug, getProjects, getSiteSettings, getTileByName } from "@/lib/data";
import { swatchBgClass } from "@/lib/swatches";
import type { OxideToken } from "@/lib/types";

const THUMB_SWATCHES: OxideToken[] = [
  "oxide-mustard",
  "oxide-coffee",
  "oxide-periwinkle",
  "oxide-emerald",
];

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.project, description: project.description };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(slug)]);

  if (!project) notFound();

  const thumbs = THUMB_SWATCHES.filter((s) => s !== project.swatch).slice(0, 3);
  const resolvedTiles = await Promise.all(
    project.tiles.map(async (name) => ({ name, tile: await getTileByName(name) })),
  );

  return (
    <>
      <DetailHeader settings={settings} backHref="/portfolio" backLabel="All projects" transparent={false} />

      <main>
        <div className="mt-5 sm:box-border sm:px-10 lg:mx-auto lg:max-w-[1400px] lg:px-16">
          <div className="sm:grid sm:grid-cols-[1fr_300px] sm:items-start sm:gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div>
              <SwatchBlock
                swatch={project.swatch}
                label="Site photo — full view, coming soon"
                className="aspect-[3/2]"
              />
              <div className="mt-3 flex gap-2 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-2.5 sm:overflow-visible lg:gap-3.5">
                {thumbs.map((swatch) => (
                  <div
                    key={swatch}
                    className={`aspect-[3/2] w-24 shrink-0 sm:w-auto ${swatchBgClass[swatch]}`}
                  />
                ))}
              </div>
            </div>

            <div className="sm:sticky sm:top-6 lg:top-8">
              <div className="px-5 pt-5 sm:px-0 sm:pt-0">
                <div className="text-[13px] tracking-[0.08em] text-brand-muted uppercase">
                  {project.location}
                </div>
                <h1 className="mt-2.5 font-display text-4xl leading-[1.08] sm:text-[42px] lg:text-[56px] lg:leading-[1.05]">
                  {project.project}
                </h1>
                <p className="mt-4 text-base leading-relaxed sm:text-[15px] lg:text-[17px]">
                  {project.description}
                </p>

                <div className="mt-6 lg:mt-7">
                  <Eyebrow className="mb-2.5 block">Tiles used</Eyebrow>
                  <div className="flex flex-wrap gap-2.5">
                    {resolvedTiles.map(({ name, tile }) =>
                      tile ? (
                        <Link
                          key={name}
                          href={`/tiles/${tile.slug}`}
                          className="border border-brand-ink/[0.16] px-4 py-2 text-sm font-medium text-brand-ink transition-colors hover:border-brand-ink"
                        >
                          {name} →
                        </Link>
                      ) : (
                        <span
                          key={name}
                          className="border border-brand-ink/[0.16] px-4 py-2 text-sm font-medium text-brand-ink"
                        >
                          {name}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <Button
                  href={`/contact?project=${encodeURIComponent(project.project)}`}
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full lg:mt-7"
                >
                  Enquire about this look
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 sm:h-20 lg:h-24" />
      </main>
    </>
  );
}
