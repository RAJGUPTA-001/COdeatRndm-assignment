import express from 'express';

const router=express.Router();

import { analyzeSkillGap } from '../controllers/skillgap.controller.js';

router.post('/', analyzeSkillGap);

export default router;