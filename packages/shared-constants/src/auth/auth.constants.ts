/**
 * Authentication Constants
 * Core authentication related constants for the platform
 */

/**
 * Authentication Types
 * Different authentication methods supported by the platform
 */
export const AUTH_TYPES = {
  LOCAL: 'local',
  OAUTH: 'oauth',
  SSO: 'sso',
  JWT: 'jwt',
  API_KEY: 'api_key',
  SESSION: 'session',
} as const;

export type AuthType = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];

/**
 * Authentication Providers
 * Supported OAuth and SSO providers
 */
export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  APPLE: 'apple',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
} as const;

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];

/**
 * Authentication Methods
 * HTTP methods used for authentication endpoints
 */
export const AUTH_METHODS = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  REFRESH: 'refresh',
  VERIFY: 'verify',
  RESET_PASSWORD: 'reset-password',
  FORGOT_PASSWORD: 'forgot-password',
  CHANGE_PASSWORD: 'change-password',
  ENABLE_2FA: 'enable-2fa',
  DISABLE_2FA: 'disable-2fa',
  VERIFY_2FA: 'verify-2fa',
} as const;

export type AuthMethod = (typeof AUTH_METHODS)[keyof typeof AUTH_METHODS];

/**
 * Authentication Routes
 * API routes for authentication endpoints
 */
export const AUTH_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  VERIFY_EMAIL: '/api/auth/verify-email',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  CHANGE_PASSWORD: '/api/auth/change-password',
  TWO_FACTOR: '/api/auth/2fa',
  SOCIAL_LOGIN: '/api/auth/social',
  SSO_LOGIN: '/api/auth/sso',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

/**
 * Authentication Status Codes
 * Custom status codes for authentication operations
 */
export const AUTH_STATUS_CODES = {
  LOGIN_SUCCESS: 'AUTH_001',
  LOGIN_FAILED: 'AUTH_002',
  REGISTER_SUCCESS: 'AUTH_003',
  REGISTER_FAILED: 'AUTH_004',
  LOGOUT_SUCCESS: 'AUTH_005',
  LOGOUT_FAILED: 'AUTH_006',
  TOKEN_REFRESHED: 'AUTH_007',
  TOKEN_EXPIRED: 'AUTH_008',
  TOKEN_INVALID: 'AUTH_009',
  EMAIL_VERIFIED: 'AUTH_010',
  EMAIL_ALREADY_VERIFIED: 'AUTH_011',
  EMAIL_VERIFICATION_FAILED: 'AUTH_012',
  PASSWORD_RESET_SUCCESS: 'AUTH_013',
  PASSWORD_RESET_FAILED: 'AUTH_014',
  PASSWORD_CHANGED: 'AUTH_015',
  TWO_FA_ENABLED: 'AUTH_016',
  TWO_FA_DISABLED: 'AUTH_017',
  TWO_FA_VERIFIED: 'AUTH_018',
  TWO_FA_FAILED: 'AUTH_019',
} as const;

export type AuthStatusCode = (typeof AUTH_STATUS_CODES)[keyof typeof AUTH_STATUS_CODES];

/**
 * Authentication Error Messages
 * Error messages for authentication failures
 */
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account is locked. Please contact support',
  ACCOUNT_INACTIVE: 'Account is inactive. Please verify your email',
  ACCOUNT_DELETED: 'Account has been deleted',
  EMAIL_NOT_VERIFIED: 'Please verify your email address',
  PHONE_NOT_VERIFIED: 'Please verify your phone number',
  TOKEN_EXPIRED: 'Authentication token has expired',
  TOKEN_INVALID: 'Invalid authentication token',
  TOKEN_MISSING: 'Authentication token is missing',
  TOKEN_BLACKLISTED: 'Token has been blacklisted',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  REFRESH_TOKEN_EXPIRED: 'Refresh token has expired',
  SESSION_EXPIRED: 'Session has expired',
  SESSION_INVALID: 'Invalid session',
  DEVICE_NOT_RECOGNIZED: 'Device not recognized',
  IP_BLOCKED: 'IP address is blocked',
  TOO_MANY_ATTEMPTS: 'Too many login attempts. Please try again later',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  PHONE_ALREADY_EXISTS: 'Phone number already registered',
  USERNAME_ALREADY_EXISTS: 'Username already taken',
  WEAK_PASSWORD: 'Password is too weak',
  PASSWORD_MISMATCH: 'Passwords do not match',
  CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect',
  TWO_FA_REQUIRED: 'Two-factor authentication is required',
  TWO_FA_INVALID: 'Invalid two-factor authentication code',
  TWO_FA_EXPIRED: 'Two-factor authentication code has expired',
  SOCIAL_LOGIN_FAILED: 'Social login failed',
  SSO_LOGIN_FAILED: 'SSO login failed',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  PERMISSION_DENIED: 'Permission denied',
  ROLE_NOT_FOUND: 'User role not found',
} as const;

