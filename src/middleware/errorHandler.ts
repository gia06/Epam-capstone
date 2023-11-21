import { Response, NextFunction } from 'express';
import { logger } from '../libs/logger';
import { ExtendedRequest } from '../interfaces/express';

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: CustomError,
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 505;

  logger.error({ id: req.id, error: err });
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
};
