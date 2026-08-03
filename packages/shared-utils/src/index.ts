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

// Export phone validation utilities
export {
  parseAndValidatePhone,
  validatePhone,
  formatPhone,
  formatInternational,
  formatNational,
  normalizePhone,
  detectBDOperator,
  isMobilePhone,
  isFixedLinePhone,
  getCountryCallingCodeFromPhone,
  type PhoneFormat,
  type BDPhoneOperator,
  type PhoneValidationResult,
} from './validation/phone.util.js';

// Export sanitization utilities
export {
  sanitizeHtml,
  escapeHtml,
  removeScripts,
  removeEventHandlers,
  hasSqlInjectionPattern,
  sanitize,
  sanitizeUrl,
  sanitizeFileName,
} from './validation/sanitize.util.js';

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

// Export encryption utilities
export {
  encryptGCM,
  decryptGCM,
  encryptCBC,
  decryptCBC,
  encrypt,
  decrypt,
  generateEncryptionKey,
  generateIV,
  type EncryptionAlgorithm,
  type EncryptionResult,
  type DecryptionResult,
} from './crypto/encrypt.util.js';

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

// Export JWT utilities
export {
  signToken,
  verifyToken,
  decodeToken,
  verifyRefreshToken,
  getTokenVersion,
  isTokenExpired,
  addToBlacklist,
  isBlacklisted,
} from './token/jwt.util.js';

// Export refresh token utilities
export {
  generateRefreshToken,
  rotateRefreshToken,
  generateTokenFamily,
  isTokenFamilyValid,
  getRefreshTokenVersion,
  createRefreshTokenData,
  revokeRefreshToken,
  revokeTokenFamily,
  isRefreshTokenExpired,
  isValidRefreshToken,
  type RefreshTokenData,
  type TokenRotationResult,
} from './token/refresh-token.util.js';
