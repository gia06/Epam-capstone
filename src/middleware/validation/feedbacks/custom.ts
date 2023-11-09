import { CustomValidator } from 'express-validator';
import { logger } from '../../../libs/logger';
import { UserService } from '../../../services/user.service';
import { decodeJwt } from '../../../libs/jwt';
import { CacheService } from '../../../services/cache.service';
import { FeedbackService } from '../../../services/feedback.service';
import { User } from '../../../models/user.model';

export class FeedbacksCustomValidators {
  feedbackService: FeedbackService;
  cacheService: CacheService;
  userService: UserService;

  constructor(
    feedbackService: FeedbackService,
    userService: UserService,
    cacheService: CacheService
  ) {
    this.feedbackService = feedbackService;
    this.userService = userService;
    this.cacheService = cacheService;
  }

  pageSize(): CustomValidator {
    return (pageSize: string, { req }) => {
      const { page } = req.query;

      if (!(pageSize || page) || (pageSize && page)) {
        req.res.locals.pageSize = pageSize;
        return true;
      }
      throw new Error('there should be both pageSize and page or neither');
    };
  }

  toUser(): CustomValidator {
    return async (fromUser: string, { req }) => {
      const user = await this.userService.findById(fromUser);

      if (!user) {
        throw new Error('toUser field should be valid user id');
      }
    };
  }

  updateId(): CustomValidator {
    return async (feedId: string, { req }) => {
      const feedback = await this.feedbackService.findById(feedId);

      const { role, id } = await decodeJwt(req.headers.authorization);

      if (role === 'Admin') {
        return true;
      }

      if (id !== feedback.fromUser) {
        throw new Error(`Cant update other user's account`);
      }
    };
  }
}
