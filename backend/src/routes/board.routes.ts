import express from 'express';
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
  updateBoard,
} from '../controllers/board.controller';

const router = express.Router();

router.post('/', createBoard);
router.get('/:hashId', getBoard);
router.get('/', getAllBoards);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

export default router;
