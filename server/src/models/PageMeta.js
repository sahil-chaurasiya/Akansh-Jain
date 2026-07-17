import mongoose from 'mongoose';

const pageMetaSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('PageMeta', pageMetaSchema);
