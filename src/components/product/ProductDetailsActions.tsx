"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { useSession } from "next-auth/react";

export default function ProductDetailsActions({ product }: { product: Product }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const liked = isInWishlist(product.id);

  const requireAuth = () => {
    if (status !== "authenticated") {
      router.push("/login");
      return false;
    }
    return true;
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={() => {
          if (!requireAuth()) return;
          addToCart(product);
        }}
        className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        <ShoppingBag size={18} />
        {session ? "Add to Cart" : "Log In First"}
      </button>

      <button
        onClick={() => {
          if (!requireAuth()) return;
          addToWishlist(product);
        }}
        className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition ${
          liked
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100"
        }`}
      >
        <Heart size={18} className={liked ? "fill-current" : ""} />
        {liked ? "Wishlisted" : "Add to Wishlist"}
      </button>
    </div>
  );
}