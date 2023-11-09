import { check, param, query, ValidationChain } from 'express-validator';
import { ProjectsCustomValidators } from './custom';
import { validateAuth } from '../auth/chain';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';
import { FeedbackService } from '../../../services/feedback.service';
import { ProjectService } from '../../../services/project.service';

interface Chain {
  getAll: ValidationChain[];
  create: ValidationChain[];
  update: ValidationChain[];
  delete: ValidationChain[];
}

export const validateProjects = (
  projectService: ProjectService,
  userService?: UserService,
  cacheService?: CacheService
): Chain => {
  const customValidators = new ProjectsCustomValidators(projectService, userService, cacheService);

  return {
    getAll: [query('pageSize').custom(customValidators.pageSize())],
    create: [
      check('projectName')
        .notEmpty()
        .withMessage('projectName field is required')
        .custom(customValidators.create()),
      check('description')
        .notEmpty()
        .withMessage('description field is required')
        .isLength({ max: 50 })
        .withMessage('max length for companyName is 50'),
    ],
    update: [
      check('projectName')
        .notEmpty()
        .withMessage('projectName field is required')
        .custom(customValidators.create()),
      check('description')
        .notEmpty()
        .withMessage('description field is required')
        .isLength({ max: 50 })
        .withMessage('max length for companyName is 50'),
    ],
    delete: [param('id').custom(customValidators.updateId)],
  };
};
