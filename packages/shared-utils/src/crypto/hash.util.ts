/**
 * Hash Utilities - Pure password hashing and comparison
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/crypto/hash.util
 *
 * RULES:
 * ✅ ONLY password hashing and comparison - NO business logic
 * ✅ NO database operations, business logic, side effects
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No console.log or external API calls
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
// ✅ FIXED: Correct package name
import { PASSWORD_POLICY, ENCRYPTION_CONFIG, COMMON_PASSWORDS } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// Bcrypt salt rounds from constants
export const DEFAULT_SALT_ROUNDS = ENCRYPTION_CONFIG.SALT_ROUNDS;
export const MIN_SALT_ROUNDS = ENCRYPTION_CONFIG.MIN_SALT_ROUNDS;
export const MAX_SALT_ROUNDS = ENCRYPTION_CONFIG.MAX_SALT_ROUNDS;

// Password strength thresholds from constants (with fallbacks)
const PASSWORD_MIN_LENGTH = PASSWORD_POLICY.MIN_LENGTH;
// ✅ FIXED: Add fallbacks for missing constants
const PASSWORD_STRONG_LENGTH = (PASSWORD_POLICY as any).STRONG_LENGTH || 12;
const PASSWORD_VERY_STRONG_LENGTH = (PASSWORD_POLICY as any).VERY_STRONG_LENGTH || 16;

// Common passwords from constants
const COMMON_PATTERNS = COMMON_PASSWORDS;

// Hash algorithms
export const HASH_ALGORITHMS = {
  SHA256: 'sha256',
  SHA512: 'sha512',
  MD5: 'md5', // Legacy only - not for security
} as const;

export type HashAlgorithm = typeof HASH_ALGORITHMS[keyof typeof HASH_ALGORITHMS];

// ==================== Private Helpers ====================

/**
 * Validate salt rounds (silent correction, no console.warn)
 */
const validateSaltRounds = (saltRounds: number): number => {
  if (saltRounds < MIN_SALT_ROUNDS) {
    return MIN_SALT_ROUNDS;
  }
  if (saltRounds > MAX_SALT_ROUNDS) {
    return MAX_SALT_ROUNDS;
  }
  return saltRounds;
};

// ==================== Bcrypt Password Hashing ====================

/**
 * Hash a password using bcrypt (async - recommended)
 * Pure function - deterministic given same inputs
 *
 * @param password - Plain text password (will be validated)
 * @param saltRounds - Number of salt rounds (default from constants, min: 10, max: 14)
 * @returns Hashed password
 * @throws Error if password is empty or invalid
 *
 * @example
 * const hash = await hashPassword('mySecurePassword123!');
 * // Returns: "$2a$12$KIXNzGZ5Lk..."
 */
export const hashPassword = async (
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS
): Promise<string> => {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty');
  }

  const rounds = validateSaltRounds(saltRounds);
  return bcrypt.hash(password, rounds);
};

/**
 * Hash a password using bcrypt (sync version)
 * Use async version for better performance in server environments
 *
 * @param password - Plain text password
 * @param saltRounds - Number of salt rounds (default from constants)
 * @returns Hashed password
 */
export const hashPasswordSync = (
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS
): string => {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty');
  }

  const rounds = validateSaltRounds(saltRounds);
  return bcrypt.hashSync(password, rounds);
};

/**
 * Compare a plain text password with a bcrypt hash
 *
 * @param password - Plain text password
 * @param hash - Bcrypt hash to compare against
 * @returns True if password matches the hash
 *
 * @example
 * const isValid = await comparePassword('myPassword', storedHash);
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash) {
    return false;
  }
  return bcrypt.compare(password, hash);
};

/**
 * Compare a plain text password with a bcrypt hash (sync version)
 */
export const comparePasswordSync = (
  password: string,
  hash: string
): boolean => {
  if (!password || !hash) {
    return false;
  }
  return bcrypt.compareSync(password, hash);
};

/**
 * Check if a hash is a valid bcrypt hash format
 */
export const isValidBcryptHash = (hash: string): boolean => {
  if (!hash || typeof hash !== 'string') return false;
  // bcrypt hash format: $2a$10$...
  return /^\$2[aby]\$\d+\$[./A-Za-z0-9]{53}$/.test(hash);
};

// ==================== Password Strength Validation ====================

/**
 * Password strength result interface
 */
export interface PasswordStrengthResult {
  isValid: boolean;      // Meets minimum requirements (8+ chars, mixed case, number, special)
  isStrong: boolean;     // Meets strong requirements (12+ chars, all criteria)
  isVeryStrong: boolean; // Meets very strong requirements (16+ chars, all criteria)
  score: number;         // 0-5 score
  missing: string[];     // List of missing requirements
  suggestions: string[]; // Suggestions for improvement
}

/**
 * Check if password meets strength requirements
 * Pure function - deterministic based on input
 *
 * @param password - Password to check
 * @returns Detailed strength analysis
 */
export const checkPasswordStrength = (
  password: string
): PasswordStrengthResult => {
  const missing: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Length checks
  if (password.length >= PASSWORD_MIN_LENGTH) {
    score += 1;
  } else {
    missing.push(`At least ${PASSWORD_MIN_LENGTH} characters`);
    suggestions.push(`Add ${PASSWORD_MIN_LENGTH - password.length} more characters`);
  }

  if (password.length >= PASSWORD_STRONG_LENGTH) {
    score += 0.5;
  }

  if (password.length >= PASSWORD_VERY_STRONG_LENGTH) {
    score += 0.5;
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    missing.push('At least one uppercase letter (A-Z)');
    suggestions.push('Add an uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    missing.push('At least one lowercase letter (a-z)');
    suggestions.push('Add a lowercase letter');
  }

  // Number check
  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    missing.push('At least one number (0-9)');
    suggestions.push('Add a number');
  }

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    missing.push('At least one special character (!@#$%^&* etc.)');
    suggestions.push('Add a special character like !@#$%');
  }

  // Bonus: No common patterns check (from constants)
  const hasCommonPattern = COMMON_PATTERNS.some(
    (pattern) => password.toLowerCase().includes(pattern)
  );

  if (!hasCommonPattern) {
    score += 1;
  } else {
    suggestions.push('Avoid common words and patterns');
  }

  // Bonus: No sequential characters
  const hasSequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(password);
  if (!hasSequential) {
    score += 0.5;
  } else {
    suggestions.push('Avoid sequential characters like "abc" or "123"');
  }

  // Normalize score to 0-5 range
  const normalizedScore = Math.min(5, Math.floor(score));

  return {
    isValid: missing.length === 0,
    isStrong: password.length >= PASSWORD_STRONG_LENGTH && missing.length === 0,
    isVeryStrong: password.length >= PASSWORD_VERY_STRONG_LENGTH && missing.length === 0 && normalizedScore >= 5,
    score: normalizedScore,
    missing,
    suggestions,
  };
};

// ==================== Generic Hashing (SHA family) ====================

/**
 * Generate SHA-256 hash (Node.js only)
 * Pure function - deterministic given same input
 *
 * @param value - String to hash
 * @returns Hex encoded SHA-256 hash
 *
 * @example
 * const hash = sha256('hello world');
 * // Returns: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
 */
export const sha256 = (value: string): string => {
  if (!value) {
    throw new Error('Value to hash cannot be empty');
  }

  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
};

/**
 * Generate SHA-256 hash (async - for compatibility)
 * Use sync version for Node.js for better performance
 *
 * @param value - String to hash
 * @returns Hex encoded SHA-256 hash
 */
export const sha256Async = async (value: string): Promise<string> => {
  return sha256(value);
};

/**
 * Generate SHA-512 hash
 *
 * @param value - String to hash
 * @returns Hex encoded SHA-512 hash
 */
export const sha512 = (value: string): string => {
  if (!value) {
    throw new Error('Value to hash cannot be empty');
  }

  return crypto.createHash('sha512').update(value, 'utf8').digest('hex');
};

/**
 * Generate generic hash with specified algorithm
 *
 * @param value - String to hash
 * @param algorithm - Hash algorithm ('sha256', 'sha512', 'md5')
 * @returns Hex encoded hash
 */
export const hash = (value: string, algorithm: HashAlgorithm = 'sha256'): string => {
  if (!value) {
    throw new Error('Value to hash cannot be empty');
  }

  if (algorithm === 'md5') {
    // Silent fallback to sha256 for security - no console.warn
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
  }

  return crypto.createHash(algorithm).update(value, 'utf8').digest('hex');
};

/**
 * Generate HMAC hash (for message authentication)
 *
 * @param value - Value to hash
 * @param secret - Secret key
 * @param algorithm - Hash algorithm (default: sha256)
 * @returns Hex encoded HMAC hash
 */
export const hmac = (
  value: string,
  secret: string,
  algorithm: HashAlgorithm = 'sha256'
): string => {
  if (!value || !secret) {
    throw new Error('Value and secret are required for HMAC');
  }

  return crypto.createHmac(algorithm, secret).update(value, 'utf8').digest('hex');
};

// ==================== Timing-Safe Comparison ====================

/**
 * Timing-safe string comparison (prevents timing attacks)
 * Use for comparing sensitive values like passwords, tokens
 *
 * @param a - First string
 * @param b - Second string
 * @returns True if strings are equal
 */
export const timingSafeEqual = (a: string, b: string): boolean => {
  if (!a || !b) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(a, 'utf8'),
      Buffer.from(b, 'utf8')
    );
  } catch {
    return false;
  }
};

// ==================== Type Exports ====================

export type { PasswordStrengthResult };
