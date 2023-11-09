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
exports.ExperienceService = void 0;
class ExperienceService {
    constructor(experience) {
        this.experience = experience;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.experience.findAll();
        });
    }
    create(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newExp = this.experience.build(exp);
                yield newExp.save();
                return newExp;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.experience.findOne({ where: { id } });
        });
    }
    update(id, newExp) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedExp = yield this.experience.findOne({ where: { id } });
            storedExp.companyName = newExp.companyName;
            storedExp.role = newExp.role;
            storedExp.startDate = newExp.startDate;
            storedExp.endDate = newExp.endDate;
            storedExp.description = newExp.description;
            yield storedExp.save();
            return storedExp;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.experience.destroy({ where: { id } });
        });
    }
}
exports.ExperienceService = ExperienceService;
//# sourceMappingURL=exprience.service.js.map