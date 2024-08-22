// src/middlewares/uniqueFileName.middleware.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../../public/uploads');

// Middleware to ensure file name uniqueness
export const uniqueFileNameMiddleware = (req, res, next) => {
    const userId = req.user.id;
  if (!req.file) {
    // No file was uploaded, so just proceed
    return next();
  }

  const originalFileName = req.file.originalname;
  let fileName = originalFileName;
  let filePath = path.join(`${UPLOAD_DIR}/${userId}`, fileName);

  // If file with the same name exists, modify the file name
  let fileIndex = 1;
  while (fs.existsSync(filePath)) {
    const extname = path.extname(originalFileName);
    const basename = path.basename(originalFileName, extname);
    fileName = `${basename}(${fileIndex++})${extname}`;
    filePath = path.join(`${UPLOAD_DIR}/${userId}`, fileName);
  }

  req.file.filename = fileName;
  next();
};
