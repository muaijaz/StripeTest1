import { prisma } from "@/server/services/prisma";

type RecipientAccount = {
  id: string;
  type: "candidate" | "pac";
  stripeAccountId: string | null;
};

export async function findRecipientConnectAccount(recipientId: string): Promise<RecipientAccount | null> {
  const candidate = await prisma.candidateProfile.findUnique({
    where: { id: recipientId }
  });
  if (candidate) {
    return {
      id: candidate.id,
      type: "candidate",
      stripeAccountId: candidate.stripeAccountId
    };
  }

  const pac = await prisma.pacProfile.findUnique({ where: { id: recipientId } });
  if (pac) {
    return {
      id: pac.id,
      type: "pac",
      stripeAccountId: pac.stripeAccountId
    };
  }

  return null;
}
