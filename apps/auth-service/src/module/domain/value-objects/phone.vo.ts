/**
 * Phone Number Value Object - Pure Domain Core (Refactored)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/phone.vo
 * 
 * @description
 * Represents a validated and normalized phone number using shared utilities.
 * Uses libphonenumber-js via @vubon/shared-utils for reliable validation.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Phone number never changes after creation
 * ✅ Self-validating - Uses shared validation utilities
 * ✅ Normalized - E.164 standard format
 * ✅ Framework-free - Uses shared packages
 * ✅ Bangladesh specific - Complete BD operator detection
 * 
 * @example
 * const phone = new Phone('01712345678');
 * console.log(phone.getE164()); // '+8801712345678'
 * console.log(phone.getOperator()); // 'gp'
 * console.log(phone.isMobile()); // true
 */

import { ValueObject } from './base.vo';
import { 
  parsePhone,
  isValidPhone,
  isValidBdMobile,
  formatToE164,
  formatNational,
  formatInternational,
  getPhoneComponents,
  type PhoneComponents as SharedPhoneComponents,
} from '@vubon/shared-utils';
import { PhoneSchema } from '@vubon/shared-schemas';

// ==================== Enums ====================

/**
 * Phone number types (Domain-specific categorization)
 */
export enum PhoneType {
  MOBILE = 'mobile',
  LANDLINE = 'landline',
  TOLL_FREE = 'toll_free',
  PREMIUM = 'premium',
  SHARED_COST = 'shared_cost',
  VOIP = 'voip',
  PERSONAL_NUMBER = 'personal_number',
  PAGER = 'pager',
  UAN = 'uan',
  VOICEMAIL = 'voicemail',
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
 * Phone number components (Domain-specific)
 */
export interface PhoneComponents {
  countryCode: string;
  nationalNumber: string;
  e164: string;
  type: PhoneType;
  operator: BDOperator;
  isBangladesh: boolean;
  isMobile: boolean;
}

// ==================== Constants ====================

/**
 * Phone number configuration (Bangladesh specific)
 */
export const PHONE_CONFIG = {
  // E.164 constraints (RFC 3966)
  MAX_LENGTH: 15,
  MIN_LENGTH: 8,
  
  // Country codes
  BANGLADESH_CC: '880',
  
  // Bangladesh operator patterns (for display/UI only, validation uses shared-utils)
  OPERATOR_PREFIXES: {
    '13': BDOperator.GP,
    '14': BDOperator.GP,
    '15': BDOperator.TELETALK,
    '16': BDOperator.ROBI,
    '17': BDOperator.GP,
    '18': BDOperator.ROBI,
    '19': BDOperator.BANGLALINK,
  },
  
  // Operator display names
  OPERATOR_NAMES: {
    [BDOperator.GP]: 'Grameenphone',
    [BDOperator.ROBI]: 'Robi',
    [BDOperator.BANGLALINK]: 'Banglalink',
    [BDOperator.TELETALK]: 'Teletalk',
    [BDOperator.UNKNOWN]: 'Unknown',
  },
  
  // Local format patterns for Bangladesh
  LOCAL_FORMAT: {
    MOBILE: (num: string) => `${num.substring(0, 5)}-${num.substring(5)}`,
    LANDLINE: (num: string) => `${num.substring(0, 4)}-${num.substring(4)}`,
  },
} as const;

// ==================== Helper Functions ====================

/**
 * Map shared-utils phone type to domain PhoneType
 */
const mapPhoneType = (type: string | undefined): PhoneType => {
  if (!type) return PhoneType.UNKNOWN;
  
  const typeMap: Record<string, PhoneType> = {
    'mobile': PhoneType.MOBILE,
    'fixed-line': PhoneType.LANDLINE,
    'fixed-line-or-mobile': PhoneType.MOBILE,
    'toll-free': PhoneType.TOLL_FREE,
    'premium-rate': PhoneType.PREMIUM,
    'shared-cost': PhoneType.SHARED_COST,
    'voip': PhoneType.VOIP,
    'personal-number': PhoneType.PERSONAL_NUMBER,
    'pager': PhoneType.PAGER,
    'uan': PhoneType.UAN,
    'voicemail': PhoneType.VOICEMAIL,
  };
  
  return typeMap[type.toLowerCase()] || PhoneType.UNKNOWN;
};

/**
 * Map operator string to BDOperator enum
 */
const mapOperator = (operator: string | null): BDOperator => {
  if (!operator) return BDOperator.UNKNOWN;
  
  const operatorMap: Record<string, BDOperator> = {
    'Grameenphone': BDOperator.GP,
    'Robi': BDOperator.ROBI,
    'Airtel': BDOperator.ROBI,
    'Banglalink': BDOperator.BANGLALINK,
    'Teletalk': BDOperator.TELETALK,
  };
  
  return operatorMap[operator] || BDOperator.UNKNOWN;
};

// ==================== Phone Number Value Object ====================

/**
 * Phone Number Value Object
 * 
 * Represents a validated and normalized phone number using shared utilities
 */
export class Phone extends ValueObject {
  private readonly _value: string;        // Raw input value (for reference)
  private readonly _e164: string;         // E.164 format (canonical)
  private readonly _countryCode: string;
  private readonly _nationalNumber: string;
  private readonly _type: PhoneType;
  private readonly _operator: BDOperator;
  private readonly _sharedComponents: SharedPhoneComponents | null;

