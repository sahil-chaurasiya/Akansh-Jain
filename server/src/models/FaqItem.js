import mongoose from 'mongoose';

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    page: { type: String, default: 'faq', index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
faqItemSchema.index({ page: 1, order: 1 });

export default mongoose.model('FaqItem', faqItemSchema);
