import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MarketIndex from './models/MarketIndex.js';
import GlobalMarket from './models/GlobalMarket.js';
import HeatMapSector from './models/HeatMapSector.js';
import MarketNews from './models/MarketNews.js';
import TopGainer from './models/TopGainer.js';
import connectDB from './config/database.js';

dotenv.config();
await connectDB();

// Indices
await MarketIndex.deleteMany();
await MarketIndex.insertMany([
  { name: 'S&P 500 ETF', symbol: 'SPY', price: 509.9, change: -3.05, changePercent: -0.4, color: 'text-red-400' },
  { name: 'Dow Jones ETF', symbol: 'DIA', price: 30000, change: -3.05, changePercent: 0.56, color: 'text-green-400' },
  { name: 'NASDAQ', symbol: 'QQQ', price: 452.9, change: -3.05, changePercent: -0.95, color: 'text-red-400' },
]);

// Global Markets
await GlobalMarket.deleteMany();
await GlobalMarket.insertMany([
  { name: 'NIKKEI', value: '+0.75%', position: { top: '35%', left: '85%' }, color: 'bg-green-500' },
  { name: 'ASX 200', value: '-0.25%', position: { top: '65%', left: '85%' }, color: 'bg-red-500' },
  { name: 'FTSE', value: '+0.45%', position: { top: '25%', left: '50%' }, color: 'bg-green-500' },
  { name: 'DAX', value: '-0.15%', position: { top: '30%', left: '52%' }, color: 'bg-red-500' },
  { name: 'CAC', value: '+0.85%', position: { top: '32%', left: '48%' }, color: 'bg-green-500' },
  { name: 'HANG SENG', value: '-1.05%', position: { top: '40%', left: '80%' }, color: 'bg-red-500' },
]);

// Heat Map Sectors
await HeatMapSector.deleteMany();
await HeatMapSector.insertMany([
  { name: 'Information Technology', change: 2.5, size: 'large' },
  { name: 'Financials', change: -1.2, size: 'large' },
  { name: 'Healthcare', change: 0.8, size: 'medium' },
  { name: 'Consumer Discretionary', change: 1.5, size: 'medium' },
  { name: 'Communication Services', change: -0.5, size: 'medium' },
  { name: 'Industrials', change: 0.3, size: 'small' },
  { name: 'Consumer Staples', change: -0.8, size: 'small' },
  { name: 'Energy', change: 2.1, size: 'small' },
  { name: 'Utilities', change: -0.3, size: 'small' },
  { name: 'Real Estate', change: 0.6, size: 'small' },
  { name: 'Materials', change: 1.2, size: 'small' },
]);

// News
await MarketNews.deleteMany();
await MarketNews.insertMany([
  { title: "Retail Sales Slump Takes Toll on Mar...", time: "10 min ago" },
  { title: "Tech Giant's Earnings Soar, Stock Hits...", time: "2 min ago" },
  { title: "High-Profile IPO Falls Short of Expect...", time: "12 hrs ago" },
  { title: "Electric Vehicle Stocks Skyrocket as...", time: "22 hrs ago" },
  { title: "Market Sentiment Turns Bearish, Stock...", time: "2 hrs ago" },
  { title: "Chip Shortage Woes Continue, Tech...", time: "3 days ago" },
]);

// Top Gainers
await TopGainer.deleteMany();
await TopGainer.insertMany([
  { symbol: 'AAPL', name: 'Apple', price: 125, change: 6.36 },
  { symbol: 'JPM', name: 'JPM Chase', price: 121, change: 21.75 },
  { symbol: 'UBER', name: 'Uber', price: 80, change: 3.84 },
  { symbol: 'NVDA', name: 'Nvidia', price: 435, change: 5.85 },
  { symbol: 'GOOG', name: 'Alphabet', price: 234, change: 6.45 },
  { symbol: 'MSFT', name: 'Microsoft', price: 436, change: 9.54 },
  { symbol: 'TGT', name: 'Target', price: 89, change: 11.85 },
  { symbol: 'NFLX', name: 'Netflix', price: 123, change: 4.9 },
  { symbol: 'AMZN', name: 'Amazon', price: 467, change: 5.98 },
  { symbol: 'META', name: 'Meta Apps', price: 123, change: 18.94 },
]);

console.log('Market data seeded!');
process.exit(0);