  /**
   * Creates a new Phone value object
   * 
   * @param phone - Raw phone number string (any format)
   * @throws {Error} If phone number is invalid
   */
  constructor(phone: string) {
    super();
    
    // ✅ Use shared schema for validation
    const schemaResult = PhoneSchema.safeParse(phone);
    if (!schemaResult.success) {
      throw new Error(`Invalid phone number: ${schemaResult.error.errors[0]?.message || 'Invalid format'}`);
    }
    
    // ✅ Use shared utility for validation
    if (!isValidPhone(phone, 'BD')) {
      throw new Error('Invalid phone number format');
    }
    
    this._value = phone.trim();
    
    // ✅ Use shared utility for E.164 format
    this._e164 = formatToE164(phone, 'BD')!;
    
    // ✅ Use shared utility for components
    this._sharedComponents = getPhoneComponents(phone, 'BD');
    
    // Parse country code and national number
    const e164Match = this._e164.match(/^\+(\d{1,3})(\d+)$/);
    this._countryCode = e164Match?.[1] || PHONE_CONFIG.BANGLADESH_CC;
    this._nationalNumber = e164Match?.[2] || '';
    
    // Determine type using shared utility + domain mapping
    const parsed = parsePhone(phone, 'BD');
    const sharedType = parsed?.getType();
    this._type = mapPhoneType(sharedType);
    
    // Determine operator (Bangladesh specific)
    this._operator = this.detectOperator();
    
    this.validate();
  }

  /**
   * Detect Bangladesh operator from phone number
   */
  private detectOperator(): BDOperator {
    if (!this.isBangladesh()) {
      return BDOperator.UNKNOWN;
    }
    
    // Try to detect via shared utility first
    const sharedOperator = this._sharedComponents?.operator;
    if (sharedOperator) {
      return mapOperator(sharedOperator);
    }
    
    // Fallback to prefix-based detection (for consistency)
    const prefix = this._nationalNumber.substring(0, 2);
    return PHONE_CONFIG.OPERATOR_PREFIXES[prefix as keyof typeof PHONE_CONFIG.OPERATOR_PREFIXES] || BDOperator.UNKNOWN;
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Phone number cannot be empty');
    }
    
