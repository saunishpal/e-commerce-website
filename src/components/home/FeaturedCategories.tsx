import Link from "next/link";
import { categories } from "@/data/categories";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Categories"
        title="Shop By Signature Style"
        subtitle="Explore curated collections built to give your store a premium, editorial feel."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            className="group relative overflow-hidden rounded-[2rem]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="mt-1 text-sm text-white/80">
                {category.itemCount} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}