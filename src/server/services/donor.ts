import { prisma } from "@/server/services/prisma";
import { stripe } from "@/server/services/stripe";

export async function getOrCreateDonorProfile(userId: string | null) {
  if (!userId) {
    return null;
  }

  const donorProfile = await prisma.donorProfile.findUnique({
    where: { userId },
    include: { user: true }
  });

  if (donorProfile?.savedPaymentRef) {
    return donorProfile;
  }

  const user = donorProfile?.user ?? (await prisma.user.findUnique({ where: { id: userId } }));
  if (!user) return donorProfile;

  if (!donorProfile?.savedPaymentRef) {
    try {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName
      });

      return prisma.donorProfile.upsert({
        where: { userId },
        create: {
          userId,
          savedPaymentRef: customer.id
        },
        update: {
          savedPaymentRef: customer.id
        }
      });
    } catch (error) {
      console.error("Failed to create Stripe customer", error);
      return donorProfile;
    }
  }

  return donorProfile;
}
