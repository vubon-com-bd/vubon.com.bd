// ============================================================
// Type Exports for index
// ============================================================

// Options Types
export type {
  AuthOptions,
  LoginOptions,
  MFAOptions,
  RegistrationOptions,
  TokenRefreshOptions,
  LogoutOptions,
  SocialLoginOptions,
  MFAEnableOptions,
} from './auth.service.interface';

// Result Types
export type {
  ServiceResult,
  LoginResult,
  MFAVerificationResult,
  TokenValidationResult,
} from './auth.service.interface';

// Main Service Interface
export type { IAuthService } from './auth.service.interface';

// Service Factory Interface
export type { IAuthServiceFactory } from './auth.service.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

// Options Type Aliases
export type {
  LoginOptions as LoginOptionsType,
  MFAOptions as MFAOptionsType,
  RegistrationOptions as RegistrationOptionsType,
  TokenRefreshOptions as TokenRefreshOptionsType,
  LogoutOptions as LogoutOptionsType,
  SocialLoginOptions as SocialLoginOptionsType,
} from './auth.service.interface';

// Result Type Aliases
export type {
  ServiceResult as ServiceResultType,
  LoginResult as LoginResultType,
  MFAVerificationResult as MFAVerificationResultType,
  TokenValidationResult as TokenValidationResultType,
} from './auth.service.interface';



// ============================================================
// Type Exports for index
// ============================================================

// Core Types (Bangladesh Specific)
export type {
  MobileOperator,
  NetworkType,
  UserRole,
  UserStatus,
  UserTier,
  BangladeshDistrict,
  BangladeshUpazila,
  DeletionReason,
  SuspensionReason,
} from './user.service.interface';

// Device and Filter Types
export type {
  DeviceInfo,
  UserFilters,
} from './user.service.interface';

// Response DTO Types
export type {
  DeleteAccountResponseDto,
  ReactivateAccountResponseDto,
} from './user.service.interface';

// Statistics and Analytics Types
export type {
  UserStatistics,
  RegistrationTrend,
  RetentionMetrics,
  UserTierBenefits,
} from './user.service.interface';

// Bulk Operation Types
export type {
  BulkUserOperationResult,
} from './user.service.interface';

// Export and Options Types
export type {
  UserExportOptions,
  UserExportResult,
  UserDeletionOptions,
  UserSuspensionOptions,
} from './user.service.interface';

// Main Service Interface
export type { UserService } from './user.service.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

// Filter Type Alias
export type {
  UserFilters as UserFiltersType,
} from './user.service.interface';

// Response DTO Type Aliases
export type {
  DeleteAccountResponseDto as DeleteAccountResponseDtoType,
  ReactivateAccountResponseDto as ReactivateAccountResponseDtoType,
} from './user.service.interface';

// Statistics Type Aliases
export type {
  UserStatistics as UserStatisticsType,
  RegistrationTrend as RegistrationTrendType,
  RetentionMetrics as RetentionMetricsType,
  UserTierBenefits as UserTierBenefitsType,
} from './user.service.interface';

// Bulk Operation Type Alias
export type {
  BulkUserOperationResult as BulkUserOperationResultType,
} from './user.service.interface';

// Export Options Type Aliases
export type {
  UserExportOptions as UserExportOptionsType,
  UserExportResult as UserExportResultType,
  UserDeletionOptions as UserDeletionOptionsType,
  UserSuspensionOptions as UserSuspensionOptionsType,
} from './user.service.interface';

// ============================================================
// Constants Exports (for external use)
// ============================================================

export {
  USER_TIERS,
  USER_STATUSES,
  USER_ROLES,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  USER_MOBILE_OPERATORS,
  USER_NETWORK_TYPES,
  USER_DELETION_REASONS,
  USER_SUSPENSION_REASONS,
} from './user.service.interface';


// ============================================================
// Type Exports for index
// ============================================================

// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  SessionFilterOptions,
  SessionStatistics,
  GlobalSessionStatistics,
} from './session.service.interface';

// Enterprise Enhancement Types
export type {
  SessionExtensionResult,
  SessionActivityResult,
  SessionHealthReport,
  AnomalyDetectionResult,
  PredictiveExpiryResult,
  SessionLockResult,
  SessionTransferResult,
  SessionBatchProgress,
  ReplayDetectionResult,
  GeographicDistribution,
  SessionComplianceReport,
  SessionHealthDashboard,
  SessionAlertConfig,
} from './session.service.interface';

