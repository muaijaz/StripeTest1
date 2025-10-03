const mockMetrics = [
  { label: "Total raised", value: "$482,940", change: "+12.4%" },
  { label: "Net after fees", value: "$463,523", change: "+12.9%" },
  { label: "Recurring", value: "39%", change: "+4.2 pts" },
  { label: "Average gift", value: "$54.21", change: "-$1.10" }
];

export function CandidateMetrics() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {mockMetrics.map((metric) => (
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
