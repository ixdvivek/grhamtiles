import Eyebrow from "./Eyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Eyebrow + h1 + intro paragraph used atop About / Tiles / Services / Portfolio / Blog / Contact. */
export default function PageHero({ eyebrow, title, lede, children, className = "" }: PageHeroProps) {
  return (
    <section className={`px-5 pt-10 sm:px-12 sm:pt-14 lg:mx-auto lg:max-w-[1200px] lg:px-16 lg:pt-[72px] ${className}`}>
      <Eyebrow color="red">{eyebrow}</Eyebrow>
      <h1 className="mt-3.5 font-display text-[clamp(44px,6.5vw,72px)] leading-[1.05]">{title}</h1>
      {lede && <p className="mt-3.5 max-w-[56ch] text-base leading-relaxed sm:text-[17px]">{lede}</p>}
      {children}
    </section>
  );
}
