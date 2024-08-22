import { ApiResponse } from '../utils/ApiResponse.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ensure the directory paths are set correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (req, res) => {
  const userId = req.user.id;
  if (!req.file) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, 'File is missing in the request'));
  }

  const fileUrl = path.posix.join(`${'/uploads'}/${userId}`, req.file.filename);
  // Ensure the file is saved correctly to the directory here (if needed)

  res
    .status(200)
    .json(new ApiResponse(200, { fileUrl }, 'File uploaded successfully'));
};

export const getFileController = (req, res) => {
  const { filename } = req.params;
  const userId = req.user.id;
  const filePath = path.join(
    __dirname,
    '../../public/uploads',
    userId,
    filename,
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({
      statusCode: 404,
      message: 'File not found',
      success: false,
    });
  }
};

export const deleteFileController = (req, res) => {
  const { filename } = req.params;
  const userId = req.user.id;
  const filePath = path.join(
    __dirname,
    '../../public/uploads',
    userId,
    filename,
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({
      statusCode: 200,
      message: 'File deleted successfully',
      success: true,
    });
  } else {
    res.status(404).json({
      statusCode: 404,
      message: 'File not found',
      success: false,
    });
  }
};

export { uploadFile };
