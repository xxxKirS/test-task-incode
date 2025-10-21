import mongoose, { Schema } from 'mongoose';

const cardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  position: { type: Number, required: true },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
