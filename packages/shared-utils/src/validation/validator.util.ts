/**
 * Validator Utilities - Reusable validation helpers
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/validation/validator.util
 *
 * RULES:
 * ✅ ONLY validation helpers - NO business logic
 * ✅ NO schema validation (use shared-schemas)
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import validator from 'validator';
// ✅ FIXED: Correct package name
import {
  REGEX_ALPHANUMERIC,
  REGEX_NUMERIC,
  REGEX_UUID,
  PASSWORD_POLICY,
  COMMON_PASSWORDS,
} from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// UUID regex (RFC 4122) - with fallbacks
// ✅ FIXED: Add fallbacks for missing constants
const UUID_REGEX = REGEX_UUID?.STANDARD || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const UUID_V4_REGEX = REGEX_UUID?.V4 || /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// String format regexes
const HEX_REGEX = /^[0-9a-f]+$/i;
const BASE64_REGEX = /^[A-Za-z0-9+/]+={0,2}$/;
const ALPHANUMERIC_REGEX = REGEX_ALPHANUMERIC || /^[a-zA-Z0-9]+$/;
const ALPHABETIC_REGEX = /^[a-zA-Z]+$/;
const NUMERIC_REGEX = REGEX_NUMERIC || /^\d+$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const OBJECT_ID_REGEX = /^[0-9a-f]{24}$/i;

// Password strength thresholds (from constants)
const PASSWORD_MIN_LENGTH = PASSWORD_POLICY?.MIN_LENGTH || 8;
// ✅ FIXED: Add fallback for STRONG_LENGTH
const PASSWORD_STRONG_LENGTH = PASSWORD_POLICY?.STRONG_LENGTH || 12;

// Common weak passwords (from constants)
const COMMON_WEAK_PASSWORDS = COMMON_PASSWORDS || [
  'password', '123456', 'qwerty', 'admin', 'welcome',
  'bangladesh', 'dhaka', 'vubon', '12345678',
];

// ==================== Private Helpers ====================

/**
 * Safely get string value
 */
const getString = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

// ==================== UUID Validation ====================

/**
 * Check if string is a valid UUID (any version)
 *
 * @param value - String to check
 * @returns True if valid UUID
 *
 * @example
 * isUuid('123e4567-e89b-12d3-a456-426614174000') // true
 */
export const isUuid = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return UUID_REGEX.test(value);
};

/**
 * Check if string is a valid UUID v4
 *
 * @param value - String to check
 * @returns True if valid UUID v4
 */
export const isUuidV4 = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return UUID_V4_REGEX.test(value);
};

/**
 * Check if string is a valid MongoDB ObjectId
 *
 * @param value - String to check
 * @returns True if valid ObjectId
 */
export const isObjectId = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return OBJECT_ID_REGEX.test(value);
};

// ==================== String Validation ====================

/**
 * Check if string is alphanumeric (letters and numbers only)
 *
 * @param value - String to check
 * @returns True if alphanumeric
 */
export const isAlphanumeric = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return ALPHANUMERIC_REGEX.test(value);
};

/**
 * Check if string is alphabetic (letters only)
 *
 * @param value - String to check
 * @returns True if alphabetic
 */
export const isAlphabetic = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return ALPHABETIC_REGEX.test(value);
};

/**
 * Check if string is numeric (digits only)
 *
 * @param value - String to check
 * @returns True if numeric
 */
export const isNumericString = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return NUMERIC_REGEX.test(value);
};

/**
 * Check if string is hexadecimal
 *
 * @param value - String to check
 * @returns True if hexadecimal
 */
export const isHex = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return HEX_REGEX.test(value);
};

/**
 * Check if string is base64 encoded
 *
 * @param value - String to check
 * @returns True if valid base64
 */
export const isBase64 = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return BASE64_REGEX.test(value) && validator.isBase64(value);
};

/**
 * Check if string is valid JSON
 *
 * @param value - String to check
 * @returns True if valid JSON
 */
export const isJson = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is valid slug format
 *
 * @param value - String to check
 * @returns True if valid slug
 *
 * @example
 * isValidSlug('my-article-title') // true
 * isValidSlug('My Article Title') // false
 */
export const isValidSlug = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return SLUG_REGEX.test(value);
};

/**
 * Check if string is valid domain name
 *
 * @param value - String to check
 * @returns True if valid domain
 */
export const isValidDomain = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return validator.isFQDN(value);
};

/**
 * Check if string is valid URL
 *
 * @param value - String to check
 * @returns True if valid URL
 */
export const isValidUrl = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return validator.isURL(value);
};

