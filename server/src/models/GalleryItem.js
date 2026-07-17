import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    image: { url: String, publicId: String },
    beforeImage: { url: String, publicId: String },
    afterImage: { url: String, publicId: String },
    category: { type: String, default: '', index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
galleryItemSchema.index({ order: 1 });

export default mongoose.model('GalleryItem', galleryItemSchema);
