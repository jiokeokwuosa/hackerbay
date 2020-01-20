import { Router } from 'express';
import validateDocument from '../middlewares/jsonpatch.middleware';
import JsonPatchController from '../controllers/jsonpatch.controller';
import { validateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', validateToken, validateDocument, JsonPatchController.jsonPatch);

export default router;
