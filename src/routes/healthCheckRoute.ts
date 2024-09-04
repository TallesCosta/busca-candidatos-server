import { Router } from 'express';
import BaseController from '../controllers/BaseController';

const router = Router();

router.get('/health-check', BaseController.healthCheck);

export default router;
