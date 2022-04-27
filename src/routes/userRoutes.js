import { Router } from 'express';

import userController from '../controllers/UserController';
import login from '../middlewares/login';

const router = new Router();

router.get('/', userController.index);
router.post('/', userController.store);
router.get('/:id', userController.show);
router.put('/:id/edit', login, userController.update);
router.delete('/:id/delete', login, userController.delete);

export default router;
