/**
 * SEO সিস্টেম এরর কোড
 */
export const SEO_ERROR_CODE = {
  KEYWORD_NOT_FOUND: 'keyword-not-found',
  CONTENT_NOT_FOUND: 'content-not-found',
  AUDIT_FAILED: 'audit-failed',
  SCHEMA_INVALID: 'schema-invalid',
  SITEMAP_GENERATION_FAILED: 'sitemap-generation-failed',
  ROBOTS_INVALID: 'robots-invalid',
  RANKING_DATA_MISSING: 'ranking-data-missing',
  ANALYTICS_DATA_MISSING: 'analytics-data-missing',
} as const;

/**
 * SEO_ERROR_CODE থেকে টাইপ
 */
export type SEOErrorCode = (typeof SEO_ERROR_CODE)[keyof typeof SEO_ERROR_CODE];

/**
 * SEO এরর মেসেজ
 */
export const SEO_ERROR_MESSAGE: Record<SEOErrorCode, string> = {
  [SEO_ERROR_CODE.KEYWORD_NOT_FOUND]: 'Requested keyword not found in the system',
  [SEO_ERROR_CODE.CONTENT_NOT_FOUND]: 'Requested content not found in the system',
  [SEO_ERROR_CODE.AUDIT_FAILED]: 'SEO audit failed to complete successfully',
  [SEO_ERROR_CODE.SCHEMA_INVALID]: 'Schema markup validation failed',
  [SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED]: 'Sitemap generation failed due to an error',
  [SEO_ERROR_CODE.ROBOTS_INVALID]: 'Robots.txt configuration is invalid',
  [SEO_ERROR_CODE.RANKING_DATA_MISSING]: 'Ranking data is missing or unavailable',
  [SEO_ERROR_CODE.ANALYTICS_DATA_MISSING]: 'Analytics data is missing or unavailable',
} as const;

/**
 * SEO এরর HTTP স্ট্যাটাস কোড
 */
export const SEO_ERROR_HTTP_STATUS: Record<SEOErrorCode, number> = {
  [SEO_ERROR_CODE.KEYWORD_NOT_FOUND]: 404,
  [SEO_ERROR_CODE.CONTENT_NOT_FOUND]: 404,
  [SEO_ERROR_CODE.AUDIT_FAILED]: 500,
  [SEO_ERROR_CODE.SCHEMA_INVALID]: 400,
  [SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED]: 500,
  [SEO_ERROR_CODE.ROBOTS_INVALID]: 400,
  [SEO_ERROR_CODE.RANKING_DATA_MISSING]: 404,
  [SEO_ERROR_CODE.ANALYTICS_DATA_MISSING]: 404,
} as const;

/**
 * SEO এরর ক্যাটাগরি
 */
export const SEO_ERROR_CATEGORY = {
  NOT_FOUND: 'not-found',
  VALIDATION: 'validation',
  SERVER: 'server',
  DATA_MISSING: 'data-missing',
} as const;

/**
 * SEO_ERROR_CATEGORY থেকে টাইপ
 */
export type SEOErrorCategory = (typeof SEO_ERROR_CATEGORY)[keyof typeof SEO_ERROR_CATEGORY];

/**
 * SEO এরর ক্যাটাগরি লেবেল
 */
export const SEO_ERROR_CATEGORY_LABELS: Record<SEOErrorCategory, string> = {
  [SEO_ERROR_CATEGORY.NOT_FOUND]: 'Not Found',
  [SEO_ERROR_CATEGORY.VALIDATION]: 'Validation Error',
  [SEO_ERROR_CATEGORY.SERVER]: 'Server Error',
  [SEO_ERROR_CATEGORY.DATA_MISSING]: 'Data Missing',
} as const;

/**
 * SEO এরর ক্যাটাগরি ম্যাপিং
 */
