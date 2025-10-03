import { NextResponse } from "next/server";
import { generateFecCsv } from "@/server/services/fec-export";

export async function GET() {
  const csv = await generateFecCsv({ scope: "donor", entityId: "demo_donor" });
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=Donor_Contribution_Report.csv"
    }
  });
}
