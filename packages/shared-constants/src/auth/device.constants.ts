/**
 * API constants for the monorepo
 * All API-related constants are centralized here for consistent API management
 */

/**
 * API versioning constants
 */
export const API_VERSIONS = {
  /**
   * Version 1 - Current stable version
   */
  V1: 'v1',

  /**
   * Version 2 - Beta/Experimental version
   */
  V2: 'v2',

  /**
   * Version 3 - Future version
   */
  V3: 'v3',

  /**
   * Latest version alias
   */
  LATEST: 'v1',

  /**
   * Default version
   */
  DEFAULT: 'v1',
} as const;

export type APIVersion = (typeof API_VERSIONS)[keyof typeof API_VERSIONS];

/**
 * API version prefix for routes
 */
export const API_VERSION_PREFIXES = {
  v1: '/api/v1',
  v2: '/api/v2',
  v3: '/api/v3',
} as const;

export type APIVersionPrefix = (typeof API_VERSION_PREFIXES)[keyof typeof API_VERSION_PREFIXES];

/**
 * Base API routes
 */
export const API_BASE_ROUTES = {
  /**
   * Authentication routes
   */
  AUTH: '/auth',

  /**
   * User routes
   */
  USERS: '/users',

  /**
   * Admin routes
   */
  ADMIN: '/admin',

  /**
   * Product routes
   */
  PRODUCTS: '/products',

  /**
   * Order routes
   */
  ORDERS: '/orders',

  /**
   * Payment routes
   */
  PAYMENTS: '/payments',

  /**
   * Content routes
   */
  CONTENT: '/content',

  /**
   * Settings routes
   */
  SETTINGS: '/settings',

  /**
   * Analytics routes
   */
  ANALYTICS: '/analytics',

  /**
   * Notification routes
   */
  NOTIFICATIONS: '/notifications',

  /**
   * Support routes
   */
  SUPPORT: '/support',

  /**
   * Webhook routes
   */
  WEBHOOKS: '/webhooks',

  /**
   * Health check routes
   */
  HEALTH: '/health',

  /**
   * Metrics routes
   */
  METRICS: '/metrics',

  /**
   * Files routes
   */
  FILES: '/files',

  /**
   * Search routes
   */
  SEARCH: '/search',

  /**
   * Reports routes
   */
  REPORTS: '/reports',

  /**
   * Dashboard routes
   */
  DASHBOARD: '/dashboard',

  /**
   * Integration routes
   */
  INTEGRATIONS: '/integrations',
} as const;

export type APIBaseRoute = (typeof API_BASE_ROUTES)[keyof typeof API_BASE_ROUTES];

/**
 * Authentication API endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
  VERIFY_EMAIL: '/verify-email',
  RESEND_VERIFICATION: '/resend-verification',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/change-password',
  PROFILE: '/profile',
  DELETE_ACCOUNT: '/delete-account',
  SESSIONS: '/sessions',
  REVOKE_SESSION: '/sessions/revoke',
  CSRF_TOKEN: '/csrf-token',
  MFA_SETUP: '/mfa/setup',
  MFA_VERIFY: '/mfa/verify',
  MFA_RECOVER: '/mfa/recover',
  SOCIAL_LOGIN: '/social/login',
  SOCIAL_CALLBACK: '/social/callback',
  DEVICE_VERIFY: '/device/verify',
  DEVICE_UNTRUST: '/device/untrust',
} as const;

export type AuthEndpoint = (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS];

/**
 * User API endpoints
 */
export const USER_ENDPOINTS = {
  LIST: '/',
  DETAILS: '/:id',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
  BULK_DELETE: '/bulk-delete',
  ROLES: '/:id/roles',
  PERMISSIONS: '/:id/permissions',
  STATUS: '/:id/status',
  SESSIONS: '/:id/sessions',
  ACTIVITY: '/:id/activity',
  EXPORT: '/export',
  IMPORT: '/import',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PASSWORD: '/password',
  EMAIL: '/email',
  PHONE: '/phone',
  DEVICES: '/devices',
  DEVICE: '/devices/:deviceId',
} as const;

