const metrics = [
  { label: "Gross volume (30d)", value: "$1.82M", change: "+8.6%" },
  { label: "Application fee revenue", value: "$91,204", change: "+11.4%" },
  { label: "Active campaigns", value: "126", change: "+9" },
  { label: "Disbursements", value: "97.1% on time", change: "+1.2 pts" }
];

export function AdminMetrics() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.label} className="card space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {metric.label}
          </p>
          <p className="text-2xl font-semibold text-slate-950">{metric.value}</p>
          <p className="text-xs text-emerald-600">{metric.change} vs. last period</p>
        </article>
      ))}
    </section>
  );
}
