import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "name email phone address isEmailVerified isPhoneVerified"
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET profile error:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await connectDB();

    const updated = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: body.name,
        phone: body.phone,
        address: body.address,
      },
      { new: true }
    ).select("name email phone address isEmailVerified isPhoneVerified");

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT profile error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}