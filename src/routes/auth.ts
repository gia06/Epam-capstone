import { upload } from '../middleware/multer';
import { Context, RouterFactory } from '../interfaces/general';
import express, { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../interfaces/express';
import { signJwt } from '../libs/jwt';
import { logger } from '../libs/logger';
import { validateAuth } from '../middleware/validation/auth/chain';
import { handleValidations } from '../middleware/validation';

export const makeAuthRouter: RouterFactory = ({
  services: { authService, userService },
}: Context) => {
  const router = express.Router();

  router.post(
    '/register',
    upload.single('avatar'),
    validateAuth(userService).register,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { file } = req;
        const user = await authService.create(req.body, file);
        logger.info({ id: req.id, message: 'user created' });
        return res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/login',
    upload.single(''),
    validateAuth(userService).login,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { user } = res.locals;

        const token = await signJwt({ id: user.id, email: user.email, role: user.role });

        logger.info({ id: req.id, message: `${user.role} logged in` });
        return res.status(200).json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            title: user.title,
            summary: user.summary,
            email: user.email,
            image: user.image,
          },
          token,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
