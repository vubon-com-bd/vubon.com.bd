/**
 * @fileoverview HTTP status codes with proper names and descriptions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * HTTP status codes enum
 */
export enum HttpStatusCode {
  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,

  // 3xx Redirection
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

/**
 * HTTP status code category
 */
export enum HttpStatusCategory {
  /** Informational responses (100-199) */
  INFORMATIONAL = 'INFORMATIONAL',
  /** Successful responses (200-299) */
  SUCCESS = 'SUCCESS',
  /** Redirection messages (300-399) */
  REDIRECTION = 'REDIRECTION',
  /** Client error responses (400-499) */
  CLIENT_ERROR = 'CLIENT_ERROR',
  /** Server error responses (500-599) */
  SERVER_ERROR = 'SERVER_ERROR',
}

/**
 * HTTP status code name
 */
export const HTTP_STATUS_NAME: Record<HttpStatusCode, string> = {
  [HttpStatusCode.OK]: 'OK',
  [HttpStatusCode.CREATED]: 'Created',
  [HttpStatusCode.ACCEPTED]: 'Accepted',
  [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',
  [HttpStatusCode.NO_CONTENT]: 'No Content',
  [HttpStatusCode.RESET_CONTENT]: 'Reset Content',
  [HttpStatusCode.PARTIAL_CONTENT]: 'Partial Content',

  [HttpStatusCode.MULTIPLE_CHOICES]: 'Multiple Choices',
  [HttpStatusCode.MOVED_PERMANENTLY]: 'Moved Permanently',
  [HttpStatusCode.FOUND]: 'Found',
  [HttpStatusCode.SEE_OTHER]: 'See Other',
  [HttpStatusCode.NOT_MODIFIED]: 'Not Modified',
  [HttpStatusCode.TEMPORARY_REDIRECT]: 'Temporary Redirect',
  [HttpStatusCode.PERMANENT_REDIRECT]: 'Permanent Redirect',

  [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusCode.PAYMENT_REQUIRED]: 'Payment Required',
  [HttpStatusCode.FORBIDDEN]: 'Forbidden',
  [HttpStatusCode.NOT_FOUND]: 'Not Found',
  [HttpStatusCode.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
  [HttpStatusCode.NOT_ACCEPTABLE]: 'Not Acceptable',
  [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
  [HttpStatusCode.REQUEST_TIMEOUT]: 'Request Timeout',
  [HttpStatusCode.CONFLICT]: 'Conflict',
  [HttpStatusCode.GONE]: 'Gone',
  [HttpStatusCode.LENGTH_REQUIRED]: 'Length Required',
  [HttpStatusCode.PRECONDITION_FAILED]: 'Precondition Failed',
  [HttpStatusCode.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
  [HttpStatusCode.URI_TOO_LONG]: 'URI Too Long',
  [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
  [HttpStatusCode.RANGE_NOT_SATISFIABLE]: 'Range Not Satisfiable',
  [HttpStatusCode.EXPECTATION_FAILED]: 'Expectation Failed',
  [HttpStatusCode.IM_A_TEAPOT]: "I'm a teapot",
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [HttpStatusCode.LOCKED]: 'Locked',
  [HttpStatusCode.FAILED_DEPENDENCY]: 'Failed Dependency',
  [HttpStatusCode.TOO_EARLY]: 'Too Early',
  [HttpStatusCode.UPGRADE_REQUIRED]: 'Upgrade Required',
  [HttpStatusCode.PRECONDITION_REQUIRED]: 'Precondition Required',
  [HttpStatusCode.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request Header Fields Too Large',
  [HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable For Legal Reasons',

  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HttpStatusCode.NOT_IMPLEMENTED]: 'Not Implemented',
  [HttpStatusCode.BAD_GATEWAY]: 'Bad Gateway',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HttpStatusCode.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
  [HttpStatusCode.VARIANT_ALSO_NEGOTIATES]: 'Variant Also Negotiates',
  [HttpStatusCode.INSUFFICIENT_STORAGE]: 'Insufficient Storage',
  [HttpStatusCode.LOOP_DETECTED]: 'Loop Detected',
  [HttpStatusCode.NOT_EXTENDED]: 'Not Extended',
  [HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED]: 'Network Authentication Required',
};

/**
 * HTTP status code description
 */
export const HTTP_STATUS_DESCRIPTION: Record<HttpStatusCode, string> = {
  [HttpStatusCode.OK]: 'The request has succeeded.',
  [HttpStatusCode.CREATED]:
    'The request has been fulfilled and has resulted in one or more new resources being created.',
  [HttpStatusCode.ACCEPTED]:
    'The request has been accepted for processing, but the processing has not been completed.',
  [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]:
    'The returned metadata is not exactly the same as is available from the origin server.',
  [HttpStatusCode.NO_CONTENT]:
    'There is no content to send for this request, but the headers may be useful.',
  [HttpStatusCode.RESET_CONTENT]:
    'Tells the user agent to reset the document which sent this request.',
  [HttpStatusCode.PARTIAL_CONTENT]:
    'The server is delivering only part of the resource due to a range header sent by the client.',

  [HttpStatusCode.MULTIPLE_CHOICES]:
    'The request has more than one possible response. The user agent should choose one.',
  [HttpStatusCode.MOVED_PERMANENTLY]:
    'The URL of the requested resource has been changed permanently.',
  [HttpStatusCode.FOUND]: 'The URL of the requested resource has been changed temporarily.',
  [HttpStatusCode.SEE_OTHER]:
    'The response to the request can be found under another URI using a GET method.',
  [HttpStatusCode.NOT_MODIFIED]:
    'The resource has not been modified since the version specified by the request headers.',
  [HttpStatusCode.TEMPORARY_REDIRECT]:
    'The server cannot process the request due to a temporary issue.',
  [HttpStatusCode.PERMANENT_REDIRECT]:
    'The server cannot process the request due to a permanent issue.',

  [HttpStatusCode.BAD_REQUEST]:
    'The server could not understand the request due to invalid syntax.',
  [HttpStatusCode.UNAUTHORIZED]:
    'The client must authenticate itself to get the requested response.',
  [HttpStatusCode.PAYMENT_REQUIRED]: 'This response code is reserved for future use.',
  [HttpStatusCode.FORBIDDEN]: 'The client does not have access rights to the content.',
  [HttpStatusCode.NOT_FOUND]: 'The server cannot find the requested resource.',
  [HttpStatusCode.METHOD_NOT_ALLOWED]:
    'The request method is known by the server but is not supported by the target resource.',
  [HttpStatusCode.NOT_ACCEPTABLE]:
    'The server cannot produce a response matching the list of acceptable values defined in the request.',
  [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]:
    'The client must authenticate itself to get the requested response via a proxy.',
  [HttpStatusCode.REQUEST_TIMEOUT]:
    'The server did not receive a complete request message within the time that it was prepared to wait.',
  [HttpStatusCode.CONFLICT]: 'The request conflicts with the current state of the server.',
  [HttpStatusCode.GONE]:
    'The requested resource is no longer available and will not be available again.',
  [HttpStatusCode.LENGTH_REQUIRED]:
    'The request did not specify the length of its content, which is required by the requested resource.',
  [HttpStatusCode.PRECONDITION_FAILED]:
    'The server does not meet one of the preconditions that the requester put on the request.',
  [HttpStatusCode.PAYLOAD_TOO_LARGE]: 'The request entity is larger than limits defined by server.',
  [HttpStatusCode.URI_TOO_LONG]:
    'The URI requested by the client is longer than the server is willing to interpret.',
  [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]:
    'The media format of the requested data is not supported by the server.',
  [HttpStatusCode.RANGE_NOT_SATISFIABLE]:
    'The range specified by the Range header in the request cannot be fulfilled.',
  [HttpStatusCode.EXPECTATION_FAILED]:
    'The server cannot meet the requirements of the Expect request-header field.',
  [HttpStatusCode.IM_A_TEAPOT]: 'The server refuses to brew coffee because it is a teapot.',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]:
    'The request was well-formed but was unable to be followed due to semantic errors.',
  [HttpStatusCode.LOCKED]: 'The resource that is being accessed is locked.',
  [HttpStatusCode.FAILED_DEPENDENCY]: 'The request failed due to failure of a previous request.',
  [HttpStatusCode.TOO_EARLY]:
    'The server is unwilling to risk processing a request that might be replayed.',
  [HttpStatusCode.UPGRADE_REQUIRED]: 'The client should switch to a different protocol.',
  [HttpStatusCode.PRECONDITION_REQUIRED]:
    'The origin server requires the request to be conditional.',
  [HttpStatusCode.TOO_MANY_REQUESTS]:
    'The user has sent too many requests in a given amount of time.',
  [HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    'The server is unwilling to process the request because its header fields are too large.',
  [HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS]:
    'The user agent requested a resource that cannot legally be provided.',

  [HttpStatusCode.INTERNAL_SERVER_ERROR]:
    'The server has encountered a situation it does not know how to handle.',
  [HttpStatusCode.NOT_IMPLEMENTED]:
    'The request method is not supported by the server and cannot be handled.',
  [HttpStatusCode.BAD_GATEWAY]:
    'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: 'The server is not ready to handle the request.',
  [HttpStatusCode.GATEWAY_TIMEOUT]:
    'The server, while acting as a gateway or proxy, did not get a response in time.',
  [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]:
    'The HTTP version used in the request is not supported by the server.',
  [HttpStatusCode.VARIANT_ALSO_NEGOTIATES]: 'The server has an internal configuration error.',
  [HttpStatusCode.INSUFFICIENT_STORAGE]:
    'The server is unable to store the representation needed to complete the request.',
  [HttpStatusCode.LOOP_DETECTED]:
    'The server detected an infinite loop while processing the request.',
  [HttpStatusCode.NOT_EXTENDED]:
    'Further extensions to the request are required for the server to fulfill it.',
  [HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED]:
    'The client needs to authenticate to gain network access.',
};

/**
 * HTTP status category
 */
export const HTTP_STATUS_CATEGORY: Record<HttpStatusCode, HttpStatusCategory> = {
  [HttpStatusCode.OK]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.CREATED]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.ACCEPTED]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.NO_CONTENT]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.RESET_CONTENT]: HttpStatusCategory.SUCCESS,
  [HttpStatusCode.PARTIAL_CONTENT]: HttpStatusCategory.SUCCESS,

  [HttpStatusCode.MULTIPLE_CHOICES]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.MOVED_PERMANENTLY]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.FOUND]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.SEE_OTHER]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.NOT_MODIFIED]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.TEMPORARY_REDIRECT]: HttpStatusCategory.REDIRECTION,
  [HttpStatusCode.PERMANENT_REDIRECT]: HttpStatusCategory.REDIRECTION,

  [HttpStatusCode.BAD_REQUEST]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.UNAUTHORIZED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.PAYMENT_REQUIRED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.FORBIDDEN]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.NOT_FOUND]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.METHOD_NOT_ALLOWED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.NOT_ACCEPTABLE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.REQUEST_TIMEOUT]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.CONFLICT]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.GONE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.LENGTH_REQUIRED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.PRECONDITION_FAILED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.PAYLOAD_TOO_LARGE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.URI_TOO_LONG]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.RANGE_NOT_SATISFIABLE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.EXPECTATION_FAILED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.IM_A_TEAPOT]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.LOCKED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.FAILED_DEPENDENCY]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.TOO_EARLY]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.UPGRADE_REQUIRED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.PRECONDITION_REQUIRED]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.TOO_MANY_REQUESTS]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE]: HttpStatusCategory.CLIENT_ERROR,
  [HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS]: HttpStatusCategory.CLIENT_ERROR,

  [HttpStatusCode.INTERNAL_SERVER_ERROR]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.NOT_IMPLEMENTED]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.BAD_GATEWAY]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.SERVICE_UNAVAILABLE]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.GATEWAY_TIMEOUT]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.VARIANT_ALSO_NEGOTIATES]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.INSUFFICIENT_STORAGE]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.LOOP_DETECTED]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.NOT_EXTENDED]: HttpStatusCategory.SERVER_ERROR,
  [HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED]: HttpStatusCategory.SERVER_ERROR,
};

