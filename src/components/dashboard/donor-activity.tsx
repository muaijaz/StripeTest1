const activity = [
  {
    id: "don_41",
    recipient: "Civic Action PAC",
    amount: "$50.00",
    status: "Succeeded",
    createdAt: "Jan 11, 2024",
    receiptUrl: "#"
  },
  {
    id: "don_40",
    recipient: "Avery Johnson for Senate",
    amount: "$25.00",
    status: "Succeeded",
    createdAt: "Jan 4, 2024",
    receiptUrl: "#"
  },
  {
    id: "don_39",
    recipient: "State Future Fund",
    amount: "$10.00",
    status: "Processing",
    createdAt: "Dec 30, 2023",
    receiptUrl: "#"
  }
];

export function DonorActivity() {
  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Recent activity</h2>
        <a className="text-xs font-semibold text-primary" href="/api/export/donor">
          Download CSV
        </a>
      </div>
      <div className="space-y-3">
        {activity.map((item) => (
          <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 text-sm">
            <div>
              <p className="font-semibold text-slate-900">{item.recipient}</p>
              <p className="text-xs text-slate-500">{item.createdAt}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900">{item.amount}</p>
              <p className="text-xs text-slate-500">{item.status}</p>
            </div>
            <a className="text-xs font-semibold text-primary" href={item.receiptUrl}>
              View receipt
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
