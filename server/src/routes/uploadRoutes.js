import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/auth.js';
import { upload, uploadBufferToCloudinary } from '../middleware/upload.js';

const router = express.Router();

// Generic one-off image upload (e.g. for rich text editor images in blog posts).
// POST /api/upload  (field name: "image") -> { url, publicId }
router.post(
  '/',
  protect,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('No image file provided');
    }
    const result = await uploadBufferToCloudinary(req.file.buffer, 'lustre/misc');
    res.status(201).json({ success: true, data: result });
  })
);

export default router;
