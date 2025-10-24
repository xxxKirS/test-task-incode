"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("./middlewares/error-handler");
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const card_routes_1 = __importDefault(require("./routes/card.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/boards', board_routes_1.default);
app.use('/api/cards', card_routes_1.default);
// Global error handler
app.use(error_handler_1.errorsHandlingMiddleware);
exports.default = app;
