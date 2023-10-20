import { decodeJwt } from '../libs/jwt';
import { ExtendedRequest } from '../interfaces/express';
import { UserRole } from '../models/user.model';
import { NextFunction, Response } from 'express';

export const roles = (userRoles: UserRole[]) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const decoded = await decodeJwt(req.headers.authorization);

    for (const role of userRoles) {
      if (role === decoded.role) return next();
    }

    res.sendStatus(403);
  };
};
