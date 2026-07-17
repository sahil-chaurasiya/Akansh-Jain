import mongoose from 'mongoose';

const navItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'NavItem', default: null },
  },
  { timestamps: true }
);
navItemSchema.index({ order: 1 });

export default mongoose.model('NavItem', navItemSchema);
