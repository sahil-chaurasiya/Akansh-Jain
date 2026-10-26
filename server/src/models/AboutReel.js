import mongoose from 'mongoose';

// A vertical (9:16) reel shown in the "Reels" strip on the /about page.
// The video file itself lives on Cloudinary; we only store its URL + publicId.
const aboutReelSchema = new mongoose.Schema(
  {
    video: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
    },
    caption: { type: String, default: '', trim: true },
    // Optional. If set, clicking the reel opens this link (e.g. the Instagram reel) in a new tab.
    // If empty, clicking plays the reel in a popup on the site instead.
    linkUrl: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
aboutReelSchema.index({ order: 1 });

export default mongoose.model('AboutReel', aboutReelSchema);