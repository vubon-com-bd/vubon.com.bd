/**
 * Password Hasher Port Interface
 * Defines contract for password hashing operations
 * Infrastructure layer will provide implementation
 */

export interface IPasswordHasher {
  /**
   * Hash a plain text password
   * @param password - Plain text password to hash
   * @returns Promise resolving to hashed password
   * @throws Error if hashing fails
   */
  hash(password: string): Promise<string>;

  /**
   * Compare a plain text password with a hashed password
   * @param plainPassword - Plain text password to compare
   * @param hashedPassword - Hashed password to compare against
   * @returns Promise resolving to boolean indicating if passwords match
   * @throws Error if comparison fails
   */
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;

  /**
   * Synchronous hash operation
   * @param password - Plain text password to hash
   * @returns Hashed password
   * @throws Error if hashing fails
   */
  hashSync(password: string): string;

  /**
   * Synchronous compare operation
   * @param plainPassword - Plain text password to compare
   * @param hashedPassword - Hashed password to compare against
   * @returns boolean indicating if passwords match
   * @throws Error if comparison fails
   */
  compareSync(plainPassword: string, hashedPassword: string): boolean;

  /**
   * Check if password meets security requirements
   * @param password - Password to validate
   * @returns boolean indicating if password is secure
   */
  isSecure(password: string): boolean;

  /**
   * Get password strength score
   * @param password - Password to evaluate
   * @returns Score from 0-100
   */
  getStrengthScore(password: string): number;

  /**
   * Check if password is commonly used
   * @param password - Password to check
   * @returns boolean indicating if password is common
   */
  isCommonPassword(password: string): boolean;
}
