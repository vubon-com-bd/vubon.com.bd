import { BaseValueObject } from './base.vo';
import { PASSWORD_POLICY } from '@vubon/shared-constants';

/**
 * Password Value Object
 * Represents a plain password with validation and strength checking
 * Note: This is only for input validation, never stored in database
 * Always hash passwords before persistence
 */
export class Password extends BaseValueObject<string> {
  private constructor(value: string) {
    const trimmed = value.trim();
    Password.validate(trimmed);
    super(trimmed);
  }

  /**
   * Create a new Password instance
   * @throws {Error} If the password does not meet security requirements
   */
  static create(value: string): Password {
    return new Password(value);
  }

  /**
   * Validate password against security policy
   * @throws {Error} If the password is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Password must be a non-empty string');
    }

    // Check minimum length
    if (value.length < PASSWORD_POLICY.MIN_LENGTH) {
      throw new Error(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`);
    }

    // Check maximum length
    if (value.length > PASSWORD_POLICY.MAX_LENGTH) {
      throw new Error(`Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`);
    }

    // Check uppercase letters
    if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }

    // Check lowercase letters
    if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }

    // Check numbers
    if (PASSWORD_POLICY.REQUIRE_NUMBER && !/\d/.test(value)) {
      throw new Error('Password must contain at least one number');
    }

    // Check special characters
    if (PASSWORD_POLICY.REQUIRE_SPECIAL_CHAR) {
      const specialChars = PASSWORD_POLICY.SPECIAL_CHARS || '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const specialCharRegex = new RegExp(
        `[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`
      );
      if (!specialCharRegex.test(value)) {
        throw new Error(`Password must contain at least one special character (${specialChars})`);
      }
    }
  }

  /**
   * Check if password meets strong security requirements
   * Strong: length >= 12, uppercase, lowercase, number, special char
   */
  isStrong(): boolean {
    const value = this._value;
    return (
      value.length >= 12 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(value)
    );
  }

  /**
   * Check if password meets medium security requirements
   * Medium: length >= 8, uppercase, lowercase, number
   */
  isMedium(): boolean {
    const value = this._value;
    return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
  }

  /**
   * Get password strength score (0-100)
   * Higher score = stronger password
   */
  getStrengthScore(): number {
    const value = this._value;
    let score = 0;

    // Length contribution (max 30 points)
    if (value.length >= 8) score += 10;
    if (value.length >= 10) score += 10;
    if (value.length >= 12) score += 10;

    // Character variety contribution (max 40 points)
    if (/[a-z]/.test(value)) score += 10;
    if (/[A-Z]/.test(value)) score += 10;
    if (/\d/.test(value)) score += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(value)) score += 10;

    // Additional length bonus (max 30 points)
    if (value.length >= 16) score += 15;
    if (value.length >= 20) score += 15;

    return Math.min(100, score);
  }

  /**
   * Get password strength label
   */
  getStrengthLabel(): 'weak' | 'medium' | 'strong' | 'very-strong' {
    const score = this.getStrengthScore();
    if (score >= 80) return 'very-strong';
    if (score >= 60) return 'strong';
    if (score >= 40) return 'medium';
    return 'weak';
  }

  /**
   * Check if password contains common patterns
   */
  hasCommonPatterns(): boolean {
    const value = this._value.toLowerCase();
    const commonPatterns = [
      'password',
      '123456',
      'qwerty',
      'admin',
      'letmein',
      'welcome',
      'monkey',
      'dragon',
      'master',
      'hello',
      'freedom',
      'whatever',
      'abc123',
      'qwerty123',
      '123qwe',
      '123abc',
    ];

    return commonPatterns.some((pattern) => value.includes(pattern));
  }

  /**
   * Check if password contains repeated characters (3+ consecutive)
   */
  hasRepeatedChars(): boolean {
    return /(.)\1{2,}/.test(this._value);
  }

  /**
   * Check if password contains keyboard sequences
   */
  hasKeyboardSequence(): boolean {
    const value = this._value.toLowerCase();
    const sequences = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890'];

    for (const seq of sequences) {
      for (let i = 0; i < seq.length - 2; i++) {
        const subseq = seq.substring(i, i + 3);
        if (value.includes(subseq)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Get all validation requirements as a readable list
   */
  static getRequirements(): string[] {
    const requirements: string[] = [];

    requirements.push(`Minimum ${PASSWORD_POLICY.MIN_LENGTH} characters`);

    if (PASSWORD_POLICY.REQUIRE_UPPERCASE) {
      requirements.push('At least one uppercase letter');
    }

    if (PASSWORD_POLICY.REQUIRE_LOWERCASE) {
      requirements.push('At least one lowercase letter');
    }

    if (PASSWORD_POLICY.REQUIRE_NUMBER) {
      requirements.push('At least one number');
    }

    if (PASSWORD_POLICY.REQUIRE_SPECIAL_CHAR) {
      const specialChars = PASSWORD_POLICY.SPECIAL_CHARS || '!@#$%^&*()_+-=[]{}|;:,.<>?';
      requirements.push(`At least one special character (${specialChars})`);
    }

    return requirements;
  }

  /**
   * Compare two Password objects
   * Note: This compares plain passwords, not hashes
   */
  equals(other: Password | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Password)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation
   * Note: Returns a masked version for security
   */
  toString(): string {
    return '********';
  }

  /**
   * Get the raw password value (for hashing only)
   * Should only be used immediately before hashing
   */
  getValue(): string {
    return this._value;
  }
}
