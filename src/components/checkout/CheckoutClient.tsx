"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/store/StoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProfileResponse = {
  email?: string;
  isEmailVerified?: boolean;
  address?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    state?: string;
  };
};

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useStore();
  const { status } = useSession();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    state: "",
    paymentMethod: "Cash on Delivery",
  });

  const [profileEmail, setProfileEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSavedAddress() {
      try {
        const res = await fetch("/api/account/profile", { cache: "no-store" });
        const data: ProfileResponse = await res.json();

        if (res.ok) {
          setProfileEmail(data.email || "");
          setIsEmailVerified(Boolean(data.isEmailVerified));

          if (data?.address) {
            setForm((prev) => ({
              ...prev,
              firstName: data.address?.firstName || "",
              lastName: data.address?.lastName || "",
              email: data.address?.email || data.email || "",
              streetAddress: data.address?.streetAddress || "",
              city: data.address?.city || "",
              postalCode: data.address?.postalCode || "",
              state: data.address?.state || "",
            }));
          }
        }
      } catch (error) {
        console.error("Failed to load saved address:", error);
      } finally {
        setProfileLoading(false);
      }
    }

    if (status === "authenticated") {
      loadSavedAddress();
    }
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-900">Login first</h1>
        <p className="mt-4 text-zinc-600">
          You need to log in or create an account before checkout.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 text-center">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-zinc-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold text-zinc-900">Verify your email first</h1>
          <p className="mt-4 text-zinc-600">
            You need to verify your email before placing an order.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/verify-email?email=${encodeURIComponent(profileEmail || form.email)}`}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Verify Email
            </Link>

            <Link
              href="/account/profile"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = cart.length > 0 ? 99 : 0;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-900">No items to checkout</h1>
        <p className="mt-4 text-zinc-600">
          Add items to cart before moving to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  async function handlePlaceOrder() {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.streetAddress ||
      !form.city ||
      !form.postalCode ||
      !form.state
    ) {
      setMessage("Please fill all shipping details.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderPayload = {
        items: cart.map((item) => ({
          productId: String(item.id),
          name: item.name,
          slug: item.slug,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: form,
        subtotal: cartSubtotal,
        shipping,
        total,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to place order");
      } else {
        clearCart();
        router.push("/order-success");
        router.refresh();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Checkout</h1>
      <p className="mt-3 text-zinc-600">
        Complete your order with your saved address or update it before placing the order.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Shipping Details</h2>

          <form className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={form.streetAddress}
              onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            >
              <option>Cash on Delivery</option>
            </select>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-4 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 md:col-span-2"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
        </div>

        <div className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-zinc-900">{item.name}</p>
                  <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-zinc-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 border-t border-zinc-200 pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium text-zinc-900">₹{cartSubtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Shipping</span>
              <span className="font-medium text-zinc-900">₹{shipping}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-zinc-900">Total</span>
              <span className="text-xl font-bold text-zinc-900">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}