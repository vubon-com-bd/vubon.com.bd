/**
 * Email Validator Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/email-validator.port
 *
 * @description
 * Port (interface) for email validation and formatting.
 * Defines the contract that infrastructure adapters must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Allows swapping implementations without domain changes
 *
 * @example
 * // Domain usage
 * class Email extends ValueObject {
 *   constructor(
 *     email: string,
 *     private readonly validator: IEmailValidator
 *   ) {
 *     super();
 *     if (!validator.isValid(email)) {
 *       throw new Error('Invalid email');
 *     }
 *   }
 * }
 *
 * // Infrastructure implementation
 * class EmailValidatorAdapter implements IEmailValidator {
 *   isValid(email: string): boolean {
 *     return isValidEmail(email);
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Email domain category (Domain-specific)
 */
export type EmailDomainCategory =
  | 'free'
  | 'corporate'
  | 'bangladesh'
  | 'disposable'
  | 'educational'
  | 'government'
  | 'other';

/**
 * Email provider type (Domain-specific)
 */
export type EmailProviderType = 'google' | 'microsoft' | 'apple' | 'yahoo' | 'protonmail' | 'other';

/**
 * Email components (Domain-specific)
 */
export interface EmailComponents {
  /** Username part (before @) */
  username: string;
  /** Domain part (after @) */
  domain: string;
  /** Normalized email address */
  normalized: string;
  /** Provider type */
  provider: EmailProviderType;
  /** Domain category */
  category: EmailDomainCategory;
  /** Whether the email uses a free provider */
  isFreeProvider: boolean;
  /** Whether the email is from Bangladesh */
  isBangladesh: boolean;
  /** Whether the email is from a disposable service */
  isDisposable: boolean;
  /** Whether the email is from an educational institution */
  isEducational: boolean;
  /** Whether the email is from a government domain */
  isGovernment: boolean;
  /** Whether the email has a subaddress tag (e.g., user+tag@example.com) */
  hasSubAddress: boolean;
  /** The subaddress tag if present */
  subAddressTag?: string;
}

/**
 * Email validation result
 */
export interface EmailValidationResult {
  /** Whether the email is valid */
  isValid: boolean;
  /** Normalized email address (if valid) */
  normalized?: string;
  /** Error message if validation fails */
  error?: string;
  /** Email components if valid */
  components?: EmailComponents;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Email Validator Port Interface
 * Defines the contract for email operations in the domain layer.
 *
 * Enterprise Features:
 * ✅ Type-safe interface with domain types
 * ✅ Comprehensive validation and normalization
 * ✅ Domain detection (Bangladesh, educational, government, etc.)
 * ✅ Provider detection
 * ✅ Subaddress support
 * ✅ Privacy masking
 * ✅ Batch validation support
 *
 * @example
 * // Using the port in domain service
 * class UserRegistrationService {
 *   constructor(private readonly emailValidator: IEmailValidator) {}
 *
 *   registerUser(email: string): User {
 *     if (!this.emailValidator.isValid(email)) {
 *       throw new Error('Invalid email');
 *     }
 *     const normalized = this.emailValidator.normalize(email);
 *     // ... rest of the logic
 *   }
 * }
 */
export interface IEmailValidator {
  /**
   * Validate an email address
   *
   * @param email - Raw email address string
   * @returns Detailed validation result
   *
   * @example
   * const result = validator.validate('user@example.com');
   * if (result.isValid) {
   *   console.log(result.components?.domain); // 'example.com'
   * }
   */
  validate(email: string): EmailValidationResult;

  /**
   * Check if an email address is valid
   *
   * @param email - Raw email address string
   * @returns True if email is valid
   *
   * @example
   * if (validator.isValid('user@example.com')) {
   *   // Process valid email
   * }
   */
  isValid(email: string): boolean;

  /**
   * Normalize an email address to canonical form
   *
   * @param email - Raw email address string
   * @param stripSubaddress - Whether to remove subaddress tag (default: false)
   * @returns Normalized email address or null if invalid
   *
   * @example
   * const normalized = validator.normalize('User@Example.COM');
   * // 'user@example.com'
   *
   * const stripped = validator.normalize('user+tag@example.com', true);
   * // 'user@example.com'
   */
  normalize(email: string, stripSubaddress?: boolean): string | null;

  /**
   * Get email components
   *
   * @param email - Raw email address string
   * @returns Email components or null if invalid
   *
   * @example
   * const components = validator.getComponents('user@example.com');
   * console.log(components?.domain); // 'example.com'
   */
  getComponents(email: string): EmailComponents | null;

