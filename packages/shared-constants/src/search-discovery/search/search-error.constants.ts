/**
 * সার্চ-সম্পর্কিত এরর মেসেজ ও কোড সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * এরর ক্যাটাগরি
 */
export enum ErrorCategory {
  VALIDATION = 'validation',
  SYSTEM = 'system',
  NETWORK = 'network',
  TIMEOUT = 'timeout',
}

/**
 * এরর কোডসমূহ
 */
export enum SearchErrorCode {
  // সার্চ এরর
  SEARCH_001 = 'SEARCH_001',
  SEARCH_002 = 'SEARCH_002',
  SEARCH_003 = 'SEARCH_003',
  SEARCH_004 = 'SEARCH_004',

  // ইন্ডেক্স এরর
  INDEX_001 = 'INDEX_001',
  INDEX_002 = 'INDEX_002',
  INDEX_003 = 'INDEX_003',

  // সিনোনিম এরর
  SYNONYM_001 = 'SYNONYM_001',
  SYNONYM_002 = 'SYNONYM_002',

  // ফিল্টার এরর
  FILTER_001 = 'FILTER_001',
  FILTER_002 = 'FILTER_002',

  // সাজেশন এরর
  SUGGESTION_001 = 'SUGGESTION_001',
  SUGGESTION_002 = 'SUGGESTION_002',

  // সিস্টেম এরর
  SYSTEM_001 = 'SYSTEM_001',
  SYSTEM_002 = 'SYSTEM_002',

  // নেটওয়ার্ক এরর
  NETWORK_001 = 'NETWORK_001',
  NETWORK_002 = 'NETWORK_002',

  // টাইমআউট এরর
  TIMEOUT_001 = 'TIMEOUT_001',
  TIMEOUT_002 = 'TIMEOUT_002',
}

/**
 * এরর মেসেজসমূহ (বাংলায়)
 */
export const SEARCH_ERROR_MESSAGES_BN: Record<SearchErrorCode, string> = {
  [SearchErrorCode.SEARCH_001]: 'সার্চ ক্যোয়ারী খালি রাখা যাবে না',
  [SearchErrorCode.SEARCH_002]: 'সার্চ ক্যোয়ারী খুব ছোট',
  [SearchErrorCode.SEARCH_003]: 'সার্চ ক্যোয়ারী খুব বড়',
  [SearchErrorCode.SEARCH_004]: 'সার্চ ক্যোয়ারীতে অবৈধ অক্ষর রয়েছে',

  [SearchErrorCode.INDEX_001]: 'ইন্ডেক্স তৈরি করা যায়নি',
  [SearchErrorCode.INDEX_002]: 'ইন্ডেক্স পাওয়া যায়নি',
  [SearchErrorCode.INDEX_003]: 'ইন্ডেক্স পুনর্নির্মাণ ব্যর্থ হয়েছে',

  [SearchErrorCode.SYNONYM_001]: 'সিনোনিম ফাইল পাওয়া যায়নি',
  [SearchErrorCode.SYNONYM_002]: 'সিনোনিম ফরম্যাট সঠিক নয়',

  [SearchErrorCode.FILTER_001]: 'ফিল্টার প্রয়োগ করা যায়নি',
  [SearchErrorCode.FILTER_002]: 'ফিল্টার প্যারামিটার সঠিক নয়',

  [SearchErrorCode.SUGGESTION_001]: 'সাজেশন তৈরি করা যায়নি',
  [SearchErrorCode.SUGGESTION_002]: 'সাজেশন ক্যাশে পাওয়া যায়নি',

  [SearchErrorCode.SYSTEM_001]: 'সিস্টেম এরর ঘটেছে',
  [SearchErrorCode.SYSTEM_002]: 'সার্ভিস সংযোগ বিচ্ছিন্ন হয়েছে',

  [SearchErrorCode.NETWORK_001]: 'নেটওয়ার্ক সংযোগ সমস্যা',
  [SearchErrorCode.NETWORK_002]: 'সার্ভারে পৌঁছানো যাচ্ছে না',

  [SearchErrorCode.TIMEOUT_001]: 'সার্চ টাইমআউট হয়েছে',
  [SearchErrorCode.TIMEOUT_002]: 'অপারেশন টাইমআউট হয়েছে',
} as const;

/**
 * এরর মেসেজসমূহ (ইংরেজিতে)
 */
