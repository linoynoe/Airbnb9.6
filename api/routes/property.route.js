import express from 'express';
import { getProperty } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/get', getProperty);

export default router;