import { Router } from 'express';

import homeController from '../controllers/HomeContoller';

const router = new Router();

router.get('/', homeController.index);

export default router;
