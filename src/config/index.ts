import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
  };
  auth: {
    secret: string;
  };
}

const configs: {
  development: Config;
} = {
  development: {
    db: {
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    },
    auth: {
      secret: process.env.SECRET,
    },
  },
};

const getConfig = (): Config => {
  if (!process.env.NODE_ENV) {
    throw new Error(
      'Env parameter NODE_ENV must be specified! Possible values are "development", ...'
    );
  }

  const env = process.env.NODE_ENV as 'development';

  if (!configs[env]) {
    throw new Error(
      'Unsupported NODE_ENV value was provided! Possible values are "development", ...'
    );
  }

  return configs[env];
};

export const config = getConfig();
