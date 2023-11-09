"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: '4h' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
};
exports.signJwt = signJwt;
const decodeJwt = (authHeader) => {
    const token = authHeader.split(' ')[1];
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return reject(err);
            return resolve(decoded);
        });
    });
};
exports.decodeJwt = decodeJwt;
//# sourceMappingURL=jwt.js.map