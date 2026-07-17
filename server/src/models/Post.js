import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    coverImage: { url: String, publicId: String },
    author: { type: String, default: '' },
    category: { type: String, default: '', index: true },
    tags: [{ type: String, trim: true }],
    excerpt: { type: String, default: '' },
    body: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);
postSchema.index({ tags: 1 });
postSchema.index({ title: 'text', body: 'text' });

export default mongoose.model('Post', postSchema);
