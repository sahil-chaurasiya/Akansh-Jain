import mongoose from 'mongoose';

// Powers the small heading block above the gallery grid on the Home page
// ("GALLERY" eyebrow + "Sculpting Dreams Into Stunning Reality" + the
// "View All Gallery" button). Kept as its own singleton, same pattern as
// HomeAboutSection, so it can be edited independently from the admin panel.
const gallerySectionSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Gallery' },
    heading: { type: String, default: 'Sculpting Dreams Into Stunning Reality' },
    buttonText: { type: String, default: 'View All Gallery' },
    buttonLink: { type: String, default: '/projects' },
  },
  { timestamps: true }
);

export default mongoose.model('GallerySection', gallerySectionSchema);