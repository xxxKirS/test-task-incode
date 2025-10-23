import express from 'express';
import {
  createCard,
  updateCard,
  deleteCard,
  reorderCards,
} from '../controllers/card.controller';

const router = express.Router();

router.post('/', createCard);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);
router.put('/reorder', reorderCards);

export default router;
