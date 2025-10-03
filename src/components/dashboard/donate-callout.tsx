"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format-currency";
import { createPaymentIntent } from "@/server/actions/create-payment-intent";

const suggestedAmounts = [2500, 5000, 10000, 25000, 50000];

type Step = "amount" | "details" | "confirmation";

export function DonateCallout() {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleDonate = async (selectedAmount: number) => {
    setAmount(selectedAmount);
    setLoading(true);
    try {
      const result = await createPaymentIntent({ amount: selectedAmount, recipientId: "cand_demo_1" });
      if (result.error) {
        setConfirmation(result.error);
        return;
      }
      setConfirmation(result.clientSecret ? "Donation ready" : null);
      setStep("details");
    } catch (error) {
      console.error(error);
      setConfirmation("We could not start the donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">Quick donation</h3>
        <p className="text-sm text-slate-600">
          Log in to use your saved information, or continue as a guest in under two minutes.
        </p>
      </div>
      {step === "amount" && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-700">Choose an amount</p>
          <div className="grid grid-cols-2 gap-3">
            {suggestedAmounts.map((value) => (
              <button
                key={value}
                className="rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary hover:text-primary"
                onClick={() => handleDonate(value)}
                disabled={loading}
              >
                {formatCurrency(value)}
              </button>
            ))}
          </div>
          <button className="btn-primary w-full" disabled>
            Custom amount
          </button>
        </div>
      )}
      {step === "details" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            {amount ? `You selected ${formatCurrency(amount)}.` : "Select an amount to continue."}
          </p>
          <div className="space-y-2 rounded-md border border-dashed border-slate-300 p-4 text-xs text-slate-500">
            <p>
              This demo flow calls a server action that would create a Stripe PaymentIntent and attach
              the donor to the recipient&apos;s Connect account. Integrate Stripe Elements or Payment Links
              to collect card details and finalize the payment.
            </p>
          </div>
          {confirmation && <p className="text-xs text-emerald-600">{confirmation}</p>}
          <button className="btn-primary w-full" onClick={() => setStep("confirmation")}>
            Continue to checkout
          </button>
        </div>
      )}
      {step === "confirmation" && (
        <div className="space-y-3 text-sm text-slate-600">
          <p>Great! In production, this is where Stripe Elements renders and confirms payment.</p>
          <p>{confirmation ?? "You would be redirected to the secure payment form."}</p>
          <button className="btn-primary w-full" onClick={() => setStep("amount")}>
            Start another donation
          </button>
        </div>
      )}
    </div>
  );
}
