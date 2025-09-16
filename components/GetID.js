"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function GetID() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const key = process.env.JWT_KEY;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, key);
    return decoded; // اینجا userId یا هر چیزی که داخل payload گذاشتی میاد
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}
