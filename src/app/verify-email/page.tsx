import { Suspense } from "react";
import VerifyEmailClient from "@/components/VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-20">
          <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-zinc-600">Loading verification page...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  );
}
