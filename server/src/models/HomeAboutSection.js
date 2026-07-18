import mongoose from 'mongoose';

// A single labeled button (used for the two pill CTAs on the home about box,
// e.g. "Transfer Surgery" / "Support 24/7"). Icon is the theme's own
// illustrated image for that button, not admin-editable (matches original design).
const buttonSchema = new mongoose.Schema(
  { text: String, link: String },
  { _id: false }
);

// One line-item in the short checklist under the description
// (e.g. "Shaping Confidence Through Expert Surgery").
const featurePointSchema = new mongoose.Schema(
  { text: String },
  { _id: false }
);

// Powers ONLY the "About Us" box on the Home page. Intentionally separate from
// AboutSection (which powers the /about page hero) so the two can be edited,
// and can look, completely independently from the admin panel.
const homeAboutSectionSchema = new mongoose.Schema(
  {
    subheading: { type: String, default: 'About Us' },
    heading: { type: String, default: 'Transform Your Look With Precision' },
    description: {
      type: String,
      default:
        'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, or reshaping the body for both medical and aesthetic purposes. It helps people improve their appearance.',
    },
    primaryImage: { url: String, publicId: String },
    secondaryImage: { url: String, publicId: String },
    badgeText: { type: String, default: 'Best Awarded Company' },
    primaryButton: {
      type: buttonSchema,
      default: () => ({ text: 'Transfer Surgery', link: '/services' }),
    },
    secondaryButton: {
      type: buttonSchema,
      default: () => ({ text: 'Support 24/7', link: '/contact' }),
    },
    featurePoints: {
      type: [featurePointSchema],
      default: () => [
        { text: 'Shaping Confidence Through Expert Surgery' },
        { text: 'Discover Beauty Beyond Your Imagination' },
      ],
    },
    ctaText: { type: String, default: 'Read More' },
    ctaLink: { type: String, default: '/about' },
    ratingValue: { type: String, default: '4.9' },
    ratingText: { type: String, default: '100+ 5star' },
  },
  { timestamps: true }
);

export default mongoose.model('HomeAboutSection', homeAboutSectionSchema);