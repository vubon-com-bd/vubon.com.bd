// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  CacheOptions,
  CacheResult,
  CacheStatistics,
  CacheHealthStatus,
  InvalidationPattern,
  CacheBatchResult,
} from './cache-service.port';

// Main Port Interface
export type { ICacheService } from './cache-service.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  CacheOptions as CacheOptionsType,
  CacheResult as CacheResultType,
  CacheStatistics as CacheStatisticsType,
  CacheHealthStatus as CacheHealthStatusType,
  InvalidationPattern as InvalidationPatternType,
  CacheBatchResult as CacheBatchResultType,
} from './cache-service.port';

// ============================================================
// Class Export (MockCacheService for testing)
// ============================================================

export { MockCacheService } from './cache-service.port';



// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  EmailDomainCategory,
  EmailProviderType,
  EmailComponents,
  EmailValidationResult,
} from './email-validator.port';

// Main Port Interface
export type { IEmailValidator } from './email-validator.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  EmailDomainCategory as EmailDomainCategoryType,
  EmailProviderType as EmailProviderTypeType,
  EmailComponents as EmailComponentsType,
  EmailValidationResult as EmailValidationResultType,
} from './email-validator.port';

// ============================================================
// Class Export (MockEmailValidator for testing)
// ============================================================

export { MockEmailValidator } from './email-validator.port';


// ============================================================
// Type Exports for index
// ============================================================

// Core Types
export type {
  IDomainEvent,
  IEventHandler,
  EventHandlerMetadata,
  EventEnvelope,
  EventPublishOptions,
  EventSubscriptionOptions,
  EventSubscription,
  EventBatch,
  EventProcessingResult,
  EventStatistics,
} from './event-bus.port';

// Main Port Interface
export type { IEventBus } from './event-bus.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  IDomainEvent as DomainEventType,
  IEventHandler as EventHandlerType,
  EventHandlerMetadata as EventHandlerMetadataType,
  EventEnvelope as EventEnvelopeType,
  EventPublishOptions as EventPublishOptionsType,
  EventSubscriptionOptions as EventSubscriptionOptionsType,
  EventSubscription as EventSubscriptionType,
  EventBatch as EventBatchType,
  EventProcessingResult as EventProcessingResultType,
  EventStatistics as EventStatisticsType,
} from './event-bus.port';

// ============================================================
// Class Export (MockEventBus for testing)
// ============================================================

export { MockEventBus } from './event-bus.port';



// ============================================================
// Type Exports for index
// ============================================================

// Enums
export {
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from './notification-sender.port';

// Core Types
export type {
  NotificationOptions,
  EmailOptions,
  SMSSOptions,
  WhatsAppOptions,
  PushOptions,
  InAppOptions,
  MFSOptions,
  VoiceOptions,
  NotificationResult,
  BulkNotificationResult,
  NotificationTemplate,
} from './notification-sender.port';

// Main Port Interface
export type { INotificationSender } from './notification-sender.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  NotificationOptions as NotificationOptionsType,
  EmailOptions as EmailOptionsType,
  SMSSOptions as SMSSOptionsType,
  WhatsAppOptions as WhatsAppOptionsType,
  PushOptions as PushOptionsType,
  InAppOptions as InAppOptionsType,
  MFSOptions as MFSOptionsType,
  VoiceOptions as VoiceOptionsType,
  NotificationResult as NotificationResultType,
  BulkNotificationResult as BulkNotificationResultType,
  NotificationTemplate as NotificationTemplateType,
} from './notification-sender.port';

// ============================================================
// Class Export (MockNotificationSender for testing)
// ============================================================

export { MockNotificationSender } from './notification-sender.port';


// ============================================================
// Type Exports for index
// ============================================================

// Enums
export { PasswordStrength } from './password-validator.port';

// Core Types
export type {
  PasswordValidationResult,
  EntropyResult,
} from './password-validator.port';

// Main Port Interface
export type { IPasswordValidator } from './password-validator.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  PasswordValidationResult as PasswordValidationResultType,
  EntropyResult as EntropyResultType,
} from './password-validator.port';

// ============================================================
// Class Export (MockPasswordValidator for testing)
// ============================================================

export { MockPasswordValidator } from './password-validator.port';


// ============================================================
// Type Exports for index
// ============================================================

// Enums
export {
  PhoneType,
  BDOperator,
} from './phone-validator.port';

// Core Types
export type {
  PhoneComponents,
  PhoneValidationResult,
} from './phone-validator.port';

// Main Port Interface
export type { IPhoneValidator } from './phone-validator.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  PhoneComponents as PhoneComponentsType,
  PhoneValidationResult as PhoneValidationResultType,
} from './phone-validator.port';

// ============================================================
// Class Export (MockPhoneValidator for testing)
// ============================================================

export { MockPhoneValidator } from './phone-validator.port';


// ============================================================
// Type Exports for index
// ============================================================

// Enums
export {
  RateLimitStrategy,
  RateLimitScope,
} from './rate-limiter.port';

// Core Types
export type {
  RateLimitResult,
  RateLimitConfig,
  RateLimitViolation,
} from './rate-limiter.port';

// Main Port Interface
export type { IRateLimiter } from './rate-limiter.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  RateLimitResult as RateLimitResultType,
  RateLimitConfig as RateLimitConfigType,
  RateLimitViolation as RateLimitViolationType,
} from './rate-limiter.port';

// ============================================================
// Class Export (MockRateLimiter for testing)
// ============================================================

export { MockRateLimiter } from './rate-limiter.port';



// ============================================================
// Type Exports for index
// ============================================================

// Enums
export {
  TokenType,
  TokenAlgorithm,
  OTPChannel,
  OTPPurpose,
} from './token-generator.port';

// Payload Types
export type {
  BaseTokenPayload,
  AccessTokenPayload,
  RefreshTokenPayload,
  OTPPayload,
  MFATokenPayload,
  MagicLinkTokenPayload,
  EmailVerificationTokenPayload,
  PhoneVerificationTokenPayload,
  PasswordResetTokenPayload,
  SessionTransferTokenPayload,
  DeviceTrustTokenPayload,
  APIKeyTokenPayload,
  BackupCodePayload,
} from './token-generator.port';

// Options Types
export type {
  TokenGenerationOptions,
  OTPGenerationOptions,
  TokenValidationOptions,
  TokenRefreshOptions,
} from './token-generator.port';

// Result Types
export type {
  TokenValidationResult,
  TokenGenerationResult,
  OTPGenerationResult,
  TokenRefreshResult,
} from './token-generator.port';

// Main Port Interface
export type { ITokenGenerator } from './token-generator.port';

// ============================================================
// Type Alias Exports (for convenience and naming consistency)
// ============================================================

export type {
  TokenValidationResult as TokenValidationResultType,
  TokenGenerationResult as TokenGenerationResultType,
  OTPGenerationResult as OTPGenerationResultType,
  TokenRefreshResult as TokenRefreshResultType,
  TokenGenerationOptions as TokenGenerationOptionsType,
  OTPGenerationOptions as OTPGenerationOptionsType,
  TokenValidationOptions as TokenValidationOptionsType,
  TokenRefreshOptions as TokenRefreshOptionsType,
} from './token-generator.port';

// ============================================================
// Class Export (MockTokenGenerator for testing)
// ============================================================

export { MockTokenGenerator } from './token-generator.port';
