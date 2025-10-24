"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoard = void 0;
exports.createBoard = createBoard;
exports.getAllBoards = getAllBoards;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;
const board_model_1 = __importDefault(require("../models/board.model"));
const card_model_1 = __importDefault(require("../models/card.model"));
const nanoid_1 = require("nanoid");
const errors_1 = require("../middlewares/errors");
async function createBoard(req, res) {
    const { name } = req.body;
    if (!name) {
        throw new errors_1.BadRequestException('Name is required');
    }
    const nanoid = (0, nanoid_1.customAlphabet)('1234567890', 8);
    const hashId = nanoid();
    const board = await board_model_1.default.create({
        name,
        hashId,
    });
    return res.status(201).json(board);
}
async function getAllBoards(req, res) {
    const boards = await board_model_1.default.find();
    return res.status(200).json(boards);
}
const getBoard = async (req, res) => {
    const { hashId } = req.params;
    const board = await board_model_1.default.findOne({ hashId });
    if (!board)
        throw new errors_1.NotFoundException('Board not found');
    const cards = await card_model_1.default.find({ boardId: board._id }).sort({ position: 1 });
    return res.json({ board, cards });
};
exports.getBoard = getBoard;
async function updateBoard(req, res) {
    const board = await board_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!board) {
        throw new errors_1.NotFoundException('Board not found');
    }
    return res.status(200).json(board);
}
async function deleteBoard(req, res) {
    const board = await board_model_1.default.findByIdAndDelete(req.params.id);
    if (!board) {
        throw new errors_1.NotFoundException('Board not found');
    }
    await card_model_1.default.deleteMany({ boardId: req.params.id });
    return res.status(200).json({ message: 'Board deleted successfully' });
}
