import express from 'express';
import { uploadFile, getFileController, deleteFileController } from '../controllers/storage.controller.js';


const router = express.Router();
import {upload} from '../middlewares/storage.middleware.js'

router.post('/upload', upload.single('file'), uploadFile);
router.get('/file/:filename', getFileController);
router.delete('/file/:filename', deleteFileController);

export default router;
