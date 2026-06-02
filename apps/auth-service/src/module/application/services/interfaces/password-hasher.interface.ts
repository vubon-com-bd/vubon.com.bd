/**
 * Password Hasher Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/password-hasher.interface
 * 
 * @description
 * Interface for password hashing operations.
 * Implementation resides in infrastructure layer (bcrypt, argon2, etc.)
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Infrastructure-agnostic
 * ✅ Support for algorithm upgrades
 * ✅ Support for password breach detection
 */

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - কেন্দ্রীভূত কনফিগারেশন
import { 
  PASSWORD_POLICY, 
  HASHING_CONFIG, 
  HASH_ALGORITHMS,
  BCRYPT_DEFAULTS as SHARED_BCRYPT_DEFAULTS,
  ARGON2ID_DEFAULTS as SHARED_ARGON2ID_DEFAULTS,
  SCRYPT_DEFAULTS as SHARED_SCRYPT_DEFAULTS
} from '@vubon/shared-constants';
// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { HashAlgorithm } from '@vubon/shared-types';

// ============================================================
// Hash Algorithm Types (শেয়ার্ড কনস্ট্যান্ট থেকে রি-এক্সপোর্ট)
// ============================================================

/**
 * Supported hash algorithms
 * Values come from shared-constants for consistency
 */
export type HashAlgorithm = typeof HASH_ALGORITHMS[keyof typeof HASH_ALGORITHMS];

// ============================================================
// Hashing Options (শেয়ার্ড কনস্ট্যান্ট থেকে ডিফল্ট মান)
// ============================================================

export interface HashingOptions {
  /** Hash algorithm to use (default comes from shared-constants) */
  algorithm?: HashAlgorithm;
  
  /** Cost factor (bcrypt rounds or argon2 iterations) - default from shared-constants */
  cost?: number;
  
  /** Memory usage (for argon2) - in KB - default from shared-constants */
  memory?: number;
  
  /** Parallelism (for argon2) - default from shared-constants */
  parallelism?: number;
  
  /** Key length (for argon2) - in bytes - default from shared-constants */
  keyLength?: number;
  
  /** Salt length (for bcrypt/scrypt) - in bytes - default from shared-constants */
  saltLength?: number;
}

// ============================================================
// Hash Info Interface
// ============================================================

export interface HashInfo {
  /** Hash algorithm used */
  algorithm: HashAlgorithm;
  
  /** Cost factor used */
  cost: number;
  
  /** Version of the hash format */
  version: number;
  
  /** Whether the hash needs rehashing (for upgrades) */
  needsRehash: boolean;
  
  /** When the hash was created (if available) */
  createdAt?: Date;
  
  /** Salt used (if available) */
  salt?: string;
}

// ============================================================
// Password Strength Result (শেয়ার্ড কনস্ট্যান্ট থেকে নিয়ম)
// ============================================================

export interface PasswordStrengthResult {
  /** Whether password meets minimum requirements (from PASSWORD_POLICY) */
  isValid: boolean;
  
  /** Strength score from 0-100 */
  score: number;
  
  /** Password strength level */
  level: 'very_weak' | 'weak' | 'medium' | 'strong' | 'very_strong';
  
  /** Estimated crack time (human readable) */
  estimatedCrackTime: string;
  
  /** List of validation errors */
  errors: string[];
  
  /** List of suggestions for improvement */
  suggestions: string[];
  
  /** Which character types are present */
  characterTypes: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  
  /** Password length */
  length: number;
  
  /** ✅ ইম্প্রুভমেন্ট: বেঙ্গলি ভাষায় ত্রুটি ও পরামর্শ (বাংলাদেশ স্পেসিফিক) */
  errorsBn?: string[];
  suggestionsBn?: string[];
}

// ============================================================
// Breach Check Result
// ============================================================

export interface BreachCheckResult {
  /** Whether password has been found in data breaches */
  isCompromised: boolean;
  
  /** Number of times password appeared in breaches */
  breachCount?: number;
  
  /** List of breaches where password was found */
  breachSources?: string[];
  
  /** When the check was performed */
  checkedAt: Date;
  
  /** ✅ ইম্প্রুভমেন্ট: সুপারিশ (বাংলাদেশ স্পেসিফিক) */
  recommendation?: string;
  recommendationBn?: string;
}

