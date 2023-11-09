"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const users_1 = require("../routes/users");
const passport_1 = __importDefault(require("passport"));
const experiences_1 = require("../routes/experiences");
const projects_1 = require("../routes/projects");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../routes/auth");
const feedbacks_1 = require("../routes/feedbacks");
const loadRoutes = (app, context) => {
    app.use('/api/auth', (0, auth_1.makeAuthRouter)(context));
    app.use('/api/users', passport_1.default.authenticate('jwt', { session: false }), (0, users_1.makeUsersRouter)(context));
    app.use('/api/experience', passport_1.default.authenticate('jwt', { session: false }), (0, experiences_1.makeExperienceRouter)(context));
    app.use('/api/projects', passport_1.default.authenticate('jwt', { session: false }), (0, projects_1.makeProjectRouter)(context));
    app.use('/api/feedback', passport_1.default.authenticate('jwt', { session: false }), (0, feedbacks_1.makeFeedbackRouter)(context));
    app.use(errorHandler_1.errorHandler);
};
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map