export type UserEndpoint = (typeof USER_ENDPOINTS)[keyof typeof USER_ENDPOINTS];

/**
 * Admin API endpoints
 */
export const ADMIN_ENDPOINTS = {
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
  SETTINGS: '/settings',
  SYSTEM: '/system',
  LOGS: '/logs',
  BACKUPS: '/backups',
  MAINTENANCE: '/maintenance',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  AUDIT: '/audit',
  WEBHOOKS: '/webhooks',
  INTEGRATIONS: '/integrations',
} as const;

export type AdminEndpoint = (typeof ADMIN_ENDPOINTS)[keyof typeof ADMIN_ENDPOINTS];

/**
 * Product API endpoints
 */
export const PRODUCT_ENDPOINTS = {
  LIST: '/',
  DETAILS: '/:id',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
  CATEGORIES: '/categories',
  CATEGORY_DETAILS: '/categories/:id',
  INVENTORY: '/:id/inventory',
  PRICING: '/:id/pricing',
  REVIEWS: '/:id/reviews',
  IMAGES: '/:id/images',
  VARIATIONS: '/:id/variations',
  SEARCH: '/search',
  FILTER: '/filter',
  BULK: '/bulk',
  EXPORT: '/export',
  IMPORT: '/import',
} as const;

export type ProductEndpoint = (typeof PRODUCT_ENDPOINTS)[keyof typeof PRODUCT_ENDPOINTS];

/**
 * Order API endpoints
 */
export const ORDER_ENDPOINTS = {
  LIST: '/',
  DETAILS: '/:id',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
  STATUS: '/:id/status',
  CANCEL: '/:id/cancel',
  REFUND: '/:id/refund',
  SHIPPING: '/:id/shipping',
  TRACKING: '/:id/tracking',
  ITEMS: '/:id/items',
  HISTORY: '/:id/history',
  EXPORT: '/export',
  IMPORT: '/import',
} as const;

export type OrderEndpoint = (typeof ORDER_ENDPOINTS)[keyof typeof ORDER_ENDPOINTS];

/**
 * Payment API endpoints
 */
export const PAYMENT_ENDPOINTS = {
  LIST: '/',
  DETAILS: '/:id',
  PROCESS: '/process',
  VERIFY: '/verify',
  REFUND: '/refund',
  GATEWAYS: '/gateways',
  GATEWAY_CONFIG: '/gateways/:id/config',
  METHODS: '/methods',
  HISTORY: '/history',
  RECONCILE: '/reconcile',
  EXPORT: '/export',
} as const;

export type PaymentEndpoint = (typeof PAYMENT_ENDPOINTS)[keyof typeof PAYMENT_ENDPOINTS];

/**
 * Webhook endpoints for payment gateways
 */
export const WEBHOOK_ENDPOINTS = {
  /**
   * bKash webhook endpoint
   */
  BKASH: '/bkash',

  /**
   * Nagad webhook endpoint
   */
  NAGAD: '/nagad',

  /**
   * Rocket webhook endpoint
   */
  ROCKET: '/rocket',

  /**
   * SSL Commerz webhook endpoint
   */
  SSL_COMMERZ: '/ssl-commerz',

  /**
   * Stripe webhook endpoint
   */
  STRIPE: '/stripe',

  /**
   * PayPal webhook endpoint
   */
  PAYPAL: '/paypal',

  /**
   * Razorpay webhook endpoint
   */
  RAZORPAY: '/razorpay',

  /**
   * Generic webhook endpoint
   */
  GENERIC: '/generic',
} as const;

export type WebhookEndpoint = (typeof WEBHOOK_ENDPOINTS)[keyof typeof WEBHOOK_ENDPOINTS];

/**
 * API timeout configurations
 */
