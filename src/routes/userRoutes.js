import { Router } from 'express';

import userController from '../controllers/UserController';
import login from '../middlewares/login';

const router = new Router();

router.post('/', userController.store);
router.get('/:id', userController.show);
router.get('/:id/products', userController.products);
router.put('/:id/edit', login, userController.update);
router.delete('/:id/delete', login, userController.delete);

export default router;
