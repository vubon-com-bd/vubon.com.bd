/**
 * Currency Utilities - Price and currency formatting
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/src/formatter/currency.util
 * 
 * RULES:
 * ✅ ONLY formatting and calculation helpers - NO business logic
 * ✅ NO exchange rate API calls, financial transaction logic
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

// ==================== Constants (Enterprise grade) ====================

/**
 * Supported currencies with their configurations
 * Focus on BDT (Bangladesh) with international support
 */
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar', decimalPlaces: 2 },
  BDT: { code: 'BDT', symbol: '৳', locale: 'bn-BD', name: 'Bangladeshi Taka', decimalPlaces: 2 },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro', decimalPlaces: 2 },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound', decimalPlaces: 2 },
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee', decimalPlaces: 2 },
  AED: { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', name: 'UAE Dirham', decimalPlaces: 2 },
  SGD: { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar', decimalPlaces: 2 },
  CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar', decimalPlaces: 2 },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar', decimalPlaces: 2 },
  JPY: { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen', decimalPlaces: 0 },
  CNY: { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan', decimalPlaces: 2 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export const DEFAULT_CURRENCY: CurrencyCode = 'BDT';

// Default decimal places
const DEFAULT_DECIMAL_PLACES = 2;
const MIN_DECIMAL_PLACES = 0;
const MAX_DECIMAL_PLACES = 4;

// Discount calculation bounds
const MAX_DISCOUNT_PERCENTAGE = 100;
const MIN_DISCOUNT_PERCENTAGE = 0;

// ==================== Private Helpers ====================

/**
 * Validate amount is a valid number
 */
const validateAmount = (amount: number): number => {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  return amount;
};

/**
 * Validate currency code exists
 */
const validateCurrency = (currencyCode: CurrencyCode): typeof CURRENCIES[CurrencyCode] => {
  const currency = CURRENCIES[currencyCode];
  if (!currency) {
    throw new Error(`Unsupported currency: ${currencyCode}`);
  }
  return currency;
};

/**
 * Round to decimal places
 */
const roundToDecimal = (value: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
};

// ==================== Formatting ====================

/**
 * Format price with currency symbol and proper decimal places
 * Uses Intl.NumberFormat for locale-specific formatting
 * 
 * @param amount - Amount to format
 * @param currencyCode - Currency code (default: 'BDT')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234.5, 'BDT') // '৳১,২৩৪.৫০' or '৳1,234.50'
 * formatCurrency(99.99, 'USD') // '$99.99'
 */
export const formatCurrency = (
  amount: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY
): string => {
  const validAmount = validateAmount(amount);
  const currency = validateCurrency(currencyCode);
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(validAmount);
};

/**
 * Format price with compact notation (e.g., 1.2K, 1.2M)
 * Useful for large numbers in dashboards
 * 
 * @param amount - Amount to format
 * @param currencyCode - Currency code (default: 'BDT')
 * @returns Compact formatted currency string
 * 
 * @example
 * formatCompactCurrency(1234567, 'BDT') // '৳১.২M' or '৳1.2M'
 * formatCompactCurrency(1500, 'USD') // '$1.5K'
 */
export const formatCompactCurrency = (
  amount: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY
): string => {
  const validAmount = validateAmount(amount);
  const currency = validateCurrency(currencyCode);
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(validAmount);
};

/**
 * Format price without currency symbol (just number with proper decimals)
 * 
 * @param amount - Amount to format
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Formatted number string
 * 
 * @example
 * formatNumber(1234.5) // '1,234.50'
 * formatNumber(1234.5, 0) // '1,235'
 */
export const formatNumber = (
  amount: number,
  decimalPlaces: number = DEFAULT_DECIMAL_PLACES
): string => {
  const validAmount = validateAmount(amount);
  const validDecimals = Math.min(
    Math.max(decimalPlaces, MIN_DECIMAL_PLACES),
    MAX_DECIMAL_PLACES
  );
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: validDecimals,
    maximumFractionDigits: validDecimals,
  }).format(validAmount);
};

/**
 * Format price with BDT specific formatting (Bangladesh)
 * 
 * @param amount - Amount in BDT
 * @returns Formatted BDT string
 * 
 * @example
 * formatBDT(1234.5) // '৳১,২৩৪.৫০'
 */
export const formatBDT = (amount: number): string => {
  return formatCurrency(amount, 'BDT');
};

/**
 * Get currency symbol
 * 
 * @param currencyCode - Currency code
 * @returns Currency symbol
 * 
 * @example
 * getCurrencySymbol('BDT') // '৳'
 * getCurrencySymbol('USD') // '$'
 */
export const getCurrencySymbol = (currencyCode: CurrencyCode): string => {
  const currency = validateCurrency(currencyCode);
  return currency.symbol;
};

// ==================== Conversion ====================

/**
 * Convert between currencies (requires rate from external service)
 * Pure function - no API calls
 * 
 * @param amount - Amount to convert
 * @param fromCurrency - Source currency
 * @param toCurrency - Target currency
 * @param rate - Exchange rate (from source to target)
 * @returns Converted amount
 * 
 * @example
 * convertCurrency(100, 'USD', 'BDT', 110) // 11000
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rate: number
): number => {
  const validAmount = validateAmount(amount);
  
  if (fromCurrency === toCurrency) return validAmount;
  
  const validRate = validateAmount(rate);
  const converted = validAmount * validRate;
  
  const targetCurrency = validateCurrency(toCurrency);
  return roundToDecimal(converted, targetCurrency.decimalPlaces);
};

// ==================== Discount Calculation ====================

/**
 * Calculate discounted price from original price and discount percentage
 * 
 * @param price - Original price
 * @param discountPercentage - Discount percentage (0-100)
 * @returns Discounted price
 * 
 * @example
 * applyDiscount(1000, 10) // 900
 * applyDiscount(500, 25) // 375
 */
export const applyDiscount = (price: number, discountPercentage: number): number => {
  const validPrice = validateAmount(price);
  let validDiscount = validateAmount(discountPercentage);
  
  // Clamp discount percentage to valid range
  validDiscount = Math.min(
    Math.max(validDiscount, MIN_DISCOUNT_PERCENTAGE),
    MAX_DISCOUNT_PERCENTAGE
  );
  
  const discount = validPrice * (validDiscount / 100);
  const discounted = validPrice - discount;
  
  return roundToDecimal(Math.max(0, discounted), DEFAULT_DECIMAL_PLACES);
};

/**
 * Calculate discount percentage from original and discounted price
 * 
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Discount percentage (0-100)
 * 
 * @example
 * calculateDiscount(1000, 900) // 10
 * calculateDiscount(500, 375) // 25
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  const validOriginal = validateAmount(originalPrice);
  const validDiscounted = validateAmount(discountedPrice);
  
  if (validOriginal <= 0) return 0;
  if (validDiscounted >= validOriginal) return 0;
  
  const discount = ((validOriginal - validDiscounted) / validOriginal) * 100;
  return roundToDecimal(discount, 0);
};

/**
 * Calculate price including tax
 * 
 * @param price - Base price
 * @param taxRate - Tax rate percentage (e.g., 15 for 15% VAT)
 * @returns Price including tax
 * 
 * @example
 * calculateTaxInclusive(1000, 15) // 1150
 */
export const calculateTaxInclusive = (price: number, taxRate: number): number => {
  const validPrice = validateAmount(price);
  const validTaxRate = validateAmount(taxRate);
  
  const taxAmount = validPrice * (validTaxRate / 100);
  const total = validPrice + taxAmount;
  
  return roundToDecimal(total, DEFAULT_DECIMAL_PLACES);
};

/**
 * Calculate tax amount from price and tax rate
 * 
 * @param price - Base price
 * @param taxRate - Tax rate percentage
 * @returns Tax amount
 */
export const calculateTaxAmount = (price: number, taxRate: number): number => {
  const validPrice = validateAmount(price);
  const validTaxRate = validateAmount(taxRate);
  
  const taxAmount = validPrice * (validTaxRate / 100);
  return roundToDecimal(taxAmount, DEFAULT_DECIMAL_PLACES);
};

// ==================== Percentage Formatting ====================

/**
 * Format percentage value
 * 
 * @param value - Percentage value (e.g., 15.5 for 15.5%)
 * @param showSymbol - Whether to show the % symbol
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercentage(15.5) // '16%'
 * formatPercentage(15.5, true, 1) // '15.5%'
 * formatPercentage(15.5, false) // '16'
 */
export const formatPercentage = (
  value: number,
  showSymbol: boolean = true,
  decimalPlaces: number = 0
): string => {
  const validValue = validateAmount(value);
  const validDecimals = Math.min(
    Math.max(decimalPlaces, MIN_DECIMAL_PLACES),
    MAX_DECIMAL_PLACES
  );
  
  const formatted = validValue.toFixed(validDecimals);
  return showSymbol ? `${formatted}%` : formatted;
};

// ==================== Type Exports ====================

export interface CurrencyInfo {
  code: string;
  symbol: string;
  locale: string;
  name: string;
  decimalPlaces: number;
}

/**
 * Get currency information
 * 
 * @param currencyCode - Currency code
 * @returns Currency information object
 */
export const getCurrencyInfo = (currencyCode: CurrencyCode): CurrencyInfo => {
  const currency = validateCurrency(currencyCode);
  return {
    code: currency.code,
    symbol: currency.symbol,
    locale: currency.locale,
    name: currency.name,
    decimalPlaces: currency.decimalPlaces,
  };
};

/**
 * Get all supported currencies
 * 
 * @returns Array of currency codes
 */
export const getSupportedCurrencies = (): CurrencyCode[] => {
  return Object.keys(CURRENCIES) as CurrencyCode[];
};

/**
 * Check if currency is supported
 * 
 * @param currencyCode - Currency code to check
 * @returns True if supported
 */
export const isCurrencySupported = (currencyCode: string): currencyCode is CurrencyCode => {
  return currencyCode in CURRENCIES;
};

// ==================== Type Exports ====================

export type { CurrencyInfo };
