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
