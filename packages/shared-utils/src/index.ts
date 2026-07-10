/**
 * Shared Utils - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/index
 *
 * @description
 * Central export point for all utility functions across the monorepo.
 * Organized by domain (crypto, device, formatter, token, validation, async, env, logger).
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// 1. Crypto Utilities (crypto/index.ts)
// ============================================================
export {
  // Encryption
  encrypt,
  decrypt,
  encryptWithUserSalt,
  decryptWithUserSalt,
  encryptCBC,
  decryptCBC,
  xorEncrypt,
  xorDecrypt,
  generateEncryptionKey,
  generateIV,
  getKeyFingerprint,
  isEncryptedFormat,
  isEncryptedCBCFormat,
  generateBangladeshEncryptionKey,
  isSecretStrong,

  // Hashing
  hashPassword,
  hashPasswordSync,
  comparePassword,
  comparePasswordSync,
  isValidBcryptHash,
  checkPasswordStrength,
  sha256,
  sha256Async,
  sha512,
  hash,
  hmac,
  timingSafeEqual,
  calculateEntropy,
  HASH_ALGORITHMS,
  DEFAULT_SALT_ROUNDS,
  MIN_SALT_ROUNDS,
  MAX_SALT_ROUNDS,

  // Random
  generateOtp,
  generateOtps,
  generateOtpNumber,
  generateToken,
  generateRandomString,
  generateAlphanumericToken,
  generateNumericToken,
  generateHexToken,
  generateBase64Token,
  generateBase64UrlToken,
  generateSecureToken,
  generateUuid,
  generateUuids,
  isValidUuid,
  generateRecoveryCodes,
  generateRecoveryCode,
  generateFormattedRecoveryCodes,
  generateNonce,
  generateTimestampNonce,
  generateShortNonce,
  generateSecrets,
  getEntropyQuality,
  generateBangladeshOtp,
  generateWhatsAppOtp,
  generateVoiceCallOtp,
  generateSecurePassword,
  OTP_LENGTH,
  OTP_MIN,
  OTP_MAX,
  UUID_VERSION,
} from './crypto';

export type {
  EncryptionAlgorithm,
  CBCEncryptionAlgorithm,
  EncryptionResult,
  DecryptionResult,
  EncryptedFormat,
  HashAlgorithm,
  PasswordStrengthInfo,
  EntropyResult,
  OTPString,
  TokenString,
  UUIDString,
  NonceString,
  RecoveryCodeString,
  BangladeshOtpString,
  WhatsAppOtpString,
  VoiceCallOtpString,
  GeneratedSecrets,
  SecurePasswordOptions,
} from './crypto';

// ============================================================
// 2. Device Utilities (device/index.ts)
// ============================================================
export {
  // Fingerprint
  generateFingerprint,
  generateFingerprintFromHeaders,
  generateFingerprintFromClient,
  generateVersionedFingerprint,
  generateShortFingerprint,
  compareFingerprints,
  fingerprintSimilarity,
  fingerprintDistance,
  normalizeFingerprintComponents,
  isValidFingerprint,
  getFingerprintAlgorithm,
  getMaxFingerprintLength,
  getMinFingerprintLength,
  FINGERPRINT_HASH_ALGORITHM,
  FINGERPRINT_SEPARATOR,
  DEFAULT_FINGERPRINT_VERSION,
  FINGERPRINT_CONFIG_EXPORTS,

  // IP
  isIPv4,
  isIPv6,
  isIP,
  getIPVersion,
  maskIPv4,
  maskIPv6,
  maskIP,
  normalizeIP,
  extractIPFromHeaders,
  getClientIP,
  isPrivateIP,
  isPublicIP,
  isIPInCIDR,
  getNetworkAddress,

  // User Agent
  parseUserAgent,
  detectDeviceType,
  detectBrowser,
  detectOS,
  detectBrowserVersion,
  detectOSVersion,
  isMobile,
  isTablet,
  isDesktop,
  isBot,
  isFeaturePhone,
  getDeviceInfo,
  getUserAgentSummary,
} from './device';

export type {
  FingerprintComponents,
  IPVersion,
  ParsedUserAgent,
  DeviceInfo,
} from './device';

// ============================================================
// 3. Formatter Utilities (formatter/index.ts)
// ============================================================
export {
  // Currency
  formatCurrency,
  formatCompactCurrency,
  formatNumber as formatCurrencyNumber, // Alias to avoid conflict with number.util
  formatBDT,
  getCurrencySymbol,
  convertCurrency,
  applyDiscount,
  calculateDiscount,
  calculateTaxInclusive,
  calculateTaxAmount,
  formatPercentage as formatCurrencyPercentage, // Alias
  getCurrencyInfo,
  getSupportedCurrencies,
  isCurrencySupported,

  // Date
  formatDate,
  formatTime,
  formatDateTime,
  formatDisplayDate,
  formatDisplayDateTime,
  formatToISO,
  formatRelativeTime,
  formatRelativeDate,
  parseDate,
  safeDate,
  isValidDate,
  isPastDate,
  isFutureDate,
  isDateToday,
  isDateYesterday,
  isDateTomorrow,
  isDateThisWeek,
  isDateThisMonth,
  isDateThisYear,
  diffDays,
  diffHours,
  diffMinutes,
  diffSeconds,
  diffMonths,
  diffYears,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  calculateAge,
  isWithinAgeRange,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DISPLAY_DATE_FORMAT,
  DEFAULT_DISPLAY_DATETIME_FORMAT,
  DEFAULT_TIMEZONE,

  // Number
  formatNumber,
  formatWithCommas,
  formatWithCommasBD,
  formatCompact,
  formatNumberWithOptions,
  round,
  floor,
  ceil,
  calculatePercentage,
  calculateValueFromPercentage,
  formatPercentage as formatNumberPercentage, // Alias
  getPercentageResult,
  randomInt,
  randomFloat,
  isInRange as isNumberInRange,
  clamp,
  isInteger as isNumberInteger,
  isPositive,
  isNegative,
  isZero,
  max,
  min,
  sum,
  average,
  NUMBER_CONFIG_EXPORTS,

  // String
  slugify,
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  toConstantCase,
  toDotCase,
  toPathCase,
  capitalize as capitalizeString, // Alias
  capitalizeWords as capitalizeStringWords, // Alias
  toTitleCase,
  toSentenceCase,
  truncate as truncateString, // Alias
  truncateWords as truncateStringWords, // Alias
  maskString,
  maskEmail,
  maskPhone,
  reverse,
  isBlank as isStringBlank,
  isNotBlank as isStringNotBlank,
} from './formatter';

export type {
  CurrencyCode,
  CurrencyInfo,
  DateFormatString,
  DateFormatType,
  NumberFormat,
  PercentageResult,
  CaseFormat,
} from './formatter';

// ============================================================
// 4. Token Utilities (token/index.ts)
// ============================================================
export {
  // JWT
  signToken,
  signTokenWithClaims,
  signRefreshToken,
  signAccessToken,
  signBangladeshAccessToken,
  verifyToken,
  verifyTokenSafe,
  decodeToken,
  decodeTokenHeader,
  getTokenExpiry,
  getTokenIssuedAt,
  isTokenExpired,
  getTokenRemainingTime,
  getTokenAge,
  getTokenSubject,
  getTokenType,
  getUserIdFromToken,
  getRoleFromToken,
  getSessionIdFromToken,
  isRefreshToken,
  isAccessToken,

  // Refresh Token
  generateRefreshToken,
  generateUrlSafeRefreshToken,
  generateVersionedRefreshToken,
  generateFamilyRefreshToken,
  extractRefreshTokenVersion,
  extractRefreshTokenValue,
  extractTokenFamilyId,
  parseRefreshToken,
  rotateRefreshToken,
  rotateFamilyRefreshToken,
  createTokenFamily,
  isValidRefreshTokenFormat,
  isTokenVersionOlder,
  isTokenVersionNewer,
  generateMobileRefreshToken,
  generateFeaturePhoneRefreshToken,
  isFeaturePhoneCompatible,
  DEFAULT_REFRESH_TOKEN_LENGTH,
  MIN_REFRESH_TOKEN_LENGTH,
  MAX_REFRESH_TOKEN_LENGTH,
} from './token';

export type {
  TokenPayload,
  TokenConfig,
  VerifiedTokenResult,
  RefreshTokenData,
  TokenRotationResult,
  RefreshToken,
  UrlSafeRefreshToken,
  VersionedRefreshToken,
  FamilyRefreshToken,
} from './token';

// ============================================================
// 5. Validation Utilities (validation/index.ts)
// ============================================================
export {
  // Email
  normalizeEmail,
  normalizeEmailWithRules,
  isValidEmail,
  isValidEmailStrict,
  hasMxRecords,
  maskEmail as maskEmailAddress, // Alias
  getEmailDomain,
  getEmailUsername,
  getLocalPart,
  isCommonEmailDomain,
  isBangladeshEmailDomain,
  isEducationalEmail,
  getEmailComponents,

  // Phone
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
  maskPhone as maskPhoneNumber, // Alias
  maskBdPhone,
  detectCountry,
  getPhoneCountry,
  getPhoneComponents,
  DEFAULT_COUNTRY,
  DEFAULT_COUNTRY_CODE,
  BD_MOBILE_OPERATORS,
  BD_MOBILE_REGEX,
  BD_MOBILE_STRICT_REGEX,
  SUPPORTED_COUNTRIES,

  // Sanitize
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
  truncate as truncateString, // Alias
  truncateWords as truncateStringWords, // Alias
  escapeSql,
  hasSqlInjectionPattern,
  normalizeUnicode,
  removeDiacritics,
  normalizeCase,
  toUpperCase,
  capitalize as capitalizeString, // Alias
  capitalizeWords as capitalizeStringWords, // Alias
  sanitize,
  sanitizeBengaliText,

  // Validator
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
  isInteger as isNumberInteger,
  isPositiveInteger,
  isNonNegativeInteger,
  isInRange as isNumberInRange,
  parseBoolean,
  toBooleanString,
  isObject,
  isNonEmptyObject,
  isNonEmptyArray,
  isBlank,
  isNotBlank,
  isEmpty,
  isNotEmpty,
  isPasswordMinimal,
  isPasswordStrong,
  createValidationResult,
} from './validation';

export type {
  EmailComponents,
  PhoneNumber,
  CountryCode,
  PhoneNumberType,
  SupportedCountry,
  PhoneComponents,
  SanitizationOptions,
  ValidationResult,
  Match,
} from './validation';

// ============================================================
// 6. Async Utilities (async/index.ts)
// ============================================================
// ✅ Now exporting from the async folder
export {
  sleep,
  sleepWithAbort,
  sleepWithJitter,
  calculateBackoffDelay,
  sleepWithBackoff,
  sleepWithTimeout,
  sleepUntil,
  sleepWithMonitor,
} from './async';

// ============================================================
// 7. Environment Utilities (env/index.ts)
// ============================================================
// ✅ Now exporting from the env folder
export {
  getEnvironment,
  isDevelopment,
  isProduction,
  isTest,
  isStaging,
  isNonDevelopment,
  clearEnvironmentCache,
  getCachedEnvironment,
  isDevelopmentCached,
  isProductionCached,
  isTestCached,
  isStagingCached,
  isNonDevelopmentCached,
  getEnvVar,
  getEnvVarBoolean,
  getEnvVarNumber,
  getEnvVarArray,
  isFeatureEnabled,
  setFeatureFlag,
  clearFeatureFlags,
  ENV_KEYS,
} from './env';

export type {
  Environment,
} from './env';

// ============================================================
// 8. Logger Utilities (logger/index.ts)
// ============================================================
// ✅ Now exporting from the logger folder
export {
  logger,
  createLogger,
  configureLogger,
  getLoggerConfig,
  setLogLevel,
  logPerformance,
} from './logger';

export type {
  LogLevel,
  Logger,
  LoggerOptions,
  LogEntry,
} from './logger';

// ============================================================
// Default Export (For convenience)
// ============================================================
// Not exporting a default object to maintain tree-shakeability
// Use named imports instead: import { sleep, logger } from '@vubon/shared-utils';
