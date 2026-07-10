/**
 * Phone Validator Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/phone-validator.port
 *
 * @description
 * Port (interface) for phone number validation and formatting.
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
 * class Phone extends ValueObject {
 *   constructor(
 *     phone: string,
 *     private readonly validator: IPhoneValidator
 *   ) {
 *     super();
 *     if (!validator.isValid(phone, 'BD')) {
 *       throw new Error('Invalid phone number');
 *     }
 *   }
 * }
 *
 * // Infrastructure implementation
 * class PhoneValidatorAdapter implements IPhoneValidator {
 *   isValid(phone: string, countryCode: string): boolean {
 *     return isValidPhone(phone, countryCode);
 *   }
 * }
 */

// ============================================================
// Enums (Domain-Specific)
// ============================================================

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
  GP = 'gp', // Grameenphone
  ROBI = 'robi', // Robi (includes Airtel)
  BANGLALINK = 'banglalink',
  TELETALK = 'teletalk',
  UNKNOWN = 'unknown',
}

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Phone number components (Domain-specific)
 */
export interface PhoneComponents {
  /** Country code (e.g., '880') */
  countryCode: string;
  /** National number without country code */
  nationalNumber: string;
  /** E.164 format (+8801712345678) */
  e164: string;
  /** Phone type (mobile/landline/etc) */
  type: PhoneType;
  /** Bangladesh operator (if applicable) */
  operator: BDOperator;
  /** Whether number is from Bangladesh */
  isBangladesh: boolean;
  /** Whether number is a mobile number */
  isMobile: boolean;
}

/**
 * Phone validation result
 */
export interface PhoneValidationResult {
  /** Whether the phone number is valid */
  isValid: boolean;
  /** Normalized phone number (E.164) */
  normalized?: string;
  /** Error message if validation fails */
  error?: string;
  /** Phone components if valid */
  components?: PhoneComponents;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Phone Validator Port Interface
 * Defines the contract for phone number operations in the domain layer.
 * All phone number validation and formatting should go through this interface.
 *
 * Enterprise Features:
 * ✅ Type-safe interface with domain enums
 * ✅ Country-specific validation (Bangladesh support)
 * ✅ Multi-format formatting (E.164, national, international)
 * ✅ Operator detection (Bangladesh specific)
 * ✅ Capability checking (SMS, WhatsApp, MFS)
 * ✅ Comprehensive validation results
 *
 * @example
 * // Using the port in domain service
 * class UserRegistrationService {
 *   constructor(private readonly phoneValidator: IPhoneValidator) {}
 *
 *   registerUser(phone: string): User {
 *     if (!this.phoneValidator.isValid(phone, 'BD')) {
 *       throw new Error('Invalid phone number');
 *     }
 *     const e164 = this.phoneValidator.formatToE164(phone, 'BD');
 *     // ... rest of the logic
 *   }
 * }
 */
export interface IPhoneValidator {
  /**
   * Validate a phone number
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Detailed validation result
   *
   * @example
   * const result = validator.validate('01712345678', 'BD');
   * if (result.isValid) {
   *   console.log(result.components?.operator); // 'gp'
   * }
   */
  validate(phone: string, countryCode?: string): PhoneValidationResult;

  /**
   * Check if phone number is valid
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns True if phone number is valid
   *
   * @example
   * if (validator.isValid('01712345678')) {
   *   // Process valid phone number
   * }
   */
  isValid(phone: string, countryCode?: string): boolean;

  /**
   * Check if phone number is a valid Bangladesh mobile number
   *
   * @param phone - Raw phone number string
   * @returns True if valid Bangladesh mobile number
   *
   * @example
   * if (validator.isBangladeshMobile('01712345678')) {
   *   console.log('Valid BD mobile number');
   * }
   */
  isBangladeshMobile(phone: string): boolean;

  /**
   * Format phone number to E.164 format
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns E.164 formatted number or null if invalid
   *
   * @example
   * const e164 = validator.formatToE164('01712345678');
   * // '+8801712345678'
   */
  formatToE164(phone: string, countryCode?: string): string | null;

  /**
   * Format phone number to international format
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Internationally formatted number or null
   *
   * @example
   * const formatted = validator.formatInternational('01712345678');
   * // '+880 1712-345678'
   */
  formatInternational(phone: string, countryCode?: string): string | null;

  /**
   * Format phone number to national format
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Nationally formatted number or null
   *
   * @example
   * const formatted = validator.formatNational('01712345678');
   * // '01712 345678'
   */
  formatNational(phone: string, countryCode?: string): string | null;

