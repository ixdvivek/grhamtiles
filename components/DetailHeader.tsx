"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import type { SiteSettings } from "@/lib/types";

interface DetailHeaderProps {
  settings: SiteSettings;
  backHref: string;
  backLabel: string;
  /** true = white-on-photo overlay (Tile Detail); false = plain ivory bar (Portfolio Detail) */
  transparent?: boolean;
}

export default function DetailHeader({
  settings,
  backHref,
  backLabel,
  transparent = true,
}: DetailHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={transparent ? "relative" : ""}>
        {transparent && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[120px] bg-gradient-to-b from-brand-navy/55 to-transparent lg:h-[140px]" />
        )}
        <header
          className={`relative z-10 flex items-center justify-between px-5 py-4 sm:px-10 lg:px-16 lg:py-7 ${
            transparent ? "" : "border-b border-brand-ink/[0.16] bg-brand-ivory"
          }`}
        >
          <Link
            href={backHref}
            className={`text-[13px] font-medium whitespace-nowrap lg:text-sm ${
              transparent
                ? "text-white hover:text-brand-stone"
                : "text-brand-ink hover:text-brand-red"
            }`}
          >
            ← {backLabel}
          </Link>

          <Image
            src={transparent ? settings.logo.markWhite : settings.logo.mark}
            alt=""
            width={40}
            height={40}
            className="hidden h-5 w-auto lg:block"
          />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            className="flex flex-col gap-[5px] p-[9px] lg:hidden"
          >
            <span className={`h-0.5 w-5 ${transparent ? "bg-white" : "bg-brand-ink"}`} />
            <span className={`h-0.5 w-5 ${transparent ? "bg-white" : "bg-brand-ink"}`} />
          </button>
        </header>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} settings={settings} />
    </>
  );
}
