/**
 * Response utility functions for consistent API responses
 */

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Response data
 */
export const sendSuccessResponse = (res, statusCode = 200, message, data = null) => {
  const response = {
    status: 'success',
    message
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {Object} errors - Validation errors
 */
export const sendErrorResponse = (res, statusCode = 500, message, code = null, errors = null) => {
  const response = {
    status: 'error',
    message
  };

  if (code) {
    response.code = code;
  }

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Array of data
 * @param {Object} pagination - Pagination info
 * @param {string} message - Success message
 */
export const sendPaginatedResponse = (res, data, pagination, message = 'Data retrieved successfully') => {
  return res.status(200).json({
    status: 'success',
    message,
    data,
    pagination
  });
};

/**
 * Create pagination object
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination object
 */
export const createPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    current: parseInt(page),
    total: totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    totalRecords: total,
    limit: parseInt(limit)
  };
};
