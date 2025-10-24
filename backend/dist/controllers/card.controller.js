"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.reorderCards = reorderCards;
exports.deleteCard = deleteCard;
const card_model_1 = __importDefault(require("../models/card.model"));
const errors_1 = require("../middlewares/errors");
async function createCard(req, res) {
    const { name, description, boardId } = req.body;
    if (!boardId)
        throw new errors_1.BadRequestException('boardId is required');
    const card = await card_model_1.default.create({ name, description, boardId });
    return res.status(201).json(card);
}
async function updateCard(req, res) {
    const { id } = req.params;
    const card = await card_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!card) {
        throw new errors_1.NotFoundException('Card not found');
    }
    return res.status(200).json(card);
}
async function reorderCards(req, res) {
    const { cards } = req.body; // [{ id, column, position }]
    if (!Array.isArray(cards))
        throw new errors_1.BadRequestException('cards must be an array');
    const ops = cards.map((u) => card_model_1.default.findByIdAndUpdate(u.id, { column: u.column, position: u.position }));
    await Promise.all(ops);
    return res.json({ message: 'Reordered successfully' });
}
async function deleteCard(req, res) {
    const { id } = req.params;
    const card = await card_model_1.default.findByIdAndDelete(id);
    if (!card) {
        throw new errors_1.NotFoundException('Card not found');
    }
    return res.status(200).json({ message: 'Card deleted successfully' });
}
