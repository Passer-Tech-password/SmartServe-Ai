"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "admin" | "agent";
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8">SmartServe</h2>

        <nav className="space-y-4">
          <Link href={`/${role}`} className="block hover:text-indigo-600">
            Dashboard
          </Link>

          {role === "admin" && (
            <>
              <Link href="/admin/tickets" className="block hover:text-indigo-600">
                All Tickets
              </Link>
              <Link href="/admin/agents" className="block hover:text-indigo-600">
                Agents
              </Link>
              <Link href="/admin/analytics" className="block hover:text-indigo-600">
                Analytics
              </Link>
            </>
          )}

          {role === "agent" && (
            <>
              <Link href="/agent/tickets" className="block hover:text-indigo-600">
                My Tickets
              </Link>
              <Link href="/agent/chat" className="block hover:text-indigo-600">
                Live Chat
              </Link>
            </>
          )}

          <Link href="/login" className="block text-red-500">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
