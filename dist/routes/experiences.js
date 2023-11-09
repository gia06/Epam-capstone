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
exports.makeExperienceRouter = void 0;
const express_1 = __importDefault(require("express"));
const roles_1 = require("../middleware/roles");
const user_model_1 = require("../models/user.model");
const multer_1 = require("../middleware/multer");
const paginate_1 = require("../middleware/paginate");
const logger_1 = require("../libs/logger");
const makeExperienceRouter = ({ services: { experienceService, cacheService }, }) => {
    const router = express_1.default.Router();
    router.get('/', 
    // roles([UserRole.Admin]),
    (0, paginate_1.paginate)(experienceService), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.logger.info({ id: req.id, message: 'list of experiences loaded' });
            return res.status(200).json(res.locals.data);
        }
        catch (error) {
            logger_1.logger.error({ error });
            res.sendStatus(505);
        }
    }));
    router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exp = yield experienceService.findById(req.params.id);
            if (!exp) {
                logger_1.logger.error({ id: req.id, message: 'experience not found' });
                return res.sendStatus(404);
            }
            logger_1.logger.info({ id: req.id, message: 'Experience loaded' });
            return res.status(200).json({
                id: exp.id,
                userId: exp.userId,
                companyName: exp.companyName,
                role: exp.role,
                startDate: exp.startDate,
                endDate: exp.endDate,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), multer_1.upload.single(''), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const experience = yield experienceService.create(req.body);
            yield cacheService.delete(experience.userId);
            logger_1.logger.info({ id: req.id, message: 'experience created' });
            return res.status(201).json(experience);
        }
        catch (error) {
            next(error);
        }
    }));
    router.put('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), multer_1.upload.single(''), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exp = yield experienceService.findById(req.params.id);
            if (!exp) {
                logger_1.logger.error({ id: req.id, message: 'Experience not found' });
                return res.sendStatus(404);
            }
            const updatedExp = yield experienceService.update(req.params.id, req.body);
            logger_1.logger.error({ id: req.id, message: 'experience updated' });
            return res.status(200).json({
                id: exp.id,
                userId: updatedExp.userId,
                companyName: updatedExp.companyName,
                role: updatedExp.role,
                startDate: updatedExp.startDate,
                endDate: updatedExp.endDate,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exp = yield experienceService.findById(req.params.id);
            if (!exp) {
                logger_1.logger.error({ id: req.id, message: 'Experience not found' });
                return res.sendStatus(404);
            }
            yield experienceService.delete(req.params.id);
            res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeExperienceRouter = makeExperienceRouter;
//# sourceMappingURL=experiences.js.map