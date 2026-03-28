"use client";

import { useEffect, useState } from "react";

type ProfileResponse = {
  name?: string;
  email?: string;
  phone?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  address?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    country?: string;
  };
};

export default function ProfileClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      state: "",
      country: "India",
    },
  });

  const [profileMeta, setProfileMeta] = useState({
    email: "",
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/account/profile", { cache: "no-store" });
        const data: ProfileResponse = await res.json();

        if (res.ok && data) {
          setForm({
            name: data.name || "",
            phone: data.phone || "",
            address: {
              firstName: data.address?.firstName || "",
              lastName: data.address?.lastName || "",
              email: data.address?.email || data.email || "",
              phone: data.address?.phone || data.phone || "",
              streetAddress: data.address?.streetAddress || "",
              city: data.address?.city || "",
              postalCode: data.address?.postalCode || "",
              state: data.address?.state || "",
              country: data.address?.country || "India",
            },
          });

          setProfileMeta({
            email: data.email || "",
            isEmailVerified: Boolean(data.isEmailVerified),
            isPhoneVerified: Boolean(data.isPhoneVerified),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to save profile");
      } else {
        setMessage("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleSendEmailOtp() {
    if (!profileMeta.email) {
      setMessage("No email found for verification");
      return;
    }

    setSendingOtp(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: profileMeta.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to send OTP");
      } else {
        setMessage("OTP sent to your email. Please verify it.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">Profile Settings</h2>
      <p className="mt-2 text-zinc-600">
        Save your personal and default shipping details once.
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 ${
            profileMeta.isEmailVerified
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          Email: {profileMeta.isEmailVerified ? "Verified" : "Not Verified"}
        </span>

        <span
          className={`rounded-full px-3 py-1 ${
            profileMeta.isPhoneVerified
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          Phone: {profileMeta.isPhoneVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {!profileMeta.isEmailVerified && (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSendEmailOtp}
            disabled={sendingOtp}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:opacity-60"
          >
            {sendingOtp ? "Sending OTP..." : "Send Email OTP"}
          </button>

          <a
            href={`/verify-email?email=${encodeURIComponent(profileMeta.email)}`}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Verify Email
          </a>
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <input
          type="text"
          placeholder="First Name"
          value={form.address.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, firstName: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={form.address.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, lastName: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <input
          type="email"
          placeholder="Address Email"
          value={form.address.email}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, email: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <input
          type="text"
          placeholder="Address Phone"
          value={form.address.phone}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, phone: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <input
          type="text"
          placeholder="Street Address"
          value={form.address.streetAddress}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, streetAddress: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
        />

        <input
          type="text"
          placeholder="City"
          value={form.address.city}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, city: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={form.address.postalCode}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, postalCode: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <input
          type="text"
          placeholder="State"
          value={form.address.state}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, state: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <input
          type="text"
          placeholder="Country"
          value={form.address.country}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, country: e.target.value },
            })
          }
          className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-4 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 md:col-span-2"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-zinc-600">{message}</p>}
    </div>
  );
}