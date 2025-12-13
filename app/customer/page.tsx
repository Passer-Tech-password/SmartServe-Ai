"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, fetchUserProfile, signOut } from "@/lib/auth";
import Link from "next/link";

export default function CustomerPage() {
  const user = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      if (user === undefined) return;
      if (!user) {
        router.push("/login");
        return;
      }
      // optional: ensure role is customer or allow any
      setLoading(false);
    }
    check();
  }, [user, router]);

  if (!user || loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to SmartServe</h1>
        <button onClick={() => signOut()} className="text-sm text-red-600">
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Start a Conversation</h3>
          <p className="text-sm text-gray-500">
            Open chat with our support team
          </p>
          <a
            href="/chat"
            className="mt-3 inline-block px-3 py-2 bg-blue-600 text-white rounded"
          >
            Open Chat
          </a>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">My Tickets</h3>
          <p className="text-sm text-gray-500">
            View the status of your tickets
          </p>
          <Link
            href="/tickets"
            className="mt-3 inline-block px-3 py-2 bg-gray-100 rounded"
          >
            View Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
// File: smartserve/app/customer/page.tsx