/**
 * Get status name by code
 */
export function getHttpStatusName(code: HttpStatusCode): string {
  return HTTP_STATUS_NAME[code] || 'Unknown Status';
}

/**
 * Get status description by code
 */
export function getHttpStatusDescription(code: HttpStatusCode): string {
  return HTTP_STATUS_DESCRIPTION[code] || 'No description available';
}

/**
 * Get status category by code
 */
export function getHttpStatusCategory(code: HttpStatusCode): HttpStatusCategory {
  return HTTP_STATUS_CATEGORY[code] || HttpStatusCategory.SERVER_ERROR;
}

/**
 * Check if status is successful (2xx)
 */
export function isHttpSuccess(code: HttpStatusCode): boolean {
  return code >= 200 && code < 300;
}

/**
 * Check if status is redirection (3xx)
 */
export function isHttpRedirection(code: HttpStatusCode): boolean {
  return code >= 300 && code < 400;
}

/**
 * Check if status is client error (4xx)
 */
export function isHttpClientError(code: HttpStatusCode): boolean {
  return code >= 400 && code < 500;
}

/**
 * Check if status is server error (5xx)
 */
export function isHttpServerError(code: HttpStatusCode): boolean {
  return code >= 500 && code < 600;
}

/**
 * Check if status is error (4xx or 5xx)
 */
