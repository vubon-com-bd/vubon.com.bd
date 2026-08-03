import {
  format,
  formatDistanceToNow,
  formatRelative,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
  startOfDay,
  isToday,
  parseISO,
  isValid,
  addDays,
  subDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  formatDistance,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { bn } from 'date-fns/locale';

/**
 * Date format types
 */
export type DateFormat =
  | 'short'
  | 'medium'
  | 'long'
  | 'full'
  | 'shortDate'
  | 'mediumDate'
  | 'longDate'
  | 'fullDate'
  | 'shortTime'
  | 'mediumTime'
  | 'longTime'
  | 'fullTime'
  | 'iso'
  | 'isoDateTime'
  | 'custom';

/**
 * Date format options
 */
export interface DateFormatOptions {
  /** Custom format string (required if format is 'custom') */
  customFormat?: string;
  /** Locale for formatting (default: 'en' for English, 'bn' for Bengali) */
  locale?: 'en' | 'bn';
  /** Include time in the formatted output */
  includeTime?: boolean;
}

/**
 * Formats a date according to the specified format
 *
 * @param date - The date to format (Date object, string, or timestamp)
 * @param formatType - The format type to use (default: 'medium')
 * @param options - Formatting options
 * @returns The formatted date string
 *
 * @example
 * formatDate('2024-01-15', 'long') // 'January 15, 2024'
 * formatDate(new Date(), 'short') // '1/15/2024'
 * formatDate('2024-01-15', 'custom', { customFormat: 'dd/MM/yyyy' }) // '15/01/2024'
 */
export function formatDate(
  date: Date | string | number,
  formatType: DateFormat = 'medium',
  options: DateFormatOptions = {}
): string {
  const dateObj = toDate(date);
  if (!dateObj) {
    return 'Invalid date';
  }

  const locale = options.locale === 'bn' ? bn : undefined;

  switch (formatType) {
    case 'short':
      return format(dateObj, 'M/d/yy', { locale });
    case 'medium':
      return format(dateObj, 'MMM d, yyyy', { locale });
    case 'long':
      return format(dateObj, 'MMMM d, yyyy', { locale });
    case 'full':
      return format(dateObj, 'EEEE, MMMM d, yyyy', { locale });
    case 'shortDate':
      return format(dateObj, 'MM/dd/yyyy', { locale });
    case 'mediumDate':
      return format(dateObj, 'MMM d, yyyy', { locale });
    case 'longDate':
      return format(dateObj, 'MMMM d, yyyy', { locale });
    case 'fullDate':
      return format(dateObj, 'EEEE, MMMM d, yyyy', { locale });
    case 'shortTime':
      return format(dateObj, 'h:mm a', { locale });
    case 'mediumTime':
      return format(dateObj, 'h:mm:ss a', { locale });
    case 'longTime':
      return format(dateObj, 'h:mm:ss a z', { locale });
    case 'fullTime':
      return format(dateObj, 'h:mm:ss a zzzz', { locale });
    case 'iso':
      return dateObj.toISOString().split('T')[0];
    case 'isoDateTime':
      return dateObj.toISOString();
    case 'custom':
      if (!options.customFormat) {
        throw new Error('Custom format string is required when format is "custom"');
      }
      return format(dateObj, options.customFormat, { locale });
    default:
      return format(dateObj, 'MMM d, yyyy h:mm a', { locale });
  }
}

/**
 * Formats a date as a relative time string (e.g., "2 hours ago")
 *
 * @param date - The date to format
 * @param options - Options for formatting
 * @returns The relative time string
 *
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000)) // 'about 1 hour ago'
 * formatRelativeTime(new Date()) // 'less than a minute ago'
 */
export function formatRelativeTime(
  date: Date | string | number,
  options: {
    includeSeconds?: boolean;
    locale?: 'en' | 'bn';
    addSuffix?: boolean;
  } = {}
): string {
  const dateObj = toDate(date);
  if (!dateObj) {
    return 'Invalid date';
  }

  const locale = options.locale === 'bn' ? bn : undefined;
  const addSuffix = options.addSuffix !== undefined ? options.addSuffix : true;

  return formatDistanceToNow(dateObj, {
    addSuffix,
    includeSeconds: options.includeSeconds,
    locale,
  });
}

/**
 * Calculates the difference in days between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of days difference
 *
 * @example
 * diffDays('2024-01-15', '2024-01-20') // 5
 * diffDays(new Date()) // 0 (or negative depending on date)
 */
export function diffDays(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInDays(d1, d2);
}

/**
 * Calculates the difference in hours between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of hours difference
 */
export function diffHours(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInHours(d1, d2);
}

/**
 * Calculates the difference in minutes between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of minutes difference
 */
export function diffMinutes(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInMinutes(d1, d2);
}

/**
 * Calculates the difference in seconds between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of seconds difference
 */
export function diffSeconds(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInSeconds(d1, d2);
}

/**
 * Calculates the difference in months between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of months difference
 */
export function diffMonths(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInMonths(d1, d2);
}

/**
 * Calculates the difference in years between two dates
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @returns The number of years difference
 */
export function diffYears(
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return differenceInYears(d1, d2);
}

/**
 * Calculates the age from a birthdate
 *
 * @param birthDate - The birthdate
 * @param asOfDate - The date to calculate age as of (default: current date)
 * @returns The age in years
 *
 * @example
 * calculateAge('1990-01-15') // 34 (assuming current date is 2024)
 * calculateAge('1990-01-15', '2024-01-14') // 33
 */
export function calculateAge(
  birthDate: Date | string | number,
  asOfDate: Date | string | number = new Date()
): number {
  const birth = toDate(birthDate);
  const asOf = toDate(asOfDate);
  if (!birth || !asOf) {
    throw new Error('Invalid date provided');
  }
  return differenceInYears(asOf, birth);
}

/**
 * Gets the start of the day for a given date
 *
 * @param date - The date to get the start of the day for (default: current date)
 * @returns A new Date object set to the start of the day (00:00:00)
 *
 * @example
 * getStartOfDay(new Date()) // 2024-01-15 00:00:00
 * getStartOfDay('2024-01-15') // 2024-01-15 00:00:00
 */
export function getStartOfDay(date: Date | string | number = new Date()): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return startOfDay(dateObj);
}

