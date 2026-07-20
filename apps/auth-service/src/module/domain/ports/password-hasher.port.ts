/**
 * Password hasher port interface
 * Defines the contract for password hashing operations
 */

export interface PasswordHasher {
  /**
   * Hash a plain text password
   * @param password - The plain text password to hash
   * @returns The hashed password with salt and metadata
   */
  hash(password: string): Promise<HashedPassword>;

  /**
   * Compare a plain text password with a hashed password
   * @param password - The plain text password to verify
   * @param hashedPassword - The hashed password to compare against
   * @returns True if the password matches, false otherwise
   */
  compare(password: string, hashedPassword: HashedPassword): Promise<boolean>;

  /**
   * Hash a plain text password synchronously
   * @param password - The plain text password to hash
   * @returns The hashed password with salt and metadata
   */
  hashSync(password: string): HashedPassword;

  /**
   * Compare a plain text password with a hashed password synchronously
   * @param password - The plain text password to verify
   * @param hashedPassword - The hashed password to compare against
   * @returns True if the password matches, false otherwise
   */
  compareSync(password: string, hashedPassword: HashedPassword): boolean;

  /**
   * Generate a random salt
   * @param length - The length of the salt in bytes (default: 32)
   * @returns The generated salt as a hex string
   */
  generateSalt(length?: number): string;

  /**
   * Validate if a password meets strength requirements
   * @param password - The password to validate
   * @returns True if the password is strong enough, false otherwise
   */
  isStrongPassword(password: string): boolean;

  /**
   * Get password strength score
   * @param password - The password to evaluate
   * @returns A score between 0 and 6 indicating password strength
   */
  getStrengthScore(password: string): number;

  /**
   * Get password strength level
   * @param password - The password to evaluate
   * @returns The strength level: 'weak', 'medium', or 'strong'
   */
  getStrengthLevel(password: string): 'weak' | 'medium' | 'strong';

  /**
   * Check if a password is hashed
   * @param password - The password to check
   * @returns True if the password appears to be hashed
   */
  isHashed(password: string): boolean;

  /**
   * Get the password hasher type
   * @returns The hasher type (e.g., 'bcrypt', 'scrypt', 'argon2')
   */
  getHasherType(): string;

  /**
   * Get the hasher configuration
   * @returns The hasher configuration options
   */
  getConfig(): HasherConfig;
}

export interface HashedPassword {
  /**
   * The hashed password value
   */
  hash: string;

  /**
   * The salt used for hashing
   */
  salt: string;

  /**
   * The number of iterations used
   */
  iterations: number;

  /**
   * The key length in bytes
   */
  keyLength: number;

  /**
   * Optional metadata for the hasher
   */
  metadata?: Record<string, unknown>;
}

export interface HasherConfig {
  /**
   * The salt length in bytes
   */
  saltLength: number;

  /**
   * The key length in bytes
   */
  keyLength: number;

  /**
   * The number of iterations
   */
  iterations: number;

  /**
   * The algorithm used for hashing
   */
  algorithm: string;

  /**
   * Additional configuration options
   */
  options?: Record<string, unknown>;
}

export interface PasswordValidationOptions {
  /**
   * Minimum password length
   * @default 8
   */
  minLength?: number;

  /**
   * Maximum password length
   * @default 72
   */
  maxLength?: number;

  /**
   * Require at least one uppercase letter
   * @default true
   */
  requireUppercase?: boolean;

  /**
   * Require at least one lowercase letter
   * @default true
   */
  requireLowercase?: boolean;

  /**
   * Require at least one number
   * @default true
   */
  requireNumber?: boolean;

  /**
   * Require at least one special character
   * @default true
   */
  requireSpecialChar?: boolean;

  /**
   * Custom special characters to require
   */
  specialChars?: string;
}

export interface PasswordValidationResult {
  /**
   * Whether the password is valid
   */
  isValid: boolean;

  /**
   * List of validation errors
   */
  errors: string[];

  /**
   * Password strength score
   */
  score: number;

  /**
   * Password strength level
   */
  level: 'weak' | 'medium' | 'strong';
}

export abstract class PasswordHasherPort implements PasswordHasher {
  public abstract hash(password: string): Promise<HashedPassword>;
  public abstract compare(password: string, hashedPassword: HashedPassword): Promise<boolean>;
  public abstract hashSync(password: string): HashedPassword;
  public abstract compareSync(password: string, hashedPassword: HashedPassword): boolean;
  public abstract generateSalt(length?: number): string;
  public abstract isStrongPassword(password: string): boolean;
  public abstract getStrengthScore(password: string): number;
  public abstract getStrengthLevel(password: string): 'weak' | 'medium' | 'strong';
  public abstract isHashed(password: string): boolean;
  public abstract getHasherType(): string;
  public abstract getConfig(): HasherConfig;

  /**
   * Validate password with options
   */
  public validatePassword(
    password: string,
    options?: PasswordValidationOptions
  ): PasswordValidationResult {
    const {
      minLength = 8,
      maxLength = 72,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSpecialChar = true,
    } = options || {};

    const errors: string[] = [];

    if (!password || typeof password !== 'string') {
      errors.push('Password is required');
    } else {
      if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters`);
      }

      if (password.length > maxLength) {
        errors.push(`Password must be less than ${maxLength} characters`);
      }

      if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }

      if (requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }

      if (requireNumber && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }

      if (requireSpecialChar && !/[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }

    const score = this.getStrengthScore(password);
    const level = this.getStrengthLevel(password);

    return {
      isValid: errors.length === 0,
      errors,
      score,
      level,
    };
  }
}
