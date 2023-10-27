import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { ExtendedRequest } from '../interfaces/express';
import { logger } from '../libs/logger';

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

const createImageDirectory = async (userDirectory: string, imageName: string) => {
  try {
    const userPath = path.join(__dirname, `../../public/${userDirectory}`);

    await mkdir(`${userPath}/projects/${imageName}`);
  } catch (err) {
    logger.error(err);
  }
};

const deleteImage = async (userDirectory: string, imageName: string) => {
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

export const upload = multer({ storage });
