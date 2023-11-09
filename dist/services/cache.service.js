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
exports.CacheService = void 0;
class CacheService {
    // set: (arg1: string, arg2: string) => Promise<unknown>;
    // get: (arg1: string) => Promise<unknown>;
    constructor(client) {
        this.client = client;
        // this.set = promisify(this.client.set);
        // this.get = promisify(this.client.get);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.get(id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(JSON.parse(result));
                });
            });
        });
    }
    create(key, cv) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.set(key, cv, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.del(id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CacheService = CacheService;
//# sourceMappingURL=cache.service.js.map