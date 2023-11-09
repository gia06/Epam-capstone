import { check, param, query, ValidationChain } from 'express-validator';
import { ExperiencesCustomValidators } from './custom';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';
import { ExperienceService } from '../../../services/exprience.service';

interface Chain {
  getAll: ValidationChain[];
  create: ValidationChain[];
  update: ValidationChain[];
  delete: ValidationChain[];
}

export const validateExperiences = (
  experienceService: ExperienceService,
  userService?: UserService,
  cacheService?: CacheService
): Chain => {
  const customValidators = new ExperiencesCustomValidators(
    experienceService,
    userService,
    cacheService
  );

  return {
    getAll: [query('pageSize').custom(customValidators.pageSize())],
    create: [
      check('companyName')
        .notEmpty()
        .withMessage('companyName field is required')
        .isLength({ max: 50 })
        .withMessage('max length for companyName is 50'),
      check('role').notEmpty().withMessage('role field is required'),
      check('startDate')
        .notEmpty()
        .withMessage('startDate field is required')
        .isISO8601()
        .withMessage('startDate should be a valid date string'),
      check('endDate')
        .notEmpty()
        .withMessage('field endDate is required')
        .isISO8601()
        .withMessage('startDate should be a valid date string'),
      check('description')
        .notEmpty()
        .withMessage('field description should be a valid date string'),
    ],
    update: [
      param('id').custom(customValidators.updateId),
      check('companyName')
        .notEmpty()
        .withMessage('companyName field is required')
        .isLength({ max: 50 })
        .withMessage('max length for companyName is 50'),
      check('role').notEmpty().withMessage('role field is required'),
      check('startDate')
        .notEmpty()
        .withMessage('startDate field is required')
        .isISO8601()
        .withMessage('startDate should be a valid date string'),
      check('endDate')
        .notEmpty()
        .withMessage('field endDate is required')
        .isISO8601()
        .withMessage('startDate should be a valid date string'),
      check('description')
        .notEmpty()
        .withMessage('field description should be a valid date string'),
    ],
    delete: [
      param('id').notEmpty().withMessage('id param is required').custom(customValidators.updateId),
    ],
  };
};