// ============================================================
// Password History Validation
// ============================================================

export interface PasswordHistoryValidation {
  /** Whether password is new (not in history) */
  isNew: boolean;
  
  /** How many times this password has been used before */
  reuseCount: number;
  
  /** When this password was last used */
  lastUsedAt?: Date;
  
  /** Position in history (1 = most recent) */
  position?: number;
}

// ============================================================
// Password Strength Validation Options (শেয়ার্ড কনস্ট্যান্ট থেকে)
// ============================================================

export interface PasswordStrengthOptions {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecial?: boolean;
  /** ✅ ইম্প্রুভমেন্ট: কমন পাসওয়ার্ড চেক করা হবে কিনা */
  checkCommonPasswords?: boolean;
  /** ✅ ইম্প্রুভমেন্ট: ব্যক্তিগত তথ্য চেক করা হবে কিনা (নাম, ইমেইল) */
  checkPersonalInfo?: boolean;
}

// ============================================================
// Password Hasher Interface
// ============================================================

export interface PasswordHasher {
  // ============================================================
  // Core Hashing Operations
  // ============================================================
  
  /**
   * Hash a plain text password
   * 
   * @param password - Plain text password
   * @param options - Optional hashing options (algorithm, cost, etc.)
   * @returns Hashed password string
   * 
   * @example
   * const hashed = await passwordHasher.hash('MyP@ssw0rd');
   * // '$2b$10$...'
   */
  hash(password: string, options?: HashingOptions): Promise<string>;
  
  /**
   * Compare a plain text password with a hash (timing-safe)
   * 
   * @param plain - Plain text password
   * @param hashed - Hashed password string
   * @returns True if passwords match
   */
  compare(plain: string, hashed: string): Promise<boolean>;
  
  /**
   * Timing-safe compare (constant time) - alias for compare
   */
  safeCompare(plain: string, hashed: string): Promise<boolean>;
  
  /**
   * Check if a hash needs rehashing (for security upgrades)
   * 
   * @param hashed - Hashed password string
   * @param options - Current hashing options
   * @returns True if the hash should be rehashed
   */
  needsRehash(hashed: string, options?: HashingOptions): Promise<boolean>;
  
  /**
   * Get information about a hash
   * 
   * @param hashed - Hashed password string
   * @returns Hash information (algorithm, cost, version, etc.)
   */
  getHashInfo(hashed: string): Promise<HashInfo>;
  
  /**
   * Check if a hash is valid (not corrupted)
   * 
   * @param hashed - Hashed password string
   * @returns True if the hash format is valid
   */
  isValidHash(hashed: string): Promise<boolean>;
  
  // ============================================================
  // Password Generation
  // ============================================================
  
  /**
   * Generate a cryptographically secure random password
   * 
   * @param length - Password length (default from PASSWORD_POLICY)
   * @param options - Options for character sets
   * @returns Random secure password
   * 
   * @example
   * const tempPassword = await passwordHasher.generateRandomPassword();
   * // 'x7K!mN9$pQ2@vL5#'
   */
  generateRandomPassword(
    length?: number,
    options?: {
      includeUppercase?: boolean;
      includeLowercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    },
  ): Promise<string>;
  
  // ============================================================
  // Password Strength Validation
  // ============================================================
  
  /**
   * Validate password strength with detailed analysis
   * ✅ ইম্প্রুভমেন্ট: ব্যক্তিগত তথ্য চেক করার সুযোগ
   * 
   * @param password - Password to validate
   * @param options - Optional validation options (defaults from PASSWORD_POLICY)
   * @param userInfo - Optional user info for personal data check
   * @returns Detailed validation result
   */
  validateStrength(
    password: string,
    options?: PasswordStrengthOptions,
    userInfo?: {
      email?: string;
      name?: string;
      phone?: string;
    }
  ): Promise<PasswordStrengthResult>;
  
  // ============================================================
  // Breach Detection
  // ============================================================
  
  /**
   * Check if password has been exposed in data breaches
   * Uses k-anonymity (password not sent directly)
   * 
   * @param password - Plain text password to check
   * @returns Breach check result with recommendation
   */
  checkBreach(password: string): Promise<BreachCheckResult>;
  
  // ============================================================
  // History Validation
  // ============================================================
  
