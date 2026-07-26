/**
 * Shared utilities for authentication module
 * Exports all utility functions
 */

// Export validation utilities
export {
  isValidEmail,
  normalizeEmail,
  isDisposableEmail,
  validateEmailWithDetails,
} from './validation/email.util.js';

// Export crypto utilities
export {
  hashPassword,
  comparePassword,
  hashPasswordSync,
  comparePasswordSync,
  generateToken,
  generateOTP,
  generateAlphanumeric,
  generateCustomRandom,
  generateUUID,
} from './crypto/index.js';
