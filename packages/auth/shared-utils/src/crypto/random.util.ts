/**
 * Random token and OTP generation utilities
 * Provides secure random generation for various authentication tokens
 */
import { randomBytes, randomInt } from 'crypto';

export interface TokenOptions {
  length?: number;
  prefix?: string;
  suffix?: string;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
}

export interface OtpOptions {
  length?: number;
  digitsOnly?: boolean;
  allowLeadingZero?: boolean;
}

export const generateToken = (options?: TokenOptions): string => {
  const {
    length = 32,
    prefix = '',
    suffix = '',
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = false,
  } = options || {};

  let characters = '';

  if (includeUppercase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (includeLowercase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (includeNumbers) {
    characters += '0123456789';
  }

  if (includeSpecialChars) {
    characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }

  if (characters.length === 0) {
    throw new Error('At least one character set must be included');
  }

  const bytes = randomBytes(length);
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    token += characters[randomIndex];
  }

  return `${prefix}${token}${suffix}`;
};

export const generateSecureToken = (length: number = 32): string => {
  if (length < 16) {
    throw new Error('Token length must be at least 16 bytes');
  }

  return randomBytes(length).toString('base64url');
};

export const generateHexToken = (length: number = 32): string => {
  if (length < 8) {
    throw new Error('Token length must be at least 8 bytes');
  }

  return randomBytes(length).toString('hex');
};

export const generateOtp = (options?: OtpOptions): string => {
  const { length = 6, digitsOnly = true, allowLeadingZero = true } = options || {};

  if (length < 4 || length > 10) {
    throw new Error('OTP length must be between 4 and 10');
  }

  let otp = '';

  if (digitsOnly) {
    const min = allowLeadingZero ? 0 : Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    const number = randomInt(min, max);
    otp = number.toString().padStart(length, '0');
  } else {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = randomBytes(length);

    for (let i = 0; i < length; i++) {
      const randomIndex = bytes[i] % characters.length;
      otp += characters[randomIndex];
    }
  }

  return otp;
};

export const generateNumericOtp = (length: number = 6): string => {
  if (length < 4 || length > 10) {
    throw new Error('OTP length must be between 4 and 10');
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const number = randomInt(min, max);
  return number.toString();
};

export const generateAlphanumericOtp = (length: number = 6): string => {
  if (length < 4 || length > 10) {
    throw new Error('OTP length must be between 4 and 10');
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    otp += characters[randomIndex];
  }

  return otp;
};

export const generateSessionId = (): string => {
  return randomBytes(16).toString('hex');
};

export const generateRefreshToken = (): string => {
  return randomBytes(32).toString('base64url');
};

export const generateAccessToken = (): string => {
  return randomBytes(24).toString('base64url');
};

export const generateApiKey = (prefix: string = 'pk_'): string => {
  if (prefix && typeof prefix !== 'string') {
    throw new Error('Prefix must be a string');
  }

  const random = randomBytes(24).toString('base64url');
  return `${prefix}${random}`;
};

export const generateSecretKey = (length: number = 32): string => {
  if (length < 16) {
    throw new Error('Secret key length must be at least 16 bytes');
  }

  return randomBytes(length).toString('base64url');
};

export const generateVerificationCode = (length: number = 6): string => {
  if (length < 4 || length > 10) {
    throw new Error('Verification code length must be between 4 and 10');
  }

  const digits = '0123456789';
  let code = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % digits.length;
    code += digits[randomIndex];
  }

  return code;
};

export const generatePasswordResetToken = (length: number = 32): string => {
  if (length < 16) {
    throw new Error('Token length must be at least 16 bytes');
  }

  return randomBytes(length).toString('hex');
};

export const generateRandomString = (
  length: number = 16,
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  if (!characters || typeof characters !== 'string') {
    throw new Error('Characters must be a non-empty string');
  }

  let result = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    result += characters[randomIndex];
  }

  return result;
};

export const generateRandomNumber = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('Min must be less than or equal to max');
  }

  return randomInt(min, max + 1);
};

export const generateRandomUuid = (): string => {
  const bytes = randomBytes(16);

  // Set version (4) and variant (RFC4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.toString('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

export const generateRandomBytes = (length: number): Buffer => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  return randomBytes(length);
};

export const generateRandomBase64 = (length: number): string => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  return randomBytes(length).toString('base64');
};

export const generateRandomBase64Url = (length: number): string => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  return randomBytes(length).toString('base64url');
};

export const generateRandomHex = (length: number): string => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  return randomBytes(length).toString('hex');
};

export const generateReferenceId = (prefix: string = 'REF'): string => {
  if (!prefix || typeof prefix !== 'string') {
    throw new Error('Prefix must be a non-empty string');
  }

  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(8).toString('hex').toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
};

export const generateOrderId = (): string => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const generateTransactionId = (): string => {
  const prefix = 'TXN';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
