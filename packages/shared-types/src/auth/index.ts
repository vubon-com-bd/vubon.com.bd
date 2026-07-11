/**
 * Shared Types - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-types/index
 *
 * @description
 * Central export point for all TypeScript type contracts across the monorepo.
 * Organized by domain (Auth, Role, Session, etc.) with clear naming to avoid conflicts.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure TypeScript type exports only
 * ✅ Type-safe with complete type exports
 */

// ============================================================
// 1. Account Lock Types
// ============================================================
export type {
  // Core Types
  LockLevel,
  LockLevelConfig,
  LOCKOUT_LEVELS_TYPE,
  LockoutLevelKey,
  LockReason,
  LockStatus,
  LockMetadata,
  LockEscalationEvent,

  // Request/Response Types
  AccountLock,
  AccountLockStatusResponse,
  LockAccountRequest,
  UnlockAccountRequest,
  AccountLockHistoryResponse,
  LockThresholdConfig,
  FailedAttemptEvent,

  // Notification & Audit Types
  LockNotificationType,
  LockNotificationPayload,
  LockAuditLogEntry,

  // Bulk Operation Types
  BulkLockRequest,
  BulkUnlockRequest,
  BulkLockResult,

  // Advanced Types
  AutoUnlockSchedule,
  LockDashboardStats,
  ProgressiveLockoutConfig,
  SmartLockDetectionResult,
  UnusualPattern,
} from './account-lock.types';

// ============================================================
// 2. Device Types
// ============================================================
export type {
  // Core Device Types
  BaseDeviceType,
  DeviceType,
  ExtendedDeviceType,
  BaseOSType,
  OSType,
  ExtendedOSType,
  BaseBrowserType,
  BrowserType,
  ExtendedBrowserType,
  NetworkType,
  MobileOperator,
  DeviceTrustLevel,
  ExtendedTrustLevel,

  // Device Information
  DeviceInfo,
  DeviceFingerprint,
  FingerprintComponentValue,
  FingerprintData,
  TrustedDevice,

  // Request/Response Types
  RegisterDeviceRequest,
  DeviceDTO,
  UpdateDeviceTrustRequest,
  RemoveDeviceRequest,
  DeviceActivityType,
  DeviceActivity,
  LocationInfo,
  DeviceRiskAssessment,
  DeviceRiskFactor,
  RiskIndicator,
  DeviceStatistics,

  // Device Transfer & Pairing
  DeviceSessionTransfer,
  DevicePairing,
  PairedDevicePermission,
  PublicDeviceSession,
  PublicDeviceRestriction,

  // Verification & Webhook
  DeviceVerificationRequest,
  DeviceWebhookEventType,
  DeviceWebhookPayload,
  DeviceFilterOptions,

  // Trust & Security Types
  DeviceTrustDurationValue,
  DeviceTrustDuration,
  DeviceCategory,
  DeviceTypeToCategoryMap,
  BrowserTrustScore,
  BrowserTrustLevels,
  NetworkSecurityScore,
  NetworkSecurityLevels,
  DeviceMetrics,

  // Common Types (from separate files)
  TrustLevel,
  TrustScore,
  TrustLevelConfig,
  RevocationScope,
  RevocationScopeContext,
} from './device.types';

// ============================================================
// 3. Login Attempt Types
// ============================================================
export type {
  // Core Types
  LoginAttemptStatus,
  LoginFailureReason,
  LoginAttempt,
  LocationInfo as LoginLocationInfo,
  LoginAttemptMetadata,

  // Request/Response Types
  CreateLoginAttemptRequest,
  LoginAttemptResponse,
  LoginAttemptDTO,
  DeviceSummary,
  LoginAttemptStatistics,
  LoginHistoryResponse,
  RateLimitStatus,
  RateLimitConfig,
  BlockedIP,
  BlockIPRequest,
  UnblockIPRequest,
  BlockedDevice,

  // Pattern Detection
  SuspiciousPattern,
  MitigationAction,
  SuspiciousPatternType,
  PatternDetectionResult,

  // Alert & Audit
  LoginAlertConfig,
  LoginAlertEvent,
  LoginAttemptFilterOptions,
  LoginAuditLog,
  LoginWebhookEventType,
  LoginWebhookPayload,
  LoginAttemptCleanupConfig,

  // Recovery Types
  LoginRecoveryRequest,
  LoginRecoveryResponse,
  FailedAttemptSummary,
} from './login-attempt.types';

