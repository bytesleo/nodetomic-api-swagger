import express from 'express';
import * as controller from './extra.controller';

const router = express.Router();

router.get('/upload', controller.upload);
router.get('/email', controller.email);
router.get('/email/:folder/:name', controller.preview);

export default router;
