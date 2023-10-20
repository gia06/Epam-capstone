import express, { NextFunction, Response } from 'express';
import { Context } from '../interfaces/general';
import { RouterFactory } from '../interfaces/general';
import { ExtendedRequest } from '../interfaces/express';
import { roles } from '../middleware/roles';
import { UserRole } from '../models/user.model';
import { upload } from '../middleware/multer';
import { paginate } from '../middleware/paginate';
import { logger } from '../libs/logger';

export const makeExperienceRouter: RouterFactory = ({
  services: { experienceService },
}: Context) => {
  const router = express.Router();

  router.get(
    '/',
    // roles([UserRole.Admin]),
    paginate(experienceService),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        logger.info({ id: req.id, message: 'list of experiences loaded' });
        return res.status(200).json(res.locals.data);
      } catch (error) {
        logger.error({ error });
        res.sendStatus(505);
      }
    }
  );

  router.get('/:id', async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const exp = await experienceService.findById(req.params.id);

      if (!exp) {
        logger.error({ id: req.id, message: 'experience not found' });
        return res.sendStatus(404);
      }

      logger.info({ id: req.id, message: 'Experience loaded' });
      return res.status(200).json({
        id: exp.id,
        userId: exp.userId,
        companyName: exp.companyName,
        role: exp.role,
        startDate: exp.startDate,
        endDate: exp.endDate,
      });
    } catch (error) {
      logger.error({ id: req.id, error });
      res.sendStatus(505);
    }
  });

  router.post(
    '/',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const experience = await experienceService.create(req.body);

        logger.info({ id: req.id, message: 'experience created' });
        return res.status(201).json(experience);
      } catch (error) {
        logger.error({ id: req.id, error });
      }
    }
  );

  router.put(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const exp = await experienceService.findById(req.params.id);

        if (!exp) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        const updatedExp = await experienceService.update(req.params.id, req.body);

        logger.error({ id: req.id, message: 'experience updated' });
        return res.status(200).json({
          id: exp.id,
          userId: updatedExp.userId,
          companyName: updatedExp.companyName,
          role: updatedExp.role,
          startDate: updatedExp.startDate,
          endDate: updatedExp.endDate,
        });
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.delete(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const exp = await experienceService.findById(req.params.id);

        if (!exp) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        await experienceService.delete(req.params.id);

        res.sendStatus(204);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  return router;
};
