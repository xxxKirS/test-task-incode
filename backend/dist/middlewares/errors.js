"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = exports.UnauthorizedException = exports.ForbiddenException = exports.InternalException = exports.NotFoundException = exports.BadRequestException = exports.HttpException = void 0;
class HttpException {
    constructor(message, status, errors) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message = 'Bad request error.', errors) {
        super(message, 400, errors);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends HttpException {
    constructor(message = 'Not found error.', errors) {
        super(message, 404, errors);
    }
}
exports.NotFoundException = NotFoundException;
class InternalException extends HttpException {
    constructor(message = 'Internal server error.', errors) {
        super(message, 500, errors);
    }
}
exports.InternalException = InternalException;
class ForbiddenException extends HttpException {
    constructor(message = 'Forbidden error.', errors) {
        super(message, 403, errors);
    }
}
exports.ForbiddenException = ForbiddenException;
class UnauthorizedException extends HttpException {
    constructor(message = 'Unauthorized error.', errors) {
        super(message, 401, errors);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ConflictException extends HttpException {
    constructor(message = 'Conflict.', errors) {
        super(message, 409, errors);
    }
}
exports.ConflictException = ConflictException;
