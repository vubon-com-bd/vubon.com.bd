/**
 * Common Constants Exports
 * Export all common constants from a single entry point
 */

// Export Product constants
export {
  ProductHttpStatus,
  ProductHttpStatusMessages,
  type ProductHttpStatusCode,
  ProductRegex,
  ProductRegexTester,
  ProductCache,
  ProductCacheKey,
  ProductCacheTTL,
  ProductQueue,
  ProductQueueConfig,
  type ProductQueueName,
  type ProductQueueEvent,
  type ProductJobType,
} from './product';

// Export Checkout constants
export {
  CheckoutHttpStatus,
  CheckoutHttpStatusMessages,
  CheckoutHttpStatusCategories,
  type CheckoutHttpStatusCode,
  CheckoutRegex,
  CheckoutRegexTester,
  CheckoutCache,
  CheckoutCacheKey,
  CheckoutCacheTTL,
  CheckoutQueue,
  CheckoutQueueConfig,
  type CheckoutQueueName,
  type CheckoutQueueEvent,
  type CheckoutJobType,
} from './checkout';

// Export Cart constants
export {
  CartHttpStatus,
  CartHttpStatusMessages,
  CartHttpStatusCategories,
  type CartHttpStatusCode,
  CartRegex,
  CartRegexTester,
  CartCache,
  CartCacheKey,
  CartCacheTTL,
  CartQueue,
  CartQueueConfig,
  type CartQueueName,
  type CartQueueEvent,
  type CartJobType,
} from './cart';

// Export Search & Discovery constants
export {
  SearchHttpStatus,
  SearchHttpStatusMessages,
  SearchHttpStatusCategories,
  type SearchHttpStatusCode,
  SearchRegex,
  SearchRegexTester,
  SearchCache,
  SearchCacheKey,
  SearchCacheTTL,
  SearchQueue,
  SearchQueueConfig,
  type SearchQueueName,
  type SearchQueueEvent,
  type SearchJobType,
} from './search-discovery';

// Export Vendor constants
export {
  VendorHttpStatus,
  VendorHttpStatusMessages,
  VendorHttpStatusCategories,
  VendorHttpStatusDescriptions,
  type VendorHttpStatusCode,
  VendorRegex,
  VendorRegexDescriptions,
  VendorRegexExamples,
  VendorRegexValidationMessages,
  VendorRegexTester,
  VendorCache,
  VendorCacheKey,
  VendorCacheTTL,
  VendorCacheStrategy,
  VendorQueue,
  VendorQueueConfig,
  type VendorQueueName,
  type VendorQueueEvent,
  type VendorJobType,
} from './vendor';

// Export Logistics constants
export {
  LogisticsHttpStatus,
  LogisticsHttpStatusMessages,
  LogisticsHttpStatusCategories,
  type LogisticsHttpStatusCode,
  LogisticsRegex,
  LogisticsRegexTester,
  LogisticsCache,
  LogisticsCacheKey,
  LogisticsCacheTTL,
  LogisticsCacheConfig,
  LogisticsQueue,
  LogisticsQueueConfig,
  type LogisticsQueueName,
  type LogisticsQueueEvent,
  type LogisticsJobType,
  type LogisticsExchangeType,
} from './logistics';

// Export Support constants
export {
  SupportHttpStatus,
  SupportHttpStatusMessages,
  SupportHttpStatusCategories,
  type SupportHttpStatusCode,
  SupportRegex,
  SupportRegexTester,
  SupportCache,
  SupportCacheKey,
  SupportCacheTTL,
  SupportCacheConfig,
  SupportQueue,
  SupportQueueConfig,
  type SupportQueueName,
  type SupportQueueEvent,
  type SupportJobType,
} from './support';

// Export Notification constants
export {
  NotificationHttpStatus,
  NotificationHttpStatusMessages,
  NotificationHttpStatusCategories,
  type NotificationHttpStatusCode,
  NotificationRegex,
  NotificationRegexTester,
  NotificationCache,
  NotificationCacheKey,
  NotificationCacheTTL,
  NotificationCacheConfig,
  NotificationQueue,
  NotificationQueueConfig,
  type NotificationQueueName,
  type NotificationQueueEvent,
  type NotificationJobType,
} from './notification';

// Export Content & Marketing constants
export {
  ContentMarketingHttpStatus,
  ContentMarketingHttpStatusMessages,
  ContentMarketingHttpStatusCategories,
  type ContentMarketingHttpStatusCode,
  ContentMarketingRegex,
  ContentMarketingRegexTester,
  ContentMarketingCache,
  ContentMarketingCacheKey,
  ContentMarketingCacheTTL,
  ContentMarketingCacheConfig,
  ContentMarketingQueue,
  ContentMarketingQueueConfig,
  type ContentMarketingQueueName,
  type ContentMarketingQueueEvent,
  type ContentMarketingJobType,
} from './Content-Marketing';

/**
 * Common Constants Exports
 * Export all common constants from a single entry point
 * This file serves as the main entry point for all common constants
 */

