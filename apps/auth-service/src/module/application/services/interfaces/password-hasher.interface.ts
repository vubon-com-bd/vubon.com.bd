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

// ============================================================
// Hash Algorithm Types
// ============================================================

export type HashAlgorithm = 'bcrypt' | 'argon2id' | 'argon2i' | 'argon2d' | 'scrypt';

// ============================================================
// Hashing Options
// ============================================================

export interface HashingOptions {
  /** Hash algorithm to use (default: 'bcrypt') */
  algorithm?: HashAlgorithm;
  
  /** Cost factor (bcrypt rounds or argon2 iterations) */
  cost?: number;
  
  /** Memory usage (for argon2) - in KB */
  memory?: number;
  
  /** Parallelism (for argon2) */
  parallelism?: number;
  
  /** Key length (for argon2) - in bytes */
  keyLength?: number;
  
  /** Salt length (for bcrypt/scrypt) - in bytes */
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
// Password Strength Result
// ============================================================

export interface PasswordStrengthResult {
  /** Whether password meets minimum requirements */
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
// Password Hasher Interface
// ============================================================

export interface PasswordHasher {
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
   * 
   * @example
   * const hashed = await passwordHasher.hash('MyP@ssw0rd', { 
   *   algorithm: 'argon2id', 
   *   cost: 12,
   *   memory: 65536,
   *   parallelism: 4
   * });
   */
  hash(password: string, options?: HashingOptions): Promise<string>;
  
  /**
   * Compare a plain text password with a hash
   * 
   * @param plain - Plain text password
   * @param hashed - Hashed password string
   * @returns True if passwords match
   * 
   * @example
   * const isValid = await passwordHasher.compare('MyP@ssw0rd', hashedPassword);
   * // true or false
   */
  compare(plain: string, hashed: string): Promise<boolean>;
  
  /**
   * Timing-safe compare (constant time) - alias for compare
   * 
   * @param plain - Plain text password
   * @param hashed - Hashed password string
   * @returns True if passwords match
   */
  safeCompare(plain: string, hashed: string): Promise<boolean>;
  
  /**
   * Check if a hash needs rehashing (for security upgrades)
   * 
   * @param hashed - Hashed password string
   * @param options - Current hashing options (algorithm, cost, etc.)
   * @returns True if the hash should be rehashed
   * 
   * @example
   * const needsRehash = await passwordHasher.needsRehash(hashedPassword, { cost: 12 });
   * if (needsRehash) {
   *   // Rehash the password on next login
   *   const newHash = await passwordHasher.hash(plainPassword, { cost: 12 });
   * }
   */
  needsRehash(hashed: string, options?: HashingOptions): Promise<boolean>;
  
  /**
   * Get information about a hash
   * 
   * @param hashed - Hashed password string
   * @returns Hash information (algorithm, cost, version, etc.)
   * 
   * @example
   * const info = await passwordHasher.getHashInfo(hashedPassword);
   * console.log(info.algorithm); // 'bcrypt'
   * console.log(info.cost); // 10
   */
  getHashInfo(hashed: string): Promise<HashInfo>;
  
  /**
   * Check if a hash is valid (not corrupted)
   * 
   * @param hashed - Hashed password string
   * @returns True if the hash format is valid
   * 
   * @example
   * const isValid = await passwordHasher.isValidHash(hashedPassword);
   * if (!isValid) {
   *   // Hash is corrupted, need to reset password
   * }
   */
  isValidHash(hashed: string): Promise<boolean>;
  
  /**
   * Generate a cryptographically secure random password
   * 
   * @param length - Password length (default: 16)
   * @param options - Options for character sets
   * @returns Random secure password
   * 
   * @example
   * const tempPassword = await passwordHasher.generateRandomPassword();
   * // 'x7K!mN9$pQ2@vL5#'
   * 
   * @example
   * const tempPassword = await passwordHasher.generateRandomPassword(12, {
   *   includeUppercase: true,
   *   includeLowercase: true,
   *   includeNumbers: true,
   *   includeSpecial: false
   * });
   * // 'x7KmN9pQ2vL5'
   */
  generateRandomPassword(
    length?: number,
    options?: {
      includeUppercase?: boolean;
      includeLowercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;  // Exclude similar characters (0, O, I, l, etc.)
    },
  ): Promise<string>;
  
  /**
   * Validate password strength with detailed analysis
   * 
   * @param password - Password to validate
   * @param options - Optional validation options
   * @returns Detailed validation result
   * 
   * @example
   * const result = await passwordHasher.validateStrength('weak');
   * console.log(result.isValid); // false
   * console.log(result.level); // 'very_weak'
   * console.log(result.errors); // ['Password must be at least 8 characters']
   */
  validateStrength(
    password: string,
    options?: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumbers?: boolean;
      requireSpecial?: boolean;
      maxLength?: number;
    },
  ): Promise<PasswordStrengthResult>;
  
  /**
   * Check if password has been exposed in data breaches (using HaveIBeenPwned API or similar)
   * 
   * @param password - Plain text password to check (not sent directly, uses k-anonymity)
   * @returns Breach check result
   * 
   * @example
   * const result = await passwordHasher.checkBreach('MyP@ssw0rd');
   * if (result.isCompromised) {
   *   // Force password change
   * }
   */
  checkBreach(password: string): Promise<BreachCheckResult>;
  
  /**
   * Validate password against history (prevent reuse)
   * 
   * @param password - Plain text password
   * @param historyHashes - Array of previous password hashes
   * @returns History validation result
   * 
   * @example
   * const result = await passwordHasher.checkHistory(newPassword, previousHashes);
   * if (!result.isNew) {
   *   // Password was used before
   * }
   */
  checkHistory(
    password: string,
    historyHashes: string[]
  ): Promise<PasswordHistoryValidation>;
  
  /**
   * Get recommended hashing options for current security standards
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
   * 
   * @returns Array of supported algorithms
   */
  getSupportedAlgorithms(): HashAlgorithm[];
}

// ============================================================
// Algorithm-specific default configurations
// ============================================================

export const BCRYPT_DEFAULTS = {
  algorithm: 'bcrypt' as const,
  cost: 12,
  saltLength: 16,
};

export const ARGON2ID_DEFAULTS = {
  algorithm: 'argon2id' as const,
  cost: 12,        // iterations
  memory: 65536,   // 64 MB in KB
  parallelism: 4,
  keyLength: 32,
};

export const SCRYPT_DEFAULTS = {
  algorithm: 'scrypt' as const,
  cost: 16384,     // N
  memory: 8,       // r
  parallelism: 1,  // p
  keyLength: 32,
};

// ============================================================
// Type Guards
// ============================================================

export function isHashAlgorithm(algorithm: string): algorithm is HashAlgorithm {
  return ['bcrypt', 'argon2id', 'argon2i', 'argon2d', 'scrypt'].includes(algorithm);
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
  PasswordHistoryValidation as PasswordHistoryValidationType
};
