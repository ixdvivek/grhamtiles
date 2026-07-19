import Link from "next/link";
import SwatchBlock from "./SwatchBlock";
import Tag from "./Tag";
import type { Project } from "@/lib/types";

export default function PortfolioCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block text-brand-ink">
      <SwatchBlock swatch={project.swatch} className="aspect-[3/2]">
        <div className="absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.03]" />
      </SwatchBlock>
      <div className="flex flex-col items-start gap-2 pt-3.5">
        <span className="font-display text-2xl leading-[1.2]">{project.project}</span>
        <span className="text-[13px] tracking-[0.08em] text-brand-muted uppercase">
          {project.location}
        </span>
        {/* Tags render as spans, not links: this card is itself an <a>,
            and nested anchors are invalid HTML. */}
        <div className="flex flex-wrap gap-2">
          {project.tiles.map((name) => (
            <Tag key={name}>{name}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
