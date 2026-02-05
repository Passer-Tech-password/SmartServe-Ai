import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import TicketTable from "@/components/TicketTable";
import { Users, Ticket, CheckCircle, Clock, TrendingUp, AlertCircle, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Real-time overview of system performance and team productivity.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-none">
            + New User
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Tickets" 
          value="1,248" 
          icon={Ticket}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard 
          title="Avg. Response Time" 
          value="1h 42m" 
          icon={Clock}
          trend="-8.4%"
          trendUp={true} // Lower is better for time, so green
        />
        <StatCard 
          title="Resolution Rate" 
          value="94.2%" 
          icon={CheckCircle}
          trend="+2.1%"
          trendUp={true}
        />
        <StatCard 
          title="Active Users" 
          value="892" 
          icon={Users}
          trend="+5.3%"
          trendUp={true}
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics & Tickets */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Mock Chart Area */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Ticket Volume Trends
              </h2>
              <select className="text-sm bg-gray-50 dark:bg-gray-700 border-none rounded-lg text-gray-600 dark:text-gray-300 px-3 py-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            {/* CSS-only Bar Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {[65, 45, 75, 55, 85, 70, 90].map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end group cursor-pointer">
                  <div className="relative w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-t-lg transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50" style={{ height: `${height}%` }}>
                     <div className="absolute bottom-0 w-full bg-indigo-500 dark:bg-indigo-600 rounded-t-lg transition-all duration-500" style={{ height: `${height * 0.7}%` }}></div>
                     {/* Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                       {height * 2} Tickets
                     </div>
                  </div>
                  <span className="text-xs text-gray-400 text-center mt-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tickets Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tickets</h2>
              <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                View All Tickets &rarr;
              </button>
            </div>
            <TicketTable />
          </div>
        </div>

        {/* Right Column: System Health & Actions */}
        <div className="space-y-6">
          
          {/* System Health Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              System Health
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Server Load</span>
                  <span className="font-medium text-gray-900 dark:text-white">24%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[24%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Database Usage</span>
                  <span className="font-medium text-gray-900 dark:text-white">68%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[68%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">AI Token Limit</span>
                  <span className="font-medium text-gray-900 dark:text-white">85%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Approvals / Alerts */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-orange-500" />
               Action Required
             </h3>
             <div className="space-y-3">
               <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-100 dark:border-orange-900/20">
                 <div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900 dark:text-white">High Priority Ticket Unassigned</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ticket #T-1004 has been open for 5 hours.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                 <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900 dark:text-white">New Agent Request</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sarah J. requested access to the dashboard.</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Upgrade Banner */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-indigo-900 dark:to-indigo-950 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Pro Analytics</h3>
               <p className="text-gray-300 text-sm mb-4">Get deeper insights into customer behavior with our Pro plan.</p>
               <button className="w-full py-2 bg-white text-gray-900 dark:text-indigo-900 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                 Upgrade Now
               </button>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"></div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