export function isHttpError(code: HttpStatusCode): boolean {
  return isHttpClientError(code) || isHttpServerError(code);
}

/**
 * Check if status is retryable
 */
export function isHttpRetryable(code: HttpStatusCode): boolean {
  const retryableCodes = [
    HttpStatusCode.REQUEST_TIMEOUT,
    HttpStatusCode.TOO_MANY_REQUESTS,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    HttpStatusCode.BAD_GATEWAY,
    HttpStatusCode.SERVICE_UNAVAILABLE,
    HttpStatusCode.GATEWAY_TIMEOUT,
    HttpStatusCode.INSUFFICIENT_STORAGE,
  ];
  return retryableCodes.includes(code);
}

/**
 * Get status code from name
 */
export function getHttpStatusCodeFromName(name: string): HttpStatusCode | null {
  const entry = Object.entries(HTTP_STATUS_NAME).find(
    ([_, value]) => value.toLowerCase() === name.toLowerCase()
  );
  return entry ? (parseInt(entry[0]) as HttpStatusCode) : null;
}

/**
 * HTTP status code groups
 */
export const HTTP_STATUS_GROUPS = {
  /** Informational responses (100-199) */
  INFORMATIONAL: [] as HttpStatusCode[],
  /** Successful responses (200-299) */
  SUCCESS: [
    HttpStatusCode.OK,
    HttpStatusCode.CREATED,
    HttpStatusCode.ACCEPTED,
    HttpStatusCode.NON_AUTHORITATIVE_INFORMATION,
    HttpStatusCode.NO_CONTENT,
    HttpStatusCode.RESET_CONTENT,
    HttpStatusCode.PARTIAL_CONTENT,
  ],
  /** Redirection messages (300-399) */
  REDIRECTION: [
    HttpStatusCode.MULTIPLE_CHOICES,
    HttpStatusCode.MOVED_PERMANENTLY,
    HttpStatusCode.FOUND,
    HttpStatusCode.SEE_OTHER,
    HttpStatusCode.NOT_MODIFIED,
    HttpStatusCode.TEMPORARY_REDIRECT,
    HttpStatusCode.PERMANENT_REDIRECT,
  ],
  /** Client error responses (400-499) */
  CLIENT_ERROR: [
    HttpStatusCode.BAD_REQUEST,
    HttpStatusCode.UNAUTHORIZED,
    HttpStatusCode.PAYMENT_REQUIRED,
    HttpStatusCode.FORBIDDEN,
    HttpStatusCode.NOT_FOUND,
    HttpStatusCode.METHOD_NOT_ALLOWED,
    HttpStatusCode.NOT_ACCEPTABLE,
    HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED,
    HttpStatusCode.REQUEST_TIMEOUT,
    HttpStatusCode.CONFLICT,
    HttpStatusCode.GONE,
    HttpStatusCode.LENGTH_REQUIRED,
    HttpStatusCode.PRECONDITION_FAILED,
    HttpStatusCode.PAYLOAD_TOO_LARGE,
    HttpStatusCode.URI_TOO_LONG,
    HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
    HttpStatusCode.RANGE_NOT_SATISFIABLE,
    HttpStatusCode.EXPECTATION_FAILED,
    HttpStatusCode.IM_A_TEAPOT,
    HttpStatusCode.UNPROCESSABLE_ENTITY,
    HttpStatusCode.LOCKED,
    HttpStatusCode.FAILED_DEPENDENCY,
    HttpStatusCode.TOO_EARLY,
    HttpStatusCode.UPGRADE_REQUIRED,
    HttpStatusCode.PRECONDITION_REQUIRED,
    HttpStatusCode.TOO_MANY_REQUESTS,
    HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
    HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS,
  ],
  /** Server error responses (500-599) */
  SERVER_ERROR: [
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    HttpStatusCode.NOT_IMPLEMENTED,
    HttpStatusCode.BAD_GATEWAY,
    HttpStatusCode.SERVICE_UNAVAILABLE,
    HttpStatusCode.GATEWAY_TIMEOUT,
    HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED,
    HttpStatusCode.VARIANT_ALSO_NEGOTIATES,
    HttpStatusCode.INSUFFICIENT_STORAGE,
    HttpStatusCode.LOOP_DETECTED,
    HttpStatusCode.NOT_EXTENDED,
    HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED,
  ],
} as const;
