import mongoose from 'mongoose';

const highlightItemSchema = new mongoose.Schema(
  { icon: String, text: String },
  { _id: false }
);

const aboutSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    images: [{ url: String, publicId: String }],
    highlights: [highlightItemSchema],
    badgeText: { type: String, default: '' },
    whoWeAreHeading: { type: String, default: '' },
    whoWeAreDescription: { type: String, default: '' },
    missionHeading: { type: String, default: '' },
    missionDescription: { type: String, default: '' },
    visionHeading: { type: String, default: '' },
    visionDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('AboutSection', aboutSectionSchema);