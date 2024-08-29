import { ApiResponse } from '../utils/ApiResponse.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { asyncHandler } from '../utils/asyncHandler.js';

// Ensure the directory paths are set correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Handles file uploads and constructs various URLs for the uploaded file.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the uploaded file.
 */
const uploadFile = asyncHandler(async (req, res) => {
  // Get the user ID from the authenticated user
  const userId = req.user.id;

  // Check if the file is included in the request
  if (!req.file) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, 'File is missing in the request'));
  }

  const baseUrl = `http://localhost:4000/uploads/${userId}`;
  // const baseUrl = `http://157.230.249.25:4000/uploads/${userId}`;
  // Manually concatenate the base URL with the file name
  const fileUrl = `${baseUrl}/${req.file.filename}`;

  // Secure URL by replacing 'http' with 'https' (assuming HTTPS is enabled)
  const secureUrl = fileUrl.replace('http', 'https');

  // URLs for different file transformations or sizes
  const thumbnailUrl = path.posix.join(
    baseUrl,
    'thumbnails',
    req.file.filename,
  );
  const mediumUrl = path.posix.join(baseUrl, 'medium', req.file.filename);
  const largeUrl = 'currently not available'; // Large version URL placeholder

  // Construct the response data object containing various file details
  const responseData = {
    public_id: path.basename(
      req.file.filename,
      path.extname(req.file.filename),
    ),
    version: Date.now(),
    format: path.extname(req.file.filename).substring(1),
    resource_type: 'auto',
    url: fileUrl,
    secure_url: secureUrl,
    // medium_url: mediumUrl,
    // large_url: largeUrl,
    created_at: new Date().toISOString(),
  };

  res
    .status(200)
    .json(new ApiResponse(200, responseData, 'File uploaded successfully'));
});

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

export const deleteFileController = asyncHandler(async (req, res) => {
  try {
    const { fileName } = req.query;

    if (!fileName) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'File URL is required'));
    }

    // Extract userId and filename from the fileName (which is actually the URL)
    const urlParts = fileName.split('/');

    // Assuming the userId is the folder after 'uploads'
    const uploadsIndex = urlParts.indexOf('uploads');
    const userId = urlParts[uploadsIndex + 1];
    const filename = urlParts[urlParts.length - 1];

    console.log('url parts : ', urlParts);
    console.log('user id : ', userId);
    console.log('file name : ', filename);

    // Construct the file path based on the extracted userId and filename
    const filePath = path.join(
      __dirname,
      '../../public/uploads',
      userId,
      filename,
    );

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          throw res
            .status(500)
            .json(
              new ApiResponse(
                500,
                null,
                'Error occurred while deleting the file',
              ),
            );
        }

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { success: true },
              null,
              'File deleted successfully',
            ),
          );
      });
    } else {
      return res.status(404).json(new ApiResponse(404, null, 'File not found'));
    }
  } catch (error) {
    console.error('Error in deleteFileController:', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'An internal server error occurred'));
  }
});

export { uploadFile };
