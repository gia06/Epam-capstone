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
exports.upload = exports.deleteUserDirectory = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const logger_1 = require("../libs/logger");
const mkdir = (0, util_1.promisify)(fs_1.default.mkdir);
const readDir = (0, util_1.promisify)(fs_1.default.readdir);
const unlink = (0, util_1.promisify)(fs_1.default.unlink);
const rm = (0, util_1.promisify)(fs_1.default.rm);
const createUserDirectory = (originalName, dirName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield readDir(path_1.default.join(__dirname, '../../public'));
        if (!users.includes(dirName)) {
            yield mkdir(path_1.default.join(__dirname, `../../public/${dirName}`));
        }
        const avatars = yield readDir(path_1.default.join(__dirname, `../../public/${dirName}`));
        if (avatars.length > 0 && avatars[0] !== originalName) {
            yield unlink(path_1.default.join(__dirname, `../../public/${dirName}/${avatars[0]}`));
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
});
const createImageDirectory = (userDirectory, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPath = path_1.default.join(__dirname, `../../public/${userDirectory}`);
        yield mkdir(`${userPath}/projects/${imageName}`);
    }
    catch (err) {
        logger_1.logger.error(err);
    }
});
const deleteImage = (userDirectory, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    yield unlink(path_1.default.join(__dirname, `../../public/${userDirectory}/projects/${imageName}`));
});
const deleteUserDirectory = (directory) => __awaiter(void 0, void 0, void 0, function* () {
    yield rm(path_1.default.join(__dirname, `../../public/${directory}`), { recursive: true });
});
exports.deleteUserDirectory = deleteUserDirectory;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        yield createUserDirectory(file.originalname, email);
        cb(null, `public/${email}`);
    }),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=multer.js.map