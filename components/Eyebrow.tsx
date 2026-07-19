type EyebrowColor = "muted" | "red" | "ink" | "ivory";

const colorClass: Record<EyebrowColor, string> = {
  muted: "text-brand-muted",
  red: "text-brand-red",
  ink: "text-brand-ink",
  ivory: "text-brand-ivory",
};

interface EyebrowProps {
  children: React.ReactNode;
  color?: EyebrowColor;
  className?: string;
}

export default function Eyebrow({ children, color = "muted", className = "" }: EyebrowProps) {
  return (
    <span
      className={`font-body text-[12.5px] font-medium uppercase tracking-[0.1em] ${colorClass[color]} ${className}`}
    >
      {children}
    </span>
  );
}