export const API_TIMEOUTS = {
  /**
   * Default API timeout in milliseconds
   */
  DEFAULT: 30000, // 30 seconds

  /**
   * Short timeout for fast operations
   */
  SHORT: 5000, // 5 seconds

  /**
   * Medium timeout for moderate operations
   */
  MEDIUM: 60000, // 60 seconds

  /**
   * Long timeout for heavy operations
   */
  LONG: 120000, // 120 seconds

  /**
   * File upload timeout
   */
  UPLOAD: 180000, // 180 seconds

  /**
   * Authentication timeout
   */
  AUTH: 10000, // 10 seconds

  /**
   * Payment processing timeout
   */
  PAYMENT: 45000, // 45 seconds

  /**
   * Webhook timeout
   */
  WEBHOOK: 15000, // 15 seconds

  /**
   * Database query timeout
   */
  DB_QUERY: 30000, // 30 seconds

  /**
   * External API timeout
   */
  EXTERNAL_API: 60000, // 60 seconds
} as const;

export type APITimeout = (typeof API_TIMEOUTS)[keyof typeof API_TIMEOUTS];

/**
 * API retry configurations
 */
export const API_RETRY = {
  /**
   * Maximum number of retry attempts
   */
  MAX_ATTEMPTS: 3,

  /**
   * Initial delay between retries in milliseconds
   */
  INITIAL_DELAY: 1000, // 1 second

  /**
   * Maximum delay between retries in milliseconds
   */
  MAX_DELAY: 10000, // 10 seconds

  /**
   * Backoff multiplier
   */
  BACKOFF_MULTIPLIER: 2,

  /**
   * Retry on HTTP status codes
   */
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],

  /**
   * Retry on network errors
   */
  RETRY_ON_NETWORK_ERRORS: true,

  /**
   * Retry on timeout errors
   */
  RETRY_ON_TIMEOUT: true,

  /**
   * Whether to use exponential backoff
   */
  USE_EXPONENTIAL_BACKOFF: true,

  /**
   * Whether to retry idempotent requests only
   */
  RETRY_IDEMPOTENT_ONLY: false,
} as const;

/**
 * Circuit breaker configurations
 */
export const CIRCUIT_BREAKER = {
  /**
   * Maximum number of failures before circuit opens
   */
  FAILURE_THRESHOLD: 5,

  /**
   * Time window for counting failures in seconds
   */
  WINDOW_DURATION: 60, // 60 seconds

  /**
   * Time in seconds to wait before attempting recovery
   */
  RECOVERY_TIMEOUT: 30, // 30 seconds

  /**
   * Maximum number of requests allowed when half-open
   */
  HALF_OPEN_MAX_REQUESTS: 3,

  /**
   * Success threshold to close circuit
   */
  SUCCESS_THRESHOLD: 2,

  /**
   * Whether to enable circuit breaker
   */
  ENABLED: true,

  /**
   * Whether to log circuit breaker events
   */
  LOG_EVENTS: true,
} as const;

/**
 * Rate limiting configurations
 */
export const RATE_LIMIT = {
  /**
   * Login rate limit: 5 attempts per 15 minutes
   */
  LOGIN: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 5,
  },

  /**
   * Registration rate limit: 3 attempts per 1 hour
   */
  REGISTRATION: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 3,
  },

  /**
   * General API rate limit: 100 requests per minute
   */
  GENERAL: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 100,
  },

  /**
   * Admin API rate limit: 50 requests per minute
   */
  ADMIN: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 50,
  },

  /**
   * Payment API rate limit: 20 requests per minute
   */
  PAYMENT: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 20,
  },

  /**
   * Password reset rate limit: 3 requests per hour
   */
  PASSWORD_RESET: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 3,
  },

  /**
   * Email verification rate limit: 3 requests per hour
   */
  EMAIL_VERIFICATION: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 3,
  },

  /**
   * Bulk operation rate limit: 10 requests per minute
   */
  BULK: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 10,
  },

  /**
   * File upload rate limit: 5 requests per minute
   */
  UPLOAD: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 5,
  },
} as const;

/**
 * Connection pool configurations
 */
