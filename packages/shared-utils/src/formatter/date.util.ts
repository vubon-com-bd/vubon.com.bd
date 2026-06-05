/**
 * Date Utilities - Timezone-safe date formatting
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-utils/formatter/date.util

 * RULES:
 * ✅ ONLY date formatting and helpers - NO business logic
 * ✅ NO database timezone mutation, date arithmetic (use date-fns)
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import {
  format,
  formatDistance,
  formatRelative,
  formatISO,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isToday,
  isYesterday,
  isTomorrow,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from 'date-fns';
// ✅ FIXED: Correct package name
import { DATE_CONFIG } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// ✅ FIXED: Add fallbacks for missing constants
const DATE_FORMATS = DATE_CONFIG?.DATE_FORMATS || {
  ISO: 'yyyy-MM-dd',
  ISO_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  DATE: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
  DATETIME: 'yyyy-MM-dd HH:mm:ss',
  DISPLAY_DATE: 'MMM dd, yyyy',
  DISPLAY_DATETIME: 'MMM dd, yyyy hh:mm a',
  BENGALI_DATE: 'dd MMM, yyyy',
  BENGALI_DATETIME: 'dd MMM, yyyy hh:mm a',
  FILE_DATE: 'yyyy-MM-dd',
  FILE_DATETIME: 'yyyy-MM-dd_HH-mm-ss',
  API_DATE: 'yyyy-MM-dd',
  API_DATETIME: 'yyyy-MM-ddTHH:mm:ssZ',
};

export const DEFAULT_DATE_FORMAT = DATE_CONFIG?.DEFAULT_DATE_FORMAT || 'yyyy-MM-dd';
export const DEFAULT_TIME_FORMAT = DATE_CONFIG?.DEFAULT_TIME_FORMAT || 'HH:mm:ss';
export const DEFAULT_DATETIME_FORMAT = DATE_CONFIG?.DEFAULT_DATETIME_FORMAT || 'yyyy-MM-dd HH:mm:ss';
export const DEFAULT_DISPLAY_DATE_FORMAT = DATE_CONFIG?.DEFAULT_DISPLAY_DATE_FORMAT || 'MMM dd, yyyy';
export const DEFAULT_DISPLAY_DATETIME_FORMAT = DATE_CONFIG?.DEFAULT_DISPLAY_DATETIME_FORMAT || 'MMM dd, yyyy hh:mm a';
export const DEFAULT_TIMEZONE = DATE_CONFIG?.DEFAULT_TIMEZONE || 'Asia/Dhaka';

export type DateFormatString = typeof DATE_FORMATS[keyof typeof DATE_FORMATS];

// ==================== Private Helpers ====================

/**
 * Convert input to Date object safely
 */
const toDate = (date: Date | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'string') return parseISO(date);
  return new Date(date);
};

/**
 * Validate and convert to Date
 */
const safeToDate = (date: Date | string | number | null | undefined): Date | null => {
  if (!date) return null;
  try {
    const parsed = toDate(date);
    return isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
};

// ==================== Formatting ====================

/**
 * Format date to string

 * @param date - Date object, ISO string, or timestamp
 * @param formatString - Format pattern (default: 'yyyy-MM-dd')
 * @returns Formatted date string

 * @example
 * formatDate(new Date(), 'yyyy-MM-dd') // '2024-01-15'
 * formatDate('2024-01-15T10:30:00Z', 'MMM dd, yyyy') // 'Jan 15, 2024'
 */
export const formatDate = (
  date: Date | string | number,
  formatString: DateFormatString = DEFAULT_DATE_FORMAT
): string => {
  const dateObj = toDate(date);
  return format(dateObj, formatString);
};

/**
 * Format time to string

 * @param date - Date object, ISO string, or timestamp
 * @param formatString - Time format pattern (default: 'HH:mm:ss')
 * @returns Formatted time string
 */
export const formatTime = (
  date: Date | string | number,
  formatString: DateFormatString = DEFAULT_TIME_FORMAT
): string => {
  const dateObj = toDate(date);
  return format(dateObj, formatString);
};

/**
 * Format datetime to string

 * @param date - Date object, ISO string, or timestamp
 * * @param formatString - Datetime format pattern (default: 'yyyy-MM-dd HH:mm:ss')
 * @returns Formatted datetime string
 */
export const formatDateTime = (
  date: Date | string | number,
  formatString: DateFormatString = DEFAULT_DATETIME_FORMAT
): string => {
  const dateObj = toDate(date);
  return format(dateObj, formatString);
};

/**
 * Format date for display (e.g., "Jan 15, 2024")

 * @param date - Date object, ISO string, or timestamp
 * @returns User-friendly date string
 */
export const formatDisplayDate = (date: Date | string | number): string => {
  return formatDate(date, DEFAULT_DISPLAY_DATE_FORMAT);
};

/**
 * Format datetime for display (e.g., "Jan 15, 2024 10:30 AM")

 * @param date - Date object, ISO string, or timestamp
 * @returns User-friendly datetime string
 */
export const formatDisplayDateTime = (date: Date | string | number): string => {
  return formatDate(date, DEFAULT_DISPLAY_DATETIME_FORMAT);
};

/**
 * Format date as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)

 * @param date - Date object, ISO string, or timestamp
 * @returns ISO string
 */
export const formatToISO = (date: Date | string | number): string => {
  const dateObj = toDate(date);
  return formatISO(dateObj);
};

/**
 * Format date as readable relative time (e.g., "2 hours ago", "in 3 days")

 * @param date - Date to compare
 * @param baseDate - Base date for comparison (default: now)
 * @returns Relative time string

 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000)) // 'about 1 hour ago'
 */
export const formatRelativeTime = (
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string => {
  const dateObj = toDate(date);
  const baseObj = toDate(baseDate);
  return formatDistance(dateObj, baseObj, { addSuffix: true });
};

/**
 * Format relative date (e.g., "today", "yesterday", "last Monday")

 * @param date - Date to format
 * @param baseDate - Base date for comparison (default: now)
 * @returns Relative date string

 * @example
 * formatRelativeDate(new Date()) // 'today'
 * formatRelativeDate(Date.now() - 86400000) // 'yesterday'
 */
export const formatRelativeDate = (
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string => {
  const dateObj = toDate(date);
  const baseObj = toDate(baseDate);
  return formatRelative(dateObj, baseObj);
};

// ==================== Parsing ====================

/**
 * Parse ISO string to Date object

 * @param dateString - ISO date string
 * @returns Date object or null if invalid
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    return parseISO(dateString);
  } catch {
    return null;
  }
};

/**
 * Safe date creation with fallback

 * @param value - Date value (Date, string, number, null, undefined)
 * @param fallback - Fallback date if invalid (default: new Date())
 * @returns Valid Date object
 */
export const safeDate = (
  value: Date | string | number | null | undefined,
  fallback: Date = new Date()
): Date => {
  const parsed = safeToDate(value);
  return parsed || fallback;
};

// ==================== Validation ====================

/**
 * Check if date is valid

 * @param date - Date to check
 * @returns True if valid
 */
export const isValidDate = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return !isNaN(dateObj.getTime());
};

/**
 * Check if date is in the past

 * @param date - Date to check
 * @returns True if in past
 */
export const isPastDate = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return dateObj < new Date();
};

/**
 * Check if date is in the future

 * @param date - Date to check
 * @returns True if in future
 */
export const isFutureDate = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return dateObj > new Date();
};

