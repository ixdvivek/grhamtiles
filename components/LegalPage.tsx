import Nav from "./Nav";
import type { SiteSettings } from "@/lib/types";

export interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  settings: SiteSettings;
  title: string;
  updated: string;
  sections: LegalSection[];
}

/** Shared shell for Privacy and Terms — minimal header, no footer nav links. */
export default function LegalPage({ settings, title, updated, sections }: LegalPageProps) {
  return (
    <>
      <Nav settings={settings} variant="minimal" />

      <main className="px-5 pt-9 pb-16 sm:px-12 lg:mx-auto lg:max-w-[760px] lg:px-16 lg:pt-20 lg:pb-24">
        <h1 className="font-display text-[32px] leading-[1.15] lg:text-[44px]">{title}</h1>
        <p className="mt-2.5 text-[13px] text-brand-muted lg:mt-3 lg:text-sm">{updated}</p>

        <div className="mt-7 flex flex-col gap-6 text-[15px] leading-relaxed lg:mt-10 lg:gap-8 lg:text-base lg:leading-relaxed">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-2 font-display text-base font-medium lg:mb-2.5 lg:text-[19px]">
                {section.heading}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
