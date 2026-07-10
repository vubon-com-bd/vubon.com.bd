/**
 * Password Value Object - Pure Domain Core (Refactored with Port)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/value-objects/password.vo
 *
 * @description
 * Represents a plain-text password BEFORE hashing (domain layer).
 * Validates complexity and strength using the validator port.
 *
 * IMPORTANT: This value object holds plain text password ONLY for validation.
 * After validation, the password MUST be hashed in the Infrastructure layer.
 *
 * Enterprise Rules:
 * ✅ Immutable - Password never changes after creation
 * ✅ Self-validating - Uses validator port
 * ✅ Framework-free - No external dependencies (shared-utils removed)
 * ✅ No hashing - Hashing is infrastructure concern
 * ✅ Zero exposure - Password not included in serialization
 *
 * @example
 * const password = new Password('MyStr0ng!P@ssw0rd', passwordValidator);
 * console.log(password.getStrength()); // 'strong'
 * console.log(password.getEntropy()); // 85.2
 */

import { ValueObject } from './base.vo';
import {
  IPasswordValidator,
  PasswordStrength,
} from '../ports/password-validator.port';

// ============================================================
// Types (Re-exported for domain convenience)
// ============================================================

export { PasswordStrength };

export interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  entropy: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  characterSet?: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  length: number;
}

// ============================================================
// Password Value Object
// ============================================================

/**
 * Password Value Object
 *
 * Represents a plain-text password before hashing.
 * Validates complexity and strength using the validator port.
 */
export class Password extends ValueObject {
  private readonly _value: string;
  private readonly _strength: PasswordStrength;
  private readonly _entropy: number;
  private readonly _validationErrors: string[];
  private readonly _validationWarnings: string[];
  private readonly _validationSuggestions: string[];
  private readonly _characterSet: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  private readonly _length: number;

  /**
   * Creates a new Password value object
   *
   * @param password - Plain text password
   * @param validator - Password validator port (injected)
   * @throws {Error} If password fails validation
   */
  constructor(
    password: string,
    private readonly validator: IPasswordValidator
  ) {
    super();

    const validation = validator.validate(password, {
      checkCommonPasswords: true,
      checkPersonalInfo: false, // Should be checked in application layer
    });

    if (!validation.isValid) {
      throw new Error(`Invalid password: ${validation.errors.join(', ')}`);
    }

    this._value = password;
    this._strength = validation.strength;
    this._entropy = validation.entropy;
    this._validationErrors = validation.errors;
    this._validationWarnings = validation.warnings;
    this._validationSuggestions = validation.suggestions;
    this._characterSet = validation.characterSet || {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
    this._length = validation.length;

    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Password cannot be empty');
    }

    // Length validation is already done by validator
    if (this._length > 128) {
      throw new Error('Password too long (max 128 characters)');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating Password from known valid value
   */
  public static fromValid(
    password: string,
    validator: IPasswordValidator
  ): Password {
    return new Password(password, validator);
  }

  /**
   * Creates a Password from unknown input (safe parsing)
   */
  public static tryCreate(
    password: unknown,
    validator: IPasswordValidator
  ): Password | null {
    if (typeof password !== 'string') {
      return null;
    }

    try {
      return new Password(password, validator);
    } catch {
      return null;
    }
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
    return this.validator.calculateEntropy(this._value).estimatedCrackTime;
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
   * Get character set used in password
   */
  public getCharacterSet(): {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  } {
    return { ...this._characterSet };
  }

  /**
   * Get password length
   */
  public getLength(): number {
    return this._length;
  }

  /**
   * Check if password is strong enough for security requirements
   */
  public isStrongEnough(
    minStrength: PasswordStrength = PasswordStrength.MEDIUM
  ): boolean {
    const strengthOrder: Record<PasswordStrength, number> = {
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
    return this.validator.isCommonPassword(this._value);
  }

  /**
   * Check if password contains personal information
   * (Should be called from application layer with user data)
   */
  public containsPersonalInfo(personalInfo: {
    email?: string;
    name?: string;
    phone?: string;
    username?: string;
    birthdate?: string;
  }): boolean {
    return this.validator.containsPersonalInfo(this._value, personalInfo);
  }

  /**
   * Get password strength description
   */
  public getStrengthDescription(): string {
    return this.validator.getStrengthDescription(this._strength);
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Check if password is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' ||
           this._value === 'password' ||
           this._value === 'Password123!' ||
           this._value.length < 4;
  }

  /**
   * Get equality components for parent class comparison
   * Note: Passwords are compared by value, but this is only for domain logic
   */
  protected getEqualityComponents(): readonly unknown[] {
    // Use length and strength for comparison
    // Never expose actual password in equality components
    return [this._length, this._strength];
  }

  /**
   * Convert to JSON serializable object
   * ⚠️ Never include plain text password in JSON logs or responses!
   */
  public override toJSON(): Record<string, unknown> {
    return {
      strength: this._strength,
      entropy: Math.round(this._entropy),
      length: this._length,
      characterSet: this._characterSet,
      estimatedCrackTime: this.getEstimatedCrackTime(),
      isStrongEnough: this.isStrongEnough(),
      isCommon: this.isCommon(),
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
    return `Password(strength=${this._strength}, entropy=${Math.round(this._entropy)}bits, length=${this._length})`;
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
