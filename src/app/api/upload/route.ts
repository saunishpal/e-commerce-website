import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdminApi } from "@/lib/requireAdminApi";

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "luxecart/products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}