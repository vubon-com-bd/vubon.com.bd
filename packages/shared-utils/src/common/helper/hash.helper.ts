import { createHash } from 'crypto';

export const hashString = (str: string, algorithm: string = 'sha256'): string => {
  return createHash(algorithm).update(str).digest('hex');
};
