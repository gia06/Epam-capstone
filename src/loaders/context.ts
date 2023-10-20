import { UserService } from '../services/user.service';
import { Context, Models } from '../interfaces/general';
import { AuthService } from '../services/auth.service';
import { ExperienceService } from '../services/exprience.service';
import { ProjectService } from '../services/project.service';

export const loadContext = async (models: Models): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(models.user),
      userService: new UserService(models.user, models.project, models.experience),
      experienceService: new ExperienceService(models.experience),
      projectService: new ProjectService(models.project),
    },
  };
};
