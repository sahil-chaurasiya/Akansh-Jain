import express from 'express';
import TestimonialSection from '../models/TestimonialSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(TestimonialSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;