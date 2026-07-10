/**
 * Password Validator Adapter - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/adapters/password-validator.adapter
 *
 * @description
 * Infrastructure adapter that implements the IPasswordValidator port.
 * Uses @vubon/shared-utils and @vubon/shared-constants for validation.
 *
 * Enterprise Features:
 * ✅ Implements domain port (IPasswordValidator)
 * ✅ Uses shared-utils for actual validation
 * ✅ Comprehensive error handling
 * ✅ Caching for frequently validated passwords
 * ✅ Bangladesh specific - Pattern detection
 * ✅ Common password detection with caching
 *
 * @example
 * // In infrastructure module
 * const passwordValidator = new PasswordValidatorAdapter();
 * const password = new Password('MyStr0ng!P@ssw0rd', passwordValidator);
 */

import {
  checkPasswordStrength,
  calculateEntropy,
  generateSecurePassword as sharedGenerateSecurePassword,
} from '@vubon/shared-utils';

import {
  PASSWORD_POLICY,
  COMMON_PASSWORDS,
  BANGLADESH_PATTERNS,
} from '@vubon/shared-constants';

import {
  IPasswordValidator,
  PasswordStrength,
  PasswordValidationResult,
  EntropyResult,
} from '../../domain/ports/password-validator.port';

// ============================================================
// Constants (Infrastructure Level)
// ============================================================

/**
 * Strength mapping from shared-utils to domain
 */
const STRENGTH_MAPPING: Record<string, PasswordStrength> = {
  very_weak: PasswordStrength.VERY_WEAK,
  weak: PasswordStrength.WEAK,
  medium: PasswordStrength.MEDIUM,
  strong: PasswordStrength.STRONG,
  very_strong: PasswordStrength.VERY_STRONG,
};

/**
 * Strength descriptions
 */
const STRENGTH_DESCRIPTIONS: Record<PasswordStrength, string> = {
  [PasswordStrength.VERY_WEAK]: 'Very Weak - Easily guessable',
  [PasswordStrength.WEAK]: 'Weak - Could be cracked quickly',
  [PasswordStrength.MEDIUM]: 'Medium - Acceptable for most uses',
  [PasswordStrength.STRONG]: 'Strong - Good password with high security',
  [PasswordStrength.VERY_STRONG]: 'Very Strong - Excellent password security',
};

/**
 * Recommended lengths by strength
 */
const RECOMMENDED_LENGTHS: Record<PasswordStrength, number> = {
  [PasswordStrength.VERY_WEAK]: 6,
  [PasswordStrength.WEAK]: 8,
  [PasswordStrength.MEDIUM]: 10,
  [PasswordStrength.STRONG]: 12,
  [PasswordStrength.VERY_STRONG]: 16,
};

/**
 * Cache configuration
 */
const CACHE_CONFIG = {
  ENABLED: true,
  MAX_SIZE: 500,
  TTL_MS: 5 * 60 * 1000, // 5 minutes
} as const;

// ============================================================
// Cache Implementation
// ============================================================

interface CacheEntry {
  result: PasswordValidationResult;
  timestamp: number;
}

/**
 * Simple in-memory cache for password validation results
 */
class PasswordValidationCache {
  private cache = new Map<string, CacheEntry>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(maxSize: number = CACHE_CONFIG.MAX_SIZE, ttlMs: number = CACHE_CONFIG.TTL_MS) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  private getKey(password: string): string {
    return password; // Passwords are already unique
  }

