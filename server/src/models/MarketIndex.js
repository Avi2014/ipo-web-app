import mongoose from 'mongoose';
const MarketIndexSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  change: Number,
  changePercent: Number,
  color: String,
});
const MarketIndex = mongoose.model('MarketIndex', MarketIndexSchema);
export default MarketIndex;
