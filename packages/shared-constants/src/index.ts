/**
 * Shared Constants - Enterprise Grade
 * @module shared-constants
 * @description Single source of truth for all constants across the monorepo
 * 
 * Enterprise Rules:
 * ✅ ONLY exports from this index file
 * ✅ All exports are type-safe
 * ✅ Grouped by domain for easy discovery
 * ✅ No runtime code - only type exports and constants
 */

// ============================================================
// Core Types & Utilities
// ============================================================
export type { ValueOf, ReadonlyDeep } from './common.types';

// ============================================================
// API & HTTP Constants
// ============================================================
export {
  API_VERSIONS,
  API_PREFIXES,
  API_GATEWAY_CONFIG,
  RATE_LIMIT_CONFIG,
  RESILIENCE_CONFIG,
  CONNECTION_POOL,
  WEBHOOK_CONFIG,
  HEALTH_CONFIG,
  API_RESOURCES,
  // API_ROUTES are kept but truncated in original
} from './api.constants';

export type { APIVersion } from './api.constants';

export {
  HTTP_STATUS,
  HTTP_STATUS_INFORMATIONAL,
  HTTP_STATUS_SUCCESS,
  HTTP_STATUS_REDIRECTION,
  HTTP_STATUS_CLIENT_ERROR,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_RANGES,
  HTTP_STATUS_CATEGORY_MAP,
  HTTP_STATUS_MESSAGES,
  ECOMMERCE_HTTP_STATUS,
  HTTP_STATUS_WITH_RETRY,
  HTTP_STATUS_NO_RETRY,
  HTTP_STATUS_CACHEABLE,
  HTTP_STATUS_CDN_CACHEABLE,
  WEBHOOK_HTTP_STATUS,
  HTTP_STATUS_MESSAGES_BN,
  GRAPHQL_HTTP_STATUS,
} from './http-status.constants';

export type {
  HttpStatus,
  HttpStatusInformational,
  HttpStatusSuccess,
  HttpStatusRedirection,
  HttpStatusClientError,
  HttpStatusServerError,
  HttpStatusRanges,
  HttpStatusCategory,
  HttpStatusMessage,
  HttpStatusMessageBn,
  EcommerceHttpStatus,
  HttpStatusWithRetry,
  HttpStatusNoRetry,
  HttpStatusCacheable,
  HttpStatusCdnCacheable,
  WebhookHttpStatus,
  GraphqlHttpStatus,
} from './http-status.constants';

// ============================================================
// Audit Constants
// ============================================================
export {
  AUDIT_ACTIONS,
  AUDIT_SOURCES,
  AUDIT_SEVERITIES,
  AUDIT_ENTITY_TYPES,
  AUDIT_ACTION_CATEGORIES,
  AUDIT_ACTION_TO_CATEGORY,
} from './audit.constants';

export type {
  AuditActionValue,
  AuditSourceValue,
  AuditSeverityValue,
  AuditEntityTypeValue,
  AuditActionCategory,
} from './audit.constants';

// ============================================================
// Auth & Identity Constants
// ============================================================
export {
  AUTH_COOKIE_NAMES,
  AUTH_HEADERS,
  AUTH_PROVIDERS,
  LOGIN_TYPES,
  AUTH_STATUS,
  USER_STATUS,
  USER_TIER,
  TOKEN_EXPIRY,
  PASSWORD_POLICY,
  IDENTITY_VALIDATION,
  BRUTE_FORCE_PROTECTION,
  MAGIC_LINK_CONFIG,
  SOCIAL_AUTH_CONFIG,
  ACCOUNT_RECOVERY,
  ACCOUNT_LOCKOUT,
  SESSION_CONCURRENCY,
  AUTH_EVENTS,
  // Deprecated - use API_ROUTES from api.constants
  AUTH_ROUTES,
  // Deprecated - use RATE_LIMIT_CONFIG from api.constants
  AUTH_RATE_LIMITS,
  REGISTRATION_METHODS,
  REGISTRATION_RATE_LIMITS,
  REFERRAL_CONFIG,
  AGE_REQUIREMENTS,
  REGISTRATION_SOURCES,
} from './auth.constants';

export type {
  AuthCookieName,
  AuthHeader,
  AuthProvider,
  AuthStatus,
  UserStatus,
  UserTier,
  AuthEvent,
  RegistrationMethod,
  RegistrationSource,
} from './auth.constants';