  get(password: string): PasswordValidationResult | null {
    if (!CACHE_CONFIG.ENABLED) return null;

    const key = this.getKey(password);
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  set(password: string, result: PasswordValidationResult): void {
    if (!CACHE_CONFIG.ENABLED) return;

    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const key = this.getKey(password);
    this.cache.set(key, { result, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; maxSize: number } {
    return { size: this.cache.size, maxSize: this.maxSize };
  }
}

// ============================================================
// Helper Functions (Infrastructure Level)
// ============================================================

/**
 * Map shared strength to domain strength
 */
const mapToDomainStrength = (sharedStrength: {
  isValid: boolean;
  isStrong: boolean;
  isVeryStrong: boolean;
  score: number;
  missing: string[];
  suggestions: string[];
}): { strength: PasswordStrength; errors: string[]; suggestions: string[] } => {
  const errors: string[] = [...sharedStrength.missing];
  const suggestions: string[] = [...sharedStrength.suggestions];

  let strength: PasswordStrength;

  if (sharedStrength.isVeryStrong) {
    strength = PasswordStrength.VERY_STRONG;
  } else if (sharedStrength.isStrong) {
    strength = PasswordStrength.STRONG;
  } else if (sharedStrength.score >= 3) {
    strength = PasswordStrength.MEDIUM;
  } else if (sharedStrength.score >= 2) {
    strength = PasswordStrength.WEAK;
  } else {
    strength = PasswordStrength.VERY_WEAK;
  }

  return { strength, errors, suggestions };
};

/**
 * Check for Bangladesh-specific patterns
 */
const checkBangladeshPatterns = (password: string): string[] => {
  const warnings: string[] = [];
  const lowerPassword = password.toLowerCase();

  for (const pattern of BANGLADESH_PATTERNS) {
    if (lowerPassword.includes(pattern)) {
      warnings.push(`Contains Bangladesh-related pattern: "${pattern}"`);
      break;
    }
  }

  return warnings;
};

/**
 * Check for keyboard patterns
 */
const checkKeyboardPatterns = (password: string): string[] => {
  const warnings: string[] = [];
  const lowerPassword = password.toLowerCase();

  const keyboardPatterns = [
    'qwerty',
    'asdfgh',
    'zxcvbn',
    '1qaz2wsx',
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    '12345678',
    'abcdefgh',
  ];

  for (const pattern of keyboardPatterns) {
    if (lowerPassword.includes(pattern)) {
      warnings.push('Contains keyboard patterns (e.g., qwerty)');
      break;
    }
  }

  return warnings;
};

/**
 * Check for repeated characters
 */
const checkRepeatedChars = (password: string): string[] => {
  const warnings: string[] = [];

  if (/(.)\1{3,}/.test(password)) {
    warnings.push('Contains repeated character patterns');
  }

  return warnings;
};

/**
 * Check for sequential characters
 */
const checkSequentialChars = (password: string): string[] => {
  const warnings: string[] = [];
  const lowerPassword = password.toLowerCase();

  if (/123456|abcdef|qwerty|098765/.test(lowerPassword)) {
    warnings.push('Contains sequential characters');
  }

  return warnings;
};

/**
 * Check for year patterns
 */
const checkYearPatterns = (password: string): string[] => {
  const warnings: string[] = [];

  if (/\b(19|20)\d{2}\b/.test(password)) {
    warnings.push('Contains a year (e.g., 1990, 2024)');
  }

  return warnings;
};

// ============================================================
// Password Validator Adapter
// ============================================================

/**
 * Password Validator Adapter
 *
 * Implements IPasswordValidator port using shared-utils
 */
export class PasswordValidatorAdapter implements IPasswordValidator {
  private cache: PasswordValidationCache;

  constructor() {
    this.cache = new PasswordValidationCache();
  }

  /**
   * Validate a password with caching
   */
  validate(
    password: string,
    options?: {
      minStrength?: PasswordStrength;
      additionalCommonWords?: string[];
      checkCommonPasswords?: boolean;
      checkPersonalInfo?: boolean;
    }
  ): PasswordValidationResult {
    // Check cache first
    const cached = this.cache.get(password);
    if (cached) {
      return cached;
    }

    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      const suggestions: string[] = [];

      // Use shared utility for strength check
      const sharedStrength = checkPasswordStrength(password);

      // Map to domain types
      const { strength: mappedStrength, errors: mappedErrors, suggestions: mappedSuggestions } =
        mapToDomainStrength(sharedStrength);

      errors.push(...mappedErrors);
      suggestions.push(...mappedSuggestions);

      // Check length constraints
      if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
        errors.push(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
        suggestions.push(`Make password at least ${PASSWORD_POLICY.MIN_LENGTH + 4} characters`);
      }

      if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
        errors.push(`Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`);
      }

      // Check common passwords (using shared constant)
      const checkCommon = options?.checkCommonPasswords !== false;
      if (checkCommon) {
        const lowerPassword = password.toLowerCase();
        if (COMMON_PASSWORDS.has(lowerPassword as any)) {
          errors.push('Password is too common and easily guessable');
          suggestions.push('Choose a less common password');
        }
      }

      // Check Bangladesh patterns
      const bdWarnings = checkBangladeshPatterns(password);
      warnings.push(...bdWarnings);

      // Check keyboard patterns
      const keyboardWarnings = checkKeyboardPatterns(password);
      warnings.push(...keyboardWarnings);

      // Check repeated characters
      const repeatedWarnings = checkRepeatedChars(password);
      warnings.push(...repeatedWarnings);

      // Check sequential characters
      const sequentialWarnings = checkSequentialChars(password);
      warnings.push(...sequentialWarnings);

      // Check year patterns
      const yearWarnings = checkYearPatterns(password);
      warnings.push(...yearWarnings);

      // Calculate entropy
      const entropy = calculateEntropy(password);

      // Determine final strength
      let finalStrength = mappedStrength;
      if (errors.length > 0) {
        finalStrength = PasswordStrength.VERY_WEAK;
      } else if (entropy >= 90) {
        finalStrength = PasswordStrength.VERY_STRONG;
      } else if (entropy >= 70) {
        finalStrength = PasswordStrength.STRONG;
      } else if (entropy >= 50) {
        finalStrength = PasswordStrength.MEDIUM;
      } else if (entropy >= 35) {
        finalStrength = PasswordStrength.WEAK;
      } else {
        finalStrength = PasswordStrength.VERY_WEAK;
      }

      // Character set analysis
      const characterSet = {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password),
      };

      const result: PasswordValidationResult = {
        isValid: errors.length === 0 && finalStrength !== PasswordStrength.VERY_WEAK,
        strength: finalStrength,
        entropy,
        errors,
        warnings,
        suggestions,
        characterSet,
        length: password.length,
      };

      this.cache.set(password, result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        isValid: false,
        strength: PasswordStrength.VERY_WEAK,
        entropy: 0,
        errors: [`Validation failed: ${errorMessage}`],
        warnings: [],
        suggestions: ['Please try a different password'],
        length: password.length,
      };
    }
  }

