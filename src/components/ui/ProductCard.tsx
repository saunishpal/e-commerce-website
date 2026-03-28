"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { useSession } from "next-auth/react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToCart, addToWishlist, isInWishlist } = useStore();

  const liked = isInWishlist(product.id);

  const requireAuth = () => {
    if (status !== "authenticated") {
      router.push("/register");
      return false;
    }
    return true;
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
              {product.badge}
            </span>
          )}

          <button
            className={`absolute right-4 top-4 rounded-full p-2 shadow ${
              liked ? "bg-zinc-900 text-white" : "bg-white/90 text-zinc-900"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (!requireAuth()) return;
              addToWishlist(product);
            }}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <p className="mb-1 text-sm text-zinc-500">{product.category}</p>

        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-zinc-900 hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 text-sm text-zinc-600">
          <Star size={16} className="fill-current" />
          <span>{product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-bold text-zinc-900">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-zinc-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {product.description}
        </p>

        <button
          onClick={() => {
            if (!requireAuth()) return;
            addToCart(product);
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          <ShoppingBag size={18} />
          {session ? "Add to Cart" : "Create Account"}
        </button>
      </div>
    </div>
  );
}