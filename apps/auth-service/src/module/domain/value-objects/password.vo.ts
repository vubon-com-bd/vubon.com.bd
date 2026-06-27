/**
 * Password Value Object - Pure Domain Core (Refactored)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/value-objects/password.vo
 *
 * @description
 * Represents a plain-text password BEFORE hashing (domain layer).
 * Validates complexity, strength, and security rules using shared utilities.
 *
 * IMPORTANT: This value object holds plain text password ONLY for validation.
 * After validation, the password MUST be hashed in the Application/Infrastructure layer.
 * Domain layer NEVER performs hashing - that's infrastructure concern.
 *
 * Enterprise Rules:
 * ✅ Immutable - Password value never changes after creation
 * ✅ Self-validating - Uses shared validation utilities
 * ✅ Framework-free - Uses shared packages
 * ✅ No hashing - Hashing is infrastructure concern
 * ✅ Zero exposure - Password not included in serialization
 * ✅ No code duplication - Reuses shared-constants and shared-utils
 *
 * @example
 * const password = new Password('MyStr0ng!P@ssw0rd');
 * console.log(password.getStrength()); // 'very_strong'
 * console.log(password.getEntropy()); // 85.2
 * console.log(password.isCommon()); // false
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: Import from shared packages instead of duplicating
import {
  PASSWORD_POLICY,
  BANGLADESH_PATTERNS,
  COMMON_PASSWORDS,
} from '@vubon/shared-constants';

import {
  checkPasswordStrength,
  calculateEntropy as sharedCalculateEntropy,
  generateSecurePassword as sharedGenerateSecurePassword,
  timingSafeEqual,
} from '@vubon/shared-utils';

import { PasswordSchema } from '@vubon/shared-schemas';

// ==================== Enums ====================

/**
 * Password strength levels (Re-exported from shared-utils for domain convenience)
 */
export enum PasswordStrength {
  VERY_WEAK = 'very_weak',
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong',
}

// ==================== Types ====================

/**
 * Password validation result
 */
export interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  entropy: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Password character set
 */
export interface PasswordCharacterSet {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSpecial: boolean;
}

/**
 * Password entropy calculation result
 */
export interface EntropyResult {
  bits: number;
  strength: PasswordStrength;
  estimatedCrackTime: string;
}

// ==================== Domain-Specific Constants ====================

/**
 * Domain-specific password configuration
 * (Only Bangladesh specific patterns, rest from shared-constants)
 */
const DOMAIN_PASSWORD_CONFIG = {
  // Bangladesh specific patterns to avoid (already in shared-constants)
  BANGLADESH_PATTERNS: BANGLADESH_PATTERNS,

  // Common words for basic check (domain-specific)
  COMMON_WORDS: ['admin', 'user', 'guest', 'test', 'demo', 'sample'],

  // Year pattern detection
  YEAR_PATTERN: /\b(19|20)\d{2}\b/,
} as const;

// ==================== Password Value Object ====================

/**
 * Password Value Object
 *
 * Represents a plain-text password before hashing.
 * Validates complexity and strength using shared utilities.
 */
export class Password extends ValueObject {
  private readonly _value: string;
  private readonly _strength: PasswordStrength;
  private readonly _entropy: number;
  private readonly _validationErrors: string[];
  private readonly _validationWarnings: string[];
  private readonly _validationSuggestions: string[];

  /**
   * Creates a new Password value object
   *
   * @param password - Plain text password
   * @throws {Error} If password fails validation
   */
  constructor(password: string) {
    super();

    // ✅ FIXED: Use shared schema for validation
    const schemaResult = PasswordSchema.safeParse(password);
    if (!schemaResult.success) {
      throw new Error(
        `Invalid password format: ${schemaResult.error.errors[0]?.message || 'Invalid format'}`
      );
    }

    // ✅ FIXED: Use shared utility for validation
    const validation = Password.validate(password);
    if (!validation.isValid) {
      throw new Error(`Invalid password: ${validation.errors.join(', ')}`);
    }

    this._value = password;
    this._strength = validation.strength;
    this._entropy = validation.entropy;
    this._validationErrors = validation.errors;
    this._validationWarnings = validation.warnings;
    this._validationSuggestions = validation.suggestions;

    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Password cannot be empty');
    }

