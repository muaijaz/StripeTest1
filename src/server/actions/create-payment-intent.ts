"use server";

import { stripe } from "@/server/services/stripe";
import { z } from "zod";
import { getOrCreateDonorProfile } from "@/server/services/donor";
import { findRecipientConnectAccount } from "@/server/services/recipient";
import { auth } from "@/server/auth";

const schema = z.object({
  amount: z.number().min(100),
  recipientId: z.string()
});

type CreatePaymentIntentInput = z.infer<typeof schema>;

type CreatePaymentIntentResult = {
  clientSecret?: string;
  error?: string;
};

export async function createPaymentIntent(
  input: CreatePaymentIntentInput
): Promise<CreatePaymentIntentResult> {
  const payload = schema.safeParse(input);
  if (!payload.success) {
    return { error: "Invalid input" };
  }

  const { amount, recipientId } = payload.data;

  const session = await auth();
  const donorProfile = await getOrCreateDonorProfile(session?.user?.id ?? null);
  const recipientAccount = await findRecipientConnectAccount(recipientId);

  if (!recipientAccount) {
    return { error: "Recipient not found" };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: donorProfile?.savedPaymentRef ?? undefined,
      application_fee_amount: Math.round(
        amount * (Number(process.env.STRIPE_APPLICATION_FEE_PERCENT ?? 0) / 100)
      ),
      on_behalf_of: recipientAccount.stripeAccountId ?? undefined,
      transfer_data: recipientAccount.stripeAccountId
        ? {
            destination: recipientAccount.stripeAccountId
          }
        : undefined,
      metadata: {
        recipientId,
        donorId: donorProfile?.id ?? "guest"
      }
    });

    return {
      clientSecret: paymentIntent.client_secret ?? undefined
    };
  } catch (error) {
    console.error("Failed to create PaymentIntent", error);
    return { error: "Unable to start donation. Please try again." };
  }
}
