/**
 * Content & Marketing HTTP Status Codes Constants
 * Contains all HTTP status codes used in content and marketing management
 */

export const ContentMarketingHttpStatus = {
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

  // Custom Content & Marketing Business Codes (Range: 12001-12099)
  CONTENT_NOT_FOUND: 12001,
  CONTENT_ALREADY_EXISTS: 12002,
  CONTENT_INVALID_STATUS: 12003,
  CONTENT_PUBLISH_FAILED: 12004,
  CONTENT_ALREADY_PUBLISHED: 12005,
  CONTENT_DRAFT_NOT_FOUND: 12006,
  CONTENT_VALIDATION_FAILED: 12007,

  CAMPAIGN_NOT_FOUND: 12010,
  CAMPAIGN_EXPIRED: 12011,
  CAMPAIGN_INACTIVE: 12012,
  CAMPAIGN_ALREADY_ACTIVE: 12013,
  CAMPAIGN_BUDGET_EXCEEDED: 12014,

  PROMOTION_NOT_FOUND: 12020,
  PROMOTION_EXPIRED: 12021,
  PROMOTION_INACTIVE: 12022,
  PROMOTION_ALREADY_APPLIED: 12023,

  TEMPLATE_NOT_FOUND: 12030,
  TEMPLATE_INVALID: 12031,
  TEMPLATE_RENDER_FAILED: 12032,

  SEGMENT_NOT_FOUND: 12040,
  SEGMENT_INVALID: 12041,

  ANALYTICS_DATA_NOT_FOUND: 12050,
  ANALYTICS_GENERATION_FAILED: 12051,

  MEDIA_UPLOAD_FAILED: 12060,
  MEDIA_NOT_FOUND: 12061,
  MEDIA_INVALID_FORMAT: 12062,

  SEO_DATA_NOT_FOUND: 12070,
  SEO_UPDATE_FAILED: 12071,
} as const;

export type ContentMarketingHttpStatusCode =
  (typeof ContentMarketingHttpStatus)[keyof typeof ContentMarketingHttpStatus];

