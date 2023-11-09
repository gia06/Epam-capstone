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
exports.makeAuthRouter = void 0;
const multer_1 = require("../middleware/multer");
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../libs/jwt");
const logger_1 = require("../libs/logger");
const chain_1 = require("../middleware/validation/auth/chain");
const validation_1 = require("../middleware/validation");
const makeAuthRouter = ({ services: { authService, userService }, }) => {
    const router = express_1.default.Router();
    router.post('/register', multer_1.upload.single('avatar'), (0, chain_1.validateAuth)(userService).register, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { file } = req;
            const user = yield authService.create(req.body, file);
            logger_1.logger.info({ id: req.id, message: 'user created' });
            return res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/login', multer_1.upload.single(''), (0, chain_1.validateAuth)(userService).login, validation_1.handleValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = res.locals;
            const token = yield (0, jwt_1.signJwt)({ id: user.id, email: user.email, role: user.role });
            logger_1.logger.info({ id: req.id, message: 'user logged in' });
            return res.status(200).json({
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    title: user.title,
                    summary: user.summary,
                    email: user.email,
                    image: user.image,
                },
                token,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.makeAuthRouter = makeAuthRouter;
//# sourceMappingURL=auth.js.map