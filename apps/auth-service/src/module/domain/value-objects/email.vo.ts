/**
 * Email Value Object - Pure Domain Core (Port-Based)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/email.vo
 * 
 * @description
 * Represents a validated and normalized email address.
 * Uses dependency injection (Port) for validation to keep domain layer pure.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Email never changes after creation
 * ✅ Self-validating - Validates using injected validator port
 * ✅ Normalized - Standardized format for equality
 * ✅ Framework-free - No external dependencies (shared-*, @nestjs/*, etc.)
 * ✅ Bangladesh specific - Support for .com.bd, .edu.bd, etc.
 * ✅ Dependency Inversion - Uses interface (IEmailValidator) not concrete implementation
 * ✅ Testable - Easy to mock the validator
 * 
 * @example
 * // With DI container (production)
 * const email = new Email('User@Example.COM', emailValidator);
 * console.log(email.getValue()); // 'User@Example.COM'
 * console.log(email.getNormalized()); // 'user@example.com'
 * console.log(email.getDomain()); // 'example.com'
 * 
 * // Without DI container (testing)
 * const mockValidator = new MockEmailValidator();
 * const email = new Email('test@example.com', mockValidator);
 */

import { ValueObject } from './base.vo';
import { IEmailValidator, EmailValidationResult } from '../ports/email-validator.port';

// ==================== Types ====================

/**
 * Email validation result (domain-specific)
 */
export interface EmailValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Email domain type (Bangladesh specific)
 */
export type EmailDomainType = 
  | 'bangladesh' 
  | 'educational' 
  | 'government' 
  | 'disposable' 
  | 'other';

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
  private readonly _domainType: EmailDomainType;

  /**
   * Creates a new Email value object
   * 
   * @param email - Raw email address string
   * @param validator - Injected email validator port (Dependency Injection)
   * @throws {Error} If email format is invalid
   */
  constructor(
    email: string,
    private readonly validator: IEmailValidator
  ) {
    super();
    
    // ✅ Use injected validator for validation
    const validation: EmailValidationResult = validator.validate(email);
    if (!validation.isValid) {
      throw new Error(`Invalid email: ${validation.error || 'Invalid format'}`);
    }
    
    // ✅ Use injected validator for normalization
    const normalized = validator.normalize(email);
    if (!normalized) {
      throw new Error('Could not normalize email');
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
    
    // Get domain type from validator
    this._domainType = validator.getDomainType(this._domain) as EmailDomainType;
    
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
  public static fromValid(
    email: string,
    validator: IEmailValidator
  ): Email {
    return new Email(email, validator);
  }

  /**
   * Creates an Email from unknown input (safe parsing)
   */
  public static tryCreate(
    email: unknown,
    validator: IEmailValidator
  ): Email | null {
    if (typeof email !== 'string') {
      return null;
    }
    
    try {
      return new Email(email, validator);
    } catch {
      return null;
    }
  }

  // ============================================================
  // Static Validation Methods (Using Injected Validator)
  // ============================================================

  /**
   * Validates an email address using the injected validator
   * 
   * @param email - Raw email address string
   * @param validator - Injected email validator port
   * @returns Validation result with normalized value if valid
   */
  public static validate(
    email: string,
    validator: IEmailValidator
  ): EmailValidation {
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

    // ✅ Use injected validator for validation
    const validationResult = validator.validate(trimmed);
    if (!validationResult.isValid) {
      return {
        isValid: false,
        error: validationResult.error || 'Invalid email format',
      };
    }

    // ✅ Use injected validator for normalization
    const normalized = validator.normalize(trimmed);
    if (!normalized) {
      return {
        isValid: false,
        error: 'Could not normalize email',
      };
    }

    return {
      isValid: true,
      normalized,
    };
  }

  /**
   * Normalize email to canonical form using injected validator
   */
  public static normalize(
    email: string,
    validator: IEmailValidator,
    stripSubaddress: boolean = false
  ): string | null {
    let normalized = validator.normalize(email);
    if (!normalized) return null;
    
    if (stripSubaddress) {
      const [localPart, domain] = normalized.split('@');
      if (localPart) {
        const baseLocalPart = localPart.split('+')[0];
        if (domain) {
          return `${baseLocalPart}@${domain}`;
        }
        return baseLocalPart;
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
  public getDomainType(): EmailDomainType {
    return this._domainType;
  }

  /**
   * Check if email has a subaddress tag
   */
  public hasSubAddress(): boolean {
    return !!this._subAddressTag;
  }

  /**
   * Check if email is from Bangladesh
   */
  public isBangladesh(): boolean {
    return this._domainType === 'bangladesh';
  }

  /**
   * Check if email is from educational institution
   */
  public isEducational(): boolean {
    return this._domainType === 'educational';
  }

  /**
   * Check if email is from government
   */
  public isGovernment(): boolean {
    return this._domainType === 'government';
  }

  /**
   * Check if email is from disposable provider
   */
  public isDisposable(): boolean {
    return this._domainType === 'disposable';
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
      domainType: this._domainType,
      isBangladesh: this.isBangladesh(),
      isEducational: this.isEducational(),
      isGovernment: this.isGovernment(),
      isDisposable: this.isDisposable(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
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
export function createEmailFromRequest(
  email: string | null | undefined,
  validator: IEmailValidator
): Email | null {
  if (!email) return null;
  return Email.tryCreate(email, validator);
}
