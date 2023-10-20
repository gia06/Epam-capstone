import { upload } from '../middleware/multer';
import { Context, RouterFactory } from '../interfaces/general';
import express, { NextFunction, Request, Response } from 'express';
import { ExtendedRequest } from '../interfaces/express';
import { signJwt } from '../libs/jwt';
import { logger } from '../libs/logger';

export const makeAuthRouter: RouterFactory = ({ services }: Context) => {
  const router = express.Router();

  router.post(
    '/register',
    upload.single('avatar'),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { file } = req;
        const user = await services.authService.create(req.body, file);
        logger.info({ id: req.id, message: 'user created' });
        return res.status(201).json(user);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.post(
    '/login',
    upload.single(''),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const user = await services.authService.findByEmail(email);
        const comparisonResult = await services.authService.comparePassword(
          password,
          user.password
        );

        if (!comparisonResult) {
          res.sendStatus(401);
        }

        const token = await signJwt({ id: user.id, email: user.email, role: user.role });

        logger.info({ id: req.id, message: 'user logged in' });
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
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  return router;
};
