import { NextResponse } from "next/server";

export async function GET(req) {
  let token = req.cookies.get("token");

  if (token) {
    return NextResponse.json({ message: "success", data: token });
  } else {
    return NextResponse.json({ message: "token not found" }, { status: 400 });
  }
}
