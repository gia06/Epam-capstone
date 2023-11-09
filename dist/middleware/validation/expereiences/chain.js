"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFeedbacks = void 0;
const express_validator_1 = require("express-validator");
const custom_1 = require("./custom");
const validateFeedbacks = (feedbackService, userService, cacheService) => {
    const customValidators = new custom_1.FeedbacksCustomValidators(feedbackService, userService, cacheService);
    // const create = validateAuth(feedbackService).register;
    return {
        getAll: [(0, express_validator_1.query)('pageSize').custom(customValidators.pageSize())],
        create: [
            (0, express_validator_1.check)('fromUser')
                .notEmpty()
                .withMessage('fromUser field is required')
                .custom(customValidators.fromUser()),
            (0, express_validator_1.check)('companyName')
                .notEmpty()
                .withMessage('companyName field is required')
                .isLength({ max: 50 })
                .withMessage('max length for companyName is 50'),
            (0, express_validator_1.check)('toUser')
                .notEmpty()
                .withMessage('toUser field is required')
                .custom(customValidators.toUser()),
            (0, express_validator_1.check)('content')
                .notEmpty()
                .withMessage('field content is required')
                .isLength({ max: 128 })
                .withMessage('max length for content is 128'),
        ],
        update: [
            (0, express_validator_1.check)('fromUser')
                .notEmpty()
                .withMessage('fromUser field is required')
                .custom(customValidators.fromUser()),
            (0, express_validator_1.check)('companyName').notEmpty().withMessage('companyName field is required'),
            (0, express_validator_1.check)('toUser')
                .notEmpty()
                .withMessage('toUser field is required')
                .custom(customValidators.toUser()),
            (0, express_validator_1.check)('content').notEmpty().withMessage('field content is required'),
        ],
    };
};
exports.validateFeedbacks = validateFeedbacks;
//# sourceMappingURL=chain.js.map