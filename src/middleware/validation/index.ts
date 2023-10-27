import { NextFunction, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';
import { ExtendedRequest } from '../../interfaces/express';

export const handleValidations: RequestHandler = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: result.array() });
};