export const CONNECTION_POOL = {
  /**
   * Minimum connections in pool
   */
  MIN: 2,

  /**
   * Maximum connections in pool
   */
  MAX: 20,

  /**
   * Connection timeout in milliseconds
   */
  TIMEOUT: 30000, // 30 seconds

  /**
   * Idle timeout in milliseconds
   */
  IDLE_TIMEOUT: 60000, // 60 seconds

  /**
   * Connection lifetime in milliseconds
   */
  LIFETIME: 3600000, // 1 hour

  /**
   * Whether to enable keep-alive
   */
  KEEP_ALIVE: true,

  /**
   * Keep-alive timeout in milliseconds
   */
  KEEP_ALIVE_TIMEOUT: 5000, // 5 seconds
} as const;

/**
 * API response formats
 */
export const API_RESPONSE_FORMATS = {
  JSON: 'json',
  XML: 'xml',
  HTML: 'html',
  TEXT: 'text',
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'excel',
} as const;

export type APIResponseFormat = (typeof API_RESPONSE_FORMATS)[keyof typeof API_RESPONSE_FORMATS];

/**
 * API content types
 */
export const API_CONTENT_TYPES = {
  JSON: 'application/json',
  XML: 'application/xml',
  HTML: 'text/html',
  TEXT: 'text/plain',
  CSV: 'text/csv',
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  JSON_PATCH: 'application/json-patch+json',
  JSON_MERGE: 'application/merge-patch+json',
  PROBLEM: 'application/problem+json',
  HAL: 'application/hal+json',
  STREAM: 'application/stream+json',
} as const;

export type APIContentType = (typeof API_CONTENT_TYPES)[keyof typeof API_CONTENT_TYPES];

/**
 * API configuration interface
 */
export interface APIConfig {
  /**
   * Base URL of the API
   */
  baseUrl: string;

  /**
   * API version
   */
  version: APIVersion;

  /**
   * Default timeout in milliseconds
   */
  timeout: number;

  /**
   * Retry configuration
   */
  retry: typeof API_RETRY;

  /**
   * Circuit breaker configuration
   */
  circuitBreaker: typeof CIRCUIT_BREAKER;

  /**
   * Rate limit configuration
   */
  rateLimit: typeof RATE_LIMIT;

  /**
   * Connection pool configuration
   */
  connectionPool: typeof CONNECTION_POOL;

  /**
   * Default headers
   */
  defaultHeaders: Record<string, string>;

  /**
   * Whether to include credentials
   */
  withCredentials: boolean;
}

/**
 * Default API configuration
 */
export const DEFAULT_API_CONFIG: Omit<APIConfig, 'baseUrl'> = {
  version: API_VERSIONS.DEFAULT,
  timeout: API_TIMEOUTS.DEFAULT,
  retry: API_RETRY,
  circuitBreaker: CIRCUIT_BREAKER,
  rateLimit: RATE_LIMIT,
  connectionPool: CONNECTION_POOL,
  defaultHeaders: {
    'Content-Type': API_CONTENT_TYPES.JSON,
    Accept: API_CONTENT_TYPES.JSON,
  },
  withCredentials: true,
} as const;

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  BAD_REQUEST: 'BAD_REQUEST',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  UNSUPPORTED_MEDIA: 'UNSUPPORTED_MEDIA',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  CIRCUIT_OPEN: 'CIRCUIT_OPEN',
  WEBHOOK_FAILED: 'WEBHOOK_FAILED',
} as const;

export type APIErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

/**
 * API events for logging
 */
export const API_EVENTS = {
  REQUEST_START: 'api.request.start',
  REQUEST_SUCCESS: 'api.request.success',
  REQUEST_FAILURE: 'api.request.failure',
  REQUEST_TIMEOUT: 'api.request.timeout',
  RATE_LIMIT_HIT: 'api.rate.limit.hit',
  RATE_LIMIT_EXCEEDED: 'api.rate.limit.exceeded',
  CIRCUIT_OPENED: 'api.circuit.opened',
  CIRCUIT_CLOSED: 'api.circuit.closed',
  CIRCUIT_HALF_OPEN: 'api.circuit.half_open',
  RETRY_ATTEMPT: 'api.retry.attempt',
  RETRY_SUCCESS: 'api.retry.success',
  RETRY_FAILURE: 'api.retry.failure',
  WEBHOOK_RECEIVED: 'api.webhook.received',
  WEBHOOK_PROCESSED: 'api.webhook.processed',
  WEBHOOK_FAILED: 'api.webhook.failed',
} as const;

