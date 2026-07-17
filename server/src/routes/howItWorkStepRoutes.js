import express from 'express';
import HowItWorkStep from '../models/HowItWorkStep.js';
import { makeCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
const ctrl = makeCrudController(HowItWorkStep, { imageField: 'image', searchable: ['title'] });

// Public
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

// Admin (protected)
router.post('/', protect, upload.single('image'), ctrl.create);
router.put('/:id', protect, upload.single('image'), ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/reorder/bulk', protect, ctrl.reorder);

export default router;