// Main Service Interface
export type { SessionService } from './session.service.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  SessionExtensionResult as SessionExtensionResultType,
  SessionActivityResult as SessionActivityResultType,
  SessionHealthReport as SessionHealthReportType,
  AnomalyDetectionResult as AnomalyDetectionResultType,
  PredictiveExpiryResult as PredictiveExpiryResultType,
  SessionLockResult as SessionLockResultType,
  SessionTransferResult as SessionTransferResultType,
  SessionBatchProgress as SessionBatchProgressType,
  ReplayDetectionResult as ReplayDetectionResultType,
  GeographicDistribution as GeographicDistributionType,
  SessionComplianceReport as SessionComplianceReportType,
  SessionHealthDashboard as SessionHealthDashboardType,
  SessionAlertConfig as SessionAlertConfigType,
  SessionFilterOptions as SessionFilterOptionsType,
  SessionStatistics as SessionStatisticsType,
  GlobalSessionStatistics as GlobalSessionStatisticsType,
} from './session.service.interface';

// ============================================================
// Constants Export
// ============================================================

export { SESSION_CONFIG } from './session.service.interface';




// ============================================================
// Re-export all types from audit.service.interface
// ============================================================

// Core Types
export type {
  AuditContext,
  AuditLogEntry,
  AuditQueryFilters,
  AuditStatistics,
  ChangeDetail,
} from './audit.service.interface';

// Enterprise Enhancement Types
export type {
  AuditAnomalyResult,
  AuditDashboardMetrics,
  AuditAlertConfig,
  AuditComplianceReport,
  AuditVisualizationData,
  AuditServiceConfig,
} from './audit.service.interface';

// Main Service Interface
export type { AuditService } from './audit.service.interface';

// Type Alias Exports
export type {
  AuditContext as AuditContextType,
  AuditLogEntry as AuditLogEntryType,
  AuditQueryFilters as AuditQueryFiltersType,
  AuditStatistics as AuditStatisticsType,
  ChangeDetail as ChangeDetailType,
  AuditAnomalyResult as AuditAnomalyResultType,
  AuditDashboardMetrics as AuditDashboardMetricsType,
  AuditAlertConfig as AuditAlertConfigType,
  AuditComplianceReport as AuditComplianceReportType,
  AuditVisualizationData as AuditVisualizationDataType,
  AuditServiceConfig as AuditServiceConfigType,
} from './audit.service.interface';

// Re-export Shared Types
export type {
  AuditAction,
  AuditSeverity,
  AuditExportFormat,
} from './audit.service.interface';

// Constants Export
export { DEFAULT_AUDIT_CONFIG } from './audit.service.interface';


// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  CacheOptions,
  CacheSetOptions,
  CacheMultiGetResult,
  CacheStatistics,
  BulkCacheProgress,
  CacheWarmupConfig,
  DistributedLock,
  CacheTag,
} from './cache.service.interface';

// Main Service Interface
export type { CacheService } from './cache.service.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  CacheOptions as CacheOptionsType,
  CacheSetOptions as CacheSetOptionsType,
  CacheMultiGetResult as CacheMultiGetResultType,
  CacheStatistics as CacheStatisticsType,
  BulkCacheProgress as BulkCacheProgressType,
  CacheWarmupConfig as CacheWarmupConfigType,
  DistributedLock as DistributedLockType,
  CacheTag as CacheTagType,
} from './cache.service.interface';

// ============================================================
// Class Export (CacheKeyBuilder)
// ============================================================

export { CacheKeyBuilder } from './cache.service.interface';


// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  DomainEvent,
  EventHandler,
  EventHandlerOptions,
  EventSubscription,
  SubscriptionStats,
  BatchPublishOptions,
  BatchProgress,
  EventBusStatistics,
  EventStreamQueryOptions,
  CircuitBreakerConfig,
  HandlerRateLimitConfig,
  EventSchemaValidation,
  EventTTLConfig,
  EventSchemaRegistry,
} from './event-bus.interface';

// Main Service Interface
export type { EventBus } from './event-bus.interface';

