import mongoose from 'mongoose';
const TopGainerSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  change: Number,
});
const TopGainer = mongoose.model('TopGainer', TopGainerSchema);
export default TopGainer;
