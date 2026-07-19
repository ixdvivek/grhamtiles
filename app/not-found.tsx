import Nav from "@/components/Nav";
import Button from "@/components/Button";
import { getSiteSettings } from "@/lib/data";
import { swatchBgClass } from "@/lib/swatches";
import type { OxideToken } from "@/lib/types";

const PIECES: { swatch: OxideToken; shape: "square" | "circle"; style: React.CSSProperties }[] = [
  { swatch: "oxide-cherry", shape: "square", style: { left: "8%", top: "12%", width: "18%", height: "27%", transform: "rotate(-8deg)" } },
  { swatch: "oxide-mustard", shape: "square", style: { left: "37%", top: "0%", width: "22%", height: "32%", transform: "rotate(14deg)" } },
  { swatch: "oxide-emerald", shape: "circle", style: { left: "68%", top: "22%", width: "15%", height: "22%" } },
  { swatch: "oxide-periwinkle", shape: "circle", style: { left: "17%", top: "57%", width: "13%", height: "20%" } },
  { swatch: "oxide-coffee", shape: "square", style: { left: "47%", top: "55%", width: "20%", height: "30%", transform: "rotate(22deg)" } },
];

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col">
      <Nav settings={settings} variant="minimal" />

      <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
        <div className="relative mb-8 h-20 w-[120px] lg:mb-10 lg:h-[120px] lg:w-[180px]" aria-hidden>
          {PIECES.map((piece, i) => (
            <span
              key={i}
              style={piece.style}
              className={`absolute box-border ${swatchBgClass[piece.swatch]} ${
                piece.shape === "circle" ? "rounded-full" : ""
              }`}
            />
          ))}
        </div>

        <div className="text-[13px] font-medium tracking-[0.1em] text-brand-red uppercase lg:text-sm">
          Error 404
        </div>
        <h1 className="mt-3.5 font-display text-[32px] leading-[1.15] sm:mt-4 lg:text-[52px]">
          This tile hasn&rsquo;t been cast yet.
        </h1>
        <p className="mt-3.5 max-w-[48ch] text-base leading-relaxed text-brand-ink sm:mt-4 lg:text-[17px]">
          The page you&rsquo;re looking for doesn&rsquo;t exist — but the tiles do.
        </p>
        <Button href="/tiles" variant="primary" size="lg" className="mt-7 lg:mt-8">
          See the tiles
        </Button>
      </div>
    </div>
  );
}
