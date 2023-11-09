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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const loadPassport = (app, { services }) => {
    const ExtractJwt = passport_jwt_1.default.ExtractJwt;
    const StrategyJwt = passport_jwt_1.default.Strategy;
    passport_1.default.use(new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield services.userService.findById(jwtPayload.id);
            if (user) {
                return done(null, user);
            }
        }
        catch (err) {
            return done(err);
        }
    })));
};
exports.loadPassport = loadPassport;
//# sourceMappingURL=passport.js.map