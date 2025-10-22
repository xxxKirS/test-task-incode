import { Request, Response } from 'express';
import Card from '../models/card.model';

export async function createCard(req: Request, res: Response) {
  try {
    const { name, description, boardId } = req.body;
    const card = await Card.create({ name, description, boardId });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateCard(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function reorderCards(req: Request, res: Response) {
  try {
    const { boardId, updates } = req.body;

    const ops = updates.map((u: any) =>
      Card.findByIdAndUpdate(u.id, { column: u.column, position: u.position }),
    );

    await Promise.all(ops);

    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
