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
