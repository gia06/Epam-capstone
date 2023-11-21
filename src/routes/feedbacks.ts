import { upload } from '../middleware/multer';
import { Context, RouterFactory } from '../interfaces/general';
import express, { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../interfaces/express';
import { decodeJwt } from '../libs/jwt';
import { logger } from '../libs/logger';
import { handleValidations } from '../middleware/validation';
import { paginate } from '../middleware/paginate';
import { validateFeedbacks } from '../middleware/validation/feedbacks/chain';
import { UserRole } from '../models/user.model';
import { roles } from '../middleware/roles';

export const makeFeedbackRouter: RouterFactory = ({
  services: { feedbackService, userService, cacheService },
}: Context) => {
  const router = express.Router();

  router.get(
    '/',
    roles([UserRole.Admin]),
    validateFeedbacks(feedbackService).getAll,
    handleValidations,
    paginate(feedbackService),
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
      const feedback = await feedbackService.findById(req.params.id);

      if (!feedback) {
        logger.error({ id: req.id, message: 'feedback not found' });
        return res.sendStatus(404);
      }

      logger.info({ id: req.id, message: 'feedback loaded' });
      return res.status(200).json({
        fromUser: feedback.fromUser,
        companyName: feedback.companyName,
        toUser: feedback.toUser,
        content: feedback.content,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    validateFeedbacks(feedbackService, userService).create,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { id } = await decodeJwt(req.headers.authorization);
        const feedback = await feedbackService.create(id, req.body);

        await cacheService.delete(feedback.fromUser);
        await cacheService.delete(feedback.toUser);

        logger.info({ id: req.id, message: 'experience created' });
        return res.status(201).json(feedback);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    validateFeedbacks(feedbackService).update,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const feedback = await feedbackService.findById(req.params.id);

        if (!feedback) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        const updatedExp = await feedbackService.update(req.params.id, req.body);
        await cacheService.delete(feedback.fromUser);
        const { id, fromUser, companyName, toUser, content } = updatedExp;

        logger.error({ id: req.id, message: 'experience updated' });
        return res.status(200).json({
          id,
          fromUser,
          companyName,
          toUser,
          content,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const exp = await feedbackService.findById(req.params.id);

        if (!exp) {
          logger.error({ id: req.id, message: 'Experience not found' });
          return res.sendStatus(404);
        }

        await feedbackService.delete(req.params.id);
        await cacheService.delete(exp.fromUser);

        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
