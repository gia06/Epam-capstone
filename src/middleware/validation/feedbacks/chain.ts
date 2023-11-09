import { check, param, query, ValidationChain } from 'express-validator';
import { FeedbacksCustomValidators } from './custom';
import { validateAuth } from '../auth/chain';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';
import { FeedbackService } from '../../../services/feedback.service';

interface Chain {
  getAll: ValidationChain[];
  create: ValidationChain[];
  update: ValidationChain[];
  delete: ValidationChain[];
}

export const validateFeedbacks = (
  feedbackService: FeedbackService,
  userService?: UserService,
  cacheService?: CacheService
): Chain => {
  const customValidators = new FeedbacksCustomValidators(
    feedbackService,
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
      check('toUser')
        .notEmpty()
        .withMessage('toUser field is required')
        .custom(customValidators.toUser()),
      check('content')
        .notEmpty()
        .withMessage('field content is required')
        .isLength({ max: 128 })
        .withMessage('max length for content is 128'),
    ],
    update: [
      param('id').custom(customValidators.updateId),
      check('companyName').notEmpty().withMessage('companyName field is required'),
      check('toUser')
        .notEmpty()
        .withMessage('toUser field is required')
        .custom(customValidators.toUser()),
      check('content').notEmpty().withMessage('field content is required'),
    ],
    delete: [param('id').custom(customValidators.updateId)],
  };
};
