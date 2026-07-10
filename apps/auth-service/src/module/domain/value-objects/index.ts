/**
 * Value Objects - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/value-objects/index
 *
 * @description
 * Central export point for all Value Objects in the domain layer.
 * All Value Objects are immutable, self-validating, and equality-based.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Base Value Object
// ============================================================
export {
  ValueObject,
  ValidationError,
  ConnectionAwareValidationError,
  TemporalEqualityError,
  VALUE_OBJECT_MARKER,
} from './base.vo';

export type {
  ValueObjectConstructor,
  ValueObjectComparison,
  TemporalEqualityConfig,
  ValueObjectMetadata,
  ValidationOptions,
  SerializationOptions,
  ValueObjectEnvironment,
} from './base.vo';

// ============================================================
// Device ID Value Object
// ============================================================
export { DeviceId } from './device-id.vo';

export type {
  DeviceIdValidation,
  DeviceIdType,
  DevicePlatform,
  GenerationOptions,
} from './device-id.vo';

// ============================================================
// Email Value Object
// ============================================================
export { Email, EMAIL_CONFIG, BANGLADESH_SPECIFIC_DOMAINS } from './email.vo';

export type {
  EmailValidation,
  EmailDomainCategory,
  EmailProvider,
} from './email.vo';

// ============================================================
// IP Address Value Object
// ============================================================
export {
  IpAddress,
  IpCategory,
  PRIVATE_IP_RANGES,
  BANGLADESH_ISP_RANGES,
  CLOUD_IP_RANGES,
} from './ip-address.vo';

export type {
  IpValidation,
  IpRange,
} from './ip-address.vo';

// ============================================================
// OTP Code Value Object
// ============================================================
export {
  OtpCode,
  OtpType,
  OtpPurpose,
  OTP_TEMPLATES,
} from './otp-code.vo';

export type {
  OtpValidation,
  OtpStatus,
  RateLimitResult,
  OtpTemplateMessage,
  OtpRequestConfig,
} from './otp-code.vo';

// ============================================================
// Password Value Object
// ============================================================
export {
  Password,
  PasswordStrength,
} from './password.vo';

export type {
  PasswordValidation,
  PasswordCharacterSet,
  EntropyResult,
  PasswordHasher,
} from './password.vo';

// ============================================================
// Phone Value Object
// ============================================================
export {
  Phone,
  PhoneType,
  BDOperator,
  PHONE_CONFIG,
} from './phone.vo';

export type {
  PhoneValidation,
  PhoneComponents,
} from './phone.vo';

// ============================================================
// Token Value Object
// ============================================================
export {
  Token,
  TokenType,
  TokenStatus,
  TOKEN_CONFIG,
} from './token.vo';

export type {
  TokenValidation,
  TokenMetadata,
} from './token.vo';

// ============================================================
// User Agent Value Object
// ============================================================
export {
  UserAgent,
  DeviceType,
  BrowserCategory,
  BotCategory,
} from './user-agent.vo';

export type {
  UserAgentValidation,
  BrowserInfo,
  OSInfo,
} from './user-agent.vo';

// ============================================================
// Utility Functions (Type Guards & Helpers)
// ============================================================
export {
  isDeviceId,
  createDeviceIdFromRequest,
  createOrGetDeviceId,
} from './device-id.vo';

export {
  isEmail,
  createEmailFromRequest,
  isValidEmailFormat,
} from './email.vo';

export {
  isIpAddress,
  createIpFromRequest,
} from './ip-address.vo';

export {
  isOtpCode,
  createOtpForPurpose,
  createOtpForPurposeWithRandom,
} from './otp-code.vo';

export {
  isPassword,
  isPasswordCompromised,
} from './password.vo';

export {
  isPhone,
  phoneFromE164,
  formatPhoneForSMS,
  detectBangladeshOperator,
} from './phone.vo';

export {
  isToken,
  createTokenForPurpose,
  isValidTokenFormat,
} from './token.vo';

export {
  isUserAgent,
  createUserAgentFromRequest,
  shouldBlockUserAgent,
  getUserAgentSummary,
} from './user-agent.vo';

// ============================================================
// Constants Re-exports (for convenience)
// ============================================================
export {
  DEVICE_ID_MIN_LENGTH,
  DEVICE_ID_MAX_LENGTH,
  DEVICE_ID_DEFAULT_FORMAT,
  DEVICE_ID_VERSION,
} from './device-id.vo';

export {
  BANGLADESH_SPECIFIC_DOMAINS as BD_EMAIL_DOMAINS,
  EMAIL_CONFIG as EMAIL_DOMAIN_CONFIG,
} from './email.vo';

export {
  PRIVATE_IP_RANGES as IP_PRIVATE_RANGES,
  BANGLADESH_ISP_RANGES as IP_BD_ISP_RANGES,
  CLOUD_IP_RANGES as IP_CLOUD_RANGES,
} from './ip-address.vo';

export {
  TOKEN_CONFIG as TOKEN_DOMAIN_CONFIG,
} from './token.vo';

export {
  PHONE_CONFIG as PHONE_DOMAIN_CONFIG,
} from './phone.vo';
