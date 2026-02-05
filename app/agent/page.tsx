import DashboardLayout from "@/components/DashboardLayout";
import TicketTable from "@/components/TicketTable";
import StatCard from "@/components/StatCard";
import { CheckCircle, Clock, ListTodo, MessageSquare, Search, Zap, BookOpen } from "lucide-react";

export default function AgentDashboard() {
  return (
    <DashboardLayout role="agent">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Agent Workspace</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your tickets and track your performance.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tickets or users..." 
            className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
          />
        </div>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Assigned to Me" 
          value="12" 
          icon={ListTodo}
          trend="+2"
          trendUp={false} // Neutral
        />
        <StatCard 
          title="Resolved Today" 
          value="7" 
          icon={CheckCircle}
          trend="+3"
          trendUp={true}
        />
        <StatCard 
          title="Avg Response" 
          value="15m" 
          icon={Clock}
          trend="-2m"
          trendUp={true} // Faster is better
        />
        <StatCard 
          title="Customer Rating" 
          value="4.8" 
          icon={MessageSquare}
          trend="+0.1"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Ticket List */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Active Tickets</h2>
            <div className="flex gap-2">
               <select className="text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1.5 px-3 focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option>All Priority</option>
                 <option>High</option>
                 <option>Medium</option>
                 <option>Low</option>
               </select>
            </div>
          </div>
          <TicketTable />
        </div>

        {/* Sidebar: Next Up & Guidelines */}
        <div className="space-y-6">
           {/* Next Priority Ticket */}
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  Next Priority
                </h3>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full dark:bg-red-900/30 dark:text-red-400 font-medium border border-red-200 dark:border-red-900/50">High</span>
              </div>
              
              <div className="mb-6 relative z-10">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">Payment Gateway Error</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> John Doe</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Waiting 25m</span>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  Customer is reporting a 500 error when trying to checkout with credit card.
                </p>
              </div>
              
              <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-none relative z-10">
                Open Ticket #T-1004
              </button>
           </div>

           {/* Quick Actions / Templates */}
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-between group">
                  <span>Draft "Reset Password" Email</span>
                  <Zap className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-between group">
                  <span>Search Knowledge Base</span>
                  <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>
                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600 flex items-center justify-between group">
                  <span>Escalate Ticket</span>
                  <AlertCircle className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
