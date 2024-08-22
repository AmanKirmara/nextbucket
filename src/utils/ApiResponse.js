/**
 * Represents an API response.
 * This class encapsulates the structure of an API response including
 * the status code, data, message, and a success indicator.
 */
class ApiResponse {
    /**
     * Creates an instance of ApiResponse.
     *
     * @param {number} statusCode - The HTTP status code for the response.
     * @param {any} data - The data to be included in the response.
     * @param {string} [message='Success'] - Optional message for the response.
     */
    constructor(statusCode, data, message = 'Success') {
      this.statusCode = statusCode; // HTTP status code (e.g., 200, 404, 500)
      this.data = data;             // The data to be returned in the response
      this.message = message;       // Response message (default is 'Success')
      this.success = statusCode >= 200 && statusCode < 400; // Indicates if the request was successful
    }
  }
  
  export { ApiResponse };
  