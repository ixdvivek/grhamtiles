import Button from "./Button";

interface TileEnquireButtonsProps {
  tileName: string;
  tileSpec: string;
}

/**
 * Two presentations of the same "enquire about this tile" action:
 * a sticky bottom bar on mobile/tablet, an inline button on desktop.
 * Both are plain links to /contact — no client JS required.
 */
export default function TileEnquireButtons({ tileName, tileSpec }: TileEnquireButtonsProps) {
  const href = `/contact?tile=${encodeURIComponent(tileName)}`;

  return (
    <>
      <Button href={href} variant="primary" className="mt-8 hidden w-full sm:block">
        Enquire about this tile
      </Button>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 bg-brand-navy px-5 py-4 shadow-[0_-6px_20px_rgba(0,0,0,0.18)] sm:hidden">
        <div className="text-brand-ivory">
          <div className="font-display text-lg leading-none">{tileName}</div>
          <div className="mt-[3px] text-xs text-brand-ivory/70">{tileSpec}</div>
        </div>
        <Button href={href} variant="inverse" size="sm">
          Enquire about this tile
        </Button>
      </div>

      {/* Spacer so the sticky bar doesn't cover the last content on mobile */}
      <div className="h-20 sm:hidden" />
    </>
  );
}