// ============================================================
// Cache Constants
// ============================================================
export {
  CACHE_CONNECTION_CONFIG,
  CACHE_SYNC_CONFIG,
  CACHE_MONITORING,
  CACHE_EVICTION,
  CACHE_KEY_PREFIXES,
  CACHE_KEY_PATTERNS,
  CACHE_TTL,
  CACHE_INVALIDATION_PATTERNS,
  CACHE_INVALIDATION_EVENTS,
  CACHE_STRATEGIES,
  CACHE_STAMPEDE_PROTECTION,
  CACHE_COMPRESSION,
  CACHE_WARMING,
  CACHE_NAMESPACES,
  CACHE_CONFIG,
  CACHE_KEY_PREFIX,
  CACHE_VERSION,
  CACHE_DEFAULT_TTL,
  CACHE_KEY_SEPARATOR,
} from './cache.constants';

export type {
  CacheKeyPrefix,
  CacheKeyPattern,
  CacheTTL,
  CacheInvalidationPattern,
  CacheInvalidationEvent,
  CacheStrategy,
  CacheNamespace,
  CacheConnectionConfig,
  CacheSyncConfig,
  CacheMonitoring,
  CacheEviction,
} from './cache.constants';

// ============================================================
// Device Constants
// ============================================================
export {
  DEVICE_TYPES,
  DEVICE_CATEGORIES,
  OS_TYPES,
  BROWSER_TYPES,
  NETWORK_TYPES,
  DEVICE_TRUST_DURATION,
  DEVICE_FINGERPRINT_HEADERS,
  DEVICE_RISK_LEVEL,
  DEVICE_RISK_INDICATORS,
  DEVICE_ACTIVITY_LIMITS,
  UNKNOWN_DEVICE_HANDLING,
  SESSION_TRANSFER,
  DEVICE_PAIRING,
  DEVICE_LOGGING,
  FINGERPRINT_COMPONENTS,
  DEVICE_COMPLIANCE,
  DEVICE_PERFORMANCE,
  ROLE_DEVICE_ALLOWANCE,
  DEVICE_TYPE_TO_CATEGORY,
  BROWSER_TRUST_LEVELS,
  NETWORK_SECURITY_LEVELS,
  DEVICE_METRICS,
  DEVICE_ID_CONSTANTS,
} from './device.constants';

export type {
  DeviceType,
  DeviceCategory,
  OsType,
  BrowserType,
  NetworkType,
  DeviceTrustDuration,
  DeviceFingerprintHeader,
  DeviceRiskLevel,
  DeviceRiskIndicator,
  DeviceActivityLimits,
  UnknownDeviceHandling,
  SessionTransfer,
  DevicePairing,
  DeviceLogging,
  FingerprintComponents,
  DeviceCompliance,
  DevicePerformance,
  RoleDeviceAllowance,
  DeviceTypeToCategory,
  BrowserTrustLevels,
  NetworkSecurityLevels,
  DeviceMetrics,
  DeviceIdConstants,
  UserRole,
} from './device.constants';

// ============================================================
// Device ID Patterns Constants
// ============================================================
export {
  DEVICE_ID_PATTERNS,
  DEVICE_ID_PATTERN_METADATA,
  DEVICE_ID_PATTERN_CATEGORIES,
  isValidDeviceId,
  getDeviceIdPattern,
  getDeviceIdPatternMetadata,
  getDeviceIdCategory,
  isBangladeshDeviceId,
  isEphemeralDeviceId,
  isFingerprintDeviceId,
  isUuidDeviceId,
  isMobileDeviceId,
} from './device-patterns.constants';

export type {
  DeviceIdPatternKey,
  DeviceIdPattern,
} from './device-patterns.constants';

// ============================================================
// Email Verification Constants
// ============================================================
export {
  EMAIL_VERIFICATION_CONFIG,
  getExpiryMs,
  getCooldownMs,
  isChannelSupported,
  isFeatureEnabled,
  getRateLimit,
} from './email-verification.constants';

export type {
  EmailVerificationConfig,
  EmailVerificationConfigKey,
  EmailVerificationChannel,
  DefaultChannelOrder,
  EmailVerificationOptions,
} from './email-verification.constants';

// ============================================================
// Environment Constants (CRITICAL: Only file with process.env access)
// ============================================================
export {
  ENV_CONFIG,
  DATABASE_CONFIG,
  REDIS_CONFIG,
  QUEUE_CONFIG,
  VALUE_OBJECT_CONFIG,
  RETRY_CONFIG,
  TOKEN_CONFIG as ENV_TOKEN_CONFIG,
} from './env.constants';

