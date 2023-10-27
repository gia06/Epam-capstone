import cors from 'cors';
import { Loader } from '../interfaces/general';
import requestId from 'express-request-id';

export const loadMiddlewares: Loader = (app, context) => {
  app.use(requestId());
  app.use(cors());
};
