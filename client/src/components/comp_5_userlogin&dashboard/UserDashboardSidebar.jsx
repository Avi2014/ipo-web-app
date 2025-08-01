import React from "react";
import {
  BarChart3,
  Globe,
  Activity,
  Eye,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/user-signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sidebarItems = [
    {
      icon: BarChart3,
      path: "/trading-dashboard",
      label: "Trading Dashboard",
    },
    {
      icon: Globe,
      path: "/market-overview",
      label: "Market Overview",
    },
    {
      icon: Activity,
      path: "#",
      label: "Portfolio",
    },
    {
      icon: Eye,
      path: "#",
      label: "Watchlist",
    },
    {
      icon: User,
      path: "/account-settings",
      label: "Account Settings",
    },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
      {/* Main Navigation */}
      {sidebarItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = isActivePath(item.path);

        if (item.path === "#") {
          return (
            <div
              key={index}
              className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer group relative"
              title={item.label}
            >
              <IconComponent className="w-6 h-6 text-gray-400" />
              <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        }

        return (
          <Link
            key={index}
            to={item.path}
            className={`p-2 rounded-lg cursor-pointer group relative ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            title={item.label}
          >
            <IconComponent
              className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400"}`}
            />
            <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Bottom Section */}
      <div className="mt-auto space-y-4">
        <Link
          to="/account-settings"
          className={`p-2 rounded-lg cursor-pointer group relative ${
            isActivePath("/account-settings")
              ? "bg-cyan-600"
              : "hover:bg-gray-700"
          }`}
          title="Settings"
        >
          <Settings
            className={`w-6 h-6 ${
              isActivePath("/account-settings") ? "text-white" : "text-gray-400"
            }`}
          />
          <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
            Settings
          </span>
        </Link>

        <div
          className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer group relative"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-400" />
          <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSidebar;
