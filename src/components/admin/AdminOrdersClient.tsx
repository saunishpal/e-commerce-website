"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  total: number;
  status: string;
  paymentStatus?: string;
};

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">Orders</h2>
      <p className="mt-2 text-zinc-600">
        Monitor real customer orders from MongoDB.
      </p>

      {loading ? (
        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
          No orders found.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">Order ID</p>
                  <p className="font-semibold text-zinc-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">Customer</p>
                  <p className="font-semibold text-zinc-900 break-words">
                    {order.userName}
                  </p>
                </div>

                <div className="min-w-0 xl:col-span-2">
                  <p className="text-sm text-zinc-500">Email</p>
                  <p className="font-semibold text-zinc-900 break-all">
                    {order.userEmail}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">Date</p>
                  <p className="font-semibold text-zinc-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">Payment</p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-zinc-200 pt-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Total</p>
                  <p className="text-lg font-bold text-zinc-900">₹{order.total}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-zinc-500">Order Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="rounded-2xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-900"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}