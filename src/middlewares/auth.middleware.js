import { User } from '../models/user.model.js';

// Load environment variables from .env file

// Middleware to check authorization
const verifyAuthorization = (apiKey, storedApiKey) => {
  // Ensure the provided API key matches the one stored in the database
  return apiKey === storedApiKey;
};

export const authMiddleware = async (req, res, next) => {
  try {
    const cloudName = req.headers['x-user-name'];
    const apiKey = req.headers['x-api-key'];

    if (!cloudName || !apiKey) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Bad Request: Missing required headers',
        success: false,
      });
    }

    // Find the user by cloudName or API key
    const user = await User.findOne({
      $or: [{ username: cloudName }, { apiKey }],
    });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found: User not found',
        success: false,
      });
    }

    // Check if the provided API key matches the one in the database
    if (!verifyAuthorization(apiKey, user.apiKey)) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden: Invalid API key',
        success: false,
      });
    }

    // Successfully authenticated, attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      success: false,
    });
  }
};
