"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  createdAt: string;
  status: string;
  total: number;
};

export default function UserOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">My Orders</h2>
      <p className="mt-2 text-zinc-600">
        Track your real orders placed from checkout.
      </p>

      {loading ? (
        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
          No orders found yet.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">Order ID</p>
                  <p className="font-semibold text-zinc-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Date</p>
                  <p className="font-semibold text-zinc-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Status</p>
                  <p className="font-semibold text-zinc-900">{order.status}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-zinc-500">Total</p>
                <p className="font-semibold text-zinc-900">₹{order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}