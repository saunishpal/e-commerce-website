export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900">Saved Addresses</h2>
        <p className="mt-2 text-zinc-600">
          Manage your delivery addresses for quick checkout.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
            Default
          </span>
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">Home Address</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Saunish Pal
            <br />
            Haldia Township Road
            <br />
            Haldia, West Bengal - 721657
            <br />
            India
          </p>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700">
              Edit
            </button>
            <button className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
              Remove
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Add New Address</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Add another shipping address for work, family, or gifting.
          </p>

          <form className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
            />
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}