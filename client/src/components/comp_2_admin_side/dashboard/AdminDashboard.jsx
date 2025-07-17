import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building,
  Calendar,
  DollarSign,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Mock data for dashboard
  const [dashboardStats] = useState({
    totalIPOs: 24,
    activeIPOs: 8,
    totalInvestors: 15420,
    totalInvestment: 2450000000,
    recentApplications: 342,
    pendingApprovals: 12,
  });

  const [recentIPOs] = useState([
    {
      id: 1,
      companyName: "Tech Solutions Ltd",
      symbol: "TECH",
      price: "₹450",
      size: "₹2,500 Cr",
      status: "Active",
      openDate: "2025-07-20",
      closeDate: "2025-07-25",
      applications: 1250,
      subscriptionRatio: "2.5x",
    },
    {
      id: 2,
      companyName: "Green Energy Corp",
      symbol: "GREEN",
      price: "₹320",
      size: "₹1,800 Cr",
      status: "Upcoming",
      openDate: "2025-07-28",
      closeDate: "2025-08-02",
      applications: 0,
      subscriptionRatio: "-",
    },
    {
      id: 3,
      companyName: "FinTech Innovations",
      symbol: "FINTECH",
      price: "₹680",
      size: "₹3,200 Cr",
      status: "Closed",
      openDate: "2025-07-10",
      closeDate: "2025-07-15",
      applications: 2100,
      subscriptionRatio: "4.2x",
    },
  ]);

  const [recentApplications] = useState([
    {
      id: 1,
      investorName: "John Doe",
      email: "john@example.com",
      ipoName: "Tech Solutions Ltd",
      amount: "₹50,000",
      status: "Pending",
      appliedDate: "2025-07-17",
    },
    {
      id: 2,
      investorName: "Sarah Wilson",
      email: "sarah@example.com",
      ipoName: "Tech Solutions Ltd",
      amount: "₹75,000",
      status: "Approved",
      appliedDate: "2025-07-17",
    },
    {
      id: 3,
      investorName: "Mike Johnson",
      email: "mike@example.com",
      ipoName: "Green Energy Corp",
      amount: "₹100,000",
      status: "Rejected",
      appliedDate: "2025-07-16",
    },
  ]);

  useEffect(() => {
    // Mock notifications
    setNotifications([
      {
        id: 1,
        message: "New IPO application from Tech Solutions Ltd",
        time: "2 hours ago",
      },
      {
        id: 2,
        message: "15 new investor registrations today",
        time: "4 hours ago",
      },
      {
        id: 3,
        message: "Green Energy Corp IPO oversubscribed by 2.5x",
        time: "1 day ago",
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Admin"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total IPOs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardStats.totalIPOs}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 text-sm">
                +12% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active IPOs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardStats.activeIPOs}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 text-sm">+3 new this week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investors</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardStats.totalInvestors.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 text-sm">+8% growth</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{(dashboardStats.totalInvestment / 1000000000).toFixed(1)}B
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 text-sm">+15% this quarter</span>
            </div>
          </div>
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent IPOs Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent IPOs
                </h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus size={16} className="mr-2" />
                  Add New IPO
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentIPOs.map((ipo) => (
                    <tr key={ipo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {ipo.companyName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ipo.symbol}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            ipo.status
                          )}`}
                        >
                          {ipo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ipo.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Applications
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IPO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentApplications
                    .filter(
                      (app) =>
                        app.investorName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        app.ipoName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.investorName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.ipoName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="mr-2" size={20} />
              Register New IPO
            </button>
            <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <BarChart3 className="mr-2" size={20} />
              View Analytics
            </button>
            <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Users className="mr-2" size={20} />
              Manage Investors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
