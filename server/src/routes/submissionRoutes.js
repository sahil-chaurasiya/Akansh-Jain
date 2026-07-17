import express from 'express';
import asyncHandler from 'express-async-handler';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import BookingSubmission from '../models/BookingSubmission.js';
import ContactSubmission from '../models/ContactSubmission.js';
import NewsletterSignup from '../models/NewsletterSignup.js';
import { protect } from '../middleware/auth.js';
import { checkValidation } from '../middleware/errorHandler.js';

const router = express.Router();

// Throttle public form endpoints to reduce spam/abuse (20 requests / 15 min / IP)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions, please try again later.' },
});

const emailRule = body('email').isEmail().withMessage('A valid email is required').normalizeEmail();

// ----- Booking -----
router.post(
  '/booking',
  formLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    emailRule,
    body('message').optional().isLength({ max: 5000 }),
  ],
  checkValidation,
  asyncHandler(async (req, res) => {
    const { name, email, phone, service, date, message } = req.body;
    const submission = await BookingSubmission.create({ name, email, phone, service, date, message });
    res.status(201).json({ success: true, data: submission });
  })
);

router.get(
  '/booking',
  protect,
  asyncHandler(async (req, res) => {
    const items = await BookingSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  })
);

router.patch(
  '/booking/:id',
  protect,
  asyncHandler(async (req, res) => {
    const item = await BookingSubmission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!item) {
      res.status(404);
      throw new Error('Booking submission not found');
    }
    res.json({ success: true, data: item });
  })
);

router.delete(
  '/booking/:id',
  protect,
  asyncHandler(async (req, res) => {
    await BookingSubmission.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  })
);

// ----- Contact -----
router.post(
  '/contact',
  formLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    emailRule,
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
  ],
  checkValidation,
  asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const submission = await ContactSubmission.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: submission });
  })
);

router.get(
  '/contact',
  protect,
  asyncHandler(async (req, res) => {
    const items = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  })
);

router.patch(
  '/contact/:id',
  protect,
  asyncHandler(async (req, res) => {
    const item = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!item) {
      res.status(404);
      throw new Error('Contact submission not found');
    }
    res.json({ success: true, data: item });
  })
);

router.delete(
  '/contact/:id',
  protect,
  asyncHandler(async (req, res) => {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  })
);

// ----- Newsletter -----
router.post(
  '/newsletter',
  formLimiter,
  [emailRule],
  checkValidation,
  asyncHandler(async (req, res) => {
    const existing = await NewsletterSignup.findOne({ email: req.body.email });
    if (existing) {
      return res.status(200).json({ success: true, data: existing, message: 'Already subscribed' });
    }
    const signup = await NewsletterSignup.create({ email: req.body.email });
    res.status(201).json({ success: true, data: signup });
  })
);

router.get(
  '/newsletter',
  protect,
  asyncHandler(async (req, res) => {
    const items = await NewsletterSignup.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  })
);

router.delete(
  '/newsletter/:id',
  protect,
  asyncHandler(async (req, res) => {
    await NewsletterSignup.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  })
);

export default router;
