/**
 * Auth constants module exports
 * Central export point for all authentication-related constants
 */

// Export all auth constants
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
  AUTH_SECURITY_HEADERS,
  AUTH_EVENTS,
} from './auth.constants';

// Export types
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
  AuthEvent,
} from './auth.constants';

// Export role constants
export {
  DEFAULT_ROLES,
  ADMIN_ROLES,
  USER_STATUS as ROLE_USER_STATUS,
  USER_STATUS_MESSAGES,
  PERMISSION_CATEGORIES,
  PERMISSION_OPERATIONS,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  ROLE_DESCRIPTIONS,
  ROLE_COLORS,
  ROLE_PRIORITY,
  ROLE_VALIDATION,
  ROLE_STATUS,
  PERMISSION_VALIDATION,
  ROLE_EVENTS,
  ROLE_ERROR_MESSAGES,
} from './role.constants';

// Export role types
export type {
  DefaultRole,
  AdminRole,
  UserStatus as RoleUserStatus,
  UserStatusMessage,
  PermissionCategory,
  PermissionOperation,
  Permission,
  Role,
  UserRoleAssignment,
  PermissionCheck,
  RoleStatus,
  RoleEvent,
  RoleErrorMessage,
} from './role.constants';

// Export regex constants
export {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
  PHONE_REGEX,
  URL_REGEX,
  IP_REGEX,
  DATE_REGEX,
  CREDIT_CARD_REGEX,
  VALIDATION_REGEX,
  SLUG_REGEX,
  FILE_EXTENSION_REGEX,
  SPECIAL_CHARS_REGEX,
  TEXT_REGEX,
  REGEX_UTILS,
  REGEX,
  ALL_REGEX,
} from './regex.constants';

// Export regex types
export type {
  EmailRegexPattern,
  PasswordRegexPattern,
  UsernameRegexPattern,
  PhoneRegexPattern,
  UrlRegexPattern,
  IpRegexPattern,
  DateRegexPattern,
  CreditCardRegexPattern,
  ValidationRegexPattern,
  SlugRegexPattern,
  FileExtensionRegexPattern,
  SpecialCharsRegexPattern,
  TextRegexPattern,
} from './regex.constants';

// Security all constants
export {
  LOGIN_SECURITY,
  PASSWORD_SECURITY,
  TWO_FACTOR_SECURITY,
  CSRF_SECURITY,
  RATE_LIMIT_SECURITY,
  IP_SECURITY,
  SESSION_SECURITY,
  JWT_SECURITY,
  SECURITY_HEADERS,
  SECURITY_EVENTS,
  SECURITY_LEVELS,
  SECURITY_LEVEL_REQUIREMENTS,
  SECURITY_BREACH_RESPONSE,
  ENCRYPTION_SECURITY,
  AUDIT_SECURITY,
  DEFAULT_SECURITY_CONFIG,
  SECURITY_ERROR_MESSAGES,
  SECURITY_WARNING_MESSAGES,
  SECURITY_NOTIFICATIONS,
} from './security.constants';

// Security types
export type {
  SecurityLevel,
  SecurityConfig,
  SecurityErrorMessage,
  SecurityWarningMessage,
  SecurityNotification,
} from './security.constants';

// HTTP Status constants
export {
  HTTP_STATUS_INFO,
  HTTP_STATUS_SUCCESS,
  HTTP_STATUS_REDIRECTION,
  HTTP_STATUS_CLIENT_ERROR,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS,
  HTTP_STATUS_CATEGORIES,
  HTTP_STATUS_MESSAGES,
  AUTH_STATUS_CODES as AUTH_HTTP_STATUS_CODES,
  API_STATUS_CODES,
  HTTP_STATUS_UTILS,
  ALL_STATUS_CODES,
  HTTP_METHODS,
  HTTP_HEADERS,
} from './http-status.constants';

// HTTP Status types
export type {
  HttpStatusCode,
  HttpStatusMessage,
  HttpStatusCategory,
  HttpStatus,
  HttpMethod,
  HttpHeader,
} from './http-status.constants';

// MFA constants
export {
  MFA_TOTP,
  MFA_BACKUP_CODES,
  MFA_VERIFICATION,
  MFA_RECOVERY,
  MFA_METHODS,
  MFA_SESSION,
  MFA_SECURITY,
  DEFAULT_MFA_CONFIG,
  MFA_ERROR_MESSAGES,
  MFA_SUCCESS_MESSAGES,
  MFA_EVENTS,
  MFA_METHOD_TYPES,
  MFA_STATUS,
  MFA_VERIFICATION_STATUS,
  MFA_CONSTANTS,
  ALL_MFA_CONSTANTS,
} from './mfa.constants';

// MFA types
export type {
  MFAConfig,
  MFAUserData,
  TrustedDevice,
  MFAVerificationSession,
  MFARecoverySession,
  MFATOTPConfig,
  MFABackupCodes,
  MFAVerificationAttempt,
  MFAErrorMessage,
  MFASuccessMessage,
  MFAEvent,
  MFAMethodType,
  MFAStatus,
  MFAVerificationStatus,
} from './mfa.constants';
