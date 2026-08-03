/**
 * Number format options
 */
export interface NumberFormatOptions {
  /** Number of decimal places (default: 0) */
  decimalPlaces?: number;
  /** Whether to use thousands separators (default: true) */
  useSeparator?: boolean;
  /** Whether to use compact notation (K, M, B) */
  compact?: boolean;
  /** Locale for formatting (default: 'en-US') */
  locale?: string;
}

/**
 * Formats a number with thousands separators and decimal places
 *
 * @param num - The number to format
 * @param options - Formatting options
 * @returns The formatted number string
 *
 * @example
 * formatNumber(1234567.89) // '1,234,567.89'
 * formatNumber(1234567.89, { decimalPlaces: 0 }) // '1,234,568'
 * formatNumber(1234567.89, { locale: 'bn-BD' }) // '১২,৩৪,৫৬৭.৮৯'
 */
export function formatNumber(num: number, options: NumberFormatOptions = {}): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  const decimalPlaces = options.decimalPlaces ?? 2;
  const useSeparator = options.useSeparator !== undefined ? options.useSeparator : true;
  const locale = options.locale || 'en-US';

  if (options.compact) {
    return formatCompactNumber(num, decimalPlaces);
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: useSeparator,
  }).format(num);

  return formatted;
}

/**
 * Formats a number with Bangladeshi-style comma separators (12,34,567)
 *
 * @param num - The number to format
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns The formatted number string with Bangladeshi comma style
 *
 * @example
 * formatWithCommasBD(1234567.89) // '12,34,567.89'
 * formatWithCommasBD(1234567.89, 0) // '12,34,568'
 */
export function formatWithCommasBD(num: number, decimalPlaces: number = 2): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  const rounded = round(num, decimalPlaces);
  const parts = rounded.toFixed(decimalPlaces).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  // Format integer part with Bangladeshi comma style (12,34,567)
  let formattedInteger = '';
  const length = integerPart.length;

  if (length <= 3) {
    formattedInteger = integerPart;
  } else {
    // First group from right: 3 digits
    const firstGroup = integerPart.slice(-3);
    const remaining = integerPart.slice(0, -3);

    // Remaining groups: 2 digits each
    let remainingGroups = '';
    for (let i = remaining.length; i > 0; i -= 2) {
      const start = Math.max(0, i - 2);
      const group = remaining.slice(start, i);
      remainingGroups = (remainingGroups ? ',' : '') + group + remainingGroups;
    }

    formattedInteger = remainingGroups + ',' + firstGroup;
  }

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
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
 * Rounds a number to the specified number of decimal places
 *
 * @param num - The number to round
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @returns The rounded number
 *
 * @example
 * round(1234.567, 2) // 1234.57
 * round(1234.567, 0) // 1235
 * round(1234.5, 0) // 1235
 */
export function round(num: number, decimalPlaces: number = 0): number {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid number');
  }

  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces)) {
    throw new Error('Decimal places must be a valid number');
  }

  if (decimalPlaces < 0) {
    throw new Error('Decimal places must be non-negative');
  }

  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

/**
 * Rounds a number down (floor) to the specified decimal places
 *
 * @param num - The number to round down
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @returns The rounded down number
 *
 * @example
 * floor(1234.567, 2) // 1234.56
 * floor(1234.567, 0) // 1234
 */
export function floor(num: number, decimalPlaces: number = 0): number {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid number');
  }

  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces)) {
    throw new Error('Decimal places must be a valid number');
  }

  if (decimalPlaces < 0) {
    throw new Error('Decimal places must be non-negative');
  }

  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(num * factor) / factor;
}

/**
 * Rounds a number up (ceil) to the specified decimal places
 *
 * @param num - The number to round up
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @returns The rounded up number
 *
 * @example
 * ceil(1234.567, 2) // 1234.57
 * ceil(1234.567, 0) // 1235
 */
export function ceil(num: number, decimalPlaces: number = 0): number {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid number');
  }

  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces)) {
    throw new Error('Decimal places must be a valid number');
  }

  if (decimalPlaces < 0) {
    throw new Error('Decimal places must be non-negative');
  }

  const factor = Math.pow(10, decimalPlaces);
  return Math.ceil(num * factor) / factor;
}

/**
 * Calculates the percentage of a number relative to a total
 *
 * @param value - The value
 * @param total - The total amount
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns The percentage
 *
 * @example
 * calculatePercentage(50, 200) // 25
 * calculatePercentage(50, 200, 1) // 25.0
 * calculatePercentage(33, 200) // 16.5
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimalPlaces: number = 2
): number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Value must be a valid number');
  }

  if (typeof total !== 'number' || isNaN(total)) {
    throw new Error('Total must be a valid number');
  }

  if (total === 0) {
    throw new Error('Total cannot be zero');
  }

  const percentage = (value / total) * 100;
  return round(percentage, decimalPlaces);
}

/**
 * Clamps a number between a minimum and maximum value
 *
 * @param num - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped number
 *
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export function clamp(num: number, min: number, max: number): number {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid number');
  }

  if (typeof min !== 'number' || isNaN(min)) {
    throw new Error('Minimum value must be a valid number');
  }

  if (typeof max !== 'number' || isNaN(max)) {
    throw new Error('Maximum value must be a valid number');
  }

  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }

  return Math.max(min, Math.min(max, num));
}

/**
 * Formats a number with ordinal suffix (1st, 2nd, 3rd, 4th)
 *
 * @param num - The number to format
 * @param includeNumber - Whether to include the number with the suffix (default: true)
 * @returns The ordinal formatted string
 *
 * @example
 * toOrdinal(1) // '1st'
 * toOrdinal(2) // '2nd'
 * toOrdinal(3) // '3rd'
 * toOrdinal(4) // '4th'
 */
