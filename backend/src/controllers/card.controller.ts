import { Request, Response } from 'express';
import Card from '../models/card.model';
import {
  BadRequestException,
  NotFoundException,
  InternalException,
} from '../middlewares/errors';

export async function createCard(req: Request, res: Response) {
  const { name, description, boardId } = req.body;
  if (!boardId) throw new BadRequestException('boardId is required');

  const card = await Card.create({ name, description, boardId });
  return res.status(201).json(card);
}

export async function updateCard(req: Request, res: Response) {
  const { id } = req.params;
  const card = await Card.findByIdAndUpdate(id, req.body, { new: true });

  if (!card) {
    throw new NotFoundException('Card not found');
  }

  return res.status(200).json(card);
}

export async function reorderCards(req: Request, res: Response) {
  const { cards } = req.body; // [{ id, column, position }]
  if (!Array.isArray(cards)) throw new BadRequestException('cards must be an array');

  const ops = cards.map((u: any) =>
    Card.findByIdAndUpdate(u.id, { column: u.column, position: u.position }),
  );

  await Promise.all(ops);

  return res.json({ message: 'Reordered successfully' });
}

export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  const card = await Card.findByIdAndDelete(id);

  if (!card) {
    throw new NotFoundException('Card not found');
  }

  return res.status(200).json({ message: 'Card deleted successfully' });
}