export type {
  EnvConfig,
  DatabaseConfig,
  RedisConfig,
  QueueConfig,
  ValueObjectConfig,
  RetryConfig,
} from './env.constants';

// ============================================================
// Event Constants
// ============================================================
export {
  AUTH_EVENTS as DOMAIN_AUTH_EVENTS,
  USER_EVENTS,
  SESSION_EVENTS,
  DEVICE_EVENTS,
  ORDER_EVENTS,
  PAYMENT_EVENTS,
  PRODUCT_EVENTS,
  NOTIFICATION_EVENTS,
  SECURITY_EVENTS,
  SYSTEM_EVENTS,
  INTEGRATION_EVENTS,
  ANALYTICS_EVENTS,
  EVENT_VERSIONS,
  EVENT_CATEGORIES,
  EVENT_CATEGORY_DISPLAY_NAMES,
  EVENT_TO_CATEGORY,
  EVENT_URGENCY,
  EVENT_URGENCY_MAP,
} from './event.constants';

export type {
  EventCategory,
  EventUrgency,
} from './event.constants';

// ============================================================
// ID Patterns Constants
// ============================================================
export {
  ID_PATTERNS,
  ID_CONFIG,
  ID_TYPE_MAP,
} from './id-patterns.constants';

export type {
  IDPatternKey,
  IDConfigKey,
  IDType,
  IDPatterns,
  IDConfigType,
  IDTypeMap,
} from './id-patterns.constants';

// ============================================================
// Lock Constants
// ============================================================
export {
  LOCK_CONFIG,
  REASON_DURATIONS,
  IP_BLOCKING_CONFIG,
  NOTIFICATION_CONFIG,
  GEO_LOCATION_CONFIG,
  RISK_SCORING_CONFIG,
  SECURITY_CONFIG,
  DEVICE_FINGERPRINT_CONFIG,
  SMS_CONFIG,
} from './lock.constants';

export type {
  LockConfig,
  ReasonDurations,
  IPBlockingConfig,
  NotificationConfig,
  GeoLocationConfig,
  RiskScoringConfig,
  SecurityConfig,
  DeviceFingerprintConfig,
  SMSConfig,
  LockLevel,
  NotificationChannel,
  LockRiskSeverity,
} from './lock.constants';

// ============================================================
// MFA Constants
// ============================================================
export {
  MFA_PROVIDERS,
  MFA_SERVICE_CONFIG,
  MFA_STATUS,
  MFA_VERIFICATION_TYPES,
  MFA_PRIORITY,
  OTP_CONFIG,
  RECOVERY_CODES,
  MFA_TIMEOUTS,
  MFA_THRESHOLDS,
  MFA_TRUSTED_ENVIRONMENTS,
  MFA_RISK_SCORES,
  MFA_SETUP_REQUIREMENTS,
  MFA_FALLBACKS,
  SIM_SWAP_DETECTION,
  OFFLINE_MFA,
  MFA_EVENTS,
  MFA_PRESETS,
  MFA_METRICS,
  MFA_CONFIG,
  MFA_TYPES,
  MFA_PROVIDER_NAMES,
  MFA_DISABLE_SCOPES,
  BACKUP_CODE_PATTERN,
  MFS_PIN_PATTERN,
  OTP_PATTERN,
  BACKUP_CODE_CONFIG,
} from './mfa.constants';

export type {
  MfaProvider,
  MfaServiceConfig,
  MfaStatus,
  MfaVerificationType,
  MfaPriority,
  OtpConfig,
  RecoveryCodes,
  MfaTimeouts,
  MfaThresholds,
  MfaTrustedEnvironments,
  MfaRiskScores,
  MfaRiskFactor,
  MfaSetupRequirements,
  MfaSecurityLevel,
  MfaUserRole,
  MfaFallbacks,
  SimSwapDetection,
  BangladeshMobileOperator,
  OfflineMfa,
  MfaEvent,
  MfaPreset,
  MfaPresetName,
  MfaMetrics,
  MfaProviderValue,
  MfaStatusValue,
  MfaVerificationTypeValue,
  MfaPriorityValue,
  MfaPresetValue,
  MfaEventValue,
} from './mfa.constants';

// ============================================================
// MFA Generator Constants
// ============================================================
export {
  TOTP_CONFIG,
  BACKUP_CODES_CONFIG,
  RECOVERY_CODES_CONFIG as MFA_RECOVERY_CODES_CONFIG,
  WEBAUTHN_CONFIG,
  SMS_OTP_CONFIG,
  WHATSAPP_OTP_CONFIG,
  IMO_OTP_CONFIG,
  VOICE_OTP_CONFIG,
  BKASH_PIN_CONFIG,
  NAGAD_PIN_CONFIG,
  ROCKET_PIN_CONFIG,
  PRODUCTION_OVERRIDES,
  MFA_GENERATOR_CONFIG,
} from './mfa-generator.constants';

