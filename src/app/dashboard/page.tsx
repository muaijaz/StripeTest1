import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function DashboardRouterPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  switch (session.user.role) {
    case "CANDIDATE":
    case "PAC":
      redirect("/(dashboard)/candidate");
    case "ADMIN":
      redirect("/(dashboard)/admin");
    default:
      redirect("/(dashboard)/donor");
  }
}
