import express from 'express';
import Slide from '../models/Slide.js';
import { makeCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
const SLIDE_IMAGE_FIELDS = ['image', 'heroImage', 'clientAvatarsImage'];
const ctrl = makeCrudController(Slide, { imageField: 'image', imageFields: SLIDE_IMAGE_FIELDS, searchable: ['headline'] });
const uploadSlideImages = upload.fields(SLIDE_IMAGE_FIELDS.map((name) => ({ name, maxCount: 1 })));

// Public
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

// Admin (protected)
router.post('/', protect, uploadSlideImages, ctrl.create);
router.put('/:id', protect, uploadSlideImages, ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/reorder/bulk', protect, ctrl.reorder);

export default router;