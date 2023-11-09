"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFeedbackRouter = void 0;
const multer_1 = require("../middleware/multer");
const express_1 = __importDefault(require("express"));
const logger_1 = require("../libs/logger");
const validation_1 = require("../middleware/validation");
const paginate_1 = require("../middleware/paginate");
const chain_1 = require("../middleware/validation/feedbacks/chain");
const user_model_1 = require("../models/user.model");
const roles_1 = require("../middleware/roles");
const makeFeedbackRouter = ({ services: { feedbackService, userService, cacheService }, }) => {
    const router = express_1.default.Router();
    router.get('/', (0, roles_1.roles)([user_model_1.UserRole.Admin]), (0, chain_1.validateFeedbacks)(feedbackService).getAll, validation_1.handleValidations, (0, paginate_1.paginate)(feedbackService), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.logger.info({ id: req.id, message: 'list of experiences loaded' });
            return res.status(200).json(res.locals.data);
        }
        catch (error) {
            next(error);
        }
    }));
    router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const feedback = yield feedbackService.findById(req.params.id);
            if (!feedback) {
                logger_1.logger.error({ id: req.id, message: 'feedback not found' });
                return res.sendStatus(404);
            }
            logger_1.logger.info({ id: req.id, message: 'feedback loaded' });
            return res.status(200).json({
                fromUser: feedback.fromUser,
                companyName: feedback.companyName,
                toUser: feedback.toUser,
                content: feedback.content,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), multer_1.upload.single(''), (0, chain_1.validateFeedbacks)(feedbackService, userService).create, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const feedback = yield feedbackService.create(req.body);
            yield cacheService.delete(feedback.fromUser);
            yield cacheService.delete(feedback.toUser);
            logger_1.logger.info({ id: req.id, message: 'experience created' });
            return res.status(201).json(feedback);
        }
        catch (error) {
            logger_1.logger.error({ id: req.id, error });
        }
    }));
    router.put('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), multer_1.upload.single(''), (0, chain_1.validateFeedbacks)(feedbackService).update, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const feedback = yield feedbackService.findById(req.params.id);
            if (!feedback) {
                logger_1.logger.error({ id: req.id, message: 'Experience not found' });
                return res.sendStatus(404);
            }
            const updatedExp = yield feedbackService.update(req.params.id, req.body);
            const { id, fromUser, companyName, toUser, content } = updatedExp;
            logger_1.logger.error({ id: req.id, message: 'experience updated' });
            return res.status(200).json({
                id,
                fromUser,
                companyName,
                toUser,
                content,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exp = yield feedbackService.findById(req.params.id);
            if (!exp) {
                logger_1.logger.error({ id: req.id, message: 'Experience not found' });
                return res.sendStatus(404);
            }
            yield feedbackService.delete(req.params.id);
            res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeFeedbackRouter = makeFeedbackRouter;
//# sourceMappingURL=feedbacks.js.map