export const SEARCH_ERROR_MESSAGES_EN: Record<SearchErrorCode, string> = {
  [SearchErrorCode.SEARCH_001]: 'Search query cannot be empty',
  [SearchErrorCode.SEARCH_002]: 'Search query is too short',
  [SearchErrorCode.SEARCH_003]: 'Search query is too long',
  [SearchErrorCode.SEARCH_004]: 'Search query contains invalid characters',

  [SearchErrorCode.INDEX_001]: 'Unable to create index',
  [SearchErrorCode.INDEX_002]: 'Index not found',
  [SearchErrorCode.INDEX_003]: 'Index rebuild failed',

  [SearchErrorCode.SYNONYM_001]: 'Synonym file not found',
  [SearchErrorCode.SYNONYM_002]: 'Synonym format is invalid',

  [SearchErrorCode.FILTER_001]: 'Unable to apply filter',
  [SearchErrorCode.FILTER_002]: 'Filter parameter is invalid',

  [SearchErrorCode.SUGGESTION_001]: 'Unable to generate suggestion',
  [SearchErrorCode.SUGGESTION_002]: 'Suggestion cache not found',

  [SearchErrorCode.SYSTEM_001]: 'System error occurred',
  [SearchErrorCode.SYSTEM_002]: 'Service connection lost',

  [SearchErrorCode.NETWORK_001]: 'Network connection issue',
  [SearchErrorCode.NETWORK_002]: 'Unable to reach server',

  [SearchErrorCode.TIMEOUT_001]: 'Search timeout occurred',
  [SearchErrorCode.TIMEOUT_002]: 'Operation timeout occurred',
} as const;

/**
 * HTTP স্ট্যাটাস কোড ম্যাপিং
 */
export const SEARCH_ERROR_HTTP_STATUS: Record<SearchErrorCode, number> = {
  [SearchErrorCode.SEARCH_001]: 400,
  [SearchErrorCode.SEARCH_002]: 400,
  [SearchErrorCode.SEARCH_003]: 400,
  [SearchErrorCode.SEARCH_004]: 400,

  [SearchErrorCode.INDEX_001]: 500,
  [SearchErrorCode.INDEX_002]: 404,
  [SearchErrorCode.INDEX_003]: 500,

  [SearchErrorCode.SYNONYM_001]: 404,
  [SearchErrorCode.SYNONYM_002]: 400,

  [SearchErrorCode.FILTER_001]: 400,
  [SearchErrorCode.FILTER_002]: 400,

  [SearchErrorCode.SUGGESTION_001]: 500,
  [SearchErrorCode.SUGGESTION_002]: 404,

  [SearchErrorCode.SYSTEM_001]: 500,
  [SearchErrorCode.SYSTEM_002]: 503,

  [SearchErrorCode.NETWORK_001]: 503,
  [SearchErrorCode.NETWORK_002]: 503,

  [SearchErrorCode.TIMEOUT_001]: 504,
  [SearchErrorCode.TIMEOUT_002]: 504,
} as const;

/**
 * HTTP স্ট্যাটাস কোড থেকে এরর কোড ম্যাপিং
 */
export const HTTP_STATUS_TO_SEARCH_ERROR: Record<number, SearchErrorCode> = {
  400: SearchErrorCode.SEARCH_001,
  404: SearchErrorCode.INDEX_002,
  500: SearchErrorCode.INDEX_001,
  503: SearchErrorCode.SYSTEM_002,
  504: SearchErrorCode.TIMEOUT_001,
} as const;

/**
 * এরর ক্যাটাগরি ম্যাপিং
 */
export const SEARCH_ERROR_CATEGORY: Record<SearchErrorCode, ErrorCategory> = {
  [SearchErrorCode.SEARCH_001]: ErrorCategory.VALIDATION,
  [SearchErrorCode.SEARCH_002]: ErrorCategory.VALIDATION,
  [SearchErrorCode.SEARCH_003]: ErrorCategory.VALIDATION,
  [SearchErrorCode.SEARCH_004]: ErrorCategory.VALIDATION,

  [SearchErrorCode.INDEX_001]: ErrorCategory.SYSTEM,
  [SearchErrorCode.INDEX_002]: ErrorCategory.SYSTEM,
  [SearchErrorCode.INDEX_003]: ErrorCategory.SYSTEM,

  [SearchErrorCode.SYNONYM_001]: ErrorCategory.SYSTEM,
  [SearchErrorCode.SYNONYM_002]: ErrorCategory.VALIDATION,

  [SearchErrorCode.FILTER_001]: ErrorCategory.VALIDATION,
  [SearchErrorCode.FILTER_002]: ErrorCategory.VALIDATION,

  [SearchErrorCode.SUGGESTION_001]: ErrorCategory.SYSTEM,
  [SearchErrorCode.SUGGESTION_002]: ErrorCategory.SYSTEM,

  [SearchErrorCode.SYSTEM_001]: ErrorCategory.SYSTEM,
  [SearchErrorCode.SYSTEM_002]: ErrorCategory.NETWORK,

  [SearchErrorCode.NETWORK_001]: ErrorCategory.NETWORK,
  [SearchErrorCode.NETWORK_002]: ErrorCategory.NETWORK,

  [SearchErrorCode.TIMEOUT_001]: ErrorCategory.TIMEOUT,
  [SearchErrorCode.TIMEOUT_002]: ErrorCategory.TIMEOUT,
} as const;

