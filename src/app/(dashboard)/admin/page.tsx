import { Metadata } from "next";
import { AdminMetrics } from "@/components/dashboard/admin-metrics";
import { PendingApplications } from "@/components/dashboard/pending-applications";
import { PlatformRevenue } from "@/components/dashboard/platform-revenue";

export const metadata: Metadata = {
  title: "Admin control center | CivicFund"
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Admin control center</h1>
          <p className="text-sm text-slate-600">
            Approve applications, monitor money movement, and export data for compliance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a className="btn-primary" href="/api/export/platform">Export platform CSV</a>
          <a className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold" href="/api/export/audit">
            Download audit log
          </a>
        </div>
      </div>
      <AdminMetrics />
      <PlatformRevenue />
      <PendingApplications />
    </div>
  );
}
