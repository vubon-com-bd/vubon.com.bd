/**
 * Password Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/password.vo
 * 
 * @description
 * Represents a plain-text password BEFORE hashing (domain layer).
 * Validates complexity, strength, and security rules.
 * 
 * IMPORTANT: This value object holds plain text password ONLY for validation.
 * After validation, the password MUST be hashed in the Application/Infrastructure layer.
 * Domain layer NEVER performs hashing - that's infrastructure concern.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Password value never changes after creation
 * ✅ Self-validating - Validates complexity and security rules
 * ✅ Framework-free - No external dependencies
 * ✅ No hashing - Hashing is infrastructure concern
 * ✅ Zero exposure - Password not included in serialization
 * 
 * Security Notes:
 * - Password is stored in memory only during validation
 * - Should be garbage collected after use
 * - Never log or persist plain text passwords
 * - Use secure comparison (timing-safe) in infrastructure layer
 * 
 * @example
 * const password = new Password('MyStr0ng!P@ssw0rd');
 * console.log(password.getStrength()); // 'very_strong'
 * console.log(password.getEntropy()); // 85.2
 * console.log(password.isCommon()); // false
 */

import { ValueObject } from './base.vo';

// ==================== Enums ====================

/**
 * Password strength levels
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

// ==================== Constants ====================

/**
 * Common passwords blacklist (top 100 most common)
 * This is a partial list - full list would be loaded from config
 */
const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', '123456789', 'qwerty',
  'abc123', 'password1', 'admin', 'admin123', 'letmein',
  'welcome', 'monkey', 'dragon', 'master', 'sunshine',
  'passw0rd', 'shadow', 'baseball', 'football', 'login',
  'bangladesh', 'dhaka', 'chittagong', 'vubon', 'vubon123',
]);

/**
 * Sequential patterns
 */
const SEQUENTIAL_PATTERNS = [
  /^1234567890$/,
  /^qwertyuiop$/,
  /^asdfghjkl$/,
  /^zxcvbnm$/,
  /^abcdefghijklmnopqrstuvwxyz$/,
  /^abcd1234$/,
  /^0987654321$/,
  /^poiuytrewq$/,
  /^lkjhgfdsa$/,
  /^mnbvcxz$/,
];

/**
 * Repeated character patterns
 */
const REPEATED_PATTERNS = [
  /(.)\1{3,}/,      // Same character repeated 4+ times
  /(..)\1{2,}/,     // Two characters repeated 3+ times
  /(ababab)/i,      // Pattern repetition
  /(abcabc)/i,
];

/**
 * Keyboard patterns (common)
 */
const KEYBOARD_PATTERNS = [
  'qwerty', 'qwertyuiop', 'asdfgh', 'asdfghjkl',
  'zxcvbn', 'zxcvbnm', '1qaz2wsx', 'q1w2e3r4',
  '1qazxsw2', 'zaq1xsw2', '!qaz@wsx',
];

/**
 * Bangladesh specific patterns to avoid
 */
const BANGLADESH_PATTERNS = [
  'bangladesh', 'dhaka', 'chittagong', 'vubon', 'brac',
  'grameenphone', 'robi', 'banglalink', 'teletalk',
  'bKash', 'nagad', 'rocket', 'bd', 'bangla',
];

// ==================== Password Configuration ====================

export const PASSWORD_CONFIG = {
  // Length constraints
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,  // Prevent DoS
  RECOMMENDED_LENGTH: 12,
  
  // Character requirements
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL: true,
  
  // Special characters allowed
  ALLOWED_SPECIAL: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  
  // Strength thresholds (entropy in bits)
  ENTROPY_THRESHOLDS: {
    [PasswordStrength.VERY_WEAK]: 0,
    [PasswordStrength.WEAK]: 35,
    [PasswordStrength.MEDIUM]: 50,
    [PasswordStrength.STRONG]: 70,
    [PasswordStrength.VERY_STRONG]: 90,
  },
  
  // Estimated crack times (for reference)
  CRACK_TIME_THRESHOLDS: {
    [PasswordStrength.VERY_WEAK]: 'seconds',
    [PasswordStrength.WEAK]: 'minutes',
    [PasswordStrength.MEDIUM]: 'hours',
    [PasswordStrength.STRONG]: 'years',
    [PasswordStrength.VERY_STRONG]: 'centuries',
  },
  
  // Common patterns
  COMMON_PASSWORDS_SET: COMMON_PASSWORDS,
  SEQUENTIAL_PATTERNS,
  REPEATED_PATTERNS,
  KEYBOARD_PATTERNS,
  BANGLADESH_PATTERNS,
} as const;

