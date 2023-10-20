import { Feedback } from '../models/feedback.model';
import { Models } from '../interfaces/general';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';

export const loadModels = (sequelize: Sequelize): Models => {
  const models: Models = {
    user: User,
    feedback: Feedback,
    project: Project,
    experience: Experience,
  };

  for (const model of Object.values(models)) {
    model.defineSchema(sequelize);
  }

  for (const model of Object.values(models)) {
    model.associate(models, sequelize);
  }

  return models;
};
