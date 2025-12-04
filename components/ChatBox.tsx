"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import MessageBubble from "./MessageBubble";

export default function ChatBox({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "messages", chatId, "chat"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, [chatId]);

  async function sendMessage(e: any) {
    e.preventDefault();
    if (!text.trim()) return;

    const uid = auth.currentUser?.uid;
    const messageText = text.trim();
    setText("");

    // ✅ 1) SAVE USER MESSAGE TO CHAT
    await addDoc(collection(db, "messages", chatId, "chat"), {
      text: messageText,
      senderId: uid,
      createdAt: serverTimestamp(),
    });

    // ✅ 2) CALL AI ANALYZE API
    let analysis: any = null;
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageText }),
      });
      analysis = await res.json();
    } catch (err) {
      console.error("analysis failed", err);
    }

    // ✅ 3) CREATE / UPDATE TICKET WITH AI DATA
    let ticketId: string | null = null;
    try {
      const ticketRef = await addDoc(collection(db, "tickets"), {
        customerId: uid,
        customerName: auth.currentUser?.email || null,
        issue: messageText,
        status: "open",
        priority: "medium",
        assignedAgentId: null,
        createdAt: serverTimestamp(),
        sentiment: analysis?.sentiment || "neutral",
        suggestedDepartment: analysis?.department || "general",
        aiKeywords: analysis?.keywords || [],
      });

      ticketId = ticketRef.id;

      // ✅ Link ticket to chat
      await setDoc(doc(db, "chats", chatId), { ticketId }, { merge: true });
    } catch (err) {
      console.error("ticket creation error", err);
    }

    // ✅ 4) CALL AI RESPOND API (CHATBOT)
    let botResult: any = null;
    try {
      const recent = [{ role: "user", content: messageText }];

      const r = await fetch("/api/ai/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText,
          recentMessages: recent,
        }),
      });

      botResult = await r.json();
    } catch (err) {
      console.error("respond failed", err);
    }

    // ✅ 5) ADD BOT MESSAGE TO CHAT (IF NOT ESCALATED)
    if (botResult?.reply && !botResult?.escalate) {
      await addDoc(collection(db, "messages", chatId, "chat"), {
        text: botResult.reply,
        senderId: "smartserve-bot",
        createdAt: serverTimestamp(),
        meta: { confidence: botResult.confidence },
      });
    }

    // ✅ 6) HANDLE ESCALATION
    if (botResult?.escalate) {
      await setDoc(
        doc(db, "chats", chatId),
        {
          escalate: true,
          escalateReason: botResult.reason || "AI escalation",
        },
        { merge: true }
      );

      // (Optional: later you can also update ticket status to "in_progress")
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            text={msg.text}
            isMe={msg.senderId === auth.currentUser?.uid}
          />
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-white flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button className="bg-indigo-600 text-white px-5 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}