/**
 * Check if date is today
 */
export const isDateToday = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isToday(dateObj);
};

/**
 * Check if date is yesterday
 */
export const isDateYesterday = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isYesterday(dateObj);
};

/**
 * Check if date is tomorrow
 */
export const isDateTomorrow = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isTomorrow(dateObj);
};

/**
 * Check if date is within current week
 */
export const isDateThisWeek = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isThisWeek(dateObj);
};

/**
 * Check if date is within current month
 */
export const isDateThisMonth = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isThisMonth(dateObj);
};

/**
 * Check if date is within current year
 */
export const isDateThisYear = (date: Date | string | number): boolean => {
  const dateObj = toDate(date);
  return isThisYear(dateObj);
};

// ==================== Difference Calculations ====================

/**
 * Get difference in days between two dates
 */
export const diffDays = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInDays(left, right);
};

/**
 * Get difference in hours between two dates
 */
export const diffHours = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInHours(left, right);
};

/**
 * Get difference in minutes between two dates
 */
export const diffMinutes = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInMinutes(left, right);
};

/**
 * Get difference in seconds between two dates
 */
export const diffSeconds = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInSeconds(left, right);
};

/**
 * Get difference in months between two dates
 */
export const diffMonths = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInMonths(left, right);
};

/**
 * Get difference in years between two dates
 */
export const diffYears = (dateLeft: Date | string | number, dateRight: Date | string | number): number => {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInYears(left, right);
};

// ==================== Date Boundaries ====================

/**
 * Get start of day (00:00:00)
 */
export const getStartOfDay = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return startOfDay(dateObj);
};

/**
 * Get end of day (23:59:59)
 */
export const getEndOfDay = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return endOfDay(dateObj);
};

/**
 * Get start of week (Sunday or Monday depending on locale)
 */
export const getStartOfWeek = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return startOfWeek(dateObj);
};

/**
 * Get end of week
 */
export const getEndOfWeek = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return endOfWeek(dateObj);
};

/**
 * Get start of month
 */
export const getStartOfMonth = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return startOfMonth(dateObj);
};

/**
 * Get end of month
 */
export const getEndOfMonth = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return endOfMonth(dateObj);
};

/**
 * Get start of year
 */
export const getStartOfYear = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return startOfYear(dateObj);
};

/**
 * Get end of year
 */
export const getEndOfYear = (date: Date | string | number): Date => {
  const dateObj = toDate(date);
  return endOfYear(dateObj);
};

// ==================== Age Calculation ====================

/**
 * Calculate age from birthdate

 * @param birthdate - Birth date
 * @returns Age in years

 * @example
 * calculateAge('1990-01-15') // 34 (if current year is 2024)
 */
export const calculateAge = (birthdate: Date | string): number => {
  const birth = toDate(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return Math.max(0, age);
};

/**
 * Check if date is within age range
 */
export const isWithinAgeRange = (
  birthdate: Date | string,
  minAge: number,
  maxAge: number
): boolean => {
  const age = calculateAge(birthdate);
  return age >= minAge && age <= maxAge;
};

// ==================== Type Exports ====================

export type DateFormatType = DateFormatString;
