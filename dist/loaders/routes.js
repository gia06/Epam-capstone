"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const auth_1 = require("../routes/auth");
const loadRoutes = (app, context) => {
    app.use('/api/auth', (0, auth_1.makeAuthRouter)(context));
};
exports.loadRoutes = loadRoutes;
//# sourceMappingURL=routes.js.map