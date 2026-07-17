import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

export default mongoose.model('ContactSubmission', contactSubmissionSchema);
