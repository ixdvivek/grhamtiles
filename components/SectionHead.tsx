import Link from "next/link";
import Eyebrow from "./Eyebrow";

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

/** Eyebrow + heading, with an optional "All tiles →" style link on the right. */
export default function SectionHead({
  eyebrow,
  title,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeadProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-5 ${className}`}>
      <div>
        {eyebrow && <Eyebrow color="red">{eyebrow}</Eyebrow>}
        <h2 className="mt-3.5 font-display text-[28px] leading-[1.15] sm:text-[34px] lg:text-[40px]">
          {title}
        </h2>
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="border-b-2 border-brand-red pb-0.5 text-sm font-medium whitespace-nowrap text-brand-red"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
