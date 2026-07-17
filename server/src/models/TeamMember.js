import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    photo: { url: String, publicId: String },
    name: { type: String, required: true, trim: true },
    role: { type: String, default: '' },
    bio: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    socialLinks: [{ platform: String, url: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
teamMemberSchema.index({ order: 1 });

export default mongoose.model('TeamMember', teamMemberSchema);
