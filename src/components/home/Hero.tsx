import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(24,24,27,0.08),_transparent_35%)]" />
      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
            <BadgeCheck size={16} className="text-amber-600" />
            Trusted by modern fashion brands
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Premium Shopping Experience
          </p>

          <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-zinc-900 md:text-7xl">
            Discover Style That Feels
            <span className="block text-amber-600">Luxury First</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            LuxeCart blends premium visuals, modern shopping flow, and elegant
            product curation into a storefront designed to impress customers and convert better.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-zinc-600">
            <div>
              <p className="text-2xl font-bold text-zinc-900">10K+</p>
              <p>Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">500+</p>
              <p>Curated Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">4.9/5</p>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop"
            alt="Fashion model"
            className="h-[680px] w-full rounded-[2rem] object-cover shadow-2xl"
          />

          <div className="absolute -left-6 top-10 rounded-3xl bg-white p-5 shadow-xl">
            <p className="text-sm text-zinc-500">Premium Quality</p>
            <p className="text-xl font-bold text-zinc-900">Curated Collections</p>
          </div>

          <div className="absolute -bottom-6 right-6 rounded-3xl bg-zinc-900 p-5 text-white shadow-xl">
            <p className="text-sm text-zinc-300">Flash Sale</p>
            <p className="text-xl font-bold">Up to 40% Off</p>
          </div>
        </div>
      </div>
    </section>
  );
}