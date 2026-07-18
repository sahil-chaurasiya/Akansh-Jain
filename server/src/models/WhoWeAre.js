import mongoose from 'mongoose';

const featureItemSchema = new mongoose.Schema(
  { icon: String, title: String, description: String, order: Number },
  { _id: true }
);

const whoWeAreSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { url: String, publicId: String },
    imageSecondary: { url: String, publicId: String },
    features: [featureItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model('WhoWeAre', whoWeAreSchema);