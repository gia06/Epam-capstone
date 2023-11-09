"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../libs/logger");
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    logger_1.logger.error({ id: req.id, error: err });
    res.status(statusCode).json({
        error: {
            message: err.message,
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map