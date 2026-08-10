// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Minimum username length
 */
export const USER_USERNAME_MIN_LENGTH = 3;

/**
 * Maximum username length
 */
export const USER_USERNAME_MAX_LENGTH = 30;

/**
 * Username regular expression (alphanumeric, underscore, dot, hyphen)
 */
export const USER_USERNAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

/**
 * Default avatar path
 */
export const USER_DEFAULT_AVATAR = '/assets/images/default-avatar.png';

/**
 * Maximum bio length
 */
export const USER_MAX_BIO_LENGTH = 500;

/**
 * Default timezone
 */
export const USER_DEFAULT_TIMEZONE = 'Asia/Dhaka';

/**
 * Default language
 */
export const USER_DEFAULT_LANGUAGE = 'en';

/**
 * Default currency
 */
export const USER_DEFAULT_CURRENCY = 'BDT';

/**
 * Default pagination limit
 */
export const USER_PAGINATION_DEFAULT_LIMIT = 10;

/**
 * Maximum pagination limit
 */
export const USER_PAGINATION_MAX_LIMIT = 100;

/**
 * Default sort field
 */
export const USER_DEFAULT_SORT_FIELD = 'createdAt';

/**
 * Default sort order
 */
export const USER_DEFAULT_SORT_ORDER = 'desc';

/**
 * User configuration
 */
export const USER_CONFIG = {
  USERNAME_MIN_LENGTH: USER_USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH: USER_USERNAME_MAX_LENGTH,
  USERNAME_REGEX: USER_USERNAME_REGEX,
  DEFAULT_AVATAR: USER_DEFAULT_AVATAR,
  MAX_BIO_LENGTH: USER_MAX_BIO_LENGTH,
  DEFAULT_TIMEZONE: USER_DEFAULT_TIMEZONE,
  DEFAULT_LANGUAGE: USER_DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY: USER_DEFAULT_CURRENCY,
  PAGINATION_DEFAULT_LIMIT: USER_PAGINATION_DEFAULT_LIMIT,
  PAGINATION_MAX_LIMIT: USER_PAGINATION_MAX_LIMIT,
  DEFAULT_SORT_FIELD: USER_DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER: USER_DEFAULT_SORT_ORDER,
} as const;

/**
 * Type for sort order
 */
export type UserSortOrder = 'asc' | 'desc';

/**
 * Type for user configuration
 */
export type UserConfig = typeof USER_CONFIG;
