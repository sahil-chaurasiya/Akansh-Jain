import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  { label: String, value: String, icon: String },
  { _id: false }
);

const aboutSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    images: [{ url: String, publicId: String }],
    stats: [statSchema],
  },
  { timestamps: true }
);

export default mongoose.model('AboutSection', aboutSectionSchema);
