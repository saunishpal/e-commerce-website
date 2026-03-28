import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold text-zinc-900">404</h1>
      <p className="mt-4 text-lg text-zinc-600">Page not found.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Go Home
      </Link>
    </div>
  );
}