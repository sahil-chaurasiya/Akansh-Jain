import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    image: { url: String, publicId: String },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '', index: true },
    description: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    gallery: [{ url: String, publicId: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
projectSchema.index({ order: 1 });

export default mongoose.model('Project', projectSchema);
