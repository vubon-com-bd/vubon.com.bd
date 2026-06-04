/**
 * Phone Utilities - Phone number parsing and formatting
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/validation/phone.util
 *
 * RULES:
 * ✅ ONLY phone number parsing, formatting, validation - NO business logic
 * ✅ NO SMS sending, telecom API calls
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ Bangladesh-focused with libphonenumber-js
 */

import {
  parsePhoneNumber,
  AsYouType,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  PhoneNumber,
  CountryCode,
} from 'libphonenumber-js';
// ✅ FIXED: Correct package name
import { PHONE_CONFIG } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// ✅ FIXED: Add fallbacks for missing constants
export const DEFAULT_COUNTRY = PHONE_CONFIG?.DEFAULT_COUNTRY || 'BD';
export const DEFAULT_COUNTRY_CODE = PHONE_CONFIG?.DEFAULT_COUNTRY_CODE || '+880';

// Bangladesh mobile operators (with fallback)
export const BD_MOBILE_OPERATORS = PHONE_CONFIG?.BD_MOBILE_OPERATORS || {
  GP: { prefix: '017', name: 'Grameenphone', regex: /^017\d{8}$/ },
  ROB: { prefix: '018', name: 'Robi', regex: /^018\d{8}$/ },
  BL: { prefix: '019', name: 'Banglalink', regex: /^019\d{8}$/ },
  TT: { prefix: '015', name: 'Teletalk', regex: /^015\d{8}$/ },
  AIR: { prefix: '016', name: 'Airtel', regex: /^016\d{8}$/ },
};

// Bangladesh mobile number regex patterns (with fallback)
export const BD_MOBILE_REGEX = PHONE_CONFIG?.BD_MOBILE_REGEX || /^(?:\+880|0)1[3-9]\d{8}$/;
export const BD_MOBILE_STRICT_REGEX = PHONE_CONFIG?.BD_MOBILE_STRICT_REGEX || /^(?:\+880|0)1(?:3|4|5|6|7|8|9)\d{8}$/;

// Supported countries (including Bangladesh focus)
export const SUPPORTED_COUNTRIES = PHONE_CONFIG?.SUPPORTED_COUNTRIES || ['BD', 'US', 'GB', 'IN', 'AE', 'SG', 'CA', 'AU'];
export type SupportedCountry = typeof SUPPORTED_COUNTRIES[number];

// Phone number types
export type PhoneNumberType = 'mobile' | 'landline' | 'toll_free' | 'premium_rate' | 'shared_cost' | 'voip' | 'personal_number' | 'pager' | 'uan' | 'voicemail' | 'unknown';

// ==================== Private Helpers ====================

/**
 * Safe parse phone number (returns undefined instead of throwing)
 */
const safeParsePhone = (phoneNumber: string, countryCode?: CountryCode): PhoneNumber | undefined => {
  try {
    return parsePhoneNumber(phoneNumber, countryCode);
  } catch {
    return undefined;
  }
};

/**
 * Validate input phone number
 */
const validatePhoneInput = (phoneNumber: string): void => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    throw new Error('Phone number is required');
  }
};

/**
 * Convert string to CountryCode safely
 */
const toCountryCode = (code: string): CountryCode | undefined => {
  const validCodes: CountryCode[] = ['BD', 'US', 'GB', 'IN', 'AE', 'SG', 'CA', 'AU', 'PK', 'NP', 'MY', 'TH'];
  return validCodes.includes(code as CountryCode) ? (code as CountryCode) : undefined;
};

// ==================== Parsing ====================

/**
 * Parse phone number to PhoneNumber object
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns PhoneNumber object or undefined if invalid
 */
export const parsePhone = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): PhoneNumber | undefined => {
  validatePhoneInput(phoneNumber);
  const cc = toCountryCode(countryCode);
  return safeParsePhone(phoneNumber, cc);
};

