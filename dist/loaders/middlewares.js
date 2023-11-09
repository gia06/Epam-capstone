"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_request_id_1 = __importDefault(require("express-request-id"));
const loadMiddlewares = (app, context) => {
    app.use((0, express_request_id_1.default)());
    app.use((0, cors_1.default)());
};
exports.loadMiddlewares = loadMiddlewares;
//# sourceMappingURL=middlewares.js.map