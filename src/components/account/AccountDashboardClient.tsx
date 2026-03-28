"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, MapPin, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/StoreProvider";

type Order = {
  _id: string;
  createdAt: string;
  status: string;
  total: number;
};

type ProfileData = {
  name?: string;
  address?: {
    firstName?: string;
    lastName?: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    country?: string;
  };
};

export default function AccountDashboardClient() {
  const { data: session } = useSession();
  const { wishlistCount } = useStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [ordersRes, profileRes] = await Promise.all([
          fetch("/api/orders", { cache: "no-store" }),
          fetch("/api/account/profile", { cache: "no-store" }),
        ]);

        const ordersData = await ordersRes.json();
        const profileData = await profileRes.json();

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setProfile(profileRes.ok ? profileData : null);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const displayName =
    session?.user?.name ||
    profile?.name ||
    "User";

  const hasSavedAddress = Boolean(
    profile?.address?.streetAddress &&
      profile?.address?.city &&
      profile?.address?.state
  );

  const recentOrder = orders[0];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900">
          Welcome back, {displayName}
        </h2>
        <p className="mt-2 text-zinc-600">
          Manage your profile, track orders, and keep your shopping details up to date.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/account/orders"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <ShoppingBag className="mb-4" size={24} />
          <h3 className="text-lg font-semibold text-zinc-900">My Orders</h3>
          <p className="mt-2 text-sm text-zinc-600">
            View your recent purchases and their current delivery status.
          </p>
        </Link>

        <Link
          href="/wishlist"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <Heart className="mb-4" size={24} />
          <h3 className="text-lg font-semibold text-zinc-900">Wishlist</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Check the products you saved for later.
          </p>
        </Link>

        <Link
          href="/account/addresses"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <MapPin className="mb-4" size={24} />
          <h3 className="text-lg font-semibold text-zinc-900">Addresses</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Manage delivery addresses for a faster checkout experience.
          </p>
        </Link>

        <Link
          href="/account/profile"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <User className="mb-4" size={24} />
          <h3 className="text-lg font-semibold text-zinc-900">Profile</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Update your personal information and account settings.
          </p>
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900">Recent Order</h3>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600">
              Loading recent order...
            </div>
          ) : recentOrder ? (
            <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Order ID</p>
                  <p className="font-semibold text-zinc-900">
                    #{recentOrder._id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Placed On</p>
                  <p className="font-semibold text-zinc-900">
                    {new Date(recentOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Status</p>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                    {recentOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Total</p>
                  <p className="font-semibold text-zinc-900">
                    ₹{recentOrder.total}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600">
              No orders placed yet.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900">Account Snapshot</h3>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4">
              <span className="text-zinc-600">Orders</span>
              <span className="font-semibold text-zinc-900">{orders.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4">
              <span className="text-zinc-600">Saved Address</span>
              <span className="font-semibold text-zinc-900">
                {hasSavedAddress ? 1 : 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4">
              <span className="text-zinc-600">Wishlist Items</span>
              <span className="font-semibold text-zinc-900">{wishlistCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}