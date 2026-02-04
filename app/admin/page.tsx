import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import TicketTable from "@/components/TicketTable";
import { Users, Ticket, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Overview of system performance and ticket status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Tickets" 
          value="128" 
          icon={Ticket}
          trend="+12%"
          trendUp={true}
        />
        <StatCard 
          title="Open Tickets" 
          value="34" 
          icon={Clock}
          trend="-5%"
          trendUp={true} // Good that open tickets are down? Actually -5% open tickets is usually good, so let's say trendUp=true implies positive outcome (green)
        />
        <StatCard 
          title="Resolved" 
          value="82" 
          icon={CheckCircle}
          trend="+18%"
          trendUp={true}
        />
        <StatCard 
          title="Total Users" 
          value="1,240" 
          icon={Users}
          trend="+4%"
          trendUp={true}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Tickets */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tickets</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
          </div>
          <TicketTable />
        </div>

        {/* Right Column: Quick Actions / System Status (Simulated) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">AI Engine</span>
                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Email Service</span>
                <span className="flex items-center text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  Degraded
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg">
             <h3 className="font-semibold text-lg mb-2">Upgrade Plan</h3>
             <p className="text-indigo-100 text-sm mb-4">Unlock advanced AI analytics and unlimited agent seats.</p>
             <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
               View Plans
             </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