/**
 * এরর ক্যাটাগরি লেবেলসমূহ (বাংলায়)
 */
export const ERROR_CATEGORY_LABELS_BN: Record<ErrorCategory, string> = {
  [ErrorCategory.VALIDATION]: 'ভ্যালিডেশন',
  [ErrorCategory.SYSTEM]: 'সিস্টেম',
  [ErrorCategory.NETWORK]: 'নেটওয়ার্ক',
  [ErrorCategory.TIMEOUT]: 'টাইমআউট',
} as const;

/**
 * এরর ক্যাটাগরি লেবেলসমূহ (ইংরেজিতে)
 */
export const ERROR_CATEGORY_LABELS_EN: Record<ErrorCategory, string> = {
  [ErrorCategory.VALIDATION]: 'Validation',
  [ErrorCategory.SYSTEM]: 'System',
  [ErrorCategory.NETWORK]: 'Network',
  [ErrorCategory.TIMEOUT]: 'Timeout',
} as const;

/**
 * এরর ক্যাটাগরি বিবরণ (বাংলায়)
 */
export const ERROR_CATEGORY_DESCRIPTIONS_BN: Record<ErrorCategory, string> = {
  [ErrorCategory.VALIDATION]: 'ইনপুট ডেটা ভ্যালিডেশন সংক্রান্ত এরর',
  [ErrorCategory.SYSTEM]: 'সিস্টেম লেভেলের এরর',
  [ErrorCategory.NETWORK]: 'নেটওয়ার্ক সংযোগ সংক্রান্ত এরর',
  [ErrorCategory.TIMEOUT]: 'টাইমআউট সংক্রান্ত এরর',
} as const;

/**
 * এরর ক্যাটাগরি বিবরণ (ইংরেজিতে)
 */
export const ERROR_CATEGORY_DESCRIPTIONS_EN: Record<ErrorCategory, string> = {
  [ErrorCategory.VALIDATION]: 'Input data validation errors',
  [ErrorCategory.SYSTEM]: 'System level errors',
  [ErrorCategory.NETWORK]: 'Network connection errors',
  [ErrorCategory.TIMEOUT]: 'Timeout related errors',
} as const;

/**
 * ডিফল্ট এরর ক্যাটাগরি
 */
export const DEFAULT_ERROR_CATEGORY = ErrorCategory.SYSTEM;

/**
 * এরর রেট্রাই কনফিগারেশন
 */
export const ERROR_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  RETRY_BACKOFF_MULTIPLIER: 2,
  RETRYABLE_ERROR_CODES: [
    SearchErrorCode.SYSTEM_001,
    SearchErrorCode.NETWORK_001,
    SearchErrorCode.NETWORK_002,
    SearchErrorCode.TIMEOUT_001,
    SearchErrorCode.TIMEOUT_002,
  ],
} as const;

/**
 * এরর কনফিগারেশন টাইপ
 */
export type SearchErrorConfig = {
  code: SearchErrorCode;
  messageBn: string;
  messageEn: string;
  httpStatus: number;
  category: ErrorCategory;
  retryable: boolean;
};

/**
 * এরর কনফিগারেশনসমূহ
 */
