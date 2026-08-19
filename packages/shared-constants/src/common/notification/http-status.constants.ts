/**
 * Notification HTTP Status Codes Constants
 * Contains all HTTP status codes used in notification management
 */

export const NotificationHttpStatus = {
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

  // Custom Notification Business Codes
  NOTIFICATION_FAILED: 11001,
  NOTIFICATION_DELIVERY_FAILED: 11002,
  NOTIFICATION_INVALID_TEMPLATE: 11003,
  NOTIFICATION_RECIPIENT_INVALID: 11004,
  NOTIFICATION_CHANNEL_UNSUPPORTED: 11005,
  NOTIFICATION_RATE_LIMITED: 11006,
  NOTIFICATION_QUEUE_FULL: 11007,
  NOTIFICATION_EXPIRED: 11008,
  NOTIFICATION_ALREADY_SENT: 11009,
  NOTIFICATION_PREFERENCE_BLOCKED: 11010,
  NOTIFICATION_TEMPLATE_NOT_FOUND: 11011,
  NOTIFICATION_SCHEDULE_FAILED: 11012,
  NOTIFICATION_BROADCAST_FAILED: 11013,
  NOTIFICATION_DIGEST_FAILED: 11014,
  NOTIFICATION_RULE_VIOLATION: 11015,
  NOTIFICATION_DEVICE_UNREGISTERED: 11016,
} as const;

export type NotificationHttpStatusCode =
  (typeof NotificationHttpStatus)[keyof typeof NotificationHttpStatus];

// Status code sets for type checking
const SUCCESS_CODES = new Set<number>([200, 201, 202, 203, 204, 205, 206]);
const REDIRECTION_CODES = new Set<number>([300, 301, 302, 303, 304, 305, 307, 308]);
const CLIENT_ERROR_CODES = new Set<number>([
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
  421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
]);
const SERVER_ERROR_CODES = new Set<number>([500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]);
const NOTIFICATION_ERROR_CODES = new Set<number>([
  11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11009, 11010, 11011, 11012, 11013, 11014,
  11015, 11016,
]);

