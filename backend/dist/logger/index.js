"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    error: (message, error) => {
        console.error(`${message}:`, error);
    },
};
