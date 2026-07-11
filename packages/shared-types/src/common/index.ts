/**
 * Shared Types - Common Domain Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-types/common/index
 *
 * @description
 * Central export point for all common domain TypeScript type contracts.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure TypeScript type exports only
 * ✅ Type-safe with complete type exports
 */

// ============================================================
// 1. API Types
// ============================================================
export type {
  ApiResponse,
  ApiErrorResponse,
  PaginatedApiResponse,
  ApiErrorCode,
  ErrorCodeMapping,
  ValidationErrorDetail,
  ValidationErrorResponse,
  ApiRequestOptions,
  RequestCache,
  HttpMethod,
  ApiEndpoint,
  ApiHealthStatus,
  ApiMetrics,
  WebSocketMessage,
  WebSocketMessageType,
  WebSocketAuthMessage,
  WebSocketSubscribeMessage,
  SSEMessage,
  SSEEventType,
  ApiVersionInfo,
  ApiCorsConfig,
  RequestContext,
  ApiCacheConfig,
  ApiWebhookPayload,
  ApiWebhookDeliveryResult,
  ApiRetryConfig,
  ApiCircuitBreakerConfig,
  ApiCircuitBreakerState,
  LogoutScope,
  BaseResponse,
} from './api.types';

// ============================================================
// 2. Audit Types
// ============================================================
export type {
  AuditAction,
  AuditSeverity,
  AuditResource,
  AuditLog,
  AuditChange,
  AuditMetadata,
  CreateAuditLogRequest,
  AuditLogFilters,
  AuditLogDTO,
  AuditStatistics,
  AuditRetentionPolicy,
  AuditExportRequest,
  AuditExportResponse,
  AuditCleanupResult,
  AuditWebhookEvent,
  AuditSearchResult,
  AuditComplianceReport,
  AuditSource,
  AuditEntityType,
  SupportedLanguage,
  AuditExportFormat,
} from './audit.types';

// ============================================================
// 3. Cache Types
// ============================================================
export type {
  NetworkType,
  CacheStatus,
  CacheOperation,
  CacheKey,
  CacheTier,
  EvictionPolicy,
  InvalidationStrategy,
  WarmingStrategy,
  CompressionLevel,
  CompressionStrategy,
  CacheNamespace,
  CacheTag,
  CacheVersion,
  CachePolicy,
  CacheEvictionPolicy,
  CacheWarmingPolicy,
  CacheInvalidationPolicy,
  CacheTierConfig,
  CacheConfig,
  CacheEntry,
  CacheOptions,
  CacheGetOptions,
  CacheSetOptions,
  CacheDeleteOptions,
  CacheInvalidateOptions,
  CacheClearOptions,
  CacheBulkGetOptions,
  ReadThroughStrategy,
  WriteThroughStrategy,
  StaleWhileRevalidateConfig,
  StampedeProtectionConfig,
  CacheWarmingConfig,
  CacheCompressionConfig,
  NetworkAwareCacheOptions,
  AdaptiveCacheConfig,
  CacheMetricsConfig,
  CacheStatistics,
  CacheHealthStatus,
  CachePerformanceMetrics,
  CacheResult,
  CacheSetResult,
  CacheDeleteResult,
  CacheClearResult,
  CacheMultiGetResult,
  CacheEventType,
  CacheEvent,
  CacheDependency,
  InvalidationPattern,
  CacheKeyBuilder,
  CacheValueTransformer,
  CacheKeyValidator,
  CacheHook,
  CacheInterceptor,
  CacheServiceConfig,
} from './cache.types';

// ============================================================
// 4. Client Info Types
// ============================================================
export type {
  authNetworkType,
  DevicePlatform,
  authDeviceTrustLevel,
  ClientInfo,
  ClientInfoWithContext,
  ClientInfoBuilder,
  ClientInfoValidation,
  ClientInfoValidator,
  ClientInfoFormatter,
  BangladeshDistrict,
} from './client-info.types';

// ============================================================
// 5. Domain Event Types
// ============================================================
export type {
  DomainEvent,
  DomainEventHandler,
  DomainEventPublisher,
  EventStore,
  EventSourcingUtils,
  EventTypeRegistry,
  EventVersionMigration,
  EventVersionMigrator,
  EventEnvelope,
  EventType,
} from './domain-event.types';

export {
  EVENT_TYPES,
  isValidEventType,
  getEventCategory,
  getEventAction,
} from './domain-event.types';

