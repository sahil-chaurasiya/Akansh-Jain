import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema(
  {
    image: { url: String, publicId: String },
    heroImage: { url: String, publicId: String },
    clientAvatarsImage: { url: String, publicId: String },
    headline: { type: String, required: true, trim: true },
    subheading: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    eyebrowText: { type: String, default: 'Best In Town' },
    videoUrl: { type: String, default: 'https://www.youtube.com/watch?v=gyGsPlt06bo' },
    happyClientsCount: { type: String, default: '2,000+' },
    happyClientsLabel: { type: String, default: 'Happy Clients' },
    counter1Value: { type: String, default: '50k+' },
    counter1Label: { type: String, default: 'Clients Review' },
    counter2Value: { type: String, default: '100+' },
    counter2Label: { type: String, default: 'Expert Surgeon' },
    counter3Value: { type: String, default: '20+' },
    counter3Label: { type: String, default: 'Award Winner' },
    order: { type: Number, default: 0 },
    page: { type: String, enum: ['home', 'home2'], default: 'home', index: true },
  },
  { timestamps: true }
);
slideSchema.index({ page: 1, order: 1 });

export default mongoose.model('Slide', slideSchema);