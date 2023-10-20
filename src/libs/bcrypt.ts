import bcrypt from 'bcrypt';

export const generateHash = (password: string): Promise<string> => {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

export const comparePassword = (
  candidatePassword: string,
  storedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, storedPassword);
};