export type {
  TOTPConfig,
  BackupCodesConfig,
  RecoveryCodesConfig,
  WebAuthnConfig,
  SMSOTPConfig,
  WhatsAppOTPConfig,
  ImoOTPConfig,
  VoiceOTPConfig,
  BKashPINConfig,
  NagadPINConfig,
  RocketPINConfig,
  ProductionOverrides,
  MFAGeneratorConfig,
} from './mfa-generator.constants';

// ============================================================
// Notification Constants
// ============================================================
export {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TTL,
  SMS_GATEWAY_CONFIG,
  WHATSAPP_TEMPLATES,
  EMAIL_CONFIG,
  PUSH_CONFIG,
  IN_APP_CONFIG,
  NOTIFICATION_RATE_LIMITS,
  NOTIFICATION_RETRY,
  BANGLADESH_NOTIFICATION_CONFIG,
  TEMPLATE_VARIABLES,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE_TO_CHANNEL,
} from './notification.constants';

export type {
  NotificationChannel,
  NotificationType,
  NotificationPriority,
  NotificationTTL,
  WhatsAppTemplateName,
  NotificationStatus,
} from './notification.constants';

// ============================================================
// Pagination Constants
// ============================================================
export {
  PAGINATION,
  SORT_ORDER,
  SORT_DIRECTION,
  PAGINATION_TYPE,
  DATE_RANGE,
  DATE_RANGE_CONFIG,
  SEARCH_CONFIG,
  SORTABLE_FIELDS,
  FILTER_OPERATORS,
  PAGINATION_METADATA,
  PAGINATION_CONFIG,
  BANGLADESH_PAGINATION,
  PAGINATION_PERFORMANCE,
  // Re-exports with renamed constants
  PAGINATION as DEFAULT_PAGINATION,
  SORT_ORDER as SORT_ORDER_VALUES,
  SORT_DIRECTION as SORT_DIRECTION_VALUES,
  PAGINATION_TYPE as PAGINATION_TYPE_VALUES,
  DATE_RANGE as DATE_RANGE_VALUES,
  SEARCH_CONFIG as SEARCH_CONFIG_VALUES,
  SORTABLE_FIELDS as SORTABLE_FIELD_VALUES,
  FILTER_OPERATORS as FILTER_OPERATOR_VALUES,
  PAGINATION_METADATA as PAGINATION_METADATA_VALUES,
} from './pagination.constants';

export type {
  PaginationConfig,
  SortOrder,
  SortDirection,
  PaginationType,
  DateRange,
  SearchConfig,
  SortableFields,
  FilterOperator,
  PaginationParams,
  CursorPaginationParams,
  FilterParam,
  SortParam,
} from './pagination.constants';

// ============================================================
// Password Hasher Constants
// ============================================================
export {
  HASHING_ALGORITHMS,
  DEFAULT_HASHING_ALGORITHM,
  BCRYPT_CONFIG,
  ARGON2ID_CONFIG,
  SCRYPT_CONFIG,
  PBKDF2_CONFIG,
  SALT_CONFIG,
  HASHING_PERFORMANCE_CONFIG,
  HASHING_FALLBACK_CONFIG,
  ENVIRONMENT_HASHING_CONFIG,
  BBANK_COMPLIANCE_CONFIG,
  HASHING_AUDIT_CONFIG,
  HASHING_CONFIG_VERSION,
} from './password-hasher.constants';

export type {
  HashingAlgorithm,
  HashingEnvironment,
} from './password-hasher.constants';

// ============================================================
// Password History Constants
// ============================================================
export {
  PASSWORD_HISTORY_CONFIG,
  getExpiryDaysForTier,
  getExpiryDaysForRole,
  getStrengthRequirementForTier,
  getStrengthRequirementForRole,
  requiresStrictPolicy,
  getBreachSeverityDescription,
  getPasswordAgeCategory,
  isPasswordExpired,
  needsExpiryWarning,
  needsCriticalWarning,
} from './password-history.constants';

export type {
  PasswordHistoryConfig,
  PasswordHistoryConfigKey,
  BreachSeverity,
  UserPasswordTier,
  AuthUserRole,
  PasswordHistoryOptions,
} from './password-history.constants';