/**
 * Check if string is valid IP address (v4 or v6)
 *
 * @param value - String to check
 * @returns True if valid IP
 */
export const isValidIp = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return validator.isIP(value);
};

/**
 * Check if string is valid IP v4
 *
 * @param value - String to check
 * @returns True if valid IPv4
 */
export const isValidIpV4 = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return validator.isIP(value, 4);
};

/**
 * Check if string is valid IP v6
 *
 * @param value - String to check
 * @returns True if valid IPv6
 */
export const isValidIpV6 = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return validator.isIP(value, 6);
};

// ==================== Number Validation ====================

/**
 * Check if value is a valid finite number
 *
 * @param value - Value to check
 * @returns True if valid number
 */
export const isValidNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Check if value is an integer
 *
 * @param value - Value to check
 * @returns True if integer
 */
export const isInteger = (value: unknown): boolean => {
  return Number.isInteger(value);
};

/**
 * Check if value is a positive integer
 *
 * @param value - Value to check
 * @returns True if positive integer
 */
export const isPositiveInteger = (value: unknown): boolean => {
  return isInteger(value) && (value as number) > 0;
};

/**
 * Check if value is a non-negative integer
 *
 * @param value - Value to check
 * @returns True if non-negative integer
 */
export const isNonNegativeInteger = (value: unknown): boolean => {
  return isInteger(value) && (value as number) >= 0;
};

/**
 * Check if value is within range (inclusive)
 *
 * @param value - Number to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return isValidNumber(value) && value >= min && value <= max;
};

// ==================== Boolean Validation ====================

/**
 * Parse string or any value to boolean
 *
 * @param value - Value to parse
 * @returns Boolean value
 *
 * @example
 * parseBoolean('true') // true
 * parseBoolean('false') // false
 * parseBoolean('1') // true
 * parseBoolean(1) // true
 */
export const parseBoolean = (value: string | boolean | null | undefined): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
};

/**
 * Convert boolean to string
 *
 * @param value - Boolean value
 * @returns 'true' or 'false'
 */
export const toBooleanString = (value: boolean): string => {
  return value ? 'true' : 'false';
};

// ==================== Type Guards ====================

/**
 * Check if value is an object (not null, not array)
 *
 * @param value - Value to check
 * @returns True if plain object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Check if value is a non-empty object
 *
 * @param value - Value to check
 * @returns True if non-empty object
 */
export const isNonEmptyObject = (value: unknown): boolean => {
  return isObject(value) && Object.keys(value).length > 0;
};

/**
 * Check if array is non-empty
 *
 * @param value - Array to check
 * @returns True if non-empty array
 */
export const isNonEmptyArray = <T>(value: T[] | null | undefined): value is T[] => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * Check if string is null, undefined, or empty/whitespace only
 *
 * @param value - String to check
 * @returns True if blank
 */
export const isBlank = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value !== 'string') return true;
  return value.trim().length === 0;
};

/**
 * Check if string is not blank
 *
 * @param value - String to check
 * @returns True if not blank
 */
export const isNotBlank = (value: string | null | undefined): boolean => {
  return !isBlank(value);
};

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 *
 * @param value - Value to check
 * @returns True if empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if value is not empty
 *
 * @param value - Value to check
 * @returns True if not empty
 */
export const isNotEmpty = (value: unknown): boolean => {
  return !isEmpty(value);
};

// ==================== Password Strength ====================

/**
 * Check if password meets minimum requirements
 *
 * @param password - Password to check
 * @returns True if password meets minimum requirements
 */
export const isPasswordMinimal = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  if (password.length < PASSWORD_MIN_LENGTH) return false;

  // Check for common weak passwords
  if (COMMON_WEAK_PASSWORDS.includes(password.toLowerCase())) return false;

  return true;
};

/**
 * Check if password is strong
 *
 * @param password - Password to check
 * @returns True if strong password
 */
export const isPasswordStrong = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  if (password.length < PASSWORD_STRONG_LENGTH) return false;
  if (COMMON_WEAK_PASSWORDS.includes(password.toLowerCase())) return false;

  // Must contain uppercase, lowercase, number, and special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecial;
};

// ==================== Validation Result ====================

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  data?: Record<string, unknown>;
}

/**
 * Create a validation result object
 *
 * @param isValid - Whether validation passed
 * @param errors - Optional error messages
 * @returns ValidationResult object
 */
export const createValidationResult = (
  isValid: boolean,
  errors?: string[]
): ValidationResult => {
  return {
    isValid,
    ...(errors && errors.length > 0 ? { errors } : {}),
  };
};

// ==================== Type Exports ====================

export type { ValidationResult };
