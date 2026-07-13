/**
 * Auth Types - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure TypeScript type exports only
 */

// ============================================================
// Auth Domain Types (Selective export to avoid conflicts)
// ============================================================
export {
  // User Types
  type RegistrationTrend,
  type DeleteAccountResponse,
  type ReactivateAccountResponse,
  type BulkOperationProgress,
  type BulkOperationResult,
  type ExtendedUserFilters,
  type ExtendedUserStatistics,
  type BulkUserOperationRequest,
  type RegistrationMethod,
  type RegistrationSource,
  type RegistrationMetadata,
  type UserStatus,
  type UserVerificationStatus,
  type UserTier,
  type User,
  type UserMetadata,
  type UserDTO,
  type UserProfileDTO,
  type CreateUserRequest,
  type UpdateUserRequest,
  type UserListResponse,
  type UserFilters,
  type UserActivitySummary,
  type UserPreferences,
  type UserSessionInfo,
  type ChangePasswordRequest,
  type ResetPasswordRequest,
  type ForgotPasswordRequest,
  type VerifyEmailRequest,
  type VerifyPhoneRequest,
  type SendPhoneOTPRequest,
  type BulkUserOperation,
  type BulkUserOperationResult,
  type UserExportOptions,
  type UserExportResult,
  type UserAddress,
  type UserKYCDocument,
  type UserStatistics,
  type UserWebhookEventType,
  type UserWebhookPayload,
  
  // Session Types
  type SessionStatus,
  type ExtendedSessionStatus,
  type SessionTokens,
  type Session,
  type SessionDTO,
  type CreateSessionRequest,
  type CreateSessionResponse,
  type SessionValidationResult,
  type SessionError,
  type RefreshSessionRequest,
  type RefreshSessionResponse,
  type TerminateSessionRequest,
  type TerminateSessionsOptions,
  type TerminateSessionsResult,
  type SessionTransferRequest,
  type SessionTransferResponse,
  type SessionMetadata,
  type SessionAction,
  type SessionStatistics,
  type SessionCleanupCriteria,
  type SessionCleanupResult,
  type SessionFilterOptions,
  type SessionWebhookEventType,
  type SessionWebhookPayload,
  type SessionAlertConfig,
  type SessionHeartbeatRequest,
  type SessionHeartbeatResponse,
  type PublicDeviceWarning,
  type UserId,
  type SessionId,
  type DeviceId,
  type TokenId,
  type RoleId,
  type PermissionId,
  // MFA IDs
  type MFAMethodId,
  // Verification IDs
  type VerificationId,
  type EmailVerificationId,
  // Security IDs
  type AccountLockId,
  type LoginAttemptId,
  // Token IDs
  type RefreshTokenId,
  // History IDs
  type PasswordHistoryId,
  type PasswordResetId,
  // Social IDs
  type SocialAccountId,
  
  // Token Types
  type TokenType,
  type TokenAlgorithm,
  type BaseTokenPayload,
  type AccessTokenPayload,
  type RefreshTokenPayload,
  type VerificationPurpose,
  type VerificationTokenPayload,
  type MFATokenPayload,
  type MagicLinkTokenPayload,
  type SessionTransferTokenPayload,
  type DeviceTrustTokenPayload,
  type MFSProviderPayload,
  type WhatsAppOTPPayload,
  type APIKeyPayload,
  type Token,
  type TokenMetadata,
  type TokenValidationResult,
  type TokenError,
  type CreateTokenRequest,
  type TokenResponse,
  type BlacklistedToken,
  type CreateAPIKeyRequest,
  type APIKeyResponse,
  type APIKeyValidationResult,
  type TokenIntrospectionRequest,
  type TokenIntrospectionResponse,
  type TokenRotationRequest,
  type TokenRotationResponse,
  type TokenStatistics,
  
  // Role Types
  type Role,
  type ExtendedRole,
  type UserRole,
  type RoleHierarchyMap,
  type RoleHierarchyValue,
  type RoleCategory,
  type RoleMetadata,
  type RoleInheritance,
  type RoleAssignment,
  type RoleDTO,
  type CreateCustomRoleRequest,
  type UpdateRoleRequest,
  type DeleteRoleRequest,
  type AssignRoleRequest,
  type RemoveRoleRequest,
  type BulkRoleAssignmentRequest,
  type BulkRoleAssignmentResult,
  type UserRolesResponse,
  type RoleValidationResult,
  type RoleStatistics,
  type RoleFilterOptions,
  type RoleComparisonResult,
  type RoleEventType,
  type RoleEvent,
  type SystemRole,
  type RoleHierarchyCheckResult,
  type RolePermissionSummary,
  type RoleAssignmentHistory,
  type RoleExportData,
  type RoleImportResult,
  type AvailableRole,
  
  // Permission Types
  type PermissionResource,
  type ExtendedPermissionResource,
  type PermissionAction,
  type ExtendedPermissionAction,
  type PermissionString,
  type UserPermissions,
  type RolePermissions,
  type PermissionManagementPermissions,
  type ProductPermissions,
  type CategoryPermissions,
  type OrderPermissions,
  type PaymentPermissions,
  type VendorPermissions,
  type DeliveryPermissions,
  type MFSPaymentPermissions,
  type Permission,
  type PermissionGroup,
  type RolePermissionAssignment,
  type PermissionCheckRequest,
  type PermissionContext,
  type PermissionCheckResult,
  type PermissionDeniedReason,
  type PermissionDTO,
  type PermissionTreeNode,
  type UserPermissionsResponse,
  type BulkPermissionCheckRequest,
  type BulkPermissionCheckResult,
  type PermissionMigration,
  type PermissionSyncRequest,
  type PermissionSyncResult,
  type PermissionCacheInvalidation,
  type PermissionStatistics,
  type PermissionFilterOptions,
  type PermissionEventType,
  type PermissionEvent,
  type WildcardPermission,
  type WildcardMatchResult,
  type PermissionValidationResult,
  type PermissionDependency,
  type PermissionDependencyGraph,
  
  // MFA Types
  type MFATypes,
  type MFAProvider,
  type ExtendedMFAProvider,
  type MFAStatus,
  type ExtendedMFAStatus,
  type MFAVerificationType,
  type ExtendedMFAVerificationType,
  type MFAMethod,
  type MFAMethodMetadata,
  type TOTPMetadata,
  type BackupCode,
  type BackupCodesResponse,
  type WebAuthnMetadata,
  type WebAuthnRegistrationRequest,
  type WebAuthnRegistrationResponse,
  type WebAuthnAuthRequest,
  type WhatsAppMetadata,
  type MFSMetadata,
  type MFASetupRequest,
  type MFASetupResponse,
  type MFAVerificationRequest,
  type MFAVerificationResult,
  type MFAStatusResponse,
  type MFAMethodDTO,
  type DisableMFARequest,
  type MFARecoveryRequest,
  type MFARecoveryResponse,
  type MFAChallengeRequest,
  type MFAChallengeResponse,
  type MFARiskAssessment,
  type MFARiskFactor,
  type MFAPreset,
  type MFAPresetConfig,
  type MFATrustedDevice,
  type MFAEventType,
  type MFAEvent,
  type MFADisableScope,
  type MFASettings,
  type MFAFilterOptions,
  type MFAStatistics,
  type MFAWebhookEventType,
  type MFAWebhookPayload,
  
  // Device Types (excluding LocationInfo to avoid conflict)
  type BaseDeviceType,
  type DeviceType,
  type ExtendedDeviceType,
  type BaseOSType,
  type OSType,
  type ExtendedOSType,
  type BaseBrowserType,
  type BrowserType,
  type ExtendedBrowserType,
  type NetworkType,
  type MobileOperator,
  type DeviceTrustLevel,
  type ExtendedTrustLevel,
  type DeviceInfo,
  type FingerprintComponentValue,
  type DeviceFingerprint,
  type FingerprintData,
  type TrustedDevice,
  type RegisterDeviceRequest,
  type DeviceDTO,
  type UpdateDeviceTrustRequest,
  type RemoveDeviceRequest,
  type DeviceActivityType,
  type DeviceActivity,
  type DeviceRiskAssessment,
  type DeviceRiskFactor,
  type RiskIndicator,
  type DeviceStatistics,
  type DeviceSessionTransfer,
  type DevicePairing,
  type PairedDevicePermission,
  type PublicDeviceSession,
  type PublicDeviceRestriction,
  type DeviceVerificationRequest,
  type DeviceWebhookEventType,
  type DeviceWebhookPayload,
  type DeviceFilterOptions,
  type DeviceTrustDurationValue,
  type DeviceTrustDuration,
  type DeviceCategory,
  type DeviceTypeToCategoryMap,
  type BrowserTrustScore,
  type BrowserTrustLevels,
  type NetworkSecurityScore,
  type NetworkSecurityLevels,
  type DeviceMetrics,
  type TrustLevel,
  type TrustScore,
  type TrustLevelConfig,
  type RevocationScope,
  type RevocationScopeContext,
  
  // Verification Types
  type VerificationType,
  type VerificationStatus,
  type VerificationMethod,
  type Verification,
  type VerificationMetadata,
  type CreateVerificationRequest,
  type VerifyRequest,
  type VerificationResult,
  type ResendVerificationRequest,
  type ResendVerificationResponse,
  type VerificationDTO,
  type MagicLinkRequest,
  type MagicLinkResponse,
  type MagicLinkVerification,
  type EmailChangeRequest,
  type EmailChangeResponse,
  type EmailChangeVerification,
  type PhoneChangeRequest,
  type PhoneChangeResponse,
  type PhoneVerificationRequest,
  type PhoneVerificationResponse,
  type WhatsAppVerificationRequest,
  type WhatsAppVerificationResponse,
  type VoiceVerificationRequest,
  type VoiceVerificationResponse,
  type VerificationStatistics,
  type VerificationFilterOptions,
  type VerificationRateLimit,
  type VerificationCleanupCriteria,
  type VerificationCleanupResult,
  type VerificationWebhookEventType,
  type VerificationWebhookPayload,
  type OTPConfig,
  type EmailVerificationTemplate,
  type SMSVerificationTemplate,
  type WhatsAppVerificationTemplate,
  type VerificationAuditLog,
  type VerificationHealthStatus,
  
  // Account Lock Types
  type LockReason,
  type LockStatus,
  type LockLevel,
  type LockLevelConfig,
  type AccountLock,
  type LockMetadata,
  type LockEscalationEvent,
  type AccountLockStatusResponse,
  type LockAccountRequest,
  type UnlockAccountRequest,
  type AccountLockHistoryResponse,
  type LockThresholdConfig,
  type FailedAttemptEvent,
  type LockNotificationType,
  type LockNotificationPayload,
  type LockAuditLogEntry,
  type BulkLockRequest,
  type BulkUnlockRequest,
  type BulkLockResult,
  type AutoUnlockSchedule,
  type LockDashboardStats,
  type ProgressiveLockoutConfig,
  type SmartLockDetectionResult,
  type UnusualPattern,
  
  // Login Attempt Types
  type LoginAttemptStatus,
  type LoginFailureReason,
  type LoginAttempt,
  type LocationInfo as AuthLocationInfo,
  type LoginAttemptMetadata,
  type CreateLoginAttemptRequest,
  type LoginAttemptResponse,
  type LoginAttemptDTO,
  type DeviceSummary,
  type LoginAttemptStatistics,
  type LoginHistoryResponse,
  type RateLimitConfig as AuthRateLimitConfig,
  type BlockedIP,
  type BlockIPRequest,
  type UnblockIPRequest,
  type BlockedDevice,
  type SuspiciousPattern,
  type MitigationAction,
  type SuspiciousPatternType,
  type PatternDetectionResult,
  type LoginAlertConfig,
  type LoginAlertEvent,
  type LoginAttemptFilterOptions,
  type LoginAuditLog,
  type LoginWebhookEventType,
  type LoginWebhookPayload,
  type LoginAttemptCleanupConfig,
  type LoginRecoveryRequest,
  type LoginRecoveryResponse,
  type FailedAttemptSummary,
  
type ResetMethod,
  type ResetMethodDisplayName,
  type ResetMethodCategory,
  type ResetMethodConfig,
  type ResetMethodValidation,
  type ResetMethodConfigMap,
  type BangladeshResetMethod,
  
  // Social Types
  type SocialProvider,
  type ExtendedSocialProvider,
  type SocialProviderCategory,
  type SocialAccount,
  type SocialAccountMetadata,
  type SocialProviderData,
  type GoogleProviderData,
  type GitHubProviderData,
  type FacebookProviderData,
  type AppleProviderData,
  type TwitterProviderData,
  type LinkedInProviderData,
  type MicrosoftProviderData,
  type InstagramProviderData,
  type TikTokProviderData,
  type WhatsAppProviderData,
  type ImoProviderData,
  type TelegramProviderData,
  type MFSProviderData,
  type OAuthAuthorizationRequest,
  type OAuthAuthorizationResponse,
  type OAuthCallbackRequest,
  type OAuthCallbackResponse,
  type SocialUserInfo,
  type ConnectSocialAccountRequest,
  type ConnectSocialAccountResponse,
  type DisconnectSocialAccountRequest,
  type DisconnectSocialAccountResponse,
  type SocialAccountDTO,
  type OAuthProviderConfig,
  type OAuthStateData,
  type SocialLoginOptions,
  type LinkSocialAccountsRequest,
  type LinkSocialAccountsResponse,
  type SocialAuthStatistics,
  type SocialAccountFilterOptions,
  type SocialAuthEventType,
  type SocialAuthEvent,
  type SocialOTPRequest,
  type SocialOTPResponse,
  type SocialOTPVerificationRequest,
  type MFSAuthRequest,
  type MFSAuthResponse,
  type SocialProviderPriority,
  type SocialLoginButtonConfig,
} from './auth';

