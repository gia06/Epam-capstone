import { Application } from 'express';
import { logger } from './libs/logger';
import { loadApp } from './loaders/app';

// (async () => {
//   const app = await loadApp();

//   app.listen(3001, () => logger.info(`Application is running on http://localhost:3001`));
// })();

export const testApp = (): Promise<Application> => {
  return new Promise(async (resolve) => {
    const server = await loadApp();
    server.listen(0, () => {
      console.log('Express server is listening on http://localhost:3000');
      resolve(server);
    });
  });
};
