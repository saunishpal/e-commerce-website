export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="overflow-hidden rounded-[2rem] bg-zinc-900 px-8 py-16 text-center text-white shadow-2xl md:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Limited Time Offer
        </p>
        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Get 20% Off On Your First Order
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
          Start your premium shopping journey with curated products, elegant design,
          and a better online store experience.
        </p>
        <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
          Use code: <span className="ml-2 font-bold text-amber-400">LUXE20</span>
        </div>
        <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200">
          Claim Offer
        </button>
      </div>
    </section>
  );
}