import { CustomValidator } from 'express-validator';
import { logger } from '../../../libs/logger';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';
import { FeedbackService } from '../../../services/feedback.service';
import { ExperienceService } from '../../../services/exprience.service';
import { decodeJwt } from '../../../libs/jwt';

export class ExperiencesCustomValidators {
  experienceService: ExperienceService;
  cacheService: CacheService;
  userService: UserService;

  constructor(
    experienceService: ExperienceService,
    userService: UserService,
    cacheService: CacheService
  ) {
    this.experienceService = experienceService;
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

  updateId(): CustomValidator {
    return async (expId: string, { req }) => {
      const exp = await this.experienceService.findById(expId);

      const { id, role } = await decodeJwt(req.headers.authorization);

      if (role === 'Admin') {
        return true;
      }

      if (exp.userId !== id) {
        throw new Error(`Cant update other user's account`);
      }
    };
  }
}
