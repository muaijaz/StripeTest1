import { Metadata } from "next";
import { CandidateMetrics } from "@/components/dashboard/candidate-metrics";
import { CandidateDonationsTable } from "@/components/dashboard/candidate-donations-table";

export const metadata: Metadata = {
  title: "Candidate dashboard | CivicFund"
};

export default function CandidateDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Candidate dashboard</h1>
          <p className="text-sm text-slate-600">
            Monitor performance, Stripe payouts, and compliance readiness in real time.
          </p>
        </div>
        <a className="btn-primary" href="/api/export/candidate">
          Export FEC CSV
        </a>
      </div>
      <CandidateMetrics />
      <CandidateDonationsTable />
    </div>
  );
}
