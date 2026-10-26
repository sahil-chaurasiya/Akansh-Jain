import express from 'express';
import asyncHandler from 'express-async-handler';
import AboutReel from '../models/AboutReel.js';
import { protect } from '../middleware/auth.js';
import {
  uploadVideo,
  uploadVideoBufferToCloudinary,
  deleteVideoFromCloudinary,
} from '../middleware/uploadVideo.js';

const router = express.Router();

const list = asyncHandler(async (req, res) => {
  const items = await AboutReel.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: items.length, data: items });
});

const getOne = asyncHandler(async (req, res) => {
  const item = await AboutReel.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Reel not found');
  }
  res.json({ success: true, data: item });
});

const create = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please choose a video file for the reel');
  }
  const uploaded = await uploadVideoBufferToCloudinary(req.file.buffer);
  const item = await AboutReel.create({
    video: uploaded,
    caption: req.body.caption || '',
    linkUrl: req.body.linkUrl || '',
    order: req.body.order !== undefined && req.body.order !== '' ? Number(req.body.order) : 0,
  });
  res.status(201).json({ success: true, data: item });
});

const update = asyncHandler(async (req, res) => {
  const item = await AboutReel.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Reel not found');
  }
  if (req.file) {
    const uploaded = await uploadVideoBufferToCloudinary(req.file.buffer);
    await deleteVideoFromCloudinary(item.video?.publicId);
    item.video = uploaded;
  }
  if (req.body.caption !== undefined) item.caption = req.body.caption;
  if (req.body.linkUrl !== undefined) item.linkUrl = req.body.linkUrl;
  if (req.body.order !== undefined && req.body.order !== '') item.order = Number(req.body.order);
  await item.save();
  res.json({ success: true, data: item });
});

const remove = asyncHandler(async (req, res) => {
  const item = await AboutReel.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Reel not found');
  }
  await deleteVideoFromCloudinary(item.video?.publicId);
  await item.deleteOne();
  res.json({ success: true, data: {} });
});

// Public
router.get('/', list);
router.get('/:id', getOne);

// Admin (protected)
router.post('/', protect, uploadVideo.single('video'), create);
router.put('/:id', protect, uploadVideo.single('video'), update);
router.delete('/:id', protect, remove);

export default router;