import express from 'express';
import {
  createCard,
  updateCard,
  deleteCard,
  reorderCards,
} from '../controllers/card.controller';
import { wrapAsync } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', wrapAsync(createCard));
router.patch('/:id', wrapAsync(updateCard));
router.delete('/:id', wrapAsync(deleteCard));
router.put('/reorder', wrapAsync(reorderCards));

export default router;
