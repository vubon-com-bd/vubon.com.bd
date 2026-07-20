/**
 * Email validator port interface
 * Defines the contract for email validation operations
 */

export interface EmailValidator {
  /**
   * Validate if an email address is valid
   * @param email - The email address to validate
   * @returns True if the email is valid, false otherwise
   */
  isValid(email: string): boolean;

  /**
   * Check if an email address is from a disposable domain
   * @param email - The email address to check
   * @returns True if the email is disposable, false otherwise
   */
  isDisposable(email: string): boolean;

  /**
   * Check if an email address is from an educational domain
   * @param email - The email address to check
   * @returns True if the email is educational, false otherwise
   */
  isEducational(email: string): boolean;

  /**
   * Normalize an email address
   * @param email - The email address to normalize
   * @returns The normalized email address
   */
  normalize(email: string): string;

  /**
   * Get the domain part of an email address
   * @param email - The email address
   * @returns The domain part or null if invalid
   */
  getDomain(email: string): string | null;

  /**
   * Get the local part of an email address
   * @param email - The email address
   * @returns The local part or null if invalid
   */
  getLocalPart(email: string): string | null;

  /**
   * Check if an email address is from a specific domain
   * @param email - The email address
   * @param domain - The domain to check against
   * @returns True if the email is from the domain, false otherwise
   */
  isFromDomain(email: string, domain: string): boolean;

  /**
   * Check if an email address is from a list of allowed domains
   * @param email - The email address
   * @param allowedDomains - List of allowed domains
   * @returns True if the email is from an allowed domain, false otherwise
   */
  isFromAllowedDomains(email: string, allowedDomains: string[]): boolean;

  /**
   * Obfuscate an email address for display
   * @param email - The email address to obfuscate
   * @returns The obfuscated email address
   */
  obfuscate(email: string): string;

  /**
   * Check if an email address has a plus alias
   * @param email - The email address to check
   * @returns True if the email has a plus alias, false otherwise
   */
  hasPlusAlias(email: string): boolean;

  /**
   * Strip the plus alias from an email address
   * @param email - The email address
   * @returns The email address without the plus alias
   */
  stripPlusAlias(email: string): string;

  /**
   * Validate multiple email addresses
   * @param emails - Array of email addresses
   * @returns Object with valid and invalid email arrays
   */
  validateMany(emails: string[]): EmailValidationResult;

  /**
   * Validate an email address with detailed result
   * @param email - The email address to validate
   * @returns Detailed validation result
   */
  validateWithDetails(email: string): EmailValidationDetails;

  /**
   * Check if an email address is on a blocklist
   * @param email - The email address to check
   * @returns True if the email is blocked, false otherwise
   */
  isBlocked(email: string): boolean;

  /**
   * Check if an email address is on an allowlist
   * @param email - The email address to check
   * @returns True if the email is allowed, false otherwise
   */
  isAllowed(email: string): boolean;

  /**
   * Get email validation configuration
   * @returns The email validator configuration
   */
  getConfig(): EmailValidatorConfig;
}

export interface EmailValidationResult {
  valid: string[];
  invalid: string[];
}

export interface EmailValidationDetails {
  /**
   * Whether the email is valid
   */
  isValid: boolean;

  /**
   * The normalized email address
   */
  normalized: string;

  /**
   * The domain part of the email
   */
  domain: string | null;

  /**
   * The local part of the email
   */
  localPart: string | null;

  /**
   * Whether the email is from a disposable domain
   */
  isDisposable: boolean;

  /**
   * Whether the email is from an educational domain
   */
  isEducational: boolean;

  /**
   * Whether the email has a plus alias
   */
  hasPlusAlias: boolean;

  /**
   * The obfuscated email address
   */
  obfuscated: string;

  /**
   * The email without the plus alias
   */
  strippedEmail: string;

  /**
   * Whether the email is blocked
   */
  isBlocked: boolean;

  /**
   * Whether the email is allowed
   */
  isAllowed: boolean;

  /**
   * List of validation errors
   */
  errors: string[];
}

export interface EmailValidatorConfig {
  /**
   * Whether to allow disposable email addresses
   * @default false
   */
  allowDisposable: boolean;

  /**
   * Whether to allow educational email addresses
   * @default true
   */
  allowEducational: boolean;

  /**
   * List of allowed domains (empty means all allowed)
   */
  allowedDomains: string[];

  /**
   * List of blocked domains
   */
  blockedDomains: string[];

  /**
   * List of disposable domains
   */
  disposableDomains: string[];

  /**
   * Maximum email length
   * @default 255
   */
  maxLength: number;

  /**
   * Whether to normalize email addresses automatically
   * @default true
   */
  autoNormalize: boolean;

  /**
   * Whether to perform DNS validation
   * @default false
   */
  dnsValidation: boolean;
}

export abstract class EmailValidatorPort implements EmailValidator {
  public abstract isValid(email: string): boolean;
  public abstract isDisposable(email: string): boolean;
  public abstract isEducational(email: string): boolean;
  public abstract normalize(email: string): string;
  public abstract getDomain(email: string): string | null;
  public abstract getLocalPart(email: string): string | null;
  public abstract isFromDomain(email: string, domain: string): boolean;
  public abstract isFromAllowedDomains(email: string, allowedDomains: string[]): boolean;
  public abstract obfuscate(email: string): string;
  public abstract hasPlusAlias(email: string): boolean;
  public abstract stripPlusAlias(email: string): string;
  public abstract validateMany(emails: string[]): EmailValidationResult;
  public abstract validateWithDetails(email: string): EmailValidationDetails;
  public abstract isBlocked(email: string): boolean;
  public abstract isAllowed(email: string): boolean;
  public abstract getConfig(): EmailValidatorConfig;

  /**
   * Validate an email address with options
   */
  public validate(email: string, options?: Partial<EmailValidatorConfig>): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }

    if (options?.maxLength && email.length > options.maxLength) {
      return false;
    }

    const normalizedEmail = this.normalize(email);

    if (!this.isValid(normalizedEmail)) {
      return false;
    }

    if (options?.allowDisposable === false && this.isDisposable(normalizedEmail)) {
      return false;
    }

    if (options?.allowedDomains && options.allowedDomains.length > 0) {
      return this.isFromAllowedDomains(normalizedEmail, options.allowedDomains);
    }

    return true;
  }

  /**
   * Check if an email address is free (not from disposable domains)
   */
  public isFreeEmail(email: string): boolean {
    return !this.isDisposable(email);
  }

  /**
   * Get email validation errors
   */
  public getValidationErrors(email: string): string[] {
    const errors: string[] = [];

    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
      return errors;
    }

    const trimmed = email.trim();

    if (trimmed.length === 0) {
      errors.push('Email is required');
      return errors;
    }

    if (!this.isValid(trimmed)) {
      errors.push('Invalid email format');
      return errors;
    }

    if (this.isDisposable(trimmed)) {
      errors.push('Disposable email addresses are not allowed');
    }

    return errors;
  }

  /**
   * Validate email with error reporting
   */
  public validateWithErrors(email: string): {
    valid: boolean;
    errors: string[];
    normalized: string;
  } {
    const errors = this.getValidationErrors(email);
    const normalized = this.normalize(email);

    return {
      valid: errors.length === 0,
      errors,
      normalized,
    };
  }
}
