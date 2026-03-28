import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdminApi() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { ok: false, status: 401, message: "Unauthorized" };
  }

  const role = (session.user as { role?: string }).role;

  if (role !== "admin") {
    return { ok: false, status: 403, message: "Forbidden" };
  }

  return { ok: true, session };
}