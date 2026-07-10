/**
 * Formatter Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/formatter/index
 *
 * @description
 * Central export point for all formatter utilities.
 * Includes currency, date, number, and string formatting functions.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Currency Utilities (currency.util.ts)
// ============================================================
export {
  // Core formatting
  formatCurrency,
  formatCompactCurrency,
  formatNumber as formatCurrencyNumber,
  formatBDT,

  // Currency info
  getCurrencySymbol,
  getCurrencyInfo,
  getSupportedCurrencies,
  isCurrencySupported,

  // Conversion & calculation
  convertCurrency,
  applyDiscount,
  calculateDiscount,
  calculateTaxInclusive,
  calculateTaxAmount,

  // Percentage formatting
  formatPercentage as formatCurrencyPercentage,

  // Constants
  DEFAULT_CURRENCY,
} from './currency.util';

export type {
  CurrencyCode,
  CurrencyInfo,
} from './currency.util';

// ============================================================
// Date Utilities (date.util.ts)
// ============================================================
export {
  // Core formatting
  formatDate,
  formatTime,
  formatDateTime,
  formatDisplayDate,
  formatDisplayDateTime,
  formatToISO,
  formatRelativeTime,
  formatRelativeDate,

  // Parsing
  parseDate,
  safeDate,

  // Validation
  isValidDate,
  isPastDate,
  isFutureDate,
  isDateToday,
  isDateYesterday,
  isDateTomorrow,
  isDateThisWeek,
  isDateThisMonth,
  isDateThisYear,

  // Difference calculations
  diffDays,
  diffHours,
  diffMinutes,
  diffSeconds,
  diffMonths,
  diffYears,

  // Date boundaries
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,

  // Age calculation
  calculateAge,
  isWithinAgeRange,

  // Constants
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DISPLAY_DATE_FORMAT,
  DEFAULT_DISPLAY_DATETIME_FORMAT,
  DEFAULT_TIMEZONE,
} from './date.util';

export type {
  DateFormatString,
  DateFormatType,
} from './date.util';

// ============================================================
// Number Utilities (number.util.ts)
// ============================================================
export {
  // Core formatting
  formatNumber,
  formatWithCommas,
  formatWithCommasBD,
  formatCompact,
  formatNumberWithOptions,

  // Rounding
  round,
  floor,
  ceil,

  // Percentage
  calculatePercentage,
  calculateValueFromPercentage,
  formatPercentage as formatNumberPercentage,
  getPercentageResult,

  // Random (non-cryptographic)
  randomInt,
  randomFloat,

  // Validation & comparison
  isInRange,
  clamp,
  isInteger,
  isPositive,
  isNegative,
  isZero,

  // Aggregation
  max,
  min,
  sum,
  average,

  // Constants
  NUMBER_CONFIG_EXPORTS,
} from './number.util';

export type {
  NumberFormat,
  PercentageResult,
} from './number.util';

// ============================================================
// String Utilities (string.util.ts)
// ============================================================
export {
  // Slug and case conversion
  slugify,
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  toConstantCase,
  toDotCase,
  toPathCase,

  // Capitalization
  capitalize,
  capitalizeWords,
  toTitleCase,
  toSentenceCase,

  // Truncation
  truncate,
  truncateWords,

  // Masking
  maskString,
  maskEmail,
  maskPhone,

  // Additional helpers
  reverse,
  isBlank,
  isNotBlank,
} from './string.util';

export type {
  CaseFormat,
} from './string.util';

// ============================================================
// Cross-Utility Type Re-exports (For convenience)
// ============================================================
export type {
  // Currency & Number combined
  CurrencyCode as FormatterCurrencyCode,
  CurrencyInfo as FormatterCurrencyInfo,
  NumberFormat as FormatterNumberFormat,
  PercentageResult as FormatterPercentageResult,

  // Date & String combined
  DateFormatString as FormatterDateFormat,
  CaseFormat as FormatterCaseFormat,
} from './currency.util';
