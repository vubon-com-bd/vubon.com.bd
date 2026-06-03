/**
 * Random Utilities - Secure random generators
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/crypto/random.util
 *
 * RULES:
 * ✅ ONLY secure random generation - NO business logic
 * ✅ NO OTP storage, database operations, side effects
 * ✅ Pure functions with deterministic output (cryptographically random)
 * ✅ Named exports only
 * ✅ No console.log or external API calls 
 */

import crypto from 'crypto';
// ✅ FIXED: Correct package name
import {
  OTP_CONFIG,
  RECOVERY_CODES,
  TOKEN_CONFIG,
  NONCE_CONFIG,
  CHARACTER_SETS,
} from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// OTP configuration
export const OTP_LENGTH = OTP_CONFIG.LENGTH;
export const OTP_MIN = Math.pow(10, OTP_LENGTH - 1);
export const OTP_MAX = Math.pow(10, OTP_LENGTH) - 1;

// UUID version
export const UUID_VERSION = 4;

// Character sets (from constants)
const ALPHANUMERIC = CHARACTER_SETS.ALPHANUMERIC;
const NUMERIC = CHARACTER_SETS.NUMERIC;
const HEX_LOWER = CHARACTER_SETS.HEX_LOWER;
const HEX_UPPER = CHARACTER_SETS.HEX_UPPER;
const BASE64_CHARS = CHARACTER_SETS.BASE64;
const BASE64URL_CHARS = CHARACTER_SETS.BASE64URL;
const SECURE_CHARS = CHARACTER_SETS.SECURE;

// Default lengths (from constants)
const DEFAULT_TOKEN_LENGTH = TOKEN_CONFIG.DEFAULT_LENGTH;
const DEFAULT_NONCE_LENGTH = NONCE_CONFIG.DEFAULT_LENGTH;
const DEFAULT_RECOVERY_CODE_COUNT = RECOVERY_CODES.COUNT;
const DEFAULT_RECOVERY_CODE_LENGTH = RECOVERY_CODES.CODE_LENGTH;

// Validation limits
const MIN_OTP_LENGTH = 4;
const MAX_OTP_LENGTH = 10;
const MAX_COUNT = 100;
const MAX_RECOVERY_CODES = 20;
const MIN_RECOVERY_CODE_LENGTH = 6;
const MAX_RECOVERY_CODE_LENGTH = 12;
const MIN_TOKEN_LENGTH_BYTES = TOKEN_CONFIG.MIN_LENGTH;
const MAX_TOKEN_LENGTH_BYTES = TOKEN_CONFIG.MAX_LENGTH;
const MIN_RANDOM_STRING_LENGTH = 1;
const MAX_RANDOM_STRING_LENGTH = 512;
// ✅ FIXED: Add fallbacks for missing constants
const MIN_NONCE_LENGTH_BYTES = (NONCE_CONFIG as any).MIN_LENGTH || 8;
const MAX_NONCE_LENGTH_BYTES = (NONCE_CONFIG as any).MAX_LENGTH || 64;

// ==================== Private Helpers ====================

/**
 * Generate random bytes and map to character set (bias-free method)
 */
const generateRandomFromCharset = (length: number, charset: string): string => {
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  if (!charset || charset.length === 0) {
    throw new Error('Character set cannot be empty');
  }

  const charsetLength = charset.length;
  // Calculate maximum valid byte value to avoid modulo bias
  const maxValid = 256 - (256 % charsetLength);
  let result = '';

  while (result.length < length) {
    const bytes = crypto.randomBytes(Math.ceil((length - result.length) * 2));
    for (let i = 0; i < bytes.length && result.length < length; i++) {
      const byte = bytes[i];
      if (byte < maxValid) {
        result += charset[byte % charsetLength];
      }
    }
  }

  return result;
};

/**
 * Validate count parameter (silent correction - no console.warn)
 */
const validateCount = (count: number, maxCount: number = MAX_COUNT): number => {
  if (count <= 0) {
    throw new Error('Count must be at least 1');
  }
  if (count > maxCount) {
    return maxCount;
  }
  return count;
};

/**
 * Validate length parameter
 */
const validateLength = (length: number, min: number = 1, max: number = MAX_RANDOM_STRING_LENGTH): number => {
  if (length < min) {
    throw new Error(`Length must be at least ${min}`);
  }
  if (length > max) {
    throw new Error(`Length cannot exceed ${max}`);
  }
  return length;
};

// ==================== OTP Generation ====================

/**
 * Generate a secure numeric OTP (One-Time Password)
 * Cryptographically secure using crypto.randomInt
 *
 * @param length - Length of OTP (default: 6, min: 4, max: 10)
 * @returns OTP as zero-padded string
 *
 * @example
 * const otp = generateOtp(); // "123456"
 * const otp4 = generateOtp(4); // "7890"
 */
