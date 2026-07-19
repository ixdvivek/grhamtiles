"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouHeading() {
  const about = useSearchParams().get("about");

  return (
    <h1 className="mt-3.5 font-display text-[34px] leading-[1.15] sm:text-[48px]">
      {about ? `Got it — we'll be in touch about ${about}.` : "Got it — we'll be in touch."}
    </h1>
  );
}
