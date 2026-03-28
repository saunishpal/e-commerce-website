"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function sendOtp() {
    setSending(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "OTP sent");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP");
    } finally {
      setSending(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/verify-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Email verified successfully");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setMessage(data.message || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-20">
      <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">Verify Email</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Enter your email and the OTP sent to your inbox.
        </p>

        <form onSubmit={verifyOtp} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="6-digit OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <button
              type="button"
              onClick={sendOtp}
              disabled={sending || !email}
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-medium hover:bg-zinc-100 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send OTP"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
      </div>
    </div>
  );
}