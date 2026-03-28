import { Package, ShoppingBag, Users, IndianRupee } from "lucide-react";
import { requireAdmin } from "@/lib/requireAdmin";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";

export default async function AdminDashboardPage() {
  await requireAdmin();
  await connectDB();

  const [productCount, orderCount, userCount, orders] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const revenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <Package className="mb-4" size={24} />
          <p className="text-sm text-zinc-500">Total Products</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">{productCount}</h2>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <ShoppingBag className="mb-4" size={24} />
          <p className="text-sm text-zinc-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">{orderCount}</h2>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <Users className="mb-4" size={24} />
          <p className="text-sm text-zinc-500">Customers</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">{userCount}</h2>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <IndianRupee className="mb-4" size={24} />
          <p className="text-sm text-zinc-500">Recent Revenue</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">₹{revenue}</h2>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-zinc-900">Recent Orders</h3>

        <div className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600">
              No recent orders yet.
            </div>
          ) : (
            orders.map((order: any) => (
              <div
                key={order._id.toString()}
                className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-4"
              >
                <div>
                  <p className="text-sm text-zinc-500">Order ID</p>
                  <p className="font-semibold text-zinc-900">
                    #{order._id.toString().slice(-6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Customer</p>
                  <p className="font-semibold text-zinc-900">{order.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Total</p>
                  <p className="font-semibold text-zinc-900">₹{order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Status</p>
                  <p className="font-semibold text-zinc-900">{order.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}