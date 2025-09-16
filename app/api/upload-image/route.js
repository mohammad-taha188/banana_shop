import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images");

    if (!files.length) {
      return NextResponse.json(
        { message: "No images found!" },
        { status: 400 }
      );
    }

    const urls = [];

    for (const file of files) {
      if (!file) continue;
      const { url } = await put(file.name, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: true,
      });
      urls.push(url);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { message: "upload failed", error: String(err) },
      { status: 500 }
    );
  }
}
