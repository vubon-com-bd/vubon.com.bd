/**
 * @fileoverview Authentication HTTP Status Constants
 * @description Contains all HTTP status codes used in authentication and authorization
 * @module AuthHttpStatus
 */

export const AuthHttpStatus = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,

  // 3xx Redirection
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // 4xx Client Errors
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

  // 5xx Server Errors
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

export type AuthHttpStatusCode = (typeof AuthHttpStatus)[keyof typeof AuthHttpStatus];

export type AuthHttpStatusCategory = 'success' | 'redirection' | 'client_error' | 'server_error';

export const AuthHttpStatusMessages: Record<AuthHttpStatusCode, string> = {
  [AuthHttpStatus.OK]: 'Success',
  [AuthHttpStatus.CREATED]: 'User created successfully',
  [AuthHttpStatus.ACCEPTED]: 'Request accepted',
  [AuthHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [AuthHttpStatus.NO_CONTENT]: 'No content',
  [AuthHttpStatus.RESET_CONTENT]: 'Reset content',
  [AuthHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [AuthHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [AuthHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [AuthHttpStatus.FOUND]: 'Found',
  [AuthHttpStatus.SEE_OTHER]: 'See other',
  [AuthHttpStatus.NOT_MODIFIED]: 'Not modified',
  [AuthHttpStatus.USE_PROXY]: 'Use proxy',
  [AuthHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [AuthHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [AuthHttpStatus.BAD_REQUEST]: 'Bad request',
  [AuthHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [AuthHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [AuthHttpStatus.FORBIDDEN]: 'Forbidden',
  [AuthHttpStatus.NOT_FOUND]: 'User not found',
  [AuthHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [AuthHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [AuthHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [AuthHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [AuthHttpStatus.CONFLICT]: 'Conflict',
  [AuthHttpStatus.GONE]: 'Gone',
  [AuthHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [AuthHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [AuthHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [AuthHttpStatus.URI_TOO_LONG]: 'URI too long',
  [AuthHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [AuthHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [AuthHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [AuthHttpStatus.IM_A_TEAPOT]: "I'm a teapot",
  [AuthHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [AuthHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [AuthHttpStatus.LOCKED]: 'Locked',
  [AuthHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [AuthHttpStatus.TOO_EARLY]: 'Too early',
  [AuthHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [AuthHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [AuthHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [AuthHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [AuthHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [AuthHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [AuthHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [AuthHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [AuthHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [AuthHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [AuthHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [AuthHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [AuthHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [AuthHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [AuthHttpStatus.NOT_EXTENDED]: 'Not extended',
  [AuthHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',
};

export const AuthHttpStatusCategories = {
  SUCCESS: [200, 201, 202, 203, 204, 205, 206] as const,
  REDIRECTION: [300, 301, 302, 303, 304, 305, 307, 308] as const,
  CLIENT_ERROR: [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  ] as const,
  SERVER_ERROR: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] as const,
} as const;

export const AuthHttpStatusHelpers = {
  isSuccess: (code: number): boolean => {
    return (AuthHttpStatusCategories.SUCCESS as readonly number[]).includes(code);
  },
  isRedirection: (code: number): boolean => {
    return (AuthHttpStatusCategories.REDIRECTION as readonly number[]).includes(code);
  },
  isClientError: (code: number): boolean => {
    return (AuthHttpStatusCategories.CLIENT_ERROR as readonly number[]).includes(code);
  },
  isServerError: (code: number): boolean => {
    return (AuthHttpStatusCategories.SERVER_ERROR as readonly number[]).includes(code);
  },
  isError: (code: number): boolean => {
    return AuthHttpStatusHelpers.isClientError(code) || AuthHttpStatusHelpers.isServerError(code);
  },
  getCategory: (code: number): AuthHttpStatusCategory | null => {
    if (AuthHttpStatusHelpers.isSuccess(code)) return 'success';
    if (AuthHttpStatusHelpers.isRedirection(code)) return 'redirection';
    if (AuthHttpStatusHelpers.isClientError(code)) return 'client_error';
    if (AuthHttpStatusHelpers.isServerError(code)) return 'server_error';
    return null;
  },
  getMessage: (code: number): string => {
    return AuthHttpStatusMessages[code as AuthHttpStatusCode] || 'Unknown status code';
  },
};
