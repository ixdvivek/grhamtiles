import { swatchBgClass } from "@/lib/swatches";
import type { OxideToken } from "@/lib/types";

interface SwatchBlockProps {
  swatch: OxideToken;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Flat oxide-color placeholder used everywhere real photography is still
 * pending (per the brand brief: never stock photos). `label` renders the
 * small "___ photo — coming soon" caption used throughout the design.
 */
export default function SwatchBlock({ swatch, label, className = "", children }: SwatchBlockProps) {
  return (
    <div className={`relative box-border overflow-hidden ${swatchBgClass[swatch]} ${className}`}>
      {label && (
        <span className="absolute right-5 bottom-3.5 left-5 text-[11px] tracking-[0.1em] text-white/85 uppercase">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
