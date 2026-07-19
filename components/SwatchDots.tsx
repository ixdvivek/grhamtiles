import { swatchBgClass, isLightSwatch } from "@/lib/swatches";
import type { OxideToken } from "@/lib/types";

interface SwatchDotsProps {
  colors: OxideToken[];
  size?: number;
  className?: string;
}

export default function SwatchDots({ colors, size = 11, className = "" }: SwatchDotsProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {colors.map((c, i) => (
        <span
          key={`${c}-${i}`}
          style={{ width: size, height: size }}
          className={`box-border shrink-0 rounded-full ${swatchBgClass[c]} ${
            isLightSwatch(c) ? "border border-brand-ink/40" : ""
          }`}
        />
      ))}
    </div>
  );
}