  /**
   * Get phone number components
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Phone components or null if invalid
   *
   * @example
   * const components = validator.getComponents('01712345678');
   * console.log(components?.operator); // 'gp'
   * console.log(components?.type); // 'mobile'
   */
  getComponents(phone: string, countryCode?: string): PhoneComponents | null;

  /**
   * Detect Bangladesh mobile operator
   *
   * @param phone - Raw phone number string
   * @returns Operator enum or UNKNOWN
   *
   * @example
   * const operator = validator.detectOperator('01712345678');
   * if (operator === BDOperator.GP) {
   *   console.log('Grameenphone user');
   * }
   */
  detectOperator(phone: string): BDOperator;

  /**
   * Check if phone number can receive SMS
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns True if SMS capable
   */
  canReceiveSMS(phone: string, countryCode?: string): boolean;

  /**
   * Check if phone number is WhatsApp capable
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns True if WhatsApp capable
   */
  isWhatsAppCapable(phone: string, countryCode?: string): boolean;

  /**
   * Check if phone number supports MFS (Mobile Financial Services)
   * bKash, Nagad, Rocket require Bangladesh mobile number
   *
   * @param phone - Raw phone number string
   * @returns True if MFS capable
   */
  isMFSCapable(phone: string): boolean;

  /**
   * Normalize phone number to E.164 format
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Normalized E.164 number or null
   */
  normalize(phone: string, countryCode?: string): string | null;

  /**
   * Mask phone number for privacy
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns Masked phone number
   *
   * @example
   * const masked = validator.mask('01712345678');
   * // '+88017******78'
   */
  mask(phone: string, countryCode?: string): string;

  /**
   * Check if phone number is from Bangladesh
   *
   * @param phone - Raw phone number string
   * @returns True if phone number is from Bangladesh
   */
  isBangladesh(phone: string): boolean;

  /**
   * Check if phone number is a mobile number
   *
   * @param phone - Raw phone number string
   * @param countryCode - ISO country code (default: 'BD')
   * @returns True if mobile number
   */
  isMobile(phone: string, countryCode?: string): boolean;
}

// ============================================================
// Utility Types for Testing
// ============================================================

/**
 * Mock phone validator for testing (optional)
 * Can be used in unit tests to avoid external dependencies
 */
export class MockPhoneValidator implements IPhoneValidator {
  constructor(private readonly isValidResult: boolean = true) {}

  validate(phone: string, countryCode?: string): PhoneValidationResult {
    if (this.isValidResult) {
      return {
        isValid: true,
        normalized: '+8801712345678',
        components: {
          countryCode: '880',
          nationalNumber: '1712345678',
          e164: '+8801712345678',
          type: PhoneType.MOBILE,
          operator: BDOperator.GP,
          isBangladesh: true,
          isMobile: true,
        },
      };
    }
    return { isValid: false, error: 'Invalid phone number' };
  }

  isValid(phone: string, countryCode?: string): boolean {
    return this.isValidResult;
  }

  isBangladeshMobile(phone: string): boolean {
    return this.isValidResult;
  }

  formatToE164(phone: string, countryCode?: string): string | null {
    return this.isValidResult ? '+8801712345678' : null;
  }

  formatInternational(phone: string, countryCode?: string): string | null {
    return this.isValidResult ? '+880 1712-345678' : null;
  }

  formatNational(phone: string, countryCode?: string): string | null {
    return this.isValidResult ? '01712 345678' : null;
  }

  getComponents(phone: string, countryCode?: string): PhoneComponents | null {
    if (this.isValidResult) {
      return {
        countryCode: '880',
        nationalNumber: '1712345678',
        e164: '+8801712345678',
        type: PhoneType.MOBILE,
        operator: BDOperator.GP,
        isBangladesh: true,
        isMobile: true,
      };
    }
    return null;
  }

  detectOperator(phone: string): BDOperator {
    return this.isValidResult ? BDOperator.GP : BDOperator.UNKNOWN;
  }

  canReceiveSMS(phone: string, countryCode?: string): boolean {
    return this.isValidResult;
  }

  isWhatsAppCapable(phone: string, countryCode?: string): boolean {
    return this.isValidResult;
  }

  isMFSCapable(phone: string): boolean {
    return this.isValidResult;
  }

  normalize(phone: string, countryCode?: string): string | null {
    return this.isValidResult ? '+8801712345678' : null;
  }

  mask(phone: string, countryCode?: string): string {
    return this.isValidResult ? '+88017******78' : phone;
  }

  isBangladesh(phone: string): boolean {
    return this.isValidResult;
  }

  isMobile(phone: string, countryCode?: string): boolean {
    return this.isValidResult;
  }
}

// ============================================================
// Export Types
// ============================================================

export type PhoneValidatorPort = IPhoneValidator;