// ============================================================
// 4. MFA Types
// ============================================================
export type {
  // Core MFA Types
  MFAProvider,
  ExtendedMFAProvider,
  MFAStatus,
  ExtendedMFAStatus,
  MFAVerificationType,
  ExtendedMFAVerificationType,

  // MFA Method & Metadata
  MFAMethod,
  MFAMethodMetadata,
  TOTPMetadata,
  BackupCode,
  BackupCodesResponse,
  WebAuthnMetadata,
  WebAuthnRegistrationRequest,
  WebAuthnRegistrationResponse,
  WebAuthnAuthRequest,
  WhatsAppMetadata,
  MFSMetadata,

  // Request/Response Types
  MFASetupRequest,
  MFASetupResponse,
  MFAVerificationRequest,
  MFAVerificationResult,
  MFAStatusResponse,
  MFAMethodDTO,
  DisableMFARequest,
  MFARecoveryRequest,
  MFARecoveryResponse,
  MFAChallengeRequest,
  MFAChallengeResponse,

  // Risk Assessment
  MFARiskAssessment,
  MFARiskFactor,

  // Configuration & Settings
  MFAPreset,
  MFAPresetConfig,
  MFATrustedDevice,
  MFAEventType,
  MFAEvent,
  MFASettings,
  MFAFilterOptions,
  MFAStatistics,
  MFAWebhookEventType,
  MFAWebhookPayload,

  // Utility Types
  MFATypes,
  ExtendedMFAType,
  MFADisableScope,
} from './mfa.types';

// ============================================================
// 5. Permission Types
// ============================================================
export type {
  // Core Permission Types
  PermissionResource,
  ExtendedPermissionResource,
  PermissionAction,
  ExtendedPermissionAction,
  PermissionString,

  // Permission Groups
  UserPermissions,
  RolePermissions,
  PermissionManagementPermissions,
  ProductPermissions,
  CategoryPermissions,
  OrderPermissions,
  PaymentPermissions,
  VendorPermissions,
  DeliveryPermissions,
  MFSPaymentPermissions,

  // Permission Entity
  Permission,
  PermissionGroup,
  RolePermissionAssignment,

  // Request/Response Types
  PermissionCheckRequest,
  PermissionContext,
  PermissionCheckResult,
  PermissionDeniedReason,
  PermissionDTO,
  PermissionTreeNode,
  UserPermissionsResponse,
  BulkPermissionCheckRequest,
  BulkPermissionCheckResult,

  // Permission Management
  PermissionMigration,
  PermissionSyncRequest,
  PermissionSyncResult,
  PermissionCacheInvalidation,
  PermissionStatistics,
  PermissionFilterOptions,
  PermissionEventType,
  PermissionEvent,

  // Advanced Types
  WildcardPermission,
  WildcardMatchResult,
  PermissionValidationResult,
  PermissionDependency,
  PermissionDependencyGraph,
} from './permission.types';

// ============================================================
// 6. Reset Method Types
// ============================================================
export type {
  // Core Reset Method Types
  ResetMethods,
  ResetMethodDisplayName,
  ResetMethodCategory,
  ResetMethodConfig,
  ResetMethodValidation,
  ResetMethodConfigMap,

  // Bangladesh Specific
  BangladeshResetMethod,
} from './reset-method.types';

