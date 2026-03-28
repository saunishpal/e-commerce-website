"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/store/StoreProvider";

export default function CartClient() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartSubtotal,
  } = useStore();

  const shipping = cart.length > 0 ? 99 : 0;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-900">Your cart is empty</h1>
        <p className="mt-4 text-zinc-600">
          Add some premium products and come back here.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>
      <p className="mt-3 text-zinc-600">
        Review your selected items before checkout.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid gap-5 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:grid-cols-[140px_1fr_auto]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-36 w-full rounded-2xl object-cover"
              />

              <div>
                <p className="text-sm text-zinc-500">{item.category}</p>
                <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                <p className="mt-4 text-lg font-bold text-zinc-900">₹{item.price}</p>
              </div>

              <div className="flex flex-col items-end justify-between gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex items-center gap-3 rounded-full border border-zinc-300 px-3 py-2">
                  <button onClick={() => decreaseQuantity(item.id)}>
                    <Minus size={16} />
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button onClick={() => increaseQuantity(item.id)}>
                    <Plus size={16} />
                  </button>
                </div>

                <p className="text-sm font-semibold text-zinc-700">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium text-zinc-900">₹{cartSubtotal}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Shipping</span>
              <span className="font-medium text-zinc-900">₹{shipping}</span>
            </div>

            <div className="border-t border-zinc-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-zinc-900">Total</span>
                <span className="text-xl font-bold text-zinc-900">₹{total}</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-8 block rounded-full bg-zinc-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}