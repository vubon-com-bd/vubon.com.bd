/**
 * Random token and OTP generation utilities
 * Uses Node.js crypto module for cryptographically secure random values
 */

import { randomBytes, randomInt } from 'node:crypto';

/**
 * Generate a cryptographically secure random token
 * @param length - Length of the token in bytes (default: 32)
 * @param encoding - Encoding format (default: 'hex')
 * @returns Random token string
 */
export function generateToken(
  length: number = 32,
  encoding: 'hex' | 'base64' | 'base64url' = 'hex',
): string {
  if (length < 1) {
    throw new Error('Token length must be at least 1');
  }

  try {
    return randomBytes(length).toString(encoding);
  } catch (error) {
    throw new Error(
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Generate a numeric OTP (One-Time Password)
 * @param digits - Number of digits (default: 6)
 * @returns OTP as string
 */
export function generateOTP(digits: number = 6): string {
  if (digits < 1 || digits > 10) {
    throw new Error('OTP digits must be between 1 and 10');
  }

  try {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    const otp = randomInt(min, max + 1);
    return otp.toString().padStart(digits, '0');
  } catch (error) {
    throw new Error(
      `Failed to generate OTP: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Generate a random alphanumeric string
 * @param length - Length of the string (default: 16)
 * @returns Random alphanumeric string
 */
export function generateAlphanumeric(length: number = 16): string {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = randomBytes(length);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
}

/**
 * Generate a secure random string with custom character set
 * @param length - Length of the string
 * @param chars - Character set to use (default: alphanumeric)
 * @returns Random string
 */
export function generateCustomRandom(
  length: number = 16,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  if (!chars || chars.length === 0) {
    throw new Error('Character set cannot be empty');
  }

  try {
    const bytes = randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  } catch (error) {
    throw new Error(
      `Failed to generate random string: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Generate a UUID v4 compatible random string
 * @returns UUID v4 string
 */
export function generateUUID(): string {
  const bytes = randomBytes(16);

  // Set version to 4 (0100)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant to RFC 4122 (10xx)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return bytes.toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}