// ============================================================
// Common Utility Types (Selective export to avoid conflicts)
// ============================================================
export {
  // API Types
  type ApiResponse,
  type ApiErrorResponse,
  type PaginatedApiResponse,
  type ApiErrorCode,
  type ErrorCodeMapping,
  type ValidationErrorDetail,
  type ValidationErrorResponse,
  type ApiRequestOptions,
  type RequestCache,
  type HttpMethod,
  type ApiEndpoint,
  type RateLimitConfig as CommonRateLimitConfig,
  type ApiHealthStatus,
  type ApiMetrics,
  type WebSocketMessage,
  type WebSocketMessageType,
  type WebSocketAuthMessage,
  type WebSocketSubscribeMessage,
  type SSEMessage,
  type SSEEventType,
  type ApiVersionInfo,
  type ApiCorsConfig,
  type RequestContext,
  type ApiCacheConfig,
  type ApiWebhookPayload,
  type ApiWebhookDeliveryResult,
  type ApiRetryConfig,
  type ApiCircuitBreakerConfig,
  type ApiCircuitBreakerState,
  type LogoutScope,
  
  
  // Audit Types
  type AuditExportFormat,
  type AuditAction,
  type AuditSeverity,
  type AuditResource,
  type AuditLog,
  type SupportedLanguage,
  type AuditChange,
  type AuditMetadata,
  type CreateAuditLogRequest,
  type AuditLogFilters,
  type AuditLogDTO,
  type AuditStatistics,
  type AuditRetentionPolicy,
  type AuditExportRequest,
  type AuditExportResponse,
  type AuditCleanupResult,
  type AuditWebhookEvent,
  type AuditSearchResult,
  type AuditComplianceReport,
  type AuditSource, 
  type AuditEntityType,
  

  
  // SEO Types
  type MetaTag,
  type OpenGraphTags,
  type OgType,
  type TwitterCardTags,
  type TwitterCardType,
  type StructuredData,
  type ProductStructuredData,
  type OfferStructuredData,
  type OfferAvailability,
  type OfferItemCondition,
  type ArticleStructuredData,
  type BreadcrumbStructuredData,
  type OrganizationStructuredData,
  type PersonStructuredData,
  type ReviewStructuredData,
  type FAQStructuredData,
  type HowToStructuredData,
  type LocalBusinessStructuredData,
  type MerchantStructuredData,
  type SEOMetadata,
  type RobotDirective,
  type SitemapEntry,
  type ChangeFrequency,
  type SitemapVideo,
  type SEOAnalysisResult,
  type SEOIssue,
  type ProductSEOSettings,
  type CategorySEOSettings,
  type PageSEOSettings,
  type RobotsTxtConfig,
  type SEOPerformanceMetrics,
  
  // Location Types
  type LocationInfo,
  type Coordinates,
  type GeoLocation,
  type Division,
  type District,
  type Upazila,
  type Union,
  type Ward,
  type Address,
  type DeliveryZone,
  type DeliveryCoverageResult,
  type UserLocationHistory,
  type LocationChangeResult,
  type BangladeshDivisionName,
  type BangladeshDivisionNameBn,
  type LocationFilterOptions,
  type IPGeolocationResponse,
} from './common';

