import mongoose from 'mongoose';
const GlobalMarketSchema = new mongoose.Schema({
  name: String,
  value: String,
  position: {
    top: String,
    left: String,
  },
  color: String,
});
const GlobalMarket = mongoose.model('GlobalMarket', GlobalMarketSchema);
export default GlobalMarket;
