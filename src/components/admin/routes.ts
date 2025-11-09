import express from 'express';
const router = express.Router();

import newsRoutes from './news/routes';
router.use('/', newsRoutes);

export default router;