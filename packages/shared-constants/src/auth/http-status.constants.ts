/**
 * HTTP status code constants for the monorepo
 * All HTTP status codes are centralized here for consistent API responses
 */

/**
 * Informational responses (100-199)
 */
export const HTTP_STATUS_INFO = {
  /**
   * 100 Continue
   * The server has received the request headers and the client should proceed to send the request body
   */
  CONTINUE: 100,

  /**
   * 101 Switching Protocols
   * The requester has asked the server to switch protocols
   */
  SWITCHING_PROTOCOLS: 101,

  /**
   * 102 Processing
   * The server has received and is processing the request, but no response is available yet
   */
  PROCESSING: 102,

  /**
   * 103 Early Hints
   * Used to return some response headers before final HTTP message
   */
  EARLY_HINTS: 103,
} as const;

/**
 * Success responses (200-299)
 */
export const HTTP_STATUS_SUCCESS = {
  /**
   * 200 OK
   * Standard response for successful HTTP requests
   */
  OK: 200,

  /**
   * 201 Created
   * The request has been fulfilled and resulted in a new resource being created
   */
  CREATED: 201,

  /**
   * 202 Accepted
   * The request has been accepted for processing, but the processing has not been completed
   */
  ACCEPTED: 202,

  /**
   * 203 Non-Authoritative Information
   * The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version
   */
  NON_AUTHORITATIVE_INFORMATION: 203,

  /**
   * 204 No Content
   * The server successfully processed the request and is not returning any content
   */
  NO_CONTENT: 204,

  /**
   * 205 Reset Content
   * The server successfully processed the request, but is not returning any content and requires the requester to reset the document view
   */
  RESET_CONTENT: 205,

  /**
   * 206 Partial Content
   * The server is delivering only part of the resource due to a range header sent by the client
   */
  PARTIAL_CONTENT: 206,

  /**
   * 207 Multi-Status
   * The message body that follows is an XML message and can contain a number of separate response codes
   */
  MULTI_STATUS: 207,

  /**
   * 208 Already Reported
   * The members of a DAV binding have already been enumerated in a previous reply to this request
   */
  ALREADY_REPORTED: 208,

  /**
   * 226 IM Used
   * The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations
   */
  IM_USED: 226,
} as const;

/**
 * Redirection responses (300-399)
 */
export const HTTP_STATUS_REDIRECTION = {
  /**
   * 300 Multiple Choices
   * Indicates multiple options for the resource that the client may follow
   */
  MULTIPLE_CHOICES: 300,

  /**
   * 301 Moved Permanently
   * This and all future requests should be directed to the given URI
   */
  MOVED_PERMANENTLY: 301,

  /**
   * 302 Found
   * The requested resource resides temporarily under a different URI
   */
  FOUND: 302,

  /**
   * 303 See Other
   * The response to the request can be found under another URI using a GET method
   */
  SEE_OTHER: 303,

  /**
   * 304 Not Modified
   * Indicates that the resource has not been modified since the version specified by the request headers
   */
  NOT_MODIFIED: 304,

  /**
   * 305 Use Proxy
   * The requested resource is available only through a proxy, the address for which is provided in the response
   */
  USE_PROXY: 305,

  /**
   * 306 Unused
   * This status code was used in a previous version of the HTTP specification, is no longer used, and is reserved
   */
  UNUSED: 306,

  /**
   * 307 Temporary Redirect
   * The request should be repeated with another URI, but future requests can still use the original URI
   */
  TEMPORARY_REDIRECT: 307,

  /**
   * 308 Permanent Redirect
   * The request and all future requests should be repeated using another URI
   */
  PERMANENT_REDIRECT: 308,
} as const;

/**
 * Client error responses (400-499)
 */