// ============================================================
// 7. Role Types
// ============================================================
export type {
  // Core Role Types
  Role,
  ExtendedRole,
  RoleHierarchyMap,
  RoleHierarchyValue,
  RoleCategory,
  RoleMetadata,

  // Role Inheritance & Assignment
  RoleInheritance,
  RoleAssignment,
  RoleDTO,
  CreateCustomRoleRequest,
  UpdateRoleRequest,
  DeleteRoleRequest,
  AssignRoleRequest,
  RemoveRoleRequest,
  BulkRoleAssignmentRequest,
  BulkRoleAssignmentResult,
  UserRolesResponse,

  // Validation & Statistics
  RoleValidationResult,
  RoleStatistics,
  RoleFilterOptions,
  RoleComparisonResult,
  RoleEventType,
  RoleEvent,
  SystemRole,
  RoleHierarchyCheckResult,
  RolePermissionSummary,
  RoleAssignmentHistory,
  RoleExportData,
  RoleImportResult,
  AvailableRole,
  UserRole,
} from './role.types';

// ============================================================
// 8. Session Types
// ============================================================
export type {
  // Core Session Types
  SessionStatus,
  ExtendedSessionStatus,
  SessionTokens,
  Session,

  // Session DTOs
  SessionDTO,
  CreateSessionRequest,
  CreateSessionResponse,
  SessionValidationResult,
  SessionError,
  RefreshSessionRequest,
  RefreshSessionResponse,
  TerminateSessionRequest,
  TerminateSessionsOptions,
  TerminateSessionsResult,

  // Session Transfer
  SessionTransferRequest,
  SessionTransferResponse,

  // Session Metadata & Statistics
  SessionMetadata,
  SessionAction,
  SessionStatistics,
  SessionCleanupCriteria,
  SessionCleanupResult,
  SessionFilterOptions,
  SessionWebhookEventType,
  SessionWebhookPayload,
  SessionAlertConfig,

  // Session Heartbeat
  SessionHeartbeatRequest,
  SessionHeartbeatResponse,

  // Bangladesh Specific
  PublicDeviceWarning,

  // ID Types (Branded)
  UserId,
  SessionId,
  DeviceId,
  MFAMethodId,
  TokenId,
  RoleId,
  PermissionId,
  VerificationId,
  AccountLockId,
  LoginAttemptId,
  RefreshTokenId,
  PasswordHistoryId,
  PasswordResetId,
  SocialAccountId,
  EmailVerificationId,
} from './session.types';

// ============================================================
// 9. Social Auth Types
// ============================================================
export type {
  // Core Social Types
  SocialProvider,
  ExtendedSocialProvider,
  SocialProviderCategory,

  // Social Account
  SocialAccount,
  SocialAccountMetadata,
  SocialProviderData,

  // Provider-Specific Data
  GoogleProviderData,
  GitHubProviderData,
  FacebookProviderData,
  AppleProviderData,
  TwitterProviderData,
  LinkedInProviderData,
  MicrosoftProviderData,
  InstagramProviderData,
  TikTokProviderData,
  WhatsAppProviderData,
  ImoProviderData,
  TelegramProviderData,
  MFSProviderData,

  // OAuth Request/Response
  OAuthAuthorizationRequest,
  OAuthAuthorizationResponse,
  OAuthCallbackRequest,
  OAuthCallbackResponse,
  SocialUserInfo,

  // Connect/Disconnect
  ConnectSocialAccountRequest,
  ConnectSocialAccountResponse,
  DisconnectSocialAccountRequest,
  DisconnectSocialAccountResponse,
  SocialAccountDTO,

  // OAuth Configuration
  OAuthProviderConfig,
  OAuthStateData,
  SocialLoginOptions,
  LinkSocialAccountsRequest,
  LinkSocialAccountsResponse,

  // Statistics & Filters
  SocialAuthStatistics,
  SocialAccountFilterOptions,
  SocialAuthEventType,
  SocialAuthEvent,

  // Bangladesh Specific OTP & MFS
  SocialOTPRequest,
  SocialOTPResponse,
  SocialOTPVerificationRequest,
  MFSAuthRequest,
  MFSAuthResponse,

  // UI Configuration
  SocialProviderPriority,
  SocialLoginButtonConfig,
} from './social.types';

