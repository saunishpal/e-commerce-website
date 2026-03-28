import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const amount = Number(body.amount);

    if (Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid amount" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("POST /api/payment/create-order error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create Razorpay order",
      },
      { status: 500 }
    );
  }
}