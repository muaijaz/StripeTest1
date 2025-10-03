import { Metadata } from "next";
import { RegistrationForm } from "@/components/forms/registration-form";

export const metadata: Metadata = {
  title: "Apply to fundraise | CivicFund"
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Apply as a candidate or PAC</h1>
        <p className="text-sm text-slate-600">
          Complete the quick application and our compliance team will review your submission within
          48 hours.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
