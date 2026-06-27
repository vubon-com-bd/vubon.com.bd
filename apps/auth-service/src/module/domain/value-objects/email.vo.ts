/**
 * Email Value Object - Pure Domain Core (Refactored)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/email.vo
 * 
 * @description
 * Represents a validated and normalized email address.
 * Uses shared utilities for validation to avoid code duplication.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Email never changes after creation
 * ✅ Self-validating - Validates format and constraints
 * ✅ Normalized - Standardized format for equality
 * ✅ Framework-free - No external dependencies
 * ✅ Reuses shared validation - No duplicate code
 * ✅ Bangladesh specific - Support for .com.bd, .edu.bd, etc.
 * 
 * @example
 * const email = new Email('User@Example.COM');
 * console.log(email.getValue()); // 'user@example.com'
 * console.log(email.getDomain()); // 'example.com'
 * console.log(email.isGmail()); // false
 * console.log(email.isBangladeshEmail()); // false
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: শুধু প্রয়োজনীয় ইউটিলিটি ইম্পোর্ট করা হয়েছে
import { 
  isValidEmail, 
  normalizeEmail, 
  maskEmail as maskEmailUtil,
  isCommonEmailDomain,
  isEducationalEmail,
  getEmailComponents,
  type EmailComponents as SharedEmailComponents
} from '@vubon/shared-utils';

// ✅ FIXED: EmailSchema from shared-schemas
import { EmailSchema } from '@vubon/shared-schemas';

// ==================== Types ====================

/**
 * Email validation result
 * ✅ FIXED: error and normalized are optional (exactOptionalPropertyTypes)
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

// ==================== Constants (Bangladesh Specific) ====================

/**
 * Bangladesh specific email domains
 */
export const BANGLADESH_SPECIFIC_DOMAINS = {
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
  
  // Bangladesh government domains
  GOVERNMENT: new Set([
    'gov.bd',
    'moi.gov.bd',
    'bcc.gov.bd',
    'a2i.gov.bd',
    'dgdpr.gov.bd',
  ]),
  
  // Bangladesh specific corporate domains
  BANGLADESH_CORPORATE: new Set([
    'bangla.net',
    'agni.com',
    'citechco.net',
    'bdcom.com',
    'bol-online.com',
    'dhaka.net',
    'link3.net',
    'btcl.net.bd',
  ]),
} as const;

/**
 * Email configuration constants (Only BD specific)
 */
export const EMAIL_CONFIG = {
  // Bangladesh specific patterns
  PATTERNS: {
    // Bangladesh specific domain pattern
    BANGLADESH_DOMAIN: /\.(com\.bd|net\.bd|org\.bd|edu\.bd|gov\.bd|ac\.bd|mil\.bd)$/i,
    
    // Educational domain pattern (enhanced for BD)
    EDUCATIONAL_DOMAIN: /\.(edu|ac\.bd|edu\.bd)$/i,
    
    // Government domain pattern (enhanced for BD)
    GOVERNMENT_DOMAIN: /\.(gov|gov\.bd)$/i,
  },
} as const;

// ==================== Email Value Object ====================

/**
 * Email Value Object
 * 
 * Represents a validated and normalized email address
 * Uses shared utilities for validation to avoid code duplication
 */
export class Email extends ValueObject {
  private readonly _value: string;
  private readonly _localPart: string;
  private readonly _domain: string;
  private readonly _subAddressTag?: string;
  private readonly _normalized: string;
  private readonly _sharedComponents: SharedEmailComponents | null;

