/**
 * Shared Utils - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure utility exports only
 */

// ============================================================
// Crypto Utilities
// ============================================================
export * from './crypto';

// ============================================================
// Validation Utilities
// ============================================================
export {
  // Email utilities
  normalizeEmail,
  normalizeEmailWithRules,
  isValidEmail,
  isValidEmailStrict,
  hasMxRecords,
  maskEmail as maskEmailAddress,
  getEmailDomain,
  isCommonEmailDomain,
  isBangladeshEmailDomain,
  isEducationalEmail,
  getEmailUsername,
  getLocalPart,
  getEmailComponents,
  type EmailComponents,
} from './validation/email.util';

export {
  // Phone utilities
  parsePhone,
  isValidPhone,
  isPossiblePhone,
  isValidBdMobile,
  getPhoneNumberType,
  detectBdOperator,
  formatToE164,
  formatInternational,
  formatNational,
  formatAsYouType,
  normalizePhone,
  normalizeBdPhone,
  toLocalFormat,
  extractCountryCode,
  extractNationalNumber,
  maskPhone as maskPhoneNumber,
  maskBdPhone,
  detectCountry,
  getPhoneCountry,
  getPhoneComponents,
  type PhoneComponents,
  type PhoneNumber,
  type CountryCode,
} from './validation/phone.util';

export {
  // Sanitize utilities
  stripHtml,
  stripHtmlComments,
  removeScripts,
  removeStyles,
  removeIframes,
  removeObjectTags,
  removeForms,
  removeJavaScriptProtocol,
  removeDataProtocol,
  removeEventHandlers,
  sanitizeHtml,
  escapeHtml,
  unescapeHtml,
  trim,
  trimLeft,
  trimRight,
  normalizeWhitespace,
  removeWhitespace,
  truncate as truncateString,
  truncateWords as truncateStringWords,
  escapeSql,
  hasSqlInjectionPattern,
  normalizeUnicode,
  removeDiacritics,
  normalizeCase,
  toUpperCase,
  capitalize as capitalizeString,
  capitalizeWords as capitalizeWordsString,
  sanitize,
  sanitizeBengaliText,
  type SanitizationOptions,
} from './validation/sanitize.util';

export {
  // Validator utilities
  isUuid,
  isUuidV4,
  isObjectId,
  isAlphanumeric,
  isAlphabetic,
  isNumericString,
  isHex,
  isBase64,
  isJson,
  isValidSlug,
  isValidDomain,
  isValidUrl,
  isValidIp,
  isValidIpV4,
  isValidIpV6,
  isValidNumber,
  isInteger,
  isPositiveInteger,
  isNonNegativeInteger,
  isInRange as isNumberInRange,
  parseBoolean,
  toBooleanString,
  isObject,
  isNonEmptyObject,
  isNonEmptyArray,
  isBlank as isStringBlank,
  isNotBlank as isStringNotBlank,
  isEmpty,
  isNotEmpty,
  isPasswordMinimal,
  isPasswordStrong,
  createValidationResult,
  type ValidationResult,
} from './validation/validator.util';

// ============================================================
// Formatter Utilities
// ============================================================
export * from './formatter';

// ============================================================
// Device Utilities
// ============================================================
export * from './device';

// ============================================================
// Token Utilities
// ============================================================
export * from './token';
// ============================================================
// Env Utilities
// ============================================================
export * from './env';

// ============================================================
// Logger Utilities
// ============================================================
export * from './logger';

// ============================================================
// Async Utilities
// ============================================================
export * from './async';

