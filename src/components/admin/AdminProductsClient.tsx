"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AdminProductForm from "./AdminProductForm";

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

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <AdminProductForm
        editingProduct={editing}
        onCreated={() => {
          setEditing(null);
          fetchProducts();
        }}
      />

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900">Products</h2>
        <p className="mt-2 text-zinc-600">
          Manage all products stored in MongoDB.
        </p>

        {loading ? (
          <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
            No products found yet. Use the form above to create your first product.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-zinc-500">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="bg-zinc-50 text-sm text-zinc-700">
                    <td className="rounded-l-2xl px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-zinc-900">{product.name}</p>
                          <p className="text-xs text-zinc-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">₹{product.price}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditing(product)}
                          className="rounded-full p-2 hover:bg-zinc-200"
                          title="Edit product"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="rounded-full p-2 hover:bg-zinc-200"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}