// ============================================================
// Value Object Types (Enterprise Grade)
// ============================================================
export type {
  // Core Value Object Types
  ValueObjectComparison,
  TemporalEqualityConfig,
  
  // Metadata and Snapshot Types
  ValueObjectMetadata,
  ValueObjectSnapshot,
  
  // Validation Types
  ValidationErrorCode,
  ValidationResult,
  
  // Serialization Types
  ValueObjectSerializationOptions,
  ValueObjectDeserializationOptions,
  
  // Performance and Optimization Types
  EqualityCacheConfig,
  ValueObjectPerformanceMetrics,
  
  // Domain-Specific Value Object Types
  EmailValueObject,
  PhoneValueObject,
  DeviceIdValueObject,
  
  // Utility Types
  ValueObjectConstructor,
  ValueObjectPredicate,
  ValueObjectTransformer,
  ValueObjectFactory,
  
  // Error Types
  ValueObjectError,
  ValueObjectErrorFactory,
} from './common/value-object.types';

// ============================================================
// ✅ ENTERPRISE: Domain Event Types (Base)
// ============================================================
export {
  // Core Domain Event Types
  type DomainEvent,
  type DomainEventHandler,
  type DomainEventPublisher,
  type EventStore,
  type EventSourcingUtils,
  type EventTypeRegistry,
  type EventVersionMigration,
  type EventVersionMigrator,
  type EventEnvelope,
  type EventType,  
  // Event Constants
  EVENT_TYPES,
  
  // Utility Functions
  isValidEventType,
  getEventCategory,
  getEventAction,
} from './common/domain-event.types';