// ============================================================
// Password Patterns Constants
// ============================================================
export {
  PASSWORD_LENGTH,
  PASSWORD_COMPLEXITY,
  PASSWORD_STRENGTH_PATTERNS,
  PASSWORD_CHAR_SETS,
  COMMON_PASSWORDS,
  BANGLADESH_PASSWORD_PATTERNS,
  KEYBOARD_PATTERNS,
  SEQUENTIAL_PATTERNS,
} from './password-patterns.constants';

export type {
  PasswordLength,
  PasswordComplexity,
  PasswordStrengthPattern,
  PasswordCharSet,
  CommonPassword,
  BangladeshPasswordPattern,
  KeyboardPattern,
} from './password-patterns.constants';

// ============================================================
// Password Reset Constants
// ============================================================
export {
  PASSWORD_RESET_CONFIG,
  PASSWORD_RESET_METHODS,
  RESET_CONFIG,
  STRONG_PASSWORD_MESSAGE,
  STRONG_PASSWORD_MESSAGE_BN,
  RESET_ERROR_CODES,
  RESET_STATUS,
  RESET_CHANNEL_CONFIG,
  TOKEN_PATTERNS,
  getResetExpiryMs,
  getOtpExpiryMs,
  PasswordgetCooldownMs,
  isResetChannelSupported,
  getResetTemplate,
  getResetEmailSubject,
  isResetFeatureEnabled,
  getResetRateLimit,
  isConcurrentResetAllowed,
  getResetLockoutMs,
  formatResetTemplate,
} from './password-reset.constants';

export type {
  PasswordResetConfig,
  PasswordResetConfigKey,
  ResetChannel,
  PasswordDefaultChannelOrder,
  PasswordResetOptions,
  ResetMethod,
  ResetErrorCode,
  ResetStatus,
  ResetChannelConfig,
} from './password-reset.constants';

// ============================================================
// Permission Constants
// ============================================================
export {
  PERMISSIONS,
  PERMISSION_GROUPS,
  ALL_PERMISSIONS,
  PERMISSION_CATEGORIES,
  PERMISSION_TO_CATEGORY,
} from './permission.constants';

export type {
  Permission,
  PermissionGroup,
  AllPermissions,
  PermissionCategory,
} from './permission.constants';

// ============================================================
// Queue Constants
// ============================================================
export {
  QUEUE_CONNECTION_CONFIG,
  QUEUE_WORKER_CONFIG,
  QUEUE_MONITORING_CONFIG,
  QUEUE_BACKPRESSURE_CONFIG,
  QUEUE_SECURITY,
  QUEUES,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUE_DLX,
  QUEUE_PRIORITIES,
  QUEUE_CONCURRENCY,
} from './queue.constants';

export type {
  Queue,
  Exchange,
  RoutingKey,
  QueuePriority,
  QueueConcurrency,
} from './queue.constants';

// ============================================================
// Regex Constants
// ============================================================
export {
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_NID,
  REGEX_TIN,
  REGEX_BIN,
  REGEX_POSTAL_CODE,
  REGEX_BANK_ACCOUNT,
  REGEX_MFS,
  REGEX_URL,
  REGEX_SLUG,
  REGEX_USERNAME,
  REGEX_SKU,
  REGEX_ISBN,
  REGEX_DATE,
  REGEX_COLOR,
  JWT_PATTERN,
  TOKEN_TYPE,
  IPV4_PATTERN,
  IPV6_PATTERN,
} from './regex.constants';

export type {
  RegexEmail,
  RegexPassword,
  RegexPhone,
  BangladeshOperator,
  RegexNid,
  RegexTin,
  RegexBin,
  RegexPostalCode,
  RegexBankAccount,
  RegexMfs,
  RegexUrl,
  RegexSlug,
  RegexUsername,
  RegexSku,
  RegexIsbn,
  RegexDate,
} from './regex.constants';

// ============================================================
// Reset Method Constants
// ============================================================
export {
  RESET_METHODS,
  RESET_METHODS_ARRAY,
  DEFAULT_RESET_METHOD,
  RESET_METHOD_DISPLAY_NAMES,
  RESET_METHOD_DISPLAY_NAMES_BN,
  RESET_METHOD_PRIORITIES,
  RESET_METHOD_CATEGORIES,
  RESET_METHOD_CONFIG,
  PASSWORD_RESET_CONFIGS,
  isSupportedResetMethod,
  getEnabledResetMethods,
  getResetMethodPriority,
  getResetMethodDisplayName,
} from './reset-method.constants';

