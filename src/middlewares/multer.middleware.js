import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/users');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using UUID and the original file extension
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({
  storage,
});
