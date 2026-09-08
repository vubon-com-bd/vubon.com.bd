import { hashString } from '../common/helper/hash.helper';
import { generateSalt } from '../common/helper/crypto.helper';

export const hashPassword = (password: string): { hash: string; salt: string } => {
  const salt = generateSalt(16);
  const hash = hashString(password + salt, 'sha256');
  return { hash, salt };
};

export const verifyPassword = (password: string, hash: string, salt: string): boolean => {
  const hashed = hashString(password + salt, 'sha256');
  return hashed === hash;
};
