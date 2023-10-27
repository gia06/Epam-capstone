import { UserService } from '../services/user.service';
import { Context, Models } from '../interfaces/general';
import { AuthService } from '../services/auth.service';
import { ExperienceService } from '../services/exprience.service';
import { ProjectService } from '../services/project.service';
import { RedisClient } from 'redis';
import { CacheService } from '../services/cache.service';
import { FeedbackService } from '../services/feedback.service';

export const loadContext = async (models: Models, client: RedisClient): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(models.user),
      userService: new UserService(models.user, models.project, models.experience),
      experienceService: new ExperienceService(models.experience),
      projectService: new ProjectService(models.project),
      feedbackService: new FeedbackService(models.feedback),
      cacheService: new CacheService(client),
    },
  };
};
