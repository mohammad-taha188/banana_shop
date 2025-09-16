import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  let body = await req.json();
  try {
    let { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "userId not found" },
        { status: 400 }
      );
    }

    let token = jwt.sign({ userId }, process.env.JWT_KEY);

    let res = NextResponse.json({ message: "success", status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true, // فقط سمت سرور خونده میشه
      path: "/", // کل سایت
      maxAge: 60 * 60 * 24, // یک روز
    });
    return res;
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", status: 400 });
  }
}
