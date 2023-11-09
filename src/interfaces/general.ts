import express from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedback.model';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { UserService } from '../services/user.service';
import { ExperienceService } from '../services/exprience.service';
import { ProjectService } from '../services/project.service';
import { CacheService } from '../services/cache.service';
import { FeedbackService } from '../services/feedback.service';

export interface Context {
  services: {
    authService: AuthService;
    userService: UserService;
    experienceService: ExperienceService;
    projectService: ProjectService;
    feedbackService: FeedbackService;
    cacheService: CacheService;
  };
}

export type RouterFactory = (context: Context) => express.Router;

export type Loader = (app: express.Application, context: Context) => void;

export interface Models {
  user: typeof User;
  feedback: typeof Feedback;
  project: typeof Project;
  experience: typeof Experience;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
