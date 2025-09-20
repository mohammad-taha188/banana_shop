import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  let { password } = await req.json();

  try {
    if (password) {
      let hashedPassword = await bcrypt.hash(password, 10);

      return NextResponse.json({
        message: "password hashed",
        body: hashedPassword,
        status: 200,
      });
    } else {
      return NextResponse.json({ message: "password not found", status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
}
