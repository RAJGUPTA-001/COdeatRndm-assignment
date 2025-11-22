import express from 'express';

const router=express.Router();
import { getLatestNews } from '../controllers/getnews.controller.js';
router.get('/', getLatestNews );

export default router;