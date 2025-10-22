import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import boardRouter from './routes/board.routes';
import cardRouter from './routes/card.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/boards', boardRouter);
app.use('/api/cards', cardRouter);

// Global error handler
app.use(errorHandler);

export default app;
