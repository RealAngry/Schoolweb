/**
 * Async handler middleware to avoid try-catch blocks in route handlers
 * @param {Function} fn - The async function to wrap
 * @returns {Function} Express middleware function that catches any errors
 */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler; 