// ============================================================
// ✅ ENTERPRISE: Rate Limit Types (New)
// ============================================================
export {
  // Rate Limit Enums
  RateLimitSeverity,
  RateLimitScope,
  RateLimitPolicy,
  RateLimitViolationType,
  RateLimitErrorCode,
  
  // Rate Limit Types
  type RateLimitWindow,
  type RateLimitConfig,
  type EndpointRateLimitConfig,
  type TierRateLimitConfig,
  type DistrictRateLimitConfig,
  type RateLimitStatus,
  type DetailedRateLimitStatus,
  type RateLimitHeaders,
  type RateLimitResponse,
  type RateLimitViolation,
  type RateLimitAnalytics,
  type ServiceRateLimitConfig,
  
  // Rate Limit DTOs
  RateLimitMetadataDto,
  RateLimitCheckDto,
  RateLimitCheckResponseDto,
  
  // Default Configurations
  DEFAULT_RATE_LIMITS,
} from './common/rate-limit.types';


// ============================================================
// ✅ ENTERPRISE: Client Info Types (New - Centralized)
// ============================================================
export {
  // Client Info Types
  type authNetworkType,
  type DevicePlatform,
  type authDeviceTrustLevel,
  type ClientInfo,
  type ClientInfoWithContext,
  type ClientInfoBuilder,
  type ClientInfoValidation,
  type ClientInfoValidator,
  type ClientInfoFormatter,
  type BangladeshDistrict,
  
  // Constants
  DEFAULT_CLIENT_INFO,
  BANGLADESH_DISTRICTS,
  
  // Type Guards
  isClientInfo,
  isNetworkType,
  isDevicePlatform,
} from './common/client-info.types';

