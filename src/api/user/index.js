import express from 'express';
import * as auth from '../../lib/auth/middleware';
import * as controller from './user.controller';

const router = express.Router();

router.get('/', auth.isAuthenticated(['admin']), controller.list);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(['admin']), controller.read);
router.delete('/:id', auth.isAuthenticated(['admin']), controller.remove);
router.post('/', controller.create);
router.put('/:id', controller.update);

export default router;