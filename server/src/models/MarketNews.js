import mongoose from 'mongoose';
const MarketNewsSchema = new mongoose.Schema({
  title: String,
  time: String,
});
const MarketNews = mongoose.model('MarketNews', MarketNewsSchema);
export default MarketNews;