    if (this._value.length > PASSWORD_POLICY.MAX_LENGTH) {
      throw new Error(`Password too long (max ${PASSWORD_POLICY.MAX_LENGTH} characters)`);
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating Password from known valid value
   */
  public static fromValid(password: string): Password {
    return new Password(password);
  }

  /**
   * Creates a Password from unknown input (safe parsing)
   */
  public static tryCreate(password: unknown): Password | null {
    if (typeof password !== 'string') {
      return null;
    }

    try {
      return new Password(password);
    } catch {
      return null;
    }
  }

  /**
   * Generate a cryptographically secure random strong password
   * ✅ FIXED: Uses shared utility
   */
  public static generateRandom(length: number = 16): string {
    return sharedGenerateSecurePassword(length);
  }

  // ============================================================
  // Validation Methods (Using Shared Utilities)
  // ============================================================

  /**
   * Validates a password and returns detailed results
   * ✅ FIXED: Uses shared utilities + domain-specific additions
   *
   * @param password - The password to validate
   * @returns Validation result with strength, entropy, errors, warnings, suggestions
   */
  public static validate(password: string): PasswordValidation {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check type and emptiness
    if (!password || typeof password !== 'string') {
      errors.push('Password cannot be null or undefined');
      return {
        isValid: false,
        strength: PasswordStrength.VERY_WEAK,
        entropy: 0,
        errors,
        warnings,
        suggestions,
      };
    }

    if (password.length === 0) {
      errors.push('Password cannot be empty');
      return {
        isValid: false,
        strength: PasswordStrength.VERY_WEAK,
        entropy: 0,
        errors,
        warnings,
        suggestions,
      };
    }

    // ✅ FIXED: Use shared utility for strength check
    const sharedStrength = checkPasswordStrength(password);

    // Merge errors from shared utility
    if (!sharedStrength.isValid) {
      errors.push(...sharedStrength.missing);
    }

    // Add shared suggestions
    if (sharedStrength.suggestions.length > 0) {
      suggestions.push(...sharedStrength.suggestions);
    }

    // Check length constraints
    if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
      errors.push(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
      suggestions.push(`Make password at least ${PASSWORD_POLICY.MIN_LENGTH + 4} characters`);
    }

    if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
      errors.push(`Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`);
    }

    // Check for common passwords (using shared constant)
    const lowerPassword = password.toLowerCase();
    if (COMMON_PASSWORDS.has(lowerPassword as any)) {
      errors.push('Password is too common and easily guessable');
      suggestions.push('Choose a less common password');
    }

    // ✅ FIXED: Use shared constant for Bangladesh patterns
    for (const pattern of DOMAIN_PASSWORD_CONFIG.BANGLADESH_PATTERNS) {
      if (lowerPassword.includes(pattern)) {
        warnings.push(`Contains Bangladesh-related pattern: "${pattern}"`);
        suggestions.push('Avoid using Bangladesh-related words in passwords');
        break;
      }
    }

    // Check for keyboard patterns (domain-specific)
    const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn', '1qaz2wsx'];
    for (const pattern of keyboardPatterns) {
      if (lowerPassword.includes(pattern)) {
        warnings.push('Contains keyboard patterns (e.g., qwerty)');
        suggestions.push('Avoid using keyboard patterns');
        break;
      }
    }

    // Check for repeated characters
    if (/(.)\1{3,}/.test(password)) {
      warnings.push('Contains repeated character patterns');
      suggestions.push('Avoid repeating characters');
    }

    // Check for sequential patterns
    if (/123456|abcdef|qwerty|098765/.test(lowerPassword)) {
      warnings.push('Contains sequential characters');
      suggestions.push('Avoid using sequential patterns');
    }

    // Check for year patterns (domain-specific)
    if (DOMAIN_PASSWORD_CONFIG.YEAR_PATTERN.test(password)) {
      warnings.push('Contains a year (e.g., 1990, 2024)');
      suggestions.push('Avoid using years in passwords');
    }

    // Check for dictionary words (domain-specific)
    for (const word of DOMAIN_PASSWORD_CONFIG.COMMON_WORDS) {
      if (lowerPassword.includes(word)) {
        warnings.push(`Contains common word: "${word}"`);
        suggestions.push('Avoid using common dictionary words');
        break;
      }
    }

    // ✅ FIXED: Use shared utility for entropy calculation
    const entropy = sharedCalculateEntropy(password);

    // Determine strength based on entropy
    let strength = PasswordStrength.VERY_WEAK;
    if (errors.length === 0) {
      if (entropy >= 90) {
        strength = PasswordStrength.VERY_STRONG;
      } else if (entropy >= 70) {
        strength = PasswordStrength.STRONG;
        if (entropy < 80) {
          suggestions.push('Consider adding more character types for stronger security');
        }
      } else if (entropy >= 50) {
        strength = PasswordStrength.MEDIUM;
        suggestions.push('Add more character types or increase length for stronger password');
      } else if (entropy >= 35) {
        strength = PasswordStrength.WEAK;
        suggestions.push('Use a longer password with more character types');
      }
    }

    return {
      isValid: errors.length === 0,
      strength,
      entropy,
      errors,
      warnings,
      suggestions,
    };
  }

