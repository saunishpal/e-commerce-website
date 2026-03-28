"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MapPin, User } from "lucide-react";

const links = [
  {
    href: "/account",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/account/orders",
    label: "Orders",
    icon: Package,
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    icon: MapPin,
  },
  {
    href: "/account/profile",
    label: "Profile",
    icon: User,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="px-3 py-3 text-lg font-bold text-zinc-900">My Account</h2>

      <nav className="mt-2 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}