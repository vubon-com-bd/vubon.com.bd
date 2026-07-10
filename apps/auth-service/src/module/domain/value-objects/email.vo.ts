/**
 * Email Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/email.vo
 * 
 * @description
 * Represents a validated and normalized email address.
 * Uses minimal shared utilities for core validation.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Email never changes after creation
 * ✅ Self-validating - Validates format and constraints
 * ✅ Normalized - Standardized format for equality
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Support for .com.bd, .edu.bd, etc.
 * 
 * @example
 * const email = new Email('User@Example.COM');
 * console.log(email.getValue()); // 'user@example.com'
 * console.log(email.getDomain()); // 'example.com'
 */

import { ValueObject } from './base.vo';
import { isValidEmail, normalizeEmail } from '@vubon/shared-utils';
import { EmailSchema } from '@vubon/shared-schemas';

// ==================== Types ====================

/**
 * Email validation result
 */
export interface EmailValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

// ==================== Constants (Bangladesh Specific) ====================

/**
 * Bangladesh specific email domain patterns
 */
const BD_EMAIL_PATTERNS = {
  BANGLADESH_DOMAIN: /\.(com\.bd|net\.bd|org\.bd|edu\.bd|gov\.bd|ac\.bd|mil\.bd)$/i,
  EDUCATIONAL_DOMAIN: /\.(edu|ac\.bd|edu\.bd)$/i,
  GOVERNMENT_DOMAIN: /\.(gov|gov\.bd)$/i,
} as const;

/**
 * Bangladesh specific email domain sets (for quick lookup)
 */
const BD_EMAIL_SETS = {
  GOVERNMENT: new Set([
    'gov.bd',
    'moi.gov.bd',
    'bcc.gov.bd',
    'a2i.gov.bd',
    'dgdpr.gov.bd',
  ]),
  CORPORATE: new Set([
    'bangla.net',
    'agni.com',
    'citechco.net',
    'bdcom.com',
    'bol-online.com',
    'dhaka.net',
    'link3.net',
    'btcl.net.bd',
  ]),
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
} as const;

// ==================== Email Value Object ====================

/**
 * Email Value Object
 * 
 * Represents a validated and normalized email address
 */
export class Email extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _localPart: string;
  private readonly _domain: string;
  private readonly _subAddressTag?: string;

  /**
   * Creates a new Email value object
   * 
   * @param email - Raw email address string
   * @throws {Error} If email format is invalid
   */
  constructor(email: string) {
    super();
    
    // Use shared schema for validation
    const schemaResult = EmailSchema.safeParse(email);
    if (!schemaResult.success) {
      throw new Error(`Invalid email: ${schemaResult.error.errors[0]?.message || 'Invalid format'}`);
    }
    
    // Use shared utility for normalization
    const normalized = normalizeEmail(email);
    
    // Final validation with shared utility
    if (!isValidEmail(normalized)) {
      throw new Error('Invalid email format');
    }
    
    this._value = email.trim();
    this._normalized = normalized;
    
    // Parse components
    const [localPart, domain] = normalized.split('@');
    this._domain = domain || '';
    
    // Parse subaddress tag (e.g., user+tag@example.com)
    const subaddressMatch = localPart?.match(/^(.+)\+(.+)$/);
    if (subaddressMatch && subaddressMatch.length >= 3) {
      this._localPart = subaddressMatch[1] as string;
      this._subAddressTag = subaddressMatch[2] as string;
    } else {
      this._localPart = localPart || '';
    }
    
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
    
    if (trimmed.length > 254) {
      return {
        isValid: false,
        error: 'Email too long (max 254 characters)',
      };
    }

    // Use shared schema validation
    const schemaResult = EmailSchema.safeParse(trimmed);
    if (!schemaResult.success) {
      return {
        isValid: false,
        error: schemaResult.error.errors[0]?.message || 'Invalid email format',
      };
    }

    // Use shared utility for validation
    if (!isValidEmail(trimmed)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      };
    }

    // Use shared utility for normalization
    const normalized = normalizeEmail(trimmed);

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

  /**
   * Get email domain type (Bangladesh specific)
   */
  public getDomainType(): 'bangladesh' | 'educational' | 'government' | 'disposable' | 'other' {
    if (BD_EMAIL_SETS.DISPOSABLE.has(this._domain)) return 'disposable';
    if (BD_EMAIL_PATTERNS.BANGLADESH_DOMAIN.test(this._domain) || 
        BD_EMAIL_SETS.CORPORATE.has(this._domain)) return 'bangladesh';
    if (BD_EMAIL_PATTERNS.EDUCATIONAL_DOMAIN.test(this._domain)) return 'educational';
    if (BD_EMAIL_PATTERNS.GOVERNMENT_DOMAIN.test(this._domain) || 
        BD_EMAIL_SETS.GOVERNMENT.has(this._domain)) return 'government';
    return 'other';
  }

  /**
   * Check if email has a subaddress tag
   */
  public hasSubAddress(): boolean {
    return !!this._subAddressTag;
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
      domainType: this.getDomainType(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    // Show only for debugging - not for production display
    return `Email(${this._normalized})`;
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
 * Uses shared utility
 */
export function isValidEmailFormat(email: string): boolean {
  return isValidEmail(email);
}
