import { useState, useMemo } from "react";
import { TrendingUp, Calendar, Filter } from "lucide-react";
import IPOCard from "./IPOCard";
import SearchAndFilters from "./SearchAndFilters";
import IPODetailsModal from "./IPODetailsModal";
import { upcomingIPOs } from "./data/ipoData";

const   UpcomingIPOs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sector: "All Sectors",
    status: "All Status",
    type: "All Types",
  });
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and search logic
  const filteredIPOs = useMemo(() => {
    return upcomingIPOs.filter((ipo) => {
      // Search filter
      const matchesSearch = ipo.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Sector filter
      const matchesSector =
        filters.sector === "All Sectors" || ipo.sector === filters.sector;

      // Status filter
      const matchesStatus =
        filters.status === "All Status" || ipo.status === filters.status;

      // Type filter
      const matchesType =
        filters.type === "All Types" || ipo.type === filters.type;

      return matchesSearch && matchesSector && matchesStatus && matchesType;
    });
  }, [searchTerm, filters]);

  const handleViewDetails = (ipo) => {
    setSelectedIPO(ipo);
    setIsModalOpen(true);
  };

  const handleApply = (ipo) => {
    alert(`Applying for ${ipo.companyName} IPO`);
  };

  const handleClearFilters = () => {
    setFilters({
      sector: "All Sectors",
      status: "All Status",
      type: "All Types",
    });
    setSearchTerm("");
  };

  const getStatusCounts = () => {
    const counts = upcomingIPOs.reduce((acc, ipo) => {
      acc[ipo.status] = (acc[ipo.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming IPOs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and invest in the latest Initial Public Offerings. Get
              detailed information about upcoming IPOs and apply seamlessly.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">
                  Upcoming
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {statusCounts.upcoming || 0}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-600">
                  Ongoing
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {statusCounts.ongoing || 0}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  Recently Closed
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {statusCounts.closed || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          totalResults={filteredIPOs.length}
        />

        {/* IPO Grid */}
        {filteredIPOs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIPOs.map((ipo) => (
              <IPOCard
                key={ipo.id}
                ipo={ipo}
                onViewDetails={handleViewDetails}
                onApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No IPOs Found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find more IPOs.
            </p>
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* IPO Details Modal */}
      <IPODetailsModal
        ipo={selectedIPO}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />
    </div>
  );
};

export default UpcomingIPOs;
