import mongoose from 'mongoose';
const HeatMapSectorSchema = new mongoose.Schema({
  name: String,
  change: Number,
  size: String,
});
const HeatMapSector = mongoose.model('HeatMapSector', HeatMapSectorSchema);
export default HeatMapSector;
