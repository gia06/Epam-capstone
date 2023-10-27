import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../../interfaces/express';
import { logger } from '../../libs/logger';
import { FeedbackService } from '../../services/feedback.service';

export const validFeedback = (feedbackService: FeedbackService) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const feedback = await feedbackService.findById(id);
    console.log(feedback);

    if (!feedback) {
      logger.error({ id: req.id, message: 'feedback not found' });
      return res.status(404).json({
        error: {
          msg: 'feedback not found',
          param: 'id',
          location: 'param',
        },
      });
    }
    req.res.locals = feedback;
    return next();
  };
};
