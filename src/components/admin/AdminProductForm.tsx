"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  description?: string;
  inStock: boolean;
};

type Props = {
  onCreated?: () => void;
  editingProduct?: Product | null;
};

export default function AdminProductForm({ onCreated, editingProduct }: Props) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    rating: "4.5",
    reviews: "0",
    badge: "",
    description: "",
    inStock: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        slug: editingProduct.slug || "",
        category: editingProduct.category || "",
        price: String(editingProduct.price || ""),
        oldPrice: String(editingProduct.oldPrice || ""),
        image: editingProduct.image || "",
        rating: "4.5",
        reviews: "0",
        badge: editingProduct.badge || "",
        description: editingProduct.description || "",
        inStock: editingProduct.inStock,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        category: "",
        price: "",
        oldPrice: "",
        image: "",
        rating: "4.5",
        reviews: "0",
        badge: "",
        description: "",
        inStock: true,
      });
    }
  }, [editingProduct]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const payload = {
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        rating: Number(form.rating),
        reviews: Number(form.reviews),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to save product");
      } else {
        setMessage(
          editingProduct
            ? "Product updated successfully"
            : "Product created successfully"
        );

        setForm({
          name: "",
          slug: "",
          category: "",
          price: "",
          oldPrice: "",
          image: "",
          rating: "4.5",
          reviews: "0",
          badge: "",
          description: "",
          inStock: true,
        });

        onCreated?.();
      }
    } catch (error) {
      console.error("AdminProductForm error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">
        {editingProduct ? "Edit Product" : "Create Product"}
      </h2>
      <p className="mt-2 text-zinc-600">
        {editingProduct
          ? "Update product details below."
          : "Add a new product to the storefront."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="number"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <input
          type="text"
          placeholder="Badge"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />
        <select
          value={form.inStock ? "yes" : "no"}
          onChange={(e) =>
            setForm({ ...form, inStock: e.target.value === "yes" })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        >
          <option value="yes">In Stock</option>
          <option value="no">Out of Stock</option>
        </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="min-h-32 rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60 md:col-span-2"
        >
          {loading
            ? editingProduct
              ? "Updating..."
              : "Creating..."
            : editingProduct
            ? "Update Product"
            : "Create Product"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
    </div>
  );
}