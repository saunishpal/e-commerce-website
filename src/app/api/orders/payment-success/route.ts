import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await connectDB();

    const order = await Order.create({
      userId: (session.user as { id?: string }).id || "unknown",
      userEmail: session.user.email,
      userName: session.user.name || "User",
      items: body.items,
      shippingAddress: body.shippingAddress,
      subtotal: Number(body.subtotal),
      shipping: Number(body.shipping),
      total: Number(body.total),
      status: "Processing",
      paymentStatus: "Paid",
      razorpayOrderId: body.razorpayOrderId,
      razorpayPaymentId: body.razorpayPaymentId,
      razorpaySignature: body.razorpaySignature,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders/payment-success error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to save paid order",
      },
      { status: 500 }
    );
  }
}