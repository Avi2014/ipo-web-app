import {
  X,
  Calendar,
  Building2,
  TrendingUp,
  Users,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const IPODetailsModal = ({ ipo, isOpen, onClose, onApply }) => {
  if (!isOpen || !ipo) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {ipo.companyName}
              </h2>
              <p className="text-sm text-gray-600">{ipo.sector} Sector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status and Price */}
          <div className="flex justify-between items-center mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                ipo.status
              )}`}
            >
              {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
            </span>
            <div className="text-right">
              <p className="text-sm text-gray-500">Price Band</p>
              <p className="text-2xl font-bold text-gray-900">
                {ipo.priceRange}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About Company</h3>
            <p className="text-gray-600">{ipo.description}</p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">IPO Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Open Date</p>
                    <p className="font-medium">{formatDate(ipo.openDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Close Date</p>
                    <p className="font-medium">{formatDate(ipo.closeDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Listing Date</p>
                    <p className="font-medium">{formatDate(ipo.listingDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                Investment Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Issue Size</p>
                    <p className="font-medium">{ipo.issueSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lot Size</p>
                    <p className="font-medium">{ipo.lotSize} shares</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Min Investment</p>
                    <p className="font-medium">{ipo.minInvestment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Performance */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Market Indicators
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">GMP</p>
                <p className="text-lg font-semibold text-green-600">
                  {ipo.gmp}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Subscription</p>
                <p className="text-lg font-semibold text-blue-600">
                  {ipo.subscription}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-lg font-semibold text-gray-700">
                  {ipo.type}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button
              className="flex-1"
              onClick={() => onApply(ipo)}
              disabled={ipo.status === "closed"}
            >
              {ipo.status === "closed" ? "IPO Closed" : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPODetailsModal;
