import mongoose from 'mongoose';

const brandLogoSchema = new mongoose.Schema(
  {
    image: { url: String, publicId: String },
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
brandLogoSchema.index({ order: 1 });

export default mongoose.model('BrandLogo', brandLogoSchema);