  /**
   * Calculate password entropy (bits)
   * ✅ FIXED: Uses shared utility
   *
   * @param password - The password to analyze
   * @returns Entropy result with bits, strength, and estimated crack time
   */
  private static calculateEntropy(password: string): EntropyResult {
    const bits = sharedCalculateEntropy(password);

    let estimatedCrackTime: string;
    if (bits >= 90) estimatedCrackTime = 'centuries';
    else if (bits >= 70) estimatedCrackTime = 'years';
    else if (bits >= 50) estimatedCrackTime = 'hours';
    else if (bits >= 35) estimatedCrackTime = 'minutes';
    else estimatedCrackTime = 'seconds';

    let strength: PasswordStrength;
    if (bits >= 90) strength = PasswordStrength.VERY_STRONG;
    else if (bits >= 70) strength = PasswordStrength.STRONG;
    else if (bits >= 50) strength = PasswordStrength.MEDIUM;
    else if (bits >= 35) strength = PasswordStrength.WEAK;
    else strength = PasswordStrength.VERY_WEAK;

    return { bits, strength, estimatedCrackTime };
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Get the plain text password (use with caution!)
   * Only use immediately before hashing in infrastructure layer
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get password strength
   */
  public getStrength(): PasswordStrength {
    return this._strength;
  }

  /**
   * Get password entropy in bits
   */
  public getEntropy(): number {
    return this._entropy;
  }

  /**
   * Get estimated crack time
   */
  public getEstimatedCrackTime(): string {
    return Password.calculateEntropy(this._value).estimatedCrackTime;
  }

  /**
   * Get validation errors (if any)
   */
  public getErrors(): readonly string[] {
    return this._validationErrors;
  }

  /**
   * Get validation warnings (if any)
   */
  public getWarnings(): readonly string[] {
    return this._validationWarnings;
  }

  /**
   * Get validation suggestions (for improvement)
   */
  public getSuggestions(): readonly string[] {
    return this._validationSuggestions;
  }

  /**
   * Check if password is strong enough for security requirements
   */
  public isStrongEnough(minStrength: PasswordStrength = PasswordStrength.MEDIUM): boolean {
    const strengthOrder = {
      [PasswordStrength.VERY_WEAK]: 0,
      [PasswordStrength.WEAK]: 1,
      [PasswordStrength.MEDIUM]: 2,
      [PasswordStrength.STRONG]: 3,
      [PasswordStrength.VERY_STRONG]: 4,
    };

    return strengthOrder[this._strength] >= strengthOrder[minStrength];
  }

  /**
   * Check if password is a common password
   * ✅ FIXED: Uses shared constant
   */
  public isCommon(): boolean {
    return COMMON_PASSWORDS.has(this._value.toLowerCase() as any);
  }

  /**
   * Check if password contains personal information
   * (To be used with user's personal data in application layer)
   */
  public containsPersonalInfo(
    email?: string,
    name?: string,
    phone?: string
  ): boolean {
    const lowerPassword = this._value.toLowerCase();

    if (email && email.includes('@')) {
      const emailLocal = email.split('@')[0]?.toLowerCase();
      if (emailLocal && lowerPassword.includes(emailLocal)) {
        return true;
      }
    }

    if (name && lowerPassword.includes(name.toLowerCase())) {
      return true;
    }

    if (phone && phone.length >= 4 && lowerPassword.includes(phone.slice(-4))) {
      return true;
    }

    return false;
  }

  /**
   * Get password length
   */
  public getLength(): number {
    return this._value.length;
  }

  /**
   * Get character set used in password
   */
  public getCharacterSet(): PasswordCharacterSet {
    return {
      hasUppercase: /[A-Z]/.test(this._value),
      hasLowercase: /[a-z]/.test(this._value),
      hasNumbers: /[0-9]/.test(this._value),
      hasSpecial: /[^A-Za-z0-9]/.test(this._value),
    };
  }

  /**
   * Check if password is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || this._value === 'password' || this._value === 'Password123!';
  }

  /**
   * Timing-safe password comparison for domain logic
   * For actual authentication, use infrastructure layer
   */
  public equalsSecure(other: Password): boolean {
    return timingSafeEqual(this._value, other._value);
  }

  /**
   * Get equality components for parent class comparison
   * Note: Passwords are compared by value, but this is only for domain logic
   * For authentication, use constant-time comparison in infrastructure
   */
  protected getEqualityComponents(): readonly unknown[] {
    // Use length and strength for comparison
    // Never expose actual password in equality components
    return [this._value.length, this._strength];
  }

  /**
   * Convert to JSON serializable object
   * ⚠️ Never include plain text password in JSON logs or responses!
   */
  public override toJSON(): Record<string, unknown> {
    return {
      strength: this._strength,
      entropy: Math.round(this._entropy),
      length: this.getLength(),
      characterSet: this.getCharacterSet(),
      estimatedCrackTime: this.getEstimatedCrackTime(),
      errors: this._validationErrors,
      warnings: this._validationWarnings,
      suggestions: this._validationSuggestions,
      // ⚠️ Intentionally NOT including the actual password
    };
  }

  /**
   * String representation for debugging
   * ⚠️ Never log actual password!
   */
  public override toString(): string {
    return `Password(strength=${this._strength}, entropy=${Math.round(this._entropy)}bits, length=${this.getLength()})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is a Password
 */
export function isPassword(value: unknown): value is Password {
  return value instanceof Password;
}

/**
 * Password comparison interface (to be implemented in infrastructure)
 */
export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

/**
 * Check if password has been compromised (requires external API)
 * This is a domain method but requires infrastructure
 * Should be called from application layer with external service
 */
export async function isPasswordCompromised(
  password: string,
  checkCompromised: (password: string) => Promise<boolean>
): Promise<boolean> {
  return checkCompromised(password);
}
