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
  ChevronDown,
  Activity,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

const TradingDashboard = () => {
  const [selectedStock, setSelectedStock] = useState("MSFT");
  const [orderType, setOrderType] = useState("Market Price");
  const [quantity, setQuantity] = useState(100);
  const [stopPrice, setStopPrice] = useState(400.0);
  const [timeInForce, setTimeInForce] = useState("Day");
  const [portfolioBalance, setPortfolioBalance] = useState(0);
  const [availableFunds, setAvailableFunds] = useState(0);
  const [stockData, setStockData] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const quickQuantities = [10, 50, 100, 500];

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

  useEffect(() => {
    // Fetch portfolio and funds
    api.get("/users/portfolio").then((res) => {
      setPortfolioBalance(res.data.data?.balance || 0);
      setAvailableFunds(res.data.data?.availableFunds || 0);
    });
    // Fetch selected stock data
    api.get(`/market/stock/${selectedStock}`).then((res) => {
      setStockData(res.data.data);
    });
    // Fetch recent trades
    api.get(`/market/stock/${selectedStock}/trades`).then((res) => {
      setRecentTrades(res.data.data || []);
    });
  }, [selectedStock]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/user-signin");
    } catch (error) {
      console.error("Logout error:", error);
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
          <Link to="/trading-dashboard" className="p-2 bg-blue-600 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </Link>
          <Link
            to="/market-overview"
            className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <TrendingUp className="w-6 h-6 text-gray-400" />
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
        <div className="flex-1 flex">
          {/* Chart Area */}
          <div className="flex-1 p-6">
            {/* Stock Header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold">{stockData?.symbol}</h1>
                <span className="text-gray-400">{stockData?.name}</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <Bell className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold text-green-400">
                    {stockData?.price}
                    <span className="text-lg ml-2 text-green-400">
                      +{stockData?.change} +{stockData?.changePercent}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    After hours: 406.83 -0.27 -0.07% | 19:59 04/26 EDT
                  </div>
                </div>
              </div>

              {/* Market Data */}
              <div className="grid grid-cols-6 gap-4 mt-4 text-sm">
                <div>
                  <div className="text-gray-400">Open</div>
                  <div className="text-red-400">{stockData?.open}</div>
                </div>
                <div>
                  <div className="text-gray-400">High</div>
                  <div>{stockData?.high}</div>
                </div>
                <div>
                  <div className="text-gray-400">Low</div>
                  <div>{stockData?.low}</div>
                </div>
                <div>
                  <div className="text-gray-400">Avg Vol (3M)</div>
                  <div>{stockData?.avgVol}</div>
                </div>
                <div>
                  <div className="text-gray-400">Shares Outstanding</div>
                  <div>{stockData?.sharesOutstanding}</div>
                </div>
                <div>
                  <div className="text-gray-400">Mkt Cap</div>
                  <div>{stockData?.marketCap}</div>
                </div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div
              className="bg-gray-800 rounded-lg p-4 mb-6"
              style={{ height: "400px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    Open {stockData?.open}
                  </span>
                  <span className="text-sm text-gray-400">
                    High {stockData?.high}
                  </span>
                  <span className="text-sm text-gray-400">
                    Low {stockData?.low}
                  </span>
                  <span className="text-sm text-gray-400">
                    Close {stockData?.close}
                  </span>
                  <span className="text-sm text-green-400">+8.90 +2.14%</span>
                  <span className="text-sm text-gray-400">
                    Vol {stockData?.volume}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">MA50:406.98</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">MA200:400.25</span>
                  </div>
                </div>
              </div>

              {/* Chart visualization placeholder */}
              <div className="w-full h-full bg-gray-900 rounded flex items-center justify-center">
                <div className="text-gray-400">
                  <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                  <div className="text-center">Interactive Chart View</div>
                </div>
              </div>
            </div>

            {/* Technical Indicators */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-400">RSI (6,14,24)</span>
                <span className="text-blue-400">RSI 14:82.56</span>
              </div>
              <div className="h-20 bg-gray-900 rounded flex items-center justify-center">
                <div className="text-gray-400 text-sm">
                  RSI Technical Indicator
                </div>
              </div>
            </div>
          </div>

          {/* Right Trading Panel */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-6">
              <button className="px-3 py-2 text-blue-400 border-b-2 border-blue-400 text-sm">
                Trade
              </button>
              <button className="px-3 py-2 text-gray-400 text-sm">Chart</button>
              <button className="px-3 py-2 text-gray-400 text-sm">
                Options
              </button>
              <button className="px-3 py-2 text-gray-400 text-sm">News</button>
              {/* <button className="px-3 py-2 text-gray-400 text-sm">Data</button> */}
            </div>

            {/* Buy/Sell Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button className="bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold">
                Buy
              </button>
              <button className="bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold">
                Sell
              </button>
            </div>

            {/* Order Form */}
            <div className="space-y-4">
              {/* Order Type */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Order Type
                </label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option>Market Price</option>
                  <option>Limit Order</option>
                  <option>Stop Loss</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Quantity <span className="text-blue-400">(Shares)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {/* <span className="text-xs text-gray-400">460.00</span> */}
                  </div>
                </div>

                {/* Quick Quantity Buttons */}
                <div className="flex gap-2 mt-2">
                  {quickQuantities.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded text-sm"
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time in Force */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Time-in-Force
                </label>
                <select
                  value={timeInForce}
                  onChange={(e) => setTimeInForce(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option>Day</option>
                  <option>GTC</option>
                  <option>IOC</option>
                </select>
              </div>

              {/* Stop Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Stop Price</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-cyan-400">Stop Price</span>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-3 py-2 text-white"
                    step="0.01"
                  />
                </div>
                <div className="text-xs text-red-400 mt-1">
                  Est. Loss: 12,067.36
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Buying Power</span>
                  <span>{availableFunds}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transaction Fees</span>
                  <span>$4.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Total</span>
                  <span>$40,000</span>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-3 rounded-lg">
                Buy MSFT
              </button>

              <div className="text-xs text-gray-400 text-center">
                <span className="text-blue-400 cursor-pointer">Disclaimer</span>
              </div>
            </div>

            {/* Time & Sales */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Time & Sales</h3>
                <Menu className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{trade.time}</span>
                    <span>{trade.price}</span>
                    <span className="text-gray-400">{trade.quantity}</span>
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

export default TradingDashboard;
