import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <p className="text-zinc-600">Loading shop...</p>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