export type {
  Reset_Method,
  ResetMethodDisplayName,
  ResetMethodDisplayNameBn,
  ResetMethodPriority,
  ResetMethodCategory,
  ResetMethodConfigType,
} from './reset-method.constants';

// ============================================================
// Risk Thresholds Constants
// ============================================================
export {
  RISK_THRESHOLDS,
  RISK_WEIGHTS,
  RISK_LEVELS,
  getRiskLevelForScore,
  getRiskLevelName,
  getRiskColor,
  getMitigationAction,
} from './risk-thresholds.constants';

export type {
  RiskThresholdsType,
  RiskWeightsType,
  RiskLevelType,
  RiskSeverity,
  RiskLevelKey,
} from './risk-thresholds.constants';

// ============================================================
// Role Constants
// ============================================================
export {
  ROLES,
  ROLE_DISPLAY_NAMES,
  ROLE_HIERARCHY,
  ROLE_INHERITANCE,
  DEFAULT_ROLE,
  ROLE_CATEGORIES,
  ROLE_TO_CATEGORY,
  ROLE_METADATA,
  ROLE_ASSIGNMENT_LIMITS,
  ROLE_COLORS,
} from './role.constants';

export type {
  Role,
  RoleCategory,
} from './role.constants';

// ============================================================
// Security Constants
// ============================================================
export {
  CSP_DIRECTIVES,
  SECURITY_HEADERS,
  SECURITY_HEADER_VALUES,
  EMAIL_CONFIG as SECURITY_EMAIL_CONFIG,
  DATE_CONFIG,
  NUMBER_CONFIG,
  CURRENCY_CONFIG,
  STRING_CONFIG,
  PHONE_CONFIG,
  SANITIZE_CONFIG,
  CORS_CONFIG,
  RATE_LIMITS,
} from './security.constants';

export type {
  // Add types if exported from security.constants
} from './security.constants';

// ============================================================
// Session Constants
// ============================================================
export {
  SESSION_STATUS,
  SESSION_TTL,
  SESSION_CONSTANTS,
  SESSION_IDLE_TIMEOUT,
  SESSION_STORE_CONFIG,
  SESSION_SYNC,
  SESSION_VALIDATION,
  SESSION_MONITORING,
  DEVICE_TRUST,
  SESSION_METADATA,
  TRUST_LEVELS,
  MAX_CONCURRENT_SESSIONS,
  SESSION_REVOCATION_REASONS,
  SESSION_CLEANUP,
  SESSION_LOCATION,
  SESSION_EXTENSION,
  SESSION_EVENTS,
  FAMILY_SESSION_SHARING,
} from './session.constants';

export type {
  SessionConstants,
} from './session.constants';

// ============================================================
// Social Constants
// ============================================================
export {
  SOCIAL_PROVIDERS,
  SOCIAL_PROVIDER_CATEGORIES,
  PROVIDER_TO_CATEGORY,
  OAUTH_SCOPES,
  SOCIAL_CALLBACK_ROUTES,
  SOCIAL_DISPLAY_NAMES,
  SOCIAL_DISPLAY_NAMES_BN,
  SOCIAL_COLORS,
  SOCIAL_ICONS,
  SOCIAL_PROVIDER_PRIORITY,
  SOCIAL_PROVIDER_TRUST_LEVELS,
  SOCIAL_AUTH_RATE_LIMITS,
  SOCIAL_ACCOUNT_LINKING,
  OAUTH_STATE_CONFIG,
  SOCIAL_PROVIDER_FEATURES,
} from './social.constants';

export type {
  SocialProvider,
  SocialProviderCategory,
  ProviderToCategory,
  OAuthScopes,
  SocialCallbackRoutes,
  SocialDisplayNames,
  SocialDisplayNamesBn,
  SocialColors,
  SocialIcons,
  SocialProviderPriority,
  SocialProviderTrustLevels,
  SocialAuthRateLimits,
  SocialAccountLinking,
  OAuthStateConfig,
} from './social.constants';

// ============================================================
// Token Generator Constants
// ============================================================
export {
  JWT_CONFIG,
  OTP_CONFIG as TOKEN_OTP_CONFIG,
  RECOVERY_CODES_CONFIG as TOKEN_RECOVERY_CODES_CONFIG,
  API_KEY_CONFIG,
  MAGIC_LINK_CONFIG as TOKEN_MAGIC_LINK_CONFIG,
  SESSION_TRANSFER_CONFIG,
  DEVICE_TRUST_CONFIG,
  WEBAUTHN_CONFIG as TOKEN_WEBAUTHN_CONFIG,
  TOKEN_GENERATOR_CONFIG,
  TOKEN_CONFIG,
  ENVIRONMENT_TOKEN_CONFIG,
  getTokenExpiry,
  getOtpExpiry,
  isValidTokenType,
  getCharacterSet,
  getBangladeshBankCompliantConfig,
} from './token-generator.constants';

