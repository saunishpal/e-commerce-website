import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdminApi } from "@/lib/requireAdminApi";

type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET product by id error:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        ...body,
        price: body.price ? Number(body.price) : body.price,
        oldPrice: body.oldPrice ? Number(body.oldPrice) : body.oldPrice,
        rating: body.rating ? Number(body.rating) : body.rating,
        reviews: body.reviews ? Number(body.reviews) : body.reviews,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  try {
    const { id } = await params;
    await connectDB();

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}