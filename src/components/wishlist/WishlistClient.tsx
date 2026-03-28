"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/StoreProvider";

export default function WishlistClient() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-900">Your wishlist is empty</h1>
        <p className="mt-4 text-zinc-600">
          Save products you love and find them here later.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Wishlist</h1>
      <p className="mt-3 text-zinc-600">
        Your saved products, ready for later.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-zinc-500">{item.category}</p>
              <h2 className="mt-1 text-xl font-semibold text-zinc-900">{item.name}</h2>
              <p className="mt-3 text-sm text-zinc-600">{item.description}</p>
              <p className="mt-4 text-xl font-bold text-zinc-900">₹{item.price}</p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => addToCart(item)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="rounded-full border border-zinc-300 px-4 py-3 text-zinc-700 hover:bg-zinc-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}