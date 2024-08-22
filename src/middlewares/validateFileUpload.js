import { body, validationResult } from 'express-validator';

const validateFileUpload = [
  // Check if file field is present
  body('file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is missing in the request');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        message: errors.array()[0].msg,
        success: false,
      });
    }
    next();
  },
];

export default validateFileUpload;
