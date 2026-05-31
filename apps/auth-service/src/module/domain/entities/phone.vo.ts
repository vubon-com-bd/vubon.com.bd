/**
 * Phone Number Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/phone.vo
 * 
 * @description
 * Represents a validated and normalized phone number in E.164 format.
 * Used for user contact, SMS delivery, MFA, and communication.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Phone number never changes after creation
 * ✅ Self-validating - Validates format and country-specific rules
 * ✅ Normalized - E.164 standard format
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Complete BD operator detection
 * 
 * Supported features:
 * - E.164 international format
 * - Bangladesh mobile number detection
 * - Operator detection (GP, Robi, Banglalink, Teletalk)
 * - Number type detection (mobile, landline, toll-free)
 * - Privacy-safe masking
 * 
 * @example
 * const phone = new Phone('01712345678');
 * console.log(phone.getE164()); // '+8801712345678'
 * console.log(phone.getOperator()); // 'gp'
 * console.log(phone.isMobile()); // true
 */

import { ValueObject } from './base.vo';

// ==================== Enums ====================

/**
 * Phone number types
 */
export enum PhoneType {
  MOBILE = 'mobile',
  LANDLINE = 'landline',
  TOLL_FREE = 'toll_free',
  PREMIUM = 'premium',
  SHARED_COST = 'shared_cost',
  VOIP = 'voip',
  UNKNOWN = 'unknown',
}

/**
 * Bangladesh mobile operators
 */
export enum BDOperator {
  GP = 'gp',           // Grameenphone
  ROBI = 'robi',       // Robi (includes Airtel)
  BANGLALINK = 'banglalink',
  TELETALK = 'teletalk',
  UNKNOWN = 'unknown',
}

// ==================== Types ====================

/**
 * Phone number validation result
 */
export interface PhoneValidation {
  isValid: boolean;
  normalized?: string;
  e164?: string;
  countryCode?: string;
  nationalNumber?: string;
  type?: PhoneType;
  operator?: BDOperator;
  error?: string;
}

/**
 * Phone number components
 */
export interface PhoneComponents {
  countryCode: string;
  nationalNumber: string;
  e164: string;
  type: PhoneType;
  operator: BDOperator;
  isBangladesh: boolean;
}

// ==================== Constants ====================

/**
 * Phone number configuration
 */
export const PHONE_CONFIG = {
  // E.164 constraints (RFC 3966)
  MAX_LENGTH: 15,
  MIN_LENGTH: 8,
  
  // Country codes
  BANGLADESH_CC: '880',
  
  // Bangladesh number patterns
  BD_MOBILE_PREFIXES: ['13', '14', '15', '16', '17', '18', '19'],
  BD_LANDLINE_PREFIXES: ['2', '3', '4', '5', '6', '7', '8', '9'],
  
  // Operator patterns (after country code, first 2 digits)
  OPERATOR_PATTERNS: {
    [BDOperator.GP]: /^1(?:3|4|7)\d{8}$/,
    [BDOperator.ROBI]: /^1(?:6|8|9)\d{8}$/,
    [BDOperator.BANGLALINK]: /^19\d{8}$/,
    [BDOperator.TELETALK]: /^15\d{8}$/,
  },
  
  // Operator prefix mapping
  OPERATOR_PREFIXES: {
    '13': BDOperator.GP,
    '14': BDOperator.GP,
    '15': BDOperator.TELETALK,
    '16': BDOperator.ROBI,
    '17': BDOperator.GP,
    '18': BDOperator.ROBI,
    '19': BDOperator.BANGLALINK,
  },
  
  // Toll-free prefixes (international)
  TOLL_FREE_PREFIXES: ['800', '888', '877', '866', '855', '844'],
  
  // Premium rate prefixes
  PREMIUM_PREFIXES: ['900', '976', '977', '978', '979', '190'],
  
  // Operator display names
  OPERATOR_NAMES: {
    [BDOperator.GP]: 'Grameenphone',
    [BDOperator.ROBI]: 'Robi',
    [BDOperator.BANGLALINK]: 'Banglalink',
    [BDOperator.TELETALK]: 'Teletalk',
    [BDOperator.UNKNOWN]: 'Unknown',
  },
} as const;

// ==================== Phone Number Value Object ====================

/**
 * Phone Number Value Object
 * 
 * Represents a validated and normalized phone number
 */
