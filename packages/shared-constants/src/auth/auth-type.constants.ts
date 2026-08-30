/**
 * Authentication Type Constants
 * Extended authentication type definitions (re-exports from auth.constants)
 *
 * Note: Base AUTH_TYPES, AuthType, and isValidAuthType are exported from auth.constants
 */

/**
 * Authentication Type Labels
 * Human-readable labels for each authentication type
 */
export const AUTH_TYPE_LABELS: Record<string, string> = {
  local: 'Email/Phone & Password',
  oauth: 'OAuth 2.0',
  sso: 'Single Sign-On',
  jwt: 'JWT Token',
  api_key: 'API Key',
  session: 'Session',
  magic_link: 'Magic Link',
  biometric: 'Biometric',
  sms_otp: 'SMS OTP',
  email_otp: 'Email OTP',
} as const;

/**
 * Authentication Type Descriptions
 * Detailed descriptions for each authentication type
 */
export const AUTH_TYPE_DESCRIPTIONS: Record<string, string> = {
  local: 'Traditional authentication using email/phone and password',
  oauth: 'OAuth 2.0 or OpenID Connect protocol based authentication',
  sso: 'Single Sign-On authentication across multiple services',
  jwt: 'JSON Web Token based stateless authentication',
  api_key: 'API key based authentication for service-to-service',
  session: 'Server-side session based authentication',
  magic_link: 'Passwordless authentication via email magic link',
  biometric: 'Biometric authentication (fingerprint, face, etc.)',
  sms_otp: 'One-Time Password sent via SMS',
  email_otp: 'One-Time Password sent via Email',
} as const;

/**
 * Secure Authentication Types
 * Authentication types considered more secure
 */
export const SECURE_AUTH_TYPES: string[] = [
  'oauth',
  'sso',
  'jwt',
  'biometric',
  'magic_link',
] as const;

/**
 * Password-based Authentication Types
 * Authentication types that require a password
 */
export const PASSWORD_AUTH_TYPES: string[] = ['local'] as const;

/**
 * OTP-based Authentication Types
 * Authentication types that use One-Time Password
 */
export const OTP_AUTH_TYPES: string[] = ['sms_otp', 'email_otp'] as const;

/**
 * Passwordless Authentication Types
 * Authentication types that don't require password
 */
export const PASSWORDLESS_AUTH_TYPES: string[] = [
  'magic_link',
  'biometric',
  'sms_otp',
  'email_otp',
  'oauth',
  'sso',
] as const;

/**
 * Token-based Authentication Types
 * Authentication types that use tokens
 */
export const TOKEN_AUTH_TYPES: string[] = ['jwt', 'api_key'] as const;

/**
 * Priority levels for authentication types
 * Higher number = higher priority
 */
export const AUTH_TYPE_PRIORITY: Record<string, number> = {
  local: 1,
  oauth: 2,
  sso: 3,
  jwt: 4,
  api_key: 5,
  session: 6,
  magic_link: 7,
  biometric: 8,
  sms_otp: 9,
  email_otp: 10,
} as const;
