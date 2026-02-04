import DashboardLayout from "@/components/DashboardLayout";
import TicketTable from "@/components/TicketTable";
import StatCard from "@/components/StatCard";
import { CheckCircle, Clock, ListTodo, MessageSquare } from "lucide-react";

export default function AgentDashboard() {
  return (
    <DashboardLayout role="agent">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Workspace</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your tickets and performance</p>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Assigned to Me" 
          value="12" 
          icon={ListTodo}
          trend="+2"
          trendUp={false} // More work assigned is not necessarily "up" in a green way, but let's keep it neutral or simple
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Ticket List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Active Tickets</h2>
            <div className="flex gap-2">
               <select className="text-sm border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
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
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Next Priority</h3>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full dark:bg-red-900/30 dark:text-red-400">High</span>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Payment Gateway Error</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Customer: John Doe • Waiting 25m</p>
              </div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Open Ticket
              </button>
           </div>

           {/* Quick Responses / Templates */}
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  Draft "Reset Password" Email
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  Check Knowledge Base
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  Escalate Ticket
                </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
