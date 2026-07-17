import mongoose from 'mongoose';

const howItWorkStepSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '' },
    stepNumber: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
howItWorkStepSchema.index({ order: 1 });

export default mongoose.model('HowItWorkStep', howItWorkStepSchema);
