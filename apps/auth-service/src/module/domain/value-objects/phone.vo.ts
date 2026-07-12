/**
 * Phone Number Value Object - Pure Domain Core (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/phone.vo
 * 
 * @description
 * Represents a validated and normalized phone number using dependency injection.
 * Uses the Port-Adapter pattern to keep the domain layer infrastructure-agnostic.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Phone number never changes after creation
 * ✅ Self-validating - Validates using injected validator port
 * ✅ Normalized - E.164 standard format
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Complete BD operator detection
 * ✅ Dependency Inversion - Uses interface (IPhoneValidator) not concrete implementation
 * ✅ Testable - Easy to mock the validator
 * 
 * @example
 * // With DI container
 * const phone = new Phone('01712345678', phoneValidator);
 * console.log(phone.getE164()); // '+8801712345678'
 * console.log(phone.getOperator()); // 'gp'
 * console.log(phone.isMobile()); // true
 * 
 * // Without DI container (for testing)
 * const mockValidator = new MockPhoneValidator();
 * const phone = new Phone('01712345678', mockValidator);
 */

import { ValueObject } from './base.vo';
import { 
  IPhoneValidator, 
  PhoneType as PortPhoneType, 
  BDOperator as PortBDOperator,
  PhoneComponents as Phone_Components 
} from '../ports/phone-validator.port';

// ==================== Re-export Enums from Port (Domain Consistency) ====================

/**
 * Phone number types (Domain-specific categorization)
 * Re-exported from port for domain layer consistency
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
 * Re-exported from port for domain layer consistency
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


// ==================== Constants ====================

/**
 * Phone number configuration (Bangladesh specific)
 * Domain-specific constants only (not infrastructure)
 */
export const PHONE_CONFIG = {
  // E.164 constraints (RFC 3966)
  MAX_LENGTH: 15,
  MIN_LENGTH: 8,
  
  // Country codes
  BANGLADESH_CC: '880',
  
  // Bangladesh operator patterns (for display/UI only)
  OPERATOR_PREFIXES: {
    '13': BDOperator.GP,
    '14': BDOperator.GP,
    '15': BDOperator.TELETALK,
    '16': BDOperator.ROBI,
    '17': BDOperator.GP,
    '18': BDOperator.ROBI,
    '19': BDOperator.BANGLALINK,
  } as const,
  
  // Operator display names
  OPERATOR_NAMES: {
    [BDOperator.GP]: 'Grameenphone',
    [BDOperator.ROBI]: 'Robi',
    [BDOperator.BANGLALINK]: 'Banglalink',
    [BDOperator.TELETALK]: 'Teletalk',
    [BDOperator.UNKNOWN]: 'Unknown',
  } as const,
  
  // Local format patterns for Bangladesh
  LOCAL_FORMAT: {
    MOBILE: (num: string) => `${num.substring(0, 5)}-${num.substring(5)}`,
    LANDLINE: (num: string) => `${num.substring(0, 4)}-${num.substring(4)}`,
  },
} as const;

// ==================== Helper Functions (Domain Mapping) ====================

/**
 * Map port phone type to domain PhoneType
 */
const mapPhoneType = (type: PortPhoneType | undefined): PhoneType => {
  if (!type) return PhoneType.UNKNOWN;
  
  // Direct mapping since enums are the same (re-exported from port)
  return type as unknown as PhoneType;
};

/**
 * Map port operator to domain BDOperator
 */
const mapOperator = (operator: PortBDOperator | undefined): BDOperator => {
  if (!operator) return BDOperator.UNKNOWN;
  return operator as unknown as BDOperator;
};

// ==================== Phone Number Value Object ====================

/**
 * Phone Number Value Object
 * 
 * Represents a validated and normalized phone number using injected validator
 */
export class Phone extends ValueObject {
  private readonly _value: string;        // Raw input value (for reference)
  private readonly _e164: string;         // E.164 format (canonical)
  private readonly _countryCode: string;
  private readonly _nationalNumber: string;
  private readonly _type: PhoneType;
  private readonly _operator: BDOperator;
  private readonly _isBangladesh: boolean;
  private readonly _isMobile: boolean;

