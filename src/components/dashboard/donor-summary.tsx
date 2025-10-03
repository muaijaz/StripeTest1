const stats = [
  { label: "Total contributions", value: "$1,420" },
  { label: "Active recurring", value: "$45/mo" },
  { label: "Campaigns supported", value: "9" }
];

export function DonorSummary() {
  return (
    <section className="card space-y-4">
      <h2 className="text-lg font-semibold text-slate-950">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-lg border border-slate-200 p-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{stat.value}</p>
          </article>
        ))}
      </div>
      <button className="btn-primary w-full">Update saved payment method</button>
    </section>
  );
}
