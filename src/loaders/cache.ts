import { RedisClient, createClient } from 'redis';
import { config } from '../config';
import { logger } from '../libs/logger';

export const loadRedis = (): RedisClient => {
  const client: RedisClient = createClient({
    ...config.redis,
  });

  client.on('connect', () => {
    logger.info('Connected to Redis');
  });

  client.on('error', (error) => {
    logger.error('Error connecting to Redis:', error);
  });

  return client;
};