export type AuthError = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS];

/**
 * Authentication Success Messages
 * Success messages for authentication operations
 */
export const AUTH_SUCCESS = {
  LOGIN: 'Login successful',
  REGISTER: 'Registration successful',
  LOGOUT: 'Logout successful',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  PASSWORD_RESET: 'Password reset successful',
  PASSWORD_CHANGED: 'Password changed successfully',
  TWO_FA_ENABLED: 'Two-factor authentication enabled',
  TWO_FA_DISABLED: 'Two-factor authentication disabled',
  TWO_FA_VERIFIED: 'Two-factor authentication verified',
} as const;

export type AuthSuccess = (typeof AUTH_SUCCESS)[keyof typeof AUTH_SUCCESS];

/**
 * Authentication Configuration
 * Default configuration values for authentication
 */
export const AUTH_CONFIG = {
  JWT_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '30d',
  SESSION_EXPIRY: 86400000, // 24 hours in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900000, // 15 minutes in milliseconds
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,
  TOKEN_ALGORITHM: 'HS256' as const,
  TOKEN_ISSUER: 'vubon.com.bd',
  TOKEN_AUDIENCE: 'vubon-platform',
  VERIFICATION_TOKEN_EXPIRY: 3600000, // 1 hour in milliseconds
  RESET_TOKEN_EXPIRY: 3600000, // 1 hour in milliseconds
  TWO_FA_CODE_LENGTH: 6,
  TWO_FA_CODE_EXPIRY: 300000, // 5 minutes in milliseconds
  SESSION_CHECK_INTERVAL: 60000, // 1 minute in milliseconds
} as const;

export type AuthConfig = (typeof AUTH_CONFIG)[keyof typeof AUTH_CONFIG];

/**
 * Authentication Headers
 * HTTP headers used for authentication
 */
export const AUTH_HEADERS = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  X_API_KEY: 'X-API-Key',
  X_SESSION_ID: 'X-Session-ID',
  X_DEVICE_ID: 'X-Device-ID',
  X_USER_AGENT: 'User-Agent',
  X_FORWARDED_FOR: 'X-Forwarded-For',
  COOKIE: 'Cookie',
  SET_COOKIE: 'Set-Cookie',
} as const;

export type AuthHeader = (typeof AUTH_HEADERS)[keyof typeof AUTH_HEADERS];

/**
 * Authentication Cookies
 * Cookie names for authentication
 */
export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
  DEVICE_ID: 'device_id',
  TWO_FA_CODE: 'two_fa_code',
} as const;

export type AuthCookie = (typeof AUTH_COOKIES)[keyof typeof AUTH_COOKIES];

/**
 * Authentication Scopes
 * OAuth scopes for authorization
 */
export const AUTH_SCOPES = {
  READ: 'read',
  WRITE: 'write',
  ADMIN: 'admin',
  USER: 'user',
  VENDOR: 'vendor',
  PROFILE: 'profile',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
  ORDERS: 'orders',
  PAYMENTS: 'payments',
} as const;

export type AuthScope = (typeof AUTH_SCOPES)[keyof typeof AUTH_SCOPES];

/**
 * Helper function to check if authentication type is valid
 */
export function isValidAuthType(type: string): type is AuthType {
  return Object.values(AUTH_TYPES).includes(type as AuthType);
}

/**
 * Helper function to check if provider is valid
 */
export function isValidAuthProvider(provider: string): provider is AuthProvider {
  return Object.values(AUTH_PROVIDERS).includes(provider as AuthProvider);
}

/**
 * Helper function to check if method is valid
 */
export function isValidAuthMethod(method: string): method is AuthMethod {
  return Object.values(AUTH_METHODS).includes(method as AuthMethod);
}
