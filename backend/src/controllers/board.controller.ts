import { Request, Response } from 'express';
import Board from '../models/board.model';
import Card from '../models/card.model';
import { customAlphabet } from 'nanoid';

export async function createBoard(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const nanoid = customAlphabet('1234567890', 8);
    const hashId = nanoid();

    const board = await Board.create({
      name,
      hashId,
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAllBoards(req: Request, res: Response) {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getBoard = async (req: Request, res: Response) => {
  try {
    const { hashId } = req.params;
    const board = await Board.findOne({ hashId });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const cards = await Card.find({ boardId: board._id }).sort({ position: 1 });
    res.json({ board, cards });
  } catch (error) {
    res.status(500).json({ message: 'Error loading board' });
  }
};

export async function updateBoard(req: Request, res: Response) {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteBoard(req: Request, res: Response) {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    await Card.deleteMany({ boardId: req.params.id });

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
