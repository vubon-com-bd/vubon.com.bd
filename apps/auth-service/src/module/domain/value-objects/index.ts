/**
 * Value Objects - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects
 * 
 * @description
 * All domain value objects are exported from this index.
 * Value Objects are immutable, self-validating domain concepts.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free, pure domain
 */

// ============================================================
// Base Value Object
// ============================================================
export { ValueObject } from './base.vo';
export type { ValueObjectConstructor, ValueObjectComparison } from './base.vo';

// ============================================================
// Core Identity Value Objects
// ============================================================
export { Email } from './email.vo';
export { Phone } from './phone.vo';
export { DeviceId } from './device-id.vo';
export { UserAgent } from './user-agent.vo';
export { IpAddress } from './ip-address.vo';

// ============================================================
// Security Value Objects
// ============================================================
export { Password } from './password.vo';
export { PasswordStrength } from './password.vo';
export type { PasswordValidation, PasswordCharacterSet, PasswordHasher } from './password.vo';

export { OtpCode } from './otp-code.vo';
export { OtpType, OtpPurpose } from './otp-code.vo';
export type { OtpValidation, OtpStatus, OtpRequestConfig } from './otp-code.vo';

export { Token } from './token.vo';
export { TokenType, TokenStatus } from './token.vo';
export type { TokenValidation, TokenMetadata } from './token.vo';

// ============================================================
// Type Guards & Utilities
// ============================================================
export { isEmail, createEmailFromRequest, isValidEmailFormat } from './email.vo';
export { isPhone, phoneFromE164, formatPhoneForSMS, detectBangladeshOperator } from './phone.vo';
export { isDeviceId, createDeviceIdFromRequest, createOrGetDeviceId } from './device-id.vo';
export { isIpAddress, createIpFromRequest } from './ip-address.vo';
export { isPassword, secureCompare } from './password.vo';
export { isOtpCode, createOtpForPurpose } from './otp-code.vo';
export { isToken, createTokenForPurpose, isValidTokenFormat } from './token.vo';
export { isUserAgent, createUserAgentFromRequest, shouldBlockUserAgent } from './user-agent.vo';

// ============================================================
// Re-export Enums and Constants (for convenience)
// ============================================================

// Device ID related
export { 
  DEVICE_ID_CONSTANTS 
} from './device-id.vo';
export type { DeviceIdType, DevicePlatform } from './device-id.vo';

// Email related
export { 
  EMAIL_CONFIG, 
  EMAIL_DOMAINS 
} from './email.vo';
export type { EmailDomainCategory, EmailProvider } from './email.vo';

// Phone related
export { 
  PhoneType, 
  BDOperator, 
  PHONE_CONFIG 
} from './phone.vo';
export type { PhoneComponents } from './phone.vo';

// IP Address related
export { 
  IpCategory, 
  PRIVATE_IP_RANGES 
} from './ip-address.vo';
export type { IpRange } from './ip-address.vo';

// Password related
export { 
  PASSWORD_CONFIG 
} from './password.vo';
export type { EntropyResult } from './password.vo';

// OTP related
export { 
  OTP_CONFIG 
} from './otp-code.vo';

// Token related
export { 
  TOKEN_CONFIG 
} from './token.vo';

// User Agent related
export { 
  DeviceType, 
  BrowserCategory 
} from './user-agent.vo';
export type { BrowserInfo, OSInfo } from './user-agent.vo';