// Core Cache Types
 export {
type CacheKey,
  type CacheEntry,
  type CacheStatus,
  type CacheTier,
  type CacheOperation,
  type CacheResult,
  type CacheSetResult,
  type CacheDeleteResult,
  type CacheClearResult,
  type CacheMultiGetResult,
  
  // Cache Options
  type CacheOptions,
  type CacheGetOptions,
  type CacheSetOptions,
  type CacheDeleteOptions,
  type CacheInvalidateOptions,
  type CacheClearOptions,
  type CacheBulkGetOptions,
  type ReadThroughStrategy,
  type WriteThroughStrategy,
  type StaleWhileRevalidateConfig,
  type StampedeProtectionConfig,
  type CacheWarmingConfig,
  type CacheCompressionConfig,
  type CacheMetricsConfig,
  
  // Cache Statistics & Monitoring
  type CacheStatistics,
  type CacheHealthStatus,
  type CachePerformanceMetrics,
  type CacheEvent,
  type CacheEventType,
  type CacheServiceConfig,
  
  // Cache Dependency & Invalidation
  type CacheDependency,
  type InvalidationPattern,
  
  // Cache Builder & Factory
  type CacheKeyBuilder,
  type CacheValueTransformer,
  type CacheKeyValidator,
  type CacheHook,
  type CacheInterceptor,
  
  // Cache Configuration
  type CacheConfig,
  type CacheTierConfig,
  type CachePolicy,
  type CacheEvictionPolicy,
  type CacheWarmingPolicy,
  type CacheInvalidationPolicy,
  
  // Cache Compression
  type CompressionLevel,
  type CompressionStrategy,
  
  // Cache Utilities
  type CacheNamespace,
  type CacheTag,
  type CacheVersion,
  
  // Bangladesh Specific
  type NetworkAwareCacheOptions,
  type AdaptiveCacheConfig,
} from './common/cache.types';


