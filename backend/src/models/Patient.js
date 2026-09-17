import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  uhid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  gender: { type: String, default: '' },
  address: { type: String, default: '' },
  visitCount: { type: Number, default: 1 },
  lastVisit: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);
