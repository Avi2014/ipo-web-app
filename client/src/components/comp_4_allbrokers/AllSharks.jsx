import React, { useState } from "react";
import {
  Star,
  Users,
  TrendingUp,
  Award,
  Search,
  Filter,
  ExternalLink,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Briefcase,
  DollarSign,
  Target,
} from "lucide-react";

const AllSharks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [sortBy, setSortBy] = useState("investments");

  // Comprehensive shark investors data
  const sharksData = [
    {
      id: 1,
      name: "Aman Gupta",
      company: "boAt Lifestyle",
      photo: "/api/placeholder/120/120",
      designation: "Co-founder & CMO",
      netWorth: "₹700 Cr",
      totalInvestments: 45,
      avgTicketSize: "₹2-5 Cr",
      successRate: "78%",
      sectors: ["Consumer Electronics", "D2C Brands", "E-commerce"],
      specialization: "Consumer Products",
      experience: "15+ years",
      location: "Delhi, India",
      founded: "boAt (2016)",
      majorInvestments: ["Fire-Boltt", "Shiprocket", "Licious"],
      investmentRange: "₹50L - ₹10 Cr",
      bio: "Marketing genius and consumer brand expert who built boAt into India's leading audio brand.",
      achievements: [
        "Built boAt to ₹2000+ Cr valuation",
        "Shark Tank India Judge",
        "Top 40 Under 40 - Fortune India",
      ],
      contact: {
        email: "aman@boat-lifestyle.com",
        linkedin: "aman-gupta-boat",
        twitter: "@angupta89",
      },
      investmentCriteria: [
        "Consumer-focused startups",
        "Strong brand potential",
        "Scalable business model",
        "Experienced founding team",
      ],
      portfolio: [
        "Fire-Boltt",
        "Shiprocket",
        "Licious",
        "The Whole Truth",
        "Hammer",
      ],
      quotes:
        "I invest in businesses that can create strong emotional connections with consumers.",
    },
    {
      id: 2,
      name: "Anupam Mittal",
      company: "Shaadi.com",
      photo: "/api/placeholder/120/120",
      designation: "Founder & CEO",
      netWorth: "₹185 Cr",
      totalInvestments: 52,
      avgTicketSize: "₹1-3 Cr",
      successRate: "65%",
      sectors: ["EdTech", "FinTech", "Consumer Internet"],
      specialization: "Internet Businesses",
      experience: "20+ years",
      location: "Mumbai, India",
      founded: "Shaadi.com (1997)",
      majorInvestments: ["Ola", "druva", "Little Eye Labs"],
      investmentRange: "₹25L - ₹5 Cr",
      bio: "Pioneer of Indian internet industry and successful angel investor with deep tech insights.",
      achievements: [
        "Built Shaadi.com - India's largest matrimony platform",
        "Early investor in Ola",
        "Shark Tank India Judge",
      ],
      contact: {
        email: "anupam@shaadi.com",
        linkedin: "anupam-mittal",
        twitter: "@AnupamMittal",
      },
      investmentCriteria: [
        "Tech-enabled businesses",
        "Large addressable market",
        "Strong unit economics",
        "Data-driven approach",
      ],
      portfolio: [
        "Ola",
        "druva",
        "Little Eye Labs",
        "Cafe Coffee Day",
        "Sapience Analytics",
      ],
      quotes:
        "I look for startups that can leverage technology to solve real problems at scale.",
    },
    {
      id: 3,
      name: "Vineeta Singh",
      company: "SUGAR Cosmetics",
      photo: "/api/placeholder/120/120",
      designation: "Co-founder & CEO",
      netWorth: "₹300 Cr",
      totalInvestments: 38,
      avgTicketSize: "₹1-4 Cr",
      successRate: "72%",
      sectors: ["Beauty & Personal Care", "D2C", "Women-centric"],
      specialization: "Consumer Brands",
      experience: "12+ years",
      location: "Mumbai, India",
      founded: "SUGAR Cosmetics (2012)",
      majorInvestments: ["Skippi Ice Pops", "Jugaadu Kamlesh", "Beyond Snack"],
      investmentRange: "₹30L - ₹6 Cr",
      bio: "Beauty industry expert and successful entrepreneur who revolutionized Indian cosmetics market.",
      achievements: [
        "Built SUGAR Cosmetics to ₹500+ Cr valuation",
        "IIM Ahmedabad Gold Medalist",
        "Shark Tank India Judge",
      ],
      contact: {
        email: "vineeta@sugarcosmetics.com",
        linkedin: "vineeta-singh-sugar",
        twitter: "@VineetaSingh",
      },
      investmentCriteria: [
        "Women-focused businesses",
        "Strong brand differentiation",
        "Omnichannel strategy",
        "Sustainable growth",
      ],
      portfolio: [
        "Skippi Ice Pops",
        "Jugaadu Kamlesh",
        "Beyond Snack",
        "The Moms Co.",
        "Wakefit",
      ],
      quotes:
        "I invest in brands that can create lasting emotional connections with their customers.",
    },
    {
      id: 4,
      name: "Peyush Bansal",
      company: "Lenskart",
      photo: "/api/placeholder/120/120",
      designation: "Co-founder & CEO",
      netWorth: "₹600 Cr",
      totalInvestments: 41,
      avgTicketSize: "₹2-6 Cr",
      successRate: "69%",
      sectors: ["E-commerce", "HealthTech", "Retail Tech"],
      specialization: "Tech-enabled Retail",
      experience: "14+ years",
      location: "Gurgaon, India",
      founded: "Lenskart (2010)",
      majorInvestments: ["BoAt", "Shiprocket", "BharatPe"],
      investmentRange: "₹50L - ₹8 Cr",
      bio: "Visionary entrepreneur who disrupted the eyewear industry with technology and innovation.",
      achievements: [
        "Built Lenskart to $4.5B valuation",
        "Pioneered O2O model in India",
        "Shark Tank India Judge",
      ],
      contact: {
        email: "peyush@lenskart.com",
        linkedin: "peyush-bansal",
        twitter: "@peyushbansal",
      },
      investmentCriteria: [
        "Tech-enabled businesses",
        "Scalable operations",
        "Strong founding team",
        "Clear path to profitability",
      ],
      portfolio: ["BoAt", "Shiprocket", "BharatPe", "Purplle", "Urban Company"],
      quotes:
        "I believe in backing entrepreneurs who think big and execute with precision.",
    },
    {
      id: 5,
      name: "Namita Thapar",
      company: "Emcure Pharmaceuticals",
      photo: "/api/placeholder/120/120",
      designation: "Executive Director",
      netWorth: "₹600 Cr",
      totalInvestments: 35,
      avgTicketSize: "₹1.5-4 Cr",
      successRate: "74%",
      sectors: ["HealthTech", "Pharmaceuticals", "Wellness"],
      specialization: "Healthcare",
      experience: "20+ years",
      location: "Pune, India",
      founded: "Emcure (Family Business)",
      majorInvestments: ["Skippi Ice Pops", "The Moms Co.", "Namhya Foods"],
      investmentRange: "₹40L - ₹7 Cr",
      bio: "Healthcare industry leader with deep expertise in pharmaceuticals and wellness sector.",
      achievements: [
        "Led Emcure to ₹6000+ Cr revenue",
        "Chartered Accountant and MBA",
        "Shark Tank India Judge",
      ],
      contact: {
        email: "namita@emcure.co.in",
        linkedin: "namita-thapar",
        twitter: "@NamitaThapar",
      },
      investmentCriteria: [
        "Healthcare solutions",
        "Sustainable business model",
        "Social impact potential",
        "Strong regulatory compliance",
      ],
      portfolio: [
        "Skippi Ice Pops",
        "The Moms Co.",
        "Namhya Foods",
        "Zypp Electric",
        "Revamp Moto",
      ],
      quotes:
        "I invest in businesses that can make healthcare more accessible and affordable.",
    },
    {
      id: 6,
      name: "Ashneer Grover",
      company: "BharatPe",
      photo: "/api/placeholder/120/120",
      designation: "Former Co-founder",
      netWorth: "₹300 Cr",
      totalInvestments: 28,
      avgTicketSize: "₹2-5 Cr",
      successRate: "71%",
      sectors: ["FinTech", "Payments", "Lending"],
      specialization: "Financial Services",
      experience: "16+ years",
      location: "Delhi, India",
      founded: "BharatPe (2018)",
      majorInvestments: ["BharatPe", "Grofers", "Lenskart"],
      investmentRange: "₹75L - ₹10 Cr",
      bio: "Former investment banker turned entrepreneur with expertise in financial services and payments.",
      achievements: [
        "Co-built BharatPe to $2.85B valuation",
        "Former MD at Kotak Investment Banking",
        "Shark Tank India Judge (Season 1)",
      ],
      contact: {
        email: "ashneer@example.com",
        linkedin: "ashneer-grover",
        twitter: "@Ashneer_Grover",
      },
      investmentCriteria: [
        "Fintech innovations",
        "Strong unit economics",
        "Experienced team",
        "Large market opportunity",
      ],
      portfolio: ["BharatPe", "Grofers", "Lenskart", "CashKaro", "OYO"],
      quotes:
        "I invest in startups that can disrupt traditional industries with technology.",
    },
  ];

  const sectors = [
    "All",
    "Consumer Electronics",
    "HealthTech",
    "FinTech",
    "E-commerce",
    "D2C Brands",
    "Beauty & Personal Care",
  ];

  const filteredSharks = sharksData.filter((shark) => {
    const matchesSearch =
      shark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shark.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shark.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === "All" ||
      shark.sectors.some((sector) => sector === selectedSector);
    return matchesSearch && matchesSector;
  });

  const sortedSharks = [...filteredSharks].sort((a, b) => {
    switch (sortBy) {
      case "investments":
        return b.totalInvestments - a.totalInvestments;
      case "successRate":
        return parseFloat(b.successRate) - parseFloat(a.successRate);
      case "netWorth":
        return (
          parseInt(b.netWorth.replace(/[^\d]/g, "")) -
          parseInt(a.netWorth.replace(/[^\d]/g, ""))
        );
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shark Investors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with India's most successful shark investors and
            entrepreneurs. Learn from their journey and explore investment
            opportunities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {sharksData.length}
            </div>
            <div className="text-gray-600">Active Sharks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">250+</div>
            <div className="text-gray-600">Total Investments</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ₹2000Cr+
            </div>
            <div className="text-gray-600">Total Investment</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">71%</div>
            <div className="text-gray-600">Avg Success Rate</div>
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
                placeholder="Search sharks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sector Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
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
                <option value="investments">Sort by Investments</option>
                <option value="successRate">Sort by Success Rate</option>
                <option value="netWorth">Sort by Net Worth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sharks Grid */}
        <div className="space-y-8">
          {sortedSharks.map((shark) => (
            <div
              key={shark.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                      <img
                        src={shark.photo}
                        alt={shark.name}
                        className="w-28 h-28 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {shark.name}
                      </h3>
                      <p className="text-xl text-blue-600 font-semibold">
                        {shark.designation}
                      </p>
                      <p className="text-lg text-gray-600">{shark.company}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                          {shark.specialization}
                        </span>
                        <span className="text-sm text-gray-500">
                          {shark.experience} Experience
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {shark.netWorth}
                        </div>
                        <div className="text-sm text-gray-500">Net Worth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {shark.totalInvestments}
                        </div>
                        <div className="text-sm text-gray-500">Investments</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {shark.successRate}
                        </div>
                        <div className="text-sm text-gray-500">
                          Success Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {shark.avgTicketSize}
                        </div>
                        <div className="text-sm text-gray-500">Avg Ticket</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {shark.bio}
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-blue-800 italic">"{shark.quotes}"</p>
                </div>

                {/* Sectors */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Investment Sectors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {shark.sectors.map((sector, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Investment Criteria */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Investment Criteria
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {shark.investmentCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center">
                        <Target className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {criteria}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Investments */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Major Investments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {shark.majorInvestments.map((investment, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {investment}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {shark.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact and Investment Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-6 border-t border-gray-200">
                  <div className="space-y-2 mb-4 lg:mb-0">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Investment Range: {shark.investmentRange}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {shark.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {shark.contact.linkedin && (
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {shark.contact.twitter && (
                        <a
                          href="#"
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {shark.contact.email && (
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      View Portfolio
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      Connect
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Pitch Your Startup?
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Connect with shark investors who can provide not just funding, but
            also mentorship and network access to scale your business.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Submit Your Pitch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSharks;
