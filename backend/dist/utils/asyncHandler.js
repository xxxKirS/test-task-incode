"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
// Small helper to wrap async route handlers so thrown errors are forwarded to Express error middleware
const wrapAsync = (fn) => {
    return (req, res, next) => {
        // Ensure returned value is a promise and catch errors
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.wrapAsync = wrapAsync;
