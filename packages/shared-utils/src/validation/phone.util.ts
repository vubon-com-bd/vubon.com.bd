import {
  parsePhoneNumber,
  isValidPhoneNumber,
  formatPhoneNumber,
  getCountryCallingCode,
} from 'libphonenumber-js';

/**
 * Phone number format types
 */
export type PhoneFormat = 'international' | 'national' | 'e164';

/**
 * Mobile network operators in Bangladesh
 */
export type BDPhoneOperator = 'Grameenphone' | 'Robi' | 'Banglalink' | 'Teletalk' | 'Unknown';

/**
 * Phone number validation result
 */
export interface PhoneValidationResult {
  /** Whether the phone number is valid */
  isValid: boolean;
  /** Whether the phone number is a mobile number */
  isMobile?: boolean;
  /** Whether the phone number is a fixed line */
  isFixedLine?: boolean;
  /** Country code of the phone number */
  countryCode?: string;
  /** National number without country code */
  nationalNumber?: string;
  /** International formatted number */
  internationalNumber?: string;
  /** E.164 formatted number */
  e164Number?: string;
  /** Mobile network operator (for Bangladeshi numbers) */
  operator?: BDPhoneOperator;
}

/**
 * Parses and validates a phone number
 *
 * @param phoneNumber - The phone number string to parse
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns PhoneValidationResult containing validation and parsed data
 *
 * @example
 * const result = parseAndValidatePhone('01712345678', 'BD');
 * // { isValid: true, isMobile: true, countryCode: 'BD', ... }
 */
export function parseAndValidatePhone(
  phoneNumber: string,
  countryCode: string = 'BD'
): PhoneValidationResult {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return { isValid: false };
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode);

    if (!parsed || !parsed.isValid()) {
      return { isValid: false };
    }

    const result: PhoneValidationResult = {
      isValid: true,
      isMobile: parsed.getType() === 'MOBILE',
      isFixedLine: parsed.getType() === 'FIXED_LINE',
      countryCode: parsed.country,
      nationalNumber: parsed.nationalNumber,
      internationalNumber: parsed.formatInternational(),
      e164Number: parsed.format('E.164'),
    };

    // Detect operator for Bangladeshi numbers
    if (parsed.country === 'BD' && parsed.nationalNumber) {
      result.operator = detectBDOperator(parsed.nationalNumber);
    }

    return result;
  } catch {
    return { isValid: false };
  }
}

/**
 * Validates a phone number
 *
 * @param phoneNumber - The phone number string to validate
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns `true` if the phone number is valid, `false` otherwise
 *
 * @example
 * const isValid = isValidPhoneNumber('+8801712345678');
 * // true
 */
export function validatePhone(phoneNumber: string, countryCode: string = 'BD'): boolean {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  try {
    return isValidPhoneNumber(phoneNumber, countryCode);
  } catch {
    return false;
  }
}

/**
 * Formats a phone number in the specified format
 *
 * @param phoneNumber - The phone number string to format
 * @param format - The desired format ('international', 'national', 'e164')
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns The formatted phone number or the original if invalid
 *
 * @example
 * const formatted = formatPhone('01712345678', 'international', 'BD');
 * // '+8801712345678'
 */
export function formatPhone(
  phoneNumber: string,
  format: PhoneFormat = 'international',
  countryCode: string = 'BD'
): string {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return phoneNumber;
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode);

    if (!parsed || !parsed.isValid()) {
      return phoneNumber;
    }

    if (format === 'international') {
      return parsed.formatInternational();
    } else if (format === 'national') {
      return parsed.formatNational();
    } else if (format === 'e164') {
      return parsed.format('E.164');
    }

    return parsed.formatInternational();
  } catch {
    return phoneNumber;
  }
}

/**
 * Formats a phone number in international format
 *
 * @param phoneNumber - The phone number string to format
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns The international formatted phone number
 *
 * @example
 * const formatted = formatInternational('01712345678', 'BD');
 * // '+8801712345678'
 */
