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
export type {
  HashingAlgorithm,
  HashResult,
  VerificationResult,
  BcryptConfig,
  Argon2idConfig,
  ScryptConfig,
  Pbkdf2Config,
  SaltConfig,
  PerformanceThresholds,
  HashingPerformance,
  FallbackConfig,
  EnvironmentHashingConfig,
  BBankCompliantConfig,
  HashingAuditConfig,
  HasherConfig,
} from './password-hasher.types';

// ✅ ADDED: Hashing algorithm constants
export {
  HASHING_ALGORITHMS,
  DEFAULT_ALGORITHM,
} from './password-hasher.types';

// ============================================================
// 12. Rate Limit Types
// ============================================================
export type {
  RateLimitConfig,
  RateLimitStatus,
  RateLimitStrategy,
  RateLimitStore,
  RateLimitHeaders,
  RateLimitByNetwork,
  RateLimitWindow,
  RateLimitResult,
  RateLimitError,
} from './rate-limit.types';

// ✅ ADDED: Rate limit strategy constants
export {
  RATE_LIMIT_STRATEGIES,
} from './rate-limit.types';

// ============================================================
// 13. SEO Types
// ============================================================
export type {
  SeoMetadata,
  OpenGraph,
  TwitterCard,
  JsonLd,
  SitemapEntry,
  RobotsTxt,
  SeoAnalysis,
  SeoAudit,
  SeoConfig,
} from './seo.types';

// ✅ ADDED: Default SEO config constant
export {
  DEFAULT_SEO_CONFIG,
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

// ✅ ADDED: Token types constants
export {
  TOKEN_TYPES,
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

// ✅ ADDED: Default temporal config constant
export {
  DEFAULT_TEMPORAL_CONFIG,
} from './value-object.types';

// ============================================================
// Cross-Domain Type Re-exports (For convenience)
// ============================================================
export type {
  PaginatedApiResponse as ApiPaginatedResponse,
  PaginationMetadata as ApiPaginationMetadata,
  ClientInfo as LocationAwareClientInfo,
  LocationInfo as ClientLocationInfo,
  TransactionAuditEntry as AuditableTransaction,
  AuditLog as TransactionAuditLog,
  Notification as EventNotification,
  NotificationWebhookPayload as EventNotificationPayload,
  CacheStatistics as PerformanceCacheStats,
  CacheHealthStatus as CacheHealth,
} from './api.types';
