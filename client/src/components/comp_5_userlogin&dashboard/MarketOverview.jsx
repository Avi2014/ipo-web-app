import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  Search,
  Menu,
  BarChart3,
  Eye,
  Settings,
  User,
  LogOut,
  Activity,
  Globe,
  Calendar,
  Clock,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MarketOverview = () => {
  const [portfolioBalance] = useState("$623,098.17");
  const [availableFunds] = useState("$122,912.50");

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or if admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user-signin");
    } else if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/user-signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Market indices data
  const indices = [
    {
      name: "S&P 500 ETF",
      symbol: "SPY",
      price: 509.9,
      change: -3.05,
      changePercent: -0.4,
      color: "text-red-400",
    },
    {
      name: "Dow Jones ETF",
      symbol: "DIA",
      price: 30000,
      change: -3.05,
      changePercent: 0.56,
      color: "text-green-400",
    },
    {
      name: "NASDAQ",
      symbol: "QQQ",
      price: 452.9,
      change: -3.05,
      changePercent: -0.95,
      color: "text-red-400",
    },
  ];

  // Global markets data for the world map
  const globalMarkets = [
    {
      name: "NIKKEI",
      value: "+0.75%",
      position: { top: "35%", left: "85%" },
      color: "bg-green-500",
    },
    {
      name: "ASX 200",
      value: "-0.25%",
      position: { top: "65%", left: "85%" },
      color: "bg-red-500",
    },
    {
      name: "FTSE",
      value: "+0.45%",
      position: { top: "25%", left: "50%" },
      color: "bg-green-500",
    },
    {
      name: "DAX",
      value: "-0.15%",
      position: { top: "30%", left: "52%" },
      color: "bg-red-500",
    },
    {
      name: "CAC",
      value: "+0.85%",
      position: { top: "32%", left: "48%" },
      color: "bg-green-500",
    },
    {
      name: "HANG SENG",
      value: "-1.05%",
      position: { top: "40%", left: "80%" },
      color: "bg-red-500",
    },
  ];

  // Heat map data
  const heatMapSectors = [
    { name: "Information Technology", change: 2.5, size: "large" },
    { name: "Financials", change: -1.2, size: "large" },
    { name: "Healthcare", change: 0.8, size: "medium" },
    { name: "Consumer Discretionary", change: 1.5, size: "medium" },
    { name: "Communication Services", change: -0.5, size: "medium" },
    { name: "Industrials", change: 0.3, size: "small" },
    { name: "Consumer Staples", change: -0.8, size: "small" },
    { name: "Energy", change: 2.1, size: "small" },
    { name: "Utilities", change: -0.3, size: "small" },
    { name: "Real Estate", change: 0.6, size: "small" },
    { name: "Materials", change: 1.2, size: "small" },
  ];

  // News data
  const topNews = [
    {
      title: "Retail Sales Slump Takes Toll on Mar...",
      time: "10 min ago",
    },
    {
      title: "Tech Giant's Earnings Soar, Stock Hits...",
      time: "2 min ago",
    },
    {
      title: "High-Profile IPO Falls Short of Expect...",
      time: "12 hrs ago",
    },
    {
      title: "Electric Vehicle Stocks Skyrocket as...",
      time: "22 hrs ago",
    },
    {
      title: "Market Sentiment Turns Bearish, Stock...",
      time: "2 hrs ago",
    },
    {
      title: "Chip Shortage Woes Continue, Tech...",
      time: "3 days ago",
    },
  ];

  // Top gainers data
  const topGainers = [
    { symbol: "AAPL", name: "Apple", price: 125, change: 6.36 },
    { symbol: "JPM", name: "JPM Chase", price: 121, change: 21.75 },
    { symbol: "UBER", name: "Uber", price: 80, change: 3.84 },
    { symbol: "NVDA", name: "Nvidia", price: 435, change: 5.85 },
    { symbol: "GOOG", name: "Alphabet", price: 234, change: 6.45 },
    { symbol: "MSFT", name: "Microsoft", price: 436, change: 9.54 },
    { symbol: "TGT", name: "Target", price: 89, change: 11.85 },
    { symbol: "NFLX", name: "Netflix", price: 123, change: 4.9 },
    { symbol: "AMZN", name: "Amazon", price: 467, change: 5.98 },
    { symbol: "META", name: "Meta Apps", price: 123, change: 18.94 },
  ];

  const getHeatMapColor = (change) => {
    if (change > 1.5) return "bg-green-500";
    if (change > 0.5) return "bg-green-400";
    if (change > 0) return "bg-green-300";
    if (change > -0.5) return "bg-red-300";
    if (change > -1) return "bg-red-400";
    return "bg-red-500";
  };

  const getHeatMapSize = (size) => {
    switch (size) {
      case "large":
        return "col-span-3 row-span-2";
      case "medium":
        return "col-span-2 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Logo/Toggle */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              <Menu className="w-5 h-5 text-gray-400" />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div>
                <div className="text-sm font-medium">
                  {user?.name || "User"}
                </div>
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
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
          <Link
            to="/trading-dashboard"
            className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </Link>
          <Link to="/market-overview" className="p-2 bg-blue-600 rounded-lg">
            <Globe className="w-6 h-6" />
          </Link>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <Activity className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <Eye className="w-6 h-6 text-gray-400" />
          </div>
          <Link
            to="/account-settings"
            className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <User className="w-6 h-6 text-gray-400" />
          </Link>
          <div className="mt-auto space-y-4">
            <Link
              to="/account-settings"
              className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <Settings className="w-6 h-6 text-gray-400" />
            </Link>
            <div
              className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Indexes Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Indexes</h2>
                <Menu className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                {indices.map((index) => (
                  <div
                    key={index.symbol}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{index.symbol}</div>
                      <div className="text-sm text-gray-400">{index.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {index.price.toLocaleString()}
                      </div>
                      <div className={`text-sm ${index.color}`}>
                        {index.change > 0 ? "+" : ""}
                        {index.change} {index.changePercent > 0 ? "+" : ""}
                        {index.changePercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Chart */}
              <div className="mt-6 h-32 bg-gray-900 rounded flex items-center justify-center">
                <div className="text-gray-400 text-sm">
                  Market Indices Chart
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                <span>09:30</span>
                <span>+1:00</span>
                <span>16:00</span>
              </div>
            </div>

            {/* Global Markets */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Global Markets</h2>
                <Menu className="w-5 h-5 text-gray-400" />
              </div>

              {/* World Map */}
              <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden">
                {/* World map background - simplified representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>

                {/* Market indicators */}
                {globalMarkets.map((market, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      top: market.position.top,
                      left: market.position.left,
                    }}
                  >
                    <div
                      className={`w-4 h-4 ${market.color} rounded-full flex items-center justify-center text-xs font-bold`}
                    >
                      {market.value.startsWith("+") ? "+" : "-"}
                    </div>
                    <div className="text-xs text-white mt-1 text-center whitespace-nowrap">
                      {market.name}
                    </div>
                    <div
                      className={`text-xs text-center ${market.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    >
                      {market.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heat Map */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Heat Map</h2>
                <Menu className="w-5 h-5 text-gray-400" />
              </div>

              <div className="mb-4 flex items-center gap-4">
                <div>
                  <label className="text-sm text-gray-400">Industries</label>
                  <select className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm">
                    <option>Popular</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Time frame</label>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 px-3 py-1 rounded text-sm">
                      D
                    </button>
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">
                      W
                    </button>
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">
                      M
                    </button>
                    <button className="bg-gray-700 px-3 py-1 rounded text-sm">
                      Y
                    </button>
                  </div>
                </div>
              </div>

              {/* Heat Map Grid */}
              <div className="grid grid-cols-6 grid-rows-4 gap-1 h-48">
                {heatMapSectors.map((sector, index) => (
                  <div
                    key={index}
                    className={`${getHeatMapColor(
                      sector.change
                    )} ${getHeatMapSize(
                      sector.size
                    )} rounded p-2 flex flex-col justify-between text-xs`}
                  >
                    <div className="font-medium text-white">{sector.name}</div>
                    <div className="text-white font-bold">
                      {sector.change > 0 ? "+" : ""}
                      {sector.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top News */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top News</h2>
                <Menu className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                {topNews.map((news, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm text-white hover:text-blue-400 cursor-pointer">
                        {news.title}
                      </div>
                      <div className="text-xs text-gray-400">{news.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Gainers */}
            <div className="bg-gray-800 rounded-lg p-6 col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top Gainers</h2>
                <Menu className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm">
                <div className="text-gray-400 font-medium">Symbol</div>
                <div className="text-gray-400 font-medium">Name</div>
                <div className="text-gray-400 font-medium">Price</div>
                <div className="text-gray-400 font-medium">% Change</div>
                <div></div>
              </div>

              <div className="space-y-2 mt-4 max-h-64 overflow-y-auto">
                {topGainers.map((stock, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 text-sm items-center py-2 hover:bg-gray-700 rounded px-2"
                  >
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-gray-400">{stock.name}</div>
                    <div>{stock.price}</div>
                    <div className="text-green-400">+{stock.change}%</div>
                    <div className="text-right">
                      <button className="text-blue-400 hover:underline">
                        Trade
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