export const SEO_ERROR_CATEGORY_MAP: Record<SEOErrorCode, SEOErrorCategory> = {
  [SEO_ERROR_CODE.KEYWORD_NOT_FOUND]: SEO_ERROR_CATEGORY.NOT_FOUND,
  [SEO_ERROR_CODE.CONTENT_NOT_FOUND]: SEO_ERROR_CATEGORY.NOT_FOUND,
  [SEO_ERROR_CODE.AUDIT_FAILED]: SEO_ERROR_CATEGORY.SERVER,
  [SEO_ERROR_CODE.SCHEMA_INVALID]: SEO_ERROR_CATEGORY.VALIDATION,
  [SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED]: SEO_ERROR_CATEGORY.SERVER,
  [SEO_ERROR_CODE.ROBOTS_INVALID]: SEO_ERROR_CATEGORY.VALIDATION,
  [SEO_ERROR_CODE.RANKING_DATA_MISSING]: SEO_ERROR_CATEGORY.DATA_MISSING,
  [SEO_ERROR_CODE.ANALYTICS_DATA_MISSING]: SEO_ERROR_CATEGORY.DATA_MISSING,
} as const;

/**
 * SEO এরর সিভারিটি
 */
export const SEO_ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * SEO_ERROR_SEVERITY থেকে টাইপ
 */
export type SEOErrorSeverity = (typeof SEO_ERROR_SEVERITY)[keyof typeof SEO_ERROR_SEVERITY];

/**
 * SEO এরর সিভারিটি লেবেল
 */
export const SEO_ERROR_SEVERITY_LABELS: Record<SEOErrorSeverity, string> = {
  [SEO_ERROR_SEVERITY.LOW]: 'Low',
  [SEO_ERROR_SEVERITY.MEDIUM]: 'Medium',
  [SEO_ERROR_SEVERITY.HIGH]: 'High',
  [SEO_ERROR_SEVERITY.CRITICAL]: 'Critical',
} as const;

/**
 * SEO এরর সিভারিটি ম্যাপিং
 */
export const SEO_ERROR_SEVERITY_MAP: Record<SEOErrorCode, SEOErrorSeverity> = {
  [SEO_ERROR_CODE.KEYWORD_NOT_FOUND]: SEO_ERROR_SEVERITY.MEDIUM,
  [SEO_ERROR_CODE.CONTENT_NOT_FOUND]: SEO_ERROR_SEVERITY.MEDIUM,
  [SEO_ERROR_CODE.AUDIT_FAILED]: SEO_ERROR_SEVERITY.CRITICAL,
  [SEO_ERROR_CODE.SCHEMA_INVALID]: SEO_ERROR_SEVERITY.HIGH,
  [SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED]: SEO_ERROR_SEVERITY.HIGH,
  [SEO_ERROR_CODE.ROBOTS_INVALID]: SEO_ERROR_SEVERITY.HIGH,
  [SEO_ERROR_CODE.RANKING_DATA_MISSING]: SEO_ERROR_SEVERITY.MEDIUM,
  [SEO_ERROR_CODE.ANALYTICS_DATA_MISSING]: SEO_ERROR_SEVERITY.MEDIUM,
} as const;

/**
 * SEO এরর কনফিগারেশন
 */
export interface SEOErrorConfig {
  code: SEOErrorCode;
  message: string;
  httpStatus: number;
  category: SEOErrorCategory;
  severity: SEOErrorSeverity;
  retryable: boolean;
  userFriendlyMessage: string;
}

/**
 * SEO এরর মেটাডেটা
 */
