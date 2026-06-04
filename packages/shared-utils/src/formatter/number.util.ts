/**
 * Number Utilities - Number formatting and calculations
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/formatter/number.util
 *
 * RULES:
 * ✅ ONLY number formatting and helper calculations - NO business logic
 * ✅ NO financial transaction logic, business calculations
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

// ✅ FIXED: Correct package name
import { NUMBER_CONFIG } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// ✅ FIXED: Add fallbacks for missing constants
const DEFAULT_DECIMAL_PLACES = NUMBER_CONFIG?.DEFAULT_DECIMAL_PLACES || 2;
const DEFAULT_ROUNDING_PRECISION = NUMBER_CONFIG?.DEFAULT_ROUNDING_PRECISION || 2;
const DEFAULT_PERCENTAGE_DECIMALS = NUMBER_CONFIG?.DEFAULT_PERCENTAGE_DECIMALS || 1;
const MAX_DECIMAL_PLACES = NUMBER_CONFIG?.MAX_DECIMAL_PLACES || 10;

// Unit suffixes for compact formatting (from constants with fallback)
const UNIT_SUFFIXES = NUMBER_CONFIG?.UNIT_SUFFIXES || [
  { value: 1e3, suffix: 'K' },
  { value: 1e6, suffix: 'M' },
  { value: 1e9, suffix: 'B' },
  { value: 1e12, suffix: 'T' },
];

// Number format styles (from constants with fallback)
const NUMBER_FORMATS = NUMBER_CONFIG?.NUMBER_FORMATS || {
  STANDARD: 'standard',
  COMMA: 'comma',
  COMPACT: 'compact',
  SCIENTIFIC: 'scientific',
};

export type NumberFormat = typeof NUMBER_FORMATS[keyof typeof NUMBER_FORMATS];

// ==================== Private Helpers ====================

/**
 * Validate number is valid
 */
const validateNumber = (value: number): number => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return value;
};

/**
 * Validate range parameters
 */
const validateRange = (min: number, max: number): void => {
  if (min > max) {
    throw new Error(`Invalid range: min (${min}) > max (${max})`);
  }
};

// ==================== Formatting ====================

/**
 * Format number with fixed decimal places
 *
 * @param value - Number to format
 * @param decimalPlaces - Number of decimal places (default from constants)
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234.5678, 2) // '1234.57'
 * formatNumber(1234, 0) // '1234'
 */
export const formatNumber = (
  value: number,
  decimalPlaces: number = DEFAULT_DECIMAL_PLACES
): string => {
  const validValue = validateNumber(value);
  const validDecimals = Math.max(0, Math.min(decimalPlaces, MAX_DECIMAL_PLACES));
  return validValue.toFixed(validDecimals);
};

/**
 * Format number with thousand separators (commas)
 *
 * @param value - Number to format
 * @returns Formatted number string with commas
 *
 * @example
 * formatWithCommas(1234567.89) // '1,234,567.89'
 * formatWithCommas(1000000) // '1,000,000'
 */
export const formatWithCommas = (value: number): string => {
  const validValue = validateNumber(value);
  return new Intl.NumberFormat('en-US').format(validValue);
};

/**
 * Format number with thousand separators (Bangladesh format - using commas)
 *
 * @param value - Number to format
 * @returns Formatted number string with commas
 *
 * @example
 * formatWithCommasBD(1234567.89) // '12,34,567.89' (BD style)
 */
export const formatWithCommasBD = (value: number): string => {
  const validValue = validateNumber(value);

  // Split integer and decimal parts
  const parts = validValue.toString().split('.');
  // ✅ FIXED: Ensure integerPart has a default value
  let integerPart = parts[0] || '0';
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Format integer part with BD style (last 3 digits, then groups of 2)
  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  if (otherDigits !== '') {
    integerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  } else {
    integerPart = lastThree;
  }

  return integerPart + decimalPart;
};

/**
 * Format number as compact (e.g., 1.2K, 1.2M, 1.2B)
 *
 * @param value - Number to format
 * @param decimalPlaces - Decimal places for compact value (default: 1)
 * @returns Compact formatted string
 *
 * @example
 * formatCompact(1234567) // '1.2M'
 * formatCompact(1500) // '1.5K'
 */
export const formatCompact = (value: number, decimalPlaces: number = 1): string => {
  const validValue = validateNumber(value);
  const absValue = Math.abs(validValue);

  if (absValue < 1000) {
    return validValue.toString();
  }

  for (const suffix of UNIT_SUFFIXES) {
    if (absValue >= suffix.value) {
      const formatted = (validValue / suffix.value).toFixed(decimalPlaces);
      return `${formatted}${suffix.suffix}`;
    }
  }

  return validValue.toString();
};

/**
 * Format number with custom Intl.NumberFormat options
 *
 * @param value - Number to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export const formatNumberWithOptions = (
  value: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  const validValue = validateNumber(value);
  return new Intl.NumberFormat('en-US', options).format(validValue);
};

// ==================== Rounding ====================

/**
 * Round number to specified decimal places (standard rounding)
 *
 * @param value - Number to round
 * @param precision - Decimal places to round to (default from constants)
 * @returns Rounded number
 *
 * @example
 * round(1234.5678, 2) // 1234.57
 * round(1234.5678, 0) // 1235
 */
export const round = (value: number, precision: number = DEFAULT_ROUNDING_PRECISION): number => {
  const validValue = validateNumber(value);
  const validPrecision = Math.max(0, Math.min(precision, MAX_DECIMAL_PLACES));
  const factor = Math.pow(10, validPrecision);
  return Math.round(validValue * factor) / factor;
};

