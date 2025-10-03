const revenueSeries = [
  { label: "Jan", value: 54000 },
  { label: "Feb", value: 64000 },
  { label: "Mar", value: 72000 },
  { label: "Apr", value: 91000 },
  { label: "May", value: 87000 },
  { label: "Jun", value: 102000 }
];

export function PlatformRevenue() {
  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Platform revenue</h2>
          <p className="text-xs text-slate-500">Application fees + tipping</p>
        </div>
        <span className="text-xs font-semibold text-emerald-600">+18% vs. prior 6 months</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-6">
        {revenueSeries.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="h-32 rounded-md bg-primary/10">
              <div
                className="h-full rounded-md bg-primary"
                style={{ height: `${Math.min(100, (item.value / 102000) * 100)}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-500">{item.label}</p>
            <p className="text-sm font-semibold text-slate-900">${Math.round(item.value / 1000)}k</p>
          </div>
        ))}
      </div>
    </section>
  );
}
