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
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
describe('testing application', () => {
    let server;
    const baseUrl = `/api`;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, __1.testApp)();
    }));
    // afterAll(() => {
    //   // process.exit();
    //   // server.stop();
    // });
    it('GET / should return 400 status code for bad request ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstName: 'testExample',
            lastName: 'testExample',
            title: 'testExample',
            summary: 'testExample',
            email: 'testExample@example.com',
            password: 'testExample',
        };
        const response = yield (0, supertest_1.default)(server).post(`${baseUrl}/auth/register`).send(user);
        expect(response.status).toBe(400);
    }));
    it('GET / should return 400 status code for wrong credentials  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginParams = {
            email: 'wrongEmail@example.com',
            password: 'wrongPassword',
        };
        const response = yield (0, supertest_1.default)(server).post(`${baseUrl}/auth/login`).send(loginParams);
        expect(response.status).toBe(400);
    }));
    it('GET / should return 403 status code for wrong user role  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.c6uPnDsonDMfyVj8EtQ05mBWwspcoHOhiFzQn85lTH4';
        const response = yield (0, supertest_1.default)(server)
            .get(`${baseUrl}/users`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.status).toBe(401);
    }));
    it('GET / should return 401 status code unauthenticated users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server).get(`${baseUrl}/users`);
        expect(response.status).toBe(401);
    }));
    it('GET / should return 403 status code for wrong user role  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.c6uPnDsonDMfyVj8EtQ05mBWwspcoHOhiFzQn85lTH4';
        const response = yield (0, supertest_1.default)(server)
            .get(`${baseUrl}/users`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.status).toBe(401);
    }));
});
//# sourceMappingURL=index.test.js.map