import mongoose from 'mongoose';

const highlightItemSchema = new mongoose.Schema(
  { icon: String, text: String },
  { _id: false }
);

const reviewPlatformSchema = new mongoose.Schema(
  { name: String, countText: String, icon: String, link: String },
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
    testimonialsHeading: { type: String, default: 'Testimonials - Happy Clients' },
    testimonialsSubheading: { type: String, default: '#1 Choice of Patients for Aesthetics & Plastic Surgery' },
    reviewPlatforms: {
      type: [reviewPlatformSchema],
      default: () => [
        { name: 'Google', countText: '300+ Reviews', icon: 'fa-brands fa-google', link: '#' },
        { name: 'Practo', countText: '30+ Reviews', icon: 'fa-solid fa-notes-medical', link: '#' },
        { name: 'Facebook', countText: '5K+ Followers', icon: 'fa-brands fa-facebook-f', link: '#' },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model('AboutSection', aboutSectionSchema);