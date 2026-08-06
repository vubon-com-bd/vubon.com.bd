/**
 * Email Validator Port
 * Defines the contract for email validation and disposable email checking
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IEmailValidator {
  /**
   * Validate email format
   * @param email - The email address to validate
   * @returns True if the email format is valid, false otherwise
   */
  isValid(email: string): boolean;

  /**
   * Check if the email is from a disposable/temporary email service
   * @param email - The email address to check
   * @returns True if the email is disposable, false otherwise
   */
  isDisposable(email: string): boolean;

  /**
   * Check if the email is from an educational institution
   * This is optional and can be used for educational discounts or student verification
   * @param email - The email address to check
   * @returns True if the email is educational, false otherwise
   */
  isEducational(email: string): boolean;

  /**
   * Normalize email address (trim, lowercase, and remove dots)
   * @param email - The email address to normalize
   * @returns The normalized email address
   */
  normalize(email: string): string;
}
