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

  fromUser(): CustomValidator {
    return async (fromUser: string, { req }) => {
      const user = await this.userService.findById(fromUser);

      if (!user) {
        throw new Error('fromUser field should be valid user id');
      }
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

  // updateId(): CustomValidator {
  //   return async (id: string, { req }) => {
  //     const user = await this.userService.findById(id);

  //     if (!user) {
  //       throw new Error('user not found');
  //     }

  //     const tokenId = (await decodeJwt(req.headers.authorization)).id;

  //     if (tokenId !== id) {
  //       throw new Error(`Cant update other user's account`);
  //     }
  //   };
  // }

  // updateEmail(): CustomValidator {
  //   return async (email: string, { req }) => {
  //     const user = await this.userService.findByEmail(email);

  //     if (user) {
  //       throw new Error('user with provided email already exists');
  //     }
  //   };
  // }

  // deleteId(): CustomValidator {
  //   return async (userId: string, { req }) => {
  //     const user = await this.userService.findById(userId);

  //     if (!user) {
  //       throw new Error('user not found');
  //     }

  //     const { id, role } = await decodeJwt(req.headers.authorization);

  //     if (role === 'Admin') {
  //       return true;
  //     }

  //     if (id !== userId) {
  //       throw new Error(`Cant update other user's account`);
  //     }
  //   };
  // }
}
