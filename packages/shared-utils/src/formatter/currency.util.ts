/**
 * Currency codes supported by the application
 */
export type CurrencyCode =
  'BDT' | 'USD' | 'EUR' | 'GBP' | 'INR' | 'PKR' | 'AED' | 'SAR' | 'MYR' | 'SGD';

/**
 * Currency configuration interface
 */
export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  decimalPlaces: number;
  thousandsSeparator: string;
  decimalSeparator: string;
}

/**
 * Currency format options
 */
export interface CurrencyFormatOptions {
  /** Currency code (default: 'BDT') */
  currency?: CurrencyCode;
  /** Locale for formatting (default: 'en-US') */
  locale?: string;
  /** Number of decimal places (default: 2) */
  decimalPlaces?: number;
  /** Whether to show the currency symbol (default: true) */
  showSymbol?: boolean;
  /** Whether to use compact notation (e.g., 1.2K, 1.5M) */
  compact?: boolean;
}

/**
 * Currency symbol mapping
 */
const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  BDT: '৳',
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  PKR: '₨',
  AED: 'د.إ',
  SAR: '﷼',
  MYR: 'RM',
  SGD: 'S$',
};

/**
 * Currency configuration mapping
 */
const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  BDT: {
    code: 'BDT',
    symbol: '৳',
    locale: 'bn-BD',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    decimalPlaces: 2,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  PKR: {
    code: 'PKR',
    symbol: '₨',
    locale: 'en-PK',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    locale: 'ar-AE',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  SAR: {
    code: 'SAR',
    symbol: '﷼',
    locale: 'ar-SA',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM',
    locale: 'ms-MY',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    locale: 'en-SG',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
};

/**
 * Formats a number as currency
 *
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns The formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // '৳1,234.56'
 * formatCurrency(1234.56, { currency: 'USD' }) // '$1,234.56'
 * formatCurrency(1234.56, { compact: true }) // '৳1.23K'
 */
export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Invalid amount';
  }

  const currency = options.currency || 'BDT';
  const config = CURRENCY_CONFIGS[currency];
  const locale = options.locale || config.locale;
  const decimalPlaces = options.decimalPlaces ?? config.decimalPlaces;

  let formattedAmount: string;

  if (options.compact) {
    formattedAmount = formatCompactNumber(amount, decimalPlaces);
  } else {
    formattedAmount = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(amount);
  }

  if (options.showSymbol === false) {
    return formattedAmount;
  }

  const symbol = getCurrencySymbol(currency);
  return `${symbol}${formattedAmount}`;
}

/**
 * Formats a number as Bangladeshi Taka (BDT)
 *
 * @param amount - The amount in BDT
 * @param options - Formatting options
 * @returns The formatted BDT string
 *
 * @example
 * formatBDT(1234.56) // '৳1,234.56'
 * formatBDT(1234.56, { compact: true }) // '৳1.23K'
 */
export function formatBDT(
  amount: number,
  options: Omit<CurrencyFormatOptions, 'currency'> = {}
): string {
  return formatCurrency(amount, { ...options, currency: 'BDT' });
}

/**
 * Gets the currency symbol for a given currency code
 *
 * @param currency - The currency code
 * @returns The currency symbol
 *
 * @example
 * getCurrencySymbol('BDT') // '৳'
 * getCurrencySymbol('USD') // '$'
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

/**
 * Gets the currency configuration for a given currency code
 *
 * @param currency - The currency code
 * @returns The currency configuration
 *
 * @example
 * getCurrencyConfig('BDT') // { code: 'BDT', symbol: '৳', locale: 'bn-BD', ... }
 */
export function getCurrencyConfig(currency: CurrencyCode): CurrencyConfig {
  return CURRENCY_CONFIGS[currency];
}

/**
 * Formats a number in compact notation (K, M, B)
 *
 * @param num - The number to format
 * @param decimalPlaces - Number of decimal places (default: 1)
 * @returns The compact formatted string
 *
 * @example
 * formatCompactNumber(1234) // '1.2K'
 * formatCompactNumber(1234567) // '1.2M'
 * formatCompactNumber(1234567890) // '1.2B'
 */
export function formatCompactNumber(num: number, decimalPlaces: number = 1): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1_000_000_000) {
    return `${sign}${(absNum / 1_000_000_000).toFixed(decimalPlaces)}B`;
  }

  if (absNum >= 1_000_000) {
    return `${sign}${(absNum / 1_000_000).toFixed(decimalPlaces)}M`;
  }

  if (absNum >= 1_000) {
    return `${sign}${(absNum / 1_000).toFixed(decimalPlaces)}K`;
  }

  return `${sign}${absNum.toFixed(decimalPlaces)}`;
}

/**
 * Applies a discount to an amount
 *
 * @param amount - The original amount
 * @param discountPercentage - The discount percentage (0-100)
 * @returns The discounted amount
 *
 * @example
 * applyDiscount(1000, 10) // 900
 * applyDiscount(1000, 0) // 1000
 * applyDiscount(1000, 100) // 0
 */
export function applyDiscount(amount: number, discountPercentage: number): number {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  if (typeof discountPercentage !== 'number' || isNaN(discountPercentage)) {
    throw new Error('Discount percentage must be a valid number');
  }

  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  const discountAmount = (amount * discountPercentage) / 100;
  return amount - discountAmount;
}