export type {
  JWTConfig,
  OTPConfig,
  RecoveryCodesConfig,
  APIKeyConfig,
  MagicLinkConfig,
  SessionTransferConfig,
  DeviceTrustConfig,
  WebAuthnConfig,
  TokenGeneratorConfig,
  TokenConfig,
} from './token-generator.constants';

// ============================================================
// Transaction Manager Constants
// ============================================================
export {
  TRANSACTION_ISOLATION_LEVELS,
  TRANSACTION_PROPAGATION,
  TRANSACTION_TIMEOUTS,
  TRANSACTION_RETRY_CONFIG,
  DISTRIBUTED_TRANSACTION_PATTERNS,
  TRANSACTION_STATUS,
  DEADLOCK_STRATEGIES,
  DEADLOCK_DETECTION,
  DATABASE_LOCK_TYPES,
  NESTED_TRANSACTION,
  BBANK_TRANSACTION_COMPLIANCE,
  TRANSACTION_TYPES,
  TRANSACTION_PRIORITIES,
  TRANSACTION_LOG_LEVELS,
  TRANSACTION_LOGGING,
  TRANSACTION_CONFIG,
} from './transaction-manager.constants';

export type {
  TransactionIsolationLevel,
  TransactionPropagation,
  TransactionTimeout,
  TransactionRetryConfig,
  DistributedTransactionPattern,
  TransactionStatus,
  DeadlockStrategy,
  DeadlockDetection,
  DatabaseLockType,
  NestedTransaction,
  BBankTransactionCompliance,
  TransactionType,
  TransactionPriority,
  TransactionLogLevel,
  TransactionLogging,
} from './transaction-manager.constants';

// ============================================================
// User Agent Constants
// ============================================================
export {
  BROWSER_PATTERNS,
  BANGLADESH_BROWSER_PATTERNS,
  OS_PATTERNS,
  DEVICE_PATTERNS,
  FEATURE_PHONE_PATTERNS,
  BOT_PATTERNS,
  SUSPICIOUS_PATTERNS,
  BROWSER_CATEGORY,
  USER_AGENT_CATEGORIES,
  BROWSER_CAPABILITIES,
  USER_AGENT_CONFIG,
  SUPPORTED_LANGUAGES,
} from './user-agent.constants';

export type {
  BrowserPattern,
  OSPattern,
  DevicePattern,
  BrowserInfo,
  OSInfo,
  DeviceInfo,
  UserAgentCategory,
} from './user-agent.constants';

// ============================================================
// User Constants
// ============================================================
export {
  USER_ROLES,
  USER_STATUSES,
  USER_TIERS,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  USER_MOBILE_OPERATORS,
  USER_NETWORK_TYPES,
  USER_DELETION_REASONS,
  USER_SUSPENSION_REASONS,
} from './user.constants';

export type {
  UserRole,
  UserStatus,
  UserTier,
  BangladeshDistrict,
  BangladeshUpazila,
  UserMobileOperator,
  UserNetworkType,
  UserDeletionReason,
  UserSuspensionReason,
  UserConstants,
} from './user.constants';

// ============================================================
// Validation Messages Constants
// ============================================================
export {
  VALIDATION_MESSAGES_EN,
  VALIDATION_MESSAGES_BN,
} from './validation-messages.constants';

export type {
  SupportedLocale,
  MessageFunction,
  MessageType,
  MessageCategory,
  ValidationMessageKey,
} from './validation-messages.constants';

// ============================================================
// Bangladesh Specific Aggregations (Convenience exports)
// ============================================================
export {
  BANGLADESH_DISTRICTS as BD_DISTRICTS,
  BANGLADESH_UPAZILAS as BD_UPAZILAS,
  USER_MOBILE_OPERATORS as BD_MOBILE_OPERATORS,
} from './user.constants';

export {
  SMS_GATEWAY_CONFIG as BD_SMS_GATEWAYS,
  WHATSAPP_TEMPLATES as BD_WHATSAPP_TEMPLATES,
} from './notification.constants';

export {
  BANGLADESH_PASSWORD_PATTERNS as BD_PASSWORD_PATTERNS,
} from './password-patterns.constants';

