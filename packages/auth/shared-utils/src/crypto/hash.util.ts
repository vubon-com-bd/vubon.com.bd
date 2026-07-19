/**
 * Password hashing utilities
 * Provides secure password hashing and comparison functions
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export interface HashOptions {
  saltLength?: number;
  keyLength?: number;
  iterations?: number;
}

export interface HashedPassword {
  hash: string;
  salt: string;
  iterations: number;
  keyLength: number;
}

const DEFAULT_OPTIONS: Required<HashOptions> = {
  saltLength: 32,
  keyLength: 64,
  iterations: 100000,
};

export const hashPassword = async (
  password: string,
  options?: HashOptions,
): Promise<HashedPassword> => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  const { saltLength, keyLength, iterations } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const salt = randomBytes(saltLength).toString('hex');

  return new Promise((resolve, reject) => {
    try {
      const hash = scryptSync(password, salt, keyLength, {
        N: iterations,
        r: 8,
        p: 1,
      }).toString('hex');

      resolve({
        hash,
        salt,
        iterations,
        keyLength,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const comparePassword = async (
  password: string,
  hashedPassword: HashedPassword,
): Promise<boolean> => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  if (!hashedPassword || typeof hashedPassword !== 'object') {
    return false;
  }

  const { hash, salt, iterations, keyLength } = hashedPassword;

  try {
    const computedHash = scryptSync(password, salt, keyLength, {
      N: iterations,
      r: 8,
      p: 1,
    });

    const storedHashBuffer = Buffer.from(hash, 'hex');

    if (computedHash.length !== storedHashBuffer.length) {
      return false;
    }

    return timingSafeEqual(computedHash, storedHashBuffer);
  } catch {
    return false;
  }
};

export const hashPasswordSync = (password: string, options?: HashOptions): HashedPassword => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  const { saltLength, keyLength, iterations } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const salt = randomBytes(saltLength).toString('hex');
  const hash = scryptSync(password, salt, keyLength, {
    N: iterations,
    r: 8,
    p: 1,
  }).toString('hex');

  return {
    hash,
    salt,
    iterations,
    keyLength,
  };
};

export const comparePasswordSync = (password: string, hashedPassword: HashedPassword): boolean => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  if (!hashedPassword || typeof hashedPassword !== 'object') {
    return false;
  }

  const { hash, salt, iterations, keyLength } = hashedPassword;

  try {
    const computedHash = scryptSync(password, salt, keyLength, {
      N: iterations,
      r: 8,
      p: 1,
    });

    const storedHashBuffer = Buffer.from(hash, 'hex');

    if (computedHash.length !== storedHashBuffer.length) {
      return false;
    }

    return timingSafeEqual(computedHash, storedHashBuffer);
  } catch {
    return false;
  }
};

export const generateRandomSalt = (length: number = DEFAULT_OPTIONS.saltLength): string => {
  if (length < 8) {
    throw new Error('Salt length must be at least 8 bytes');
  }

  return randomBytes(length).toString('hex');
};

export const generateHashFromSalt = (
  password: string,
  salt: string,
  options?: Pick<HashOptions, 'iterations' | 'keyLength'>,
): string => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  if (!salt || typeof salt !== 'string') {
    throw new Error('Salt is required');
  }

  const { keyLength, iterations } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return scryptSync(password, salt, keyLength, {
    N: iterations,
    r: 8,
    p: 1,
  }).toString('hex');
};

export const validateHashFormat = (hash: string): boolean => {
  if (!hash || typeof hash !== 'string') {
    return false;
  }

  return /^[0-9a-fA-F]+$/.test(hash);
};

export const getHashLength = (hash: string): number => {
  if (!hash || typeof hash !== 'string') {
    return 0;
  }

  if (!validateHashFormat(hash)) {
    return 0;
  }

  return hash.length / 2;
};

export const isHashValid = (
  hash: string,
  expectedLength: number = DEFAULT_OPTIONS.keyLength,
): boolean => {
  if (!validateHashFormat(hash)) {
    return false;
  }

  return getHashLength(hash) === expectedLength;
};

export const hashPasswordWithPepper = async (
  password: string,
  pepper: string,
  options?: HashOptions,
): Promise<HashedPassword> => {
  if (!pepper || typeof pepper !== 'string') {
    throw new Error('Pepper is required');
  }

  const passwordWithPepper = password + pepper;
  return hashPassword(passwordWithPepper, options);
};

export const comparePasswordWithPepper = async (
  password: string,
  pepper: string,
  hashedPassword: HashedPassword,
): Promise<boolean> => {
  if (!pepper || typeof pepper !== 'string') {
    return false;
  }

  const passwordWithPepper = password + pepper;
  return comparePassword(passwordWithPepper, hashedPassword);
};

export const hashPasswordSyncWithPepper = (
  password: string,
  pepper: string,
  options?: HashOptions,
): HashedPassword => {
  if (!pepper || typeof pepper !== 'string') {
    throw new Error('Pepper is required');
  }

  const passwordWithPepper = password + pepper;
  return hashPasswordSync(passwordWithPepper, options);
};

export const comparePasswordSyncWithPepper = (
  password: string,
  pepper: string,
  hashedPassword: HashedPassword,
): boolean => {
  if (!pepper || typeof pepper !== 'string') {
    return false;
  }

  const passwordWithPepper = password + pepper;
  return comparePasswordSync(passwordWithPepper, hashedPassword);
};

export const generatePasswordResetToken = (length: number = 32): string => {
  if (length < 16) {
    throw new Error('Token length must be at least 16 bytes');
  }

  return randomBytes(length).toString('hex');
};

export const generateVerificationCode = (length: number = 6): string => {
  if (length < 4 || length > 10) {
    throw new Error('Verification code length must be between 4 and 10');
  }

  const digits = '0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    code += digits[randomIndex];
  }

  return code;
};

export const generateSecureToken = (length: number = 64): string => {
  if (length < 32) {
    throw new Error('Token length must be at least 32 bytes');
  }

  return randomBytes(length).toString('base64url');
};

export const generateSessionId = (): string => {
  return randomBytes(16).toString('hex');
};

export const generateRefreshToken = (): string => {
  return randomBytes(32).toString('base64url');
};

export const generateApiKey = (): string => {
  const prefix = 'pk_';
  const random = randomBytes(24).toString('base64url');
  return prefix + random;
};

export const generateSecretKey = (): string => {
  return randomBytes(32).toString('base64url');
};

export const generateRandomString = (
  length: number = 16,
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  let result = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    result += characters[randomIndex];
  }

  return result;
};
