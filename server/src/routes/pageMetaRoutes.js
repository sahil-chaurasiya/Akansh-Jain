import express from 'express';
import asyncHandler from 'express-async-handler';
import PageMeta from '../models/PageMeta.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/page-meta -> all pages' meta
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await PageMeta.find().sort({ pageKey: 1 });
    res.json({ success: true, data: items });
  })
);

// GET /api/page-meta/:pageKey
router.get(
  '/:pageKey',
  asyncHandler(async (req, res) => {
    const item = await PageMeta.findOne({ pageKey: req.params.pageKey });
    if (!item) {
      return res.json({ success: true, data: { pageKey: req.params.pageKey, title: '', metaDescription: '' } });
    }
    res.json({ success: true, data: item });
  })
);

// PUT /api/page-meta/:pageKey -> upsert
router.put(
  '/:pageKey',
  protect,
  asyncHandler(async (req, res) => {
    const item = await PageMeta.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $set: { title: req.body.title, metaDescription: req.body.metaDescription } },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: item });
  })
);

export default router;
