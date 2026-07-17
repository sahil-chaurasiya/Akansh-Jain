import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  { platform: String, url: String, icon: String },
  { _id: false }
);
const footerColumnSchema = new mongoose.Schema(
  {
    heading: String,
    links: [{ label: String, url: String }],
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    logo: { url: String, publicId: String },
    logoAlt: { url: String, publicId: String },
    topContactPhone: { type: String, default: '' },
    topContactEmail: { type: String, default: '' },
    topContactAddress: { type: String, default: '' },
    headerCtaText: { type: String, default: '' },
    headerCtaLink: { type: String, default: '' },
    footerColumns: [footerColumnSchema],
    socialLinks: [socialLinkSchema],
    copyrightText: { type: String, default: '' },
    tickerItems: [{ text: String, order: Number }],
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
