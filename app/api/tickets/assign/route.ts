// app/api/tickets/assign/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";

/* ------------------------------------------------------------------
   Firebase Admin (lazy initialization – SAFE for Next.js build)
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
   POST /api/tickets/assign
   Body: { ticketId: string; preferDepartment?: string }
------------------------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const firestore = getFirestore();

    /* ---------- Validate request body ---------- */
    const body = await req.json().catch(() => null);
    if (!body?.ticketId) {
      return NextResponse.json(
        { error: "ticketId is required" },
        { status: 400 }
      );
    }

    const { ticketId, preferDepartment } = body;

    /* ---------- Load ticket ---------- */
    const ticketRef = firestore.collection("tickets").doc(ticketId);
    const ticketSnap = await ticketRef.get();

    if (!ticketSnap.exists) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    /* ---------- Query available agents ---------- */
    let agentsQuery = firestore
      .collection("users")
      .where("role", "==", "agent");

    if (preferDepartment) {
      agentsQuery = agentsQuery.where(
        "departments",
        "array-contains",
        preferDepartment
      );
    }

    const agentsSnap = await agentsQuery.get();

    if (agentsSnap.empty) {
      return NextResponse.json(
        { error: "No agents available" },
        { status: 409 }
      );
    }

    /* ---------- Select least-loaded agent ---------- */
    const agents = agentsSnap.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    }));

    const selectedAgent = agents.reduce((prev, curr) => {
      const prevCount = Number(prev.data.activeTickets || 0);
      const currCount = Number(curr.data.activeTickets || 0);
      return currCount < prevCount ? curr : prev;
    });

    const agentId = selectedAgent.id;

    /* ---------- Transaction (atomic update) ---------- */
    await firestore.runTransaction(async tx => {
      const agentRef = firestore.collection("users").doc(agentId);
      const agentSnap = await tx.get(agentRef);

      if (!agentSnap.exists) {
        throw new Error("Selected agent not found");
      }

      const currentActive = Number(agentSnap.data()?.activeTickets || 0);

      tx.update(agentRef, {
        activeTickets: currentActive + 1,
      });

      tx.update(ticketRef, {
        assignedAgentId: agentId,
        status: "in_progress",
        assignedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    /* ---------- Create notification ---------- */
    await firestore
      .collection("users")
      .doc(agentId)
      .collection("notifications")
      .add({
        title: "New ticket assigned",
        ticketId,
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    /* ---------- Success response ---------- */
    return NextResponse.json(
      {
        success: true,
        assignedAgentId: agentId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Assign ticket error:", error);

    return NextResponse.json(
      { error: error.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
