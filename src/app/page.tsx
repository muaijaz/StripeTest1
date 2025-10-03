import { CandidateCard } from "@/components/dashboard/candidate-card";
import { DonateCallout } from "@/components/dashboard/donate-callout";
import { Suspense } from "react";
import { Metadata } from "next";

const mockCandidates = [
  {
    id: "cand_demo_1",
    name: "Avery Johnson",
    office: "US Senate • California",
    description:
      "Progressive leader focused on climate action, economic opportunity, and voting rights.",
    imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    raised: 875000,
    goal: 1200000
  },
  {
    id: "pac_demo_1",
    name: "Civic Action PAC",
    office: "Advocacy • National",
    description:
      "Grassroots PAC fueling local organizers who defend democracy and expand ballot access.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    raised: 420500,
    goal: 600000
  },
  {
    id: "cand_demo_2",
    name: "Jordan Blake",
    office: "Governor • Michigan",
    description:
      "Labor-backed gubernatorial campaign prioritizing infrastructure and broadband expansion.",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    raised: 238400,
    goal: 500000
  }
];

export const metadata: Metadata = {
  title: "Support candidates and causes | CivicFund"
};

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-white via-white to-slate-100">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.25fr,0.75fr]">
          <div className="space-y-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Powered by Stripe Connect
            </span>
            <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
              Fuel the movements that represent you
            </h1>
            <p className="text-lg text-slate-600">
              Discover vetted candidates and PACs, donate in seconds, and keep your receipts
              FEC-compliant automatically. Campaigns manage their fundraising in one Stripe-native
              dashboard.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a className="btn-primary" href="#featured">
                Browse featured campaigns
              </a>
              <a className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700" href="/register">
                Apply as a campaign or PAC
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-6 rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 sm:grid-cols-4">
              <div>
                <dt className="font-semibold text-slate-500">Total raised</dt>
                <dd className="text-xl font-semibold text-slate-950">$18.4M</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Average donation</dt>
                <dd className="text-xl font-semibold text-slate-950">$47.20</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Recurring donors</dt>
                <dd className="text-xl font-semibold text-slate-950">34%</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Compliance accuracy</dt>
                <dd className="text-xl font-semibold text-slate-950">99.8%</dd>
              </div>
            </dl>
          </div>
          <Suspense fallback={<div className="card">Loading donation flow…</div>}>
            <DonateCallout />
          </Suspense>
        </div>
      </section>
      <section id="featured" className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Featured campaigns</h2>
            <p className="text-sm text-slate-600">
              Every organization completes Stripe identity verification and FEC compliance review.
            </p>
          </div>
          <a className="text-sm font-semibold text-primary" href="/candidates">
            View all
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-950">Why campaigns choose CivicFund</h2>
            <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
              <li>Instant Stripe Connect onboarding for compliance-ready payouts.</li>
              <li>Granular donor analytics, cohort insights, and attribution modeling.</li>
              <li>Native recurring, split, and one-click donations for logged-in users.</li>
              <li>FEC export profiles tailored to candidate or PAC requirements.</li>
            </ul>
          </div>
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Designed for compliance teams</h3>
            <p className="text-sm text-slate-600">
              Build auditable workflows with immutable logs, automated contribution limits, and
              aggregated CSV exports formatted for FECFile.
            </p>
            <a className="btn-primary w-full" href="/register">
              Start your application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
