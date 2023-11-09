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
exports.makeProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const user_model_1 = require("../models/user.model");
const roles_1 = require("../middleware/roles");
const paginate_1 = require("../middleware/paginate");
const logger_1 = require("../libs/logger");
const makeProjectRouter = ({ services: { projectService, cacheService }, }) => {
    const router = express_1.default.Router();
    router.get('/', 
    // roles([UserRole.Admin]),
    (0, paginate_1.paginate)(projectService), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.logger.info({ id: req.id, message: 'Projects loaded' });
            return res.status(200).json(res.locals.data);
        }
        catch (error) {
            next(error);
        }
    }));
    router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield projectService.findById(req.params.id);
            if (!project) {
                logger_1.logger.error({ id: req.id, message: 'Project not found' });
                return res.sendStatus(404);
            }
            const { id, userId, image, description } = project;
            logger_1.logger.error({ id: req.id, message: 'Project loaded' });
            return res.status(200).json({ id, userId, image, description });
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/', multer_1.upload.single(''), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield projectService.create(req.body);
            yield cacheService.delete(project.userId);
            logger_1.logger.info({ id: req.id, message: 'Project created' });
            return res.status(201).json(project);
        }
        catch (error) {
            next(error);
        }
    }));
    router.put('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), multer_1.upload.single(''), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield projectService.findById(req.params.id);
            if (!project) {
                logger_1.logger.error({ id: req.id, message: 'Project not found' });
                return res.sendStatus(404);
            }
            const updatedProject = yield projectService.update(req.params.id, req.body);
            const { id, userId, image, description } = updatedProject;
            logger_1.logger.info({ id: req.id, message: 'Project updated' });
            return res.status(200).json({
                id,
                userId,
                image,
                description,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield projectService.findById(req.params.id);
            if (!project) {
                logger_1.logger.error({ id: req.id, message: 'Project not found' });
                return res.sendStatus(404);
            }
            logger_1.logger.info({ id: req.id, message: 'Project deleted' });
            yield projectService.delete(req.params.id);
            res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeProjectRouter = makeProjectRouter;
//# sourceMappingURL=projects.js.map