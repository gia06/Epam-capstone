"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const express_validator_1 = require("express-validator");
const custom_1 = require("./custom");
const validateAuth = (userService) => {
    const customValidators = new custom_1.AuthCustomValidators(userService);
    // TODO: need to clarify this destructuring
    // const { registerEmail } = customValidators;
    return {
        register: [
            (0, express_validator_1.check)('firstName')
                .notEmpty()
                .withMessage('firstName is required field')
                .isLength({ max: 40 })
                .withMessage('length for firstName field cannot be more than 40'),
            (0, express_validator_1.check)('lastName')
                .notEmpty()
                .withMessage('lastName is required field')
                .isLength({ max: 40 })
                .withMessage('length for lastName field cannot be more than 40'),
            (0, express_validator_1.check)('title')
                .notEmpty()
                .withMessage('title is required field')
                .isLength({ max: 30 })
                .withMessage('length for title field cannot be more than 40'),
            (0, express_validator_1.check)('summary')
                .notEmpty()
                .withMessage('summary is required field')
                .isLength({ max: 256 })
                .withMessage('length for summary field cannot be more than 256'),
            (0, express_validator_1.check)('email')
                .notEmpty()
                .withMessage('email is required field')
                .isLength({ min: 8, max: 255 })
                .withMessage('length for email field cannot be less than 8 and more than 255')
                .isEmail()
                .withMessage('field email should be a valid email address')
                .custom(customValidators.registerEmail()),
            (0, express_validator_1.check)('password')
                .notEmpty()
                .isLength({ min: 8, max: 255 })
                .withMessage('length for password field cannot be less than 8 and more than 255'),
            (0, express_validator_1.check)('avatar').custom(customValidators.registerAvatar()),
        ],
        login: [
            (0, express_validator_1.check)('email')
                .notEmpty()
                .withMessage('email is required field')
                .custom(customValidators.loginEmail()),
            (0, express_validator_1.check)('password')
                .notEmpty()
                .withMessage('password is required field')
                .custom(customValidators.loginPassword()),
        ],
    };
};
exports.validateAuth = validateAuth;
//# sourceMappingURL=chain.js.map