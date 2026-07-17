import express from 'express';
import AboutSection from '../models/AboutSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(AboutSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;
