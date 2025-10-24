"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_controller_1 = require("../controllers/card.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.post('/', (0, asyncHandler_1.wrapAsync)(card_controller_1.createCard));
router.patch('/:id', (0, asyncHandler_1.wrapAsync)(card_controller_1.updateCard));
router.delete('/:id', (0, asyncHandler_1.wrapAsync)(card_controller_1.deleteCard));
router.put('/reorder', (0, asyncHandler_1.wrapAsync)(card_controller_1.reorderCards));
exports.default = router;
