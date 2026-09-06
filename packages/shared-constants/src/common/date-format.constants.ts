/**
 * Date Format Constants
 * @module shared-constants/common/date-format.constants
 */

export const DATE_FORMAT = {
  // ISO formats
  ISO: 'YYYY-MM-DD',
  ISO_TIME: 'HH:mm:ss',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
  ISO_DATETIME_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
  ISO_DATETIME_Z: 'YYYY-MM-DDTHH:mm:ssZ',

  // Bangladesh formats
  BD: 'DD/MM/YYYY',
  BD_SHORT: 'DD/MM/YY',
  BD_LONG: 'DD MMMM YYYY',
  BD_TIME: 'hh:mm A',
  BD_DATETIME: 'DD/MM/YYYY hh:mm A',

  // US formats
  US: 'MM/DD/YYYY',
  US_SHORT: 'MM/DD/YY',
  US_LONG: 'MMMM DD, YYYY',
  US_TIME: 'hh:mm A',
  US_DATETIME: 'MM/DD/YYYY hh:mm A',

  // UK formats
  UK: 'DD/MM/YYYY',
  UK_SHORT: 'DD/MM/YY',
  UK_LONG: 'DD MMMM YYYY',
  UK_TIME: 'HH:mm',
  UK_DATETIME: 'DD/MM/YYYY HH:mm',

  // Day formats
  DAY_MONTH: 'DD MMM',
  DAY_MONTH_YEAR: 'DD MMM YYYY',
  MONTH_YEAR: 'MMM YYYY',
  MONTH: 'MMMM',
  YEAR: 'YYYY',
  DAY: 'dddd',

  // Time formats
  TIME_12H: 'hh:mm A',
  TIME_24H: 'HH:mm',
  TIME_WITH_SECONDS: 'HH:mm:ss',

  // Relative time
  RELATIVE: {
    NOW: 'now',
    SECONDS: 'seconds ago',
    MINUTES: 'minutes ago',
    HOURS: 'hours ago',
    DAYS: 'days ago',
    WEEKS: 'weeks ago',
    MONTHS: 'months ago',
    YEARS: 'years ago',
  },

  // Database formats
  DB_DATE: 'YYYY-MM-DD',
  DB_TIME: 'HH:mm:ss',
  DB_DATETIME: 'YYYY-MM-DD HH:mm:ss',

  // Default formats
  DEFAULT_DATE: 'DD/MM/YYYY',
  DEFAULT_TIME: 'hh:mm A',
  DEFAULT_DATETIME: 'DD/MM/YYYY hh:mm A',
} as const;

export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
