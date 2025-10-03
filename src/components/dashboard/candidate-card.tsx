import Image from "next/image";
import { formatCurrency } from "@/lib/format-currency";

export type CandidateCardProps = {
  candidate: {
    id: string;
    name: string;
    office: string;
    description: string;
    imageUrl: string;
    raised: number;
    goal: number;
  };
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const progress = Math.min(100, Math.round((candidate.raised / candidate.goal) * 100));

  return (
    <article className="card space-y-4">
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={`${candidate.imageUrl}?auto=format&fit=crop&w=600&q=80`}
          alt={candidate.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{candidate.name}</h3>
        <p className="text-sm font-medium text-primary">{candidate.office}</p>
      </div>
      <p className="text-sm text-slate-600">{candidate.description}</p>
      <dl className="space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Raised</dt>
          <dd className="font-semibold text-slate-950">{formatCurrency(candidate.raised)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Goal</dt>
          <dd>{formatCurrency(candidate.goal)}</dd>
        </div>
      </dl>
      <div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">{progress}% to goal</p>
      </div>
      <a className="btn-primary w-full" href={`/donate/${candidate.id}`}>
        Donate now
      </a>
    </article>
  );
}