export function formatInternational(phoneNumber: string, countryCode: string = 'BD'): string {
  return formatPhone(phoneNumber, 'international', countryCode);
}

/**
 * Formats a phone number in national format
 *
 * @param phoneNumber - The phone number string to format
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns The national formatted phone number
 *
 * @example
 * const formatted = formatNational('01712345678', 'BD');
 * // '01712345678'
 */
export function formatNational(phoneNumber: string, countryCode: string = 'BD'): string {
  return formatPhone(phoneNumber, 'national', countryCode);
}

/**
 * Normalizes a phone number to E.164 format
 *
 * @param phoneNumber - The phone number string to normalize
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns The E.164 formatted phone number
 *
 * @example
 * const normalized = normalizePhone('01712345678', 'BD');
 * // '+8801712345678'
 */
export function normalizePhone(phoneNumber: string, countryCode: string = 'BD'): string {
  return formatPhone(phoneNumber, 'e164', countryCode);
}

/**
 * Detects the mobile network operator for a Bangladeshi phone number
 *
 * @param nationalNumber - The national phone number (without country code)
 * @returns The detected operator name
 *
 * @example
 * const operator = detectBDOperator('01712345678');
 * // 'Grameenphone'
 */
export function detectBDOperator(nationalNumber: string): BDPhoneOperator {
  if (!nationalNumber || typeof nationalNumber !== 'string') {
    return 'Unknown';
  }

  // Remove any non-digit characters
  const cleaned = nationalNumber.replace(/\D/g, '');

  // Check if it starts with '01' (Bangladeshi mobile prefix)
  if (!cleaned.startsWith('01')) {
    return 'Unknown';
  }

  // Extract the operator code (first 3 digits after '0')
  const code = cleaned.substring(0, 3);

  switch (code) {
    case '017':
      return 'Grameenphone';
    case '018':
      return 'Robi';
    case '019':
      return 'Banglalink';
    case '015':
      return 'Teletalk';
    default:
      // Check for other operator codes
      if (['013', '014'].includes(code)) {
        return 'Grameenphone';
      } else if (['016', '017'].includes(code)) {
        return 'Grameenphone';
      } else if (['018'].includes(code)) {
        return 'Robi';
      } else if (['019'].includes(code)) {
        return 'Banglalink';
      } else if (['015'].includes(code)) {
        return 'Teletalk';
      }
      return 'Unknown';
  }
}

/**
 * Checks if a phone number is a mobile number
 *
 * @param phoneNumber - The phone number string to check
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns `true` if the number is a mobile number, `false` otherwise
 *
 * @example
 * const isMobile = isMobilePhone('01712345678', 'BD');
 * // true
 */
export function isMobilePhone(phoneNumber: string, countryCode: string = 'BD'): boolean {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode);
    return parsed ? parsed.getType() === 'MOBILE' : false;
  } catch {
    return false;
  }
}

/**
 * Checks if a phone number is a fixed line
 *
 * @param phoneNumber - The phone number string to check
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns `true` if the number is a fixed line, `false` otherwise
 *
 * @example
 * const isFixed = isFixedLinePhone('02-1234567', 'BD');
 * // true
 */
export function isFixedLinePhone(phoneNumber: string, countryCode: string = 'BD'): boolean {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode);
    return parsed ? parsed.getType() === 'FIXED_LINE' : false;
  } catch {
    return false;
  }
}

/**
 * Gets the country calling code for a phone number
 *
 * @param phoneNumber - The phone number string
 * @param countryCode - The ISO country code (default: 'BD' for Bangladesh)
 * @returns The country calling code or `null` if invalid
 *
 * @example
 * const code = getCountryCallingCodeFromPhone('01712345678', 'BD');
 * // '880'
 */
export function getCountryCallingCodeFromPhone(
  phoneNumber: string,
  countryCode: string = 'BD'
): string | null {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return null;
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode);
    if (!parsed || !parsed.isValid()) {
      return null;
    }
    return getCountryCallingCode(parsed.country || countryCode);
  } catch {
    return null;
  }
}
