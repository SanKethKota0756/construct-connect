// backend/middleware/errorMiddleware.js

// This middleware will run if a route is not found (404 error)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This middleware will be our general error handler, catching all errors
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come through with a 200 status code, so we'll set it to 500 by default if it's not an error code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose-specific error for bad ObjectIds (optional but good practice)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send back a clean JSON response instead of HTML error pages
  res.status(statusCode).json({
    message: message,
    // We'll also include the stack trace if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };