/**
 * Time Format Constants
 * @module shared-constants/common/time-format.constants
 */

export const TIME_FORMAT = {
  // 12-hour formats
  TWELVE_HOUR: 'hh:mm A',
  TWELVE_HOUR_SHORT: 'h:mm A',
  TWELVE_HOUR_WITH_SECONDS: 'hh:mm:ss A',

  // 24-hour formats
  TWENTY_FOUR_HOUR: 'HH:mm',
  TWENTY_FOUR_HOUR_SHORT: 'H:mm',
  TWENTY_FOUR_HOUR_WITH_SECONDS: 'HH:mm:ss',

  // Bangladesh time format
  BD: 'hh:mm A',
  BD_24H: 'HH:mm',

  // US time format
  US: 'hh:mm A',
  US_24H: 'HH:mm',

  // UK time format
  UK: 'HH:mm',
  UK_12H: 'hh:mm A',

  // ISO time formats
  ISO: 'HH:mm:ss',
  ISO_SHORT: 'HH:mm',
  ISO_MILLIS: 'HH:mm:ss.SSS',

  // Timezone formats
  TIMEZONE: 'HH:mm z',
  TIMEZONE_ISO: 'HH:mm:ss Z',

  // Relative time
  RELATIVE: {
    NOW: 'now',
    SECOND: 'second',
    SECONDS: 'seconds',
    MINUTE: 'minute',
    MINUTES: 'minutes',
    HOUR: 'hour',
    HOURS: 'hours',
  },

  // Default
  DEFAULT: 'hh:mm A',
} as const;

export type TimeFormat = (typeof TIME_FORMAT)[keyof typeof TIME_FORMAT];
