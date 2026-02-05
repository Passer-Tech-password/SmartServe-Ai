import { Eye, User } from "lucide-react";
import Link from "next/link";

export default function TicketTable() {
  // Mock data for display purposes
  const tickets = [
    {
      id: "T-1001",
      customer: "John Doe",
      email: "john@example.com",
      issue: "Payment Failed",
      status: "Open",
      priority: "High",
      lastUpdated: "2 mins ago",
    },
    {
      id: "T-1002",
      customer: "Amina Ali",
      email: "amina@example.com",
      issue: "Login Issue",
      status: "Resolved",
      priority: "Medium",
      lastUpdated: "1 hour ago",
    },
    {
      id: "T-1003",
      customer: "Sarah Smith",
      email: "sarah@example.com",
      issue: "Feature Request",
      status: "In Progress",
      priority: "Low",
      lastUpdated: "3 hours ago",
    },
    {
      id: "T-1004",
      customer: "Michael Brown",
      email: "mike@example.com",
      issue: "Account Suspended",
      status: "Open",
      priority: "High",
      lastUpdated: "5 hours ago",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Open":
        return {
          badge: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30",
          dot: "bg-orange-500"
        };
      case "Resolved":
        return {
          badge: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30",
          dot: "bg-green-500"
        };
      case "In Progress":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30",
          dot: "bg-blue-500"
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
          dot: "bg-gray-500"
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded-md text-xs font-semibold";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-md text-xs font-semibold";
      case "Low":
        return "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md text-xs font-semibold";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="p-4 pl-6">Ticket Details</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {tickets.map((ticket) => {
              const statusStyle = getStatusStyles(ticket.status);
              return (
                <tr key={ticket.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-gray-900 dark:text-white">{ticket.issue}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{ticket.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                         <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{ticket.customer}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{ticket.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={getPriorityColor(ticket.priority)}>{ticket.priority}</span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{ticket.lastUpdated}</td>
                  <td className="p-4 text-right pr-6">
                    <Link
                      href={`/admin/tickets/${ticket.id}`} 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
