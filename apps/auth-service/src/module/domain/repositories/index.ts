/**
 * Repositories - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/index
 * 
 * @description
 * All domain repository interfaces are exported from this index.
 * Repository interfaces define contracts for entity persistence.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free, pure domain contracts
 */

// ============================================================
// Base Repository Interface (Explicit re-exports)
// ============================================================
export {
  // Types
  type PaginationOptions,
  type PaginatedResult,
  type CursorPaginationOptions,
  type CursorPaginatedResult,
  type RepositoryOptions,
  type RepositoryHealthStatus,
  type BulkOperationProgress,
  type BulkProgressCallback,
  type CacheInvalidationHook,
  type EventDispatcher,
  type Specification,
  type TransactionContext,
  type QueryBuilder,
  // Interface
  type BaseRepository,
} from './base.repository.interface';

// ============================================================
// Core User Repositories
// ============================================================

// User Repository (explicit exports to avoid conflicts)
export {
  type UserRepository,
  type UserFilters,
  type UserStatistics,
  type UserActivitySummary,
  type UserEngagementScore,
  type RetentionMetrics,
  type UserLifecycleStages,
  type UserCacheConfig,
  type SoftDeleteCascadeOptions,
  type DataRetentionPolicy,
  type ShardConfig,
  type UserPerformanceMetrics,
  type RegistrationTrend,
  type BulkOperationResult,
  type AdvancedUserRepository,
} from './user.repository.interface';

// Session Repository (explicit exports to avoid conflicts)
export {
  type SessionRepository,
  type SessionStatusResult,
  type SessionStatistics,
  type SessionFilters,
  type SessionExtensionResult,
  type SessionActivityResult,
  type SessionLockResult,
  type SessionBatchProgress,
  type ReplayDetectionResult,
  type GeographicDistribution,
  type SessionHealthReport,
  type AnomalyDetectionResult,
  type PredictiveExpiryResult,
  type CleanupResult as SessionCleanupResult,  // ✅ Renamed to avoid conflict
  type BulkRevokeResult as SessionBulkRevokeResult, // ✅ Renamed
} from './session.repository.interface';

// Refresh Token Repository
export {
  type RefreshTokenRepository,
  type TokenFamilyResult,
  type RefreshTokenStatistics,
  type BulkRevokeResult as TokenBulkRevokeResult, // ✅ Renamed
  type CleanupResult as TokenCleanupResult, // ✅ Renamed
  type TokenHealthScore,
  type SuspiciousTokenThresholds,
  type TokenUsageAnomaly,
  type PredictiveTokenExpiry,
  type TokenReputationScore,
  type GeographicRotationPattern,
  type TokenQuarantineResult,
  type CrossDeviceTokenSyncRequest,
  type TokenRotationBatchResult,
  type SuspiciousTokenActivity,
} from './refresh-token.repository.interface';

// ============================================================
// Security Repositories
// ============================================================

// MFA Repository
export {
  type MFARepository,
  type AdvancedMFARepository,
  type MFAStatusResult,
  type BackupCodesResult,
  type VerificationResult,
  type MFAStatistics,
  type MFAFilters,
  type BulkDisableResult,
  type MFAMethodInfo,
  type MFAMethodMetadata,
  type MFARecoveryConfig,
  type MFAMethodConfig,
  type MFAMethodCompatibility,
  type AdaptiveMFARequest,
  type MFAMethodRecommendation,
  type OfflineMFACode,
  type FailedAttemptAnomaly,
  type CrossDeviceMFASyncRequest,
} from './mfa.repository.interface';

// Account Lock Repository (explicit exports to avoid conflicts)
export {
  type AccountLockRepository,
  type LockStatusResult,
  type FailureCountResult,
  type BulkUnlockResult,
  type AccountLockStatistics,
  type AccountLockFilters,
  type LockHistoryEntry,
  type ProgressiveLockConfig,
  type EmergencyUnlockAudit,
  type LockAnomalyResult,
  type LockPredictionResult,
  type LockMonitoringAlert,
  type ComplianceReport as LockComplianceReport, // ✅ Renamed to avoid conflict
} from './account-lock.repository.interface';

// Password History Repository
export {
  type PasswordHistoryRepository,
  type PasswordHistoryStatistics,
  type PasswordHistoryFilters,
  type PasswordReuseResult,
  type PasswordExpiryStatus,
  type PasswordChangeRecommendation,
  type BulkDeleteResult as PasswordBulkDeleteResult, // ✅ Renamed
  type PasswordHealthScore,
  type ExpiryNotification,
  type BatchImportResult,
  type BreachDetectionResult,
  type PasswordStrengthTrend,
  type UserExpirySegment,
  type PasswordChangeAnomaly,
  type ComplianceReport as PasswordComplianceReport, // ✅ Renamed
  type AuditExportResult,
} from './password-history.repository.interface';

// Password Reset Repository
export {
  type PasswordResetRepository,
  type PasswordResetFilters,
  type PasswordResetStatistics,
  type RateLimitStatus as ResetRateLimitStatus, // ✅ Renamed to avoid conflict
  type BulkDeleteResult as ResetBulkDeleteResult, // ✅ Renamed
  type TokenValidationResult,
  type ResetFraudPrediction,
  type ResetAnomalyResult,
  type GeographicResetPattern,
  type ResetBatchProgress,
  type ChannelDeliveryStatus,
  type ResetABTestVariant,
  type ResetComplianceReport,
  type ResetHealthDashboard,
  type SmartCooldownConfig,
} from './password-reset.repository.interface';

// ============================================================
// Verification Repository
// ============================================================
export {
  type EmailVerificationRepository,
  type EmailVerificationStatistics,
  type EmailVerificationFilters,
  type BulkOperationResult as EmailBulkOperationResult, // ✅ Renamed to avoid conflict
  type VerificationRateResult,
  type VerificationDashboard,
  type RetryConfig,
  type RetryQueueItem,
  type SuspiciousPatternResult,
  type VerificationPrediction,
  type ReturnPathValidation,
  type QuarantineEntry,
  type PerformanceMetrics,
  type RateLimitStatus as EmailRateLimitStatus, // ✅ Renamed to avoid conflict
  type ABTestVariant,
} from './email-verification.repository.interface';

// ============================================================
// Social Repository
// ============================================================
export {
  type SocialAccountRepository,
  type ProviderLinkingResult,
  type ProviderStatistics,
  type SocialAccountStatistics,
  type BulkUnlinkResult,
  type SocialAccountFilters,
  type SocialAccountMergeResult,
  type SocialAnomalyDetectionResult,
  type TokenExpiryNotificationResult,
  type ProviderHealthStatus,
  type AccountConflictResolution,
  type ConsentRefreshReminder,
  type ProviderDeprecationPlan,
  type OAuthWebhookDelivery,
  type SocialAccountSyncRequest,
  type GeoLocationRecommendation,
} from './social-account.repository.interface';
