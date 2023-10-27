import express, { NextFunction, Response } from 'express';
import { Context, RouterFactory } from '../interfaces/general';
import { deleteUserDirectory, upload } from '../middleware/multer';
import { roles } from '../middleware/roles';
import { UserRole } from '../models/user.model';
import { ExtendedRequest } from '../interfaces/express';
import { paginate } from '../middleware/paginate';
import { logger } from '../libs/logger';
import { handleValidations } from '../middleware/validation';
import { validateUsers } from '../middleware/validation/users/chain';
import { validUser } from '../middleware/validation/validUser';

export const makeUsersRouter: RouterFactory = ({
  services: { userService, cacheService },
}: Context) => {
  const router = express.Router();

  router.get(
    '/',
    roles([UserRole.Admin]),
    validateUsers(userService).getAll,
    handleValidations,
    paginate(userService),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        logger.info({ id: req.id, message: 'Users loaded' });
        return res.status(200).json(res.locals.data);
      } catch (err) {
        logger.info(err);
        res.sendStatus(505);
      }
    }
  );

  router.get('/:id', async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;

      if (!user) {
        logger.error({ id: req.id, message: 'User not found' });
        return res.sendStatus(404);
      }

      logger.info({ id: req.id, message: 'User loaded' });
      return res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        summary: user.summary,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      logger.error({ id: req.id, error });
      res.sendStatus(505);
    }
  });

  router.get(
    '/:userId/cv',
    validUser(userService),
    validateUsers(userService, cacheService).getCv,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { cv } = res.locals;

        return res.status(200).json(cv);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.post(
    '/',
    roles([UserRole.Admin]),
    upload.single('avatar'),
    validateUsers(userService).create,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.file) {
          logger.error({ id: req.id, message: 'Image file not found' });
          return res.sendStatus(400);
        }
        const user = await userService.create(req.body, req.file);

        logger.info({ id: req.id, message: 'User created' });
        return res.status(201).json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          title: user.title,
          summary: user.summary,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.put(
    '/:id',
    upload.single(''),
    validateUsers(userService).update,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const user = await userService.findById(req.params.id);

        if (!user) {
          logger.error({ id: req.id, message: 'User not found' });
          return res.sendStatus(404);
        }

        const updatedUser = await userService.update(req.params.id, req.body);
        await cacheService.delete(user.id);

        logger.info({ id: req.id, message: 'User updated' });
        return res.status(200).json(updatedUser);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.delete(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    validateUsers(userService).delete,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const user = await userService.findById(req.params.id);

        if (!user) {
          logger.error({ id: req.id, message: 'User not found' });
          return res.sendStatus(404);
        }

        await userService.delete(req.params.id);
        await deleteUserDirectory(user.email);
        await cacheService.delete(user.id);

        logger.info({ id: req.id, message: 'User deleted' });
        return res.sendStatus(204);
      } catch (error) {
        logger.error({ id: req.id, error });

        res.sendStatus(505);
      }
    }
  );

  return router;
};