export const HTTP_STATUS_CLIENT_ERROR = {
  /**
   * 400 Bad Request
   * The server cannot or will not process the request due to an apparent client error
   */
  BAD_REQUEST: 400,

  /**
   * 401 Unauthorized
   * The request requires user authentication
   */
  UNAUTHORIZED: 401,

  /**
   * 402 Payment Required
   * Reserved for future use
   */
  PAYMENT_REQUIRED: 402,

  /**
   * 403 Forbidden
   * The request was valid, but the server is refusing action
   */
  FORBIDDEN: 403,

  /**
   * 404 Not Found
   * The requested resource could not be found
   */
  NOT_FOUND: 404,

  /**
   * 405 Method Not Allowed
   * A request method is not supported for the requested resource
   */
  METHOD_NOT_ALLOWED: 405,

  /**
   * 406 Not Acceptable
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
   */
  NOT_ACCEPTABLE: 406,

  /**
   * 407 Proxy Authentication Required
   * The client must first authenticate itself with the proxy
   */
  PROXY_AUTHENTICATION_REQUIRED: 407,

  /**
   * 408 Request Timeout
   * The server timed out waiting for the request
   */
  REQUEST_TIMEOUT: 408,

  /**
   * 409 Conflict
   * The request could not be processed because of conflict in the request
   */
  CONFLICT: 409,

  /**
   * 410 Gone
   * The requested resource is no longer available and will not be available again
   */
  GONE: 410,

  /**
   * 411 Length Required
   * The request did not specify the length of its content, which is required by the requested resource
   */
  LENGTH_REQUIRED: 411,

  /**
   * 412 Precondition Failed
   * The server does not meet one of the preconditions that the requester put on the request
   */
  PRECONDITION_FAILED: 412,

  /**
   * 413 Payload Too Large
   * The request is larger than the server is willing or able to process
   */
  PAYLOAD_TOO_LARGE: 413,

  /**
   * 414 URI Too Long
   * The URI provided was too long for the server to process
   */
  URI_TOO_LONG: 414,

  /**
   * 415 Unsupported Media Type
   * The request entity has a media type which the server or resource does not support
   */
  UNSUPPORTED_MEDIA_TYPE: 415,

  /**
   * 416 Range Not Satisfiable
   * The client has asked for a portion of the file, but the server cannot supply that portion
   */
  RANGE_NOT_SATISFIABLE: 416,

  /**
   * 417 Expectation Failed
   * The server cannot meet the requirements of the Expect request-header field
   */
  EXPECTATION_FAILED: 417,

  /**
   * 418 I'm a teapot
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes
   */
  IM_A_TEAPOT: 418,

  /**
   * 421 Misdirected Request
   * The request was directed at a server that is not able to produce a response
   */
  MISDIRECTED_REQUEST: 421,

  /**
   * 422 Unprocessable Entity
   * The request was well-formed but was unable to be followed due to semantic errors
   */
  UNPROCESSABLE_ENTITY: 422,

  /**
   * 423 Locked
   * The resource that is being accessed is locked
   */
  LOCKED: 423,

  /**
   * 424 Failed Dependency
   * The request failed because it depended on another request and that request failed
   */
  FAILED_DEPENDENCY: 424,

  /**
   * 426 Upgrade Required
   * The client should switch to a different protocol
   */
  UPGRADE_REQUIRED: 426,

  /**
   * 428 Precondition Required
   * The origin server requires the request to be conditional
   */
  PRECONDITION_REQUIRED: 428,

  /**
   * 429 Too Many Requests
   * The user has sent too many requests in a given amount of time
   */
  TOO_MANY_REQUESTS: 429,

  /**
   * 431 Request Header Fields Too Large
   * The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

  /**
   * 451 Unavailable For Legal Reasons
   * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource
   */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
} as const;

/**
 * Server error responses (500-599)
 */
