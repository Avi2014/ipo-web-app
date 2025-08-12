import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
 
import api from "../../services/api";

const MarketOverview = () => {
  const [indices, setIndices] = useState([]);
  const [globalMarkets, setGlobalMarkets] = useState([]);
  const [heatMapSectors, setHeatMapSectors] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [topGainers, setTopGainers] = useState([]);

  useEffect(() => {
    api.get("/api/market/indices").then((res) => setIndices(res.data));
    api.get("/api/market/global").then((res) => setGlobalMarkets(res.data));
    api.get("/api/market/sectors").then((res) => setHeatMapSectors(res.data));
    api.get("/api/market/news").then((res) => setTopNews(res.data));
    api.get("/api/market/gainers").then((res) => setTopGainers(res.data));
  }, []);

  const handleLogout = () => {
    // ...logout logic...
  };

  // Helper functions for heat map colors and sizes
  const getHeatMapColor = (change) => {
    if (change > 0) return "bg-green-600";
    if (change < 0) return "bg-red-600";
    return "bg-gray-600";
  };
  const getHeatMapSize = (size) => {
    if (size > 80) return "col-span-2 row-span-2";
    if (size > 40) return "col-span-2";
    return "";
  };

  return (
    <div>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
          <Link
            to="/trading-dashboard"
            className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <FaChartBar className="w-6 h-6 text-gray-400" />
          </Link>
          <Link to="/market-overview" className="p-2 bg-blue-600 rounded-lg">
            <FaGlobe className="w-6 h-6" />
          </Link>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <FaRegActivity className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <FaRegEye className="w-6 h-6 text-gray-400" />
          </div>
          <Link
            to="/account-settings"
            className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <FaUser className="w-6 h-6 text-gray-400" />
          </Link>
          <div className="mt-auto space-y-4">
            <Link
              to="/account-settings"
              className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <FaCog className="w-6 h-6 text-gray-400" />
            </Link>
            <div
              className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="w-6 h-6 text-gray-400" />
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
                <FaBars className="w-5 h-5 text-gray-400" />
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
                <FaBars className="w-5 h-5 text-gray-400" />
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
                <FaBars className="w-5 h-5 text-gray-400" />
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
                    <FaRegClock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
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
