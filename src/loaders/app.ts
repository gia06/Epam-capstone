import { loadMiddlewares } from './middlewares';
import { loadRoutes } from './routes';
import express from 'express';
import { loadContext } from './context';
import { loadModels } from './models';
import { loadSequelize } from './sequelize';
import { config } from '../config';
import { loadPassport } from './passport';
import { loadRedis } from './cache';
import * as dotenv from 'dotenv';

export const loadApp = async () => {
  dotenv.config();

  const app = express();
  const sequelize = loadSequelize(config);
  const redisClient = loadRedis();

  const models = loadModels(sequelize);

  const context = await loadContext(models, redisClient);

  loadPassport(app, context);
  loadMiddlewares(app, context);
  loadRoutes(app, context);

  return app;
};
