import mongoose from 'mongoose';

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    billingPeriod: { type: String, default: 'month' },
    features: [{ text: String, included: { type: Boolean, default: true } }],
    isPopular: { type: Boolean, default: false },
    ctaText: { type: String, default: 'Choose Plan' },
    ctaLink: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
pricingPlanSchema.index({ order: 1 });

export default mongoose.model('PricingPlan', pricingPlanSchema);
