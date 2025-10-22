import express from 'express';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

// Routes
// app.use();

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
