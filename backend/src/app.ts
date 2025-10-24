import express from 'express';
import { errorsHandlingMiddleware } from './middlewares/error-handler';
import boardRouter from './routes/board.routes';
import cardRouter from './routes/card.routes';
import cors from 'cors';

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : [];
const corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/boards', boardRouter);
app.use('/cards', cardRouter);

// Global error handler
app.use(errorsHandlingMiddleware);

export default app;
