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
exports.loadContext = void 0;
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const exprience_service_1 = require("../services/exprience.service");
const project_service_1 = require("../services/project.service");
const cache_service_1 = require("../services/cache.service");
const feedback_service_1 = require("../services/feedback.service");
const loadContext = (models, client) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        services: {
            authService: new auth_service_1.AuthService(models.user),
            userService: new user_service_1.UserService(models.user, models.project, models.experience),
            experienceService: new exprience_service_1.ExperienceService(models.experience),
            projectService: new project_service_1.ProjectService(models.project),
            feedbackService: new feedback_service_1.FeedbackService(models.feedback),
            cacheService: new cache_service_1.CacheService(client),
        },
    };
});
exports.loadContext = loadContext;
//# sourceMappingURL=context.js.map