  /**
   * Mask email for privacy
   *
   * @param email - Raw email address string
   * @returns Masked email address
   *
   * @example
   * const masked = validator.mask('user@example.com');
   * // 'u***r@example.com'
   */
  mask(email: string): string;

  /**
   * Get email domain
   *
   * @param email - Raw email address string
   * @returns Domain part or null if invalid
   *
   * @example
   * const domain = validator.getDomain('user@example.com');
   * // 'example.com'
   */
  getDomain(email: string): string | null;

  /**
   * Get email username (local part)
   *
   * @param email - Raw email address string
   * @returns Username part or null if invalid
   *
   * @example
   * const username = validator.getUsername('user@example.com');
   * // 'user'
   */
  getUsername(email: string): string | null;

  /**
   * Check if email is from a common free provider (Gmail, Yahoo, Outlook, etc.)
   *
   * @param email - Raw email address string
   * @returns True if from common provider
   *
   * @example
   * if (validator.isFreeProvider('user@gmail.com')) {
   *   console.log('Free email provider');
   * }
   */
  isFreeProvider(email: string): boolean;

  /**
   * Check if email is from Bangladesh (.com.bd, .edu.bd, .gov.bd, etc.)
   *
   * @param email - Raw email address string
   * @returns True if from Bangladesh
   *
   * @example
   * if (validator.isBangladesh('user@vubon.com.bd')) {
   *   console.log('Bangladeshi email');
   * }
   */
  isBangladesh(email: string): boolean;

  /**
   * Check if email is from a disposable/temporary service
   *
   * @param email - Raw email address string
   * @returns True if disposable
   *
   * @example
   * if (validator.isDisposable('user@tempmail.com')) {
   *   console.log('Disposable email detected');
   * }
   */
  isDisposable(email: string): boolean;

  /**
   * Check if email is from an educational institution
   *
   * @param email - Raw email address string
   * @returns True if educational
   *
   * @example
   * if (validator.isEducational('user@du.ac.bd')) {
   *   console.log('Educational institution email');
   * }
   */
  isEducational(email: string): boolean;

  /**
   * Check if email is from a government domain
   *
   * @param email - Raw email address string
   * @returns True if government
   *
   * @example
   * if (validator.isGovernment('user@gov.bd')) {
   *   console.log('Government email');
   * }
   */
  isGovernment(email: string): boolean;

  /**
   * Check if email is from a corporate/business domain
   *
   * @param email - Raw email address string
   * @returns True if corporate
   *
   * @example
   * if (validator.isCorporate('user@company.com')) {
   *   console.log('Corporate email');
   * }
   */
  isCorporate(email: string): boolean;

  /**
   * Check if email has a subaddress tag (e.g., user+tag@example.com)
   *
   * @param email - Raw email address string
   * @returns True if has subaddress
   *
   * @example
   * if (validator.hasSubAddress('user+tag@gmail.com')) {
   *   console.log('Has subaddress');
   * }
   */
  hasSubAddress(email: string): boolean;

  /**
   * Get email provider type
   *
   * @param email - Raw email address string
   * @returns Provider type or 'other'
   *
   * @example
   * const provider = validator.getProvider('user@gmail.com');
   * // 'google'
   */
  getProvider(email: string): EmailProviderType;

  /**
   * Get email domain category
   *
   * @param email - Raw email address string
   * @returns Domain category or 'other'
   *
   * @example
   * const category = validator.getCategory('user@du.ac.bd');
   * // 'educational'
   */
  getCategory(email: string): EmailDomainCategory;

