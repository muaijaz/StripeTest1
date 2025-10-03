import { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Log in | CivicFund"
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-950">Welcome back</h1>
        <p className="text-sm text-slate-600">Access your donor, campaign, or admin dashboard.</p>
      </div>
      <LoginForm />
    </div>
  );
}
