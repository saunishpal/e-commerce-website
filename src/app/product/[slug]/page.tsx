import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailsActions from "@/components/product/ProductDetailsActions";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-zinc-900">
          Shop
        </Link>{" "}
        / <span className="text-zinc-900">{product.name}</span>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-[550px] w-full object-cover"
          />
        </div>

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
              {product.badge}
            </span>
          )}

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-zinc-500">{product.category}</p>

          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
            <span>⭐ {product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-zinc-900">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-zinc-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">
            {product.description}
          </p>

          <div className="mt-6">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <ProductDetailsActions product={product} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-zinc-900">
            Related Products
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-64 w-full rounded-2xl object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{item.category}</p>
                <p className="mt-3 text-lg font-bold text-zinc-900">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}