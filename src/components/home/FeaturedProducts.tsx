import { products } from "@/data/products";
import ProductCard from "../ui/ProductCard";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Best Sellers"
        title="Trending Products"
        subtitle="Premium picks designed to make your storefront feel polished, stylish, and conversion-focused."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}