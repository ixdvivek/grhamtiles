export default function SpecsTable({ specs }: { specs: Record<string, string> }) {
  return (
    <table className="w-full border-collapse font-body text-[15px]">
      <tbody>
        {Object.entries(specs).map(([label, value]) => (
          <tr key={label} className="border-b border-brand-ink/[0.16]">
            <td className="py-3 pr-6 align-top text-[12.5px] tracking-[0.08em] whitespace-nowrap text-brand-muted uppercase">
              {label}
            </td>
            <td className="py-3 text-brand-ink">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
