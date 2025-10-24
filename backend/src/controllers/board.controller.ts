import { Request, Response } from 'express';
import Board from '../models/board.model';
import Card from '../models/card.model';
import { customAlphabet } from 'nanoid';
import {
  BadRequestException,
  NotFoundException,
  InternalException,
} from '../middlewares/errors';

export async function createBoard(req: Request, res: Response) {
  const { name } = req.body;

  if (!name) {
    throw new BadRequestException('Name is required');
  }

  const nanoid = customAlphabet('1234567890', 8);
  const hashId = nanoid();

  const board = await Board.create({
    name,
    hashId,
  });

  return res.status(201).json(board);
}

export async function getAllBoards(req: Request, res: Response) {
  const boards = await Board.find();
  return res.status(200).json(boards);
}

export const getBoard = async (req: Request, res: Response) => {
  const { hashId } = req.params;
  const board = await Board.findOne({ hashId });
  if (!board) throw new NotFoundException('Board not found');

  const cards = await Card.find({ boardId: board._id }).sort({ position: 1 });
  return res.json({ board, cards });
};

export async function updateBoard(req: Request, res: Response) {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!board) {
    throw new NotFoundException('Board not found');
  }
  return res.status(200).json(board);
}

export async function deleteBoard(req: Request, res: Response) {
  const board = await Board.findByIdAndDelete(req.params.id);
  if (!board) {
    throw new NotFoundException('Board not found');
  }

  await Card.deleteMany({ boardId: req.params.id });

  return res.status(200).json({ message: 'Board deleted successfully' });
}
