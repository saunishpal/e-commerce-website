import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/requireAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Store Management
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
          Admin Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Manage products, monitor orders, and oversee customer activity from a clean admin workspace.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}