export const SEO_ERROR_METADATA: Record<SEOErrorCode, SEOErrorConfig> = {
  [SEO_ERROR_CODE.KEYWORD_NOT_FOUND]: {
    code: SEO_ERROR_CODE.KEYWORD_NOT_FOUND,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.KEYWORD_NOT_FOUND],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.KEYWORD_NOT_FOUND],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.KEYWORD_NOT_FOUND],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.KEYWORD_NOT_FOUND],
    retryable: false,
    userFriendlyMessage:
      'The requested keyword could not be found. Please check the keyword and try again.',
  },
  [SEO_ERROR_CODE.CONTENT_NOT_FOUND]: {
    code: SEO_ERROR_CODE.CONTENT_NOT_FOUND,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.CONTENT_NOT_FOUND],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.CONTENT_NOT_FOUND],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.CONTENT_NOT_FOUND],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.CONTENT_NOT_FOUND],
    retryable: false,
    userFriendlyMessage:
      'The requested content could not be found. Please check the content ID and try again.',
  },
  [SEO_ERROR_CODE.AUDIT_FAILED]: {
    code: SEO_ERROR_CODE.AUDIT_FAILED,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.AUDIT_FAILED],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.AUDIT_FAILED],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.AUDIT_FAILED],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.AUDIT_FAILED],
    retryable: true,
    userFriendlyMessage: 'The SEO audit failed to complete. Please try again or contact support.',
  },
  [SEO_ERROR_CODE.SCHEMA_INVALID]: {
    code: SEO_ERROR_CODE.SCHEMA_INVALID,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.SCHEMA_INVALID],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.SCHEMA_INVALID],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.SCHEMA_INVALID],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.SCHEMA_INVALID],
    retryable: false,
    userFriendlyMessage:
      'The schema markup is invalid. Please check the schema structure and try again.',
  },
  [SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED]: {
    code: SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.SITEMAP_GENERATION_FAILED],
    retryable: true,
    userFriendlyMessage:
      'Sitemap generation failed. Please check your site configuration and try again.',
  },
  [SEO_ERROR_CODE.ROBOTS_INVALID]: {
    code: SEO_ERROR_CODE.ROBOTS_INVALID,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.ROBOTS_INVALID],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.ROBOTS_INVALID],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.ROBOTS_INVALID],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.ROBOTS_INVALID],
    retryable: false,
    userFriendlyMessage:
      'The robots.txt configuration is invalid. Please check the syntax and try again.',
  },
  [SEO_ERROR_CODE.RANKING_DATA_MISSING]: {
    code: SEO_ERROR_CODE.RANKING_DATA_MISSING,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.RANKING_DATA_MISSING],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.RANKING_DATA_MISSING],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.RANKING_DATA_MISSING],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.RANKING_DATA_MISSING],
    retryable: true,
    userFriendlyMessage: 'Ranking data is currently unavailable. Please try again later.',
  },
  [SEO_ERROR_CODE.ANALYTICS_DATA_MISSING]: {
    code: SEO_ERROR_CODE.ANALYTICS_DATA_MISSING,
    message: SEO_ERROR_MESSAGE[SEO_ERROR_CODE.ANALYTICS_DATA_MISSING],
    httpStatus: SEO_ERROR_HTTP_STATUS[SEO_ERROR_CODE.ANALYTICS_DATA_MISSING],
    category: SEO_ERROR_CATEGORY_MAP[SEO_ERROR_CODE.ANALYTICS_DATA_MISSING],
    severity: SEO_ERROR_SEVERITY_MAP[SEO_ERROR_CODE.ANALYTICS_DATA_MISSING],
    retryable: true,
    userFriendlyMessage: 'Analytics data is currently unavailable. Please try again later.',
  },
} as const;

/**
 * SEO এরর রেসপন্স
 */
export interface SEOErrorResponse {
  code: SEOErrorCode;
  message: string;
  httpStatus: number;
  category: SEOErrorCategory;
  severity: SEOErrorSeverity;
  timestamp: Date;
  details?: Record<string, unknown>;
}

/**
 * SEO এরর ফিল্টার
 */
export interface SEOErrorFilter {
  code?: SEOErrorCode;
  category?: SEOErrorCategory;
  severity?: SEOErrorSeverity;
  search?: string;
  page?: number;
  limit?: number;
}
