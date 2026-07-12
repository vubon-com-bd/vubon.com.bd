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
 * Mock phone validator for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockPhoneValidator implements IPhoneValidator {
  constructor(
    private readonly isValidResult: boolean = true,
    private readonly mockPhoneNumber: string = '+8801712345678'
  ) {}

  validate(phone: string, countryCode?: string): PhoneValidationResult {
    // প্যারামিটার ব্যবহার করে ভ্যালিডেশন সিমুলেট করা
    const isValid = this.isValidResult && phone.length >= 10;
    
    if (isValid) {
      const normalized = this.normalize(phone, countryCode) || this.mockPhoneNumber;
      const components = this.getComponents(phone, countryCode);
      
      return {
        isValid: true,
        normalized,
        components: components || {
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
    
    return { 
      isValid: false, 
      error: `Invalid phone number: ${phone}` 
    };
  }

  isValid(phone: string, countryCode?: string): boolean {
    // প্যারামিটার ব্যবহার করে ভ্যালিডিটি চেক করা
    if (!phone || phone.length < 10) return false;
    
    // কান্ট্রি কোড অনুযায়ী চেক
    if (countryCode === '880' && !phone.startsWith('+880') && !phone.startsWith('01')) {
      return false;
    }
    
    return this.isValidResult;
  }

  isBangladeshMobile(phone: string): boolean {
    // বাংলাদেশি মোবাইল নম্বর চেক করা
    const cleaned = phone.replace(/\D/g, '');
    const bdPattern = /^(880|0)?1[3-9]\d{8}$/;
    return this.isValidResult && bdPattern.test(cleaned);
  }

  formatToE164(phone: string, countryCode?: string): string | null {
    if (!this.isValid(phone, countryCode)) return null;
    
    const cleaned = phone.replace(/\D/g, '');
    let e164 = '';
    
    if (cleaned.startsWith('880')) {
      e164 = `+${cleaned}`;
    } else if (cleaned.startsWith('01')) {
      e164 = `+880${cleaned.substring(1)}`;
    } else if (countryCode) {
      e164 = `+${countryCode}${cleaned}`;
    } else {
      e164 = `+880${cleaned}`;
    }
    
    return e164;
  }

  formatInternational(phone: string, countryCode?: string): string | null {
    const e164 = this.formatToE164(phone, countryCode);
    if (!e164) return null;
    
    // আন্তর্জাতিক ফরম্যাটে কনভার্ট (যেমন: +880 1712-345678)
    const parts = e164.match(/^(\+\d{3})(\d{4})(\d{6})$/);
    if (parts) {
      return `${parts[1]} ${parts[2]}-${parts[3]}`;
    }
    
    return e164;
  }

  formatNational(phone: string, countryCode?: string): string | null {
    if (!this.isValid(phone, countryCode)) return null;
    
    const cleaned = phone.replace(/\D/g, '');
    let national = cleaned;
    
    if (cleaned.startsWith('880')) {
      national = `0${cleaned.substring(3)}`;
    } else if (!cleaned.startsWith('0')) {
      national = `0${cleaned}`;
    }
    
    // ন্যাশনাল ফরম্যাটে কনভার্ট (যেমন: 01712-345678)
    const parts = national.match(/^(0\d{4})(\d{6})$/);
    if (parts) {
      return `${parts[1]}-${parts[2]}`;
    }
    
    return national;
  }

  getComponents(phone: string, countryCode?: string): PhoneComponents | null {
    if (!this.isValid(phone, countryCode)) return null;
    
    const cleaned = phone.replace(/\D/g, '');
    let countryCodeValue = '880';
    let nationalNumber = cleaned;
    
    if (cleaned.startsWith('880')) {
      countryCodeValue = '880';
      nationalNumber = cleaned.substring(3);
    } else if (cleaned.startsWith('0')) {
      countryCodeValue = '880';
      nationalNumber = cleaned.substring(1);
    } else if (countryCode) {
      countryCodeValue = countryCode;
      nationalNumber = cleaned;
    }
    
    const e164 = `+${countryCodeValue}${nationalNumber}`;
    const operator = this.detectOperator(phone);
    const isBangladesh = countryCodeValue === '880';
    const isMobile = isBangladesh && /^1[3-9]/.test(nationalNumber);
    
    return {
      countryCode: countryCodeValue,
      nationalNumber,
      e164,
      type: isMobile ? PhoneType.MOBILE : PhoneType.LANDLINE,
      operator,
      isBangladesh,
      isMobile,
    };
  }

  detectOperator(phone: string): BDOperator {
    const cleaned = phone.replace(/\D/g, '');
    // জাতীয় নম্বর বের করা
    let national = cleaned;
    if (cleaned.startsWith('880')) {
      national = cleaned.substring(3);
    } else if (cleaned.startsWith('0')) {
      national = cleaned.substring(1);
    }
    
    // অপারেটর ডিটেক্ট করার লজিক
if (national.startsWith('17')) return BDOperator.GP;
if (national.startsWith('18')) return BDOperator.ROBI;
if (national.startsWith('19')) return BDOperator.BANGLALINK;
if (national.startsWith('13')) return BDOperator.TELETALK;
if (national.startsWith('14')) return BDOperator.ROBI; // AIRTEL-এর পরিবর্তে ROBI ব্যবহার করুন
if (national.startsWith('15')) return BDOperator.TELETALK; // RADIANT-এর পরিবর্তে TELETALK ব্যবহার করুন
if (national.startsWith('16')) return BDOperator.ROBI; // AIRTEL-এর পরিবর্তে ROBI ব্যবহার করুন

return BDOperator.UNKNOWN;
 }

  canReceiveSMS(phone: string, countryCode?: string): boolean {
    // এসএমএস গ্রহণ করার ক্ষমতা চেক
    const components = this.getComponents(phone, countryCode);
    if (!components) return false;
    
    // মোবাইল নম্বর হলে এসএমএস নিতে পারে
    return this.isValidResult && components.isMobile;
  }

  isWhatsAppCapable(phone: string, countryCode?: string): boolean {
    // হোয়াটসঅ্যাপ ক্যাপাবিলিটি চেক
    const components = this.getComponents(phone, countryCode);
    if (!components) return false;
    
    // বাংলাদেশি মোবাইল নম্বর হলে হোয়াটসঅ্যাপ সাপোর্ট করে
    return this.isValidResult && components.isBangladesh && components.isMobile;
  }

  isMFSCapable(phone: string): boolean {
    // এমএফএস ক্যাপাবিলিটি চেক
    const components = this.getComponents(phone);
    if (!components) return false;
    
    // সব বাংলাদেশি মোবাইল নম্বর এমএফএস সাপোর্ট করে
    return this.isValidResult && components.isBangladesh && components.isMobile;
  }

  normalize(phone: string, countryCode?: string): string | null {
    if (!this.isValid(phone, countryCode)) return null;
    
    const cleaned = phone.replace(/\D/g, '');
    let e164 = '';
    
    if (cleaned.startsWith('880')) {
      e164 = `+${cleaned}`;
    } else if (cleaned.startsWith('01') && cleaned.length === 11) {
      e164 = `+880${cleaned.substring(1)}`;
    } else if (countryCode) {
      e164 = `+${countryCode}${cleaned}`;
    } else {
      e164 = `+880${cleaned}`;
    }
    
    return e164;
  }

  mask(phone: string, countryCode?: string): string {
    if (!this.isValid(phone, countryCode)) return phone;
    
    const e164 = this.formatToE164(phone, countryCode);
    if (!e164) return phone;
    
    // মাস্কিং: +88017******78
    const parts = e164.match(/^(\+\d{3}\d{2})(\d{4})(\d{2})$/);
    if (parts) {
      return `${parts[1]}******${parts[3]}`;
    }
    
    return e164;
  }

  isBangladesh(phone: string): boolean {
    const components = this.getComponents(phone);
    return this.isValidResult && components?.isBangladesh === true;
  }

  isMobile(phone: string, countryCode?: string): boolean {
    const components = this.getComponents(phone, countryCode);
    return this.isValidResult && components?.isMobile === true;
  }
}

// ============================================================
// Export Types
// ============================================================

export type PhoneValidatorPort = IPhoneValidator;