export const ContentMarketingHttpStatusMessages: Record<ContentMarketingHttpStatusCode, string> = {
  // 2xx Success
  [ContentMarketingHttpStatus.OK]: 'Success',
  [ContentMarketingHttpStatus.CREATED]: 'Content created successfully',
  [ContentMarketingHttpStatus.ACCEPTED]: 'Content request accepted',
  [ContentMarketingHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [ContentMarketingHttpStatus.NO_CONTENT]: 'No content',
  [ContentMarketingHttpStatus.RESET_CONTENT]: 'Reset content',
  [ContentMarketingHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  // 3xx Redirection
  [ContentMarketingHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [ContentMarketingHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [ContentMarketingHttpStatus.FOUND]: 'Found',
  [ContentMarketingHttpStatus.SEE_OTHER]: 'See other',
  [ContentMarketingHttpStatus.NOT_MODIFIED]: 'Not modified',
  [ContentMarketingHttpStatus.USE_PROXY]: 'Use proxy',
  [ContentMarketingHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [ContentMarketingHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  // 4xx Client Errors
  [ContentMarketingHttpStatus.BAD_REQUEST]: 'Bad request',
  [ContentMarketingHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [ContentMarketingHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [ContentMarketingHttpStatus.FORBIDDEN]: 'Forbidden',
  [ContentMarketingHttpStatus.NOT_FOUND]: 'Content not found',
  [ContentMarketingHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [ContentMarketingHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [ContentMarketingHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [ContentMarketingHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [ContentMarketingHttpStatus.CONFLICT]: 'Conflict',
  [ContentMarketingHttpStatus.GONE]: 'Gone',
  [ContentMarketingHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [ContentMarketingHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [ContentMarketingHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [ContentMarketingHttpStatus.URI_TOO_LONG]: 'URI too long',
  [ContentMarketingHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [ContentMarketingHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [ContentMarketingHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [ContentMarketingHttpStatus.IM_A_TEAPOT]: "I'm a teapot",
  [ContentMarketingHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [ContentMarketingHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [ContentMarketingHttpStatus.LOCKED]: 'Locked',
  [ContentMarketingHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [ContentMarketingHttpStatus.TOO_EARLY]: 'Too early',
  [ContentMarketingHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [ContentMarketingHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [ContentMarketingHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [ContentMarketingHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [ContentMarketingHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  // 5xx Server Errors
  [ContentMarketingHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ContentMarketingHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [ContentMarketingHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [ContentMarketingHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [ContentMarketingHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [ContentMarketingHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [ContentMarketingHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [ContentMarketingHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [ContentMarketingHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [ContentMarketingHttpStatus.NOT_EXTENDED]: 'Not extended',
  [ContentMarketingHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',

  // Custom content & marketing messages
  [ContentMarketingHttpStatus.CONTENT_NOT_FOUND]: 'Content not found',
  [ContentMarketingHttpStatus.CONTENT_ALREADY_EXISTS]: 'Content already exists',
  [ContentMarketingHttpStatus.CONTENT_INVALID_STATUS]: 'Invalid content status',
  [ContentMarketingHttpStatus.CONTENT_PUBLISH_FAILED]: 'Content publish failed',
  [ContentMarketingHttpStatus.CONTENT_ALREADY_PUBLISHED]: 'Content already published',
  [ContentMarketingHttpStatus.CONTENT_DRAFT_NOT_FOUND]: 'Content draft not found',
  [ContentMarketingHttpStatus.CONTENT_VALIDATION_FAILED]: 'Content validation failed',

  [ContentMarketingHttpStatus.CAMPAIGN_NOT_FOUND]: 'Campaign not found',
  [ContentMarketingHttpStatus.CAMPAIGN_EXPIRED]: 'Campaign expired',
  [ContentMarketingHttpStatus.CAMPAIGN_INACTIVE]: 'Campaign is inactive',
  [ContentMarketingHttpStatus.CAMPAIGN_ALREADY_ACTIVE]: 'Campaign is already active',
  [ContentMarketingHttpStatus.CAMPAIGN_BUDGET_EXCEEDED]: 'Campaign budget exceeded',

  [ContentMarketingHttpStatus.PROMOTION_NOT_FOUND]: 'Promotion not found',
  [ContentMarketingHttpStatus.PROMOTION_EXPIRED]: 'Promotion expired',
  [ContentMarketingHttpStatus.PROMOTION_INACTIVE]: 'Promotion is inactive',
  [ContentMarketingHttpStatus.PROMOTION_ALREADY_APPLIED]: 'Promotion already applied',

  [ContentMarketingHttpStatus.TEMPLATE_NOT_FOUND]: 'Template not found',
  [ContentMarketingHttpStatus.TEMPLATE_INVALID]: 'Invalid template',
  [ContentMarketingHttpStatus.TEMPLATE_RENDER_FAILED]: 'Template render failed',

  [ContentMarketingHttpStatus.SEGMENT_NOT_FOUND]: 'Segment not found',
  [ContentMarketingHttpStatus.SEGMENT_INVALID]: 'Invalid segment',

  [ContentMarketingHttpStatus.ANALYTICS_DATA_NOT_FOUND]: 'Analytics data not found',
  [ContentMarketingHttpStatus.ANALYTICS_GENERATION_FAILED]: 'Analytics generation failed',

  [ContentMarketingHttpStatus.MEDIA_UPLOAD_FAILED]: 'Media upload failed',
  [ContentMarketingHttpStatus.MEDIA_NOT_FOUND]: 'Media not found',
  [ContentMarketingHttpStatus.MEDIA_INVALID_FORMAT]: 'Invalid media format',

  [ContentMarketingHttpStatus.SEO_DATA_NOT_FOUND]: 'SEO data not found',
  [ContentMarketingHttpStatus.SEO_UPDATE_FAILED]: 'SEO update failed',
};

export const ContentMarketingHttpStatusCategories = {
  INFORMATIONAL: [100, 101, 102, 103],
  SUCCESS: [200, 201, 202, 203, 204, 205, 206],
  REDIRECTION: [300, 301, 302, 303, 304, 305, 307, 308],
  CLIENT_ERROR: [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  ],
  SERVER_ERROR: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511],
  CONTENT_ERROR: [12001, 12002, 12003, 12004, 12005, 12006, 12007],
  CAMPAIGN_ERROR: [12010, 12011, 12012, 12013, 12014],
  PROMOTION_ERROR: [12020, 12021, 12022, 12023],
  TEMPLATE_ERROR: [12030, 12031, 12032],
  SEGMENT_ERROR: [12040, 12041],
  ANALYTICS_ERROR: [12050, 12051],
  MEDIA_ERROR: [12060, 12061, 12062],
  SEO_ERROR: [12070, 12071],
} as const;

// Helper functions
export const ContentMarketingHttpStatusHelper = {
  isSuccess: (code: number): boolean => code >= 200 && code < 300,
  isRedirection: (code: number): boolean => code >= 300 && code < 400,
  isClientError: (code: number): boolean => code >= 400 && code < 500,
  isServerError: (code: number): boolean => code >= 500 && code < 600,
  isContentError: (code: number): boolean => code >= 12001 && code <= 12007,
  isCampaignError: (code: number): boolean => code >= 12010 && code <= 12014,
  isPromotionError: (code: number): boolean => code >= 12020 && code <= 12023,
  isTemplateError: (code: number): boolean => code >= 12030 && code <= 12032,
  isSegmentError: (code: number): boolean => code >= 12040 && code <= 12041,
  isAnalyticsError: (code: number): boolean => code >= 12050 && code <= 12051,
  isMediaError: (code: number): boolean => code >= 12060 && code <= 12062,
  isSeoError: (code: number): boolean => code >= 12070 && code <= 12071,
  getMessage: (code: number): string => {
    return (
      ContentMarketingHttpStatusMessages[code as ContentMarketingHttpStatusCode] ||
      'Unknown status code'
    );
  },
  getCategory: (code: number): string => {
    if (code >= 100 && code < 200) return 'INFORMATIONAL';
    if (code >= 200 && code < 300) return 'SUCCESS';
    if (code >= 300 && code < 400) return 'REDIRECTION';
    if (code >= 400 && code < 500) return 'CLIENT_ERROR';
    if (code >= 500 && code < 600) return 'SERVER_ERROR';
    if (code >= 12001 && code <= 12007) return 'CONTENT_ERROR';
    if (code >= 12010 && code <= 12014) return 'CAMPAIGN_ERROR';
    if (code >= 12020 && code <= 12023) return 'PROMOTION_ERROR';
    if (code >= 12030 && code <= 12032) return 'TEMPLATE_ERROR';
    if (code >= 12040 && code <= 12041) return 'SEGMENT_ERROR';
    if (code >= 12050 && code <= 12051) return 'ANALYTICS_ERROR';
    if (code >= 12060 && code <= 12062) return 'MEDIA_ERROR';
    if (code >= 12070 && code <= 12071) return 'SEO_ERROR';
    return 'UNKNOWN';
  },
};
