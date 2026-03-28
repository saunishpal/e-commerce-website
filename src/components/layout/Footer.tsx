"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session, status } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = status === "authenticated" && role === "admin";

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-900">LuxeCart</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            A premium e-commerce experience crafted for modern fashion, jewelry,
            and lifestyle brands.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900">Store</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900">Account</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li><Link href="/account">Dashboard</Link></li>
            <li><Link href="/account/orders">Orders</Link></li>
            <li><Link href="/account/addresses">Addresses</Link></li>
            <li><Link href="/account/profile">Profile</Link></li>
          </ul>
        </div>

        {isAdmin && (
          <div>
            <h4 className="font-semibold text-zinc-900">Admin</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/admin">Overview</Link></li>
              <li><Link href="/admin/products">Products</Link></li>
              <li><Link href="/admin/orders">Orders</Link></li>
              <li><Link href="/admin/customers">Customers</Link></li>
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 py-5 text-center text-sm text-zinc-500">
        © 2026 LuxeCart. Built as a premium full-stack e-commerce portfolio project.
      </div>
    </footer>
  );
}