export const HTTP_STATUS_SERVER_ERROR = {
  /**
   * 500 Internal Server Error
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
   */
  INTERNAL_SERVER_ERROR: 500,

  /**
   * 501 Not Implemented
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request
   */
  NOT_IMPLEMENTED: 501,

  /**
   * 502 Bad Gateway
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server
   */
  BAD_GATEWAY: 502,

  /**
   * 503 Service Unavailable
   * The server is currently unavailable (because it is overloaded or down for maintenance)
   */
  SERVICE_UNAVAILABLE: 503,

  /**
   * 504 Gateway Timeout
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server
   */
  GATEWAY_TIMEOUT: 504,

  /**
   * 505 HTTP Version Not Supported
   * The server does not support the HTTP protocol version used in the request
   */
  HTTP_VERSION_NOT_SUPPORTED: 505,

  /**
   * 506 Variant Also Negotiates
   * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself
   */
  VARIANT_ALSO_NEGOTIATES: 506,

  /**
   * 507 Insufficient Storage
   * The server is unable to store the representation needed to complete the request
   */
  INSUFFICIENT_STORAGE: 507,

  /**
   * 508 Loop Detected
   * The server detected an infinite loop while processing the request
   */
  LOOP_DETECTED: 508,

  /**
   * 510 Not Extended
   * Further extensions to the request are required for the server to fulfill it
   */
  NOT_EXTENDED: 510,

  /**
   * 511 Network Authentication Required
   * The client needs to authenticate to gain network access
   */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

/**
 * Combined HTTP status codes for easy access
 */
export const HTTP_STATUS = {
  ...HTTP_STATUS_INFO,
  ...HTTP_STATUS_SUCCESS,
  ...HTTP_STATUS_REDIRECTION,
  ...HTTP_STATUS_CLIENT_ERROR,
  ...HTTP_STATUS_SERVER_ERROR,
} as const;

/**
 * HTTP status code categories
 */
export const HTTP_STATUS_CATEGORIES = {
  INFORMATIONAL: 'informational',
  SUCCESS: 'success',
  REDIRECTION: 'redirection',
  CLIENT_ERROR: 'client_error',
  SERVER_ERROR: 'server_error',
} as const;

export type HttpStatusCategory =
  (typeof HTTP_STATUS_CATEGORIES)[keyof typeof HTTP_STATUS_CATEGORIES];

/**
 * HTTP status messages
 */
export const HTTP_STATUS_MESSAGES = {
  // Informational
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',

  // Success
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',

  // Redirection
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Unused',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',

  // Client Error
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',

  // Server Error
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
} as const;

/**
 * HTTP status code type
 */
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

/**
 * HTTP status message type
 */
export type HttpStatusMessage = (typeof HTTP_STATUS_MESSAGES)[keyof typeof HTTP_STATUS_MESSAGES];

/**
 * Check if a status code is informational
 */
export const isInformational = (
  code: number
): code is (typeof HTTP_STATUS_INFO)[keyof typeof HTTP_STATUS_INFO] => {
  return code >= 100 && code < 200;
};

/**
 * Check if a status code is successful
 */
export const isSuccess = (
  code: number
): code is (typeof HTTP_STATUS_SUCCESS)[keyof typeof HTTP_STATUS_SUCCESS] => {
  return code >= 200 && code < 300;
};

/**
 * Check if a status code is a redirection
 */
export const isRedirection = (
  code: number
): code is (typeof HTTP_STATUS_REDIRECTION)[keyof typeof HTTP_STATUS_REDIRECTION] => {
  return code >= 300 && code < 400;
};

/**
 * Check if a status code is a client error
 */
export const isClientError = (
  code: number
): code is (typeof HTTP_STATUS_CLIENT_ERROR)[keyof typeof HTTP_STATUS_CLIENT_ERROR] => {
  return code >= 400 && code < 500;
};

/**
 * Check if a status code is a server error
 */
export const isServerError = (
  code: number
): code is (typeof HTTP_STATUS_SERVER_ERROR)[keyof typeof HTTP_STATUS_SERVER_ERROR] => {
  return code >= 500 && code < 600;
};

/**
 * Get status category by code
 */
export const getStatusCategory = (code: number): HttpStatusCategory | null => {
  if (isInformational(code)) return HTTP_STATUS_CATEGORIES.INFORMATIONAL;
  if (isSuccess(code)) return HTTP_STATUS_CATEGORIES.SUCCESS;
  if (isRedirection(code)) return HTTP_STATUS_CATEGORIES.REDIRECTION;
  if (isClientError(code)) return HTTP_STATUS_CATEGORIES.CLIENT_ERROR;
  if (isServerError(code)) return HTTP_STATUS_CATEGORIES.SERVER_ERROR;
  return null;
};

/**
 * Get status message by code
 */
export const getStatusMessage = (code: number): string | null => {
  return HTTP_STATUS_MESSAGES[code as HttpStatusCode] || null;
};

/**
 * Check if status code is valid
 */
export const isValidStatusCode = (code: number): code is HttpStatusCode => {
  return Object.values(HTTP_STATUS).includes(code as HttpStatusCode);
};

/**
 * Check if status code indicates success (2xx)
 */
export const isSuccessStatusCode = (code: number): boolean => {
  return isSuccess(code);
};

/**
 * Check if status code indicates an error (4xx or 5xx)
 */
export const isErrorStatusCode = (code: number): boolean => {
  return isClientError(code) || isServerError(code);
};

/**
 * Check if status code indicates a client error (4xx)
 */
export const isClientErrorStatusCode = (code: number): boolean => {
  return isClientError(code);
};

/**
 * Check if status code indicates a server error (5xx)
 */
export const isServerErrorStatusCode = (code: number): boolean => {
  return isServerError(code);
};

/**
 * Authentication-specific status codes
 */
export const AUTH_STATUS_CODES = {
  /**
   * 401 Unauthorized
   * Used when authentication is required and has failed or has not yet been provided
   */
  UNAUTHORIZED: HTTP_STATUS.UNAUTHORIZED,

  /**
   * 403 Forbidden
   * Used when the authenticated user does not have permission to access the resource
   */
  FORBIDDEN: HTTP_STATUS.FORBIDDEN,

  /**
   * 423 Locked
   * Used when the account is locked due to security reasons
   */
  LOCKED: HTTP_STATUS.LOCKED,

  /**
   * 429 Too Many Requests
   * Used when authentication rate limit is exceeded
   */
  TOO_MANY_REQUESTS: HTTP_STATUS.TOO_MANY_REQUESTS,
} as const;

/**
 * Common API status codes
 */
export const API_STATUS_CODES = {
  /**
   * 200 OK
   * Standard success response
   */
  SUCCESS: HTTP_STATUS.OK,

  /**
   * 201 Created
   * Resource created successfully
   */
  CREATED: HTTP_STATUS.CREATED,

  /**
   * 204 No Content
   * Success but no content to return
   */
  NO_CONTENT: HTTP_STATUS.NO_CONTENT,

  /**
   * 400 Bad Request
   * Invalid request parameters
   */
  BAD_REQUEST: HTTP_STATUS.BAD_REQUEST,

  /**
   * 404 Not Found
   * Resource not found
   */
  NOT_FOUND: HTTP_STATUS.NOT_FOUND,

  /**
   * 409 Conflict
   * Resource conflict (e.g., duplicate entry)
   */
  CONFLICT: HTTP_STATUS.CONFLICT,

  /**
   * 422 Unprocessable Entity
   * Validation errors
   */
  UNPROCESSABLE_ENTITY: HTTP_STATUS.UNPROCESSABLE_ENTITY,

  /**
   * 500 Internal Server Error
   * Server error
   */
  INTERNAL_SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,

  /**
   * 503 Service Unavailable
   * Service temporarily unavailable
   */
  SERVICE_UNAVAILABLE: HTTP_STATUS.SERVICE_UNAVAILABLE,
} as const;

/**
 * HTTP status code utilities
 */
export const HTTP_STATUS_UTILS = {
  /**
   * Check if status code is informational
   */
  isInformational,

  /**
   * Check if status code is successful
   */
  isSuccess,

  /**
   * Check if status code is a redirection
   */
  isRedirection,

  /**
   * Check if status code is a client error
   */
  isClientError,

  /**
   * Check if status code is a server error
   */
  isServerError,

  /**
   * Get status category
   */
  getCategory: getStatusCategory,

  /**
   * Get status message
   */
  getMessage: getStatusMessage,

  /**
   * Check if status code is valid
   */
  isValid: isValidStatusCode,

  /**
   * Check if status code indicates success
   */
  isSuccessCode: isSuccessStatusCode,

  /**
   * Check if status code indicates an error
   */
  isErrorCode: isErrorStatusCode,

  /**
   * Check if status code indicates client error
   */
  isClientErrorCode: isClientErrorStatusCode,

  /**
   * Check if status code indicates server error
   */
  isServerErrorCode: isServerErrorStatusCode,
} as const;

/**
 * HTTP status code interface
 */
export interface HttpStatus {
  code: HttpStatusCode;
  message: HttpStatusMessage;
  category: HttpStatusCategory;
  isInformational: boolean;
  isSuccess: boolean;
  isRedirection: boolean;
  isClientError: boolean;
  isServerError: boolean;
}

/**
 * Create HTTP status object from code
 */
export const createHttpStatus = (code: number): HttpStatus | null => {
  if (!isValidStatusCode(code)) return null;

  return {
    code: code as HttpStatusCode,
    message: HTTP_STATUS_MESSAGES[code as HttpStatusCode] as HttpStatusMessage,
    category: getStatusCategory(code) as HttpStatusCategory,
    isInformational: isInformational(code),
    isSuccess: isSuccess(code),
    isRedirection: isRedirection(code),
    isClientError: isClientError(code),
    isServerError: isServerError(code),
  };
};

/**
 * All HTTP status codes for easy export
 */
export const ALL_STATUS_CODES = {
  INFO: HTTP_STATUS_INFO,
  SUCCESS: HTTP_STATUS_SUCCESS,
  REDIRECT: HTTP_STATUS_REDIRECTION,
  CLIENT_ERROR: HTTP_STATUS_CLIENT_ERROR,
  SERVER_ERROR: HTTP_STATUS_SERVER_ERROR,
} as const;

/**
 * Common HTTP methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  CONNECT: 'CONNECT',
  TRACE: 'TRACE',
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

/**
 * Common HTTP headers
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  CONTENT_LENGTH: 'Content-Length',
  ACCEPT: 'Accept',
  ACCEPT_ENCODING: 'Accept-Encoding',
  ACCEPT_LANGUAGE: 'Accept-Language',
  AUTHORIZATION: 'Authorization',
  CACHE_CONTROL: 'Cache-Control',
  CONNECTION: 'Connection',
  COOKIE: 'Cookie',
  HOST: 'Host',
  ORIGIN: 'Origin',
  REFERER: 'Referer',
  USER_AGENT: 'User-Agent',
  X_FORWARDED_FOR: 'X-Forwarded-For',
  X_REQUESTED_WITH: 'X-Requested-With',
  X_CSRF_TOKEN: 'X-CSRF-Token',
  X_API_KEY: 'X-API-Key',
  LOCATION: 'Location',
  SET_COOKIE: 'Set-Cookie',
  WWW_AUTHENTICATE: 'WWW-Authenticate',
  ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
  ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',
  ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
  ACCESS_CONTROL_MAX_AGE: 'Access-Control-Max-Age',
} as const;

export type HttpHeader = (typeof HTTP_HEADERS)[keyof typeof HTTP_HEADERS];
