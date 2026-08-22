/**
 * Common Constants Index
 * Export all common constants and types for easy importing
 */

// HTTP Status Constants (রিনেম করা নাম ব্যবহার করা হয়েছে)
export {
  HTTP_STATUS,
  HTTP_STATUS_MESSAGES,
  HTTP_SUCCESS_STATUSES,
  HTTP_CLIENT_ERROR_STATUSES,
  HTTP_SERVER_ERROR_STATUSES,
  HTTP_REDIRECT_STATUSES,
  isHttpSuccessStatus,
  isHttpClientErrorStatus,
  isHttpServerErrorStatus,
  isHttpRedirectStatus,
  getHttpStatusMessage,
} from './http-status.constants';

export type { HttpStatus, HttpStatusMessage } from './http-status.constants';

// Regex Constants
export {
  REGEX,
  matchesRegex,
  sanitizeInput,
  removeSpecialChars,
  normalizeWhitespace,
  isEmail,
  isPhoneBD,
  isNID,
  isBDT,
  isBengali,
  isStrongPassword,
  isSlug,
  isIPv4,
  isUUID,
} from './regex.constants';

export type { RegexPattern } from './regex.constants';

// Cache Constants
export {
  CACHE,
  getCacheTTL,
  buildCacheKey,
  getCachePolicy,
  getCacheControlHeader,
  generateETag,
  shouldBypassCache,
  getCacheTTLFromRefreshInterval,
  getCacheKeyForUser,
  getCacheKeyForPaginatedList,
  getCacheKeyWithFilters,
} from './cache.constants';

export type { CacheTTL, CacheKey, CachePolicy } from './cache.constants';

// Queue Constants
export {
  QUEUE,
  getQueueOptions,
  getRetryConfig,
  shouldRetryJob,
  getBackoffDelay,
  isJobComplete,
  isJobFailed,
  isJobWaiting,
  isJobActive,
  getJobPriorityLabel,
  getPriorityFromLabel,
} from './queue.constants';

export type { QueueName, QueuePriority, QueueState, QueueEvent } from './queue.constants';
