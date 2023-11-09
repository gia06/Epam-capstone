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
exports.down = exports.up = void 0;
const bcrypt_1 = require("../libs/bcrypt");
const up = ({ context }) => __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    const password = yield (0, bcrypt_1.generateHash)('admin');
    yield q.bulkInsert('users', [
        {
            id: '29173c82-0b38-11gd-9284-7t7454c8c891',
            first_name: 'admin',
            last_name: 'admin',
            image: 'images/admin',
            title: 'adminTItle',
            summary: 'Summary',
            role: 'Admin',
            email: 'admin@example.com',
            password,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
});
exports.up = up;
const down = ({ context }) => __awaiter(void 0, void 0, void 0, function* () {
    const q = context.getQueryInterface();
    yield q.bulkDelete('users', { role: 'Admin' });
});
exports.down = down;
//# sourceMappingURL=2023.10.25T10.50.44.admin-user.js.map