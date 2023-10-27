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

  // const create = validateAuth(feedbackService).register;

  return {
    getAll: [query('pageSize').custom(customValidators.pageSize())],
    create: [
      check('fromUser')
        .notEmpty()
        .withMessage('fromUser field is required')
        .custom(customValidators.fromUser()),
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
      check('fromUser')
        .notEmpty()
        .withMessage('fromUser field is required')
        .custom(customValidators.fromUser()),
      check('companyName').notEmpty().withMessage('companyName field is required'),
      check('toUser')
        .notEmpty()
        .withMessage('toUser field is required')
        .custom(customValidators.toUser()),
      check('content').notEmpty().withMessage('field content is required'),
    ],
  };
};