// ============================================================
// 6. Event Types
// ============================================================
export type {
  BaseEvent,
  EventMetadata,
  EventPayload,
  UserRegisteredEvent,
  UserLoggedInEvent,
  UserLoggedOutEvent,
  PasswordChangedEvent,
  PasswordResetEvent,
  MFAEnabledEvent,
  MFAVerificationEvent,
  UserCreatedEvent,
  UserUpdatedEvent,
  UserRoleChangedEvent,
  UserTierUpgradedEvent,
  UserEmailChangedEvent,
  UserPhoneChangedEvent,
  UserKYCVerifiedEvent,
  SessionCreatedEvent,
  SessionExtendedEvent,
  SessionRevokedEvent,
  SessionExpiredEvent,
  SessionTransferredEvent,
  DeviceRegisteredEvent,
  DeviceTrustedEvent,
  DeviceBlockedEvent,
  PaymentInitiatedEvent,
  PaymentSuccessEvent,
  PaymentFailedEvent,
  BkashPaymentEvent,
  NagadPaymentEvent,
  RocketPaymentEvent,
  SSLCommerzPaymentEvent,
  WebhookReceivedEvent,
  SMSDeliveryEvent,
  SecurityBreachEvent,
  BruteForceDetectedEvent,
  SuspiciousActivityEvent,
  NotificationSentEvent,
  EmailDeliveredEvent,
  WhatsAppDeliveredEvent,
  SystemHealthEvent,
  ConfigUpdatedEvent,
  PageViewEvent,
  ProductViewEvent,
  CartEvent,
  CheckoutEvent,
  ConversionEvent,
  EventHandlerResult,
  EventHandler,
  EventMiddleware,
  EventSubscriber,
  EventPublisher,
} from './event.types';

// ============================================================
// 7. Location Types
// ============================================================
export type {
  LocationInfo,
  Coordinates,
  GeoLocation,
  Division,
  District,
  Upazila,
  Union,
  Ward,
  Address,
  DeliveryZone,
  DeliveryCoverageResult,
  UserLocationHistory,
  LocationChangeResult,
  BangladeshDivisionName,
  BangladeshDivisionNameBn,
  LocationFilterOptions,
  IPGeolocationResponse,
} from './location.types';

export {
  BANGLADESH_DIVISIONS,
} from './location.types';

// ============================================================
// 8. MFA Generator Types
// ============================================================
export type {
  MfaProviderType,
  MfaGeneratorType,
  MfaProviderMetadata,
  TotpMetadata,
  SmsOtpMetadata,
  WhatsAppOtpMetadata,
  ImoOtpMetadata,
  VoiceCallOtpMetadata,
  BkashPinMetadata,
  NagadPinMetadata,
  RocketPinMetadata,
  BackupCodeMetadata,
  RecoveryCodeMetadata,
  MfaProviderInfo,
  MfaProviderConfig,
  MfaSetupResult,
  MfaSetupData,
  TotpSetupData,
  SmsSetupData,
  WhatsAppSetupData,
  ImoSetupData,
  VoiceCallSetupData,
  BkashPinSetupData,
  NagadPinSetupData,
  RocketPinSetupData,
  WebAuthnSetupData,
  WebAuthnAuthenticatorSelection,
  BackupCodeSetupData,
  RecoveryCodeSetupData,
  TotpVerificationResult,
} from './mfa-generator.types';

// ============================================================
// 9. Notification Types
// ============================================================
export type {
  NotificationChannel,
  NotificationChannelMetadata,
  NotificationType,
  NotificationCategory,
  NotificationTypeInfo,
  NotificationStatus,
  NotificationStatusTimeline,
  Notification,
  NotificationRecipient,
  NotificationContent,
  NotificationTemplateVariables,
  NotificationMetadata,
  NotificationTracking,
  BulkNotificationRequest,
  BulkNotificationResult,
  NotificationPreferences,
  NotificationFilter,
  NotificationStatistics,
  NotificationTemplate,
  NotificationDeliveryReport,
  NotificationPreferencesUpdate,
  NotificationWebhookPayload,
} from './notification.types';

// ============================================================
// 10. Pagination Types
// ============================================================
export type {
  PaginationParams,
  CursorPaginationParams,
  PaginationMetadata,
  PaginatedResponse,
  SortDirection,
  PaginationType,
  DateRange,
  FilterOperator,
  PaginationConfig,
  SortableFields,
  SearchConfig,
  BANGLADESH_PAGINATION,
  PaginationPerformance,
} from './pagination.types';

// ✅ ADDED: Pagination constants (values, not just types)
export {
  PAGINATION_DEFAULTS,
  SORT_ORDERS,
  PAGINATION_TYPES,
  DATE_RANGES,
  FILTER_OPERATORS,
} from './pagination.types';

// ============================================================
// 11. Password Hasher Types
// ============================================================
// packages/shared-types/src/common/index.ts
// অথবা packages/shared-types/src/index.ts
// (যেখানে common exports আছে সেখানে যোগ করুন)

