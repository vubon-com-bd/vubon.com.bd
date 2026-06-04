/**
 * Formatter Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/formatter/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure utility exports only
 */

// ============================================================
// Date Formatting Utilities
// ============================================================
export * from './date.util';

// ============================================================
// Currency Formatting Utilities
// ============================================================
export {
  formatCurrency,
  formatCompactCurrency,
  formatNumber as formatCurrencyNumber,
  formatBDT,
  getCurrencySymbol,
  convertCurrency,
  applyDiscount,
  calculateDiscount,
  calculateTaxInclusive,
  calculateTaxAmount,
  formatPercentage as formatCurrencyPercentage,
  getCurrencyInfo,
  getSupportedCurrencies,
  isCurrencySupported,
  type CurrencyInfo,
} from './currency.util';

// ============================================================
// String Manipulation Utilities
// ============================================================
export * from './string.util';

// ============================================================
// Number Formatting Utilities
// ============================================================
export {
  formatNumber,
  formatWithCommas,
  formatWithCommasBD,
  formatCompact,
  formatNumberWithOptions,
  round,
  floor,
  ceil,
  calculatePercentage,
  calculateValueFromPercentage,
  formatPercentage,
  getPercentageResult,
  randomInt,
  randomFloat,
  isInRange,
  clamp,
  isInteger,
  isPositive,
  isNegative,
  isZero,
  max,
  min,
  sum,
  average,
  type PercentageResult,
} from './number.util';
