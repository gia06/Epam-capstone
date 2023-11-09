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
exports.validUser = void 0;
const logger_1 = require("../../libs/logger");
const validUser = (userService) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const user = yield userService.findById(userId);
        if (!user) {
            logger_1.logger.error({ id: req.id, message: 'user not found' });
            return res.status(404).json({
                error: {
                    msg: 'user not found',
                    param: 'userId',
                    location: 'param',
                },
            });
        }
        return next();
    });
};
exports.validUser = validUser;
//# sourceMappingURL=validUser.js.map