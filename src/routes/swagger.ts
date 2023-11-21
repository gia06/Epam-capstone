import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const makeSwaggerRouter = (): Router => {
  const router = Router();

  const indexDoc = YAML.load('./src/docs/index.yaml');
  const authDoc = YAML.load('./src/docs/paths/auth.yaml');
  const usersDoc = YAML.load('./src/docs/paths/users.yaml');
  const expDoc = YAML.load('./src/docs/paths/experience.yaml');
  const feedDoc = YAML.load('./src/docs/paths/feedback.yaml');
  const projectsDoc = YAML.load('./src/docs/paths/projects.yaml');

  indexDoc.paths = { ...authDoc, ...usersDoc, ...expDoc, ...feedDoc, ...projectsDoc };

  router.use('/', swaggerUi.serve, swaggerUi.setup(indexDoc));

  return router;
};
