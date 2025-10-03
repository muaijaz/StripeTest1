import { Metadata } from "next";
import { DonorSummary } from "@/components/dashboard/donor-summary";
import { DonorActivity } from "@/components/dashboard/donor-activity";

export const metadata: Metadata = {
  title: "Your giving | CivicFund"
};

export default function DonorDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-950">Your giving history</h1>
        <p className="text-sm text-slate-600">
          Manage recurring plans, update saved payment methods, and download receipts.
        </p>
      </div>
      <DonorSummary />
      <DonorActivity />
    </div>
  );
}