    if (this._e164.length > PHONE_CONFIG.MAX_LENGTH) {
      throw new Error(`Phone number too long (max ${PHONE_CONFIG.MAX_LENGTH} digits)`);
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
  // Validation Methods (Using Shared Utilities)
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
    
    // ✅ Use shared schema validation
    const schemaResult = PhoneSchema.safeParse(trimmed);
    if (!schemaResult.success) {
      return {
        isValid: false,
        error: schemaResult.error.errors[0]?.message || 'Invalid phone format',
      };
    }
    
    // ✅ Use shared utility for validation
    if (!isValidPhone(trimmed, 'BD')) {
      return {
        isValid: false,
        error: 'Invalid phone number format',
      };
    }
    
    // ✅ Use shared utility for E.164
    const e164 = formatToE164(trimmed, 'BD');
    if (!e164) {
      return {
        isValid: false,
        error: 'Could not normalize to E.164 format',
      };
    }
    
    // Parse components
    const e164Match = e164.match(/^\+(\d{1,3})(\d+)$/);
    const countryCode = e164Match?.[1] || PHONE_CONFIG.BANGLADESH_CC;
    const nationalNumber = e164Match?.[2] || '';
    
    // Determine type
    const parsed = parsePhone(trimmed, 'BD');
    const sharedType = parsed?.getType();
    const type = mapPhoneType(sharedType);
    
    // Determine operator for Bangladesh
    let operator: BDOperator = BDOperator.UNKNOWN; // ✅ ডিফল্ট
  
  if (countryCode === PHONE_CONFIG.BANGLADESH_CC && nationalNumber.length === 10) {
    const prefix = nationalNumber.substring(0, 2);
    const detected = PHONE_CONFIG.OPERATOR_PREFIXES[prefix as keyof typeof PHONE_CONFIG.OPERATOR_PREFIXES];
    if (detected) {
      operator = detected;
    }
  }
    
    return {
      isValid: true,
      normalized: trimmed,
      e164,
      countryCode,
      nationalNumber,
      type,
      operator
    };
  }

  /**
   * Normalize phone number to E.164 format
   */
  public static normalizeToE164(phone: string): string | null {
    return formatToE164(phone, 'BD');
  }

  /**
   * Check if a phone number is valid Bangladesh mobile
   */
  public static isValidBangladeshMobile(phone: string): boolean {
    return isValidBdMobile(phone);
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
   * Get raw input value
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
   * Get operator name for display
   */
  public getOperatorName(): string {
    return PHONE_CONFIG.OPERATOR_NAMES[this._operator];
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
      isMobile: this.isMobile(),
    };
  }

  /**
   * Get shared components (from shared-utils)
   */
  public getSharedComponents(): SharedPhoneComponents | null {
    return this._sharedComponents;
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
    
    const national = this._nationalNumber;
    if (national.length === 10 && this.isMobile()) {
      return PHONE_CONFIG.LOCAL_FORMAT.MOBILE(national);
    }
    if (national.length >= 8) {
      return PHONE_CONFIG.LOCAL_FORMAT.LANDLINE(national);
    }
    
    return national;
  }

  /**
   * Get formatted international format using shared-utils
   * @example '+8801712345678' -> '+880 1712-345678'
   */
  public getInternationalFormat(): string {
    return formatInternational(this._value, 'BD') || this._e164;
  }

  /**
   * Get national format using shared-utils
   * @example '+8801712345678' -> '01712 345678'
   */
  public getNationalFormat(): string {
    return formatNational(this._value, 'BD') || this._nationalNumber;
  }

  /**
   * Get compact format (for small spaces)
   */
  public getCompactFormat(): string {
    const e164 = this._e164;
    if (e164.length <= 10) {
      return e164;
    }
    return e164.substring(0, 8) + '...';
  }

  // ============================================================
  // Capability Checks (Domain-specific business rules)
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

  /**
   * Check if MFS (Mobile Financial Service) is available for this number
   * bKash, Nagad, Rocket require Bangladesh mobile number
   */
  public isMFSCapable(): boolean {
    return this.isBangladesh() && this.isMobile();
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
      nationalFormat: this.getNationalFormat(),
      capabilities: {
        sms: this.canReceiveSMS(),
        voice: this.canReceiveVoice(),
        whatsapp: this.isWhatsAppCapable(),
        imo: this.isImoCapable(),
        viber: this.isViberCapable(),
        mfs: this.isMFSCapable(),
      },
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
 * Detect operator from Bangladesh phone number
 */
export function detectBangladeshOperator(phoneNumber: string): BDOperator {
  const phone = Phone.tryCreate(phoneNumber);
  if (!phone || !phone.isBangladesh()) {
    return BDOperator.UNKNOWN;
  }
  return phone.getOperator();
}