/**
 * Round down (floor) to specified decimal places
 *
 * @param value - Number to floor
 * @param precision - Decimal places (default from constants)
 * @returns Floored number
 */
export const floor = (value: number, precision: number = DEFAULT_ROUNDING_PRECISION): number => {
  const validValue = validateNumber(value);
  const validPrecision = Math.max(0, Math.min(precision, MAX_DECIMAL_PLACES));
  const factor = Math.pow(10, validPrecision);
  return Math.floor(validValue * factor) / factor;
};

/**
 * Round up (ceil) to specified decimal places
 *
 * @param value - Number to ceil
 * @param precision - Decimal places (default from constants)
 * @returns Ceiled number
 */
export const ceil = (value: number, precision: number = DEFAULT_ROUNDING_PRECISION): number => {
  const validValue = validateNumber(value);
  const validPrecision = Math.max(0, Math.min(precision, MAX_DECIMAL_PLACES));
  const factor = Math.pow(10, validPrecision);
  return Math.ceil(validValue * factor) / factor;
};

// ==================== Percentage ====================

/**
 * Calculate percentage value
 *
 * @param value - Part value
 * @param total - Total value
 * @returns Percentage (0-100)
 *
 * @example
 * calculatePercentage(25, 100) // 25
 * calculatePercentage(30, 200) // 15
 */
export const calculatePercentage = (value: number, total: number): number => {
  const validValue = validateNumber(value);
  const validTotal = validateNumber(total);

  if (validTotal === 0) return 0;

  return (validValue / validTotal) * 100;
};

/**
 * Calculate value from percentage
 *
 * @param percentage - Percentage value
 * @param total - Total value
 * @returns Calculated value
 */
export const calculateValueFromPercentage = (percentage: number, total: number): number => {
  const validPercentage = validateNumber(percentage);
  const validTotal = validateNumber(total);

  return (validPercentage / 100) * validTotal;
};

/**
 * Format number as percentage
 *
 * @param value - Part value
 * @param total - Total value
 * @param decimalPlaces - Decimal places for percentage (default from constants)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(25, 100) // '25.0%'
 * formatPercentage(30, 200, 0) // '15%'
 */
export const formatPercentage = (
  value: number,
  total: number,
  decimalPlaces: number = DEFAULT_PERCENTAGE_DECIMALS
): string => {
  const percentage = calculatePercentage(value, total);
  const formatted = percentage.toFixed(decimalPlaces);
  return `${formatted}%`;
};

/**
 * Get percentage result with additional data
 *
 * @param value - Part value
 * @param total - Total value
 * @returns Percentage result object
 */
export const getPercentageResult = (
  value: number,
  total: number,
  decimalPlaces: number = DEFAULT_PERCENTAGE_DECIMALS
): PercentageResult => {
  const percentage = calculatePercentage(value, total);
  const formatted = formatPercentage(value, total, decimalPlaces);

  return {
    value: percentage,
    formatted,
    percentage,
  };
};

// ==================== Random Numbers ====================

/**
 * Generate random integer between min and max (inclusive)
 * WARNING: Not cryptographically secure - use random.util.ts for security
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer
 *
 * @example
 * randomInt(1, 10) // Returns between 1 and 10
 */
export const randomInt = (min: number, max: number): number => {
  validateRange(min, max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate random float between min and max
 * WARNING: Not cryptographically secure
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random float
 */
export const randomFloat = (min: number, max: number): number => {
  validateRange(min, max);
  return Math.random() * (max - min) + min;
};

// ==================== Validation ====================

/**
 * Check if number is within range (inclusive)
 *
 * @param value - Number to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  const validValue = validateNumber(value);
  return validValue >= min && validValue <= max;
};

/**
 * Clamp number between min and max
 *
 * @param value - Number to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped number
 *
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-10, 0, 100) // 0
 */
export const clamp = (value: number, min: number, max: number): number => {
  const validValue = validateNumber(value);
  return Math.min(Math.max(validValue, min), max);
};

/**
 * Check if number is integer
 */
export const isInteger = (value: number): boolean => {
  return Number.isInteger(value);
};

/**
 * Check if number is positive
 */
export const isPositive = (value: number): boolean => {
  return value > 0;
};

/**
 * Check if number is negative
 */
export const isNegative = (value: number): boolean => {
  return value < 0;
};

/**
 * Check if number is zero
 */
export const isZero = (value: number): boolean => {
  return value === 0;
};

// ==================== Comparison ====================

/**
 * Get the maximum of an array of numbers
 */
export const max = (values: number[]): number => {
  if (values.length === 0) return 0;
  return Math.max(...values);
};

/**
 * Get the minimum of an array of numbers
 */
export const min = (values: number[]): number => {
  if (values.length === 0) return 0;
  return Math.min(...values);
};

/**
 * Get sum of an array of numbers
 */
export const sum = (values: number[]): number => {
  return values.reduce((acc, val) => acc + val, 0);
};

/**
 * Get average (mean) of an array of numbers
 */
export const average = (values: number[]): number => {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
};

// ==================== Type Exports ====================

export interface PercentageResult {
  value: number;
  formatted: string;
  percentage: number;
}

export const NUMBER_CONFIG_EXPORTS = {
  DEFAULT_DECIMAL_PLACES,
  DEFAULT_ROUNDING_PRECISION,
  DEFAULT_PERCENTAGE_DECIMALS,
  MAX_DECIMAL_PLACES,
  UNIT_SUFFIXES,
  NUMBER_FORMATS,
};
