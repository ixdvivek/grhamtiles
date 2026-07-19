"use client";

import { useState } from "react";
import TileCard from "./TileCard";
import type { Tile, TileCategory } from "@/lib/types";

const FILTERS: { key: TileCategory | "all"; label: string }[] = [
  { key: "all", label: "All tiles" },
  { key: "flooring", label: "Flooring" },
  { key: "paving", label: "Paving" },
  { key: "oxide", label: "Oxide finish" },
];

export default function TileFilter({ tiles }: { tiles: Tile[] }) {
  const [active, setActive] = useState<TileCategory | "all">("all");

  const shown = active === "all" ? tiles : tiles.filter((t) => t.category === active);
  const activeLabel = FILTERS.find((f) => f.key === active)!.label;

  return (
    <>
      <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto sm:mt-8 sm:flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={`shrink-0 rounded-full border px-4 py-2.5 font-body text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
              active === f.key
                ? "border-brand-red bg-brand-red text-white"
                : "border-brand-ink/[0.16] bg-transparent text-brand-ink hover:border-brand-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-3.5 text-[13px] text-brand-muted">
        Showing: <strong className="font-medium text-brand-ink">{activeLabel} ({shown.length})</strong>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-8">
        {shown.map((tile) => (
          <TileCard key={tile.slug} tile={tile} />
        ))}
      </div>
    </>
  );
}
