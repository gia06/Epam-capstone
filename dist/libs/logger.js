"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino = require('pino');
exports.logger = pino({
    prettyPrint: process.env.NODE_ENV === 'development',
});
//# sourceMappingURL=logger.js.map