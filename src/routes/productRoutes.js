import { Router } from 'express';

import productController from '../controllers/ProductController';

const router = new Router();

router.get('/', productController.index);
router.post('/', productController.store);
router.get('/:id', productController.show);
router.put('/:id/edit', productController.update);
router.delete('/:id/delete', productController.delete);

export default router;
