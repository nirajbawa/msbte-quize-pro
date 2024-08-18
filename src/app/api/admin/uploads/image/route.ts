import { NextRequest, NextResponse } from "next/server";
import uploadToCloudinary from "@/lib/uploadToCloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  const res = await uploadToCloudinary(fileUri, file.name);

  if (res.success && res.result) {
    return NextResponse.json({
      status: true,
      message: "Image uploaded successfully.",
      data: { imgUrl: res.result.secure_url },
    },   { status: 200 });
  } else
    return NextResponse.json({
      status: false,
      message: "Something went wrong while uploading image please try again.",
    },   { status: 500 });
}
