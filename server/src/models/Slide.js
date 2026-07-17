import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema(
  {
    image: { url: String, publicId: String },
    headline: { type: String, required: true, trim: true },
    subheading: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    order: { type: Number, default: 0 },
    page: { type: String, enum: ['home', 'home2'], default: 'home', index: true },
  },
  { timestamps: true }
);
slideSchema.index({ page: 1, order: 1 });

export default mongoose.model('Slide', slideSchema);