/**
 * Check if phone number is valid (full validation)
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns True if phone number is valid
 */
export const isValidPhone = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): boolean => {
  if (!phoneNumber) return false;
  try {
    const cc = toCountryCode(countryCode);
    return isValidPhoneNumber(phoneNumber, cc);
  } catch {
    return false;
  }
};

/**
 * Check if phone number is possible (basic format validation, faster)
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns True if phone number is possible
 */
export const isPossiblePhone = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): boolean => {
  if (!phoneNumber) return false;
  try {
    const cc = toCountryCode(countryCode);
    return isPossiblePhoneNumber(phoneNumber, cc);
  } catch {
    return false;
  }
};

/**
 * Check if phone number is a valid Bangladesh mobile number
 *
 * @param phoneNumber - Phone number string
 * @returns True if valid Bangladesh mobile number
 */
export const isValidBdMobile = (phoneNumber: string): boolean => {
  return BD_MOBILE_REGEX.test(phoneNumber) && isValidPhone(phoneNumber, 'BD');
};

/**
 * Get phone number type (mobile, landline, etc.)
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns Phone number type or 'unknown'
 */
export const getPhoneNumberType = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): PhoneNumberType => {
  const parsed = parsePhone(phoneNumber, countryCode);
  if (!parsed) return 'unknown';

  const type = parsed.getType();
  return (type?.toLowerCase() as PhoneNumberType) || 'unknown';
};

/**
 * Detect Bangladesh mobile operator from phone number
 *
 * @param phoneNumber - Bangladesh phone number
 * @returns Operator name or null
 */
export const detectBdOperator = (phoneNumber: string): string | null => {
  const normalized = normalizePhone(phoneNumber, 'BD');
  if (!normalized) return null;

  // Remove +880 prefix, keep last 10 digits
  const national = normalized.replace(/^\+880/, '');

  // ✅ FIXED: Use Object.values() instead of Object.entries() to avoid unused variable
  for (const operator of Object.values(BD_MOBILE_OPERATORS)) {
    if (operator.regex.test(national)) {
      return operator.name;
    }
  }

  return null;
};

// ==================== Formatting ====================

/**
 * Format phone number to E.164 format (international standard)
 * Example: +8801712345678
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns E.164 formatted number or null
 */
export const formatToE164 = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  const parsed = parsePhone(phoneNumber, countryCode);
  return parsed?.format('E.164') ?? null;
};

/**
 * Format phone number to international format
 * Example: +880 1712 345678
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns Internationally formatted number or null
 */
export const formatInternational = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  const parsed = parsePhone(phoneNumber, countryCode);
  if (!parsed) return null;
  return parsed.formatInternational();
};

/**
 * Format phone number to national format
 * Example: 01712 345678
 *
 * @param phoneNumber - Phone number string
 * @param countryCode - Optional country code (default: 'BD')
 * @returns Nationally formatted number or null
 */
export const formatNational = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  const parsed = parsePhone(phoneNumber, countryCode);
  if (!parsed) return null;
  return parsed.formatNational();
};

/**
 * Format phone number as you type (progressive formatting)
 *
 * @param phoneNumber - Phone number string (partial)
 * @param countryCode - Optional country code (default: 'BD')
 * @returns Formatted string as you type
 */
export const formatAsYouType = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string => {
  const formatter = new AsYouType(countryCode);
  return formatter.input(phoneNumber);
};

// ==================== Normalization ====================

/**
 * Normalize phone number to consistent E.164 format
 */
export const normalizePhone = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  return formatToE164(phoneNumber, countryCode);
};

/**
 * Normalize Bangladesh phone number to +880 format
 */
export const normalizeBdPhone = (phoneNumber: string): string | null => {
  const normalized = normalizePhone(phoneNumber, 'BD');
  if (normalized && normalized.startsWith('+880')) {
    return normalized;
  }
  return null;
};

