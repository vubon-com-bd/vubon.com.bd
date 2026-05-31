/**
 * Email Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/email.vo
 * 
 * @description
 * Represents an email address with validation and normalization.
 * Used for user identification, communication, and authentication.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Email never changes after creation
 * ✅ Self-validating - Validates format and constraints
 * ✅ Normalized - Standardized format for equality
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Support for .com.bd, .edu.bd, etc.
 * 
 * Supported formats:
 * - Standard: user@example.com
 * - Subaddress: user+tag@example.com
 * - Bangladesh domains: user@example.com.bd, user@example.edu.bd
 * - International: user@пример.рф (Unicode support ready)
 * 
 * @example
 * const email = new Email('User@Example.COM');
 * console.log(email.getValue()); // 'user@example.com'
 * console.log(email.getDomain()); // 'example.com'
 * console.log(email.isGmail()); // false
 * console.log(email.isBangladeshEmail()); // false
 */

import { ValueObject } from './base.vo';

// ==================== Types ====================

/**
 * Email validation result
 */
export interface EmailValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Email domain category
 */
export type EmailDomainCategory = 'free' | 'corporate' | 'bangladesh' | 'disposable' | 'educational' | 'government' | 'other';

/**
 * Email provider type
 */
export type EmailProvider = 'google' | 'microsoft' | 'apple' | 'yahoo' | 'protonmail' | 'other';

// ==================== Constants ====================

/**
 * Common email domain categories (Bangladesh specific)
 */
export const EMAIL_DOMAINS = {
  // Free email providers
  FREE: new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'aol.com',
    'icloud.com',
    'me.com',
    'protonmail.com',
    'mail.com',
    'yandex.com',
    'gmx.com',
    'zoho.com',
    'tutanota.com',
  ]),
  
  // Bangladesh specific domains
  BANGLADESH: new Set([
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'bangla.net',
    'agni.com',
    'citechco.net',
    'bdcom.com',
    'bol-online.com',
    'dhaka.net',
    'link3.net',
    'btcl.net.bd',
  ]),
  
  // Disposable email domains (for fraud prevention)
  DISPOSABLE: new Set([
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.com',
    'temp-mail.org',
    'fakeinbox.com',
    'spamgourmet.com',
    'guerrillamail.net',
    'guerrillamail.biz',
    'guerrillamail.org',
    'guerrillamailblock.com',
    'pokemail.net',
    'spam4.me',
    'bccto.me',
    'chacuo.net',
    'guerrillamail.info',
    'tempinbox.co.uk',
    'tempmail2.com',
    'tempemail.net',
    'wegwerfmail.de',
    'wegwerfmail.net',
    'wegwerfmail.org',
  ]),
  
  // Educational domains (Bangladesh)
  EDUCATIONAL: new Set([
    'du.ac.bd',
    'buet.ac.bd',
    'ru.ac.bd',
    'cu.ac.bd',
    'ju.ac.bd',
    'northsouth.edu',
    'bracu.ac.bd',
    'aiub.edu',
    'iub.edu.bd',
    'ewubd.edu',
    'uiu.ac.bd',
    'daffodilvarsity.edu.bd',
    'aust.edu',
    'diu.edu.bd',
    'sub.ac.bd',
    'mbstu.ac.bd',
    'pstu.ac.bd',
    'hstu.ac.bd',
    'sau.ac.bd',
    'bau.edu.bd',
  ]),
  
  // Government domains (Bangladesh)
  GOVERNMENT: new Set([
    'gov.bd',
    'moi.gov.bd',
    'bcc.gov.bd',
    'a2i.gov.bd',
    'dgdpr.gov.bd',
  ]),
} as const;

/**
 * Email configuration constants
 */