// Export Flash Sales & Deals constants
export {
  // HTTP Status
  FlashSalesDealsHttpStatus,
  FlashSalesDealsHttpStatusMessages,
  FlashSalesDealsHttpStatusCategories,
  FlashSalesDealsBusinessErrors,
  FlashSalesDealsBusinessErrorMessages,
  type FlashSalesDealsHttpStatusCode,
  type FlashSalesDealsBusinessErrorCode,
  type FlashSalesDealsHttpStatusCategory,
  isFlashSalesDealsBusinessError,
  getFlashSalesDealsErrorMessage,
  getFlashSalesDealsStatusCategory,

  // Regex
  FlashSalesDealsRegex,
  FlashSalesDealsRegexTester,
  FlashSalesDealsRegexValidation,

  // Cache
  FlashSalesDealsCache,
  FlashSalesDealsCacheKey,
  FlashSalesDealsCacheTTL,
  FlashSalesDealsCacheTTLHelper,
  FlashSalesDealsCacheConfig,
  FlashSalesDealsCachePrefixes,
  FlashSalesDealsCacheDelimiters,
  FlashSalesDealsCacheVersion,
  FlashSalesDealsCacheStrategies,
  FlashSalesDealsCacheEviction,
  FlashSalesDealsCacheEvents,
  FlashSalesDealsCacheBatch,
  FlashSalesDealsCachePagination,
  FlashSalesDealsCacheCompression,
  FlashSalesDealsCacheSerialization,
  FlashSalesDealsCacheIgnorePatterns,
  FlashSalesDealsCacheNoCachePatterns,
  type FlashSalesDealsCachePrefix,
  type FlashSalesDealsCacheDelimiter,
  type FlashSalesDealsCacheStrategy,
  type FlashSalesDealsCacheEvictionPolicy,
  type FlashSalesDealsCacheEvent,

  // Queue
  FlashSalesDealsQueue,
  FlashSalesDealsQueueHelper,
  FlashSalesDealsQueueNames,
  FlashSalesDealsQueuePrefixes,
  FlashSalesDealsQueueConfig,
  FlashSalesDealsJobConfig,
  FlashSalesDealsDeadLetterConfig,
  FlashSalesDealsDelayedConfig,
  FlashSalesDealsScheduledConfig,
  FlashSalesDealsPriorities,
  FlashSalesDealsQueueEvents,
  FlashSalesDealsDeliveryModes,
  FlashSalesDealsExchangeTypes,
  FlashSalesDealsQueueTypes,
  FlashSalesDealsJobTypes,
  FlashSalesDealsRetryConfig,
  FlashSalesDealsConcurrency,
  FlashSalesDealsQueueArguments,
  FlashSalesDealsBatchConfig,
  FlashSalesDealsMetricsConfig,
  FlashSalesDealsMonitoringConfig,
  type FlashSalesDealsQueueName,
  type FlashSalesDealsQueuePrefix,
  type FlashSalesDealsQueueEvent,
  type FlashSalesDealsJobType,
  type FlashSalesDealsPriority,
  type FlashSalesDealsQueueType,
  type FlashSalesDealsExchangeType,
  type FlashSalesDealsDeliveryMode,
  type FlashSalesDealsRetryStrategy,
  type FlashSalesDealsConcurrencyLevel,
} from './Flash-Sales-Deals';

// Export Analytics constants
export {
  AnalyticsHttpStatus,
  AnalyticsHttpStatusMessages,
  AnalyticsHttpStatusCategories,
  AnalyticsHttpStatusDescriptions,
  type AnalyticsHttpStatusCode,
  AnalyticsRegex,
  AnalyticsRegexTester,
  AnalyticsCache,
  AnalyticsCacheKey,
  AnalyticsCacheTTL,
  AnalyticsCacheConfig,
  AnalyticsQueue,
  AnalyticsQueueConfig,
  type AnalyticsQueueName,
  type AnalyticsQueueEvent,
  type AnalyticsJobType,
  type AnalyticsExchangeType,
} from './Analytics';

// Export SEO & AI constants
export {
  SeoAiHttpStatus,
  SeoAiHttpStatusMessage,
  SeoAiHttpStatusGroup,
  type SeoAiHttpStatusCode,
  SeoAiRegex,
  SeoAiRegexTester,
  SeoAiCache,
  SeoAiCacheKey,
  SeoAiCacheTTL,
  SeoAiCacheConfig,
  SeoAiQueue,
  SeoAiQueueConfig,
  type SeoAiQueueName,
  type SeoAiQueueEvent,
  type SeoAiJobType,
  type SeoAiJobStatus,
} from './seo-ai';

// Export Auth constants
export {
  AuthHttpStatus,
  AuthHttpStatusMessages,
  AuthHttpStatusCategories,
  AuthHttpStatusHelpers,
  type AuthHttpStatusCode,
  type AuthHttpStatusCategory,
  AuthRegex,
  AuthRegexDescriptions,
  AuthRegexValidationMessages,
  AuthRegexTester,
  AuthCache,
  AuthCacheKey,
  AuthCacheTTL,
  AuthCacheConfig,
  AuthCacheEvent,
  AuthQueue,
  AuthQueueConfig,
  AuthQueueValidator,
  type AuthQueueName,
  type AuthQueueEvent,
  type AuthJobType,
  type AuthQueueType,
} from './auth';
