import express from 'express';
import BookingSection from '../models/BookingSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(BookingSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;