/**
 * Calculates the discount amount and percentage from original and discounted prices
 *
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The discount amount and percentage
 *
 * @example
 * calculateDiscount(1000, 900) // { amount: 100, percentage: 10 }
 * calculateDiscount(1000, 1000) // { amount: 0, percentage: 0 }
 */
export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
): { amount: number; percentage: number } {
  if (typeof originalPrice !== 'number' || isNaN(originalPrice)) {
    throw new Error('Original price must be a valid number');
  }

  if (typeof discountedPrice !== 'number' || isNaN(discountedPrice)) {
    throw new Error('Discounted price must be a valid number');
  }

  if (originalPrice < 0 || discountedPrice < 0) {
    throw new Error('Prices must be non-negative');
  }

  if (discountedPrice > originalPrice) {
    throw new Error('Discounted price cannot be greater than original price');
  }

  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return {
    amount: discountAmount,
    percentage: discountPercentage,
  };
}

/**
 * Calculates the tax amount for a given amount
 *
 * @param amount - The amount to calculate tax on
 * @param taxRate - The tax rate as a percentage
 * @returns The tax amount
 *
 * @example
 * calculateTax(1000, 15) // 150
 * calculateTax(1000, 0) // 0
 */
export function calculateTax(amount: number, taxRate: number): number {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  if (typeof taxRate !== 'number' || isNaN(taxRate)) {
    throw new Error('Tax rate must be a valid number');
  }

  if (taxRate < 0) {
    throw new Error('Tax rate must be non-negative');
  }

  return (amount * taxRate) / 100;
}

/**
 * Calculates the total including tax
 *
 * @param amount - The base amount
 * @param taxRate - The tax rate as a percentage
 * @returns The total including tax
 *
 * @example
 * calculateTotalWithTax(1000, 15) // 1150
 * calculateTotalWithTax(1000, 0) // 1000
 */
export function calculateTotalWithTax(amount: number, taxRate: number): number {
  const tax = calculateTax(amount, taxRate);
  return amount + tax;
}

/**
 * Calculates the price after applying both discount and tax
 *
 * @param amount - The original amount
 * @param discountPercentage - The discount percentage (0-100)
 * @param taxRate - The tax rate as a percentage
 * @returns The final price after discount and tax
 *
 * @example
 * calculateFinalPrice(1000, 10, 15) // 1035
 * // 1000 - 10% = 900, + 15% tax = 1035
 */
export function calculateFinalPrice(
  amount: number,
  discountPercentage: number,
  taxRate: number
): number {
  const discountedAmount = applyDiscount(amount, discountPercentage);
  return calculateTotalWithTax(discountedAmount, taxRate);
}

/**
 * Converts an amount from one currency to another using a conversion rate
 *
 * @param amount - The amount to convert
 * @param rate - The conversion rate (amount in target currency per 1 unit of source currency)
 * @returns The converted amount
 *
 * @example
 * convertCurrency(100, 110) // 11000
 * convertCurrency(100, 0.012) // 1.2
 */
export function convertCurrency(amount: number, rate: number): number {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  if (typeof rate !== 'number' || isNaN(rate)) {
    throw new Error('Conversion rate must be a valid number');
  }

  if (rate < 0) {
    throw new Error('Conversion rate must be non-negative');
  }

  return amount * rate;
}

/**
 * Rounds a number to the nearest specified precision
 *
 * @param amount - The amount to round
 * @param precision - The number of decimal places (default: 2)
 * @returns The rounded amount
 *
 * @example
 * roundCurrency(1234.567, 2) // 1234.57
 * roundCurrency(1234.567, 0) // 1235
 */
export function roundCurrency(amount: number, precision: number = 2): number {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  if (typeof precision !== 'number' || isNaN(precision)) {
    throw new Error('Precision must be a valid number');
  }

  if (precision < 0) {
    throw new Error('Precision must be non-negative');
  }

  const factor = Math.pow(10, precision);
  return Math.round(amount * factor) / factor;
}

/**
 * Formats a price in BDT with proper Bengali number formatting
 *
 * @param amount - The amount in BDT
 * @param useBengaliDigits - Whether to use Bengali numerals (default: true)
 * @returns The formatted BDT string with Bengali number formatting
 *
 * @example
 * formatBDTBengali(1234.56) // '৳১,২৩৪.৫৬'
 * formatBDTBengali(1234.56, false) // '৳1,234.56'
 */
export function formatBDTBengali(amount: number, useBengaliDigits: boolean = true): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Invalid amount';
  }

  const formatted = formatBDT(amount);

  if (!useBengaliDigits) {
    return formatted;
  }

  const bengaliDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  return formatted.replace(/\d/g, (digit) => bengaliDigits[digit] || digit);
}

/**
 * Calculates the percentage of a number
 *
 * @param amount - The amount
 * @param total - The total amount
 * @returns The percentage
 *
 * @example
 * calculatePercentage(50, 200) // 25
 * calculatePercentage(0, 200) // 0
 */
export function calculatePercentage(amount: number, total: number): number {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  if (typeof total !== 'number' || isNaN(total)) {
    throw new Error('Total must be a valid number');
  }

  if (total === 0) {
    throw new Error('Total cannot be zero');
  }

  return (amount / total) * 100;
}
