import mongoose from 'mongoose';

// Powers the "Share your Feedback" button shown right below the testimonials on the Home page.
// Kept as its own singleton (same pattern as GallerySection) so the button text and the
// Google review link can be edited from the admin panel. Leave the text empty to hide the button.
const testimonialSectionSchema = new mongoose.Schema(
  {
    buttonText: { type: String, default: 'Share your Feedback' },
    buttonLink: { type: String, default: 'https://g.page/r/CaZIWf_kXlxOEAE/review' },
  },
  { timestamps: true }
);

export default mongoose.model('TestimonialSection', testimonialSectionSchema);