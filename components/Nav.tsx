"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import type { SiteSettings } from "@/lib/types";

interface NavProps {
  settings: SiteSettings;
  /** float = homepage hero (absolute card over the photo); plain = standard bordered bar; minimal = logo only (legal/utility pages) */
  variant?: "float" | "plain" | "minimal";
  /** Highlights the matching primaryNav link */
  active?: string;
}

export default function Nav({ settings, variant = "plain", active }: NavProps) {
  const [open, setOpen] = useState(false);

  const hamburger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
      aria-controls="mobile-menu"
      aria-expanded={open}
      className="flex flex-col gap-[5px] p-[9px]"
    >
      <span className="h-0.5 w-5 bg-brand-ink" />
      <span className="h-0.5 w-5 bg-brand-ink" />
    </button>
  );

  const logo = (
    <Link href="/" aria-label={`${settings.siteName} home`} className="flex">
      <Image
        src={settings.logo.horizontal}
        alt={settings.siteName}
        width={200}
        height={28}
        priority
        className="h-[22px] w-auto sm:h-6 lg:h-7"
      />
    </Link>
  );

  if (variant === "minimal") {
    return (
      <>
        <header className="flex items-center justify-between px-5 py-4 sm:px-16 sm:py-6">
          {logo}
          <div className="lg:hidden">{hamburger}</div>
        </header>
        <MobileMenu open={open} onClose={() => setOpen(false)} settings={settings} />
      </>
    );
  }

  const navLinks = (
    <div className="hidden items-center gap-8 lg:flex">
      {settings.primaryNav.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`font-body text-sm font-medium transition-colors duration-200 ${
            active === l.label ? "text-brand-red" : "text-brand-ink hover:text-brand-red"
          }`}
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/contact"
        className="bg-brand-navy px-[22px] py-2.5 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1a1d3d]"
      >
        Contact
      </Link>
    </div>
  );

  if (variant === "float") {
    return (
      <>
        <nav
          aria-label="Primary"
          className="absolute top-4 left-1/2 z-30 flex w-[min(280px,calc(100%-32px))] -translate-x-1/2 items-center justify-between bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] sm:top-5 sm:w-[min(560px,calc(100%-64px))] sm:px-[22px] lg:top-7 lg:w-[720px] lg:px-7 lg:py-3.5"
        >
          {logo}
          {navLinks}
          <div className="lg:hidden">{hamburger}</div>
        </nav>
        <MobileMenu open={open} onClose={() => setOpen(false)} settings={settings} />
      </>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-brand-ink/[0.16] bg-brand-ivory px-5 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6">
        {logo}
        {navLinks}
        <div className="lg:hidden">{hamburger}</div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} settings={settings} />
    </>
  );
}
