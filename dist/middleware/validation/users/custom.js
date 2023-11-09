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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersCustomValidators = void 0;
const logger_1 = require("../../../libs/logger");
const jwt_1 = require("../../../libs/jwt");
class UsersCustomValidators {
    constructor(userService, cacheService) {
        this.userService = userService;
        this.cacheService = cacheService;
    }
    pageSize() {
        return (pageSize, { req }) => {
            const { page } = req.query;
            if (!(pageSize || page) || (pageSize && page)) {
                req.res.locals.pageSize = pageSize;
                return true;
            }
            throw new Error('there should be both pageSize and page or neither');
        };
    }
    updateId() {
        return (id, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(id);
            if (!user) {
                throw new Error('user not found');
            }
            const tokenId = (yield (0, jwt_1.decodeJwt)(req.headers.authorization)).id;
            if (tokenId !== id) {
                throw new Error(`Cant update other user's account`);
            }
        });
    }
    updateEmail() {
        return (email, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(email);
            if (user) {
                throw new Error('user with provided email already exists');
            }
        });
    }
    deleteId() {
        return (userId, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(userId);
            if (!user) {
                throw new Error('user not found');
            }
            const { id, role } = yield (0, jwt_1.decodeJwt)(req.headers.authorization);
            if (role === 'Admin') {
                return true;
            }
            if (id !== userId) {
                throw new Error(`Cant update other user's account`);
            }
        });
    }
    getCv() {
        return (userId, { req }) => __awaiter(this, void 0, void 0, function* () {
            try {
                let cv = yield this.cacheService.findById(userId);
                if (!cv) {
                    cv = yield this.userService.aggregate(userId);
                    yield this.cacheService.create(userId, JSON.stringify(cv));
                    logger_1.logger.info({ id: req.id, message: `user with id - ${userId} was cached` });
                }
                else {
                    logger_1.logger.info('user loaded from cache');
                }
                req.res.locals.cv = cv;
            }
            catch (err) {
                logger_1.logger.error(err);
            }
        });
    }
}
exports.UsersCustomValidators = UsersCustomValidators;
//# sourceMappingURL=custom.js.map