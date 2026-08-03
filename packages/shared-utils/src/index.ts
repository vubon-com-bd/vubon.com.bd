/**
 * Shared utilities module entry point
 * Exports all utilities from all sub-modules
 */

// Export email validation utilities
export { isValidEmail, normalizeEmail, isDisposableEmail } from './validation/email.util.js';

// Export validator utilities
export {
  isPasswordStrong,
  isValidPhone,
  isValidUsername,
  isValidUUID,
  isValidURL,
} from './validation/validator.util.js';

// Export crypto utilities
export { hashPassword, comparePassword, hashPasswordSync } from './crypto/hash.util.js';

// Export random token utilities
export {
  generateToken,
  generateOTP,
  generateVerificationToken,
  generateTOTPSecret,
  generateBackupCodes,
} from './crypto/random.util.js';

// Export string formatter utilities
export {
  capitalize,
  capitalizeName,
  slugify,
  truncate,
  toTitleCase,
  toCamelCase,
  toSnakeCase,
} from './formatter/string.util.js';