export function toOrdinal(num: number, includeNumber: boolean = true): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  const absNum = Math.abs(num);
  const suffix = getOrdinalSuffix(absNum);
  return includeNumber ? `${num}${suffix}` : suffix;
}

/**
 * Gets the ordinal suffix for a number
 *
 * @param num - The number to get the ordinal suffix for
 * @returns The ordinal suffix
 *
 * @example
 * getOrdinalSuffix(1) // 'st'
 * getOrdinalSuffix(2) // 'nd'
 * getOrdinalSuffix(3) // 'rd'
 * getOrdinalSuffix(4) // 'th'
 */
export function getOrdinalSuffix(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'th';
  }

  const absNum = Math.abs(num);
  const lastDigit = absNum % 10;
  const lastTwoDigits = absNum % 100;

  // Exceptions for 11th, 12th, 13th
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/**
 * Checks if a number is within a range
 *
 * @param num - The number to check
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns `true` if the number is within the range, `false` otherwise
 *
 * @example
 * isInRange(5, 0, 10) // true
 * isInRange(-5, 0, 10) // false
 * isInRange(15, 0, 10) // false
 */
export function isInRange(num: number, min: number, max: number): boolean {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid number');
  }

  if (typeof min !== 'number' || isNaN(min)) {
    throw new Error('Minimum value must be a valid number');
  }

  if (typeof max !== 'number' || isNaN(max)) {
    throw new Error('Maximum value must be a valid number');
  }

  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }

  return num >= min && num <= max;
}

/**
 * Converts a string to a number safely
 *
 * @param str - The string to convert
 * @param defaultValue - The default value if conversion fails (default: 0)
 * @returns The converted number or the default value
 *
 * @example
 * toNumber('123.45') // 123.45
 * toNumber('123.45', 0) // 123.45
 * toNumber('abc', 0) // 0
 */
export function toNumber(str: string, defaultValue: number = 0): number {
  if (typeof str !== 'string') {
    return defaultValue;
  }

  const num = parseFloat(str.trim());
  return isNaN(num) ? defaultValue : num;
}

/**
 * Formats a number as a percentage string
 *
 * @param num - The number to format as percentage
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @param includeSymbol - Whether to include the % symbol (default: true)
 * @returns The formatted percentage string
 *
 * @example
 * toPercentage(0.1234) // '12%'
 * toPercentage(0.1234, 2) // '12.34%'
 * toPercentage(0.1234, 2, false) // '12.34'
 */
export function toPercentage(
  num: number,
  decimalPlaces: number = 0,
  includeSymbol: boolean = true
): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  const percentage = num * 100;
  const formatted = round(percentage, decimalPlaces).toFixed(decimalPlaces);
  return includeSymbol ? `${formatted}%` : formatted;
}

/**
 * Parses a percentage string to a decimal number
 *
 * @param str - The percentage string to parse
 * @param defaultValue - The default value if parsing fails (default: 0)
 * @returns The decimal number
 *
 * @example
 * fromPercentage('25%') // 0.25
 * fromPercentage('25') // 0.25
 * fromPercentage('12.34%') // 0.1234
 */
export function fromPercentage(str: string, defaultValue: number = 0): number {
  if (typeof str !== 'string') {
    return defaultValue;
  }

  const cleaned = str.trim().replace('%', '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? defaultValue : num / 100;
}

/**
 * Formats a number with fixed decimal places
 *
 * @param num - The number to format
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns The formatted string with fixed decimal places
 *
 * @example
 * toFixed(1234.567, 2) // '1234.57'
 * toFixed(1234, 2) // '1234.00'
 */
export function toFixed(num: number, decimalPlaces: number = 2): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid number';
  }

  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces)) {
    throw new Error('Decimal places must be a valid number');
  }

  if (decimalPlaces < 0) {
    throw new Error('Decimal places must be non-negative');
  }

  return num.toFixed(decimalPlaces);
}

/**
 * Generates a random number between min and max (inclusive)
 *
 * @param min - The minimum value
 * @param max - The maximum value
 * @param floor - Whether to return an integer (default: true)
 * @returns The random number
 *
 * @example
 * randomNumber(1, 10) // 7
 * randomNumber(1, 10, false) // 5.678
 */
export function randomNumber(min: number, max: number, floor: boolean = true): number {
  if (typeof min !== 'number' || isNaN(min)) {
    throw new Error('Minimum value must be a valid number');
  }

  if (typeof max !== 'number' || isNaN(max)) {
    throw new Error('Maximum value must be a valid number');
  }

  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }

  const random = Math.random() * (max - min + (floor ? 1 : 0)) + min;
  return floor ? Math.floor(random) : random;
}
