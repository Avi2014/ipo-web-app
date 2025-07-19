import React, { useState } from "react";
import {
  Star,
  Users,
  TrendingUp,
  Shield,
  Award,
  Search,
  Filter,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  MapPin,
} from "lucide-react";

const AllBrokers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // Comprehensive broker data
  const brokersData = [
    {
      id: 1,
      name: "Angel One",
      logo: "/api/placeholder/80/80",
      rating: 4.7,
      reviews: 4500,
      category: "Full Service",
      establishedYear: 1996,
      customers: "1.2M+",
      brokerage: "₹0 for Delivery",
      accountOpening: "₹0",
      highlights: [
        "Zero Delivery Charges",
        "Advanced Trading Platform",
        "Research Reports",
      ],
      services: ["Equity", "Derivatives", "Mutual Funds", "IPO", "Currency"],
      contact: {
        phone: "1800-123-4567",
        email: "support@angelone.in",
        website: "angelone.in",
      },
      address: "Mumbai, Maharashtra",
      pros: ["No delivery charges", "Good research", "Mobile app"],
      cons: ["Higher F&O charges", "Limited international markets"],
      specialFeatures: [
        "AI-powered recommendations",
        "SmartAPI",
        "Angel Bee mobile app",
      ],
    },
    {
      id: 2,
      name: "Zerodha",
      logo: "/api/placeholder/80/80",
      rating: 4.6,
      reviews: 3200,
      category: "Discount",
      establishedYear: 2010,
      customers: "1.5M+",
      brokerage: "₹20 per order",
      accountOpening: "₹200",
      highlights: [
        "Industry Leader",
        "Transparent Pricing",
        "Educational Content",
      ],
      services: ["Equity", "Derivatives", "Mutual Funds", "IPO", "Bonds"],
      contact: {
        phone: "1800-200-5555",
        email: "support@zerodha.com",
        website: "zerodha.com",
      },
      address: "Bangalore, Karnataka",
      pros: ["Transparent charges", "Good platform", "Educational resources"],
      cons: ["Account opening fee", "No advisory services"],
      specialFeatures: [
        "Kite trading platform",
        "Coin for mutual funds",
        "Varsity education",
      ],
    },
    {
      id: 3,
      name: "Upstox",
      logo: "/api/placeholder/80/80",
      rating: 4.4,
      reviews: 2800,
      category: "Discount",
      establishedYear: 2012,
      customers: "800K+",
      brokerage: "₹20 per order",
      accountOpening: "₹0",
      highlights: ["Fast Execution", "Low Brokerage", "Modern Interface"],
      services: ["Equity", "Derivatives", "Mutual Funds", "IPO"],
      contact: {
        phone: "1800-200-4050",
        email: "support@upstox.com",
        website: "upstox.com",
      },
      address: "Mumbai, Maharashtra",
      pros: ["Free account opening", "Good mobile app", "Quick execution"],
      cons: ["Limited research", "Customer service issues"],
      specialFeatures: [
        "Pro web platform",
        "Upstox Pro mobile app",
        "Options strategy builder",
      ],
    },
    {
      id: 4,
      name: "Groww",
      logo: "/api/placeholder/80/80",
      rating: 4.3,
      reviews: 2100,
      category: "Discount",
      establishedYear: 2016,
      customers: "500K+",
      brokerage: "₹20 per order",
      accountOpening: "₹0",
      highlights: [
        "Beginner Friendly",
        "Simple Interface",
        "Educational Content",
      ],
      services: ["Equity", "Mutual Funds", "IPO", "Gold", "Fixed Deposits"],
      contact: {
        phone: "1800-120-0700",
        email: "help@groww.in",
        website: "groww.in",
      },
      address: "Bangalore, Karnataka",
      pros: ["User-friendly", "Good for beginners", "Simple interface"],
      cons: ["Limited advanced features", "New in market"],
      specialFeatures: [
        "Mutual fund investing",
        "IPO applications",
        "Gold investment",
      ],
    },
    {
      id: 5,
      name: "5paisa",
      logo: "/api/placeholder/80/80",
      rating: 4.2,
      reviews: 1900,
      category: "Discount",
      establishedYear: 2016,
      customers: "400K+",
      brokerage: "₹10 per order",
      accountOpening: "₹0",
      highlights: [
        "Ultra Low Brokerage",
        "Multiple Segments",
        "Research Reports",
      ],
      services: ["Equity", "Derivatives", "Mutual Funds", "IPO", "Insurance"],
      contact: {
        phone: "1800-120-5555",
        email: "support@5paisa.com",
        website: "5paisa.com",
      },
      address: "Mumbai, Maharashtra",
      pros: ["Very low brokerage", "Multiple products", "Good research"],
      cons: ["Platform issues", "Limited customer support"],
      specialFeatures: [
        "₹10 flat brokerage",
        "Insurance products",
        "Margin funding",
      ],
    },
    {
      id: 6,
      name: "HDFC Securities",
      logo: "/api/placeholder/80/80",
      rating: 4.5,
      reviews: 3500,
      category: "Full Service",
      establishedYear: 2000,
      customers: "900K+",
      brokerage: "0.5% of turnover",
      accountOpening: "₹999",
      highlights: ["Trusted Brand", "Research Reports", "Advisory Services"],
      services: [
        "Equity",
        "Derivatives",
        "Mutual Funds",
        "IPO",
        "Bonds",
        "Insurance",
      ],
      contact: {
        phone: "1800-120-2000",
        email: "support@hdfcsec.com",
        website: "hdfcsec.com",
      },
      address: "Mumbai, Maharashtra",
      pros: ["Trusted brand", "Good research", "Multiple products"],
      cons: ["Higher charges", "Complex pricing"],
      specialFeatures: [
        "Banking integration",
        "Advisory services",
        "Premium research",
      ],
    },
  ];

  const categories = ["All", "Full Service", "Discount"];

  const filteredBrokers = brokersData.filter((broker) => {
    const matchesSearch =
      broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || broker.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBrokers = [...filteredBrokers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "customers":
        return (
          parseInt(b.customers.replace(/[^\d]/g, "")) -
          parseInt(a.customers.replace(/[^\d]/g, ""))
        );
      case "established":
        return a.establishedYear - b.establishedYear;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Brokers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare and choose from India's top stock brokers. Find the perfect
            broker that matches your trading style and investment goals.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {brokersData.length}+
            </div>
            <div className="text-gray-600">Verified Brokers</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">5M+</div>
            <div className="text-gray-600">Active Traders</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹0</div>
            <div className="text-gray-600">Minimum Investment</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Market Access</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search brokers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <TrendingUp className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="customers">Sort by Customers</option>
                <option value="established">Sort by Established</option>
              </select>
            </div>
          </div>
        </div>

        {/* Brokers Grid */}
        <div className="space-y-6">
          {sortedBrokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                      <img
                        src={broker.logo}
                        alt={broker.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {broker.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(broker.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {broker.rating} ({broker.reviews.toLocaleString()}{" "}
                          reviews)
                        </span>
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                        {broker.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 lg:text-right">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Customers</div>
                        <div className="font-semibold text-gray-900">
                          {broker.customers}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Since</div>
                        <div className="font-semibold text-gray-900">
                          {broker.establishedYear}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Brokerage</div>
                        <div className="font-semibold text-gray-900">
                          {broker.brokerage}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {broker.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Services Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {broker.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 text-green-600 mr-2" />
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {broker.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-red-600 mr-2" />
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {broker.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact and Action */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      {broker.contact.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-1" />
                      {broker.contact.website}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {broker.address}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Compare
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Compare brokers, read reviews, and choose the perfect trading
            partner for your investment journey.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Comparing Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBrokers;
