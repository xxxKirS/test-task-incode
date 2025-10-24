"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandlingMiddleware = errorsHandlingMiddleware;
const errors_1 = require("./errors");
const logger_1 = require("../logger");
// TODO: improve it
function errorsHandlingMiddleware(err, req, res, next) {
    if (err instanceof errors_1.HttpException) {
        return res.status(err.status).json(err);
    }
    logger_1.logger.error('Error occurred:', err);
    return res
        .status(500)
        .json({ message: 'Internal Server Error', status: 500, errors: [] });
}
