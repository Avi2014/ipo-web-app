import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserDashboardHeader = ({
  portfolioBalance = "$623,098.17",
  availableFunds = "$122,912.50",
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Logo/Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">IPO</span>
            </Link>
            <Menu className="w-5 h-5 text-gray-400" />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium">{user?.name || "User"}</div>
              <div className="text-xs text-gray-400">
                Account: {user?.id || "N/A"}
              </div>
            </div>
          </div>

          {/* Portfolio Info */}
          <div className="flex items-center gap-6 ml-8">
            <div>
              <div className="text-xs text-gray-400">Portfolio Balance</div>
              <div className="font-semibold">{portfolioBalance}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Available Funds</div>
              <div className="font-semibold">{availableFunds}</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks, IPOs..."
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHeader;
