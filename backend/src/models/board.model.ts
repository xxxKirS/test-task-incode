import mongoose, { Schema } from 'mongoose';

const boardSchema = new Schema(
  {
    name: { type: String, required: true },
    hashId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
