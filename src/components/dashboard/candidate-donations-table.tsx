const mockDonations = [
  {
    id: "don_1",
    donor: "Taylor Chen",
    amount: "$250.00",
    method: "Card",
    status: "Succeeded",
    date: "2024-01-12"
  },
  {
    id: "don_2",
    donor: "Jordan Patel",
    amount: "$50.00",
    method: "Card",
    status: "Succeeded",
    date: "2024-01-11"
  },
  {
    id: "don_3",
    donor: "Skylar Smith",
    amount: "$1,000.00",
    method: "Bank",
    status: "Pending",
    date: "2024-01-10"
  }
];

export function CandidateDonationsTable() {
  return (
    <section className="card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Recent donations</h2>
          <p className="text-xs text-slate-500">
            Syncs in real time from Stripe Connect charges and PaymentIntents.
          </p>
        </div>
        <button className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold">
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Donor</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {mockDonations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-3 py-2 font-medium text-slate-900">{donation.donor}</td>
                <td className="px-3 py-2">{donation.amount}</td>
                <td className="px-3 py-2">{donation.method}</td>
                <td className="px-3 py-2">{donation.status}</td>
                <td className="px-3 py-2">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
