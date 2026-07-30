/**
 * Email Validator Port Interface
 * Defines contract for email validation operations
 * Infrastructure layer will provide implementation
 */

export interface IEmailValidator {
  /**
   * Check if an email address is valid
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  isValid(email: string): boolean;

  /**
   * Check if an email domain is disposable (temporary)
   * @param email - Email address to check
   * @returns boolean indicating if email is disposable
   */
  isDisposable(email: string): boolean;

  /**
   * Normalize email address (trim + lowercase)
   * @param email - Email address to normalize
   * @returns Normalized email address
   */
  normalize(email: string): string;

  /**
   * Validate email with detailed result
   * @param email - Email address to validate
   * @returns Object containing validation result and details
   */
  validateWithDetails(email: string): {
    isValid: boolean;
    normalized?: string;
    isDisposable?: boolean;
    errors?: string[];
  };

  /**
   * Check if email is from a known business domain
   * @param email - Email address to check
   * @returns boolean indicating if email is business
   */
  isBusinessEmail(email: string): boolean;

  /**
   * Extract domain from email
   * @param email - Email address
   * @returns Domain part of email or empty string
   */
  extractDomain(email: string): string;

  /**
   * Extract local part from email
   * @param email - Email address
   * @returns Local part (before @) or empty string
   */
  extractLocalPart(email: string): string;

  /**
   * Check if email is from a specific domain
   * @param email - Email address
   * @param domain - Domain to check against
   * @returns boolean indicating if email is from specified domain
   */
  isFromDomain(email: string, domain: string): boolean;

  /**
   * Mask email for privacy
   * @param email - Email address to mask
   * @returns Masked email (e.g., "j***@example.com")
   */
  maskEmail(email: string): string;

  /**
   * Check if email is a role-based email (admin@, support@, etc.)
   * @param email - Email address to check
   * @returns boolean indicating if email is role-based
   */
  isRoleBasedEmail(email: string): boolean;
}