  /**
   * Creates a new Phone value object
   * 
   * @param phone - Raw phone number string (any format)
   * @param validator - Injected phone validator port (Dependency Injection)
   * @throws {Error} If phone number is invalid
   */
  constructor(
    phone: string,
    private readonly validator: IPhoneValidator
  ) {
    super();
    
    // ✅ Use injected validator for validation
    if (!validator.isValid(phone, 'BD')) {
      throw new Error('Invalid phone number format');
    }
    
    // ✅ Use injected validator for formatting
    const e164 = validator.formatToE164(phone, 'BD');
    if (!e164) {
      throw new Error('Could not normalize phone number to E.164 format');
    }
    
    this._value = phone.trim();
    this._e164 = e164;
    
    // ✅ Use injected validator for components
    const components = validator.getComponents(phone, 'BD');
    if (!components) {
      throw new Error('Could not parse phone number components');
    }
    
    // Map port components to domain components
    this._countryCode = components.countryCode;
    this._nationalNumber = components.nationalNumber;
    this._type = mapPhoneType(components.type);
    this._operator = mapOperator(components.operator);
    this._isBangladesh = components.isBangladesh;
    this._isMobile = components.isMobile;
    
    this.validate();
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
  public static fromE164(e164: string, validator: IPhoneValidator): Phone {
    return new Phone(e164, validator);
  }

  /**
   * Creates a Phone from unknown input (safe parsing)
   */
  public static tryCreate(phone: unknown, validator: IPhoneValidator): Phone | null {
    if (typeof phone !== 'string') {
      return null;
    }
    
    try {
      return new Phone(phone, validator);
    } catch {
      return null;
    }
  }

  /**
   * Create a test phone number (for testing only)
   * NOT FOR PRODUCTION USE
   */
  public static forTest(number: string, validator: IPhoneValidator, countryCode: string = PHONE_CONFIG.BANGLADESH_CC): Phone {
    let normalized = number.replace(/\D/g, '');
    if (normalized.startsWith(countryCode)) {
      return new Phone(`+${normalized}`, validator);
    }
    if (normalized.startsWith('0')) {
      normalized = normalized.substring(1);
    }
    return new Phone(`+${countryCode}${normalized}`, validator);
  }

  // ============================================================
  // Static Validation Methods (Using Injected Validator)
  // ============================================================

  /**
   * Validates and normalizes a phone number using the injected validator
   * 
   * @param phone - Raw phone number string
   * @param validator - Injected phone validator port
   * @returns Validation result with normalized values
   */
  public static validate(phone: string, validator: IPhoneValidator): PhoneValidation {
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
    
    // ✅ Use injected validator for validation
    if (!validator.isValid(trimmed, 'BD')) {
      return {
        isValid: false,
        error: 'Invalid phone number format',
      };
    }
    
    // ✅ Use injected validator for E.164
    const e164 = validator.formatToE164(trimmed, 'BD');
    if (!e164) {
      return {
        isValid: false,
        error: 'Could not normalize to E.164 format',
      };
    }
    
    // ✅ Use injected validator for components
    const components = validator.getComponents(trimmed, 'BD');
    if (!components) {
      return {
        isValid: false,
        error: 'Could not parse phone components',
      };
    }
    
    // Parse components
    const e164Match = e164.match(/^\+(\d{1,3})(\d+)$/);
    const countryCode = e164Match?.[1] || PHONE_CONFIG.BANGLADESH_CC;
    const nationalNumber = e164Match?.[2] || '';
    
    return {
      isValid: true,
      normalized: trimmed,
      e164,
      countryCode,
      nationalNumber,
      type: mapPhoneType(components.type),
      operator: mapOperator(components.operator),
    };
  }

  /**
   * Normalize phone number to E.164 format using injected validator
   */
  public static normalizeToE164(phone: string, validator: IPhoneValidator): string | null {
    return validator.formatToE164(phone, 'BD');
  }

  /**
   * Check if a phone number is valid Bangladesh mobile using injected validator
   */
  public static isValidBangladeshMobile(phone: string, validator: IPhoneValidator): boolean {
    return validator.isBangladeshMobile(phone);
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
  public getComponents(): Phone_Components {
    return {
      countryCode: this._countryCode,
      nationalNumber: this._nationalNumber,
      e164: this._e164,
      type: this._type,
      operator: this._operator,
      isBangladesh: this._isBangladesh,
      isMobile: this._isMobile,
    };
  }

  // ============================================================
  // Type Checking
  // ============================================================

  /**
   * Check if phone number is from Bangladesh
   */
  public isBangladesh(): boolean {
    return this._isBangladesh;
  }

  /**
   * Check if phone number is mobile
   */
  public isMobile(): boolean {
    return this._isMobile;
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
    if (!this._isBangladesh) {
      return this._e164;
    }
    
    const national = this._nationalNumber;
    if (national.length === 10 && this._isMobile) {
      return PHONE_CONFIG.LOCAL_FORMAT.MOBILE(national);
    }
    if (national.length >= 8) {
      return PHONE_CONFIG.LOCAL_FORMAT.LANDLINE(national);
    }
    
    return national;
  }

  /**
   * Get formatted international format using injected validator
   * @example '+8801712345678' -> '+880 1712-345678'
   */
  public getInternationalFormat(): string {
    return this.validator.formatInternational(this._value, 'BD') || this._e164;
  }

  /**
   * Get national format using injected validator
   * @example '+8801712345678' -> '01712 345678'
   */
  public getNationalFormat(): string {
    return this.validator.formatNational(this._value, 'BD') || this._nationalNumber;
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
    return this._isMobile || this._type === PhoneType.VOIP;
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
    return this._isMobile;
  }

  /**
   * Check if phone number is for Imo (requires mobile)
   */
  public isImoCapable(): boolean {
    return this._isMobile;
  }

  /**
   * Check if phone number supports Viber
   */
  public isViberCapable(): boolean {
    return this._isMobile;
  }

  /**
   * Check if MFS (Mobile Financial Service) is available for this number
   * bKash, Nagad, Rocket require Bangladesh mobile number
   */
  public isMFSCapable(): boolean {
    return this._isBangladesh && this._isMobile;
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
      isBangladesh: this._isBangladesh,
      isMobile: this._isMobile,
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
export function phoneFromE164(e164: string | null | undefined, validator: IPhoneValidator): Phone | null {
  if (!e164) return null;
  return Phone.tryCreate(e164, validator);
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
export function detectBangladeshOperator(phoneNumber: string, validator: IPhoneValidator): BDOperator {
  const phone = Phone.tryCreate(phoneNumber, validator);
  if (!phone || !phone.isBangladesh()) {
    return BDOperator.UNKNOWN;
  }
  return phone.getOperator();
}
