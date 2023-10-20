import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { ExtendedRequest } from '../interfaces/express';

const mkdir = promisify(fs.mkdir);
const readDir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const rm = promisify(fs.rm);

const createDirectory = async (originalName: string, dirName: string) => {
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
    console.log(err);
  }
};

export const deleteDirectory = async (directory: string) => {
  await rm(path.join(__dirname, `../../public/${directory}`), { recursive: true });
};

const storage = multer.diskStorage({
  destination: async (req: ExtendedRequest, file, cb) => {
    const { email } = req.body;
    await createDirectory(file.originalname, email);
    cb(null, `public/${email}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
