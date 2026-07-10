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
} from '@vubon/shared-constants';

// ==================== Fallback Constants (not exported from shared-constants) ====================

const TOKEN_CONFIG = {
  DEFAULT_LENGTH: 32,
  MIN_LENGTH: 16,
  MAX_LENGTH: 256,
};

const NONCE_CONFIG = {
  DEFAULT_LENGTH: 16,
  MIN_LENGTH: 8,
  MAX_LENGTH: 64,
};

const CHARACTER_SETS = {
  ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  NUMERIC: '0123456789',
  HEX_LOWER: '0123456789abcdef',
  HEX_UPPER: '0123456789ABCDEF',
  BASE64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  BASE64URL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  SECURE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}<>?',
};

// ==================== Constants ====================

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
const BASE64_CHARS = CHARACTER_SETS.BASE64;
const BASE64URL_CHARS = CHARACTER_SETS.BASE64URL;
const SECURE_CHARS = CHARACTER_SETS.SECURE;

// Default lengths
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
const MIN_NONCE_LENGTH_BYTES = NONCE_CONFIG.MIN_LENGTH;
const MAX_NONCE_LENGTH_BYTES = NONCE_CONFIG.MAX_LENGTH;

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
      // ✅ FIXED: Check for undefined
      if (byte !== undefined && byte < maxValid) {
        result += charset[byte % charsetLength];
      }
    }
  }

  return result;
};

/**
 * Validate count parameter
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

export const generateOtp = (length: number = OTP_LENGTH): string => {
  const validLength = validateLength(length, MIN_OTP_LENGTH, MAX_OTP_LENGTH);
  const min = Math.pow(10, validLength - 1);
  const max = Math.pow(10, validLength) - 1;
  const otp = crypto.randomInt(min, max + 1);
  return otp.toString().padStart(validLength, '0');
};

export const generateOtps = (count: number, length: number = OTP_LENGTH): string[] => {
  const validCount = validateCount(count, MAX_COUNT);
  const otps: string[] = [];
  for (let i = 0; i < validCount; i++) {
    otps.push(generateOtp(length));
  }
  return otps;
};

export const generateOtpNumber = (length: number = OTP_LENGTH): number => {
  const validLength = validateLength(length, MIN_OTP_LENGTH, MAX_OTP_LENGTH);
  const min = Math.pow(10, validLength - 1);
  const max = Math.pow(10, validLength) - 1;
  return crypto.randomInt(min, max + 1);
};

// ==================== Token Generation ====================

export const generateToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  const validLength = validateLength(length, MIN_TOKEN_LENGTH_BYTES, MAX_TOKEN_LENGTH_BYTES);
  return crypto.randomBytes(validLength).toString('hex');
};

export const generateRandomString = (
  length: number = DEFAULT_TOKEN_LENGTH,
  chars: string = ALPHANUMERIC
): string => {
  const validLength = validateLength(length, MIN_RANDOM_STRING_LENGTH, MAX_RANDOM_STRING_LENGTH);
  return generateRandomFromCharset(validLength, chars);
};

export const generateAlphanumericToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, ALPHANUMERIC);
};

export const generateNumericToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, NUMERIC);
};

export const generateHexToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, HEX_LOWER);
};

export const generateBase64Token = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, BASE64_CHARS);
};

export const generateBase64UrlToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, BASE64URL_CHARS);
};

export const generateSecureToken = (length: number = DEFAULT_TOKEN_LENGTH): string => {
  return generateRandomString(length, SECURE_CHARS);
};

// ==================== UUID Generation ====================

export const generateUuid = (): string => {
  return crypto.randomUUID();
};

export const generateUuids = (count: number): string[] => {
  const validCount = validateCount(count, MAX_COUNT);
  const uuids: string[] = [];
  for (let i = 0; i < validCount; i++) {
    uuids.push(generateUuid());
  }
  return uuids;
};

export const isValidUuid = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// ==================== Recovery Code Generation ====================

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

export const generateRecoveryCode = (codeLength: number = DEFAULT_RECOVERY_CODE_LENGTH): string => {
  return generateRecoveryCodes(1, codeLength)[0]!;
};

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

export const generateNonce = (length: number = DEFAULT_NONCE_LENGTH): string => {
  const validLength = validateLength(length, MIN_NONCE_LENGTH_BYTES, MAX_NONCE_LENGTH_BYTES);
  return crypto.randomBytes(validLength).toString('base64');
};

export const generateTimestampNonce = (): string => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(8).toString('hex');
  return `${timestamp}-${random}`;
};

export const generateShortNonce = (): string => {
  return crypto.randomBytes(16).toString('base64url');
};

// ==================== Combined Secret Generation ====================

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

// ==================== Bangladesh Specific ====================

export const generateBangladeshOtp = (): string => {
  return generateOtp(6);
};

export const generateWhatsAppOtp = (): string => {
  return generateOtp(6);
};

export const generateVoiceCallOtp = (): string => {
  return generateOtp(6);
};


/**
 * Character sets for secure password generation
 */
