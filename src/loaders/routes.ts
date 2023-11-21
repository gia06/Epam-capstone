import express from 'express';
import { Context } from '../interfaces/general';
import { makeUsersRouter } from '../routes/users';
import passport from 'passport';
import { makeExperienceRouter } from '../routes/experiences';
import { makeProjectRouter } from '../routes/projects';
import { errorHandler } from '../middleware/errorHandler';
import { makeAuthRouter } from '../routes/auth';
import { makeFeedbackRouter } from '../routes/feedbacks';
import { makeSwaggerRouter } from '../routes/swagger';

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use('/api/swagger', makeSwaggerRouter());

  app.use('/api/auth', makeAuthRouter(context));

  app.use('/api/users', passport.authenticate('jwt', { session: false }), makeUsersRouter(context));

  app.use(
    '/api/experience',
    passport.authenticate('jwt', { session: false }),
    makeExperienceRouter(context)
  );

  app.use(
    '/api/projects',
    passport.authenticate('jwt', { session: false }),
    makeProjectRouter(context)
  );

  app.use(
    '/api/feedback',
    passport.authenticate('jwt', { session: false }),
    makeFeedbackRouter(context)
  );

  app.use(errorHandler);
};
