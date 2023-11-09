import { CustomValidator } from 'express-validator';
import { UserService } from '../../../services/user.service';
import { decodeJwt } from '../../../libs/jwt';
import { CacheService } from '../../../services/cache.service';
import { FeedbackService } from '../../../services/feedback.service';
import { User } from '../../../models/user.model';
import { ProjectService } from '../../../services/project.service';

export class ProjectsCustomValidators {
  projectService: ProjectService;
  cacheService: CacheService;
  userService: UserService;

  constructor(
    projectService: ProjectService,
    userService: UserService,
    cacheService: CacheService
  ) {
    this.projectService = projectService;
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

  create(): CustomValidator {
    return async (projectName: string, { req }) => {
      const project = await this.projectService.findByName(projectName);

      if (project) {
        throw new Error('project with this name already exists');
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

  updateId(): CustomValidator {
    return async (feedId: string, { req }) => {
      const feedback = await this.projectService.findById(feedId);

      const { role, id } = await decodeJwt(req.headers.authorization);

      if (role === 'Admin') {
        return true;
      }

      if (id !== feedback.userId) {
        throw new Error(`Cant update other user's account`);
      }
    };
  }
}