export type APIEvent = (typeof API_EVENTS)[keyof typeof API_EVENTS];

/**
 * Helper function to build API URL
 */
export const buildAPIUrl = (version: APIVersion, path: string): string => {
  const prefix = API_VERSION_PREFIXES[version] || API_VERSION_PREFIXES.v1;
  return `${prefix}${path}`;
};

/**
 * Helper function to get full endpoint path
 */
export const getFullEndpoint = (
  baseRoute: APIBaseRoute,
  endpoint: string,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return buildAPIUrl(version, `${baseRoute}${endpoint}`);
};

/**
 * Helper function to get auth endpoint
 */
export const getAuthEndpoint = (
  endpoint: AuthEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.AUTH, endpoint, version);
};

/**
 * Helper function to get user endpoint
 */
export const getUserEndpoint = (
  endpoint: UserEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.USERS, endpoint, version);
};

/**
 * Helper function to get admin endpoint
 */
export const getAdminEndpoint = (
  endpoint: AdminEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.ADMIN, endpoint, version);
};

/**
 * Helper function to get product endpoint
 */
export const getProductEndpoint = (
  endpoint: ProductEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.PRODUCTS, endpoint, version);
};

/**
 * Helper function to get order endpoint
 */
export const getOrderEndpoint = (
  endpoint: OrderEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.ORDERS, endpoint, version);
};

/**
 * Helper function to get payment endpoint
 */
export const getPaymentEndpoint = (
  endpoint: PaymentEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.PAYMENTS, endpoint, version);
};

/**
 * Helper function to get webhook endpoint
 */
export const getWebhookEndpoint = (
  endpoint: WebhookEndpoint,
  version: APIVersion = API_VERSIONS.DEFAULT
): string => {
  return getFullEndpoint(API_BASE_ROUTES.WEBHOOKS, endpoint, version);
};

/**
 * All API constants for export
 */
export const API_CONSTANTS = {
  VERSIONS: API_VERSIONS,
  VERSION_PREFIXES: API_VERSION_PREFIXES,
  BASE_ROUTES: API_BASE_ROUTES,
  AUTH: AUTH_ENDPOINTS,
  USERS: USER_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
  PRODUCTS: PRODUCT_ENDPOINTS,
  ORDERS: ORDER_ENDPOINTS,
  PAYMENTS: PAYMENT_ENDPOINTS,
  WEBHOOKS: WEBHOOK_ENDPOINTS,
  TIMEOUTS: API_TIMEOUTS,
  RETRY: API_RETRY,
  CIRCUIT_BREAKER: CIRCUIT_BREAKER,
  RATE_LIMIT: RATE_LIMIT,
  CONNECTION_POOL: CONNECTION_POOL,
  RESPONSE_FORMATS: API_RESPONSE_FORMATS,
  CONTENT_TYPES: API_CONTENT_TYPES,
  ERROR_CODES: API_ERROR_CODES,
  EVENTS: API_EVENTS,
} as const;

/**
 * All API constants for export
 */
export const ALL_API_CONSTANTS = {
  ...API_VERSIONS,
  ...API_VERSION_PREFIXES,
  ...API_BASE_ROUTES,
  ...AUTH_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...ADMIN_ENDPOINTS,
  ...PRODUCT_ENDPOINTS,
  ...ORDER_ENDPOINTS,
  ...PAYMENT_ENDPOINTS,
  ...WEBHOOK_ENDPOINTS,
  ...API_TIMEOUTS,
  ...API_RETRY,
  ...CIRCUIT_BREAKER,
  ...RATE_LIMIT,
  ...CONNECTION_POOL,
  ...API_RESPONSE_FORMATS,
  ...API_CONTENT_TYPES,
  ...API_ERROR_CODES,
  ...API_EVENTS,
} as const;