  /**
   * Check if password meets minimum requirements
   */
  isStrongEnough(password: string, minStrength: PasswordStrength = PasswordStrength.MEDIUM): boolean {
    try {
      const result = this.validate(password);
      const strengthOrder: Record<PasswordStrength, number> = {
        [PasswordStrength.VERY_WEAK]: 0,
        [PasswordStrength.WEAK]: 1,
        [PasswordStrength.MEDIUM]: 2,
        [PasswordStrength.STRONG]: 3,
        [PasswordStrength.VERY_STRONG]: 4,
      };

      return strengthOrder[result.strength] >= strengthOrder[minStrength];
    } catch {
      return false;
    }
  }

  /**
   * Calculate password entropy
   */
  calculateEntropy(password: string): EntropyResult {
    try {
      const bits = calculateEntropy(password);

      let strength: PasswordStrength;
      let estimatedCrackTime: string;

      if (bits >= 90) {
        strength = PasswordStrength.VERY_STRONG;
        estimatedCrackTime = 'centuries';
      } else if (bits >= 70) {
        strength = PasswordStrength.STRONG;
        estimatedCrackTime = 'years';
      } else if (bits >= 50) {
        strength = PasswordStrength.MEDIUM;
        estimatedCrackTime = 'hours';
      } else if (bits >= 35) {
        strength = PasswordStrength.WEAK;
        estimatedCrackTime = 'minutes';
      } else {
        strength = PasswordStrength.VERY_WEAK;
        estimatedCrackTime = 'seconds';
      }

      return { bits, strength, estimatedCrackTime };
    } catch {
      return { bits: 0, strength: PasswordStrength.VERY_WEAK, estimatedCrackTime: 'unknown' };
    }
  }

  /**
   * Check if password is commonly used
   */
  isCommonPassword(password: string): boolean {
    try {
      return COMMON_PASSWORDS.has(password.toLowerCase() as any);
    } catch {
      return false;
    }
  }

