import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ensure __dirname is defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const userId = req.user._id; // Access userId from req.user
      if (!userId) {
        return cb(new Error('User ID is not available'), null);
      }

      const uploadDir = path.join(__dirname, `../../public/uploads/${userId}`);

      // Ensure directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });

      cb(null, uploadDir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export { upload };
