import SwatchBlock from "./SwatchBlock";
import Button from "./Button";
import type { Service } from "@/lib/types";

/** Compact teaser card used in grids (homepage "what we do"). */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col bg-brand-stone">
      <SwatchBlock swatch={service.swatch} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col items-start gap-3 px-6 pt-[22px] pb-[26px]">
        <h3 className="font-display text-[26px] leading-[1.15]">{service.title}</h3>
        <p className="flex-1 text-[15px] leading-relaxed">{service.summary}</p>
        <Button href={`/contact?service=${encodeURIComponent(service.title)}`} variant="ghost" size="sm">
          {service.cta} →
        </Button>
      </div>
    </div>
  );
}

/** Full alternating image/text row used on the Services page. */
export function ServiceRow({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <div className="mt-14 sm:mt-20 sm:px-12 lg:mx-auto lg:mt-24 lg:max-w-[1200px] lg:px-16">
      <div className="sm:grid sm:grid-cols-2 sm:items-center sm:gap-12 lg:gap-20">
        <SwatchBlock
          swatch={service.swatch}
          label={service.photoLabel}
          className={`aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] ${reverse ? "sm:order-2" : "sm:order-1"}`}
        />
        <div
          className={
            reverse
              ? "px-5 pt-6 sm:order-1 sm:px-0 sm:pt-0"
              : "px-5 pt-6 sm:order-2 sm:px-0 sm:pt-0"
          }
        >
          <h2 className="font-display text-[32px] leading-[1.15] sm:text-[36px] lg:text-[44px]">
            {service.title}
          </h2>
          <p className="mt-3.5 text-base leading-relaxed sm:mt-4 lg:mt-[18px] lg:max-w-[44ch] lg:text-[17px]">
            {service.description}
          </p>
          <Button
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            variant="ghost"
            size="sm"
            className="mt-[18px] sm:mt-5"
          >
            {service.cta} →
          </Button>
        </div>
      </div>
    </div>
  );
}
