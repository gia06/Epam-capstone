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
exports.makeUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const roles_1 = require("../middleware/roles");
const user_model_1 = require("../models/user.model");
const paginate_1 = require("../middleware/paginate");
const logger_1 = require("../libs/logger");
const validation_1 = require("../middleware/validation");
const chain_1 = require("../middleware/validation/users/chain");
const validUser_1 = require("../middleware/validation/validUser");
const makeUsersRouter = ({ services: { userService, cacheService }, }) => {
    const router = express_1.default.Router();
    router.get('/', (0, roles_1.roles)([user_model_1.UserRole.Admin]), (0, chain_1.validateUsers)(userService).getAll, validation_1.handleValidations, (0, paginate_1.paginate)(userService), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.logger.info({ id: req.id, message: 'Users loaded' });
            return res.status(200).json(res.locals.data);
        }
        catch (err) {
            logger_1.logger.info(err);
            res.sendStatus(505);
        }
    }));
    router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userService.findById(req.params.id);
            if (!user) {
                logger_1.logger.error({ id: req.id, message: 'User not found' });
                return res.sendStatus(404);
            }
            logger_1.logger.info({ id: req.id, message: 'User loaded' });
            return res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                summary: user.summary,
                email: user.email,
                role: user.role,
            });
        }
        catch (error) {
            logger_1.logger.error({ id: req.id, error });
            res.sendStatus(505);
        }
    }));
    router.get('/:userId/cv', (0, validUser_1.validUser)(userService), (0, chain_1.validateUsers)(userService, cacheService).getCv, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { cv } = res.locals;
            return res.status(200).json(cv);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/', (0, roles_1.roles)([user_model_1.UserRole.Admin]), multer_1.upload.single('avatar'), (0, chain_1.validateUsers)(userService).create, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.file) {
                logger_1.logger.error({ id: req.id, message: 'Image file not found' });
                return res.sendStatus(400);
            }
            const user = yield userService.create(req.body, req.file);
            logger_1.logger.info({ id: req.id, message: 'User created' });
            return res.status(201).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                summary: user.summary,
                email: user.email,
                role: user.role,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.put('/:id', multer_1.upload.single(''), (0, chain_1.validateUsers)(userService).update, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userService.findById(req.params.id);
            if (!user) {
                logger_1.logger.error({ id: req.id, message: 'User not found' });
                return res.sendStatus(404);
            }
            const updatedUser = yield userService.update(req.params.id, req.body);
            yield cacheService.delete(user.id);
            logger_1.logger.info({ id: req.id, message: 'User updated' });
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete('/:id', (0, roles_1.roles)([user_model_1.UserRole.Admin, user_model_1.UserRole.User]), (0, chain_1.validateUsers)(userService).delete, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userService.findById(req.params.id);
            if (!user) {
                logger_1.logger.error({ id: req.id, message: 'User not found' });
                return res.sendStatus(404);
            }
            yield userService.delete(req.params.id);
            yield (0, multer_1.deleteUserDirectory)(user.email);
            yield cacheService.delete(user.id);
            logger_1.logger.info({ id: req.id, message: 'User deleted' });
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeUsersRouter = makeUsersRouter;
//# sourceMappingURL=users.js.map