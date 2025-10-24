import express from 'express';
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
  updateBoard,
} from '../controllers/board.controller';
import { wrapAsync } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', wrapAsync(createBoard));
router.get('/:hashId', wrapAsync(getBoard));
router.get('/', wrapAsync(getAllBoards));
router.put('/:id', wrapAsync(updateBoard));
router.delete('/:id', wrapAsync(deleteBoard));

export default router;
