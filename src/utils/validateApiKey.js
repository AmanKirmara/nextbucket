
const validApiKeys = process.env.API_KEYS.split(','); // List of valid API keys

export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (validApiKeys.includes(apiKey)) {
    next(); // API key is valid, proceed to the route handler
  } else {
    res.status(403).json({
      message: 'Forbidden: Invalid API key'
    });
  }
};
