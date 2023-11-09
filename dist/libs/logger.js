"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const pretty = pino_1.default.transport({
    target: 'pino-pretty',
    options: {
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
    },
});
// export const logger = pino({
//   prettyPrint: process.env.NODE_ENV === 'development',
// });
exports.logger = (0, pino_1.default)(process.env.NODE_ENV === 'development' ? pretty : {});
//# sourceMappingURL=logger.js.map