// ============================================================
// ✅ ENTERPRISE: Advanced Event Types (New)
// ============================================================
export {
  // Core Event Types
  type BaseEvent,
  type EventMetadata,
  type EventPayload,
  type EventHandlerResult,
  type EventHandler,
  type EventMiddleware,
  type EventSubscriber,
  type EventPublisher,
  type EventBus,
  type EventValidator,
  type StoredEvent,
  type EventValidationResult,
  
  // Event Type Guards
  isEventType,
  isBaseEvent,
  
  // Domain Event Types
  type UserRegisteredEvent,
  type UserLoggedInEvent,
  type UserLoggedOutEvent,
  type PasswordChangedEvent,
  type PasswordResetEvent,
  type MFAEnabledEvent,
  type MFAVerificationEvent,
  type UserCreatedEvent,
  type UserUpdatedEvent,
  type UserRoleChangedEvent,
  type UserTierUpgradedEvent,
  type UserEmailChangedEvent,
  type UserPhoneChangedEvent,
  type UserKYCVerifiedEvent,
  type SessionCreatedEvent,
  type SessionExtendedEvent,
  type SessionRevokedEvent,
  type SessionExpiredEvent,
  type SessionTransferredEvent,
  type DeviceRegisteredEvent,
  type DeviceTrustedEvent,
  type DeviceBlockedEvent,
  type PaymentInitiatedEvent,
  type PaymentSuccessEvent,
  type PaymentFailedEvent,
  type BkashPaymentEvent,
  type NagadPaymentEvent,
  type RocketPaymentEvent,
  type SSLCommerzPaymentEvent,
  type WebhookReceivedEvent,
  type SMSDeliveryEvent,
  type SecurityBreachEvent,
  type BruteForceDetectedEvent,
  type SuspiciousActivityEvent,
  type NotificationSentEvent,
  type EmailDeliveredEvent,
  type WhatsAppDeliveredEvent,
  type SystemHealthEvent,
  type ConfigUpdatedEvent,
  type PageViewEvent,
  type ProductViewEvent,
  type CartEvent,
  type CheckoutEvent,
  type ConversionEvent,
} from './common/event.types';


// ============================================================
// ✅ ENTERPRISE: MFA Generator Types (New)
// ============================================================
export {
  // Core MFA Types
  type MfaProviderType,
  type MfaGeneratorType,
  
  // MFA Provider Metadata Types
  type MfaProviderMetadata,
  type TotpMetadata,
  type SmsOtpMetadata,
  type WhatsAppOtpMetadata,
  type ImoOtpMetadata,
  type VoiceCallOtpMetadata,
  type BkashPinMetadata,
  type NagadPinMetadata,
  type RocketPinMetadata,
  type BackupCodeMetadata,
  type RecoveryCodeMetadata,
  
  // MFA Provider Info Types
  type MfaProviderInfo,
  type MfaProviderConfig,
  
  // MFA Setup Result Types
  type MfaSetupResult,
  type MfaSetupData,
  type TotpSetupData,
  type SmsSetupData,
  type WhatsAppSetupData,
  type ImoSetupData,
  type VoiceCallSetupData,
  type BkashPinSetupData,
  type NagadPinSetupData,
  type RocketPinSetupData,
  type WebAuthnSetupData,
  type WebAuthnAuthenticatorSelection,
  type BackupCodeSetupData,
  type RecoveryCodeSetupData,
  
  // Verification Result Types
  type TotpVerificationResult,
  type BackupCodeResult,
  type MFSPinVerificationResult,
  type OtpResult,
  
  // MFA Method Priority Types
  type MfaMethodPriority,
  
  // MFA Audit Types
  type MfaAuditEntry,
  
  // MFA Rate Limit Types
  type MfaRateLimitStatus,
  
  // MFA Lockout Types
  type MfaLockoutStatus,
  
  // MFA Configuration Types
  type MfaConfiguration,
} from './common/mfa-generator.types';


