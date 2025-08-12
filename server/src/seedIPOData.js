import mongoose from 'mongoose';
import dotenv from 'dotenv';
import IPO from './models/IPO.js';
import connectDB from './config/database.js';

dotenv.config();
await connectDB();

const userId = 'USER_OBJECT_ID'; // Replace with a valid User ObjectId

const ipoSamples = [
  {
    companyName: "TechNova Solutions",
    symbol: "TNOVA",
    description: "A leading provider of cloud-based enterprise software solutions.",
    sector: "Technology",
    priceRange: { min: 150, max: 160 },
    lotSize: 10,
    totalShares: 5000000,
    sharesForRetail: 2000000,
    openDate: new Date("2025-08-20"),
    closeDate: new Date("2025-08-22"),
    listingDate: new Date("2025-08-28"),
    status: "upcoming",
    leadManager: "Axis Capital",
    registrar: "KFintech",
    exchange: ["NSE", "BSE"],
    documents: {
      drhp: "https://example.com/tnova-drhp.pdf",
      rhp: "https://example.com/tnova-rhp.pdf",
      prospectus: "https://example.com/tnova-prospectus.pdf"
    },
    companyLogo: "https://example.com/tnova-logo.png",
    financials: {
      revenue: 1200000000,
      profit: 250000000,
      marketCap: 8000000000
    },
    riskFactors: ["High competition in tech sector", "Rapid technology changes"],
    objectives: ["Expand R&D", "Increase market share"],
    subscription: { retail: 0, qib: 0, hni: 0, overall: 0 },
    gmp: 45,
    isActive: true,
    createdBy: userId
  },
  {
    companyName: "GreenGen Pharma",
    symbol: "GGEN",
    description: "Innovative pharmaceutical company focused on green chemistry.",
    sector: "Pharmaceuticals",
    priceRange: { min: 90, max: 100 },
    lotSize: 20,
    totalShares: 3000000,
    sharesForRetail: 1000000,
    openDate: new Date("2025-08-25"),
    closeDate: new Date("2025-08-27"),
    listingDate: new Date("2025-09-02"),
    status: "upcoming",
    leadManager: "ICICI Securities",
    registrar: "Link Intime",
    exchange: ["NSE"],
    documents: {
      drhp: "https://example.com/gg-drhp.pdf",
      rhp: "https://example.com/gg-rhp.pdf",
      prospectus: "https://example.com/gg-prospectus.pdf"
    },
    companyLogo: "https://example.com/gg-logo.png",
    financials: {
      revenue: 800000000,
      profit: 120000000,
      marketCap: 4000000000
    },
    riskFactors: ["Regulatory risks", "Dependence on R&D"],
    objectives: ["Build new manufacturing plant", "Expand product portfolio"],
    subscription: { retail: 0, qib: 0, hni: 0, overall: 0 },
    gmp: 30,
    isActive: true,
    createdBy: userId
  }
];

await IPO.deleteMany();
await IPO.insertMany(ipoSamples);

console.log('Sample IPOs seeded!');
process.exit(0);
