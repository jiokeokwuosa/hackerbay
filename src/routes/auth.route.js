import { Router } from 'express';
import { validateLogin } from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/login', validateLogin, AuthController.login);

export default router;
