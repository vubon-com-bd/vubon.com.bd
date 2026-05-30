/**
 * HTTP Status Constants - Pure immutable HTTP status codes
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/auth-constants/http-status.constants
 * 
 * RULES:
 * ✅ NO functions - ONLY pure readonly constants
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ Framework-free (NestJS's HttpStatus can be used separately)
 * ✅ SINGLE SOURCE OF TRUTH - Use this file for all HTTP status codes
 *   (api.constants.ts now re-exports from here instead of duplicating)
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// 1xx Informational Responses
// ============================================================
export const HTTP_STATUS_INFORMATIONAL = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,           // WebDAV
  EARLY_HINTS: 103,          // Experimental
} as const;

export type HttpStatusInformational = ValueOf<typeof HTTP_STATUS_INFORMATIONAL>;

// ============================================================
// 2xx Success Responses
// ============================================================
export const HTTP_STATUS_SUCCESS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFO: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,         // WebDAV
  ALREADY_REPORTED: 208,     // WebDAV
  IM_USED: 226,              // HTTP Delta encoding
} as const;

export type HttpStatusSuccess = ValueOf<typeof HTTP_STATUS_SUCCESS>;

// ============================================================
// 3xx Redirection Responses
// ============================================================
export const HTTP_STATUS_REDIRECTION = {
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,         // Deprecated
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
} as const;

export type HttpStatusRedirection = ValueOf<typeof HTTP_STATUS_REDIRECTION>;

// ============================================================
// 4xx Client Error Responses
// ============================================================
export const HTTP_STATUS_CLIENT_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,          // Easter egg
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
} as const;

export type HttpStatusClientError = ValueOf<typeof HTTP_STATUS_CLIENT_ERROR>;

// ============================================================
// 5xx Server Error Responses
// ============================================================
export const HTTP_STATUS_SERVER_ERROR = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

export type HttpStatusServerError = ValueOf<typeof HTTP_STATUS_SERVER_ERROR>;

// ============================================================
// Combined HTTP Status Codes (All in one)
// ⚠️ This is the SINGLE SOURCE OF TRUTH - use this in api.constants.ts
// ============================================================
export const HTTP_STATUS = {
  ...HTTP_STATUS_INFORMATIONAL,
  ...HTTP_STATUS_SUCCESS,
  ...HTTP_STATUS_REDIRECTION,
  ...HTTP_STATUS_CLIENT_ERROR,
  ...HTTP_STATUS_SERVER_ERROR,
} as const;

export type HttpStatus = ValueOf<typeof HTTP_STATUS>;

// ============================================================
// Status Code Ranges (Pure constants - NO FUNCTIONS)
// ============================================================
export const HTTP_STATUS_RANGES = {
  INFORMATIONAL_MIN: 100,
  INFORMATIONAL_MAX: 199,
  SUCCESS_MIN: 200,
  SUCCESS_MAX: 299,
  REDIRECTION_MIN: 300,
  REDIRECTION_MAX: 399,
  CLIENT_ERROR_MIN: 400,
  CLIENT_ERROR_MAX: 499,
  SERVER_ERROR_MIN: 500,
  SERVER_ERROR_MAX: 599,
} as const;

export type HttpStatusRanges = typeof HTTP_STATUS_RANGES;

// ============================================================
// Category lookup tables (Pure constants - Pre-computed)
// ============================================================
export const HTTP_STATUS_CATEGORY_MAP = {
  100: 'informational',
  101: 'informational',
  102: 'informational',
  103: 'informational',

  200: 'success',
  201: 'success',
  202: 'success',
  203: 'success',
  204: 'success',
  205: 'success',
  206: 'success',
  207: 'success',
  208: 'success',
  226: 'success',

  300: 'redirection',
  301: 'redirection',
  302: 'redirection',
  303: 'redirection',
  304: 'redirection',
  305: 'redirection',
  306: 'redirection',
  307: 'redirection',
  308: 'redirection',

  400: 'client_error',
  401: 'client_error',
  402: 'client_error',
  403: 'client_error',
  404: 'client_error',
  405: 'client_error',
  406: 'client_error',
  407: 'client_error',
  408: 'client_error',
  409: 'client_error',
  410: 'client_error',
  411: 'client_error',
  412: 'client_error',
  413: 'client_error',
  414: 'client_error',
  415: 'client_error',
  416: 'client_error',
  417: 'client_error',
  418: 'client_error',
  421: 'client_error',
  422: 'client_error',
  423: 'client_error',
  424: 'client_error',
  425: 'client_error',
  426: 'client_error',
  428: 'client_error',
  429: 'client_error',
  431: 'client_error',
  451: 'client_error',

  500: 'server_error',
  501: 'server_error',
  502: 'server_error',
  503: 'server_error',
  504: 'server_error',
  505: 'server_error',
  506: 'server_error',
  507: 'server_error',
  508: 'server_error',
  510: 'server_error',
  511: 'server_error',
} as const;

export type HttpStatusCategory = ValueOf<typeof HTTP_STATUS_CATEGORY_MAP>;

// ============================================================
// Status Code to Message Mapping (Complete)
// ============================================================
export const HTTP_STATUS_MESSAGES = {
  // 1xx
  [HTTP_STATUS_INFORMATIONAL.CONTINUE]: 'Continue',
  [HTTP_STATUS_INFORMATIONAL.SWITCHING_PROTOCOLS]: 'Switching Protocols',
  [HTTP_STATUS_INFORMATIONAL.PROCESSING]: 'Processing',
  [HTTP_STATUS_INFORMATIONAL.EARLY_HINTS]: 'Early Hints',

  // 2xx
  [HTTP_STATUS_SUCCESS.OK]: 'OK',
  [HTTP_STATUS_SUCCESS.CREATED]: 'Created',
  [HTTP_STATUS_SUCCESS.ACCEPTED]: 'Accepted',
  [HTTP_STATUS_SUCCESS.NON_AUTHORITATIVE_INFO]: 'Non-Authoritative Information',
  [HTTP_STATUS_SUCCESS.NO_CONTENT]: 'No Content',
  [HTTP_STATUS_SUCCESS.RESET_CONTENT]: 'Reset Content',
  [HTTP_STATUS_SUCCESS.PARTIAL_CONTENT]: 'Partial Content',
  [HTTP_STATUS_SUCCESS.MULTI_STATUS]: 'Multi-Status',
  [HTTP_STATUS_SUCCESS.ALREADY_REPORTED]: 'Already Reported',
  [HTTP_STATUS_SUCCESS.IM_USED]: 'IM Used',

  // 3xx
  [HTTP_STATUS_REDIRECTION.MULTIPLE_CHOICES]: 'Multiple Choices',
  [HTTP_STATUS_REDIRECTION.MOVED_PERMANENTLY]: 'Moved Permanently',
  [HTTP_STATUS_REDIRECTION.FOUND]: 'Found',
  [HTTP_STATUS_REDIRECTION.SEE_OTHER]: 'See Other',
  [HTTP_STATUS_REDIRECTION.NOT_MODIFIED]: 'Not Modified',
  [HTTP_STATUS_REDIRECTION.USE_PROXY]: 'Use Proxy',
  [HTTP_STATUS_REDIRECTION.TEMPORARY_REDIRECT]: 'Temporary Redirect',
  [HTTP_STATUS_REDIRECTION.PERMANENT_REDIRECT]: 'Permanent Redirect',

  // 4xx
  [HTTP_STATUS_CLIENT_ERROR.BAD_REQUEST]: 'Bad Request',
  [HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED]: 'Unauthorized',
  [HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED]: 'Payment Required',
  [HTTP_STATUS_CLIENT_ERROR.FORBIDDEN]: 'Forbidden',
  [HTTP_STATUS_CLIENT_ERROR.NOT_FOUND]: 'Not Found',
  [HTTP_STATUS_CLIENT_ERROR.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
  [HTTP_STATUS_CLIENT_ERROR.NOT_ACCEPTABLE]: 'Not Acceptable',
  [HTTP_STATUS_CLIENT_ERROR.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
  [HTTP_STATUS_CLIENT_ERROR.REQUEST_TIMEOUT]: 'Request Timeout',
  [HTTP_STATUS_CLIENT_ERROR.CONFLICT]: 'Conflict',
  [HTTP_STATUS_CLIENT_ERROR.GONE]: 'Gone',
  [HTTP_STATUS_CLIENT_ERROR.LENGTH_REQUIRED]: 'Length Required',
  [HTTP_STATUS_CLIENT_ERROR.PRECONDITION_FAILED]: 'Precondition Failed',
  [HTTP_STATUS_CLIENT_ERROR.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
  [HTTP_STATUS_CLIENT_ERROR.URI_TOO_LONG]: 'URI Too Long',
  [HTTP_STATUS_CLIENT_ERROR.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
  [HTTP_STATUS_CLIENT_ERROR.RANGE_NOT_SATISFIABLE]: 'Range Not Satisfiable',
  [HTTP_STATUS_CLIENT_ERROR.EXPECTATION_FAILED]: 'Expectation Failed',
  [HTTP_STATUS_CLIENT_ERROR.IM_A_TEAPOT]: "I'm a teapot",
  [HTTP_STATUS_CLIENT_ERROR.MISDIRECTED_REQUEST]: 'Misdirected Request',
  [HTTP_STATUS_CLIENT_ERROR.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [HTTP_STATUS_CLIENT_ERROR.LOCKED]: 'Locked',
  [HTTP_STATUS_CLIENT_ERROR.FAILED_DEPENDENCY]: 'Failed Dependency',
  [HTTP_STATUS_CLIENT_ERROR.TOO_EARLY]: 'Too Early',
  [HTTP_STATUS_CLIENT_ERROR.UPGRADE_REQUIRED]: 'Upgrade Required',
  [HTTP_STATUS_CLIENT_ERROR.PRECONDITION_REQUIRED]: 'Precondition Required',
  [HTTP_STATUS_CLIENT_ERROR.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HTTP_STATUS_CLIENT_ERROR.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request Header Fields Too Large',
  [HTTP_STATUS_CLIENT_ERROR.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable For Legal Reasons',

  // 5xx
  [HTTP_STATUS_SERVER_ERROR.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HTTP_STATUS_SERVER_ERROR.NOT_IMPLEMENTED]: 'Not Implemented',
  [HTTP_STATUS_SERVER_ERROR.BAD_GATEWAY]: 'Bad Gateway',
  [HTTP_STATUS_SERVER_ERROR.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HTTP_STATUS_SERVER_ERROR.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  [HTTP_STATUS_SERVER_ERROR.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
  [HTTP_STATUS_SERVER_ERROR.VARIANT_ALSO_NEGOTIATES]: 'Variant Also Negotiates',
  [HTTP_STATUS_SERVER_ERROR.INSUFFICIENT_STORAGE]: 'Insufficient Storage',
  [HTTP_STATUS_SERVER_ERROR.LOOP_DETECTED]: 'Loop Detected',
  [HTTP_STATUS_SERVER_ERROR.NOT_EXTENDED]: 'Not Extended',
  [HTTP_STATUS_SERVER_ERROR.NETWORK_AUTHENTICATION_REQUIRED]: 'Network Authentication Required',
} as const;

export type HttpStatusMessage = ValueOf<typeof HTTP_STATUS_MESSAGES>;

// ============================================================
// E-commerce specific status code aliases (Bangladesh)
// ============================================================
export const ECOMMERCE_HTTP_STATUS = {
  // Payment related (using existing HTTP status codes)
  PAYMENT_REQUIRED: HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED,     // 402
  INSUFFICIENT_BALANCE: HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED, // Alias for 402
  ORDER_LOCKED: HTTP_STATUS_CLIENT_ERROR.LOCKED,                   // 423

  // Inventory related
  OUT_OF_STOCK: HTTP_STATUS_CLIENT_ERROR.CONFLICT,                 // 409
  INSUFFICIENT_STOCK: HTTP_STATUS_CLIENT_ERROR.CONFLICT,           // 409

  // Bangladesh specific payment gateways
  BKASH_PAYMENT_FAILED: HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED,
  NAGAD_PAYMENT_FAILED: HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED,
  SSLCOMMERZ_FAILED: HTTP_STATUS_CLIENT_ERROR.PAYMENT_REQUIRED,

  // Shipping related
  SHIPPING_NOT_AVAILABLE: HTTP_STATUS_SERVER_ERROR.SERVICE_UNAVAILABLE, // 503
  DELIVERY_FAILED: HTTP_STATUS_CLIENT_ERROR.GONE,                        // 410
} as const;

export type EcommerceHttpStatus = ValueOf<typeof ECOMMERCE_HTTP_STATUS>;

// ============================================================
// Retry-After header status codes (Rate limiting)
// ============================================================
export const HTTP_STATUS_WITH_RETRY = {
  TOO_MANY_REQUESTS: HTTP_STATUS_CLIENT_ERROR.TOO_MANY_REQUESTS,   // 429
  SERVICE_UNAVAILABLE: HTTP_STATUS_SERVER_ERROR.SERVICE_UNAVAILABLE, // 503
  BAD_GATEWAY: HTTP_STATUS_SERVER_ERROR.BAD_GATEWAY,               // 502
  GATEWAY_TIMEOUT: HTTP_STATUS_SERVER_ERROR.GATEWAY_TIMEOUT,       // 504
} as const;

export type HttpStatusWithRetry = ValueOf<typeof HTTP_STATUS_WITH_RETRY>;

// ============================================================
// Status codes that should not retry (Idempotent safe)
// ============================================================
export const HTTP_STATUS_NO_RETRY = {
  BAD_REQUEST: HTTP_STATUS_CLIENT_ERROR.BAD_REQUEST,               // 400
  UNAUTHORIZED: HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED,             // 401
  FORBIDDEN: HTTP_STATUS_CLIENT_ERROR.FORBIDDEN,                   // 403
  NOT_FOUND: HTTP_STATUS_CLIENT_ERROR.NOT_FOUND,                   // 404
  METHOD_NOT_ALLOWED: HTTP_STATUS_CLIENT_ERROR.METHOD_NOT_ALLOWED, // 405
  CONFLICT: HTTP_STATUS_CLIENT_ERROR.CONFLICT,                     // 409
  GONE: HTTP_STATUS_CLIENT_ERROR.GONE,                             // 410
  UNPROCESSABLE_ENTITY: HTTP_STATUS_CLIENT_ERROR.UNPROCESSABLE_ENTITY, // 422
} as const;

export type HttpStatusNoRetry = ValueOf<typeof HTTP_STATUS_NO_RETRY>;

// ============================================================
// Status codes that are cacheable
// ============================================================
export const HTTP_STATUS_CACHEABLE = {
  OK: HTTP_STATUS_SUCCESS.OK,                       // 200
  NON_AUTHORITATIVE_INFO: HTTP_STATUS_SUCCESS.NON_AUTHORITATIVE_INFO, // 203
  NO_CONTENT: HTTP_STATUS_SUCCESS.NO_CONTENT,       // 204
  PARTIAL_CONTENT: HTTP_STATUS_SUCCESS.PARTIAL_CONTENT, // 206
  NOT_MODIFIED: HTTP_STATUS_REDIRECTION.NOT_MODIFIED, // 304
} as const;

export type HttpStatusCacheable = ValueOf<typeof HTTP_STATUS_CACHEABLE>;

// ============================================================
// Status codes for CDN caching (E-commerce performance)
// ============================================================
export const HTTP_STATUS_CDN_CACHEABLE = {
  OK: HTTP_STATUS_SUCCESS.OK,
  PARTIAL_CONTENT: HTTP_STATUS_SUCCESS.PARTIAL_CONTENT,
  NOT_MODIFIED: HTTP_STATUS_REDIRECTION.NOT_MODIFIED,

  // Also cache errors temporarily (to avoid thundering herd)
  SERVICE_UNAVAILABLE: HTTP_STATUS_SERVER_ERROR.SERVICE_UNAVAILABLE, // 503 (short TTL)
  GATEWAY_TIMEOUT: HTTP_STATUS_SERVER_ERROR.GATEWAY_TIMEOUT,         // 504 (short TTL)
} as const;

export type HttpStatusCdnCacheable = ValueOf<typeof HTTP_STATUS_CDN_CACHEABLE>;

// ============================================================
// Webhook delivery status codes (For payment gateways)
// ============================================================
export const WEBHOOK_HTTP_STATUS = {
  // Successful delivery
  DELIVERED: HTTP_STATUS_SUCCESS.OK,                          // 200
  ACCEPTED: HTTP_STATUS_SUCCESS.ACCEPTED,                    // 202

  // Client error (should retry with backoff)
  BAD_PAYLOAD: HTTP_STATUS_CLIENT_ERROR.BAD_REQUEST,         // 400
  UNAUTHORIZED_WEBHOOK: HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED, // 401

  // Server error (should retry)
  WEBHOOK_TIMEOUT: HTTP_STATUS_SERVER_ERROR.GATEWAY_TIMEOUT, // 504
  WEBHOOK_FAILED: HTTP_STATUS_SERVER_ERROR.BAD_GATEWAY,      // 502
} as const;

export type WebhookHttpStatus = ValueOf<typeof WEBHOOK_HTTP_STATUS>;

// ============================================================
// Bangladesh E-commerce specific status messages (Bangla)
// ============================================================
export const HTTP_STATUS_MESSAGES_BN = {
  [HTTP_STATUS_SUCCESS.OK]: 'সফল',
  [HTTP_STATUS_SUCCESS.CREATED]: 'সফলভাবে তৈরি হয়েছে',
  [HTTP_STATUS_CLIENT_ERROR.BAD_REQUEST]: 'ভুল অনুরোধ',
  [HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED]: 'অনুমোদিত নয়',
  [HTTP_STATUS_CLIENT_ERROR.FORBIDDEN]: 'নিষিদ্ধ',
  [HTTP_STATUS_CLIENT_ERROR.NOT_FOUND]: 'পাওয়া যায়নি',
  [HTTP_STATUS_CLIENT_ERROR.TOO_MANY_REQUESTS]: 'অনেক বেশি অনুরোধ',
  [HTTP_STATUS_SERVER_ERROR.INTERNAL_SERVER_ERROR]: 'সার্ভার সমস্যা',
  [HTTP_STATUS_SERVER_ERROR.SERVICE_UNAVAILABLE]: 'সার্ভার উপলব্ধ নয়',
} as const;

export type HttpStatusMessageBn = ValueOf<typeof HTTP_STATUS_MESSAGES_BN>;

// ============================================================
// GraphQL HTTP Status codes mapping
// ============================================================
export const GRAPHQL_HTTP_STATUS = {
  // GraphQL specific status codes
  BAD_REQUEST: HTTP_STATUS_CLIENT_ERROR.BAD_REQUEST,           // 400 (Bad syntax)
  UNAUTHORIZED: HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED,         // 401
  FORBIDDEN: HTTP_STATUS_CLIENT_ERROR.FORBIDDEN,               // 403
  NOT_FOUND: HTTP_STATUS_CLIENT_ERROR.NOT_FOUND,               // 404 (Endpoint not found)
  UNPROCESSABLE: HTTP_STATUS_CLIENT_ERROR.UNPROCESSABLE_ENTITY, // 422 (Validation error)

  // GraphQL success
  SUCCESS: HTTP_STATUS_SUCCESS.OK,                             // 200
  PARTIAL_SUCCESS: HTTP_STATUS_SUCCESS.PARTIAL_CONTENT,        // 206
} as const;

export type GraphqlHttpStatus = ValueOf<typeof GRAPHQL_HTTP_STATUS>;

// ============================================================
// ✓ All constants use 'as const' - no runtime deepFreeze needed
// ✓ Removed deepFreeze for better performance (as const is enough)
// ✓ Single source of truth for HTTP status codes
// ============================================================
