"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/ThemeToggle";
import { LayoutDashboard, Ticket, Users, BarChart3, MessageSquare, LogOut, Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "admin" | "agent";
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive(href)
          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 font-semibold shadow-sm"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive(href) ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <span className="text-white font-bold text-lg">S</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">SmartServe</h2>
            </div>
            <button onClick={() => setOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem href={`/${role}`} icon={LayoutDashboard} label="Dashboard" />

            {role === "admin" && (
              <>
                <NavItem href="/admin/tickets" icon={Ticket} label="All Tickets" />
                <NavItem href="/admin/users" icon={Users} label="Users" />
                <NavItem href="/admin/analytics" icon={BarChart3} label="Analytics" />
              </>
            )}

            {role === "agent" && (
              <>
                <NavItem href="/agent/tickets" icon={Ticket} label="My Tickets" />
                <NavItem href="/agent/chat" icon={MessageSquare} label="Live Chat" />
              </>
            )}
          </nav>
          
          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
             <div className="flex items-center justify-between mb-6 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
               <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Dark Mode</span>
               <ThemeToggle />
             </div>
             <Link 
              href="/login" 
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* MOBILE TOP BAR */}
        <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setOpen(true)}
            className="text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-gray-900 dark:text-white">SmartServe</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
