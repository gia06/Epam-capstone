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
exports.ProjectService = void 0;
class ProjectService {
    constructor(project) {
        this.project = project;
    }
    create(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = this.project.build(project);
            yield newProject.save();
            return newProject;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.project.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.project.findOne({ where: { id } });
        });
    }
    update(id, newProject) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedProject = yield this.project.findOne({ where: { id } });
            storedProject.image = newProject.image;
            storedProject.description = newProject.description;
            yield storedProject.save();
            return storedProject;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.project.destroy({ where: { id } });
        });
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map