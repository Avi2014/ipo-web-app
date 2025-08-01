import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  AuthContainer,
  AdminDashboard,
  IPOUpcomingScreen,
  RegisterIPODetails,
} from "../comp_2_admin_side";

const AdminRoutes = ({ initialPage = "dashboard" }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Update currentPage when initialPage changes
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // If user is not authenticated, show auth container
  if (!isAuthenticated || user?.role !== "admin") {
    return <AuthContainer />;
  }

  const handleSaveIPO = (ipoData) => {
    console.log("Saving IPO:", ipoData);
    // Here you would typically save to your backend
    setShowRegisterModal(false);
    // Optionally refresh the IPO list or redirect
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case "ipos":
        return <IPOUpcomingScreen onNavigate={setCurrentPage} />;
      default:
        return <AdminDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">IPO Admin</h1>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === "dashboard"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage("ipos")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === "ipos"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  IPO Management
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Register New IPO
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{renderCurrentPage()}</main>

      {/* Register IPO Modal */}
      {showRegisterModal && (
        <RegisterIPODetails
          onClose={() => setShowRegisterModal(false)}
          onSave={handleSaveIPO}
        />
      )}
    </div>
  );
};

export default AdminRoutes;