// ==================== Password Value Object ====================

/**
 * Password Value Object
 * 
 * Represents a plain-text password before hashing.
 * Validates complexity and strength but does NOT hash.
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
    
    if (this._value.length > PASSWORD_CONFIG.MAX_LENGTH) {
      throw new Error(`Password too long (max ${PASSWORD_CONFIG.MAX_LENGTH} characters)`);
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
   * Generate a random strong password (domain utility)
   */
  public static generateRandom(length: number = 16): string {
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const special = '!@#$%^&*';
    
    const all = uppercase + lowercase + numbers + special;
    let password = '';
    
    // Ensure at least one of each type
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));
    
    // Fill the rest
    for (let i = password.length; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }
    
    // Shuffle
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates a password and returns detailed results
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

    // Check length constraints
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
    
    if (password.length < PASSWORD_CONFIG.MIN_LENGTH) {
      errors.push(`Password must be at least ${PASSWORD_CONFIG.MIN_LENGTH} characters`);
      suggestions.push(`Make password at least ${PASSWORD_CONFIG.RECOMMENDED_LENGTH} characters`);
    }
    
    if (password.length > PASSWORD_CONFIG.MAX_LENGTH) {
      errors.push(`Password cannot exceed ${PASSWORD_CONFIG.MAX_LENGTH} characters`);
    }

    // Character requirements
    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = new RegExp(`[${PASSWORD_CONFIG.ALLOWED_SPECIAL}]`).test(password);
    
    if (PASSWORD_CONFIG.REQUIRE_UPPERCASE && !hasUpper) {
      errors.push('Password must contain at least one uppercase letter');
      suggestions.push('Add an uppercase letter (A-Z)');
    }
    
    if (PASSWORD_CONFIG.REQUIRE_LOWERCASE && !hasLower) {
      errors.push('Password must contain at least one lowercase letter');
      suggestions.push('Add a lowercase letter (a-z)');
    }
    
    if (PASSWORD_CONFIG.REQUIRE_NUMBERS && !hasNumber) {
      errors.push('Password must contain at least one number');
      suggestions.push('Add a number (0-9)');
    }
    
    if (PASSWORD_CONFIG.REQUIRE_SPECIAL && !hasSpecial) {
      errors.push(`Password must contain at least one special character (${PASSWORD_CONFIG.ALLOWED_SPECIAL})`);
      suggestions.push(`Add a special character (${PASSWORD_CONFIG.ALLOWED_SPECIAL})`);
    }

    // Check for invalid characters
    const allowedChars = new RegExp(`^[A-Za-z0-9${PASSWORD_CONFIG.ALLOWED_SPECIAL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`);
    if (!allowedChars.test(password)) {
      errors.push('Password contains invalid characters');
      suggestions.push('Use only allowed characters: letters, numbers, and !@#$%^&*()_+-=[]{}|;:,.<>?');
    }

    // Check for common passwords
    const lowerPassword = password.toLowerCase();
    if (PASSWORD_CONFIG.COMMON_PASSWORDS_SET.has(lowerPassword)) {
      errors.push('Password is too common and easily guessable');
      suggestions.push('Choose a less common password');
    }

    // Check for Bangladesh specific patterns
    for (const pattern of PASSWORD_CONFIG.BANGLADESH_PATTERNS) {
      if (lowerPassword.includes(pattern)) {
        warnings.push(`Contains Bangladesh-related pattern: "${pattern}"`);
        suggestions.push('Avoid using Bangladesh-related words in passwords');
        break;
      }
    }

    // Check for sequential patterns
    for (const pattern of PASSWORD_CONFIG.SEQUENTIAL_PATTERNS) {
      if (pattern.test(lowerPassword)) {
        warnings.push('Contains sequential characters (e.g., 123456, qwerty)');
        suggestions.push('Avoid using sequential patterns');
        break;
      }
    }

    // Check for keyboard patterns
    for (const pattern of PASSWORD_CONFIG.KEYBOARD_PATTERNS) {
      if (lowerPassword.includes(pattern)) {
        warnings.push('Contains keyboard patterns (e.g., qwerty)');
        suggestions.push('Avoid using keyboard patterns');
        break;
      }
    }

    // Check for repeated characters
    for (const pattern of PASSWORD_CONFIG.REPEATED_PATTERNS) {
      if (pattern.test(password)) {
        warnings.push('Contains repeated character patterns');
        suggestions.push('Avoid repeating characters');
        break;
      }
    }

    // Check for year patterns
    const yearPattern = /\b(19|20)\d{2}\b/;
    if (yearPattern.test(password)) {
      warnings.push('Contains a year (e.g., 1990, 2024)');
      suggestions.push('Avoid using years in passwords');
    }

    // Check for dictionary words (basic check)
    const commonWords = ['admin', 'user', 'guest', 'test', 'demo', 'sample'];
    for (const word of commonWords) {
      if (lowerPassword.includes(word)) {
        warnings.push(`Contains common word: "${word}"`);
        suggestions.push('Avoid using common dictionary words');
        break;
      }
    }

    // Calculate entropy
    const entropyResult = this.calculateEntropy(password);
    const entropy = entropyResult.bits;
    
    // Determine strength
    let strength = PasswordStrength.VERY_WEAK;
    if (errors.length === 0) {
      if (entropy >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.VERY_STRONG]) {
        strength = PasswordStrength.VERY_STRONG;
      } else if (entropy >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.STRONG]) {
        strength = PasswordStrength.STRONG;
        suggestions.push('Consider adding more character types for stronger security');
      } else if (entropy >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.MEDIUM]) {
        strength = PasswordStrength.MEDIUM;
        suggestions.push('Add more character types or increase length for stronger password');
      } else if (entropy >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.WEAK]) {
        strength = PasswordStrength.WEAK;
        suggestions.push('Use a longer password with more character types');
      }
    }

    // Add character set suggestions
    if (errors.length === 0 && warnings.length === 0) {
      if (!hasUpper) suggestions.push('Add uppercase letters');
      if (!hasLower) suggestions.push('Add lowercase letters');
      if (!hasNumber) suggestions.push('Add numbers');
      if (!hasSpecial) suggestions.push('Add special characters');
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
   * 
   * Entropy = log2(character_set_size ^ password_length)
   * 
   * @param password - The password to analyze
   * @returns Entropy result with bits, strength, and estimated crack time
   */
  private static calculateEntropy(password: string): EntropyResult {
    let charsetSize = 0;
    
    if (/[a-z]/.test(password)) charsetSize += 26;  // lowercase
    if (/[A-Z]/.test(password)) charsetSize += 26;  // uppercase
    if (/[0-9]/.test(password)) charsetSize += 10;  // numbers
    if (new RegExp(`[${PASSWORD_CONFIG.ALLOWED_SPECIAL}]`).test(password)) {
      charsetSize += PASSWORD_CONFIG.ALLOWED_SPECIAL.length;
    }
    
    if (charsetSize === 0) return {
      bits: 0,
      strength: PasswordStrength.VERY_WEAK,
      estimatedCrackTime: 'instantly',
    };
    
    const bits = Math.log2(Math.pow(charsetSize, password.length));
    
    let estimatedCrackTime: string;
    if (bits >= 90) estimatedCrackTime = 'centuries';
    else if (bits >= 70) estimatedCrackTime = 'years';
    else if (bits >= 50) estimatedCrackTime = 'hours';
    else if (bits >= 35) estimatedCrackTime = 'minutes';
    else estimatedCrackTime = 'seconds';
    
    let strength: PasswordStrength;
    if (bits >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.VERY_STRONG]) {
      strength = PasswordStrength.VERY_STRONG;
    } else if (bits >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.STRONG]) {
      strength = PasswordStrength.STRONG;
    } else if (bits >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.MEDIUM]) {
      strength = PasswordStrength.MEDIUM;
    } else if (bits >= PASSWORD_CONFIG.ENTROPY_THRESHOLDS[PasswordStrength.WEAK]) {
      strength = PasswordStrength.WEAK;
    } else {
      strength = PasswordStrength.VERY_WEAK;
    }
    
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
    const bits = this._entropy;
    if (bits >= 90) return 'centuries';
    if (bits >= 70) return 'years';
    if (bits >= 50) return 'hours';
    if (bits >= 35) return 'minutes';
    return 'seconds';
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
   */
  public isCommon(): boolean {
    return PASSWORD_CONFIG.COMMON_PASSWORDS_SET.has(this._value.toLowerCase());
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
      hasSpecial: new RegExp(`[${PASSWORD_CONFIG.ALLOWED_SPECIAL}]`).test(this._value),
    };
  }

  /**
   * Check if password is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === 'password' ||
           this._value === 'Password123!';
  }

  /**
   * Get equality components for parent class comparison
   * Note: Passwords are compared by value, but this is only for domain logic
   * For authentication, use constant-time comparison in infrastructure
   */
  protected getEqualityComponents(): readonly unknown[] {
    // Use length and hash-like representation for comparison
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

// ============================================================
// Type Exports
// ============================================================

export type { EntropyResult, PasswordCharacterSet, PasswordHasher };
