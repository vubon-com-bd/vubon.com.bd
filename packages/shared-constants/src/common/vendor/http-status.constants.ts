/**
 * Vendor HTTP Status Codes Constants
 * Contains all HTTP status codes used in vendor management
 */

export const VendorHttpStatus = {
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

  // Custom Vendor Business Codes
  VENDOR_NOT_VERIFIED: 8001,
  VENDOR_SUSPENDED: 8002,
  VENDOR_BLOCKED: 8003,
  VENDOR_PENDING_APPROVAL: 8004,
  VENDOR_INACTIVE: 8005,
  VENDOR_DOCUMENT_MISSING: 8006,
  VENDOR_DOCUMENT_EXPIRED: 8007,
  VENDOR_PAYMENT_METHOD_INVALID: 8008,
  VENDOR_SUBSCRIPTION_EXPIRED: 8009,
  VENDOR_LIMIT_EXCEEDED: 8010,
} as const;

export type VendorHttpStatusCode = (typeof VendorHttpStatus)[keyof typeof VendorHttpStatus];

export const VendorHttpStatusMessages: Record<VendorHttpStatusCode, string> = {
  [VendorHttpStatus.OK]: 'Success',
  [VendorHttpStatus.CREATED]: 'Vendor created successfully',
  [VendorHttpStatus.ACCEPTED]: 'Vendor request accepted',
  [VendorHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [VendorHttpStatus.NO_CONTENT]: 'No content',
  [VendorHttpStatus.RESET_CONTENT]: 'Reset content',
  [VendorHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [VendorHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [VendorHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [VendorHttpStatus.FOUND]: 'Found',
  [VendorHttpStatus.SEE_OTHER]: 'See other',
  [VendorHttpStatus.NOT_MODIFIED]: 'Not modified',
  [VendorHttpStatus.USE_PROXY]: 'Use proxy',
  [VendorHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [VendorHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [VendorHttpStatus.BAD_REQUEST]: 'Bad request',
  [VendorHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [VendorHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [VendorHttpStatus.FORBIDDEN]: 'Forbidden',
  [VendorHttpStatus.NOT_FOUND]: 'Vendor not found',
  [VendorHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [VendorHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [VendorHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [VendorHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [VendorHttpStatus.CONFLICT]: 'Conflict',
  [VendorHttpStatus.GONE]: 'Gone',
  [VendorHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [VendorHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [VendorHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [VendorHttpStatus.URI_TOO_LONG]: 'URI too long',
  [VendorHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [VendorHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [VendorHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [VendorHttpStatus.IM_A_TEAPOT]: 'Im a teapot',
  [VendorHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [VendorHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [VendorHttpStatus.LOCKED]: 'Locked',
  [VendorHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [VendorHttpStatus.TOO_EARLY]: 'Too early',
  [VendorHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [VendorHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [VendorHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [VendorHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [VendorHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [VendorHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [VendorHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [VendorHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [VendorHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [VendorHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [VendorHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [VendorHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [VendorHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [VendorHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [VendorHttpStatus.NOT_EXTENDED]: 'Not extended',
  [VendorHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',

  // Custom vendor messages
  [VendorHttpStatus.VENDOR_NOT_VERIFIED]: 'Vendor is not verified',
  [VendorHttpStatus.VENDOR_SUSPENDED]: 'Vendor is suspended',
  [VendorHttpStatus.VENDOR_BLOCKED]: 'Vendor is blocked',
  [VendorHttpStatus.VENDOR_PENDING_APPROVAL]: 'Vendor pending approval',
  [VendorHttpStatus.VENDOR_INACTIVE]: 'Vendor is inactive',
  [VendorHttpStatus.VENDOR_DOCUMENT_MISSING]: 'Required documents missing',
  [VendorHttpStatus.VENDOR_DOCUMENT_EXPIRED]: 'Vendor documents expired',
  [VendorHttpStatus.VENDOR_PAYMENT_METHOD_INVALID]: 'Invalid payment method',
  [VendorHttpStatus.VENDOR_SUBSCRIPTION_EXPIRED]: 'Vendor subscription expired',
  [VendorHttpStatus.VENDOR_LIMIT_EXCEEDED]: 'Vendor limit exceeded',
};

export const VendorHttpStatusCategories = {
  SUCCESS: [200, 201, 202, 203, 204, 205, 206],
  REDIRECTION: [300, 301, 302, 303, 304, 305, 307, 308],
  CLIENT_ERROR: [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  ],
  SERVER_ERROR: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511],
  VENDOR_ERROR: [8001, 8002, 8003, 8004, 8005, 8006, 8007, 8008, 8009, 8010],
} as const;

export const VendorHttpStatusDescriptions: Record<VendorHttpStatusCode, string> = {
  [VendorHttpStatus.OK]: 'The request was successful',
  [VendorHttpStatus.CREATED]: 'The vendor was created successfully',
  [VendorHttpStatus.ACCEPTED]: 'The request has been accepted for processing',
  [VendorHttpStatus.NON_AUTHORITATIVE_INFORMATION]:
    'Returned meta-information is not the definitive set',
  [VendorHttpStatus.NO_CONTENT]: 'The request was successful but there is no content to send',
  [VendorHttpStatus.RESET_CONTENT]: 'Tells the user agent to reset the document',
  [VendorHttpStatus.PARTIAL_CONTENT]: 'The server is delivering only part of the resource',

  [VendorHttpStatus.MULTIPLE_CHOICES]: 'The request has multiple possible responses',
  [VendorHttpStatus.MOVED_PERMANENTLY]:
    'The URL of the requested resource has been changed permanently',
  [VendorHttpStatus.FOUND]: 'The URL of the requested resource has been changed temporarily',
  [VendorHttpStatus.SEE_OTHER]:
    'The server sent this response to direct the client to get the requested resource at another URI',
  [VendorHttpStatus.NOT_MODIFIED]: 'The requested resource has not been modified',
  [VendorHttpStatus.USE_PROXY]: 'The requested resource is available only through a proxy',
  [VendorHttpStatus.TEMPORARY_REDIRECT]:
    'The server sends this response to direct the client to get the requested resource at another URI',
  [VendorHttpStatus.PERMANENT_REDIRECT]:
    'The server sends this response to direct the client to get the requested resource at another URI',

  [VendorHttpStatus.BAD_REQUEST]: 'The server could not understand the request',
  [VendorHttpStatus.UNAUTHORIZED]:
    'The client must authenticate itself to get the requested response',
  [VendorHttpStatus.PAYMENT_REQUIRED]: 'Reserved for future use',
  [VendorHttpStatus.FORBIDDEN]: 'The client does not have access rights to the content',
  [VendorHttpStatus.NOT_FOUND]: 'The server cannot find the requested resource',
  [VendorHttpStatus.METHOD_NOT_ALLOWED]:
    'The request method is known by the server but is not supported',
  [VendorHttpStatus.NOT_ACCEPTABLE]:
    'The server cannot find any content that conforms to the criteria given by the user agent',
  [VendorHttpStatus.PROXY_AUTHENTICATION_REQUIRED]:
    'The client must first authenticate itself with the proxy',
  [VendorHttpStatus.REQUEST_TIMEOUT]: 'The server would like to shut down this unused connection',
  [VendorHttpStatus.CONFLICT]: 'The request conflicts with the current state of the server',
  [VendorHttpStatus.GONE]: 'The requested resource is no longer available',
  [VendorHttpStatus.LENGTH_REQUIRED]: 'The server requires a valid Content-Length header',
  [VendorHttpStatus.PRECONDITION_FAILED]:
    'One or more conditions given in the request header fields evaluated to false',
  [VendorHttpStatus.PAYLOAD_TOO_LARGE]:
    'The request entity is larger than limits defined by server',
  [VendorHttpStatus.URI_TOO_LONG]:
    'The URI requested by the client is longer than the server is willing to interpret',
  [VendorHttpStatus.UNSUPPORTED_MEDIA_TYPE]:
    'The media format of the requested data is not supported',
  [VendorHttpStatus.RANGE_NOT_SATISFIABLE]:
    'The range specified by the Range header field in the request is invalid',
  [VendorHttpStatus.EXPECTATION_FAILED]:
    'The expectation given in the Expect request header cannot be met',
  [VendorHttpStatus.IM_A_TEAPOT]: 'The server refuses to brew coffee because it is a teapot',
  [VendorHttpStatus.MISDIRECTED_REQUEST]:
    'The request is directed at a server that is not able to produce a response',
  [VendorHttpStatus.UNPROCESSABLE_ENTITY]:
    'The request was well-formed but was unable to be followed due to semantic errors',
  [VendorHttpStatus.LOCKED]: 'The resource is locked',
  [VendorHttpStatus.FAILED_DEPENDENCY]:
    'The request failed because of a failure in a previous request',
  [VendorHttpStatus.TOO_EARLY]:
    'The server is unwilling to process a request that contains an early data',
  [VendorHttpStatus.UPGRADE_REQUIRED]: 'The client should switch to a different protocol',
  [VendorHttpStatus.PRECONDITION_REQUIRED]:
    'The origin server requires the request to be conditional',
  [VendorHttpStatus.TOO_MANY_REQUESTS]:
    'The user has sent too many requests in a given amount of time',
  [VendorHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    'The server is unwilling to process the request because its header fields are too large',
  [VendorHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]:
    'The requested resource is unavailable for legal reasons',

  [VendorHttpStatus.INTERNAL_SERVER_ERROR]:
    'The server has encountered a situation it does not know how to handle',
  [VendorHttpStatus.NOT_IMPLEMENTED]: 'The request method is not supported by the server',
  [VendorHttpStatus.BAD_GATEWAY]: 'The server was acting as a gateway and got an invalid response',
  [VendorHttpStatus.SERVICE_UNAVAILABLE]: 'The server is not ready to handle the request',
  [VendorHttpStatus.GATEWAY_TIMEOUT]:
    'The server was acting as a gateway and did not get a response in time',
  [VendorHttpStatus.HTTP_VERSION_NOT_SUPPORTED]:
    'The HTTP version used in the request is not supported',
  [VendorHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'The server has an internal configuration error',
  [VendorHttpStatus.INSUFFICIENT_STORAGE]: 'The server has insufficient storage',
  [VendorHttpStatus.LOOP_DETECTED]:
    'The server detected an infinite loop while processing the request',
  [VendorHttpStatus.NOT_EXTENDED]: 'The policy for accessing the resource has not been met',
  [VendorHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]:
    'The client needs to authenticate to gain network access',

  [VendorHttpStatus.VENDOR_NOT_VERIFIED]: 'The vendor account has not been verified',
  [VendorHttpStatus.VENDOR_SUSPENDED]: 'The vendor account has been suspended',
  [VendorHttpStatus.VENDOR_BLOCKED]: 'The vendor account has been blocked',
  [VendorHttpStatus.VENDOR_PENDING_APPROVAL]: 'The vendor account is pending approval',
  [VendorHttpStatus.VENDOR_INACTIVE]: 'The vendor account is inactive',
  [VendorHttpStatus.VENDOR_DOCUMENT_MISSING]: 'Required vendor documents are missing',
  [VendorHttpStatus.VENDOR_DOCUMENT_EXPIRED]: 'Vendor documents have expired',
  [VendorHttpStatus.VENDOR_PAYMENT_METHOD_INVALID]: 'Vendor payment method is invalid',
  [VendorHttpStatus.VENDOR_SUBSCRIPTION_EXPIRED]: 'Vendor subscription has expired',
  [VendorHttpStatus.VENDOR_LIMIT_EXCEEDED]: 'Vendor has exceeded allowed limits',
};
