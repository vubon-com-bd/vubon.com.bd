/**
 * Validation Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/validation/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Email Utilities (email.util.ts)
// ============================================================
export {
  // Normalization
  normalizeEmail,
  normalizeEmailWithRules,

  // Validation
  isValidEmail,
  isValidEmailStrict,
  hasMxRecords,

  // Formatting & Masking
  maskEmail,
  getEmailDomain,
  getEmailUsername,
  getLocalPart,

  // Domain Checks
  isCommonEmailDomain,
  isBangladeshEmailDomain,
  isEducationalEmail,

  // Component Extraction
  getEmailComponents,
} from './email.util';

export type {
  EmailComponents,
} from './email.util';

// ============================================================
// Phone Utilities (phone.util.ts)
// ============================================================
export {
  // Parsing & Validation
  parsePhone,
  isValidPhone,
  isPossiblePhone,
  isValidBdMobile,
  getPhoneNumberType,
  detectBdOperator,

  // Formatting
  formatToE164,
  formatInternational,
  formatNational,
  formatAsYouType,

  // Normalization
  normalizePhone,
  normalizeBdPhone,
  toLocalFormat,

  // Extraction
  extractCountryCode,
  extractNationalNumber,

  // Masking
  maskPhone,
  maskBdPhone,

  // Country Detection
  detectCountry,
  getPhoneCountry,

  // Component Extraction
  getPhoneComponents,

  // Constants
  DEFAULT_COUNTRY,
  DEFAULT_COUNTRY_CODE,
  BD_MOBILE_OPERATORS,
  BD_MOBILE_REGEX,
  BD_MOBILE_STRICT_REGEX,
  SUPPORTED_COUNTRIES,
} from './phone.util';

export type {
  PhoneNumber,
  CountryCode,
  PhoneNumberType,
  SupportedCountry,
  PhoneComponents,
} from './phone.util';

// ============================================================
// Sanitize Utilities (sanitize.util.ts)
// ============================================================
export {
  // HTML Sanitization
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

  // String Sanitization
  escapeHtml,
  unescapeHtml,
  trim,
  trimLeft,
  trimRight,
  normalizeWhitespace,
  removeWhitespace,
  truncate,
  truncateWords,

  // SQL Injection Prevention
  escapeSql,
  hasSqlInjectionPattern,

  // Normalization
  normalizeUnicode,
  removeDiacritics,
  normalizeCase,
  toUpperCase,
  capitalize,
  capitalizeWords,

  // Combined Sanitization
  sanitize,

  // Bangladesh Specific
  sanitizeBengaliText,
} from './sanitize.util';

export type {
  SanitizationOptions,
} from './sanitize.util';

// ============================================================
// Validator Utilities (validator.util.ts)
// ============================================================
export {
  // UUID Validation
  isUuid,
  isUuidV4,
  isObjectId,

  // String Validation
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

  // Number Validation
  isValidNumber,
  isInteger,
  isPositiveInteger,
  isNonNegativeInteger,
  isInRange,

  // Boolean Validation
  parseBoolean,
  toBooleanString,

  // Type Guards
  isObject,
  isNonEmptyObject,
  isNonEmptyArray,
  isBlank,
  isNotBlank,
  isEmpty,
  isNotEmpty,

  // Password Strength
  isPasswordMinimal,
  isPasswordStrong,

  // Validation Result
  createValidationResult,
} from './validator.util';

export type {
  ValidationResult,
  Match,
} from './validator.util';
