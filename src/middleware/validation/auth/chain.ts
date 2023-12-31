import { check, ValidationChain } from 'express-validator';
import { AuthCustomValidators } from './custom';
import { UserService } from '../../../services/user.service';

interface Chain {
  register: ValidationChain[];
  login: ValidationChain[];
}

export const validateAuth = (userService: UserService): Chain => {
  const customValidators = new AuthCustomValidators(userService);

  return {
    register: [
      check('firstName')
        .notEmpty()
        .withMessage('firstName is required field')
        .isLength({ max: 40 })
        .withMessage('length for firstName field cannot be more than 40'),
      check('lastName')
        .notEmpty()
        .withMessage('lastName is required field')
        .isLength({ max: 40 })
        .withMessage('length for lastName field cannot be more than 40'),
      check('title')
        .notEmpty()
        .withMessage('title is required field')
        .isLength({ max: 30 })
        .withMessage('length for title field cannot be more than 40'),
      check('summary')
        .notEmpty()
        .withMessage('summary is required field')
        .isLength({ max: 256 })
        .withMessage('length for summary field cannot be more than 256'),
      check('email')
        .notEmpty()
        .withMessage('email is required field')
        .isLength({ min: 8, max: 255 })
        .withMessage('length for email field cannot be less than 8 and more than 255')
        .isEmail()
        .withMessage('field email should be a valid email address')
        .custom(customValidators.registerEmail()),
      check('password')
        .notEmpty()
        .isLength({ min: 8, max: 255 })
        .withMessage('length for password field cannot be less than 8 and more than 255'),
      check('avatar').custom(customValidators.registerAvatar()),
    ],
    login: [
      check('email')
        .notEmpty()
        .withMessage('email is required field')
        .custom(customValidators.loginEmail()),
      check('password')
        .notEmpty()
        .withMessage('password is required field')
        .custom(customValidators.loginPassword()),
    ],
  };
};
