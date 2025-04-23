import { Router } from 'express';
import * as ctrl from '../controllers/itemsController';

const router = Router();

router.get('/', ctrl.fetchPage);
router.post('/select', ctrl.selectItem);
router.post('/order', ctrl.reorder);
router.get('/state', ctrl.getAppState);

export default router;