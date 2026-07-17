import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(SiteSettings);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;
