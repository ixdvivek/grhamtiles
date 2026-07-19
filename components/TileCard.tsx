import Link from "next/link";
import SwatchBlock from "./SwatchBlock";
import SwatchDots from "./SwatchDots";
import Eyebrow from "./Eyebrow";
import type { Tile } from "@/lib/types";

export default function TileCard({ tile }: { tile: Tile }) {
  return (
    <Link href={`/tiles/${tile.slug}`} className="group block text-brand-ink">
      <SwatchBlock swatch={tile.swatch} label="Photo coming soon" className="aspect-[4/5]">
        <div className="absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.03]" />
      </SwatchBlock>
      <div className="pt-3.5">
        <span className="inline-block border-b-2 border-transparent font-display text-[clamp(24px,2.5vw,30px)] leading-[1.15] transition-colors duration-200 group-hover:border-brand-red">
          {tile.name}
        </span>
        <Eyebrow className="mt-2 block">
          {tile.size} · {tile.material}
        </Eyebrow>
        <SwatchDots colors={tile.swatches} className="mt-2.5" />
      </div>
    </Link>
  );
}
