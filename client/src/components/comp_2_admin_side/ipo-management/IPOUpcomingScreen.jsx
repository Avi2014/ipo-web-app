import React, { useState } from "react";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  BarChart3,
} from "lucide-react";

const IPOUpcomingScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [upcomingIPOs] = useState([
    {
      id: 1,
      companyName: "Tech Innovations Ltd",
      symbol: "TECH",
      sector: "Technology",
      priceRange: "₹420-₹450",
      issueSize: "₹2,500 Cr",
      openDate: "2025-07-25",
      closeDate: "2025-07-30",
      listingDate: "2025-08-02",
      status: "Upcoming",
      minimumInvestment: "₹15,000",
      lotSize: 33,
      applications: 0,
      subscriptionRatio: "-",
      leadManager: "ICICI Securities",
      registrar: "Link Intime",
      description:
        "Leading technology solutions provider focusing on AI and machine learning applications.",
    },
    {
      id: 2,
      companyName: "Green Energy Solutions",
      symbol: "GREEN",
      sector: "Energy",
      priceRange: "₹300-₹320",
      issueSize: "₹1,800 Cr",
      openDate: "2025-07-30",
      closeDate: "2025-08-04",
      listingDate: "2025-08-07",
      status: "Upcoming",
      minimumInvestment: "₹14,000",
      lotSize: 46,
      applications: 0,
      subscriptionRatio: "-",
      leadManager: "Kotak Securities",
      registrar: "KFin Technologies",
      description:
        "Renewable energy company specializing in solar and wind power solutions.",
    },
    {
      id: 3,
      companyName: "Healthcare Plus",
      symbol: "HEALTH",
      sector: "Healthcare",
      priceRange: "₹580-₹620",
      issueSize: "₹3,200 Cr",
      openDate: "2025-08-05",
      closeDate: "2025-08-10",
      listingDate: "2025-08-13",
      status: "Upcoming",
      minimumInvestment: "₹15,000",
      lotSize: 25,
      applications: 0,
      subscriptionRatio: "-",
      leadManager: "Axis Capital",
      registrar: "Bigshare Services",
      description:
        "Multi-specialty healthcare provider with focus on digital health solutions.",
    },
    {
      id: 4,
      companyName: "FinTech Innovations",
      symbol: "FINTECH",
      sector: "Financial Services",
      priceRange: "₹680-₹720",
      issueSize: "₹2,800 Cr",
      openDate: "2025-07-20",
      closeDate: "2025-07-25",
      listingDate: "2025-07-28",
      status: "Active",
      minimumInvestment: "₹15,000",
      lotSize: 22,
      applications: 1850,
      subscriptionRatio: "3.2x",
      leadManager: "Morgan Stanley",
      registrar: "Link Intime",
      description:
        "Digital payment solutions and financial technology services provider.",
    },
  ]);

  const filteredIPOs = upcomingIPOs.filter((ipo) => {
    const matchesSearch =
      ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ipo.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ipo.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSectorColor = (sector) => {
    const colors = {
      Technology: "bg-purple-100 text-purple-800",
      Energy: "bg-green-100 text-green-800",
      Healthcare: "bg-red-100 text-red-800",
      "Financial Services": "bg-blue-100 text-blue-800",
    };
    return colors[sector] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                IPO Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage upcoming and active IPOs
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
            >
              <Plus size={20} className="mr-2" />
              Add New IPO
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search IPOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <BarChart3 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* IPO Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIPOs.map((ipo) => (
            <div
              key={ipo.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {ipo.companyName}
                    </h3>
                    <p className="text-gray-600">{ipo.symbol}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        ipo.status
                      )}`}
                    >
                      {ipo.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getSectorColor(
                        ipo.sector
                      )}`}
                    >
                      {ipo.sector}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.priceRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issue Size</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.issueSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Minimum Investment</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.minimumInvestment}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lot Size</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.lotSize} shares
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-600">Open:</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {ipo.openDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-600">Close:</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {ipo.closeDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="text-blue-600 mr-1" size={16} />
                    </div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.applications || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="text-green-600 mr-1" size={16} />
                    </div>
                    <p className="text-sm text-gray-600">Subscription</p>
                    <p className="font-semibold text-gray-900">
                      {ipo.subscriptionRatio}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="text-yellow-600 mr-1" size={16} />
                    </div>
                    <p className="text-sm text-gray-600">Lead Manager</p>
                    <p className="font-semibold text-gray-900 text-xs">
                      {ipo.leadManager}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{ipo.description}</p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Listing: {ipo.listingDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredIPOs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No IPOs found
            </h3>
            <p className="text-gray-600 mb-6">
              No IPOs match your current search criteria.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add New IPO
            </button>
          </div>
        )}
      </div>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New IPO</h3>
            <p className="text-gray-600 mb-4">
              This will redirect to the IPO registration form.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPOUpcomingScreen;
