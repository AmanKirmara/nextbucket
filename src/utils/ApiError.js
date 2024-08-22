/**
 * Custom error class for API errors.
 * Extends the built-in Error class to include additional properties
 * specific to API error responses.
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     *
     * @param {number} statusCode - The HTTP status code for the error response.
     * @param {string} [message="Something went wrong"] - Optional error message.
     * @param {Array} [errors=[]] - Optional array of additional error details.
     * @param {string} [stack=""] - Optional stack trace for debugging.
     */
    constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
    ) {
      super(message); // Pass the message to the parent Error class
      this.statusCode = statusCode; // HTTP status code (e.g., 400, 404, 500)
      this.data = null; // Additional data related to the error, default is null
      this.message = message; // Error message
      this.success = false; // Indicates that this response is an error (always false)
      this.errors = errors; // Array of additional error details or validation errors
  
      // Conditionally set the stack trace
      if (stack) {
        this.stack = stack; 
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };
  