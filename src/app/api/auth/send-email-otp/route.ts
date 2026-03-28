import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { resend } from "@/lib/resend";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.deleteMany({
      email,
      purpose: "email-verification",
    });

    await Otp.create({
      email,
      code,
      purpose: "email-verification",
      expiresAt,
    });

    const { error } = await resend.emails.send({
      from: "LuxeCart <onboarding@resend.dev>",
      to: email,
      subject: "Your LuxeCart Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2>Verify your email</h2>
          <p>Your OTP code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 16px 0;">
            ${code}
          </div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent to email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("send-email-otp error:", error);
    return NextResponse.json(
      { message: "Failed to send email OTP" },
      { status: 500 }
    );
  }
}