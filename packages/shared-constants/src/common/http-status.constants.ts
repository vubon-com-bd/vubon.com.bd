/**
 * HTTP Status Codes
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

/**
 * Informational responses (100–199)
 */
export const HTTP_INFORMATIONAL = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,
} as const;

/**
 * Successful responses (200–299)
 */
export const HTTP_SUCCESS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
} as const;

/**
 * Redirection messages (300–399)
 */
export const HTTP_REDIRECTION = {
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
} as const;

/**
 * Client error responses (400–499)
 */
export const HTTP_CLIENT_ERROR = {
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
  IM_A_TEAPOT: 418,
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

/**
 * Server error responses (500–599)
 */
export const HTTP_SERVER_ERROR = {
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

/**
 * Combined HTTP Status Codes
 */
export const HTTP_STATUS = {
  ...HTTP_INFORMATIONAL,
  ...HTTP_SUCCESS,
  ...HTTP_REDIRECTION,
  ...HTTP_CLIENT_ERROR,
  ...HTTP_SERVER_ERROR,
} as const;

/**
 * Type for all HTTP status codes
 */
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

/**
 * Type for HTTP status categories
 */
export type HttpStatusCategory =
  'informational' | 'success' | 'redirection' | 'clientError' | 'serverError';

/**
 * Get status category based on status code
 */
export function getHttpStatusCategory(status: HttpStatusCode): HttpStatusCategory {
  if (status >= 100 && status < 200) {
    return 'informational';
  }
  if (status >= 200 && status < 300) {
    return 'success';
  }
  if (status >= 300 && status < 400) {
    return 'redirection';
  }
  if (status >= 400 && status < 500) {
    return 'clientError';
  }
  if (status >= 500 && status < 600) {
    return 'serverError';
  }
  throw new Error(`Unknown HTTP status code: ${status}`);
}

/**
 * Get status message for HTTP status code
 */
export function getHttpStatusMessage(status: HttpStatusCode): string {
  const messages: Record<HttpStatusCode, string> = {
    [HTTP_STATUS.CONTINUE]: 'Continue',
    [HTTP_STATUS.SWITCHING_PROTOCOLS]: 'Switching Protocols',
    [HTTP_STATUS.PROCESSING]: 'Processing',
    [HTTP_STATUS.EARLY_HINTS]: 'Early Hints',
    [HTTP_STATUS.OK]: 'OK',
    [HTTP_STATUS.CREATED]: 'Created',
    [HTTP_STATUS.ACCEPTED]: 'Accepted',
    [HTTP_STATUS.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',
    [HTTP_STATUS.NO_CONTENT]: 'No Content',
    [HTTP_STATUS.RESET_CONTENT]: 'Reset Content',
    [HTTP_STATUS.PARTIAL_CONTENT]: 'Partial Content',
    [HTTP_STATUS.MULTI_STATUS]: 'Multi-Status',
    [HTTP_STATUS.ALREADY_REPORTED]: 'Already Reported',
    [HTTP_STATUS.IM_USED]: 'IM Used',
    [HTTP_STATUS.MULTIPLE_CHOICES]: 'Multiple Choices',
    [HTTP_STATUS.MOVED_PERMANENTLY]: 'Moved Permanently',
    [HTTP_STATUS.FOUND]: 'Found',
    [HTTP_STATUS.SEE_OTHER]: 'See Other',
    [HTTP_STATUS.NOT_MODIFIED]: 'Not Modified',
    [HTTP_STATUS.USE_PROXY]: 'Use Proxy',
    [HTTP_STATUS.SWITCH_PROXY]: 'Switch Proxy',
    [HTTP_STATUS.TEMPORARY_REDIRECT]: 'Temporary Redirect',
    [HTTP_STATUS.PERMANENT_REDIRECT]: 'Permanent Redirect',
    [HTTP_STATUS.BAD_REQUEST]: 'Bad Request',
    [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
    [HTTP_STATUS.PAYMENT_REQUIRED]: 'Payment Required',
    [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
    [HTTP_STATUS.NOT_FOUND]: 'Not Found',
    [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
    [HTTP_STATUS.NOT_ACCEPTABLE]: 'Not Acceptable',
    [HTTP_STATUS.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
    [HTTP_STATUS.REQUEST_TIMEOUT]: 'Request Timeout',
    [HTTP_STATUS.CONFLICT]: 'Conflict',
    [HTTP_STATUS.GONE]: 'Gone',
    [HTTP_STATUS.LENGTH_REQUIRED]: 'Length Required',
    [HTTP_STATUS.PRECONDITION_FAILED]: 'Precondition Failed',
    [HTTP_STATUS.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
    [HTTP_STATUS.URI_TOO_LONG]: 'URI Too Long',
    [HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
    [HTTP_STATUS.RANGE_NOT_SATISFIABLE]: 'Range Not Satisfiable',
    [HTTP_STATUS.EXPECTATION_FAILED]: 'Expectation Failed',
    [HTTP_STATUS.IM_A_TEAPOT]: "I'm a teapot",
    [HTTP_STATUS.MISDIRECTED_REQUEST]: 'Misdirected Request',
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [HTTP_STATUS.LOCKED]: 'Locked',
    [HTTP_STATUS.FAILED_DEPENDENCY]: 'Failed Dependency',
    [HTTP_STATUS.TOO_EARLY]: 'Too Early',
    [HTTP_STATUS.UPGRADE_REQUIRED]: 'Upgrade Required',
    [HTTP_STATUS.PRECONDITION_REQUIRED]: 'Precondition Required',
    [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too Many Requests',
    [HTTP_STATUS.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request Header Fields Too Large',
    [HTTP_STATUS.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable For Legal Reasons',
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HTTP_STATUS.NOT_IMPLEMENTED]: 'Not Implemented',
    [HTTP_STATUS.BAD_GATEWAY]: 'Bad Gateway',
    [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [HTTP_STATUS.GATEWAY_TIMEOUT]: 'Gateway Timeout',
    [HTTP_STATUS.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
    [HTTP_STATUS.VARIANT_ALSO_NEGOTIATES]: 'Variant Also Negotiates',
    [HTTP_STATUS.INSUFFICIENT_STORAGE]: 'Insufficient Storage',
    [HTTP_STATUS.LOOP_DETECTED]: 'Loop Detected',
    [HTTP_STATUS.NOT_EXTENDED]: 'Not Extended',
    [HTTP_STATUS.NETWORK_AUTHENTICATION_REQUIRED]: 'Network Authentication Required',
  };

  return messages[status] || 'Unknown Status Code';
}

/**
 * Check if status code indicates success
 */
export function isSuccessStatus(status: HttpStatusCode): boolean {
  return status >= 200 && status < 300;
}

/**
 * Check if status code indicates client error
 */
export function isClientErrorStatus(status: HttpStatusCode): boolean {
  return status >= 400 && status < 500;
}

/**
 * Check if status code indicates server error
 */
export function isServerErrorStatus(status: HttpStatusCode): boolean {
  return status >= 500 && status < 600;
}

/**
 * Check if status code indicates redirection
 */
export function isRedirectionStatus(status: HttpStatusCode): boolean {
  return status >= 300 && status < 400;
}

/**
 * Check if status code indicates error (client or server)
 */
export function isErrorStatus(status: HttpStatusCode): boolean {
  return status >= 400 && status < 600;
}
