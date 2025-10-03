import { NextResponse } from "next/server";
import { generateAuditCsv } from "@/server/services/fec-export";

export async function GET() {
  const csv = await generateAuditCsv();
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=Audit_Log.csv"
    }
  });
}
