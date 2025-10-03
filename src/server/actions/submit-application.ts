"use server";

import { z } from "zod";
import { prisma } from "@/server/services/prisma";
import { stripe } from "@/server/services/stripe";

const applicationSchema = z.object({
  organizationType: z.enum(["CANDIDATE", "PAC"]),
  organizationName: z.string().min(2),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  office: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  committeeId: z.string().optional()
});

type ApplicationInput = z.infer<typeof applicationSchema>;

export async function applyForAccount(input: ApplicationInput) {
  const payload = applicationSchema.safeParse(input);
  if (!payload.success) {
    return { error: "Invalid application" };
  }

  const application = await prisma.auditLog.create({
    data: {
      action: "application_submitted",
      metadata: payload.data
    }
  });

  try {
    await stripe.accounts.create({
      type: "express",
      country: "US",
      email: payload.data.contactEmail,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      },
      metadata: {
        applicationId: application.id,
        organizationType: payload.data.organizationType
      }
    });
  } catch (error) {
    console.error("Stripe account creation failed", error);
    return { error: "Could not initialize Stripe account. Please try again." };
  }

  return { success: true };
}
