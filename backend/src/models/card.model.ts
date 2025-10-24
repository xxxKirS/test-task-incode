import mongoose, { Schema } from 'mongoose';

export type ColumnType = 'todo' | 'in_progress' | 'done';

const cardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  column: {
    type: String,
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo',
  },
  position: { type: Number, required: true, default: 0 },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
