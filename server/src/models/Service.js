import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    shortDesc: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    image: { url: String, publicId: String },
    order: { type: Number, default: 0 },
    bodyContent: { type: String, default: '' },
    gallery: [{ url: String, publicId: String }],
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);
serviceSchema.index({ order: 1 });

export default mongoose.model('Service', serviceSchema);
