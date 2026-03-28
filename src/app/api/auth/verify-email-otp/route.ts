import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Otp from "@/models/Otp";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const otp = await Otp.findOne({
      email,
      code,
      purpose: "email-verification",
    });

    if (!otp) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    if (otp.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );

    await Otp.deleteMany({
      email,
      purpose: "email-verification",
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("verify-email-otp error:", error);
    return NextResponse.json(
      { message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}