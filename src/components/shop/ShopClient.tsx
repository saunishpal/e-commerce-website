"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";

type Product = {
  _id: string;
  id?: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  inStock: boolean;
};

const categories = ["All", "Jewelry", "Streetwear", "Accessories"];
const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl && categories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All"
  );
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("Featured");

  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    filtered = filtered.filter((product) => product.price <= maxPrice);

    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, search, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Storefront
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Shop Premium Products
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Explore a polished storefront experience with search, filtering, and sorting.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Search</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900">Category</h2>
            <div className="mt-4 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                    selectedCategory === category
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900">
              Max Price: ₹{maxPrice}
            </h2>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900">Sort By</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section>
          {loading ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center">
              <p className="text-zinc-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
              <h3 className="text-xl font-semibold text-zinc-900">
                No products found
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                Try changing the search term, category, or price range.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-zinc-600">
                  Showing{" "}
                  <span className="font-semibold">{filteredProducts.length}</span>{" "}
                  products
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      id: product.id ?? index + 1,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}