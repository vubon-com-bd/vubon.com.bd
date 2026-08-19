/**
 * Analytics HTTP Status Codes Constants
 * Contains all HTTP status codes used in analytics management
 */

export const AnalyticsHttpStatus = {
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

  // Custom Analytics Business Codes
  ANALYTICS_DATA_NOT_FOUND: 14001,
  ANALYTICS_REPORT_GENERATION_FAILED: 14002,
  ANALYTICS_INVALID_METRIC: 14003,
  ANALYTICS_INVALID_DIMENSION: 14004,
  ANALYTICS_DATE_RANGE_INVALID: 14005,
  ANALYTICS_QUERY_TIMEOUT: 14006,
  ANALYTICS_DATA_PROCESSING_FAILED: 14007,
  ANALYTICS_EXPORT_FAILED: 14008,
  ANALYTICS_DASHBOARD_NOT_FOUND: 14009,
  ANALYTICS_INSIGHT_GENERATION_FAILED: 14010,
} as const;

export type AnalyticsHttpStatusCode =
  (typeof AnalyticsHttpStatus)[keyof typeof AnalyticsHttpStatus];

export const AnalyticsHttpStatusMessages: Record<AnalyticsHttpStatusCode, string> = {
  [AnalyticsHttpStatus.OK]: 'Success',
  [AnalyticsHttpStatus.CREATED]: 'Analytics report created successfully',
  [AnalyticsHttpStatus.ACCEPTED]: 'Analytics request accepted',
  [AnalyticsHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [AnalyticsHttpStatus.NO_CONTENT]: 'No content',
  [AnalyticsHttpStatus.RESET_CONTENT]: 'Reset content',
  [AnalyticsHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [AnalyticsHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [AnalyticsHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [AnalyticsHttpStatus.FOUND]: 'Found',
  [AnalyticsHttpStatus.SEE_OTHER]: 'See other',
  [AnalyticsHttpStatus.NOT_MODIFIED]: 'Not modified',
  [AnalyticsHttpStatus.USE_PROXY]: 'Use proxy',
  [AnalyticsHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [AnalyticsHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [AnalyticsHttpStatus.BAD_REQUEST]: 'Bad request',
  [AnalyticsHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [AnalyticsHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [AnalyticsHttpStatus.FORBIDDEN]: 'Forbidden',
  [AnalyticsHttpStatus.NOT_FOUND]: 'Analytics resource not found',
  [AnalyticsHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [AnalyticsHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [AnalyticsHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [AnalyticsHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [AnalyticsHttpStatus.CONFLICT]: 'Conflict',
  [AnalyticsHttpStatus.GONE]: 'Gone',
  [AnalyticsHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [AnalyticsHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [AnalyticsHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [AnalyticsHttpStatus.URI_TOO_LONG]: 'URI too long',
  [AnalyticsHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [AnalyticsHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [AnalyticsHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [AnalyticsHttpStatus.IM_A_TEAPOT]: 'Im a teapot',
  [AnalyticsHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [AnalyticsHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [AnalyticsHttpStatus.LOCKED]: 'Locked',
  [AnalyticsHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [AnalyticsHttpStatus.TOO_EARLY]: 'Too early',
  [AnalyticsHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [AnalyticsHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [AnalyticsHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [AnalyticsHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [AnalyticsHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [AnalyticsHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [AnalyticsHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [AnalyticsHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [AnalyticsHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [AnalyticsHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [AnalyticsHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [AnalyticsHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [AnalyticsHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [AnalyticsHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [AnalyticsHttpStatus.NOT_EXTENDED]: 'Not extended',
  [AnalyticsHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',

  // Custom analytics messages
  [AnalyticsHttpStatus.ANALYTICS_DATA_NOT_FOUND]: 'Analytics data not found',
  [AnalyticsHttpStatus.ANALYTICS_REPORT_GENERATION_FAILED]: 'Report generation failed',
  [AnalyticsHttpStatus.ANALYTICS_INVALID_METRIC]: 'Invalid metric',
  [AnalyticsHttpStatus.ANALYTICS_INVALID_DIMENSION]: 'Invalid dimension',
  [AnalyticsHttpStatus.ANALYTICS_DATE_RANGE_INVALID]: 'Invalid date range',
  [AnalyticsHttpStatus.ANALYTICS_QUERY_TIMEOUT]: 'Query timeout',
  [AnalyticsHttpStatus.ANALYTICS_DATA_PROCESSING_FAILED]: 'Data processing failed',
  [AnalyticsHttpStatus.ANALYTICS_EXPORT_FAILED]: 'Export failed',
  [AnalyticsHttpStatus.ANALYTICS_DASHBOARD_NOT_FOUND]: 'Dashboard not found',
  [AnalyticsHttpStatus.ANALYTICS_INSIGHT_GENERATION_FAILED]: 'Insight generation failed',
};

export const AnalyticsHttpStatusCategories = {
  SUCCESS: [200, 201, 202, 203, 204, 205, 206],
  REDIRECTION: [300, 301, 302, 303, 304, 305, 307, 308],
  CLIENT_ERROR: [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  ],
  SERVER_ERROR: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511],
  ANALYTICS_ERROR: [14001, 14002, 14003, 14004, 14005, 14006, 14007, 14008, 14009, 14010],
} as const;

export const AnalyticsHttpStatusDescriptions: Record<AnalyticsHttpStatusCode, string> = {
  [AnalyticsHttpStatus.OK]: 'The request was successful',
  [AnalyticsHttpStatus.CREATED]: 'The analytics report was created successfully',
  [AnalyticsHttpStatus.ACCEPTED]: 'The request has been accepted for processing',
  [AnalyticsHttpStatus.NON_AUTHORITATIVE_INFORMATION]:
    'Returned meta-information is not the definitive set',
  [AnalyticsHttpStatus.NO_CONTENT]: 'The request was successful but there is no content to send',
  [AnalyticsHttpStatus.RESET_CONTENT]: 'Tells the user agent to reset the document',
  [AnalyticsHttpStatus.PARTIAL_CONTENT]: 'The server is delivering only part of the resource',

  [AnalyticsHttpStatus.MULTIPLE_CHOICES]: 'The request has multiple possible responses',
  [AnalyticsHttpStatus.MOVED_PERMANENTLY]:
    'The URL of the requested resource has been changed permanently',
  [AnalyticsHttpStatus.FOUND]: 'The URL of the requested resource has been changed temporarily',
  [AnalyticsHttpStatus.SEE_OTHER]:
    'The server sent this response to direct the client to get the requested resource at another URI',
  [AnalyticsHttpStatus.NOT_MODIFIED]: 'The requested resource has not been modified',
  [AnalyticsHttpStatus.USE_PROXY]: 'The requested resource is available only through a proxy',
  [AnalyticsHttpStatus.TEMPORARY_REDIRECT]:
    'The server sends this response to direct the client to get the requested resource at another URI',
  [AnalyticsHttpStatus.PERMANENT_REDIRECT]:
    'The server sends this response to direct the client to get the requested resource at another URI',

  [AnalyticsHttpStatus.BAD_REQUEST]: 'The server could not understand the request',
  [AnalyticsHttpStatus.UNAUTHORIZED]:
    'The client must authenticate itself to get the requested response',
  [AnalyticsHttpStatus.PAYMENT_REQUIRED]: 'Reserved for future use',
  [AnalyticsHttpStatus.FORBIDDEN]: 'The client does not have access rights to the content',
  [AnalyticsHttpStatus.NOT_FOUND]: 'The server cannot find the requested resource',
  [AnalyticsHttpStatus.METHOD_NOT_ALLOWED]:
    'The request method is known by the server but is not supported',
  [AnalyticsHttpStatus.NOT_ACCEPTABLE]:
    'The server cannot find any content that conforms to the criteria given by the user agent',
  [AnalyticsHttpStatus.PROXY_AUTHENTICATION_REQUIRED]:
    'The client must first authenticate itself with the proxy',
  [AnalyticsHttpStatus.REQUEST_TIMEOUT]:
    'The server would like to shut down this unused connection',
  [AnalyticsHttpStatus.CONFLICT]: 'The request conflicts with the current state of the server',
  [AnalyticsHttpStatus.GONE]: 'The requested resource is no longer available',
  [AnalyticsHttpStatus.LENGTH_REQUIRED]: 'The server requires a valid Content-Length header',
  [AnalyticsHttpStatus.PRECONDITION_FAILED]:
    'One or more conditions given in the request header fields evaluated to false',
  [AnalyticsHttpStatus.PAYLOAD_TOO_LARGE]:
    'The request entity is larger than limits defined by server',
  [AnalyticsHttpStatus.URI_TOO_LONG]:
    'The URI requested by the client is longer than the server is willing to interpret',
  [AnalyticsHttpStatus.UNSUPPORTED_MEDIA_TYPE]:
    'The media format of the requested data is not supported',
  [AnalyticsHttpStatus.RANGE_NOT_SATISFIABLE]:
    'The range specified by the Range header field in the request is invalid',
  [AnalyticsHttpStatus.EXPECTATION_FAILED]:
    'The expectation given in the Expect request header cannot be met',
  [AnalyticsHttpStatus.IM_A_TEAPOT]: 'The server refuses to brew coffee because it is a teapot',
  [AnalyticsHttpStatus.MISDIRECTED_REQUEST]:
    'The request is directed at a server that is not able to produce a response',
  [AnalyticsHttpStatus.UNPROCESSABLE_ENTITY]:
    'The request was well-formed but was unable to be followed due to semantic errors',
  [AnalyticsHttpStatus.LOCKED]: 'The resource is locked',
  [AnalyticsHttpStatus.FAILED_DEPENDENCY]:
    'The request failed because of a failure in a previous request',
  [AnalyticsHttpStatus.TOO_EARLY]:
    'The server is unwilling to process a request that contains an early data',
  [AnalyticsHttpStatus.UPGRADE_REQUIRED]: 'The client should switch to a different protocol',
  [AnalyticsHttpStatus.PRECONDITION_REQUIRED]:
    'The origin server requires the request to be conditional',
  [AnalyticsHttpStatus.TOO_MANY_REQUESTS]:
    'The user has sent too many requests in a given amount of time',
  [AnalyticsHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    'The server is unwilling to process the request because its header fields are too large',
  [AnalyticsHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]:
    'The requested resource is unavailable for legal reasons',

  [AnalyticsHttpStatus.INTERNAL_SERVER_ERROR]:
    'The server has encountered a situation it does not know how to handle',
  [AnalyticsHttpStatus.NOT_IMPLEMENTED]: 'The request method is not supported by the server',
  [AnalyticsHttpStatus.BAD_GATEWAY]:
    'The server was acting as a gateway and got an invalid response',
  [AnalyticsHttpStatus.SERVICE_UNAVAILABLE]: 'The server is not ready to handle the request',
  [AnalyticsHttpStatus.GATEWAY_TIMEOUT]:
    'The server was acting as a gateway and did not get a response in time',
  [AnalyticsHttpStatus.HTTP_VERSION_NOT_SUPPORTED]:
    'The HTTP version used in the request is not supported',
  [AnalyticsHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'The server has an internal configuration error',
  [AnalyticsHttpStatus.INSUFFICIENT_STORAGE]: 'The server has insufficient storage',
  [AnalyticsHttpStatus.LOOP_DETECTED]:
    'The server detected an infinite loop while processing the request',
  [AnalyticsHttpStatus.NOT_EXTENDED]: 'The policy for accessing the resource has not been met',
  [AnalyticsHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]:
    'The client needs to authenticate to gain network access',

  [AnalyticsHttpStatus.ANALYTICS_DATA_NOT_FOUND]: 'The requested analytics data could not be found',
  [AnalyticsHttpStatus.ANALYTICS_REPORT_GENERATION_FAILED]:
    'Failed to generate the analytics report',
  [AnalyticsHttpStatus.ANALYTICS_INVALID_METRIC]:
    'The specified metric is invalid or not supported',
  [AnalyticsHttpStatus.ANALYTICS_INVALID_DIMENSION]:
    'The specified dimension is invalid or not supported',
  [AnalyticsHttpStatus.ANALYTICS_DATE_RANGE_INVALID]: 'The date range specified is invalid',
  [AnalyticsHttpStatus.ANALYTICS_QUERY_TIMEOUT]: 'The analytics query timed out',
  [AnalyticsHttpStatus.ANALYTICS_DATA_PROCESSING_FAILED]: 'Failed to process the analytics data',
  [AnalyticsHttpStatus.ANALYTICS_EXPORT_FAILED]: 'Failed to export the analytics data',
  [AnalyticsHttpStatus.ANALYTICS_DASHBOARD_NOT_FOUND]: 'The requested dashboard could not be found',
  [AnalyticsHttpStatus.ANALYTICS_INSIGHT_GENERATION_FAILED]:
    'Failed to generate insights from the analytics data',
};
