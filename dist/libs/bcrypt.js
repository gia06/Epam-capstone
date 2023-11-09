"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateHash = (password) => {
    return bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
};
exports.generateHash = generateHash;
const comparePassword = (candidatePassword, storedPassword) => {
    return bcrypt_1.default.compare(candidatePassword, storedPassword);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map