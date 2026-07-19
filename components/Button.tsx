import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}

const sizeClass: Record<Size, string> = {
  sm: "px-[18px] py-[10px] text-sm",
  md: "px-[26px] py-[14px] text-sm",
  lg: "px-8 py-4 text-[15px]",
};

const variantClass: Record<Variant, string> = {
  primary: "border border-transparent bg-brand-navy text-brand-ivory hover:bg-[#0A0E45]",
  secondary:
    "border border-brand-ink bg-transparent text-brand-ink hover:bg-brand-ink hover:text-brand-ivory",
  ghost: "border border-transparent bg-transparent px-0! text-brand-ink hover:text-brand-red",
  inverse: "border border-transparent bg-brand-ivory text-brand-navy hover:bg-white",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const classes = `inline-block rounded-[2px] font-body font-medium tracking-[0.04em] text-center leading-tight transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)] cursor-pointer ${sizeClass[size]} ${variantClass[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
