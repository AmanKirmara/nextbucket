import express, { Router } from 'express';
import {
  uploadFile,
  getFileController,
  deleteFileController,
} from '../controllers/storage.controller.js';
import { upload } from '../middlewares/storage.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uniqueFileNameMiddleware } from '../middlewares/uniqueFileName.middleware.js';
import { systemStorage } from '../controllers/system.storage.controller.js';

const router = express.Router();

router.post('/upload', authMiddleware,uniqueFileNameMiddleware, upload.single('file'), uploadFile);
router.get('/file/:filename', getFileController);
router.delete('/file/:filename', deleteFileController);
router.get('/system-storage', systemStorage)
export default router;
