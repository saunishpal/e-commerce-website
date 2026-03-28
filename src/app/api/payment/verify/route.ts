import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Payment verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/payment/verify error:", error);
    return NextResponse.json(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
}