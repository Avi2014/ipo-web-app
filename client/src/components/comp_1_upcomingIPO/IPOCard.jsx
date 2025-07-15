import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Users, Building2 } from "lucide-react";

const IPOCard = ({ ipo, onViewDetails, onApply }) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ">
      {/* Header with Logo and Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
              {ipo.companyName}
            </h3>
            <p className="text-sm text-gray-500">{ipo.sector}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            ipo.status
          )}`}
        >
          {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
        </span>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price Band</span>
          <span className="text-lg font-bold text-gray-900">
            {ipo.priceRange}
          </span>
        </div>
      </div>

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Open Date</p>
          <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(ipo.openDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Close Date</p>
          <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(ipo.closeDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Issue Size</p>
          <p className="text-sm font-medium text-gray-900">{ipo.issueSize}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Lot Size</p>
          <p className="text-sm font-medium text-gray-900">
            {ipo.lotSize} shares
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center mb-4 py-2 bg-gray-50 rounded-lg px-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Min Investment</p>
          <p className="text-sm font-medium text-gray-900">
            {ipo.minInvestment}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">GMP</p>
          <p className="text-sm font-medium text-green-600">{ipo.gmp}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Subscription</p>
          <p className="text-sm font-medium text-blue-600">
            {ipo.subscription}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(ipo)}
        >
          View Details
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onApply(ipo)}
          disabled={ipo.status === "closed"}
        >
          {ipo.status === "closed" ? "Closed" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default IPOCard;