// Event Classes
export {
  BaseDomainEvent,
  UserRegisteredEvent,
  UserVerifiedEvent,
  UserSuspendedEvent,
  UserActivatedEvent,
  UserProfileUpdatedEvent,
  UserPasswordChangedEvent,
} from './event-bus.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  EventBusStatistics as EventBusStatisticsType,
  EventSubscription as EventSubscriptionType,
  EventHandlerOptions as EventHandlerOptionsType,
  BatchPublishOptions as BatchPublishOptionsType,
  SubscriptionStats as SubscriptionStatsType,
  CircuitBreakerConfig as CircuitBreakerConfigType,
  HandlerRateLimitConfig as HandlerRateLimitConfigType,
  EventSchemaValidation as EventSchemaValidationType,
  EventTTLConfig as EventTTLConfigType,
  BatchProgress as BatchProgressType,
  EventStreamQueryOptions as EventStreamQueryOptionsType,
  EventSchemaRegistry as EventSchemaRegistryType,
} from './event-bus.interface';

export type { EventHandlerType } from './event-bus.interface';


// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  MfaGeneratorOptions,
  TotpSetupOptions,
  SmsOtpSetupOptions,
  WhatsAppOtpSetupOptions,
  ImoOtpSetupOptions,
  VoiceCallOtpSetupOptions,
  BkashPinSetupOptions,
  NagadPinSetupOptions,
  RocketPinSetupOptions,
  WebAuthnSetupOptions,
  BackupCodeOptions,
  RecoveryCodeOptions,
  MfaVerificationOptions,
  MfaDisableOptions,
  MfaMethodListResult,
} from './mfa-generator.interface';

// Main Service Interface
export type { IMfaGeneratorService } from './mfa-generator.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  TotpSetupOptions as TotpSetupOptionsType,
  SmsOtpSetupOptions as SmsOtpSetupOptionsType,
  WhatsAppOtpSetupOptions as WhatsAppOtpSetupOptionsType,
  ImoOtpSetupOptions as ImoOtpSetupOptionsType,
  VoiceCallOtpSetupOptions as VoiceCallOtpSetupOptionsType,
  BkashPinSetupOptions as BkashPinSetupOptionsType,
  NagadPinSetupOptions as NagadPinSetupOptionsType,
  RocketPinSetupOptions as RocketPinSetupOptionsType,
  WebAuthnSetupOptions as WebAuthnSetupOptionsType,
  BackupCodeOptions as BackupCodeOptionsType,
  RecoveryCodeOptions as RecoveryCodeOptionsType,
  MfaVerificationOptions as MfaVerificationOptionsType,
  MfaDisableOptions as MfaDisableOptionsType,
  MfaMethodListResult as MfaMethodListResultType,
} from './mfa-generator.interface';

// ============================================================
// Constants Exports (Default Configurations)
// ============================================================

export {
  DEFAULT_TOTP_CONFIG,
  DEFAULT_BACKUP_CODES_CONFIG,
  DEFAULT_RECOVERY_CODES_CONFIG,
  DEFAULT_WEBAUTHN_CONFIG,
  DEFAULT_SMS_OTP_CONFIG,
  DEFAULT_WHATSAPP_OTP_CONFIG,
  DEFAULT_IMO_OTP_CONFIG,
  DEFAULT_VOICE_OTP_CONFIG,
  DEFAULT_BKASH_PIN_CONFIG,
  DEFAULT_NAGAD_PIN_CONFIG,
  DEFAULT_ROCKET_PIN_CONFIG,
  DEFAULT_MFA_CONFIG,
} from './mfa-generator.interface';



// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  NotificationOptions,
  SendNotificationOptions,
  BulkSendOptions,
  CreateTemplateOptions,
  UpdateTemplateOptions,
  SendNotificationResult,
  BulkSendResult,
  TemplateResult,
  NotificationStatsResult,
  DeliveryStatusResult,
  QuotaStatus,
  RateLimitStatus,
} from './notification.service.interface';

// Main Service Interface
export type { INotificationService } from './notification.service.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  NotificationOptions as NotificationOptionsType,
  SendNotificationOptions as SendNotificationOptionsType,
  BulkSendOptions as BulkSendOptionsType,
  CreateTemplateOptions as CreateTemplateOptionsType,
  UpdateTemplateOptions as UpdateTemplateOptionsType,
  SendNotificationResult as SendNotificationResultType,
  BulkSendResult as BulkSendResultType,
  TemplateResult as TemplateResultType,
  NotificationStatsResult as NotificationStatsResultType,
  DeliveryStatusResult as DeliveryStatusResultType,
  QuotaStatus as QuotaStatusType,
  RateLimitStatus as RateLimitStatusType,
} from './notification.service.interface';