  /**
   * Check if password contains personal information
   */
  containsPersonalInfo(
    password: string,
    personalInfo: {
      email?: string;
      name?: string;
      phone?: string;
      username?: string;
      birthdate?: string;
    }
  ): boolean {
    try {
      const lowerPassword = password.toLowerCase();

      // Check email local part
      if (personalInfo.email && personalInfo.email.includes('@')) {
        const emailLocal = personalInfo.email.split('@')[0]?.toLowerCase();
        if (emailLocal && lowerPassword.includes(emailLocal)) {
          return true;
        }
      }

      // Check name
      if (personalInfo.name && lowerPassword.includes(personalInfo.name.toLowerCase())) {
        return true;
      }

      // Check username
      if (personalInfo.username && lowerPassword.includes(personalInfo.username.toLowerCase())) {
        return true;
      }

      // Check phone (last 4 digits)
      if (personalInfo.phone && personalInfo.phone.length >= 4) {
        const last4 = personalInfo.phone.slice(-4);
        if (lowerPassword.includes(last4)) {
          return true;
        }
      }

      // Check birthdate (YYMMDD format)
      if (personalInfo.birthdate) {
        const cleaned = personalInfo.birthdate.replace(/-/g, '').replace(/\//g, '');
        if (cleaned.length >= 6 && lowerPassword.includes(cleaned.slice(-6))) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Generate a secure random password
   */
  generateSecurePassword(
    length: number = 16,
    options?: {
      includeLowercase?: boolean;
      includeUppercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    }
  ): string {
    try {
      return sharedGenerateSecurePassword(length, {
        includeLowercase: options?.includeLowercase ?? true,
        includeUppercase: options?.includeUppercase ?? true,
        includeNumbers: options?.includeNumbers ?? true,
        includeSpecial: options?.includeSpecial ?? true,
        excludeAmbiguous: options?.excludeAmbiguous ?? false,
      });
    } catch {
      // Fallback generation
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  }

  /**
   * Get strength description
   */
  getStrengthDescription(strength: PasswordStrength): string {
    return STRENGTH_DESCRIPTIONS[strength] || 'Unknown';
  }

  /**
   * Get recommended minimum length for a strength level
   */
  getRecommendedLength(strength: PasswordStrength): number {
    return RECOMMENDED_LENGTHS[strength] || 8;
  }

  /**
   * Get password requirements for UI display
   */
  getRequirements(
    password: string,
    minStrength: PasswordStrength = PasswordStrength.MEDIUM
  ): Array<{ key: string; label: string; labelBn?: string; met: boolean }> {
    const requirements = [
      {
        key: 'length',
        label: `At least ${this.getRecommendedLength(minStrength)} characters`,
        labelBn: `কমপক্ষে ${this.getRecommendedLength(minStrength)} অক্ষর`,
        met: password.length >= this.getRecommendedLength(minStrength),
      },
      {
        key: 'uppercase',
        label: 'At least one uppercase letter (A-Z)',
        labelBn: 'কমপক্ষে একটি বড় হাতের অক্ষর (A-Z)',
        met: /[A-Z]/.test(password),
      },
      {
        key: 'lowercase',
        label: 'At least one lowercase letter (a-z)',
        labelBn: 'কমপক্ষে একটি ছোট হাতের অক্ষর (a-z)',
        met: /[a-z]/.test(password),
      },
      {
        key: 'number',
        label: 'At least one number (0-9)',
        labelBn: 'কমপক্ষে একটি সংখ্যা (0-9)',
        met: /[0-9]/.test(password),
      },
      {
        key: 'special',
        label: 'At least one special character (!@#$%^&*)',
        labelBn: 'কমপক্ষে একটি বিশেষ অক্ষর (!@#$%^&*)',
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];

    // Check common passwords
    const isCommon = this.isCommonPassword(password);
    if (isCommon) {
      requirements.push({
        key: 'common',
        label: 'Not a common password',
        labelBn: 'সাধারণ পাসওয়ার্ড নয়',
        met: false,
      });
    }

    return requirements;
  }

  /**
   * Clear validation cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics (for monitoring)
   */
  getCacheStats(): { size: number; maxSize: number } {
    return this.cache.getStats();
  }
}

// ============================================================
// Singleton Export (For dependency injection)
// ============================================================

/**
 * Singleton instance of PasswordValidatorAdapter
 * Use this for dependency injection in NestJS or other DI containers
 */
export const passwordValidatorAdapter = new PasswordValidatorAdapter();
