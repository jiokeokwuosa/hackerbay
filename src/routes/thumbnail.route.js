import { Router } from 'express';
import ThumbnailController from '../controllers/thumbnail.controller';
import { validateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', validateToken, ThumbnailController.thumbnail);

export default router;