// ============================================================
// ✅ ENTERPRISE: Notification Types (New)
// ============================================================
export {
  // Core Notification Types
  type NotificationChannel,
  type NotificationType,
  type NotificationStatus,
  type NotificationCategory,
  type NotificationTypeInfo,
  type NotificationStatusTimeline,
  type Notification,
  type NotificationRecipient,
  type NotificationContent,
  type NotificationTemplateVariables,
  type NotificationMetadata,
  type NotificationTracking,
  type BulkNotificationRequest,
  type BulkNotificationResult,
  type NotificationPreferences,
  type NotificationFilter,
  type NotificationStatistics,
  type NotificationTemplate,
  type NotificationDeliveryReport,
  type NotificationPreferencesUpdate,
  type NotificationWebhookPayload,
  
  // Type Guards
  isNotificationChannel,
  isNotificationType,
  isNotificationStatus,
  
  // Type Aliases
  type NotificationId,
  type BulkId,
  type TemplateId,
} from './common/notification.types';


// ============================================================
// ✅ ENTERPRISE: Password Hasher Types (Single Export)
// ============================================================
export {
  // Core Hashing Types
  type HashingAlgorithm,
  type BcryptOptions,
  type Argon2idOptions,
  type ScryptOptions,
  type Pbkdf2Options,
  type HasherConfig,
  type SaltOptions,
  
  // Result Types
  type HashResult,
  type HashStringResult,
  type HashBufferResult,
  type HashVerifyResult,
  type HashErrorCode,
  
  // Performance Types
  type HashPerformanceMetrics,
  
  // Audit Types
  type HashAuditMetadata,
  type HashAuditEventType,
  type HashAuditEvent,
  
  // Compliance Types
  type BBankComplianceRequirements,
  type BBankComplianceStatus,
  
  // Fallback Types
  type HashFallbackConfig,
  type HashFallbackStatus,
  
  // Environment Types
  type HashingEnvironmentConfig,
  type HashingEnvironmentConfigMap,
  
  // Service Interface
  type IPasswordHasher,
  
  // Password Policy
  type PasswordPolicy,
} from './common/password-hasher.types';


// ============================================================
// ✅ ENTERPRISE: Token Generator Types (New)
// ============================================================
export {
  // Core Token Types
  type TokenType as TokenGenTokenType,
  type TokenStatus as TokenGenTokenStatus,
  type TokenAlgorithm as TokenGenTokenAlgorithm,
  type TokenFormat as TokenGenTokenFormat,
  
  // JWT Types
  type JWTHeader,
  type JWTStandardClaims,
  type VubonJWTClaims,
  type AccessTokenPayload as TokenGenAccessTokenPayload,
  type RefreshTokenPayload as TokenGenRefreshTokenPayload,
  type ResetTokenPayload as TokenGenResetTokenPayload,
  type MFATokenPayload as TokenGenMFATokenPayload,
  
  // API Key Types
  type APIKeyPayload as TokenGenAPIKeyPayload,
  
  // OTP Types
  type OTPChannel,
  type OTPPurpose,
  type OTPConfig as TokenGenOTPConfig,
  type OTPResult as TokenGenOTPResult,
  
  // Backup & Recovery Types
  type BackupCodeConfig,
  type BackupCodeResults as TokenGenBackupCodeResult,
  
  // Magic Link Types
  type MagicLinkConfig,
  type MagicLinkResult,
  
  // Session Transfer Types
  type SessionTransferMethod,
  type SessionTransferConfig,
  type SessionTransferResult as TokenGenSessionTransferResult,
  
  // Device Trust Types
  type TrustLevel as TokenGenTrustLevel,
  type DeviceTrustConfig,
  type DeviceTrustResult,
  
  // WebAuthn Types
  type AuthenticatorAttachment,
  type UserVerification,
  type ResidentKey,
  type AttestationConveyance,
  type WebAuthnConfig,
  type WebAuthnRegistrationRequest as TokenGenWebAuthnRegistrationRequest,
  type WebAuthnAuthenticationRequest,
  type WebAuthnRegistrationResponse as TokenGenWebAuthnRegistrationResponse,
  
  // Token Generator Types
  type TokenGeneratorConfig as TokenGenTokenGeneratorConfig,
  type TokenConfig as TokenGenTokenConfig,
  type TokenGenerationResult as TokenGenTokenGenerationResult,
  type TokenValidationResult as TokenGenTokenValidationResult,
  type TokenRefreshResult as TokenGenTokenRefreshResult,
  
  // Environment Types
  type Environment as TokenGenEnvironment,
  type EnvironmentTokenConfig as TokenGenEnvironmentTokenConfig,
  
  // Bangladesh Bank Types
  type BdBankComplianceRequirements as TokenGenBBankComplianceRequirements,
  
  // Helper Types
  type TokenGeneratorOptions as TokenGenTokenGeneratorOptions,
  type TokenGeneratorError as TokenGenTokenGeneratorError,
} from './common/token-generator.types';


