import { Eye } from "lucide-react";
import Link from "next/link";

export default function TicketTable() {
  // Mock data for display purposes
  const tickets = [
    {
      id: "T-1001",
      customer: "John Doe",
      issue: "Payment Failed",
      status: "Open",
      priority: "High",
      lastUpdated: "2 mins ago",
    },
    {
      id: "T-1002",
      customer: "Amina Ali",
      issue: "Login Issue",
      status: "Resolved",
      priority: "Medium",
      lastUpdated: "1 hour ago",
    },
    {
      id: "T-1003",
      customer: "Sarah Smith",
      issue: "Feature Request",
      status: "In Progress",
      priority: "Low",
      lastUpdated: "3 hours ago",
    },
    {
      id: "T-1004",
      customer: "Michael Brown",
      issue: "Account Suspended",
      status: "Open",
      priority: "High",
      lastUpdated: "5 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Resolved":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400 font-medium";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "Low":
        return "text-gray-500 dark:text-gray-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium border-b dark:border-gray-700">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Issue</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{ticket.id}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{ticket.customer}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{ticket.issue}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className={`p-4 ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">{ticket.lastUpdated}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/tickets/${ticket.id}`} // Assuming generic route for now
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Showing 4 of 128 tickets</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs border rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 text-xs border rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
}
