import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import type { NavLink } from "@/lib/types";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-brand-navy px-6 py-12 text-brand-ivory sm:px-[clamp(20px,4vw,48px)] sm:pt-[72px] sm:pb-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-12">
        <div>
          <Image
            src={settings.logo.verticalWhite}
            alt={settings.siteName}
            width={140}
            height={120}
            className="h-[90px] w-auto sm:h-[120px]"
          />
          <p className="mt-[18px] max-w-[260px] text-sm leading-relaxed text-brand-ivory/60">
            Handmade tiles from Kerala, inspired by the Athangudi craft. Bringing tradition to your
            doorstep.
          </p>
        </div>

        <FooterColumn title="Explore" links={settings.footerExplore} />
        <FooterColumn title="Studio" links={settings.footerStudio} />

        <div>
          <div className="mb-3.5 text-[12.5px] tracking-[0.1em] text-brand-ivory/55 uppercase">
            Reach us
          </div>
          <div className="flex flex-col gap-2 text-[15px] text-brand-ivory/85">
            <span>{settings.contact.phone}</span>
            <span>{settings.contact.email}</span>
            <span>{settings.contact.workshop}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-brand-ivory/15 pt-5 text-[13px] text-brand-ivory/50">
        <span>{settings.copyright}</span>
        <span>Handmade in Kerala</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <div className="mb-3.5 text-[12.5px] tracking-[0.1em] text-brand-ivory/55 uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[15px] text-brand-ivory/85 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
