import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized: no session email" },
        { status: 401 }
      );
    }

    await connectDB();

    const role = (session.user as { role?: string }).role;

    const orders =
      role === "admin"
        ? await Order.find().sort({ createdAt: -1 })
        : await Order.find({ userEmail: session.user.email }).sort({
            createdAt: -1,
          });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION IN POST /api/orders:", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized: no session email" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("BODY IN POST /api/orders:", body);

    await connectDB();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { message: "Order items are required" },
        { status: 400 }
      );
    }

    if (
      body.subtotal === undefined ||
      body.shipping === undefined ||
      body.total === undefined
    ) {
      return NextResponse.json(
        { message: "Subtotal, shipping, and total are required" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: (session.user as { id?: string }).id || "unknown",
      userEmail: session.user.email,
      userName: session.user.name || "User",
      items: body.items,
      shippingAddress: body.shippingAddress || {},
      subtotal: Number(body.subtotal),
      shipping: Number(body.shipping),
      total: Number(body.total),
      status: "Processing",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 }
    );
  }
}