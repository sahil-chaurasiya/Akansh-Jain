import express from 'express';
import HomeAboutSection from '../models/HomeAboutSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(HomeAboutSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;