/**
 * Convert +880 format to 0 format (local dialing)
 * Example: +8801712345678 -> 01712345678
 */
export const toLocalFormat = (phoneNumber: string): string | null => {
  const normalized = normalizePhone(phoneNumber, 'BD');
  if (!normalized) return null;
  return normalized.replace(/^\+880/, '0');
};

// ==================== Extraction ====================

/**
 * Extract country code from phone number
 */
export const extractCountryCode = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  const parsed = parsePhone(phoneNumber, countryCode);
  if (!parsed) return null;
  return `+${parsed.countryCallingCode}`;
};

/**
 * Extract national number (without country code)
 */
export const extractNationalNumber = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string | null => {
  const parsed = parsePhone(phoneNumber, countryCode);
  return parsed?.nationalNumber?.toString() ?? null;
};

// ==================== Masking ====================

/**
 * Mask phone number for privacy
 * Example: +880 *****5678
 */
export const maskPhone = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): string => {
  const normalized = normalizePhone(phoneNumber, countryCode);
  if (!normalized) return phoneNumber;

  const length = normalized.length;
  const visibleStart = 6;
  const visibleEnd = 4;

  if (length <= visibleStart + visibleEnd) {
    return normalized;
  }

  const start = normalized.slice(0, visibleStart);
  const end = normalized.slice(-visibleEnd);
  const maskedLength = length - visibleStart - visibleEnd;

  return `${start}${'*'.repeat(maskedLength)}${end}`;
};

/**
 * Mask Bangladesh phone number (specialized)
 */
export const maskBdPhone = (phoneNumber: string): string => {
  const normalized = normalizeBdPhone(phoneNumber);
  if (!normalized) return phoneNumber;
  const start = normalized.slice(0, 4);
  const end = normalized.slice(-4);
  return `${start}*****${end}`;
};

// ==================== Country Detection ====================

/**
 * Detect country code from phone number
 */
export const detectCountry = (phoneNumber: string): string | null => {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed?.country ?? null;
  } catch {
    return null;
  }
};

export const getPhoneCountry = detectCountry;

// ==================== Component Extraction ====================

/**
 * Phone components interface
 */
export interface PhoneComponents {
  countryCode: string | null;
  nationalNumber: string | null;
  e164: string | null;
  international: string | null;
  national: string | null;
  isValid: boolean;
  isMobile: boolean;
  operator: string | null;
  phoneType: PhoneNumberType;
  isBangladesh: boolean;
}

/**
 * Extract all phone components into an object
 */
export const getPhoneComponents = (phoneNumber: string, countryCode: string = DEFAULT_COUNTRY): PhoneComponents => {
  const isValid = isValidPhone(phoneNumber, countryCode);
  const parsed = parsePhone(phoneNumber, countryCode);

  if (!parsed && !isValid) {
    return {
      countryCode: null,
      nationalNumber: null,
      e164: null,
      international: null,
      national: null,
      isValid: false,
      isMobile: false,
      operator: null,
      phoneType: 'unknown',
      isBangladesh: false,
    };
  }

  const e164 = formatToE164(phoneNumber, countryCode);
  const isMobile = e164 ? getPhoneNumberType(e164) === 'mobile' : false;
  const operator = e164 && e164.startsWith('+880') ? detectBdOperator(e164) : null;
  const isBangladesh = e164?.startsWith('+880') ?? false;

  return {
    countryCode: extractCountryCode(phoneNumber, countryCode),
    nationalNumber: extractNationalNumber(phoneNumber, countryCode),
    e164,
    international: formatInternational(phoneNumber, countryCode),
    national: formatNational(phoneNumber, countryCode),
    isValid: true,
    isMobile,
    operator,
    phoneType: getPhoneNumberType(phoneNumber, countryCode),
    isBangladesh,
  };
};

// ==================== Type Exports ====================

// ✅ FIXED: Export types (interfaces already exported above)
export type { PhoneComponents, PhoneNumber, CountryCode };