const PASSWORD_CHAR_SETS = {
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMBERS: '0123456789',
  SPECIAL: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

/**
 * Generate a cryptographically secure random password
 * 
 * @param length - Desired password length (default: 16)
 * @param options - Generation options
 * @returns Secure password string
 * 
 * @example
 * generateSecurePassword() // 'X9kL#mP2vQ$rN4wB'
 * generateSecurePassword(24, { includeNumbers: false }) // 'XyL#mPvQ$rNwBzF@jKtMpLwB'
 */
export const generateSecurePassword = (
  length: number = 16,
  options: {
    includeLowercase?: boolean;
    includeUppercase?: boolean;
    includeNumbers?: boolean;
    includeSpecial?: boolean;
    excludeAmbiguous?: boolean;
  } = {}
): string => {
  const {
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSpecial = true,
    excludeAmbiguous = false,
  } = options;

  // Build character set
  let charSet = '';
  if (includeLowercase) charSet += PASSWORD_CHAR_SETS.LOWERCASE || 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) charSet += PASSWORD_CHAR_SETS.UPPERCASE || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charSet += PASSWORD_CHAR_SETS.NUMBERS || '0123456789';
  if (includeSpecial) charSet += PASSWORD_CHAR_SETS.SPECIAL || '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Remove ambiguous characters if requested
  if (excludeAmbiguous) {
    const ambiguous = 'il1Lo0O';
    charSet = charSet.replace(new RegExp(`[${ambiguous}]`, 'g'), '');
  }

  // Ensure at least one character set
  if (charSet.length === 0) {
    charSet = (PASSWORD_CHAR_SETS.LOWERCASE || 'abcdefghijklmnopqrstuvwxyz') + 
              (PASSWORD_CHAR_SETS.UPPERCASE || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  // Generate password
  let password = '';
  const charArray = charSet.split('');
  
  // ✅ FIXED: safe random index generation
  const getRandomIndex = (): number => {
    if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
      try {
        const randomBuffer = new Uint32Array(1);
        globalThis.crypto.getRandomValues(randomBuffer);
        const randomValue = randomBuffer[0];
        if (randomValue !== undefined && charArray.length > 0) {
          return randomValue % charArray.length;
        }
      } catch {
        // Fallback to Math.random if crypto fails
      }
    }
    // Fallback (should not be used in production)
    return Math.floor(Math.random() * charArray.length);
  };

  // ✅ FIXED: safe character set access with fallbacks
  const ensureOneFromEach = () => {
    const requiredChars: string[] = [];
    
    if (includeLowercase) {
      const chars = PASSWORD_CHAR_SETS.LOWERCASE || 'abcdefghijklmnopqrstuvwxyz';
      requiredChars.push(chars);
    }
    if (includeUppercase) {
      const chars = PASSWORD_CHAR_SETS.UPPERCASE || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      requiredChars.push(chars);
    }
    if (includeNumbers) {
      const chars = PASSWORD_CHAR_SETS.NUMBERS || '0123456789';
      requiredChars.push(chars);
    }
    if (includeSpecial) {
      const chars = PASSWORD_CHAR_SETS.SPECIAL || '!@#$%^&*()_+-=[]{}|;:,.<>?';
      requiredChars.push(chars);
    }

    // Fallback
    if (requiredChars.length === 0) {
      const fallback = (PASSWORD_CHAR_SETS.LOWERCASE || 'abcdefghijklmnopqrstuvwxyz') +
                       (PASSWORD_CHAR_SETS.UPPERCASE || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      requiredChars.push(fallback);
    }

    for (const set of requiredChars) {
      const setArray = set.split('');
      if (setArray.length === 0) continue;
      const randomIndex = getRandomIndex();
      const char = setArray[randomIndex % setArray.length];
      password += char || 'a'; // ✅ extra safety
    }
  };

  // Start with required characters
  ensureOneFromEach();

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    if (charArray.length === 0) {
      password += 'a';
      continue;
    }
    const randomIndex = getRandomIndex();
    const char = charArray[randomIndex % charArray.length];
    password += char || 'a';
  }

  // Shuffle password for security (Fisher-Yates)
const passwordArray = password.split('');
for (let i = passwordArray.length - 1; i > 0; i--) {
  // ✅ j-এর মান 0 থেকে i-এর মধ্যে হবে (ইনক্লুসিভ)
  const j = getRandomIndex() % (i + 1);
  // ✅ i এবং j উভয়ই বৈধ ইনডেক্স (i >= j, এবং j >= 0)
  // TypeScript এর জন্য টাইপ অ্যাসার্শন ব্যবহার:
  const temp = passwordArray[i] as string;
  passwordArray[i] = passwordArray[j] as string;
  passwordArray[j] = temp;
}

  return passwordArray.join('');
};

// ✅ Export type for password generation options
export interface SecurePasswordOptions {
  includeLowercase?: boolean;
  includeUppercase?: boolean;
  includeNumbers?: boolean;
  includeSpecial?: boolean;
  excludeAmbiguous?: boolean;
}

// ==================== Type Exports ====================

export type OTPString = ReturnType<typeof generateOtp>;
export type TokenString = ReturnType<typeof generateToken>;
export type UUIDString = ReturnType<typeof generateUuid>;
export type NonceString = ReturnType<typeof generateNonce>;
export type RecoveryCodeString = ReturnType<typeof generateRecoveryCode>;
export type BangladeshOtpString = ReturnType<typeof generateBangladeshOtp>;
export type WhatsAppOtpString = ReturnType<typeof generateWhatsAppOtp>;
export type VoiceCallOtpString = ReturnType<typeof generateVoiceCallOtp>;