export {
  REGEX_PHONE as BD_PHONE_REGEX,
  REGEX_NID as BD_NID_REGEX,
  REGEX_TIN as BD_TIN_REGEX,
  REGEX_BIN as BD_BIN_REGEX,
  REGEX_POSTAL_CODE as BD_POSTAL_CODE_REGEX,
  REGEX_MFS as BD_MFS_REGEX,
} from './regex.constants';

export {
  BANGLADESH_NOTIFICATION_CONFIG as BD_NOTIFICATION_CONFIG,
} from './notification.constants';

export {
  BD_BANK_COMPLIANCE_CONFIG as BD_BANK_HASHING_CONFIG,
} from './password-hasher.constants';

export {
  BBANK_TRANSACTION_COMPLIANCE as BD_BANK_TX_COMPLIANCE,
} from './transaction-manager.constants';

// ============================================================
// Security Constants
// ============================================================
export {
  CSP_DIRECTIVES,
  SECURITY_HEADERS,
  SECURITY_HEADER_VALUES,
  EMAIL_CONFIG as SECURITY_EMAIL_CONFIG,  // নামের দ্বন্দ্ব এড়াতে alias
  DATE_CONFIG,
  NUMBER_CONFIG,
  CURRENCY_CONFIG,
  STRING_CONFIG,
  PHONE_CONFIG,
  SANITIZE_CONFIG,
  CORS_CONFIG,
  RATE_LIMITS,
  SESSION_SECURITY,
  ENCRYPTION_CONFIG,
  JWT_CONFIG as SECURITY_JWT_CONFIG,      // alias
  API_KEY_CONFIG as SECURITY_API_KEY_CONFIG,
  IP_BLACKLIST,
  SECURITY_EVENTS,
  SECURITY_ALERT_THRESHOLDS,
  BD_SECURITY_SETTINGS,
  PAYMENT_GATEWAY_SECURITY,
  SECURITY_LOGGING,
  SECURITY_TESTING,
} from './security.constants';

export type {
  CSPDirectives,
  CORSConfig,
  RateLimits,
  SessionSecurity,
  EncryptionConfig,
  JWTConfig,
} from './security.constants';


// ============================================================
// Email Constants (New)
// ============================================================
export {
  DISPOSABLE_DOMAINS,
  DISPOSABLE_DOMAINS_SET,
  FREE_EMAIL_DOMAINS,
  FREE_EMAIL_DOMAINS_SET,
  BANGLADESH_COMMERCIAL_DOMAINS,
  BANGLADESH_COMMERCIAL_DOMAINS_SET,
  BANGLADESH_EDUCATIONAL_DOMAINS,
  BANGLADESH_EDUCATIONAL_DOMAINS_SET,
  BANGLADESH_GOVERNMENT_DOMAINS,
  BANGLADESH_GOVERNMENT_DOMAINS_SET,
  BANGLADESH_CORPORATE_DOMAINS,
  BANGLADESH_CORPORATE_DOMAINS_SET,
  INTERNATIONAL_EDUCATIONAL_DOMAINS,
  INTERNATIONAL_EDUCATIONAL_DOMAINS_SET,
  INTERNATIONAL_GOVERNMENT_DOMAINS,
  INTERNATIONAL_GOVERNMENT_DOMAINS_SET,
  EMAIL_VALIDATION_PATTERNS,
  EMAIL_CATEGORY,
  EMAIL_CATEGORY_PRIORITY,
  EMAIL_CONFIG,
  ALL_EMAIL_DOMAINS,
} from './email.constants';

export type {
  EmailDomainCategory,
  EmailValidationPattern,
  EmailValidationPatternKey,
  EmailConfig,
  EmailDomainCategoryType,
  EmailValidationPatternType,
} from './email.constants';

// ============================================================
// Type-safe Configuration Helpers (Re-exported from respective files)
// ============================================================
// Note: Helper functions are re-exported from their source files above.
// Key helper functions available:
// - from email-verification: getExpiryMs, getCooldownMs, isChannelSupported
// - from password-history: getExpiryDaysForTier, isPasswordExpired
// - from password-reset: getResetExpiryMs, getResetTemplate, isResetChannelSupported
// - from reset-method: getEnabledResetMethods, getResetMethodDisplayName
// - from risk-thresholds: getRiskLevelForScore, getRiskColor
// - from token-generator: getTokenExpiry, getOtpExpiry, isValidTokenType
// - from user-agent: (type definitions only, no helper functions)
