"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    state: "",
    country: "India",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Registration successful");
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
        }, 1200);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">Create Account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Register once with your address details so checkout becomes faster later.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          />

          <div className="relative md:col-span-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (6-8 chars, Aa1)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-zinc-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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

          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          />

          <p className="text-xs text-zinc-500 md:col-span-2">
            Password must contain uppercase, lowercase, and number. Length: 6 to 8.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-700 disabled:opacity-60 md:col-span-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
      </div>
    </div>
  );
}