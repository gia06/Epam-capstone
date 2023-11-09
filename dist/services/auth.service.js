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
exports.AuthService = void 0;
const bcrypt_1 = require("../libs/bcrypt");
const bcrypt_2 = require("../libs/bcrypt");
const user_model_1 = require("../models/user.model");
class AuthService {
    constructor(user) {
        this.user = user;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findAll();
        });
    }
    create(user, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.user.build(user);
            newUser.role = user_model_1.UserRole.User;
            newUser.password = yield (0, bcrypt_2.generateHash)(user.password);
            newUser.image = `${avatar.destination}/${avatar.originalname}`;
            yield newUser.save();
            return newUser;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findOne({ where: { email } });
            return user;
        });
    }
    comparePassword(password, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.comparePassword)(password, storedPassword);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findOne({ where: { id } });
            return user;
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map