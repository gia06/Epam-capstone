"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadApp = void 0;
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const express_1 = __importDefault(require("express"));
const context_1 = require("./context");
const models_1 = require("./models");
const sequelize_1 = require("./sequelize");
const config_1 = require("../config");
const passport_1 = require("./passport");
const cache_1 = require("./cache");
const dotenv = __importStar(require("dotenv"));
const loadApp = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    const app = (0, express_1.default)();
    const sequelize = (0, sequelize_1.loadSequelize)(config_1.config);
    const client = (0, cache_1.loadRedis)();
    const models = (0, models_1.loadModels)(sequelize);
    const context = yield (0, context_1.loadContext)(models, client);
    (0, passport_1.loadPassport)(app, context);
    (0, middlewares_1.loadMiddlewares)(app, context);
    (0, routes_1.loadRoutes)(app, context);
    return app;
});
exports.loadApp = loadApp;
//# sourceMappingURL=app.js.map