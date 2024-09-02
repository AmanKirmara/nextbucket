import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import storageRoutes from './routes/storage.routes.js';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
// Create an instance of Express
const app = express();
dotenv.config();
// CORS middleware configuration
// Enables Cross-Origin Resource Sharing for specific origins in production
// For development, you can allow all origins, but restrict it in production for security
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this value is correctly set
    credentials: true, // Allows cookies to be included in the requests
  }),
);
// Body parser middleware
// Parses incoming JSON requests and limits the request size for security
app.use(express.json({ limit: '16kb' }));

// URL-encoded parser middleware
// Parses incoming URL-encoded data with querystring library and limits the request size
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Static files middleware
// Serves static files from the 'public' directory (e.g., images, CSS files)
// In production, consider using a CDN or other optimized storage solutions
app.use(express.static('public'));

// Cookie parser middleware
// Parses cookies attached to the client request object
app.use(cookieParser());

// Health check route
// Basic route to check if the server is running
// This can be extended for more comprehensive health checks
app.get('/', (req, res) => {
  res.send('Hello World'); // Simple response for testing server
});

// http://localhost:4000/api/storage/
app.use('/api/storage', storageRoutes);
// http://localhost:4000/api/user/register
app.use('/api/user', userRoutes);

// Import and define your routes here
// For a modular and scalable architecture, separate your routes into different files and import them
// Example: app.use('/api', apiRoutes);

// Catch-all route for 404 errors (Not Found)
// In a real application, consider returning a JSON response for better API usage
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Error handling middleware
// Catches all errors and returns a standardized response
// In production, avoid sending stack traces to the client; log them instead
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: 'Internal Server Error' }); // Standardized error response
});

// Export the Express app instance
// This allows the app to be imported and used in other files (e.g., for testing or deployment)
export { app };
