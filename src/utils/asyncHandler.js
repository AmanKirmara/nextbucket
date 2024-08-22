/**
 * Asynchronous handler for Express route handlers.
 * This utility function ensures that any asynchronous errors
 * are caught and passed to the Express error-handling middleware.
 *
 * @param {Function} requestHandler - The async route handler function.
 * @returns {Function} - A wrapper function that handles errors.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // Wrap the request handler in a promise to catch any errors
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      // Pass any errors to the Express error-handling middleware
      next(err);
    });
  };
};

export {asyncHandler}
// const asyncHandler = (fn) => async(req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