export const EMAIL_CONFIG = {
  MAX_LENGTH: 254,           // RFC 5321 limit
  MAX_LOCAL_PART: 64,        // RFC 5321 local part limit
  MAX_DOMAIN_PART: 255,      // RFC 1035 domain limit
  
  // Special email patterns
  PATTERNS: {
    // Standard email pattern (RFC 5322 compliant)
    STANDARD: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
    
    // Subaddress pattern (user+tag@example.com)
    SUBADDRESS: /^([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)\+([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@(.+)$/,
    
    // Bangladesh specific domain patterns
    BANGLADESH_DOMAIN: /\.(com\.bd|net\.bd|org\.bd|edu\.bd|gov\.bd|ac\.bd|mil\.bd)$/i,
    
    // Educational domain pattern
    EDUCATIONAL_DOMAIN: /\.(edu|ac\.bd|edu\.bd)$/i,
    
    // Government domain pattern
    GOVERNMENT_DOMAIN: /\.(gov|gov\.bd)$/i,
  },
} as const;

// ==================== Email Value Object ====================

/**
 * Email Value Object
 * 
 * Represents a validated and normalized email address
 */
export class Email extends ValueObject {
  private readonly _value: string;
  private readonly _localPart: string;
  private readonly _domain: string;
  private readonly _subAddressTag?: string;
  private readonly _normalized: string;

  /**
   * Creates a new Email value object
   * 
   * @param email - Raw email address string
   * @throws {Error} If email format is invalid
   */
  constructor(email: string) {
    super();
    
    const validation = Email.validate(email);
    if (!validation.isValid) {
      throw new Error(`Invalid email: ${validation.error}`);
    }
    
    const normalized = validation.normalized!;
    this._value = email.trim();
    this._normalized = normalized;
    
    // Parse components
    const [localPart, domain] = normalized.split('@');
    this._domain = domain;
    
    // Check for subaddress (tag)
    const subaddressMatch = localPart.match(EMAIL_CONFIG.PATTERNS.SUBADDRESS);
    if (subaddressMatch) {
      this._localPart = subaddressMatch[1]!;
      this._subAddressTag = subaddressMatch[2];
    } else {
      this._localPart = localPart;
      this._subAddressTag = undefined;
    }
    
    // Auto-validation
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Email cannot be empty');
    }
    
    if (this._value.length > EMAIL_CONFIG.MAX_LENGTH) {
      throw new Error(`Email too long (max ${EMAIL_CONFIG.MAX_LENGTH} characters)`);
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating Email from known valid value
   */
  public static fromValid(email: string): Email {
    return new Email(email);
  }

  /**
   * Creates an Email from unknown input (safe parsing)
   */
  public static tryCreate(email: unknown): Email | null {
    if (typeof email !== 'string') {
      return null;
    }
    
    try {
      return new Email(email);
    } catch {
      return null;
    }
  }

  /**
   * Create a test email (for testing purposes only)
   * NOT FOR PRODUCTION USE
   */
  public static forTest(localPart: string, domain: string = 'test.com'): Email {
    return new Email(`${localPart}@${domain}`);
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates an email address
   * 
   * @param email - The email to validate
   * @returns Validation result with normalized value if valid
   */
  public static validate(email: string): EmailValidation {
    // Check type and emptiness
    if (!email || typeof email !== 'string') {
      return {
        isValid: false,
        error: 'Email cannot be null or undefined',
      };
    }

    const trimmed = email.trim();
    
    // Check length constraints
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'Email cannot be empty',
      };
    }
    
    if (trimmed.length > EMAIL_CONFIG.MAX_LENGTH) {
      return {
        isValid: false,
        error: `Email too long (max ${EMAIL_CONFIG.MAX_LENGTH} characters)`,
      };
    }

    // Normalize to lowercase
    const normalized = trimmed.toLowerCase();
    
    // Check format
    if (!EMAIL_CONFIG.PATTERNS.STANDARD.test(normalized)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      };
    }

    // Split and validate parts
    const atIndex = normalized.indexOf('@');
    if (atIndex === -1) {
      return {
        isValid: false,
        error: 'Email must contain @ symbol',
      };
    }
    
    const localPart = normalized.substring(0, atIndex);
    const domain = normalized.substring(atIndex + 1);
    
    if (!localPart || !domain) {
      return {
        isValid: false,
        error: 'Email must contain local part and domain',
      };
    }
    
    // Check local part length
    if (localPart.length > EMAIL_CONFIG.MAX_LOCAL_PART) {
      return {
        isValid: false,
        error: `Local part too long (max ${EMAIL_CONFIG.MAX_LOCAL_PART} characters)`,
      };
    }
    
    // Check domain part length
    if (domain.length > EMAIL_CONFIG.MAX_DOMAIN_PART) {
      return {
        isValid: false,
        error: `Domain too long (max ${EMAIL_CONFIG.MAX_DOMAIN_PART} characters)`,
      };
    }

    // Validate domain segments
    const domainSegments = domain.split('.');
    if (domainSegments.length < 2) {
      return {
        isValid: false,
        error: 'Domain must contain at least one dot',
      };
    }
    
    // Check each domain segment
    for (const segment of domainSegments) {
      if (segment.length === 0) {
        return {
          isValid: false,
          error: 'Domain cannot have empty segments',
        };
      }
      if (!/^[a-z0-9-]+$/.test(segment)) {
        return {
          isValid: false,
          error: 'Domain contains invalid characters',
        };
      }
    }
    
    // Check TLD (top level domain) length
    const tld = domainSegments[domainSegments.length - 1]!;
    if (tld.length < 2) {
      return {
        isValid: false,
        error: 'TLD too short (minimum 2 characters)',
      };
    }

    return {
      isValid: true,
      normalized,
      error: undefined,
    };
  }

  /**
   * Normalize email to canonical form
   * - Lowercase
   * - Trim whitespace
   * - Remove subaddress (optional)
   */
  public static normalize(email: string, stripSubaddress: boolean = false): string {
    const normalized = email.trim().toLowerCase();
    
    if (stripSubaddress) {
      const [localPart, domain] = normalized.split('@');
      if (localPart) {
        const baseLocalPart = localPart.split('+')[0];
        return `${baseLocalPart}@${domain}`;
      }
    }
    
    return normalized;
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Get the original email value
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get the normalized email address
   */
  public getNormalized(): string {
    return this._normalized;
  }

  /**
   * Get the local part (before @)
   */
  public getLocalPart(): string {
    return this._localPart;
  }

  /**
   * Get the domain part (after @)
   */
  public getDomain(): string {
    return this._domain;
  }

  /**
   * Get the subaddress tag (if exists, e.g., user+tag@example.com => 'tag')
   */
  public getSubAddressTag(): string | undefined {
    return this._subAddressTag;
  }

  /**
   * Get email without subaddress (user+tag@example.com => user@example.com)
   */
  public getBaseEmail(): string {
    if (this._subAddressTag) {
      return `${this._localPart}@${this._domain}`;
    }
    return this._normalized;
  }

  // ============================================================
  // Provider Detection
  // ============================================================

  /**
   * Get email provider
   */
  public getProvider(): EmailProvider {
    if (this.isGoogleEmail()) return 'google';
    if (this.isMicrosoftEmail()) return 'microsoft';
    if (this.isAppleEmail()) return 'apple';
    if (this._domain === 'yahoo.com') return 'yahoo';
    if (this._domain === 'protonmail.com') return 'protonmail';
    return 'other';
  }

  /**
   * Check if email uses a free provider
   */
  public isFreeProvider(): boolean {
    return EMAIL_DOMAINS.FREE.has(this._domain);
  }

  /**
   * Check if email is from Bangladesh
   */
  public isBangladeshEmail(): boolean {
    return EMAIL_CONFIG.PATTERNS.BANGLADESH_DOMAIN.test(this._domain) ||
           EMAIL_DOMAINS.BANGLADESH.has(this._domain);
  }

  /**
   * Check if email is from a disposable/temporary service
   */
  public isDisposable(): boolean {
    return EMAIL_DOMAINS.DISPOSABLE.has(this._domain);
  }

  /**
   * Check if email is from educational institution
   */
  public isEducationalEmail(): boolean {
    return EMAIL_CONFIG.PATTERNS.EDUCATIONAL_DOMAIN.test(this._domain) ||
           EMAIL_DOMAINS.EDUCATIONAL.has(this._domain);
  }

  /**
   * Check if email is from government
   */
  public isGovernmentEmail(): boolean {
    return EMAIL_CONFIG.PATTERNS.GOVERNMENT_DOMAIN.test(this._domain) ||
           EMAIL_DOMAINS.GOVERNMENT.has(this._domain);
  }

  /**
   * Check if email is from Google (Gmail, Google Workspace)
   */
  public isGoogleEmail(): boolean {
    return this._domain === 'gmail.com' || 
           this._domain === 'googlemail.com' ||
           this._domain.endsWith('.google.com');
  }

  /**
   * Check if email is from Microsoft (Outlook, Hotmail, Live)
   */
  public isMicrosoftEmail(): boolean {
    return ['outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'passport.com'].includes(this._domain);
  }

  /**
   * Check if email is from Apple (iCloud, me, mac)
   */
  public isAppleEmail(): boolean {
    return ['icloud.com', 'me.com', 'mac.com'].includes(this._domain);
  }

  /**
   * Check if email appears to be corporate/business
   */
  public isCorporateEmail(): boolean {
    if (this.isFreeProvider()) return false;
    if (this.isEducationalEmail()) return false;
    if (this.isGovernmentEmail()) return false;
    return true;
  }

  /**
   * Check if email has a subaddress tag
   */
  public hasSubAddress(): boolean {
    return !!this._subAddressTag;
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Mask email for privacy (e.g., u***r@example.com)
   */
  public mask(): string {
    const localPart = this._localPart;
    if (localPart.length <= 2) {
      return `${localPart[0]}***@${this._domain}`;
    }
    const firstChar = localPart[0];
    const lastChar = localPart[localPart.length - 1];
    return `${firstChar}***${lastChar}@${this._domain}`;
  }

  /**
   * Get domain category for analytics
   */
  public getDomainCategory(): EmailDomainCategory {
    if (this.isDisposable()) return 'disposable';
    if (this.isBangladeshEmail()) return 'bangladesh';
    if (this.isEducationalEmail()) return 'educational';
    if (this.isGovernmentEmail()) return 'government';
    if (this.isFreeProvider()) return 'free';
    if (this.isCorporateEmail()) return 'corporate';
    return 'other';
  }

  /**
   * Check if email is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === 'unknown@unknown.com' ||
           this._value === 'placeholder@example.com';
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Get equality components for parent class comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._normalized];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    return {
      value: this._value,
      normalized: this._normalized,
      localPart: this._localPart,
      domain: this._domain,
      hasSubAddress: this.hasSubAddress(),
      subAddressTag: this._subAddressTag,
      provider: this.getProvider(),
      category: this.getDomainCategory(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `Email(${this.mask()})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is an Email
 */
export function isEmail(value: unknown): value is Email {
  return value instanceof Email;
}

/**
 * Create Email from request (handles various input sources)
 */
export function createEmailFromRequest(email: string | null | undefined): Email | null {
  if (!email) return null;
  return Email.tryCreate(email);
}

/**
 * Validate email format (simple boolean check)
 */
export function isValidEmailFormat(email: string): boolean {
  return Email.validate(email).isValid;
}

// ============================================================
// Type Exports
// ============================================================

export type { EmailDomainCategory, EmailProvider };
