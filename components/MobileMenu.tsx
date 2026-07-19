"use client";

import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export default function MobileMenu({ open, onClose, settings }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[9999] box-border flex flex-col overflow-hidden bg-brand-red transition-opacity duration-200 ease-out ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[50px] -bottom-[50px] h-[340px] w-[340px] opacity-[0.14]"
      >
        <Image src={settings.logo.markWhite} alt="" fill sizes="340px" className="object-contain" />
      </div>

      <div className="relative z-[2] flex items-center justify-between px-6 py-5">
        <Image
          src={settings.logo.horizontalWhite}
          alt={settings.siteName}
          width={160}
          height={24}
          className="h-6 w-auto"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="px-1.5 py-1 text-3xl leading-none text-white"
        >
          ×
        </button>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col justify-center overflow-y-auto px-8">
        <nav aria-label="Mobile primary">
          <Link
            href="/"
            onClick={onClose}
            className="block font-display text-[38px] leading-[1.55] text-white"
          >
            Home
          </Link>
          {settings.primaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block font-display text-[38px] leading-[1.55] text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="block font-display text-[38px] leading-[1.55] text-white"
          >
            Contact
          </Link>
        </nav>

        <nav
          aria-label="Mobile secondary"
          className="mt-5 flex flex-col gap-3 border-t border-white/30 pt-5"
        >
          <Link
            href="/terms"
            onClick={onClose}
            className="text-[13px] tracking-[0.06em] text-white/70 uppercase"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/privacy"
            onClick={onClose}
            className="text-[13px] tracking-[0.06em] text-white/70 uppercase"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>

      <div className="relative z-[2] flex gap-[22px] px-8 pt-7 pb-10">
        <a href={settings.social.instagram} aria-label="Instagram" className="flex text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.3" cy="6.7" r="1" fill="#fff" stroke="none" />
          </svg>
        </a>
        <a href={settings.social.facebook} aria-label="Facebook" className="flex text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M13.5 21v-7h2.2l.3-2.6h-2.5V9.7c0-.75.2-1.26 1.28-1.26h1.37V6.1c-.24-.03-1.05-.1-2-.1-1.98 0-3.33 1.2-3.33 3.4v1.9H8.5v2.6h2.27V21" />
          </svg>
        </a>
        <a href={settings.social.pinterest} aria-label="Pinterest" className="flex text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 19c.5-1.7 1.3-4.6 1.7-6.2M12 12c-.5 2-2 6.6-2 6.6M12 12a3 3 0 1 0 3-3.6c-1.6-.3-3 .6-3.4 2" />
          </svg>
        </a>
      </div>
    </div>
  );
}
