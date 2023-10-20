import { Response, NextFunction } from 'express';
import { logger } from '../libs/logger';
import { Context } from '../interfaces/general';
import { ExtendedRequest } from '../interfaces/express';

type Service =
  | Context['services']['userService']
  | Context['services']['projectService']
  | Context['services']['experienceService'];

interface QueryParams {
  pageSize?: number;
  page?: number;
}

export const paginate = (service: Service) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const data = await service.findAll();
      if (!data) {
        logger.info({ id: req.id, message: 'no data was found' });
        return res.sendStatus(404);
      }

      const { pageSize, page }: QueryParams = req.query;

      if (!pageSize || !page) {
        res.locals.data = data;
        return next();
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = data.slice(startIndex, endIndex);

      console.log(paginatedData);
      res.locals.data = paginatedData;

      res.set('X-total-count', `${paginatedData.length}`);
      return next();
    } catch (err) {
      res.sendStatus(505);
      logger.info({ id: req.id, err });
    }
  };
};
