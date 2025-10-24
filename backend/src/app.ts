import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/error-handler';
import boardRouter from './routes/board.routes';
import cardRouter from './routes/card.routes';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRouter);
app.use('/api/cards', cardRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
