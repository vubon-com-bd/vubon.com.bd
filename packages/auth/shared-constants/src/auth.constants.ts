/**
 * Authentication constants for the shared package
 * These constants are used across the auth package and its consumers
 */

export const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
} as const;

export type AuthCookieName = (typeof AUTH_COOKIE_NAMES)[keyof typeof AUTH_COOKIE_NAMES];

export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',
  REFRESH_TOKEN: '7d',
  VERIFICATION_TOKEN: '24h',
  PASSWORD_RESET_TOKEN: '1h',
  SESSION_TIMEOUT: '30d',
} as const;

export type TokenExpiry = (typeof TOKEN_EXPIRY)[keyof typeof TOKEN_EXPIRY];

export const PASSWORD_POLICY = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 72,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true,
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

export type PasswordPolicy = typeof PASSWORD_POLICY;

export const USER_STATUS = {
  PENDING_VERIFICATION: 'pending_verification',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const REGISTRATION = {
  EMAIL_VERIFICATION_REQUIRED: true,
  ALLOWED_DOMAINS: [] as readonly string[],
  MAX_ATTEMPTS: 5,
  RATE_LIMIT_WINDOW: '15m',
} as const;

export type RegistrationConfig = typeof REGISTRATION;

export const VERIFICATION = {
  TOKEN_LENGTH: 32,
  CODE_LENGTH: 6,
  RESEND_COOLDOWN: '60s',
  MAX_RESEND_ATTEMPTS: 3,
} as const;

export type VerificationConfig = typeof VERIFICATION;

export const SESSION = {
  MAX_CONCURRENT_SESSIONS: 5,
  INACTIVITY_TIMEOUT: '30m',
  EXTEND_ON_ACTIVITY: true,
} as const;

export type SessionConfig = typeof SESSION;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account has been locked due to too many failed attempts',
  PENDING_VERIFICATION: 'Please verify your email address before logging in',
  SUSPENDED_ACCOUNT: 'Account has been suspended',
  DELETED_ACCOUNT: 'Account has been deleted',
  TOKEN_EXPIRED: 'Authentication token has expired',
  INVALID_TOKEN: 'Invalid authentication token',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  SESSION_EXPIRED: 'Session has expired',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
} as const;

export type AuthErrorMessage = (typeof AUTH_ERROR_MESSAGES)[keyof typeof AUTH_ERROR_MESSAGES];

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY: '/auth/verify',
  RESET_PASSWORD: '/auth/reset-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  LOGOUT: '/auth/logout',
  SESSION: '/auth/session',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

export const AUTH_HEADERS = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  X_SESSION_ID: 'X-Session-Id',
  X_CSRF_TOKEN: 'X-CSRF-Token',
} as const;

export type AuthHeader = (typeof AUTH_HEADERS)[keyof typeof AUTH_HEADERS];

export const AUTH_STRATEGIES = {
  JWT: 'jwt',
  SESSION: 'session',
  OAUTH2: 'oauth2',
} as const;

export type AuthStrategy = (typeof AUTH_STRATEGIES)[keyof typeof AUTH_STRATEGIES];