// ============================================================
// 10. Token Types
// ============================================================
export type {
  // Core Token Types
  TokenType,
  TokenAlgorithm,
  BaseTokenPayload,

  // Token Payloads
  AccessTokenPayload,
  RefreshTokenPayload,
  VerificationPurpose,
  VerificationTokenPayload,
  MFATokenPayload,
  MagicLinkTokenPayload,
  SessionTransferTokenPayload,
  DeviceTrustTokenPayload,
  MFSProviderPayload,
  WhatsAppOTPPayload,

  // API Key
  APIKeyPayload,

  // Token Entity
  Token,
  TokenMetadata,
  TokenValidationResult,
  TokenError,
  CreateTokenRequest,
  TokenResponse,

  // Token Blacklist
  BlacklistedToken,

  // API Key Management
  CreateAPIKeyRequest,
  APIKeyResponse,
  APIKeyValidationResult,

  // OAuth2 Introspection
  TokenIntrospectionRequest,
  TokenIntrospectionResponse,

  // Token Rotation
  TokenRotationRequest,
  TokenRotationResponse,

  // Statistics & Management
  TokenStatistics,
  TokenCleanupCriteria,
  TokenCleanupResult,
  TokenFilterOptions,
  TokenEventType,
  TokenEvent,

  // Configuration
  JWTConfig,
  APIKeyConfig,
  TokenWebhookEventType,
  TokenWebhookPayload,

  // Passwordless Login
  PasswordlessLoginRequest,
  PasswordlessLoginResponse,
} from './token.types';

// ============================================================
// 11. User Types
// ============================================================
export type {
  // Core User Types
  UserStatus,
  UserVerificationStatus,
  UserTier,
  User,
  UserMetadata,
  UserDTO,
  UserProfileDTO,

  // Request/Response Types
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserFilters,
  UserActivitySummary,
  UserPreferences,
  UserSessionInfo,

  // Password Management
  ChangePasswordRequest,
  ResetPasswordRequest,
  ForgotPasswordRequest,

  // Verification Requests
  VerifyEmailRequest,
  VerifyPhoneRequest,
  SendPhoneOTPRequest,

  // Bulk Operations
  BulkUserOperation,
  BulkUserOperationResult,

  // Export
  UserExportOptions,
  UserExportResult,

  // Bangladesh Specific
  UserAddress,
  UserKYCDocument,
  UserStatistics,
  UserWebhookEventType,
  UserWebhookPayload,
  RegistrationMethod,
  RegistrationSource,
  RegistrationMetadata,
  ResetMethod,

  // Extended Types
  RegistrationTrend,
  DeleteAccountResponse,
  ReactivateAccountResponse,
  BulkOperationProgress,
  BulkOperationResult,
  ExtendedUserFilters,
  ExtendedUserStatistics,
  BulkUserOperationRequest,
} from './user.types';

// ============================================================
// 12. Verification Types
// ============================================================
export type {
  // Core Verification Types
  VerificationType,
  VerificationStatus,
  VerificationMethod,
  Verification,
  VerificationMetadata,

  // Request/Response Types
  CreateVerificationRequest,
  VerifyRequest,
  VerificationResult,
  ResendVerificationRequest,
  ResendVerificationResponse,
  VerificationDTO,

  // Magic Link
  MagicLinkRequest,
  MagicLinkResponse,
  MagicLinkVerification,

  // Email/Phone Change
  EmailChangeRequest,
  EmailChangeResponse,
  EmailChangeVerification,
  PhoneChangeRequest,
  PhoneChangeResponse,

  // Bangladesh Specific
  PhoneVerificationRequest,
  PhoneVerificationResponse,
  WhatsAppVerificationRequest,
  WhatsAppVerificationResponse,
  VoiceVerificationRequest,
  VoiceVerificationResponse,

  // Statistics & Management
  VerificationStatistics,
  VerificationFilterOptions,
  VerificationRateLimit,
  VerificationCleanupCriteria,
  VerificationCleanupResult,
  VerificationWebhookEventType,
  VerificationWebhookPayload,

  // Configuration
  OTPConfig,
  EmailVerificationTemplate,
  SMSVerificationTemplate,
  WhatsAppVerificationTemplate,
  VerificationAuditLog,
  VerificationHealthStatus,
} from './verification.types';