export const generateOtp = (length: number = OTP_LENGTH): string => {
  const validLength = validateLength(length, MIN_OTP_LENGTH, MAX_OTP_LENGTH);
  const min = Math.pow(10, validLength - 1);
  const max = Math.pow(10, validLength) - 1;
  const otp = crypto.randomInt(min, max + 1);
  return otp.toString().padStart(validLength, '0');
};

/**
 * Generate multiple OTPs at once
 *
 * @param count - Number of OTPs to generate (max: 100)
 * @param length - Length of each OTP (default: 6)
 * @returns Array of OTP strings
 */
export const generateOtps = (count: number, length: number = OTP_LENGTH): string[] => {
  const validCount = validateCount(count, MAX_COUNT);
  const otps: string[] = [];
  for (let i = 0; i < validCount; i++) {
    otps.push(generateOtp(length));
  }
  return otps;
};

/**
 * Generate a numeric OTP as number (without leading zeros)
 *
 * @param length - Length of OTP (default: 6)
 * @returns OTP as number
 *
 * @example
 * const otp = generateOtpNumber(); // 123456 (number, not string)
 */
export const generateOtpNumber = (length: number = OTP_LENGTH): number => {
  const validLength = validateLength(length, MIN_OTP_LENGTH, MAX_OTP_LENGTH);
  const min = Math.pow(10, validLength - 1);
  const max = Math.pow(10, validLength) - 1;
  return crypto.randomInt(min, max + 1);
};

// ==================== Token Generation ====================

/**
 * Generate a secure random token (hex string)
 * Cryptographically secure - suitable for auth tokens, session IDs
 *
 * @param length - Length in bytes (default: 32, gives 64 hex chars)
 * @returns Hex string token
 *
 * @example
 * const token = generateToken(); // "a1b2c3d4..."
 */
export const generateToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  const validLength = validateLength(length, MIN_TOKEN_LENGTH_BYTES, MAX_TOKEN_LENGTH_BYTES);
  return crypto.randomBytes(validLength).toString('hex');
};

/**
 * Generate a secure random string with custom characters
 *
 * @param length - Length of output string (default: 32)
 * @param chars - Character set to use (default: alphanumeric)
 * @returns Random string from character set
 */
export const generateRandomString = (
  length: number = DEFAULT_TOKEN_LENGTH,
  chars: string = ALPHANUMERIC
): string => {
  const validLength = validateLength(length, MIN_RANDOM_STRING_LENGTH, MAX_RANDOM_STRING_LENGTH);
  return generateRandomFromCharset(validLength, chars);
};

/**
 * Generate a secure alphanumeric token (A-Z, a-z, 0-9)
 */
export const generateAlphanumericToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, ALPHANUMERIC);
};

/**
 * Generate a secure numeric token (only digits)
 */
export const generateNumericToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, NUMERIC);
};

/**
 * Generate a secure hex token (0-9, a-f)
 */
export const generateHexToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, HEX_LOWER);
};

/**
 * Generate a secure base64-style token
 */
export const generateBase64Token = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, BASE64_CHARS);
};

/**
 * Generate a secure base64url token (URL-safe)
 */
export const generateBase64UrlToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, BASE64URL_CHARS);
};

/**
 * Generate a high-entropy secure token with special characters
 * Suitable for API keys
 */
export const generateSecureToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, SECURE_CHARS);
};

// ==================== UUID Generation ====================

/**
 * Generate a UUID v4 (RFC 4122 compliant)
 * Uses crypto.randomUUID() for maximum compatibility
 *
 * @returns UUID v4 string
 *
 * @example
 * const uuid = generateUuid(); // "123e4567-e89b-12d3-a456-426614174000"
 */
export const generateUuid = (): string => {
  return crypto.randomUUID();
};

/**
 * Generate multiple UUIDs
 *
 * @param count - Number of UUIDs to generate (max: 100)
 * @returns Array of UUID strings
 */
export const generateUuids = (count: number): string[] => {
  const validCount = validateCount(count, MAX_COUNT);
  const uuids: string[] = [];
  for (let i = 0; i < validCount; i++) {
    uuids.push(generateUuid());
  }
  return uuids;
};

/**
 * Check if a string is a valid UUID v4
 * Pure validation helper
 */
export const isValidUuid = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// ==================== Recovery Code Generation ====================

/**
 * Generate backup recovery codes (alphanumeric)
 * Suitable for MFA backup, account recovery
 *
 * @param count - Number of codes (default: 10, max: 20)
 * @param codeLength - Length of each code (default: 8, min: 6, max: 12)
 * @returns Array of recovery codes
 *
 * @example
 * const codes = generateRecoveryCodes(); // ["AB3F9K2M", "7XQ4W9R2", ...]
 */
