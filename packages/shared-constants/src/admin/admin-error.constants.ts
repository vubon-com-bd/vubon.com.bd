/**
 * অ্যাডমিন সিস্টেমের এরর কোড এবং মেসেজ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// এরর ক্যাটাগরি
export const ERROR_CATEGORIES = {
  AUTH_ERROR: 'auth_error',
  VALIDATION_ERROR: 'validation_error',
  PERMISSION_ERROR: 'permission_error',
  NOT_FOUND_ERROR: 'not_found_error',
  SERVER_ERROR: 'server_error',
  DATABASE_ERROR: 'database_error',
  NETWORK_ERROR: 'network_error',
  RATE_LIMIT_ERROR: 'rate_limit_error',
} as const;

// এরর কোড
export const ERROR_CODES = {
  // Auth Errors (1000-1999)
  AUTH_1000: 'AUTH_1000',
  AUTH_1001: 'AUTH_1001',
  AUTH_1002: 'AUTH_1002',
  AUTH_1003: 'AUTH_1003',
  AUTH_1004: 'AUTH_1004',
  AUTH_1005: 'AUTH_1005',

  // Validation Errors (2000-2999)
  VALIDATION_2000: 'VALIDATION_2000',
  VALIDATION_2001: 'VALIDATION_2001',
  VALIDATION_2002: 'VALIDATION_2002',
  VALIDATION_2003: 'VALIDATION_2003',

  // Permission Errors (3000-3999)
  PERMISSION_3000: 'PERMISSION_3000',
  PERMISSION_3001: 'PERMISSION_3001',
  PERMISSION_3002: 'PERMISSION_3002',

  // Not Found Errors (4000-4999)
  NOT_FOUND_4000: 'NOT_FOUND_4000',
  NOT_FOUND_4001: 'NOT_FOUND_4001',
  NOT_FOUND_4002: 'NOT_FOUND_4002',

  // Server Errors (5000-5999)
  SERVER_5000: 'SERVER_5000',
  SERVER_5001: 'SERVER_5001',
  SERVER_5002: 'SERVER_5002',

  // Database Errors (6000-6999)
  DATABASE_6000: 'DATABASE_6000',
  DATABASE_6001: 'DATABASE_6001',
  DATABASE_6002: 'DATABASE_6002',

  // Network Errors (7000-7999)
  NETWORK_7000: 'NETWORK_7000',
  NETWORK_7001: 'NETWORK_7001',

  // Rate Limit Errors (8000-8999)
  RATE_LIMIT_8000: 'RATE_LIMIT_8000',
  RATE_LIMIT_8001: 'RATE_LIMIT_8001',
} as const;

// এরর মেসেজ টেমপ্লেট
export const ERROR_MESSAGES = {
  AUTH_1000: 'Invalid credentials provided',
  AUTH_1001: 'Account is locked due to multiple failed attempts',
  AUTH_1002: 'Account is suspended',
  AUTH_1003: 'Session has expired',
  AUTH_1004: 'Invalid or expired token',
  AUTH_1005: 'Two-factor authentication required',

  VALIDATION_2000: 'Invalid input data',
  VALIDATION_2001: 'Email address is invalid',
  VALIDATION_2002: 'Password does not meet requirements',
  VALIDATION_2003: 'Required field is missing',

  PERMISSION_3000: 'Insufficient permissions',
  PERMISSION_3001: 'Access denied to this resource',
  PERMISSION_3002: 'Role does not have required permission',

  NOT_FOUND_4000: 'Resource not found',
  NOT_FOUND_4001: 'User not found',
  NOT_FOUND_4002: 'Record does not exist',

  SERVER_5000: 'Internal server error',
  SERVER_5001: 'Service temporarily unavailable',
  SERVER_5002: 'Operation timed out',

  DATABASE_6000: 'Database connection error',
  DATABASE_6001: 'Database query failed',
  DATABASE_6002: 'Duplicate entry detected',

  NETWORK_7000: 'Network connection error',
  NETWORK_7001: 'Request timeout',

  RATE_LIMIT_8000: 'Rate limit exceeded',
  RATE_LIMIT_8001: 'Too many requests, please try again later',
} as const;

// এরর HTTP স্ট্যাটাস কোড
export const ERROR_HTTP_STATUS = {
  AUTH_1000: 401,
  AUTH_1001: 403,
  AUTH_1002: 403,
  AUTH_1003: 401,
  AUTH_1004: 401,
  AUTH_1005: 401,

  VALIDATION_2000: 400,
  VALIDATION_2001: 400,
  VALIDATION_2002: 400,
  VALIDATION_2003: 400,

  PERMISSION_3000: 403,
  PERMISSION_3001: 403,
  PERMISSION_3002: 403,

  NOT_FOUND_4000: 404,
  NOT_FOUND_4001: 404,
  NOT_FOUND_4002: 404,

  SERVER_5000: 500,
  SERVER_5001: 503,
  SERVER_5002: 504,

  DATABASE_6000: 500,
  DATABASE_6001: 500,
  DATABASE_6002: 409,

  NETWORK_7000: 503,
  NETWORK_7001: 408,

  RATE_LIMIT_8000: 429,
  RATE_LIMIT_8001: 429,
} as const;

// এরর রিট্রাই পলিসি
export const ERROR_RETRY_POLICY = {
  AUTH_1000: { retryable: false, maxRetries: 0, delay: 0 },
  AUTH_1001: { retryable: false, maxRetries: 0, delay: 0 },
  AUTH_1002: { retryable: false, maxRetries: 0, delay: 0 },
  AUTH_1003: { retryable: true, maxRetries: 1, delay: 1000 },
  AUTH_1004: { retryable: true, maxRetries: 1, delay: 1000 },
  AUTH_1005: { retryable: false, maxRetries: 0, delay: 0 },

  VALIDATION_2000: { retryable: false, maxRetries: 0, delay: 0 },
  VALIDATION_2001: { retryable: false, maxRetries: 0, delay: 0 },
  VALIDATION_2002: { retryable: false, maxRetries: 0, delay: 0 },
  VALIDATION_2003: { retryable: false, maxRetries: 0, delay: 0 },

  PERMISSION_3000: { retryable: false, maxRetries: 0, delay: 0 },
  PERMISSION_3001: { retryable: false, maxRetries: 0, delay: 0 },
  PERMISSION_3002: { retryable: false, maxRetries: 0, delay: 0 },

  NOT_FOUND_4000: { retryable: false, maxRetries: 0, delay: 0 },
  NOT_FOUND_4001: { retryable: false, maxRetries: 0, delay: 0 },
  NOT_FOUND_4002: { retryable: false, maxRetries: 0, delay: 0 },

  SERVER_5000: { retryable: true, maxRetries: 3, delay: 2000 },
  SERVER_5001: { retryable: true, maxRetries: 3, delay: 2000 },
  SERVER_5002: { retryable: true, maxRetries: 2, delay: 1000 },

  DATABASE_6000: { retryable: true, maxRetries: 3, delay: 2000 },
  DATABASE_6001: { retryable: true, maxRetries: 3, delay: 2000 },
  DATABASE_6002: { retryable: false, maxRetries: 0, delay: 0 },

  NETWORK_7000: { retryable: true, maxRetries: 3, delay: 3000 },
  NETWORK_7001: { retryable: true, maxRetries: 2, delay: 2000 },

  RATE_LIMIT_8000: { retryable: true, maxRetries: 3, delay: 60000 },
  RATE_LIMIT_8001: { retryable: true, maxRetries: 3, delay: 60000 },
} as const;

// এরর লগ লেভেল
export const ERROR_LOG_LEVEL = {
  AUTH_1000: 'warn',
  AUTH_1001: 'warn',
  AUTH_1002: 'warn',
  AUTH_1003: 'info',
  AUTH_1004: 'warn',
  AUTH_1005: 'info',

  VALIDATION_2000: 'warn',
  VALIDATION_2001: 'warn',
  VALIDATION_2002: 'warn',
  VALIDATION_2003: 'warn',

  PERMISSION_3000: 'warn',
  PERMISSION_3001: 'warn',
  PERMISSION_3002: 'warn',

  NOT_FOUND_4000: 'info',
  NOT_FOUND_4001: 'info',
  NOT_FOUND_4002: 'info',

  SERVER_5000: 'error',
  SERVER_5001: 'error',
  SERVER_5002: 'error',

  DATABASE_6000: 'error',
  DATABASE_6001: 'error',
  DATABASE_6002: 'error',

  NETWORK_7000: 'error',
  NETWORK_7001: 'error',

  RATE_LIMIT_8000: 'warn',
  RATE_LIMIT_8001: 'warn',
} as const;

// এরর ইউজার ফ্রেন্ডলি মেসেজ টেমপ্লেট
export const ERROR_USER_FRIENDLY_MESSAGES = {
  AUTH_1000: 'Invalid email or password. Please try again.',
  AUTH_1001: 'Your account has been locked. Please contact support.',
  AUTH_1002: 'Your account has been suspended. Please contact support.',
  AUTH_1003: 'Your session has expired. Please login again.',
  AUTH_1004: 'Your session is invalid. Please login again.',
  AUTH_1005: 'Please complete two-factor authentication to continue.',

  VALIDATION_2000: 'Please check your input and try again.',
  VALIDATION_2001: 'Please enter a valid email address.',
  VALIDATION_2002: 'Password must be at least 8 characters with letters and numbers.',
  VALIDATION_2003: 'Please fill in all required fields.',

  PERMISSION_3000: "You don't have permission to perform this action.",
  PERMISSION_3001: 'Access to this resource is restricted.',
  PERMISSION_3002: 'Your role does not have the required permissions.',

  NOT_FOUND_4000: 'The requested resource could not be found.',
  NOT_FOUND_4001: 'User not found. Please check the user ID.',
  NOT_FOUND_4002: 'The record you are looking for does not exist.',

  SERVER_5000: 'Something went wrong. Please try again later.',
  SERVER_5001: 'Service is temporarily unavailable. Please try again later.',
  SERVER_5002: 'The request is taking too long. Please try again.',

  DATABASE_6000: 'Database connection issue. Please try again later.',
  DATABASE_6001: 'Database error occurred. Please try again later.',
  DATABASE_6002: 'Duplicate entry detected. Please check your input.',

  NETWORK_7000: 'Network connection issue. Please check your internet.',
  NETWORK_7001: 'Request timed out. Please try again.',

  RATE_LIMIT_8000: 'Too many requests. Please slow down and try again later.',
  RATE_LIMIT_8001: 'Rate limit exceeded. Please try again in a few minutes.',
} as const;

// এরর রিকভারি অ্যাকশন সাজেশন
export const ERROR_RECOVERY_ACTIONS = {
  AUTH_1000: 'retry_login',
  AUTH_1001: 'contact_support',
  AUTH_1002: 'contact_support',
  AUTH_1003: 'redirect_login',
  AUTH_1004: 'redirect_login',
  AUTH_1005: 'complete_2fa',

  VALIDATION_2000: 'validate_input',
  VALIDATION_2001: 'validate_email',
  VALIDATION_2002: 'validate_password',
  VALIDATION_2003: 'fill_required_fields',

  PERMISSION_3000: 'request_access',
  PERMISSION_3001: 'request_access',
  PERMISSION_3002: 'request_role_change',

  NOT_FOUND_4000: 'search_resource',
  NOT_FOUND_4001: 'verify_user_id',
  NOT_FOUND_4002: 'verify_record_id',

  SERVER_5000: 'retry_later',
  SERVER_5001: 'retry_later',
  SERVER_5002: 'retry_later',

  DATABASE_6000: 'retry_later',
  DATABASE_6001: 'retry_later',
  DATABASE_6002: 'check_duplicate',

  NETWORK_7000: 'check_network',
  NETWORK_7001: 'retry_request',

  RATE_LIMIT_8000: 'slow_down',
  RATE_LIMIT_8001: 'wait_and_retry',
} as const;

// এরর ক্যাটাগরি আইকন
export const ERROR_CATEGORY_ICONS = {
  AUTH_ERROR: '🔐',
  VALIDATION_ERROR: '📝',
  PERMISSION_ERROR: '🚫',
  NOT_FOUND_ERROR: '🔍',
  SERVER_ERROR: '💻',
  DATABASE_ERROR: '🗄️',
  NETWORK_ERROR: '🌐',
  RATE_LIMIT_ERROR: '⏱️',
} as const;

// এরর ক্যাটাগরি কালার
export const ERROR_CATEGORY_COLORS = {
  AUTH_ERROR: '#F59E0B',
  VALIDATION_ERROR: '#3B82F6',
  PERMISSION_ERROR: '#EF4444',
  NOT_FOUND_ERROR: '#94A3B8',
  SERVER_ERROR: '#DC2626',
  DATABASE_ERROR: '#8B5CF6',
  NETWORK_ERROR: '#EC4899',
  RATE_LIMIT_ERROR: '#F97316',
} as const;

// এরর সেভিরিটি লেভেল
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// এরর সেভিরিটি ম্যাপিং
export const ERROR_SEVERITY_MAPPING = {
  AUTH_1000: 'medium',
  AUTH_1001: 'high',
  AUTH_1002: 'high',
  AUTH_1003: 'low',
  AUTH_1004: 'medium',
  AUTH_1005: 'low',

  VALIDATION_2000: 'low',
  VALIDATION_2001: 'low',
  VALIDATION_2002: 'low',
  VALIDATION_2003: 'low',

  PERMISSION_3000: 'high',
  PERMISSION_3001: 'high',
  PERMISSION_3002: 'medium',

  NOT_FOUND_4000: 'low',
  NOT_FOUND_4001: 'low',
  NOT_FOUND_4002: 'low',

  SERVER_5000: 'critical',
  SERVER_5001: 'high',
  SERVER_5002: 'medium',

  DATABASE_6000: 'critical',
  DATABASE_6001: 'high',
  DATABASE_6002: 'medium',

  NETWORK_7000: 'high',
  NETWORK_7001: 'medium',

  RATE_LIMIT_8000: 'low',
  RATE_LIMIT_8001: 'low',
} as const;
