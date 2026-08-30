/**
 * Common Constants Index
 * Export all common constants from a single entry point
 */

// HTTP Status Constants
export {
  HTTP_STATUS,
  HTTP_INFORMATIONAL,
  HTTP_SUCCESS,
  HTTP_REDIRECTION,
  HTTP_CLIENT_ERROR,
  HTTP_SERVER_ERROR,
  getHttpStatusCategory,
  getHttpStatusMessage,
  isSuccessStatus,
  isClientErrorStatus,
  isServerErrorStatus,
  isRedirectionStatus,
  isErrorStatus,
} from './http-status.constants';

export type { HttpStatusCode, HttpStatusCategory } from './http-status.constants';

// Regex Constants
export {
  // Email
  EMAIL_REGEX,
  // Phone
  BD_MOBILE_REGEX,
  INTERNATIONAL_MOBILE_REGEX,
  // Password
  PASSWORD_STRONG_REGEX,
  PASSWORD_MEDIUM_REGEX,
  // Username
  USERNAME_REGEX,
  // URL
  URL_REGEX,
  // UUID
  UUID_V4_REGEX,
  UUID_REGEX,
  // Bangladesh IDs
  BD_NID_REGEX,
  BD_BIRTH_REGEX,
  BD_PASSPORT_REGEX,
  BD_POSTAL_CODE_REGEX,
  // IP
  IP_V4_REGEX,
  IP_V6_REGEX,
  // Security
  HTML_TAG_REGEX,
  SQL_INJECTION_REGEX,
  XSS_REGEX,
  // Colors
  HEX_COLOR_REGEX,
  RGB_COLOR_REGEX,
  HSL_COLOR_REGEX,
  // Date & Time
  DATE_ISO_REGEX,
  DATE_DMY_REGEX,
  DATE_MDY_REGEX,
  TIME_24H_REGEX,
  TIME_24H_SHORT_REGEX,
  TIME_12H_REGEX,
  DATETIME_ISO_REGEX,
  // Credit Cards
  CREDIT_CARD_REGEX,
  VISA_REGEX,
  MASTERCARD_REGEX,
  AMEX_REGEX,
  DISCOVER_REGEX,
  // Cryptocurrency
  BITCOIN_REGEX,
  ETHEREUM_REGEX,
  // Amount
  BDT_AMOUNT_REGEX,
  PERCENTAGE_REGEX,
  // Coordinates
  LATITUDE_REGEX,
  LONGITUDE_REGEX,
  // File Extensions
  IMAGE_EXT_REGEX,
  DOCUMENT_EXT_REGEX,
  VIDEO_EXT_REGEX,
  AUDIO_EXT_REGEX,
  // MIME Types
  IMAGE_MIME_REGEX,
  VIDEO_MIME_REGEX,
  AUDIO_MIME_REGEX,
  APPLICATION_MIME_REGEX,
  // Helper Functions
  stripHtmlTags,
  hasSqlInjection,
  hasXssAttack,
  sanitizeHtml,
  isValidEmail,
  isValidBdMobile,
  isStrongPassword,
  isValidUrl,
} from './regex.constants';

// Cache Constants
export {
  CACHE_TTL,
  CACHE_TTL_MS,
  CACHE_KEY_PREFIX,
  CACHE_KEY_PATTERN,
  CACHE_OPERATION,
  CACHE_INVALIDATION,
  CACHE_STORAGE,
  CACHE_COMPRESSION,
  buildCacheKey,
  buildCacheKeyWithParts,
  buildPaginatedCacheKey,
  buildSortedCacheKey,
  buildFilteredCacheKey,
  buildSearchCacheKey,
  buildUserCacheKey,
  buildVendorCacheKey,
  buildDateCacheKey,
  msToSeconds,
  secondsToMs,
  isPermanentCache,
  getExpirationTimestamp,
  getRemainingTTL,
} from './cache.constants';

// Queue Constants
export {
  QUEUE_NAMES,
  QUEUE_PRIORITY,
  QUEUE_JOB_STATUS,
  QUEUE_JOB_TYPE,
  QUEUE_RETRY_STRATEGY,
  QUEUE_CONCURRENCY,
  QUEUE_EVENT,
  buildQueueName,
  buildJobKey,
  buildDeadLetterQueueName,
  buildRetryQueueName,
  buildDelayedQueueName,
  buildQueueGroupName,
  isJobRecoverable,
  getRetryDelay,
  getExponentialBackoffWithJitter,
} from './queue.constants';

export type { QueueOptions, JobOptions } from './queue.constants';

// Error Constants
export {
  ERROR_CODE,
  ERROR_MESSAGES,
  ERROR_CATEGORY,
  ERROR_SEVERITY,
  getErrorCategory,
  isFatalError,
  isRecoverableError,
  getErrorMessage,
  createError,
} from './error.constants';

// Status Constants
export {
  STATUS,
  STATUS_CATEGORY,
  STATUS_GROUP,
  STATUS_COLOR,
  STATUS_ICON,
  STATUS_LABEL,
  STATUS_PRIORITY,
  COMMON_STATUS_TRANSITIONS,
  isActiveStatus,
  isInactiveStatus,
  isTransitionalStatus,
  isTerminalStatus,
  getStatusCategory,
  getStatusColor,
  getStatusIcon,
  getStatusLabel,
  getStatusPriority,
  isValidStatus,
  getActiveStatuses,
  getInactiveStatuses,
  getTransitionalStatuses,
  getTerminalStatuses,
  validateStatusTransition,
  getAllowedNextStatuses,
  canTransitionTo,
} from './status.constants';

export type { StatusTransition } from './status.constants';

// Type Constants
export {
  DATA_TYPE,
  DB_COLUMN_TYPE,
  MONGO_DATA_TYPE,
  GRAPHQL_TYPE,
  OPENAPI_TYPE,
  MIME_TYPE,
  FILE_EXTENSION,
  CONTENT_ENCODING,
  LANGUAGE_TYPE,
  COUNTRY_TYPE,
  CURRENCY_TYPE,
  TIMEZONE_TYPE,
  SORT_ORDER,
  SORT_BY,
  CONNECTION_TYPE,
  // Helper Functions
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isNull,
  isUndefined,
  isEmpty,
  isUUID,
  isEmail,
  isURL,
  isDate,
  isISODateString,
  isJSONString,
  getType,
  getMimeTypeFromExtension,
  getExtensionFromMimeType,
  isAllowedFileExtension,
  isAllowedMimeType,
  getFileExtension,
  getFilenameWithoutExtension,
} from './type.constants';