  /**
   * Batch validate multiple email addresses
   *
   * @param emails - Array of email addresses
   * @returns Array of validation results
   *
   * @example
   * const results = validator.batchValidate(['a@b.com', 'invalid']);
   * results.forEach(r => console.log(r.isValid));
   */
  batchValidate(emails: string[]): EmailValidationResult[];
}

// ============================================================
// Utility Types for Testing
// ============================================================

/**
 * Mock email validator for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockEmailValidator implements IEmailValidator {
  constructor(private readonly isValidResult: boolean = true) {}

  validate(email: string): EmailValidationResult {
    if (this.isValidResult) {
      const normalized = email.trim().toLowerCase();
      const [username, domain] = normalized.split('@');
      return {
        isValid: true,
        normalized,
        components: {
          username: username || '',
          domain: domain || '',
          normalized,
          provider: 'other',
          category: 'other',
          isFreeProvider: false,
          isBangladesh: false,
          isDisposable: false,
          isEducational: false,
          isGovernment: false,
          hasSubAddress: false,
        },
      };
    }
    return { isValid: false, error: 'Invalid email' };
  }

  isValid(email: string): boolean {
    // প্যারামিটার ব্যবহার করা হয়েছে
    return this.isValidResult && email.length > 0;
  }

  normalize(email: string, stripSubaddress: boolean = false): string | null {
    if (!this.isValidResult) return null;
    let normalized = email.trim().toLowerCase();
    if (stripSubaddress) {
      const [localPart] = normalized.split('@');
      if (localPart) {
        const baseLocalPart = localPart.split('+')[0];
        const [, domain] = normalized.split('@');
        if (domain) {
          normalized = `${baseLocalPart}@${domain}`;
        }
      }
    }
    return normalized;
  }

  getComponents(email: string): EmailComponents | null {
    if (!this.isValidResult) return null;
    const normalized = email.trim().toLowerCase();
    const [username, domain] = normalized.split('@');
    return {
      username: username || '',
      domain: domain || '',
      normalized,
      provider: 'other',
      category: 'other',
      isFreeProvider: false,
      isBangladesh: false,
      isDisposable: false,
      isEducational: false,
      isGovernment: false,
      hasSubAddress: false,
    };
  }

  mask(email: string): string {
    if (!this.isValidResult) return email;
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    if (username.length <= 2) {
      return `${username}***@${domain}`;
    }
    const first = username[0];
    const last = username[username.length - 1];
    return `${first}***${last}@${domain}`;
  }

  getDomain(email: string): string | null {
    if (!this.isValidResult) return null;
    const [, domain] = email.split('@');
    return domain || null;
  }

  getUsername(email: string): string | null {
    if (!this.isValidResult) return null;
    const [username] = email.split('@');
    return username || null;
  }

  isFreeProvider(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const freeProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    return this.isValidResult && domain ? freeProviders.includes(domain) : false;
  }

  isBangladesh(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const bdDomains = ['.com.bd', '.edu.bd', '.gov.bd', '.org.bd', '.net.bd'];
    return this.isValidResult && domain ? bdDomains.some((d) => domain.endsWith(d)) : false;
  }

  isDisposable(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    return this.isValidResult && domain ? disposableDomains.includes(domain) : false;
  }

  isEducational(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const eduDomains = ['.edu', '.edu.bd', '.ac.bd'];
    return this.isValidResult && domain ? eduDomains.some((d) => domain.endsWith(d)) : false;
  }

  isGovernment(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const govDomains = ['.gov', '.gov.bd'];
    return this.isValidResult && domain ? govDomains.some((d) => domain.endsWith(d)) : false;
  }

  isCorporate(email: string): boolean {
    // প্যারামিটার ব্যবহার করে ডোমেইন চেক করা হয়েছে
    const domain = this.getDomain(email);
    const corporateDomains = ['bangla.net', 'agni.com', 'citechco.net'];
    return this.isValidResult && domain ? corporateDomains.includes(domain) : false;
  }

  hasSubAddress(email: string): boolean {
    // প্যারামিটার ব্যবহার করে চেক করা হয়েছে
    const [username] = email.split('@');
    return this.isValidResult && username ? username.includes('+') : false;
  }

  getProvider(email: string): EmailProviderType {
    // প্যারামিটার ব্যবহার করে প্রোভাইডার চেক করা হয়েছে
    const domain = this.getDomain(email);
    if (!domain) return 'other';
    if (domain.includes('gmail')) return 'google';
    if (domain.includes('yahoo')) return 'yahoo';
    if (domain.includes('outlook') || domain.includes('hotmail')) return 'microsoft';
    if (domain.includes('protonmail')) return 'other'; // protonmail কে 'other' হিসেবে রিটার্ন করুন
    // অথবা, 'proton' টাইপ যোগ করতে চাইলে নিচের মত করুন:
    // return 'proton' as EmailProviderType; // কিন্তু এটি নিরাপদ নয়
    return 'other';
  }

  getCategory(email: string): EmailDomainCategory {
    // প্যারামিটার ব্যবহার করে ক্যাটাগরি চেক করা হয়েছে
    if (this.isBangladesh(email)) return 'bangladesh';
    if (this.isEducational(email)) return 'educational';
    if (this.isGovernment(email)) return 'government';
    if (this.isCorporate(email)) return 'corporate';
    return 'other';
  }

  batchValidate(emails: string[]): EmailValidationResult[] {
    return emails.map((email) => this.validate(email));
  }
}
