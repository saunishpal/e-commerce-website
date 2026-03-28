import { ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "A smooth and secure purchasing experience designed with trust first.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Reliable delivery flow with modern order tracking experience.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Customer-friendly return experience for premium satisfaction.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always-on support section to make your storefront feel dependable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Why LuxeCart
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Designed To Build Customer Trust
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
          Premium stores do not just sell products. They create confidence, clarity,
          and a smooth buying experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-amber-50 p-3 text-amber-600">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}