import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verify-admin";
import { adminDB } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    await verifyAdmin(token);

    const { uid } = await req.json();

    await adminDB.collection("users").doc(uid).update({
      role: "admin",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