export class Phone extends ValueObject {
  private readonly _value: string;        // Raw normalized value
  private readonly _e164: string;         // E.164 format
  private readonly _countryCode: string;
  private readonly _nationalNumber: string;
  private readonly _type: PhoneType;
  private readonly _operator: BDOperator;

  /**
   * Creates a new Phone value object
   * 
   * @param phone - Raw phone number string (any format)
   * @throws {Error} If phone number is invalid
   */
  constructor(phone: string) {
    super();
    
    const validation = Phone.validate(phone);
    if (!validation.isValid) {
      throw new Error(`Invalid phone number: ${validation.error}`);
    }
    
    this._value = validation.normalized!;
    this._e164 = validation.e164!;
    this._countryCode = validation.countryCode!;
    this._nationalNumber = validation.nationalNumber!;
    this._type = validation.type!;
    this._operator = validation.operator || BDOperator.UNKNOWN;
    
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Phone number cannot be empty');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating Phone from E.164 format
   */
  public static fromE164(e164: string): Phone {
    return new Phone(e164);
  }

  /**
   * Creates a Phone from unknown input (safe parsing)
   */
  public static tryCreate(phone: unknown): Phone | null {
    if (typeof phone !== 'string') {
      return null;
    }
    
    try {
      return new Phone(phone);
    } catch {
      return null;
    }
  }

  /**
   * Create a test phone number (for testing only)
   * NOT FOR PRODUCTION USE
   */
  public static forTest(number: string, countryCode: string = PHONE_CONFIG.BANGLADESH_CC): Phone {
    let normalized = number.replace(/\D/g, '');
    if (normalized.startsWith(countryCode)) {
      return new Phone(`+${normalized}`);
    }
    if (normalized.startsWith('0')) {
      normalized = normalized.substring(1);
    }
    return new Phone(`+${countryCode}${normalized}`);
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates and normalizes a phone number
   * 
   * @param phone - Raw phone number string
   * @returns Validation result with normalized values
   */
  public static validate(phone: string): PhoneValidation {
    // Check type and emptiness
    if (!phone || typeof phone !== 'string') {
      return {
        isValid: false,
        error: 'Phone number cannot be null or undefined',
      };
    }

    const trimmed = phone.trim();
    
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'Phone number cannot be empty',
      };
    }

    // Remove all non-digit characters except '+'
    let cleaned = trimmed.replace(/[^\d+]/g, '');
    
    // Ensure '+' prefix for E.164
    if (!cleaned.startsWith('+')) {
      // Handle local Bangladesh format (starts with 0)
      if (cleaned.startsWith('0')) {
        cleaned = '+' + PHONE_CONFIG.BANGLADESH_CC + cleaned.substring(1);
      } else {
        cleaned = '+' + cleaned;
      }
    }
    
    // Parse country code and national number
    let countryCode = '';
    let nationalNumber = '';
    let e164 = '';
    
    // Try to parse as E.164
    const e164Match = cleaned.match(/^\+(\d{1,3})(\d+)$/);
    if (e164Match) {
      countryCode = e164Match[1]!;
      nationalNumber = e164Match[2]!;
      e164 = cleaned;
    } else {
      return {
        isValid: false,
        error: 'Invalid phone number format',
      };
    }
    
    // Validate length
    const digitCount = e164.replace(/\D/g, '').length;
    if (digitCount > PHONE_CONFIG.MAX_LENGTH) {
      return {
        isValid: false,
        error: `Phone number too long (max ${PHONE_CONFIG.MAX_LENGTH} digits)`,
      };
    }
    
    if (digitCount < PHONE_CONFIG.MIN_LENGTH) {
      return {
        isValid: false,
        error: `Phone number too short (min ${PHONE_CONFIG.MIN_LENGTH} digits)`,
      };
    }
    
    // Detect type and operator based on country
    let type = PhoneType.UNKNOWN;
    let operator = BDOperator.UNKNOWN;
    
    // Bangladesh specific validation
    if (countryCode === PHONE_CONFIG.BANGLADESH_CC) {
      // Validate length (10 digits after country code for BD)
      if (nationalNumber.length !== 10) {
        return {
          isValid: false,
          error: 'Bangladeshi number must be 10 digits after country code',
        };
      }
      
      // Check if mobile
      const firstTwo = nationalNumber.substring(0, 2);
      const isMobile = PHONE_CONFIG.BD_MOBILE_PREFIXES.includes(firstTwo);
      const isLandline = PHONE_CONFIG.BD_LANDLINE_PREFIXES.includes(firstTwo[0] || '') && !isMobile;
      
      if (isMobile) {
        type = PhoneType.MOBILE;
        
        // Detect operator from prefix
        operator = PHONE_CONFIG.OPERATOR_PREFIXES[firstTwo as keyof typeof PHONE_CONFIG.OPERATOR_PREFIXES] || BDOperator.UNKNOWN;
      } else if (isLandline) {
        type = PhoneType.LANDLINE;
      } else {
        return {
          isValid: false,
          error: 'Invalid Bangladeshi phone number format',
        };
      }
    } else {
      // International number validation
      // Basic validation: must have reasonable length
      if (nationalNumber.length < 5 || nationalNumber.length > 12) {
        return {
          isValid: false,
          error: 'Invalid national number length for international format',
        };
      }
      
      // Check for toll-free numbers
      const nationalPrefix = nationalNumber.substring(0, 3);
      if (PHONE_CONFIG.TOLL_FREE_PREFIXES.includes(nationalPrefix)) {
        type = PhoneType.TOLL_FREE;
      } else if (PHONE_CONFIG.PREMIUM_PREFIXES.includes(nationalPrefix)) {
        type = PhoneType.PREMIUM;
      } else if (/^[0-9]{8,10}$/.test(nationalNumber)) {
        type = PhoneType.MOBILE; // Assume mobile for common length
      } else {
        type = PhoneType.UNKNOWN;
      }
    }
    
    return {
      isValid: true,
      normalized: trimmed,
      e164,
      countryCode,
      nationalNumber,
      type,
      operator: operator !== BDOperator.UNKNOWN ? operator : undefined,
      error: undefined,
    };
  }