export const SEARCH_ERROR_CONFIGS: Record<SearchErrorCode, SearchErrorConfig> = {
  [SearchErrorCode.SEARCH_001]: {
    code: SearchErrorCode.SEARCH_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SEARCH_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SEARCH_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SEARCH_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SEARCH_001],
    retryable: false,
  },
  [SearchErrorCode.SEARCH_002]: {
    code: SearchErrorCode.SEARCH_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SEARCH_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SEARCH_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SEARCH_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SEARCH_002],
    retryable: false,
  },
  [SearchErrorCode.SEARCH_003]: {
    code: SearchErrorCode.SEARCH_003,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SEARCH_003],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SEARCH_003],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SEARCH_003],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SEARCH_003],
    retryable: false,
  },
  [SearchErrorCode.SEARCH_004]: {
    code: SearchErrorCode.SEARCH_004,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SEARCH_004],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SEARCH_004],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SEARCH_004],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SEARCH_004],
    retryable: false,
  },
  [SearchErrorCode.INDEX_001]: {
    code: SearchErrorCode.INDEX_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.INDEX_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.INDEX_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.INDEX_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.INDEX_001],
    retryable: true,
  },
  [SearchErrorCode.INDEX_002]: {
    code: SearchErrorCode.INDEX_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.INDEX_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.INDEX_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.INDEX_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.INDEX_002],
    retryable: false,
  },
  [SearchErrorCode.INDEX_003]: {
    code: SearchErrorCode.INDEX_003,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.INDEX_003],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.INDEX_003],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.INDEX_003],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.INDEX_003],
    retryable: true,
  },
  [SearchErrorCode.SYNONYM_001]: {
    code: SearchErrorCode.SYNONYM_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SYNONYM_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SYNONYM_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SYNONYM_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SYNONYM_001],
    retryable: false,
  },
  [SearchErrorCode.SYNONYM_002]: {
    code: SearchErrorCode.SYNONYM_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SYNONYM_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SYNONYM_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SYNONYM_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SYNONYM_002],
    retryable: false,
  },
  [SearchErrorCode.FILTER_001]: {
    code: SearchErrorCode.FILTER_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.FILTER_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.FILTER_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.FILTER_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.FILTER_001],
    retryable: false,
  },
  [SearchErrorCode.FILTER_002]: {
    code: SearchErrorCode.FILTER_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.FILTER_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.FILTER_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.FILTER_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.FILTER_002],
    retryable: false,
  },
  [SearchErrorCode.SUGGESTION_001]: {
    code: SearchErrorCode.SUGGESTION_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SUGGESTION_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SUGGESTION_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SUGGESTION_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SUGGESTION_001],
    retryable: true,
  },
  [SearchErrorCode.SUGGESTION_002]: {
    code: SearchErrorCode.SUGGESTION_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SUGGESTION_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SUGGESTION_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SUGGESTION_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SUGGESTION_002],
    retryable: false,
  },
  [SearchErrorCode.SYSTEM_001]: {
    code: SearchErrorCode.SYSTEM_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SYSTEM_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SYSTEM_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SYSTEM_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SYSTEM_001],
    retryable: true,
  },
  [SearchErrorCode.SYSTEM_002]: {
    code: SearchErrorCode.SYSTEM_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.SYSTEM_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.SYSTEM_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.SYSTEM_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.SYSTEM_002],
    retryable: true,
  },
  [SearchErrorCode.NETWORK_001]: {
    code: SearchErrorCode.NETWORK_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.NETWORK_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.NETWORK_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.NETWORK_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.NETWORK_001],
    retryable: true,
  },
  [SearchErrorCode.NETWORK_002]: {
    code: SearchErrorCode.NETWORK_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.NETWORK_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.NETWORK_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.NETWORK_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.NETWORK_002],
    retryable: true,
  },
  [SearchErrorCode.TIMEOUT_001]: {
    code: SearchErrorCode.TIMEOUT_001,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.TIMEOUT_001],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.TIMEOUT_001],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.TIMEOUT_001],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.TIMEOUT_001],
    retryable: true,
  },
  [SearchErrorCode.TIMEOUT_002]: {
    code: SearchErrorCode.TIMEOUT_002,
    messageBn: SEARCH_ERROR_MESSAGES_BN[SearchErrorCode.TIMEOUT_002],
    messageEn: SEARCH_ERROR_MESSAGES_EN[SearchErrorCode.TIMEOUT_002],
    httpStatus: SEARCH_ERROR_HTTP_STATUS[SearchErrorCode.TIMEOUT_002],
    category: SEARCH_ERROR_CATEGORY[SearchErrorCode.TIMEOUT_002],
    retryable: true,
  },
} as const;

/**
 * এরর রেসপন্স টাইপ
 */
export type SearchErrorResponse = {
  code: SearchErrorCode;
  message: string;
  status: number;
  category: ErrorCategory;
  timestamp: Date;
  path?: string;
  details?: Record<string, unknown>;
};

/**
 * এরর এরর মেসেজসমূহ
 */
export const SEARCH_ERROR_EXTRA_MESSAGES = {
  INVALID_ERROR_CODE: 'অবৈধ এরর কোড',
  INVALID_ERROR_CATEGORY: 'অবৈধ এরর ক্যাটাগরি',
  UNKNOWN_ERROR: 'অজানা এরর',
  ERROR_NOT_FOUND: 'এরর পাওয়া যায়নি',
  INTERNAL_SERVER_ERROR: 'সার্ভার অভ্যন্তরীণ এরর',
} as const;
