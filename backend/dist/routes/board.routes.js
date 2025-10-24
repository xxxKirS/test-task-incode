"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_controller_1 = require("../controllers/board.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.post('/', (0, asyncHandler_1.wrapAsync)(board_controller_1.createBoard));
router.get('/:hashId', (0, asyncHandler_1.wrapAsync)(board_controller_1.getBoard));
router.get('/', (0, asyncHandler_1.wrapAsync)(board_controller_1.getAllBoards));
router.put('/:id', (0, asyncHandler_1.wrapAsync)(board_controller_1.updateBoard));
router.delete('/:id', (0, asyncHandler_1.wrapAsync)(board_controller_1.deleteBoard));
exports.default = router;
