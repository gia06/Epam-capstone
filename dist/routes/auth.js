"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const makeAuthRouter = (context) => {
    const router = express_1.default.Router();
    // Define routes
    router.get('/', (req, res) => {
        res.send('works');
    });
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });
    const upload = (0, multer_1.default)({ storage });
    router.post('/', upload.single('file'), (req, res) => { });
    return router;
};
exports.makeAuthRouter = makeAuthRouter;
//# sourceMappingURL=auth.js.map