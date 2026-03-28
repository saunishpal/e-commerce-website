"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/account");
      router.refresh();
    } else {
      setMessage("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-20">
      <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in to continue your premium shopping experience.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}