// ============================================================
// Constants Exports (For external use)
// ============================================================

export {
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TTL,
  NOTIFICATION_STATUS,
  NOTIFICATION_CHANNELS,
} from './notification.service.interface';



// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  HashingOptions,
  HashOptions,
  VerifyOptions,
  PasswordStrengthOptions,
  PasswordStrengthResult,
  PasswordExpiryStatus,
  PasswordReuseResult,
} from './password-hasher.interface';

// Main Service Interface
export type { IPasswordHasherService } from './password-hasher.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  HashingOptions as HashingOptionsType,
  HashOptions as HashOptionsType,
  VerifyOptions as VerifyOptionsType,
  PasswordStrengthOptions as PasswordStrengthOptionsType,
  PasswordStrengthResult as PasswordStrengthResultType,
  PasswordExpiryStatus as PasswordExpiryStatusType,
  PasswordReuseResult as PasswordReuseResultType,
} from './password-hasher.interface';



// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  TokenGeneratorOptions,
  JWTGenerationOptions,
  OTPGenerationOptions,
  BackupCodeGenerationOptions,
  APIKeyGenerationOptions,
  MagicLinkGenerationOptions,
  SessionTransferGenerationOptions,
  DeviceTrustGenerationOptions,
  WebAuthnGenerationOptions,
  TokenGenerationResult,
  TokenRefreshResult,
  OTPResult,
  BackupCodeResult,
  APIKeyResult,
  MagicLinkResult,
  WebAuthnRegistrationResult,
} from './token-generator.interface';

// Main Service Interface
export type { ITokenGeneratorService } from './token-generator.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  TokenGeneratorOptions as TokenGeneratorOptionsType,
  JWTGenerationOptions as JWTGenerationOptionsType,
  OTPGenerationOptions as OTPGenerationOptionsType,
  BackupCodeGenerationOptions as BackupCodeGenerationOptionsType,
  APIKeyGenerationOptions as APIKeyGenerationOptionsType,
  MagicLinkGenerationOptions as MagicLinkGenerationOptionsType,
  SessionTransferGenerationOptions as SessionTransferGenerationOptionsType,
  DeviceTrustGenerationOptions as DeviceTrustGenerationOptionsType,
  WebAuthnGenerationOptions as WebAuthnGenerationOptionsType,
  TokenGenerationResult as TokenGenerationResultType,
  TokenRefreshResult as TokenRefreshResultType,
  OTPResult as OTPResultType,
  BackupCodeResult as BackupCodeResultType,
  APIKeyResult as APIKeyResultType,
  MagicLinkResult as MagicLinkResultType,
  WebAuthnRegistrationResult as WebAuthnRegistrationResultType,
} from './token-generator.interface';

// ============================================================
// Constants Exports
// ============================================================

export {
  JWT_CONFIG,
  OTP_CONSTANTS,
  RECOVERY_CODES_CONFIG,
  API_KEY_CONFIG,
  MAGIC_LINK_CONFIG,
  SESSION_TRANSFER_CONFIG,
  DEVICE_TRUST_CONFIG,
  WEBAUTHN_CONFIG,
  TOKEN_GENERATOR_CONFIG,
  TOKEN_CONFIG,
  ENVIRONMENT_TOKEN_CONFIG,
} from './token-generator.interface';


// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  TransactionRunOptions,
  SavepointOptions,
  SagaExecutionOptions,
  TCCOptions,
  OutboxPublishOptions,
  DistributedLockOptions,
  RollbackOptions,
  TransactionRunResult,
  SagaExecutionResult,
  TCCResult,
  OutboxPublishResult,
  DistributedLockResult,
} from './transaction-manager.interface';

// Main Service Interface
export type { ITransactionManagerService } from './transaction-manager.interface';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  TransactionRunOptions as TransactionRunOptionsType,
  SavepointOptions as SavepointOptionsType,
  SagaExecutionOptions as SagaExecutionOptionsType,
  TCCOptions as TCCOptionsType,
  OutboxPublishOptions as OutboxPublishOptionsType,
  DistributedLockOptions as DistributedLockOptionsType,
  RollbackOptions as RollbackOptionsType,
  TransactionRunResult as TransactionRunResultType,
  SagaExecutionResult as SagaExecutionResultType,
  TCCResult as TCCResultType,
  OutboxPublishResult as OutboxPublishResultType,
  DistributedLockResult as DistributedLockResultType,
} from './transaction-manager.interface';
