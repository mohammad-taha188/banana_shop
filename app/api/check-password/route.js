// api/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/app/supabase"; // همون اتصال دیتابیس

export async function POST(req) {
  const { emailLogin, passwordLogin } = await req.json();

  try {
    // پیدا کردن کاربر
    const { data, error } = await supabase
      .from("users")
      .select("userId, password")
      .eq("email", emailLogin)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Email not found", status: 404 });
    }

    // مقایسه رمز
    const comparedPassword = await bcrypt.compare(passwordLogin, data.password);

    if (!comparedPassword) {
      return NextResponse.json({ message: "Password incorrect", status: 401 });
    }

    // اگه درست بود
    return NextResponse.json({
      message: "Login successful",
      status: 200,
      userId: data.userId,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