  /**
   * Creates a new Email value object
   * 
   * @param email - Raw email address string
   * @throws {Error} If email format is invalid
   */
  constructor(email: string) {
    super();
    
    // ✅ FIXED: Use shared schema for validation
    const schemaResult = EmailSchema.safeParse(email);
    if (!schemaResult.success) {
      throw new Error(`Invalid email: ${schemaResult.error.errors[0]?.message || 'Invalid format'}`);
    }
    
    // ✅ FIXED: Use shared utility for normalization
    const normalized = normalizeEmail(email);
    
    // ✅ FIXED: Final validation with shared utility
    if (!isValidEmail(normalized)) {
      throw new Error('Invalid email format');
    }
    
    this._value = email.trim();
    this._normalized = normalized;
    
    // ✅ FIXED: Use shared utility for components
    this._sharedComponents = getEmailComponents(normalized);
    
    // Parse components
    const [localPart, domain] = normalized.split('@');
    this._domain = domain || '';
   // ✅ FIXED: সম্পূর্ণ টাইপ-সেইফ সমাধান
const subaddressMatch = localPart?.match(/^(.+)\+(.+)$/);
if (subaddressMatch && subaddressMatch.length >= 3) {
  // TypeScript জানবে এখানে string আছে
  const local = subaddressMatch[1] as string;
  const tag = subaddressMatch[2] as string;
  this._localPart = local;
  this._subAddressTag = tag;
} else {
  this._localPart = localPart || '';
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
    
    if (this._value.length > 254) {
      throw new Error('Email too long (max 254 characters)');
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
  // Validation Methods (Using Shared Utilities)
  // ============================================================

  /**
   * Validates an email address using shared utilities
   * 
   * @param email - The email to validate
   * @returns Validation result with normalized value if valid
   * ✅ FIXED: error and normalized are optional
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
    
    if (trimmed.length > 254) {
      return {
        isValid: false,
        error: 'Email too long (max 254 characters)',
      };
    }

    // ✅ FIXED: Use shared schema validation
    const schemaResult = EmailSchema.safeParse(trimmed);
    if (!schemaResult.success) {
      return {
        isValid: false,
        error: schemaResult.error.errors[0]?.message || 'Invalid email format',
      };
    }

    // ✅ FIXED: Use shared utility for validation
    if (!isValidEmail(trimmed)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      };
    }

    // ✅ FIXED: Use shared utility for normalization
    const normalized = normalizeEmail(trimmed);

    // ✅ FIXED: error: undefined বাদ দেওয়া হয়েছে
    return {
      isValid: true,
      normalized,
    };
  }

  /**
   * Normalize email to canonical form
   * Uses shared utility
   */
  public static normalize(email: string, stripSubaddress: boolean = false): string {
    // ✅ FIXED: Use shared utility
    let normalized = normalizeEmail(email);
    
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
  // Provider Detection (Domain Specific)
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
   * Uses shared utility
   */
  public isFreeProvider(): boolean {
    return isCommonEmailDomain(this._normalized);
  }

  /**
   * Check if email is from Bangladesh
   */
  public isBangladeshEmail(): boolean {
    return EMAIL_CONFIG.PATTERNS.BANGLADESH_DOMAIN.test(this._domain) ||
           BANGLADESH_SPECIFIC_DOMAINS.BANGLADESH_CORPORATE.has(this._domain);
  }

  /**
   * Check if email is from a disposable/temporary service
   */
  public isDisposable(): boolean {
    return BANGLADESH_SPECIFIC_DOMAINS.DISPOSABLE.has(this._domain);
  }

  /**
   * Check if email is from educational institution
   * Uses shared utility
   */
  public isEducationalEmail(): boolean {
    return isEducationalEmail(this._normalized);
  }

  /**
   * Check if email is from government
   */
  public isGovernmentEmail(): boolean {
    return EMAIL_CONFIG.PATTERNS.GOVERNMENT_DOMAIN.test(this._domain) ||
           BANGLADESH_SPECIFIC_DOMAINS.GOVERNMENT.has(this._domain);
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
   * ✅ FIXED: Uses shared utility
   */
  public mask(): string {
    return maskEmailUtil(this._value);
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
   * Get shared email components (from shared-utils)
   */
  public getSharedComponents(): SharedEmailComponents | null {
    return this._sharedComponents;
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
      isBangladesh: this.isBangladeshEmail(),
      isDisposable: this.isDisposable(),
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
 * ✅ FIXED: Uses shared utility
 */
export function isValidEmailFormat(email: string): boolean {
  return isValidEmail(email);
}
