/**
 * Auth types module exports
 * Central export point for all authentication-related types
 */

// Export user types
export type {
  UserStatus,
  UserRole,
  User,
  UserPreferences,
  CreateUserRequest,
  UpdateProfileRequest,
  DeleteAccountRequest,
  AdminUserListResponse,
  AdminUserFilters,
  AdminUserUpdateRequest,
  AdminCreateUserRequest,
  UserSession,
  UserActivity,
  UserPasswordReset,
  UserEmailVerification,
  UserDevice,
  UserStatistics,
  UserRoleAssignment,
  UserPermissions,
  UserToken,
} from './user.types';

// Export session types
export type {
  SessionStatus,
  DeviceInfo,
  Session,
  SessionListResponse,
  LogoutRequest,
  LogoutResponse,
  RevokeSessionRequest,
  RevokeAllSessionsRequest,
  CreateSessionRequest,
  UpdateSessionRequest,
  SessionValidationResult,
  SessionStatistics,
  SessionEvent,
  SessionFilter,
} from './session.types';

// Export token types
export type {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  TokenRotationResult,
  TokenFamily,
  TokenVerificationResult,
  TokenMetadata,
  TokenBlacklistEntry,
  TokenGenerationOptions,
  TokenConfig,
  TokenStatistics,
  TokenValidationContext,
} from './token.types';

// Export login attempt types
export type {
  LoginAttemptStatus,
  LoginFailureReason,
  LoginAttempt,
  LoginAttemptRequest,
  LoginAttemptResponse,
  LoginAttemptStatistics,
  LoginAttemptFilter,
  LoginAttemptListResponse,
  LoginAttemptSummary,
  LoginAttemptConfig,
  AccountLockStatus,
} from './login-attempt.types';

// Export account lock types
export type {
  LockLevel,
  LockReason,
  AccountLock,
  AccountLockRequest,
  AccountUnlockRequest,
  AccountLockResponse,
  AccountLockStatus as AccountLockStatusType,
  SecurityEventType,
  SecurityEvent,
  SecurityEventFilter,
  SecurityEventListResponse,
  SecurityEventStatistics,
  AccountLockConfig,
  AccountLockHistory,
  AccountLockAudit,
} from './account-lock.types';

// Export verification types
export type {
  EmailVerificationStatus,
  EmailVerification,
  SendVerificationEmailRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  EmailVerificationStatusResponse,
  EmailVerificationConfig,
  EmailVerificationStatistics,
  EmailVerificationFilter,
  EmailVerificationListResponse,
  EmailVerificationEvent,
  EmailVerificationWebhookPayload,
  EmailVerificationTokenGeneration,
  EmailVerificationValidationResult,
} from './verification.types';

// Re-export shared constants types
export type { DefaultRole } from '@vubon/shared-constants';
