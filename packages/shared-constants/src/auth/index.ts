/**
 * Authentication constants exports
 * Central export point for all authentication-related constants
 */

export {
  AUTH_COOKIE_NAMES,
  TOKEN_EXPIRY,
  PASSWORD_POLICY,
  USER_STATUS,
  LOGIN_ATTEMPT,
  SESSION_CONFIG,
  REFRESH_TOKEN_CONFIG,
  LOGOUT_SESSION_TYPES,
  LOGOUT_REASONS,
  EMAIL_VERIFICATION_CONFIG,
  PASSWORD_RESET_CONFIG,
  PROFILE_CONFIG,
  REGISTRATION_CONFIG,
  CSRF_CONFIG,
  RATE_LIMIT_CONFIG,
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
  AUTH_ROUTES,
  AUTH_STATUS_CODES,
  AUTH_CONFIG_DEFAULTS,
  PERMISSIONS,
  ROLES,
  ROLE_PERMISSIONS,
  AUTH_SECURITY_HEADERS,
  AUTH_EVENTS,
} from './auth.constants';

export type {
  UserStatus,
  LogoutSessionType,
  LogoutReason,
  AuthErrorMessage,
  AuthSuccessMessage,
  AuthRoute,
  AuthStatusCode,
  JWTClaims,
  SessionData,
  DeviceInfo,
  LoginAttempt,
  TokenPayload,
  EmailVerificationData,
  PasswordResetData,
  AuthConfig,
  Permission,
  Role,
  AuthEvent,
} from './auth.constants';
