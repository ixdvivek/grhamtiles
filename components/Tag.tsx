export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-brand-ink/40 px-3 py-[3px] font-body text-xs leading-relaxed uppercase tracking-[0.1em] text-brand-ink">
      {children}
    </span>
  );
}
