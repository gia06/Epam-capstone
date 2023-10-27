import { check, param, query, ValidationChain } from 'express-validator';
import { UsersCustomValidators } from './custom';
import { validateAuth } from '../auth/chain';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';

interface Chain {
  create: ValidationChain[];
  getAll: ValidationChain[];
  update: ValidationChain[];
  delete: ValidationChain[];
  getCv: ValidationChain[];
}

export const validateUsers = (userService: UserService, cacheService?: CacheService): Chain => {
  const customValidators = new UsersCustomValidators(userService, cacheService);

  const create = validateAuth(userService).register;

  return {
    create,
    getAll: [query('pageSize').custom(customValidators.pageSize())],
    update: [
      param('id').custom(customValidators.updateId()),
      check('firstName')
        .notEmpty()
        .withMessage('firstName is required field')
        .isLength({ max: 40 })
        .withMessage('length for firstName field cannot be more than 40'),
      check('lastName')
        .notEmpty()
        .withMessage('lastName is required field')
        .isLength({ max: 40 })
        .withMessage('length for lastName field cannot be more than 40'),
      check('title')
        .notEmpty()
        .withMessage('title is required field')
        .isLength({ max: 30 })
        .withMessage('length for title field cannot be more than 40'),
      check('summary')
        .notEmpty()
        .withMessage('summary is required field')
        .isLength({ max: 256 })
        .withMessage('length for summary field cannot be more than 256'),
      check('email')
        .notEmpty()
        .withMessage('email is required field')
        .isLength({ min: 8, max: 255 })
        .withMessage('length for email field cannot be less than 8 and more than 255')
        .isEmail()
        .withMessage('field email should be a valid email address')
        .custom(customValidators.updateEmail()),
      check('password')
        .notEmpty()
        .isLength({ min: 8, max: 255 })
        .withMessage('length for password field cannot be less than 8 and more than 255'),
    ],
    delete: [param('id').custom(customValidators.deleteId())],
    getCv: [param('userId').custom(customValidators.getCv())],
  };
};