  /**
   * Validate password against history (prevent reuse)
   * 
   * @param password - Plain text password
   * @param historyHashes - Array of previous password hashes
   * @returns History validation result
   */
  checkHistory(
    password: string,
    historyHashes: string[]
  ): Promise<PasswordHistoryValidation>;
  
  // ============================================================
  // Configuration & Utility Methods
  // ============================================================
  
  /**
   * Get recommended hashing options for current security standards
   * ✅ ইম্প্রুভমেন্ট: শেয়ার্ড কনস্ট্যান্ট থেকে মান নেওয়া
   * 
   * @returns Recommended hashing options
   */
  getRecommendedOptions(): HashingOptions;
  
  /**
   * Get default hashing options for the configured algorithm
   * 
   * @returns Default hashing options
   */
  getDefaultOptions(): HashingOptions;
  
  /**
   * Get supported hash algorithms
   * ✅ ইম্প্রুভমেন্ট: শেয়ার্ড কনস্ট্যান্ট থেকে মান নেওয়া
   * 
   * @returns Array of supported algorithms
   */
  getSupportedAlgorithms(): HashAlgorithm[];
  
  /**
   * Get current password policy (from shared-constants)
   * ✅ ইম্প্রুভমেন্ট: নতুন ইউটিলিটি মেথড
   * 
   * @returns Current password policy
   */
  getPasswordPolicy(): typeof PASSWORD_POLICY;
  
  /**
   * Get common passwords list (for checking weak passwords)
   * ✅ ইম্প্রুভমেন্ট: নতুন ইউটিলিটি মেথড
   * 
   * @returns Set of common passwords
   */
  getCommonPasswords(): Promise<Set<string>>;
}

// ============================================================
// Algorithm-specific default configurations (শেয়ার্ড কনস্ট্যান্ট থেকে রি-এক্সপোর্ট)
// ============================================================

/**
 * ✅ ইম্প্রুভমেন্ট: শেয়ার্ড কনস্ট্যান্ট থেকে মান নেওয়া
 */
export const BCRYPT_DEFAULTS = {
  algorithm: SHARED_BCRYPT_DEFAULTS.algorithm,
  cost: SHARED_BCRYPT_DEFAULTS.cost,
  saltLength: SHARED_BCRYPT_DEFAULTS.saltLength,
} as const;

export const ARGON2ID_DEFAULTS = {
  algorithm: SHARED_ARGON2ID_DEFAULTS.algorithm,
  cost: SHARED_ARGON2ID_DEFAULTS.cost,
  memory: SHARED_ARGON2ID_DEFAULTS.memory,
  parallelism: SHARED_ARGON2ID_DEFAULTS.parallelism,
  keyLength: SHARED_ARGON2ID_DEFAULTS.keyLength,
} as const;

export const SCRYPT_DEFAULTS = {
  algorithm: SHARED_SCRYPT_DEFAULTS.algorithm,
  cost: SHARED_SCRYPT_DEFAULTS.cost,
  memory: SHARED_SCRYPT_DEFAULTS.memory,
  parallelism: SHARED_SCRYPT_DEFAULTS.parallelism,
  keyLength: SHARED_SCRYPT_DEFAULTS.keyLength,
} as const;

// ============================================================
// ✅ ইম্প্রুভমেন্ট: বেঙ্গলি ভাষার জন্য অতিরিক্ত টাইপ
// ============================================================

export interface BengaliPasswordSuggestion {
  /** Bengali suggestion text */
  bn: string;
  /** English suggestion text */
  en: string;
}

// ============================================================
// Type Guards
// ============================================================

export function isHashAlgorithm(algorithm: string): algorithm is HashAlgorithm {
  return Object.values(HASH_ALGORITHMS).includes(algorithm as HashAlgorithm);
}

export function isHashInfo(obj: unknown): obj is HashInfo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'algorithm' in obj &&
    'cost' in obj &&
    'version' in obj &&
    'needsRehash' in obj
  );
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  HashingOptions as HashingOptionsType,
  HashInfo as HashInfoType,
  PasswordStrengthResult as PasswordStrengthResultType,
  BreachCheckResult as BreachCheckResultType,
  PasswordHistoryValidation as PasswordHistoryValidationType,
  PasswordStrengthOptions as PasswordStrengthOptionsType,
  BengaliPasswordSuggestion as BengaliPasswordSuggestionType
};
