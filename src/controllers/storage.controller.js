import { ApiResponse } from '../utils/ApiResponse.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ensure the directory paths are set correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json(new ApiResponse(400, null, 'File is missing in the request'));
  }

  const fileUrl = path.posix.join('/uploads', req.file.filename);    
  // Ensure the file is saved correctly to the directory here (if needed)

  res.status(200).json(new ApiResponse(200, { fileUrl }, 'File uploaded successfully'));
};

// Controller for handling file retrieval
export const getFileController = (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  // Send the file as a response
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json(new ApiResponse(404, null, 'File not found'));
    }
  });
};

// Controller for handling file deletion
export const deleteFileController = (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json(new ApiResponse(404, null, 'File not found or unable to delete'));
    }
    res.status(200).json(new ApiResponse(200, null, 'File deleted successfully'));
  });
};

export  {
  uploadFile,
};
