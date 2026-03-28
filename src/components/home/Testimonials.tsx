const testimonials = [
  {
    name: "Aanya Mehra",
    role: "Fashion Customer",
    quote:
      "The shopping experience feels premium from start to finish. Clean design, smooth checkout, and beautiful product presentation.",
  },
  {
    name: "Ritwik Sen",
    role: "Lifestyle Buyer",
    quote:
      "This storefront looks like a real high-end brand website. Everything feels polished and easy to use.",
  },
  {
    name: "Priyanshi Das",
    role: "Jewelry Shopper",
    quote:
      "Loved the modern design and product pages. The wishlist, cart, and checkout flow all feel premium and trustworthy.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            What Customers Love About LuxeCart
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-lg leading-8 text-zinc-700">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-zinc-900">{item.name}</p>
                <p className="text-sm text-zinc-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}