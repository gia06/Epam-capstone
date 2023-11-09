"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidations = void 0;
const express_validator_1 = require("express-validator");
const handleValidations = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: result.array() });
};
exports.handleValidations = handleValidations;
//# sourceMappingURL=index.js.map