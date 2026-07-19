"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

export default function EnquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context =
    searchParams.get("tile") || searchParams.get("service") || searchParams.get("project");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(context ? `/thank-you?about=${encodeURIComponent(context)}` : "/thank-you");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      {context && (
        <div className="flex items-center gap-2 bg-brand-stone px-3.5 py-2.5 font-body text-[13px] text-brand-ink">
          <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-brand-red" />
          Enquiring about: <strong>{context}</strong>
        </div>
      )}

      <Field label="Name" id="name" required />
      <Field label="Phone or email" id="contact" required />

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-body text-[12.5px] font-medium tracking-[0.08em] text-brand-muted uppercase"
        >
          Your space and what you need
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Room size, quantity, city — anything helps."
          className="min-h-[110px] w-full resize-y rounded-[2px] border border-brand-ink/40 bg-transparent px-3.5 py-3 font-body text-[15px] text-brand-ink outline-none"
        />
      </div>

      <Button type="submit" size="lg" className="self-start">
        {context ? "Enquire about this tile" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({ label, id, required }: { label: string; id: string; required?: boolean }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-body text-[12.5px] font-medium tracking-[0.08em] text-brand-muted uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        required={required}
        className="w-full rounded-[2px] border border-brand-ink/40 bg-transparent px-3.5 py-[13px] font-body text-[15px] text-brand-ink outline-none"
      />
    </div>
  );
}
