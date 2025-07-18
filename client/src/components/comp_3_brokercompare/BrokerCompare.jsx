import React from "react";
import {
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  DollarSign,
  BarChart3,
  LineChart,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import {
  selectedBrokers,
  activeClaimsData,
  accountCharges,
  brokerageCharges,
  comparisonMetrics,
  prosAndCons,
  ratingBreakdown,
} from "./data/brokerData";

const BrokerCompare = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Broker Comparison
          </h1>
          <p className="text-gray-600">
            Compare top brokers to find the best fit for your trading needs
          </p>
        </div>

        {/* Broker Selection Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedBrokers.map((broker) => (
              <div key={broker.id} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {broker.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-lg font-semibold">
                        {broker.rating}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">
                        {broker.reviews}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Claims Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Active Claims
          </h3>
          <div className="h-64 flex items-end space-x-4">
            {activeClaimsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative h-48">
                  <div
                    className="absolute bottom-0 w-1/2 bg-green-500 rounded-t"
                    style={{
                      height: `${(data.angelOne / 60) * 100}%`,
                      left: "0%",
                    }}
                  ></div>
                  <div
                    className="absolute bottom-0 w-1/2 bg-blue-500 rounded-t"
                    style={{
                      height: `${(data.zerodha / 60) * 100}%`,
                      right: "0%",
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">Angel One</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Zerodha</span>
            </div>
          </div>
        </div>

        {/* Account Opening and Maintenance Charges */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Account Opening and Maintenance Charges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">
                    Charge Type
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-green-600">
                    Angel One
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600">
                    Zerodha
                  </th>
                </tr>
              </thead>
              <tbody>
                {accountCharges.map((charge, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{charge.type}</td>
                    <td className="py-3 px-4 text-center font-medium">
                      {charge.angelOne}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">
                      {charge.zerodha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brokerage Charges */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Brokerage Charges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left py-3 px-4 font-semibold">Segment</th>
                  <th className="text-center py-3 px-4 font-semibold">
                    Angel One
                  </th>
                  <th className="text-center py-3 px-4 font-semibold">
                    Zerodha
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {brokerageCharges.map((charge, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{charge.segment}</td>
                    <td className="py-3 px-4 text-center">{charge.angelOne}</td>
                    <td className="py-3 px-4 text-center">{charge.zerodha}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {charge.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {comparisonMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="text-sm font-medium text-gray-600 mb-4">
                {metric.title}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm">Angel One</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {metric.angelOne}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm">Zerodha</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {metric.zerodha}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complaints Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Complaints</h3>
          <div className="h-64 flex items-end justify-center">
            <div className="flex items-end space-x-8">
              {/* Angel One line */}
              <div className="relative">
                <div className="h-32 w-2 bg-gradient-to-t from-green-300 to-green-600 rounded"></div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">
                  Angel One
                </span>
              </div>
              {/* Zerodha line */}
              <div className="relative">
                <div className="h-40 w-2 bg-gradient-to-t from-blue-300 to-blue-600 rounded"></div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">
                  Zerodha
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Holding Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {selectedBrokers.map((broker, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {broker.name} - Share Holding
              </h3>
              <div className="space-y-4">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                  <div key={month} className="flex items-center">
                    <span className="w-8 text-sm text-gray-600">{month}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-6 bg-gray-200 rounded">
                        <div
                          className={`h-full rounded ${
                            broker.color === "green"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.random() * 80 + 20}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {(Math.random() * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {selectedBrokers.map((broker, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {broker.name} - Pros & Cons
              </h3>

              {/* Pros */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  {prosAndCons[
                    broker.id === 1 ? "angelOne" : "zerodha"
                  ].pros.map((pro, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  {prosAndCons[
                    broker.id === 1 ? "angelOne" : "zerodha"
                  ].cons.map((con, i) => (
                    <li key={i} className="flex items-start">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Ratings Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {selectedBrokers.map((broker, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {broker.name} - Ratings
              </h3>
              <div className="space-y-4">
                {Object.entries(
                  ratingBreakdown[broker.id === 1 ? "angelOne" : "zerodha"]
                ).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= value
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Financials Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Financials</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
              <div key={quarter} className="text-center">
                <div className="h-32 flex items-end justify-center space-x-2 mb-2">
                  <div
                    className="w-8 bg-green-500 rounded-t"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                  <div
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{quarter}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedBrokers.map((broker, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {broker.name}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">
                    {broker.rating}
                  </span>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold ${
                    broker.color === "green"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } transition-colors`}
                >
                  Open Account
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Free account opening
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerCompare;
