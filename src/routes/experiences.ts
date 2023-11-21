import express, { NextFunction, Response } from 'express';
import { Context } from '../interfaces/general';
import { RouterFactory } from '../interfaces/general';
import { ExtendedRequest } from '../interfaces/express';
import { roles } from '../middleware/roles';
import { UserRole } from '../models/user.model';
import { upload } from '../middleware/multer';
import { paginate } from '../middleware/paginate';
import { logger } from '../libs/logger';
import { validateExperiences } from '../middleware/validation/experiences/chain';
import { handleValidations } from '../middleware/validation';
import { decodeJwt } from '../libs/jwt';

export const makeExperienceRouter: RouterFactory = ({
  services: { experienceService, cacheService },
}: Context) => {
  const router = express.Router();

  router.get(
    '/',
    roles([UserRole.Admin]),
    paginate(experienceService),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        logger.info({ id: req.id, message: 'list of experiences loaded' });
        return res.status(200).json(res.locals.data);
      } catch (error) {
        next(error);
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
      next(error);
    }
  });

  router.post(
    '/',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    validateExperiences(experienceService).create,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { id } = await decodeJwt(req.headers.authorization);
        const experience = await experienceService.create(id, req.body);
        await cacheService.delete(experience.userId);

        logger.info({ id: req.id, message: 'experience created' });
        return res.status(201).json(experience);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    validateExperiences(experienceService).update,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const exp = await experienceService.findById(req.params.id);

        if (!exp) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        const updatedExp = await experienceService.update(req.params.id, req.body);
        await cacheService.delete(exp.userId);

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
        next(error);
      }
    }
  );

  router.delete(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    validateExperiences(experienceService).delete,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const exp = await experienceService.findById(req.params.id);

        if (!exp) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        await experienceService.delete(req.params.id);
        await cacheService.delete(exp.userId);

        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
