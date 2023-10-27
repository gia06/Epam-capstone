import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../../interfaces/express';
import { UserService } from '../../services/user.service';
import { logger } from '../../libs/logger';

export const validUser = (userService: UserService) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await userService.findById(userId);

    if (!user) {
      logger.error({ id: req.id, message: 'user not found' });
      return res.status(404).json({
        error: {
          msg: 'user not found',
          param: 'userId',
          location: 'param',
        },
      });
    }
    return next();
  };
};
