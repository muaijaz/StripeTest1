import { prisma } from "@/server/services/prisma";

const fecHeaders = [
  "FilerID",
  "TransactionType",
  "ContributorLastName",
  "ContributorFirstName",
  "ContributionDate",
  "ContributionAmount",
  "Employer",
  "Occupation",
  "Memo"
];

type FecExportOptions = {
  scope: "candidate" | "pac" | "platform" | "donor";
  entityId: string;
};

export async function generateFecCsv(options: FecExportOptions) {
  const lines = [fecHeaders.join(",")];

  const donations = await prisma.donation.findMany({
    where: options.scope === "donor" ? { donorId: options.entityId } : undefined,
    take: 25,
    orderBy: { createdAt: "desc" },
    include: {
      donor: {
        include: {
          user: true,
          employment: true
        }
      }
    }
  });

  for (const donation of donations) {
    const donorName = donation.donor?.user?.fullName ?? "";
    const [firstName, ...rest] = donorName.split(" ");
    const lastName = rest.join(" ");
    lines.push(
      [
        options.entityId,
        donation.recipientType,
        lastName,
        firstName,
        donation.createdAt.toISOString().split("T")[0],
        (donation.amount / 100).toFixed(2),
        donation.donor?.employment?.employer ?? "",
        donation.donor?.employment?.occupation ?? "",
        "Processed via CivicFund"
      ].join(",")
    );
  }

  if (donations.length === 0) {
    lines.push([
      options.entityId,
      "NA",
      "",
      "",
      new Date().toISOString().split("T")[0],
      "0.00",
      "",
      "",
      "No transactions available"
    ].join(","));
  }

  return lines.join("\n");
}

export async function generateAuditCsv() {
  const headers = ["Timestamp", "Actor", "Action", "Target", "Details"];
  const lines = [headers.join(",")];
  const logs = await prisma.auditLog.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: { actor: true }
  });
  for (const log of logs) {
    lines.push(
      [
        log.createdAt.toISOString(),
        log.actor?.email ?? "system",
        log.action,
        log.targetId ?? "",
        JSON.stringify(log.metadata ?? {})
      ].join(",")
    );
  }
  if (logs.length === 0) {
    lines.push([
      new Date().toISOString(),
      "system",
      "no_logs",
      "",
      "{}"
    ].join(","));
  }
  return lines.join("\n");
}
