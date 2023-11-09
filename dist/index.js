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
exports.testApp = void 0;
const app_1 = require("./loaders/app");
// (async () => {
//   const app = await loadApp();
//   app.listen(3001, () => logger.info(`Application is running on http://localhost:3001`));
// })();
const testApp = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const server = yield (0, app_1.loadApp)();
        server.listen(0, () => {
            console.log('Express server is listening on http://localhost:3000');
            resolve(server);
        });
    }));
};
exports.testApp = testApp;
//# sourceMappingURL=index.js.map