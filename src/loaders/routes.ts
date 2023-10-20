import express from 'express';
import { Context } from '../interfaces/general';
import { makeAuthRouter } from '../routes/auth';
import requestId from 'express-request-id';
import { makeUsersRouter } from '../routes/users';
import passport from 'passport';
import { makeExperienceRouter } from '../routes/experiences';
import { makeProjectRouter } from '../routes/projects';

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use(requestId());

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
};
