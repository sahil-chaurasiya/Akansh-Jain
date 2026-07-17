import mongoose from 'mongoose';

const newsletterSignupSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('NewsletterSignup', newsletterSignupSchema);
