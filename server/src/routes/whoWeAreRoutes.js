import express from 'express';
import WhoWeAre from '../models/WhoWeAre.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(WhoWeAre);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;
