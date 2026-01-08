// app/api/notifications/notifyAgent/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ------------------------------------------------------------------
   Firebase Admin (lazy init – required for Next.js App Router)
------------------------------------------------------------------- */
function getFirestore() {
  if (!admin.apps.length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
    }

    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  }

  return admin.firestore();
}

/* ------------------------------------------------------------------
   POST /api/notifications/notifyAgent
   Body: { agentId: string; title: string; body?: string; ticketId?: string }
------------------------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const firestore = getFirestore();

    /* ---------- Validate request body ---------- */
    const payload = await req.json().catch(() => null);

    if (!payload?.agentId || !payload?.title) {
      return NextResponse.json(
        { error: "agentId and title are required" },
        { status: 400 }
      );
    }

    const { agentId, title, body, ticketId } = payload;

    /* ---------- Create notification ---------- */
    await firestore
      .collection("users")
      .doc(agentId)
      .collection("notifications")
      .add({
        title,
        body: body ?? null,
        ticketId: ticketId ?? null,
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    /* ---------- Optional external webhook ---------- */
    const webhookUrl = process.env.NOTIFY_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentId,
            title,
            body: body ?? null,
            ticketId: ticketId ?? null,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        // Webhook failures should NOT break the API
        console.warn("Notify webhook failed:", webhookError);
      }
    }

    /* ---------- Success ---------- */
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("notifyAgent error:", error);

    return NextResponse.json(
      { error: error.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
