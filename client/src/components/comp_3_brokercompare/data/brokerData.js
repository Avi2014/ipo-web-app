// Broker comparison data constants

export const selectedBrokers = [
  {
    id: 1,
    name: "Angel One",
    logo: "/api/placeholder/60/60",
    rating: 4.7,
    reviews: "4.5K reviews",
    color: "green",
  },
  {
    id: 2,
    name: "Zerodha",
    logo: "/api/placeholder/60/60",
    rating: 4.6,
    reviews: "3.2K reviews",
    color: "blue",
  },
];

export const activeClaimsData = [
  { month: "Jan", angelOne: 12, zerodha: 8 },
  { month: "Feb", angelOne: 15, zerodha: 12 },
  { month: "Mar", angelOne: 18, zerodha: 15 },
  { month: "Apr", angelOne: 25, zerodha: 20 },
  { month: "May", angelOne: 35, zerodha: 28 },
  { month: "Jun", angelOne: 45, zerodha: 38 },
  { month: "Jul", angelOne: 55, zerodha: 48 },
];

export const accountCharges = [
  {
    type: "Account Opening",
    angelOne: "₹0",
    zerodha: "₹200",
  },
  {
    type: "Account Maintenance (AMC)",
    angelOne: "₹0",
    zerodha: "₹300/year",
  },
  {
    type: "Demat AMC",
    angelOne: "₹240/year",
    zerodha: "₹300/year",
  },
];

export const brokerageCharges = [
  {
    segment: "Equity Delivery",
    angelOne: "₹0",
    zerodha: "₹0",
    description: "For investment delivery trades",
  },
  {
    segment: "Equity Intraday",
    angelOne: "₹20 per order",
    zerodha: "₹20 per order",
    description: "For same day buy/sell trades",
  },
  {
    segment: "Equity Futures",
    angelOne: "₹20 per order",
    zerodha: "₹20 per order",
    description: "For futures trading",
  },
  {
    segment: "Options",
    angelOne: "₹20 per order",
    zerodha: "₹20 per order",
    description: "For options trading",
  },
];

export const comparisonMetrics = [
  {
    title: "Active Users",
    angelOne: "1.2M",
    zerodha: "1.5M",
    angelOneValue: 1200000,
    zerodhaValue: 1500000,
  },
  {
    title: "Daily Volume",
    angelOne: "₹15,000 Cr",
    zerodha: "₹12,000 Cr",
    angelOneValue: 15000,
    zerodhaValue: 12000,
  },
  {
    title: "Market Share",
    angelOne: "15.2%",
    zerodha: "18.5%",
    angelOneValue: 15.2,
    zerodhaValue: 18.5,
  },
  {
    title: "Customer Support",
    angelOne: "8.5/10",
    zerodha: "7.8/10",
    angelOneValue: 8.5,
    zerodhaValue: 7.8,
  },
];

export const prosAndCons = {
  angelOne: {
    pros: [
      "Zero account opening charges",
      "Advanced trading platform",
      "Research & analysis tools",
      "Multiple order types",
      "Good mobile app experience",
    ],
    cons: [
      "Higher call & trade charges",
      "Limited free research reports",
      "Account closure charges applicable",
      "Higher penalty charges",
    ],
  },
  zerodha: {
    pros: [
      "Industry leader with reliability",
      "Excellent trading platforms",
      "Strong educational content",
      "Good API support",
      "Transparent pricing",
    ],
    cons: [
      "Account opening charges",
      "Higher AMC charges",
      "Limited customer support hours",
      "No advisory services",
    ],
  },
};

export const ratingBreakdown = {
  angelOne: {
    overall: 4.7,
    platform: 4.8,
    charges: 4.6,
    support: 4.5,
    research: 4.7,
  },
  zerodha: {
    overall: 4.6,
    platform: 4.9,
    charges: 4.4,
    support: 4.3,
    research: 4.5,
  },
};
