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
exports.UserService = void 0;
const bcrypt_1 = require("../libs/bcrypt");
const auth_service_1 = require("./auth.service");
const project_model_1 = require("../models/project.model");
const experience_model_1 = require("../models/experience.model");
class UserService extends auth_service_1.AuthService {
    constructor(user, project, experience) {
        super(user);
        this.project = project;
        this.experience = experience;
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.user.destroy({ where: { id } });
        });
    }
    update(id, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedUser = yield this.findById(id);
            storedUser.firstName = newUser.firstName;
            storedUser.lastName = newUser.lastName;
            storedUser.title = newUser.title;
            storedUser.summary = newUser.summary;
            storedUser.email = newUser.email;
            storedUser.password = yield (0, bcrypt_1.generateHash)(newUser.password);
            yield storedUser.save();
            return storedUser;
        });
    }
    aggregate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findOne({ where: { id }, include: [project_model_1.Project, experience_model_1.Experience] });
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map