export const NotificationHttpStatusMessages: Record<NotificationHttpStatusCode, string> = {
  [NotificationHttpStatus.OK]: 'Success',
  [NotificationHttpStatus.CREATED]: 'Notification created successfully',
  [NotificationHttpStatus.ACCEPTED]: 'Notification accepted',
  [NotificationHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [NotificationHttpStatus.NO_CONTENT]: 'No content',
  [NotificationHttpStatus.RESET_CONTENT]: 'Reset content',
  [NotificationHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [NotificationHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [NotificationHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [NotificationHttpStatus.FOUND]: 'Found',
  [NotificationHttpStatus.SEE_OTHER]: 'See other',
  [NotificationHttpStatus.NOT_MODIFIED]: 'Not modified',
  [NotificationHttpStatus.USE_PROXY]: 'Use proxy',
  [NotificationHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [NotificationHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [NotificationHttpStatus.BAD_REQUEST]: 'Bad request',
  [NotificationHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [NotificationHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [NotificationHttpStatus.FORBIDDEN]: 'Forbidden',
  [NotificationHttpStatus.NOT_FOUND]: 'Notification not found',
  [NotificationHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [NotificationHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [NotificationHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [NotificationHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [NotificationHttpStatus.CONFLICT]: 'Conflict',
  [NotificationHttpStatus.GONE]: 'Gone',
  [NotificationHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [NotificationHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [NotificationHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [NotificationHttpStatus.URI_TOO_LONG]: 'URI too long',
  [NotificationHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [NotificationHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [NotificationHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [NotificationHttpStatus.IM_A_TEAPOT]: 'Im a teapot',
  [NotificationHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [NotificationHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [NotificationHttpStatus.LOCKED]: 'Locked',
  [NotificationHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [NotificationHttpStatus.TOO_EARLY]: 'Too early',
  [NotificationHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [NotificationHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [NotificationHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [NotificationHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [NotificationHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [NotificationHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [NotificationHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [NotificationHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [NotificationHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [NotificationHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [NotificationHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [NotificationHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [NotificationHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [NotificationHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [NotificationHttpStatus.NOT_EXTENDED]: 'Not extended',
  [NotificationHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',

  // Custom notification messages
  [NotificationHttpStatus.NOTIFICATION_FAILED]: 'Notification failed',
  [NotificationHttpStatus.NOTIFICATION_DELIVERY_FAILED]: 'Notification delivery failed',
  [NotificationHttpStatus.NOTIFICATION_INVALID_TEMPLATE]: 'Invalid notification template',
  [NotificationHttpStatus.NOTIFICATION_RECIPIENT_INVALID]: 'Invalid recipient',
  [NotificationHttpStatus.NOTIFICATION_CHANNEL_UNSUPPORTED]: 'Unsupported notification channel',
  [NotificationHttpStatus.NOTIFICATION_RATE_LIMITED]: 'Rate limit exceeded',
  [NotificationHttpStatus.NOTIFICATION_QUEUE_FULL]: 'Notification queue is full',
  [NotificationHttpStatus.NOTIFICATION_EXPIRED]: 'Notification has expired',
  [NotificationHttpStatus.NOTIFICATION_ALREADY_SENT]: 'Notification already sent',
  [NotificationHttpStatus.NOTIFICATION_PREFERENCE_BLOCKED]: 'Notification preference blocked',
  [NotificationHttpStatus.NOTIFICATION_TEMPLATE_NOT_FOUND]: 'Notification template not found',
  [NotificationHttpStatus.NOTIFICATION_SCHEDULE_FAILED]: 'Notification schedule failed',
  [NotificationHttpStatus.NOTIFICATION_BROADCAST_FAILED]: 'Notification broadcast failed',
  [NotificationHttpStatus.NOTIFICATION_DIGEST_FAILED]: 'Notification digest failed',
  [NotificationHttpStatus.NOTIFICATION_RULE_VIOLATION]: 'Notification rule violation',
  [NotificationHttpStatus.NOTIFICATION_DEVICE_UNREGISTERED]: 'Notification device unregistered',
};

export const NotificationHttpStatusCategories = {
  SUCCESS: [200, 201, 202, 203, 204, 205, 206] as const,
  REDIRECTION: [300, 301, 302, 303, 304, 305, 307, 308] as const,
  CLIENT_ERROR: [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  ] as const,
  SERVER_ERROR: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] as const,
  NOTIFICATION_ERROR: [
    11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11009, 11010, 11011, 11012, 11013,
    11014, 11015, 11016,
  ] as const,
} as const;

export const NotificationHttpStatusHelpers = {
  isSuccess: (code: number): boolean => SUCCESS_CODES.has(code),
  isRedirection: (code: number): boolean => REDIRECTION_CODES.has(code),
  isClientError: (code: number): boolean => CLIENT_ERROR_CODES.has(code),
  isServerError: (code: number): boolean => SERVER_ERROR_CODES.has(code),
  isNotificationError: (code: number): boolean => NOTIFICATION_ERROR_CODES.has(code),
  getMessage: (code: NotificationHttpStatusCode): string =>
    NotificationHttpStatusMessages[code] || 'Unknown status code',
  getCategory: (code: number): keyof typeof NotificationHttpStatusCategories | null => {
    if (SUCCESS_CODES.has(code)) return 'SUCCESS';
    if (REDIRECTION_CODES.has(code)) return 'REDIRECTION';
    if (CLIENT_ERROR_CODES.has(code)) return 'CLIENT_ERROR';
    if (SERVER_ERROR_CODES.has(code)) return 'SERVER_ERROR';
    if (NOTIFICATION_ERROR_CODES.has(code)) return 'NOTIFICATION_ERROR';
    return null;
  },
};
