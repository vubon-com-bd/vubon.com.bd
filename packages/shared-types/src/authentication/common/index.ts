/**
 * Common Types Index
 * Central export point for all common types
 */

// Export API types
export {
  APIRequest,
  APIResponse,
  APIError,
  ValidationError,
  PaginationMeta,
  APIHeaders,
  APIQueryParams,
  APIResponseBuilder,
  APIHealthCheck,
  ServiceHealth,
  APIWebhook,
  APIRateLimit,
  HTTP_STATUS,
  HTTP_STATUS_MESSAGES,
  HTTP_STATUS_CATEGORIES,
  HTTP_STATUS_HELPERS,
  API_STATUS,
  DEFAULT_API_CONFIG,
  type HttpStatusCode,
  type HttpStatusCategory,
  type APIMethod,
} from './api.types';

// Export Pagination types
export {
  PaginationRequest,
  PaginationResponse,
  PaginatedResult,
  FilterRequest,
  FilterCondition,
  DateRange,
  SortRequest,
  SearchRequest,
  CursorPagination,
  PageInfo,
  Edge,
  Connection,
  PaginationBuilder,
  DEFAULT_PAGINATION,
  SORT_ORDERS,
  FILTER_OPERATORS,
} from './pagination.types';

// Export Audit types
export {
  AuditLog,
  AuditChange,
  AuditQuery,
  AuditStatistics,
  AuditReport,
  AuditRetention,
  AuditResponseBuilder,
  AUDIT_ACTIONS,
  AUDIT_RESOURCES,
  AUDIT_SEVERITY,
  DEFAULT_AUDIT_CONFIG,
  type AuditAction,
  type AuditResource,
  type AuditSeverity,
} from './audit.types';

// Export SEO types
export {
  SEOMetadata,
  MetaTag,
  StructuredData,
  Hreflang,
  Sitemap,
  SitemapImage,
  SitemapVideo,
  SitemapNews,
  SEOSettings,
  SEOUpdateRequest,
  SEOUpdateResponse,
  SEOAudit,
  SEOIssue,
  SEOResponseBuilder,
  SEO_DEFAULTS,
  SITEMAP_CHANGEFREQ,
  DEFAULT_SEO_CONFIG,
} from './seo.types';
