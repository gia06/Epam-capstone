"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const jwt_1 = require("../libs/jwt");
const roles = (userRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const decoded = yield (0, jwt_1.decodeJwt)(req.headers.authorization);
        for (const role of userRoles) {
            if (role === decoded.role)
                return next();
        }
        res.sendStatus(403);
    });
};
exports.roles = roles;
//# sourceMappingURL=roles.js.map