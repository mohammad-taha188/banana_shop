import { NextResponse } from "next/server";

export async function GET() {
  let res = NextResponse.json({ message: "success", status: 200 });

  res.cookies.delete("token");
  return res;
}
