import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdminApi } from "@/lib/requireAdminApi";

type Params = Promise<{ id: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  try {
    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const updated = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/orders/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update order status" },
      { status: 500 }
    );
  }
}