import express from 'express';
import GallerySection from '../models/GallerySection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(GallerySection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;