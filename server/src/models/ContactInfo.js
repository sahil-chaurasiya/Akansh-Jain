import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
    officeHours: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('ContactInfo', contactInfoSchema);
