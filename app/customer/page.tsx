"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, signOut } from "@/lib/auth";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import { MessageCircle, Ticket, LifeBuoy, ChevronRight, LogOut } from "lucide-react";

export default function CustomerPage() {
  const user = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [user, router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10 transition-colors shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
               <LifeBuoy className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">SmartServe</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{user?.email?.split('@')[0]}</span> 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            How can we help you today?
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Chat Card */}
          <Link
            href="/customer/chat"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300"
          >
            <div className="absolute top-8 right-8 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
               <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Start a New Conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 pr-12">
              Chat with our AI assistant or connect with a support agent for immediate help with your issues.
            </p>
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
              Start Chatting <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Tickets Card */}
          <Link
            href="/customer/tickets"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300"
          >
            <div className="absolute top-8 right-8 bg-teal-50 dark:bg-teal-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
               <Ticket className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              View My Tickets
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 pr-12">
              Check the status of your existing support requests and review past conversations.
            </p>
            <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium group-hover:translate-x-1 transition-transform">
              Go to Tickets <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>

        {/* Help / FAQ Section */}
        <div className="bg-indigo-900 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need quick answers?</h3>
              <p className="text-indigo-200 max-w-md">
                Check our Knowledge Base for guides and FAQs before opening a ticket.
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
              Visit Help Center
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