/**
 * Checks if a date is today
 *
 * @param date - The date to check
 * @returns `true` if the date is today, `false` otherwise
 *
 * @example
 * isDateToday(new Date()) // true
 * isDateToday('2024-01-15') // depends on current date
 */
export function isDateToday(date: Date | string | number): boolean {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return isToday(dateObj);
}

/**
 * Checks if two dates are the same day
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns `true` if the dates are the same day, `false` otherwise
 */
export function isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return isSameDay(d1, d2);
}

/**
 * Checks if two dates are in the same month
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns `true` if the dates are in the same month, `false` otherwise
 */
export function isSameMonth(date1: Date | string | number, date2: Date | string | number): boolean {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return isSameMonth(d1, d2);
}

/**
 * Checks if two dates are in the same year
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns `true` if the dates are in the same year, `false` otherwise
 */
export function isSameYear(date1: Date | string | number, date2: Date | string | number): boolean {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    throw new Error('Invalid date provided');
  }
  return isSameYear(d1, d2);
}

/**
 * Gets the start of the month for a given date
 *
 * @param date - The date to get the start of the month for (default: current date)
 * @returns A new Date object set to the start of the month
 */
export function getStartOfMonth(date: Date | string | number = new Date()): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return startOfMonth(dateObj);
}

/**
 * Gets the end of the month for a given date
 *
 * @param date - The date to get the end of the month for (default: current date)
 * @returns A new Date object set to the end of the month
 */
export function getEndOfMonth(date: Date | string | number = new Date()): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return endOfMonth(dateObj);
}

/**
 * Adds days to a date
 *
 * @param date - The date to add days to
 * @param days - The number of days to add
 * @returns A new Date object with the added days
 */
export function addDaysToDate(date: Date | string | number, days: number): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return addDays(dateObj, days);
}

/**
 * Subtracts days from a date
 *
 * @param date - The date to subtract days from
 * @param days - The number of days to subtract
 * @returns A new Date object with the subtracted days
 */
export function subtractDays(date: Date | string | number, days: number): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return subDays(dateObj, days);
}

/**
 * Adds months to a date
 *
 * @param date - The date to add months to
 * @param months - The number of months to add
 * @returns A new Date object with the added months
 */
export function addMonthsToDate(date: Date | string | number, months: number): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return addMonths(dateObj, months);
}

/**
 * Subtracts months from a date
 *
 * @param date - The date to subtract months from
 * @param months - The number of months to subtract
 * @returns A new Date object with the subtracted months
 */
export function subtractMonths(date: Date | string | number, months: number): Date {
  const dateObj = toDate(date);
  if (!dateObj) {
    throw new Error('Invalid date provided');
  }
  return subMonths(dateObj, months);
}

/**
 * Converts a date to a Date object
 *
 * @param date - The date to convert
 * @returns A Date object or null if invalid
 */
function toDate(date: Date | string | number): Date | null {
  if (date instanceof Date) {
    return isValid(date) ? date : null;
  }

  if (typeof date === 'string') {
    const parsed = parseISO(date);
    return isValid(parsed) ? parsed : null;
  }

  if (typeof date === 'number') {
    const timestamp = new Date(date);
    return isValid(timestamp) ? timestamp : null;
  }

  return null;
}

/**
 * Parses a date string to a Date object
 *
 * @param dateString - The date string to parse
 * @returns A Date object or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  return toDate(dateString);
}

/**
 * Gets a human-readable date difference string
 *
 * @param date1 - The first date
 * @param date2 - The second date (default: current date)
 * @param options - Formatting options
 * @returns A human-readable difference string
 *
 * @example
 * formatDateDifference('2024-01-15', '2024-01-20') // '5 days'
 * formatDateDifference('2024-01-15', '2024-02-15') // '1 month'
 */
export function formatDateDifference(
  date1: Date | string | number,
  date2: Date | string | number = new Date(),
  options: {
    includeSeconds?: boolean;
    locale?: 'en' | 'bn';
  } = {}
): string {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) {
    return 'Invalid date';
  }

  const locale = options.locale === 'bn' ? bn : undefined;

  return formatDistance(d1, d2, {
    includeSeconds: options.includeSeconds,
    locale,
  });
}
