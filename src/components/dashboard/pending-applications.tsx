const pendingApplications = [
  {
    id: "app_1",
    name: "Forward Future PAC",
    submitted: "2024-01-08",
    contact: "samira@forwardfuture.org",
    type: "PAC",
    amountForecast: "$420k"
  },
  {
    id: "app_2",
    name: "Citizens for Elena Ramirez",
    submitted: "2024-01-09",
    contact: "finance@ramirezforcongress.com",
    type: "Candidate",
    amountForecast: "$780k"
  }
];

export function PendingApplications() {
  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Pending compliance review</h2>
        <a className="text-xs font-semibold text-primary" href="/admin/applications">
          View all
        </a>
      </div>
      <div className="space-y-3">
        {pendingApplications.map((application) => (
          <article key={application.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{application.name}</h3>
                <p className="text-xs text-slate-500">Submitted {application.submitted}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>{application.contact}</p>
                <p>{application.type}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
              <span>Forecast volume</span>
              <span className="font-semibold text-slate-900">{application.amountForecast}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button className="btn-primary flex-1">Approve &amp; send Stripe link</button>
              <button className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">
                Request more info
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
