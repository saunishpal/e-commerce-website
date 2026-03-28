import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdminApi } from "@/lib/requireAdminApi";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  try {
    await connectDB();

    const body = await req.json();

    const name = String(body.name || "").trim();
    const slug = String(body.slug || "").trim();
    const category = String(body.category || "").trim();
    const image = String(body.image || "").trim();
    const badge = String(body.badge || "").trim();
    const description = String(body.description || "").trim();

    const price = Number(body.price);
    const oldPrice =
      body.oldPrice === "" || body.oldPrice === undefined
        ? undefined
        : Number(body.oldPrice);

    const rating =
      body.rating === "" || body.rating === undefined
        ? 4.5
        : Number(body.rating);

    const reviews =
      body.reviews === "" || body.reviews === undefined
        ? 0
        : Number(body.reviews);

    const inStock =
      body.inStock === true ||
      body.inStock === "true" ||
      body.inStock === "yes";

    if (!name || !slug || !category || !image || !description) {
      return NextResponse.json(
        { message: "Missing required text fields" },
        { status: 400 }
      );
    }

    if (Number.isNaN(price) || price <= 0) {
      return NextResponse.json(
        { message: "Price must be a valid number greater than 0" },
        { status: 400 }
      );
    }

    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "Product slug already exists" },
        { status: 409 }
      );
    }

    const product = await Product.create({
      name,
      slug,
      category,
      price,
      oldPrice,
      image,
      rating,
      reviews,
      badge,
      description,
      inStock,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}