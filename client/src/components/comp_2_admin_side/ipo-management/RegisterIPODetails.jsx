import React, { useState } from "react";
import {
  Building,
  DollarSign,
  Calendar,
  FileText,
  Upload,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Users,
  TrendingUp,
} from "lucide-react";

const RegisterIPODetails = ({ onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "",
    symbol: "",
    sector: "",
    industry: "",
    companyDescription: "",
    website: "",

    // IPO Details
    priceRangeMin: "",
    priceRangeMax: "",
    issueSize: "",
    shareType: "equity",
    lotSize: "",
    minimumInvestment: "",

    // Dates
    openDate: "",
    closeDate: "",
    listingDate: "",

    // Financial Details
    faceValue: "",
    bookValue: "",
    marketLot: "",
    issueType: "book_building",

    // Intermediaries
    leadManager: "",
    registrar: "",
    underwriter: "",

    // Documents
    prospectus: null,
    financialStatements: null,
    draftProspectus: null,

    // Additional Info
    objectives: "",
    riskFactors: "",
    keyMetrics: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Company Details
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required";
        if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required";
        if (!formData.sector.trim()) newErrors.sector = "Sector is required";
        if (!formData.industry.trim())
          newErrors.industry = "Industry is required";
        if (!formData.companyDescription.trim())
          newErrors.companyDescription = "Description is required";
        break;

      case 2: // IPO Details
        if (!formData.priceRangeMin)
          newErrors.priceRangeMin = "Minimum price is required";
        if (!formData.priceRangeMax)
          newErrors.priceRangeMax = "Maximum price is required";
        if (!formData.issueSize) newErrors.issueSize = "Issue size is required";
        if (!formData.lotSize) newErrors.lotSize = "Lot size is required";
        if (
          parseFloat(formData.priceRangeMin) >=
          parseFloat(formData.priceRangeMax)
        ) {
          newErrors.priceRangeMax =
            "Maximum price must be greater than minimum price";
        }
        break;

      case 3: // Dates
        if (!formData.openDate) newErrors.openDate = "Open date is required";
        if (!formData.closeDate) newErrors.closeDate = "Close date is required";
        if (!formData.listingDate)
          newErrors.listingDate = "Listing date is required";
        if (new Date(formData.openDate) >= new Date(formData.closeDate)) {
          newErrors.closeDate = "Close date must be after open date";
        }
        break;

      case 4: // Financial Details
        if (!formData.faceValue) newErrors.faceValue = "Face value is required";
        if (!formData.leadManager.trim())
          newErrors.leadManager = "Lead manager is required";
        if (!formData.registrar.trim())
          newErrors.registrar = "Registrar is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Calculate minimum investment
      const minInvestment =
        parseFloat(formData.priceRangeMax) * parseInt(formData.lotSize);

      const ipoData = {
        ...formData,
        minimumInvestment: minInvestment,
        status: "draft",
        createdAt: new Date().toISOString(),
        applications: 0,
        subscriptionRatio: "-",
      };

      onSave && onSave(ipoData);
      onClose && onClose();
    } catch (error) {
      console.error("Error saving IPO:", error);
      setErrors({ submit: "Failed to save IPO details. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symbol *
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) =>
                    handleInputChange("symbol", e.target.value.toUpperCase())
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.symbol ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="SYMBOL"
                  maxLength={10}
                />
                {errors.symbol && (
                  <p className="text-red-500 text-sm mt-1">{errors.symbol}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => handleInputChange("sector", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.sector ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select sector</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Energy">Energy</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail">Retail</option>
                  <option value="Telecommunications">Telecommunications</option>
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.industry ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter industry"
                />
                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description *
              </label>
              <textarea
                value={formData.companyDescription}
                onChange={(e) =>
                  handleInputChange("companyDescription", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyDescription
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Brief description of the company and its business"
              />
              {errors.companyDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyDescription}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.company.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (Min) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.priceRangeMin}
                    onChange={(e) =>
                      handleInputChange("priceRangeMin", e.target.value)
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.priceRangeMin
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                </div>
                {errors.priceRangeMin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priceRangeMin}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (Max) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.priceRangeMax}
                    onChange={(e) =>
                      handleInputChange("priceRangeMax", e.target.value)
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.priceRangeMax
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                </div>
                {errors.priceRangeMax && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priceRangeMax}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Size (₹ Cr) *
                </label>
                <input
                  type="number"
                  value={formData.issueSize}
                  onChange={(e) =>
                    handleInputChange("issueSize", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.issueSize ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="2500"
                />
                {errors.issueSize && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.issueSize}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lot Size (Shares) *
                </label>
                <input
                  type="number"
                  value={formData.lotSize}
                  onChange={(e) => handleInputChange("lotSize", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.lotSize ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="100"
                />
                {errors.lotSize && (
                  <p className="text-red-500 text-sm mt-1">{errors.lotSize}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Type
                </label>
                <select
                  value={formData.shareType}
                  onChange={(e) =>
                    handleInputChange("shareType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="equity">Equity</option>
                  <option value="preference">Preference</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) =>
                    handleInputChange("issueType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="book_building">Book Building</option>
                  <option value="fixed_price">Fixed Price</option>
                </select>
              </div>
            </div>

            {formData.priceRangeMax && formData.lotSize && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Calculated Values
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Minimum Investment:</span>
                    <span className="font-medium text-blue-900 ml-2">
                      ₹
                      {(
                        parseFloat(formData.priceRangeMax) *
                        parseInt(formData.lotSize)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Price Range:</span>
                    <span className="font-medium text-blue-900 ml-2">
                      ₹{formData.priceRangeMin} - ₹{formData.priceRangeMax}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Open Date *
                </label>
                <input
                  type="date"
                  value={formData.openDate}
                  onChange={(e) =>
                    handleInputChange("openDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.openDate ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.openDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.openDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Close Date *
                </label>
                <input
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) =>
                    handleInputChange("closeDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.closeDate ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.closeDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.closeDate}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Date *
              </label>
              <input
                type="date"
                value={formData.listingDate}
                onChange={(e) =>
                  handleInputChange("listingDate", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.listingDate ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.listingDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.listingDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Face Value (₹)
              </label>
              <input
                type="number"
                value={formData.faceValue}
                onChange={(e) => handleInputChange("faceValue", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Value (₹)
              </label>
              <input
                type="number"
                value={formData.bookValue}
                onChange={(e) => handleInputChange("bookValue", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="250"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lead Manager *
                </label>
                <input
                  type="text"
                  value={formData.leadManager}
                  onChange={(e) =>
                    handleInputChange("leadManager", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.leadManager ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="ICICI Securities"
                />
                {errors.leadManager && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.leadManager}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registrar *
                </label>
                <input
                  type="text"
                  value={formData.registrar}
                  onChange={(e) =>
                    handleInputChange("registrar", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.registrar ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Link Intime"
                />
                {errors.registrar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrar}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Underwriter
              </label>
              <input
                type="text"
                value={formData.underwriter}
                onChange={(e) =>
                  handleInputChange("underwriter", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Underwriter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Objectives
              </label>
              <textarea
                value={formData.objectives}
                onChange={(e) =>
                  handleInputChange("objectives", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the objectives of the IPO..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Factors
              </label>
              <textarea
                value={formData.riskFactors}
                onChange={(e) =>
                  handleInputChange("riskFactors", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List key risk factors..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-800 mb-4">
                Review IPO Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Company Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      {formData.companyName}
                    </p>
                    <p>
                      <span className="text-gray-600">Symbol:</span>{" "}
                      {formData.symbol}
                    </p>
                    <p>
                      <span className="text-gray-600">Sector:</span>{" "}
                      {formData.sector}
                    </p>
                    <p>
                      <span className="text-gray-600">Industry:</span>{" "}
                      {formData.industry}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    IPO Details
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Price Range:</span> ₹
                      {formData.priceRangeMin} - ₹{formData.priceRangeMax}
                    </p>
                    <p>
                      <span className="text-gray-600">Issue Size:</span> ₹
                      {formData.issueSize} Cr
                    </p>
                    <p>
                      <span className="text-gray-600">Lot Size:</span>{" "}
                      {formData.lotSize} shares
                    </p>
                    <p>
                      <span className="text-gray-600">Min Investment:</span> ₹
                      {(
                        parseFloat(formData.priceRangeMax) *
                        parseInt(formData.lotSize)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Important Dates
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Open Date:</span>{" "}
                      {formData.openDate}
                    </p>
                    <p>
                      <span className="text-gray-600">Close Date:</span>{" "}
                      {formData.closeDate}
                    </p>
                    <p>
                      <span className="text-gray-600">Listing Date:</span>{" "}
                      {formData.listingDate}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Intermediaries
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Lead Manager:</span>{" "}
                      {formData.leadManager}
                    </p>
                    <p>
                      <span className="text-gray-600">Registrar:</span>{" "}
                      {formData.registrar}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="text-red-400 mr-2" size={20} />
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="text-yellow-400 mr-2" size={20} />
                <p className="text-yellow-800">
                  Please review all details carefully before submitting. Once
                  submitted, some details may not be editable.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: "Company Details", icon: Building },
    { number: 2, title: "IPO Details", icon: DollarSign },
    { number: 3, title: "Dates & Financials", icon: Calendar },
    { number: 4, title: "Intermediaries", icon: Users },
    { number: 5, title: "Review", icon: CheckCircle },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Register New IPO
              </h2>
              <p className="text-gray-600">Step {currentStep} of 5</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep > step.number
                      ? "bg-green-500 text-white"
                      : currentStep === step.number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">{renderStepContent()}</div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep === 5 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={20} />
                    Submit IPO
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterIPODetails;
