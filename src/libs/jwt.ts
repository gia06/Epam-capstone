import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.model';

interface JwtInterface {
  id: number;
  email: string;
  role: UserRole;
}

export const signJwt = (payload: JwtInterface): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { algorithm: 'HS512', expiresIn: '4h' },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};

export const decodeJwt = (authHeader: string): Promise<jwt.JwtPayload> => {
  const token = authHeader.split(' ')[1];
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};
