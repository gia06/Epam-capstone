import express from 'express';
import { Context } from '../interfaces/general';
import { RouterFactory } from '../interfaces/general';
import { upload } from '../middleware/multer';
import { UserRole } from '../models/user.model';
import { roles } from '../middleware/roles';
import { ExtendedRequest } from '../interfaces/express';
import { Response, NextFunction } from 'express';
import { paginate } from '../middleware/paginate';
import { logger } from '../libs/logger';

export const makeProjectRouter: RouterFactory = ({ services: { projectService } }: Context) => {
  const router = express.Router();

  router.get(
    '/',
    // roles([UserRole.Admin]),
    paginate(projectService),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        logger.info({ id: req.id, message: 'Projects loaded' });
        return res.status(200).json(res.locals.data);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.get('/:id', async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.findById(req.params.id);

      if (!project) {
        logger.error({ id: req.id, message: 'Project not found' });

        return res.sendStatus(404);
      }

      const { id, userId, image, description } = project;

      logger.error({ id: req.id, message: 'Project loaded' });
      return res.status(200).json({ id, userId, image, description });
    } catch (error) {
      logger.error({ id: req.id, error });
      res.sendStatus(505);
    }
  });

  router.post(
    '/',
    upload.single(''),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const project = await projectService.create(req.body);

        logger.info({ id: req.id, message: 'Project created' });
        return res.status(201).json(project);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  router.put(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const project = await projectService.findById(req.params.id);

        if (!project) {
          logger.error({ id: req.id, message: 'Project not found' });
          return res.sendStatus(404);
        }

        const updatedProject = await projectService.update(req.params.id, req.body);

        const { id, userId, image, description } = updatedProject;

        logger.info({ id: req.id, message: 'Project updated' });
        return res.status(200).json({
          id,
          userId,
          image,
          description,
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
        const project = await projectService.findById(req.params.id);

        if (!project) {
          logger.error({ id: req.id, message: 'Project not found' });
          return res.sendStatus(404);
        }

        logger.info({ id: req.id, message: 'Project deleted' });
        await projectService.delete(req.params.id);

        res.sendStatus(204);
      } catch (error) {
        logger.error({ id: req.id, error });
        res.sendStatus(505);
      }
    }
  );

  return router;
};
