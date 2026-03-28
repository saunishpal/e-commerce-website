import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>

        <h1 className="mt-6 text-4xl font-bold text-zinc-900">
          Order placed successfully
        </h1>

        <p className="mt-4 text-zinc-600">
          Your order has been recorded. You can track it from your account orders page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/account/orders"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
          >
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}