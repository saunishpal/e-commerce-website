const customers = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    orders: 8,
    spent: "₹18,450",
  },
  {
    name: "Priya Das",
    email: "priya@example.com",
    orders: 5,
    spent: "₹11,980",
  },
  {
    name: "Riya Sen",
    email: "riya@example.com",
    orders: 3,
    spent: "₹6,740",
  },
  {
    name: "Rahul Roy",
    email: "rahul@example.com",
    orders: 6,
    spent: "₹14,390",
  },
];

export default function AdminCustomersPage() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">Customers</h2>
      <p className="mt-2 text-zinc-600">
        Track customer activity and purchase history.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-zinc-500">
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Orders</th>
              <th className="px-4 py-2">Total Spent</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="bg-zinc-50 text-sm text-zinc-700">
                <td className="rounded-l-2xl px-4 py-4 font-semibold text-zinc-900">
                  {customer.name}
                </td>
                <td className="px-4 py-4">{customer.email}</td>
                <td className="px-4 py-4">{customer.orders}</td>
                <td className="rounded-r-2xl px-4 py-4">{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}