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
exports.AuthCustomValidators = void 0;
const logger_1 = require("../../../libs/logger");
class AuthCustomValidators {
    constructor(userService) {
        this.userService = userService;
    }
    registerEmail() {
        return (email, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(email);
            if (user) {
                logger_1.logger.error(`User with provided email already exists`);
                throw new Error(`User with provided email already exists`);
            }
            return true;
        });
    }
    registerAvatar() {
        return (avatar, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                throw new Error('avatar is required field');
            }
        });
    }
    loginEmail() {
        return (email, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(email);
            if (!user) {
                throw new Error(`user with provided email doesn't exist`);
            }
            req.res.locals.user = user;
        });
    }
    loginPassword() {
        return (password, { req }) => __awaiter(this, void 0, void 0, function* () {
            const { user } = req.res.locals;
            if (!user) {
                return false;
            }
            const comparisonResult = yield this.userService.comparePassword(password, user.password);
            if (!comparisonResult) {
                throw new Error('Incorrect password');
            }
        });
    }
}
exports.AuthCustomValidators = AuthCustomValidators;
//# sourceMappingURL=custom.js.map