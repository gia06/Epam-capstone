import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { ExtendedRequest } from '../interfaces/express';
import { logger } from '../libs/logger';
import { decodeJwt } from '../libs/jwt';

const mkdir = promisify(fs.mkdir);
const readDir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const rm = promisify(fs.rm);

const createUserDirectory = async (originalName: string, dirName: string) => {
  try {
    const users = await readDir(path.join(__dirname, '../../public'));

    if (!users.includes(dirName)) {
      await mkdir(path.join(__dirname, `../../public/${dirName}`));
    }

    const avatars = await readDir(path.join(__dirname, `../../public/${dirName}`));

    if (avatars.length > 0 && avatars[0] !== originalName) {
      await unlink(path.join(__dirname, `../../public/${dirName}/${avatars[0]}`));
    }
  } catch (err) {
    logger.error(err);
  }
};

const createProjectImage = async (userDirectory: string, imageName: string) => {
  try {
    const userPath = path.join(__dirname, `../../public/${userDirectory}`);

    await mkdir(`${userPath}/projects`);
  } catch (err) {
    logger.error(err);
  }
};

export const deleteProjectImage = async (userDirectory: string, imageName: string) => {
  await unlink(path.join(__dirname, `../../public/${userDirectory}/projects/${imageName}`));
};

export const deleteUserDirectory = async (directory: string) => {
  await rm(path.join(__dirname, `../../public/${directory}`), { recursive: true });
};

const storage = multer.diskStorage({
  destination: async (req: ExtendedRequest, file, cb) => {
    const { email } = req.body;
    await createUserDirectory(file.originalname, email);
    cb(null, `public/${email}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const projectStorage = multer.diskStorage({
  destination: async (req: ExtendedRequest, file, cb) => {
    const { email } = await decodeJwt(req.headers.authorization);
    await createProjectImage(email, req.body.projectName);
    cb(null, `public/${email}/projects`);
  },
  filename: (req, file, cb) => {
    const lastIndex = file.originalname.lastIndexOf('.');
    const extension = file.originalname.slice(lastIndex);
    if (req.body.projectName) {
      return cb(null, `${req.body.projectName}${extension}`);
    }
    cb(new Error('no projectName'), null);
  },
});

export const upload = multer({ storage });

export const projectUpload = multer({ storage: projectStorage });
