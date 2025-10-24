import { NextFunction, Request, Response } from 'express';
import { HttpException } from './errors';
import { logger } from '../logger';

// TODO: improve it
export function errorsHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json(err);
  }

  logger.error('Error occurred:', err);
  return res
    .status(500)
    .json({ message: 'Internal Server Error', status: 500, errors: [] });
}
