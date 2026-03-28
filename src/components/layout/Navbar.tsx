"use client";

import Link from "next/link";
import { Heart, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount } = useStore();
  const { data: session, status } = useSession();

  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAuthenticated = status === "authenticated";
  const isAdmin = isAuthenticated && role === "admin";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-zinc-900">
          LuxeCart
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-zinc-700 hover:text-black">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-zinc-700 hover:text-black">
            Shop
          </Link>
          <Link href="/wishlist" className="text-sm font-medium text-zinc-700 hover:text-black">
            Wishlist
          </Link>
          <Link href="/cart" className="text-sm font-medium text-zinc-700 hover:text-black">
            Cart
          </Link>
          <Link href="/checkout" className="text-sm font-medium text-zinc-700 hover:text-black">
            Checkout
          </Link>

          {isAuthenticated ? (
            <Link href="/account" className="text-sm font-medium text-zinc-700 hover:text-black">
              Account
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-zinc-700 hover:text-black">
                Login
              </Link>
              <Link href="/register" className="text-sm font-medium text-zinc-700 hover:text-black">
                Create Account
              </Link>
            </>
          )}

          {isAdmin && (
            <Link href="/admin" className="text-sm font-medium text-zinc-700 hover:text-black">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-zinc-100">
            <Search size={20} />
          </button>

          <Link href="/wishlist" className="relative rounded-full p-2 hover:bg-zinc-100">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative rounded-full p-2 hover:bg-zinc-100">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/account" className="rounded-full p-2 hover:bg-zinc-100">
                <User size={20} />
              </Link>
              <button
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                  router.refresh();
                }}
                className="rounded-full p-2 hover:bg-zinc-100"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full p-2 hover:bg-zinc-100">
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}