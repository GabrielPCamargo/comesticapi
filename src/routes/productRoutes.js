import { Router } from 'express';

import productController from '../controllers/ProductController';
import login from '../middlewares/login';

const router = new Router();

router.get('/', productController.index);
router.post('/', login, productController.store);
router.get('/:id', productController.show);
router.put('/:id/edit', login, productController.update);
router.delete('/:id/delete', login, productController.delete);

export default router;
