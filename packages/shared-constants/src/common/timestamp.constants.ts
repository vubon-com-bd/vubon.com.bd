/**
 * Timestamp Constants
 * @module shared-constants/common/timestamp
 */

export const TIMESTAMP = {
  FORMAT: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  TIMEZONE: 'UTC',
  PRECISION: 'millisecond',

  // Validation rules
  UNIX_MIN: 0,
  UNIX_MAX: 4102444800, // 2100-01-01
} as const;
