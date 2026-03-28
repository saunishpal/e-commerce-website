import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Customer Area
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
          Account Center
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          A premium account area for tracking orders, managing addresses, and
          editing profile details.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}