// ============================================================
// Password Hasher Types
// ============================================================
export {
  // Algorithm & Configuration Types
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
  
  // Performance & Audit Types
  type HashPerformanceMetrics,
  type HashAuditMetadata,
  type HashAuditEvent,
  type HashAuditEventType,
  
  // Compliance Types (Bangladesh Bank)
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
  
  // Policy Types
  type PasswordPolicy,
} from './password-hasher.types';

// অথবা, যদি আলাদা ফাইল থেকে ইম্পোর্ট করতে চান:
// export * from './password-hasher.types';
// ============================================================
// 12. Rate Limit Types
// ============================================================
// packages/shared-types/src/common/index.ts
// অথবা packages/shared-types/src/index.ts
// (যেখানে common exports আছে সেখানে যোগ করুন)

// ============================================================
// Rate Limit Types
// ============================================================
export {
  // Core Types
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
  
  // DTO Classes
  RateLimitMetadataDto,
  RateLimitCheckDto,
  RateLimitCheckResponseDto,
  
  // Enums
  RateLimitSeverity,
  RateLimitScope,
  RateLimitPolicy,
  RateLimitViolationType,
  RateLimitErrorCode,
  
  // Default Configuration
  DEFAULT_RATE_LIMITS,
} from './rate-limit.types';

// ============================================================
// 13. SEO Types
// ============================================================
// packages/shared-types/src/common/index.ts
// অথবা packages/shared-types/src/index.ts
// (যেখানে common exports আছে সেখানে যোগ করুন)

// ============================================================
// SEO Types
// ============================================================
export {
  // Meta Tag Types
  type MetaTag,
  
  // Open Graph Types
  type OpenGraphTags,
  type OgType,
  
  // Twitter Card Types
  type TwitterCardTags,
  type TwitterCardType,
  
  // Structured Data Types
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
  
  // SEO Metadata Types
  type SEOMetadata,
  type RobotDirective,
  
  // Sitemap Types
  type SitemapEntry,
  type ChangeFrequency,
  type SitemapVideo,
  
  // SEO Analysis Types
  type SEOAnalysisResult,
  type SEOIssue,
  
  // SEO Settings Types
  type ProductSEOSettings,
  type CategorySEOSettings,
  type PageSEOSettings,
  
  // Robots.txt Types
  type RobotsTxtConfig,
  
  // Performance Metrics
  type SEOPerformanceMetrics,
} from './seo.types';

// ============================================================
// 14. Token Generator Types
// ============================================================
export type {
  TokenType,
  TokenStatus,
  TokenAlgorithm,
  TokenFormat,
  JWTHeader,
  JWTStandardClaims,
  VubonJWTClaims,
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetTokenPayload,
  MFATokenPayload,
  APIKeyPayload,
  OTPChannel,
  OTPPurpose,
  OTPConfig,
  OTPResult,
  BackupCodeConfig,
  BackupCodeResults,
  MagicLinkConfig,
  MagicLinkResult,
  SessionTransferMethod,
  SessionTransferConfig,
  SessionTransferResult,
  TrustLevel,
  DeviceTrustConfig,
  DeviceTrustResult,
  AuthenticatorAttachment,
  UserVerification,
  ResidentKey,
  AttestationConveyance,
  WebAuthnConfig,
  WebAuthnRegistrationRequest,
  WebAuthnAuthenticationRequest,
  WebAuthnRegistrationResponse,
  TokenGeneratorConfig,
  TokenConfig,
  TokenGenerationResult,
  TokenValidationResult,
  TokenRefreshResult,
  Environment,
  EnvironmentTokenConfig,
} from './token-generator.types';


// ============================================================
// 15. Transaction Manager Types
// ============================================================
export type {
  TransactionContext,
  TransactionOptions,
  TransactionResult,
  TransactionError,
  TransactionErrorCode,
  NestedTransactionContext,
  SagaParticipant,
  SagaContext,
  TCCTransaction,
  OutboxMessage,
  CompensationAction,
  LockInfo,
  TransactionMetrics,
  TransactionMetricsByType,
  TransactionAuditEntry,
  TransactionAlert,
  TransactionMonitorConfig,
  RollbackInfo,
  SavepointInfo,
} from './transaction-manager.types';

// ============================================================
// 16. Value Object Types
// ============================================================
export type {
  ValueObjectComparison,
  TemporalEqualityConfig,
  ValueObjectMetadata,
  ValueObjectSnapshot,
  ValidationErrorCode,
  ValidationResult,
  ValueObjectSerializationOptions,
  ValueObjectDeserializationOptions,
  EqualityCacheConfig,
  ValueObjectPerformanceMetrics,
  EmailValueObject,
  PhoneValueObject,
  DeviceIdValueObject,
  ValueObjectConstructor,
  ValueObjectPredicate,
  ValueObjectTransformer,
  ValueObjectFactory,
  ValueObjectError,
  ValueObjectErrorFactory,
} from './value-object.types';