// ============================================================
// ✅ ENTERPRISE: Transaction Manager Types (New)
// ============================================================
export {
  // Core Transaction Types
  type TransactionContext,
  type TransactionOptions,
  type TransactionResult,
  type TransactionError,
  type TransactionErrorCode,
  
  // Nested Transaction Types
  type NestedTransactionContext,
  
  // Distributed Transaction Types
  type SagaParticipant,
  type SagaContext,
  type TCCTransaction,
  
  // Outbox Pattern Types
  type OutboxMessage,
  
  // Compensation Pattern Types
  type CompensationAction,
  
  // Lock Types
  type LockInfo,
  
  // Transaction Metrics Types
  type TransactionMetrics,
  type TransactionMetricsByType,
  
  // Transaction Audit Types
  type TransactionAuditEntry,
  
  // Transaction Alert Types
  type TransactionAlert,
  
  // Transaction Monitor Types
  type TransactionMonitorConfig,
  
  // Transaction Rollback Types
  type RollbackInfo,
  
  // Transaction Savepoint Types
  type SavepointInfo,
  
  // Bangladesh Bank Transaction Types
  type BBankTransactionCheck,
  type BBankTransactionReport,
  
  // Utility Types
  type TransactionIdGenerator,
  type TransactionFactory,
  type TransactionCallback,
  type TransactionInterceptor,
  type TransactionEventListener,
  type TransactionEvent,
} from './common/transaction-manager.types';


// ============================================================
// 10. Pagination Types
// ============================================================
export type {
  PaginatedResponse,
  PaginationOptions,
  PaginatedResult,
  OffsetPaginationResponse,
  SortDirection,
  PaginationConfig,
  SortableFields,
  BANGLADESH_PAGINATION,
  PaginationPerformance,
  PaginationMetadata,
  PaginationType,
  DateRange,
  FilterOperator,
  SearchConfig,
  PaginationParams,
  CursorPaginationParams,
} from './common/pagination.types';

// ✅ ADDED: Pagination constants (values, not just types)
export {
  PAGINATION_DEFAULTS,
  SORT_ORDERS,
  PAGINATION_TYPES,
  DATE_RANGES,
  FILTER_OPERATORS,
} from './common/pagination.types';
// ============================================================
// Re-export all types from auth and common
// ============================================================
// Note: Explicit exports above replace the need for export *


export {
  type ServiceResult,
  // Login Types
  type LoginDto,
  type PhoneLoginDto,
  type UsernameLoginDto,
  type OtpLoginDto,
  type LoginResponseDto,
  type LoginResult,
  // Registration Types
  type RegisterDto,
  type UserResponseDto,
  // Token Types
  type RefreshTokenDto,
  type TokenRefreshResponseDto,
  // Logout Types
  type LogoutDto,
  type LogoutResponseDto,
  // MFA Types
  type EnableMfaDto,
  type VerifyMfaDto,
  type DisableMfaDto,
  type TOTPSetupResponseDto,
  type PhoneSetupResponseDto,
  type MFSPinSetupResponseDto,
  type WebAuthnSetupResponseDto,
  type MFAStatusResponseDto,

  type SocialLoginDto,
  type SocialPhoneLoginDto,
  type SocialLoginResponseDto,
  type SocialOAuthStateDto,
} from './auth/auth.type';
