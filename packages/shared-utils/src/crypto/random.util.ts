import crypto from 'crypto';
import { encode } from 'hi-base32';

/**
 * Generates a cryptographically secure random token
 *
 * @param length - Length of the token in characters (default: 32)
 * @returns A URL-safe base64 encoded random string
 *
 * @example
 * const token = generateToken(32);
 * // 'xK9pQn3fR2mLv8jH5wT1sY6dM4nC7eB0'
 */
export function generateToken(length: number = 32): string {
  if (length < 1) {
    throw new Error('Token length must be at least 1');
  }

  const bytes = Math.ceil((length * 3) / 4);
  const buffer = crypto.randomBytes(bytes);
  const base64 = buffer.toString('base64');
  const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  return urlSafe.slice(0, length);
}

/**
 * Generates a numeric OTP (One-Time Password)
 *
 * @param length - Length of the OTP in digits (default: 6)
 * @returns A numeric string of the specified length
 *
 * @example
 * const otp = generateOTP(6);
 * // '834291'
 */
export function generateOTP(length: number = 6): string {
  if (length < 1) {
    throw new Error('OTP length must be at least 1');
  }

  if (length > 20) {
    throw new Error('OTP length cannot exceed 20');
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const range = max - min + 1;

  const bytes = Math.ceil(range / 256);
  const buffer = crypto.randomBytes(bytes);
  const randomNumber = buffer.readUIntBE(0, bytes);

  return String(min + (randomNumber % range)).padStart(length, '0');
}

/**
 * Generates a verification token for email verification
 *
 * @param length - Length of the token (default: 64)
 * @returns A cryptographically secure random token
 *
 * @example
 * const token = generateVerificationToken();
 * // 'xK9pQn3fR2mLv8jH5wT1sY6dM4nC7eB0pL3qW8rN2vJ6kH9tG4sD7mF3cA2bV1'
 */
export function generateVerificationToken(length: number = 64): string {
  if (length < 32) {
    throw new Error('Verification token length must be at least 32');
  }

  return generateToken(length);
}

/**
 * Generates a TOTP (Time-based One-Time Password) secret in Base32 format
 *
 * @param secretLength - Length of the secret in bytes (default: 20, standard for TOTP)
 * @returns A Base32 encoded secret string
 *
 * @example
 * const secret = generateTOTPSecret();
 * // 'JBSWY3DPEHPK3PXP'
 */
export function generateTOTPSecret(secretLength: number = 20): string {
  if (secretLength < 10) {
    throw new Error('TOTP secret length must be at least 10 bytes');
  }

  const buffer = crypto.randomBytes(secretLength);
  return encode(buffer).replace(/=/g, '');
}

/**
 * Generates backup codes for MFA recovery
 *
 * @param count - Number of backup codes to generate (default: 10)
 * @param length - Length of each backup code (default: 8)
 * @returns An array of backup code strings
 *
 * @example
 * const codes = generateBackupCodes(10, 8);
 * // ['A1B2C3D4', 'E5F6G7H8', 'I9J0K1L2', ...]
 */
export function generateBackupCodes(count: number = 10, length: number = 8): string[] {
  if (count < 1) {
    throw new Error('Backup code count must be at least 1');
  }

  if (count > 100) {
    throw new Error('Backup code count cannot exceed 100');
  }

  if (length < 4) {
    throw new Error('Backup code length must be at least 4');
  }

  if (length > 20) {
    throw new Error('Backup code length cannot exceed 20');
  }

  const codes: string[] = [];
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  for (let i = 0; i < count; i++) {
    let code = '';
    const bytes = crypto.randomBytes(length);

    for (let j = 0; j < length; j++) {
      const index = bytes[j] % charset.length;
      code += charset[index];
    }

    codes.push(code);
  }

  return codes;
}