export const generateRecoveryCodes = (
  count: number = DEFAULT_RECOVERY_CODE_COUNT,
  codeLength: number = DEFAULT_RECOVERY_CODE_LENGTH
): string[] => {
  const validCount = validateCount(count, MAX_RECOVERY_CODES);
  const validLength = validateLength(codeLength, MIN_RECOVERY_CODE_LENGTH, MAX_RECOVERY_CODE_LENGTH);
  const codes: string[] = [];
  const chars = ALPHANUMERIC;

  for (let i = 0; i < validCount; i++) {
    let code = '';
    for (let j = 0; j < validLength; j++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      code += chars[randomIndex];
    }
    codes.push(code);
  }

  return codes;
};

/**
 * Generate a single recovery code
 */
export const generateRecoveryCode = (codeLength: number = DEFAULT_RECOVERY_CODE_LENGTH): string => {
  return generateRecoveryCodes(1, codeLength)[0]!;
};

/**
 * Generate recovery codes with formatting (grouped for readability)
 * Example: "AB3F-9K2M" instead of "AB3F9K2M"
 */
export const generateFormattedRecoveryCodes = (
  count: number = DEFAULT_RECOVERY_CODE_COUNT,
  segmentLength: number = 4,
  separator: string = '-'
): string[] => {
  const validCount = validateCount(count, MAX_RECOVERY_CODES);
  const codes: string[] = [];
  const totalLength = segmentLength * 2;
  const chars = ALPHANUMERIC;

  for (let i = 0; i < validCount; i++) {
    let raw = '';
    for (let j = 0; j < totalLength; j++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      raw += chars[randomIndex];
    }
    const formatted = raw.slice(0, segmentLength) + separator + raw.slice(segmentLength);
    codes.push(formatted);
  }

  return codes;
};

// ==================== Nonce Generation ====================

/**
 * Generate a cryptographically secure nonce (number used once)
 * Base64 encoded for compactness
 *
 * @param length - Length in bytes (default: 16)
 * @returns Base64 encoded nonce
 */
export const generateNonce = (length: number = DEFAULT_NONCE_LENGTH): string => {
  const validLength = validateLength(length, MIN_NONCE_LENGTH_BYTES, MAX_NONCE_LENGTH_BYTES);
  return crypto.randomBytes(validLength).toString('base64');
};

/**
 * Generate a timestamp-based nonce with random component
 * Combines time and randomness for uniqueness without state
 *
 * @returns Timestamp-based nonce string
 */
export const generateTimestampNonce = (): string => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(8).toString('hex');
  return `${timestamp}-${random}`;
};

/**
 * Generate a short nonce for one-time use (e.g., state parameter)
 */
export const generateShortNonce = (): string => {
  return crypto.randomBytes(16).toString('base64url');
};

// ==================== Combined Secret Generation ====================

/**
 * Generate a complete set of secrets (token, recovery codes, nonce)
 * Useful for user onboarding
 */
export interface GeneratedSecrets {
  token: string;
  recoveryCodes: string[];
  nonce: string;
}

export const generateSecrets = (): GeneratedSecrets => {
  return {
    token: generateToken(),
    recoveryCodes: generateRecoveryCodes(),
    nonce: generateNonce(),
  };
};

// ==================== Entropy/Quality Helpers ====================

/**
 * Get the entropy (randomness) quality of the system
 * Returns approximate bits of entropy per byte
 */
export const getEntropyQuality = (): {
  hasSecureCrypto: boolean;
  entropyBitsPerByte: number;
  recommendedMinimumLength: number;
} => {
  const hasSecureCrypto = typeof crypto !== 'undefined' && crypto.randomBytes !== undefined;
  return {
    hasSecureCrypto,
    entropyBitsPerByte: hasSecureCrypto ? 8 : 0,
    recommendedMinimumLength: hasSecureCrypto ? 32 : 64,
  };
};

// ==================== Bangladesh Specific (Mobile OTP) ====================

/**
 * Generate OTP for Bangladesh mobile networks
 * 6-digit OTP as standard for Bangladesh
 */
export const generateBangladeshOtp = (): string => {
  return generateOtp(6);
};

/**
 * Generate WhatsApp OTP (numeric, 6 digits)
 * Standard for WhatsApp verification in Bangladesh
 */
export const generateWhatsAppOtp = (): string => {
  return generateOtp(6);
};

/**
 * Generate voice call OTP (numeric, 6 digits)
 * For feature phone users in Bangladesh
 */
export const generateVoiceCallOtp = (): string => {
  return generateOtp(6);
};

// ==================== Type Exports ====================

export type OTPString = ReturnType<typeof generateOtp>;
export type TokenString = ReturnType<typeof generateToken>;
export type UUIDString = ReturnType<typeof generateUuid>;
export type NonceString = ReturnType<typeof generateNonce>;
export type RecoveryCodeString = ReturnType<typeof generateRecoveryCode>;
export type BangladeshOtpString = ReturnType<typeof generateBangladeshOtp>;
export type WhatsAppOtpString = ReturnType<typeof generateWhatsAppOtp>;
export type VoiceCallOtpString = ReturnType<typeof generateVoiceCallOtp>;
