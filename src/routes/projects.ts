import express from 'express';
import { Context } from '../interfaces/general';
import { RouterFactory } from '../interfaces/general';
import { deleteProjectImage, projectUpload, upload } from '../middleware/multer';
import { UserRole } from '../models/user.model';
import { roles } from '../middleware/roles';
import { ExtendedRequest } from '../interfaces/express';
import { Response, NextFunction } from 'express';
import { paginate } from '../middleware/paginate';
import { logger } from '../libs/logger';
import { decodeJwt } from '../libs/jwt';
import { decode } from 'punycode';
import { validateProjects } from '../middleware/validation/projects/chain';
import { handleValidations } from '../middleware/validation';

export const makeProjectRouter: RouterFactory = ({
  services: { projectService, cacheService },
}: Context) => {
  const router = express.Router();

  router.get(
    '/',
    roles([UserRole.Admin, UserRole.User]),
    paginate(projectService),
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        logger.info({ id: req.id, message: 'Projects loaded' });
        return res.status(200).json(res.locals.data);
      } catch (error) {
        next(error);
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
      next(error);
    }
  });

  router.post(
    '/',
    projectUpload.single('image'),
    validateProjects(projectService).create,
    handleValidations,
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      try {
        const { id } = await decodeJwt(req.headers.authorization);
        const project = await projectService.create(id, req.body, req.file);
        await cacheService.delete(project.userId);

        logger.info({ id: req.id, message: 'Project created' });
        return res.status(201).json(project);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    roles([UserRole.Admin, UserRole.User]),
    upload.single(''),
    validateProjects(projectService).update,
    handleValidations,
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
        next(error);
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
        const { email } = await decodeJwt(req.headers.authorization);

        logger.info({ id: req.id, message: 'Project deleted' });
        await projectService.delete(req.params.id);
        await deleteProjectImage(email, project.projectName);

        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
