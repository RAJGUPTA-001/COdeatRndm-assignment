import express from 'express';

const router=express.Router();
import { getRoadmap } from '../controllers/roadmap.controller.js';

router.post('/',getRoadmap);

export default router;