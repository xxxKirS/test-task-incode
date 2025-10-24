import { RequestHandler } from 'express';

// Small helper to wrap async route handlers so thrown errors are forwarded to Express error middleware
export const wrapAsync = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    // Ensure returned value is a promise and catch errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
