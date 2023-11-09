"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRedis = void 0;
const redis_1 = require("redis");
const config_1 = require("../config");
const logger_1 = require("../libs/logger");
const loadRedis = () => {
    const client = (0, redis_1.createClient)(Object.assign({}, config_1.config.redis));
    client.on('connect', () => {
        logger_1.logger.info('Connected to Redis');
    });
    client.on('error', (error) => {
        logger_1.logger.error('Error connecting to Redis:', error);
    });
    return client;
};
exports.loadRedis = loadRedis;
//# sourceMappingURL=cache.js.map