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
exports.FeedbacksCustomValidators = void 0;
class FeedbacksCustomValidators {
    constructor(feedbackService, userService, cacheService) {
        this.feedbackService = feedbackService;
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
    fromUser() {
        return (fromUser, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(fromUser);
            if (!user) {
                throw new Error('fromUser field should be valid user id');
            }
        });
    }
    toUser() {
        return (fromUser, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(fromUser);
            if (!user) {
                throw new Error('toUser field should be valid user id');
            }
        });
    }
}
exports.FeedbacksCustomValidators = FeedbacksCustomValidators;
//# sourceMappingURL=custom.js.map