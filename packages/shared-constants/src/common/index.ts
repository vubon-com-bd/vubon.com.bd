/**
 * @fileoverview Common constants exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  QueueType,
  QueuePriority,
  QueueDeliveryMode,
  QueueAckMode,
  QueueExchangeType,
  QueueRetryStrategy,
  // Constants
  DEFAULT_QUEUE_CONFIG,
  QUEUE_NAME_PREFIXES,
  DEFAULT_QUEUE_DEAD_LETTER_SETTINGS,
  DEFAULT_QUEUE_CONSUMER_SETTINGS,
  DEFAULT_QUEUE_SHARDING_SETTINGS,
  DEFAULT_QUEUE_PARTITIONING_SETTINGS,
  DEFAULT_QUEUE_REPLICATION_SETTINGS,
  DEFAULT_QUEUE_CLUSTERING_SETTINGS,
  DEFAULT_QUEUE_MONITORING_SETTINGS,
  DEFAULT_QUEUE_ALERT_THRESHOLDS,
  DEFAULT_QUEUE_METRICS_COLLECTION,
  DEFAULT_QUEUE_CIRCUIT_BREAKER_SETTINGS,
  DEFAULT_QUEUE_BULKHEAD_SETTINGS,
  DEFAULT_QUEUE_RATE_LIMITER_SETTINGS,
  DEFAULT_QUEUE_THROTTLING_SETTINGS,
  DEFAULT_QUEUE_ROUTING_SETTINGS,
  DEFAULT_QUEUE_BINDING_SETTINGS,
  DEFAULT_QUEUE_DEADLINE_SETTINGS,
  QUEUE_CONSTANTS,
  // Functions
  getQueueTypeLabel,
  getQueuePriorityLabel,
  getQueueDeliveryModeLabel,
  getQueueAckModeLabel,
  getQueueExchangeTypeLabel,
  getQueueRetryStrategyLabel,
  buildQueueName,
  buildQueueNameFromParts,
  getQueuePriorityValue,
  calculateRetryDelay,
} from './queue.constants';

// Re-export from cache.constants
export {
  // Enums
  CacheStorageType,
  CacheEvictionStrategy,
  CacheRefreshPolicy,
  CacheReadStrategy,
  CacheWriteStrategy,
  // Constants
  DEFAULT_CACHE_CONFIG,
  CACHE_TTL_PRESETS,
  CACHE_KEY_PREFIXES,
  DEFAULT_CACHE_PARTITION_SETTINGS,
  DEFAULT_CACHE_REPLICATION_SETTINGS,
  DEFAULT_CACHE_CLUSTERING_SETTINGS,
  DEFAULT_CACHE_MONITORING_SETTINGS,
  DEFAULT_CACHE_ALERT_THRESHOLDS,
  DEFAULT_CACHE_METRICS_COLLECTION,
  DEFAULT_CACHE_HIT_MISS_THRESHOLDS,
  DEFAULT_CACHE_PENETRATION_SETTINGS,
  DEFAULT_CACHE_AVALANCHE_SETTINGS,
  DEFAULT_CACHE_BREAKDOWN_SETTINGS,
  CACHE_CONSTANTS,
  // Functions
  getCacheStorageTypeLabel,
  getCacheEvictionStrategyLabel,
  getCacheRefreshPolicyLabel,
  getCacheReadStrategyLabel,
  getCacheWriteStrategyLabel,
  getTTLPresetLabel,
  getTTLFromPreset,
  buildCacheKey,
  buildCacheKeyFromParts,
} from './cache.constants';

// Re-export from regex.constants
export {
  // Regex patterns
  EMAIL_REGEX,
  PHONE_REGEX,
  URL_REGEX,
  DATE_REGEX,
  TIME_REGEX,
  DATETIME_REGEX,
  ZIP_CODE_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  SLUG_REGEX,
  UUID_REGEX,
  HEX_COLOR_REGEX,
  IP_ADDRESS_REGEX,
  MAC_ADDRESS_REGEX,
  CREDIT_CARD_REGEX,
  CURRENCY_REGEX,
  PERCENTAGE_REGEX,
  ALPHANUMERIC_REGEX,
  ALPHABETIC_REGEX,
  NUMERIC_REGEX,
  EMAIL_DOMAIN_REGEX,
  HTML_TAG_REGEX,
  URL_SAFE_REGEX,
  BASE64_REGEX,
  JWT_REGEX,
  JSON_REGEX,
  XML_REGEX,
  HTML_ENTITY_REGEX,
  UNICODE_REGEX,
  WHITESPACE_REGEX,
  SPECIAL_CHARACTER_REGEX,
  REGEX_PATTERNS,
  // Validation functions
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidDate,
  isValidTime,
  isValidDatetime,
  isValidZipCode,
  isValidUsername,
  validatePassword,
  isValidSlug,
  isValidUuid,
  isValidHexColor,
  isValidIpAddress,
  isValidMacAddress,
  isValidCreditCard,
} from './regex.constants';

// Re-export from http-status.constants
export {
  // Enums
  HttpStatusCode,
  HttpStatusCategory,
  // Constants
  HTTP_STATUS_NAME,
  HTTP_STATUS_DESCRIPTION,
  HTTP_STATUS_CATEGORY,
  HTTP_STATUS_GROUPS,
  // Functions
  getHttpStatusName,
  getHttpStatusDescription,
  getHttpStatusCategory,
  isHttpSuccess,
  isHttpRedirection,
  isHttpClientError,
  isHttpServerError,
  isHttpError,
  isHttpRetryable,
  getHttpStatusCodeFromName,
} from './http-status.constants';
