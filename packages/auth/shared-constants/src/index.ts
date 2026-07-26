/**
 * Shared constants for authentication module
 * Exports all constants from the shared-constants package
 */

// Export authentication constants
export {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_PATTERN,
  USER_STATUS,
  DEFAULT_ROLE,
  USER_ROLES,
  type UserStatus,
  type UserRole,
} from './auth.constants.js';

// Export regex constants
export {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  UUID_V7_REGEX,
  URL_REGEX,
} from './regex.constants.js';
