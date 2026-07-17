import mongoose from 'mongoose';

const bookingSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { url: String, publicId: String },
  },
  { timestamps: true }
);

export default mongoose.model('BookingSection', bookingSectionSchema);
