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

// ============================================
// ✅ নোটিফিকেশন কমন কনস্ট্যান্টসমূহ
// ============================================

// ডিফল্ট কনফিগারেশন
export {
  COMMON_MAX_RETRY_ATTEMPTS,
  COMMON_BATCH_SIZE,
  COMMON_TIMEOUT_MS,
  COMMON_RATE_LIMIT_PER_SECOND,
  COMMON_MAX_PAYLOAD_SIZE_KB,
  COMMON_DEFAULT_LOCALE,
  COMMON_DEFAULT_TIMEZONE,
} from './notification-common.constants';

// ভাষা
export {
  COMMON_LANGUAGE_EN,
  COMMON_LANGUAGE_BN,
  COMMON_LANGUAGE_HI,
  COMMON_LANGUAGE_AR,
  COMMON_LANGUAGE_ES,
  COMMON_LANGUAGE_FR,
  COMMON_LANGUAGE_DE,
  COMMON_LANGUAGE_ZH,
  COMMON_LANGUAGE_LABELS,
} from './notification-common.constants';

// নোটিফিকেশন সোর্স
export {
  COMMON_SOURCE_SYSTEM,
  COMMON_SOURCE_USER,
  COMMON_SOURCE_ADMIN,
  COMMON_SOURCE_AUTOMATION,
  COMMON_SOURCE_THIRD_PARTY,
  COMMON_SOURCE_SCHEDULER,
  COMMON_SOURCE_API,
  COMMON_SOURCE_LABELS,
} from './notification-common.constants';

// ফরম্যাট টাইপ
export {
  COMMON_FORMAT_JSON,
  COMMON_FORMAT_XML,
  COMMON_FORMAT_HTML,
  COMMON_FORMAT_PLAIN_TEXT,
  COMMON_FORMAT_MARKDOWN,
  COMMON_FORMAT_TEMPLATE,
  COMMON_FORMAT_LABELS,
} from './notification-common.constants';

// রিট্রাই স্ট্র্যাটেজি
export {
  COMMON_RETRY_STRATEGY_LINEAR,
  COMMON_RETRY_STRATEGY_EXPONENTIAL,
  COMMON_RETRY_STRATEGY_FIXED,
  COMMON_RETRY_STRATEGY_CUSTOM,
  COMMON_RETRY_STRATEGY_LABELS,
} from './notification-common.constants';

// ইভেন্ট টাইপ
export {
  COMMON_EVENT_CREATED,
  COMMON_EVENT_SENT,
  COMMON_EVENT_DELIVERED,
  COMMON_EVENT_OPENED,
  COMMON_EVENT_CLICKED,
  COMMON_EVENT_FAILED,
  COMMON_EVENT_BOUNCED,
  COMMON_EVENT_UNSUBSCRIBED,
  COMMON_EVENT_COMPLAINED,
  COMMON_EVENT_SUPPRESSED,
  COMMON_EVENT_LABELS,
} from './notification-common.constants';

// ফিল্টার অপারেটর
export {
  COMMON_FILTER_OPERATOR_EQUALS,
  COMMON_FILTER_OPERATOR_NOT_EQUALS,
  COMMON_FILTER_OPERATOR_GREATER_THAN,
  COMMON_FILTER_OPERATOR_LESS_THAN,
  COMMON_FILTER_OPERATOR_GREATER_THAN_OR_EQUALS,
  COMMON_FILTER_OPERATOR_LESS_THAN_OR_EQUALS,
  COMMON_FILTER_OPERATOR_CONTAINS,
  COMMON_FILTER_OPERATOR_NOT_CONTAINS,
  COMMON_FILTER_OPERATOR_STARTS_WITH,
  COMMON_FILTER_OPERATOR_ENDS_WITH,
  COMMON_FILTER_OPERATOR_IN,
  COMMON_FILTER_OPERATOR_NOT_IN,
  COMMON_FILTER_OPERATOR_BETWEEN,
  COMMON_FILTER_OPERATOR_IS_NULL,
  COMMON_FILTER_OPERATOR_IS_NOT_NULL,
  COMMON_FILTER_OPERATOR_LABELS,
} from './notification-common.constants';

// পেজিনেশন
export {
  COMMON_PAGINATION_DEFAULT_PAGE,
  COMMON_PAGINATION_DEFAULT_LIMIT,
  COMMON_PAGINATION_MAX_LIMIT,
  COMMON_PAGINATION_DEFAULT_SORT,
  COMMON_PAGINATION_DEFAULT_ORDER,
  COMMON_PAGINATION_ORDER_ASC,
  COMMON_PAGINATION_ORDER_DESC,
} from './notification-common.constants';

// সিকিউরিটি
export {
  COMMON_MAX_RECIPIENTS_PER_NOTIFICATION,
  COMMON_MAX_ATTACHMENTS,
  COMMON_MAX_TAGS_PER_NOTIFICATION,
  COMMON_MAX_METADATA_SIZE_KB,
  COMMON_ALLOWED_ORIGINS,
} from './notification-common.constants';

// লগ লেভেল
export {
  COMMON_LOG_LEVEL_DEBUG,
  COMMON_LOG_LEVEL_INFO,
  COMMON_LOG_LEVEL_WARN,
  COMMON_LOG_LEVEL_ERROR,
  COMMON_LOG_LEVEL_FATAL,
  COMMON_LOG_LEVEL_LABELS,
} from './notification-common.constants';

