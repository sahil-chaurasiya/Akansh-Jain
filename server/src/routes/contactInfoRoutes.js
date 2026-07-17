import express from 'express';
import ContactInfo from '../models/ContactInfo.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(ContactInfo);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;
