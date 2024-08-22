// src/middlewares/auth.middleware.js

import { config } from 'dotenv';

config(); // Load environment variables from .env file

const NEXTBUCKET_CLOUD_NAME = process.env.NEXTBUCKET_CLOUD_NAME;
const NEXTBUCKET_API_KEY = process.env.NEXTBUCKET_API_KEY;
const NEXTBUCKET_SECRET = process.env.NEXTBUCKET_SECRET;

// Middleware to check authorization

const veriFyAuthorization = (userId) => {
    return userId === NEXTBUCKET_SECRET;
}
export const authMiddleware = (req, res, next) => {
  const cloudName = req.headers['x-cloud-name'];
  const apiKey = req.headers['x-api-key'];
  const secret = req.headers['x-secret'];

  if (cloudName === NEXTBUCKET_CLOUD_NAME && apiKey === NEXTBUCKET_API_KEY) {
    const userIdCheck = veriFyAuthorization(secret);
    if (!userIdCheck) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Forbidden: Invalid credentials -user',
            success: false,
        });
    }
    req.user = { id: NEXTBUCKET_SECRET };
    next();
  } else {
    // Authorization failed
    res.status(403).json({
      statusCode: 403,
      message: 'Forbidden: Invalid credentials',
      success: false,
    });
  }
};