// টাইপসমূহ
export type {
  CommonSupportedLanguage,
  CommonNotificationSource,
  CommonFormatType,
  CommonRetryStrategy,
  CommonEventType,
  CommonFilterOperator,
  CommonSortOrder,
  CommonLogLevel,
} from './notification-common.constants';

// ============================================
// ✅ লজিস্টিকস কমন কনস্ট্যান্টসমূহ
// ⚠️ শুধুমাত্র non-conflicting items export করা হয়েছে
// ============================================

// কোর কনফিগারেশন (কোন কনফ্লিক্ট নেই)
export {
  LOGISTICS_DEFAULT_CURRENCY,
  LOGISTICS_TIMEZONE,
  LOGISTICS_DEFAULT_LOCALE,
  LOGISTICS_GEOCODING_PROVIDER,
  LOGISTICS_WEIGHT_UNIT,
  LOGISTICS_DISTANCE_UNIT,
  LOGISTICS_VOLUME_UNIT,
  LOGISTICS_TIME_UNIT,
  LOGISTICS_SYSTEM_NAME,
  LOGISTICS_SYSTEM_VERSION,
  LOGISTICS_COMPANY_NAME,
  LOGISTICS_WEBSITE_URL,
  LOGISTICS_SUPPORT_EMAIL,
  LOGISTICS_SUPPORT_PHONE,
  LOGISTICS_COMMON_CONFIG,
  type LogisticsCommonConfig,
} from './logistics-common.constants';

// ⚠️ TRACKING_* কনস্ট্যান্টগুলি logistics মডিউল থেকে export করা হবে
// তাই এখানে export করা হচ্ছে না

// শিপিং ও ডেলিভারি কনস্ট্যান্ট (কোন কনফ্লিক্ট নেই)
export {
  DEFAULT_SHIPPING_METHOD,
  DEFAULT_DELIVERY_TIME_LIMIT_HOURS,
  DEFAULT_DELIVERY_WINDOW_MINUTES,
  DEFAULT_REORDER_POINT,
  DEFAULT_SAFETY_STOCK_LEVEL,
  DEFAULT_DELIVERY_CONFIRMATION_TIMEOUT_MINUTES,
  SHIPPING_DELIVERY_CONFIG,
  type ShippingDeliveryConfig,
} from './logistics-common.constants';

// ⚠️ MAX_SHIPMENT_WEIGHT_KG, MAX_DELIVERY_ATTEMPTS, DEFAULT_SHIPMENT_TIMEOUT_HOURS
// logistics মডিউল থেকে export করা হবে

// সম্পূর্ণ কমন কনফিগারেশন
export { LOGISTICS_COMMON, type LogisticsCommon } from './logistics-common.constants';

// ============================================
// ✅ ভেন্ডার কমন কনস্ট্যান্টসমূহ
// ============================================

// ভেন্ডার আইডি ও ডিফল্ট স্ট্যাটাস
export { VENDOR_ID_PREFIX, DEFAULT_VENDOR_STATUS } from './vendor-common.constants';

// ভেন্ডার স্ট্যাটাস লিস্ট
export {
  VENDOR_STATUSES,
  VENDOR_STATUS_LABELS,
  type VendorStatusType,
} from './vendor-common.constants';

// ভেন্ডার টায়ার লিস্ট
export {
  VENDOR_TIERS,
  VENDOR_TIER_LABELS,
  VENDOR_TIER_ORDER,
  type VendorTierType,
} from './vendor-common.constants';

// ভেন্ডার কমিশন টাইপ
export {
  VENDOR_COMMISSION_TYPES,
  VENDOR_COMMISSION_TYPE_LABELS,
  type VendorCommissionType,
} from './vendor-common.constants';

// ভেন্ডার পেআউট স্ট্যাটাস
export {
  VENDOR_PAYOUT_STATUSES,
  VENDOR_PAYOUT_STATUS_LABELS,
  type VendorPayoutStatusType,
} from './vendor-common.constants';

// ভেন্ডার ডকুমেন্ট টাইপ
export {
  VENDOR_DOCUMENT_TYPES,
  VENDOR_DOCUMENT_TYPE_LABELS,
  type VendorDocumentType,
} from './vendor-common.constants';

// ভেন্ডার সাবস্ক্রিপশন প্ল্যান
export {
  VENDOR_SUBSCRIPTION_PLANS,
  VENDOR_SUBSCRIPTION_PLAN_LABELS,
  VENDOR_SUBSCRIPTION_PLAN_ORDER,
  type VendorSubscriptionPlanType,
} from './vendor-common.constants';

// ভেন্ডার ডিফল্ট সেটিংস
export { VENDOR_DEFAULT_SETTINGS } from './vendor-common.constants';

// ⚠️ ইউটিলিটি ফাংশনগুলি logistics মডিউল থেকে export করা হবে
// generateTrackingNumber, isValidTrackingNumber
// convertWeight, convertDistance
// getLogisticsCurrentTime, getLogisticsTimeInTimezone
// formatLogisticsDate, formatLogisticsTime, formatLogisticsDateTime