  /**
   * Normalize phone number to E.164 format
   */
  public static normalizeToE164(phone: string): string | null {
    const validation = Phone.validate(phone);
    return validation.isValid ? validation.e164! : null;
  }

  /**
   * Check if a phone number is valid Bangladesh mobile
   */
  public static isValidBangladeshMobile(phone: string): boolean {
    const validation = Phone.validate(phone);
    return validation.isValid && 
           validation.countryCode === PHONE_CONFIG.BANGLADESH_CC &&
           validation.type === PhoneType.MOBILE;
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Get phone number in E.164 format
   */
  public getE164(): string {
    return this._e164;
  }

  /**
   * Get raw normalized value
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get country code
   */
  public getCountryCode(): string {
    return this._countryCode;
  }

  /**
   * Get national number (without country code)
   */
  public getNationalNumber(): string {
    return this._nationalNumber;
  }

  /**
   * Get phone type
   */
  public getType(): PhoneType {
    return this._type;
  }

  /**
   * Get Bangladesh operator (if applicable)
   */
  public getOperator(): BDOperator {
    return this._operator;
  }

  /**
   * Get all components as an object
   */
  public getComponents(): PhoneComponents {
    return {
      countryCode: this._countryCode,
      nationalNumber: this._nationalNumber,
      e164: this._e164,
      type: this._type,
      operator: this._operator,
      isBangladesh: this.isBangladesh(),
    };
  }

  // ============================================================
  // Type Checking
  // ============================================================

  /**
   * Check if phone number is from Bangladesh
   */
  public isBangladesh(): boolean {
    return this._countryCode === PHONE_CONFIG.BANGLADESH_CC;
  }

  /**
   * Check if phone number is mobile
   */
  public isMobile(): boolean {
    return this._type === PhoneType.MOBILE;
  }

  /**
   * Check if phone number is landline
   */
  public isLandline(): boolean {
    return this._type === PhoneType.LANDLINE;
  }

  /**
   * Check if phone number is toll-free
   */
  public isTollFree(): boolean {
    return this._type === PhoneType.TOLL_FREE;
  }

  /**
   * Check if phone number is from Grameenphone (Bangladesh)
   */
  public isGP(): boolean {
    return this._operator === BDOperator.GP;
  }

  /**
   * Check if phone number is from Robi (Bangladesh)
   */
  public isRobi(): boolean {
    return this._operator === BDOperator.ROBI;
  }

  /**
   * Check if phone number is from Banglalink (Bangladesh)
   */
  public isBanglalink(): boolean {
    return this._operator === BDOperator.BANGLALINK;
  }

  /**
   * Check if phone number is from Teletalk (Bangladesh)
   */
  public isTeletalk(): boolean {
    return this._operator === BDOperator.TELETALK;
  }

  // ============================================================
  // Formatting Methods
  // ============================================================

  /**
   * Mask phone number for privacy
   * @example '+8801712345678' -> '+88017******78'
   */
  public mask(): string {
    const e164 = this._e164;
    if (e164.length <= 8) {
      return e164;
    }
    
    const prefix = e164.substring(0, e164.length - 6);
    const suffix = e164.substring(e164.length - 2);
    return `${prefix}******${suffix}`;
  }

  /**
   * Get local format for display (Bangladesh specific)
   * @example '+8801712345678' -> '01712-345678'
   */
  public getLocalFormat(): string {
    if (!this.isBangladesh()) {
      return this._e164;
    }
    
    const local = this._nationalNumber;
    if (local.length === 10) {
      return `${local.substring(0, 5)}-${local.substring(5)}`;
    }
    
    return local;
  }

  /**
   * Get formatted international format
   * @example '+8801712345678' -> '+880 1712-345678'
   */
  public getInternationalFormat(): string {
    if (this.isBangladesh()) {
      const local = this._nationalNumber;
      return `+${this._countryCode} ${local.substring(0, 4)}-${local.substring(4)}`;
    }
    
    // For other countries, add space after country code
    return `+${this._countryCode} ${this._nationalNumber}`;
  }

  /**
   * Get compact format (for small spaces)
   * @example '+8801712345678' -> '+8801712...'
   */
  public getCompactFormat(): string {
    const e164 = this._e164;
    if (e164.length <= 10) {
      return e164;
    }
    return e164.substring(0, 8) + '...';
  }

  /**
   * Get operator name (for display)
   */
  public getOperatorName(): string {
    return PHONE_CONFIG.OPERATOR_NAMES[this._operator];
  }

  // ============================================================
  // Capability Checks
  // ============================================================

  /**
   * Check if phone number can receive SMS
   */
  public canReceiveSMS(): boolean {
    return this.isMobile() || this._type === PhoneType.VOIP;
  }

  /**
   * Check if phone number can receive voice calls
   */
  public canReceiveVoice(): boolean {
    return true; // Most phone types can receive voice
  }

  /**
   * Check if phone number is for WhatsApp (requires mobile)
   */
  public isWhatsAppCapable(): boolean {
    return this.isMobile();
  }

  /**
   * Check if phone number is for Imo (requires mobile)
   */
  public isImoCapable(): boolean {
    return this.isMobile();
  }

  /**
   * Check if phone number supports Viber
   */
  public isViberCapable(): boolean {
    return this.isMobile();
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Check if phone number is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === '+0000000000' ||
           this._value === '+880000000000';
  }

  /**
   * Get equality components for parent class comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._e164, this._type];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    return {
      e164: this._e164,
      countryCode: this._countryCode,
      nationalNumber: this._nationalNumber,
      type: this._type,
      operator: this._operator,
      operatorName: this.getOperatorName(),
      isBangladesh: this.isBangladesh(),
      isMobile: this.isMobile(),
      masked: this.mask(),
      localFormat: this.getLocalFormat(),
      internationalFormat: this.getInternationalFormat(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `Phone(${this.mask()}, type=${this._type}, operator=${this.getOperatorName()})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is a Phone
 */
export function isPhone(value: unknown): value is Phone {
  return value instanceof Phone;
}

/**
 * Create Phone from database value (E.164 format)
 */
export function phoneFromE164(e164: string | null | undefined): Phone | null {
  if (!e164) return null;
  return Phone.tryCreate(e164);
}

/**
 * Format phone for SMS display (shortened)
 */
export function formatPhoneForSMS(phone: Phone): string {
  if (phone.isBangladesh()) {
    return phone.getLocalFormat();
  }
  return phone.getE164();
}

/**
 * Extract operator from Bangladesh phone number
 */
export function detectBangladeshOperator(phoneNumber: string): BDOperator {
  const phone = Phone.tryCreate(phoneNumber);
  if (!phone || !phone.isBangladesh()) {
    return BDOperator.UNKNOWN;
  }
  return phone.getOperator();
}

// ============================================================
// Type Exports
// ============================================================

export type { PhoneComponents };
